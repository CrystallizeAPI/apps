import {
    ClientInterface,
    createOrderPusher,
    OrderCreatedConfirmation,
    Order,
    OrderItem,
    createClient,
} from '@crystallize/js-api-client';
import { jsonToGraphQLQuery } from 'json-to-graphql-query';

export type Refunds = Record<string, string>;

function removeNull(obj: any): any {
    return JSON.parse(JSON.stringify(obj), (key: string, value: any) => {
        if (value === null || value === '') {
            return undefined;
        }
        return value;
    });
}

async function dirtySudoFromSession<T>(
    sessionClient: ClientInterface,
    action: (tokenizedApiClient: ClientInterface) => Promise<T>,
): Promise<T> {
    const me: any = await sessionClient.pimApi('query { me { id }}');
    const tokens = await sessionClient.pimApi(`mutation {
        accessToken {
            create(userId:"${me.me.id}", input:{ name: "auto-temp-token" }) {
                id
                secret
            }
        }
    }`);

    const apiClient = createClient({
        tenantId: sessionClient.config.tenantId,
        tenantIdentifier: sessionClient.config.tenantIdentifier,
        accessTokenId: tokens.accessToken.create.id,
        accessTokenSecret: tokens.accessToken.create.secret,
    });
    const result = await action(apiClient);
    sessionClient.pimApi(`mutation { accessToken { delete(id: "${tokens.accessToken.create.id}") } }`);
    return result;
}

export default async (
    apiClient: ClientInterface,
    order: Order,
    refunds: Record<string, string>,
): Promise<OrderCreatedConfirmation> => {
    let totalAmount = 0;
    const currency = order.total?.currency || 'eur';
    const creditConfirmation = await dirtySudoFromSession<OrderCreatedConfirmation>(
        apiClient,
        async (tokenizedApiClient: ClientInterface) => {
            const pusher = createOrderPusher(tokenizedApiClient);
            return await pusher({
                customer: removeNull(order.customer),
                meta: [
                    {
                        key: 'refundFromOrder',
                        value: order.id,
                    },
                ],
                cart: Object.keys(refunds)
                    .filter((sku: string) => parseFloat(refunds[sku]) > 0)
                    .map((sku: string) => {
                        const value = parseFloat(refunds[sku]);
                        const originalItem = order.cart.find((item: OrderItem) => item.sku === sku);
                        totalAmount += value;
                        return {
                            name: originalItem?.name || '',
                            imageUrl: originalItem?.imageUrl || '',
                            sku: sku,
                            quantity: 1,
                            price: {
                                gross: -value,
                                currency,
                                tax: {
                                    name: 'Exempt.',
                                    percent: 0,
                                },
                            },
                        };
                    }),
                total: {
                    currency,
                    gross: -totalAmount,
                    tax: {
                        name: 'Exempt.',
                        percent: 0,
                    },
                },
            });
        },
    );
    const mutation = {
        order: {
            update: {
                __args: {
                    id: order.id,
                    input: {
                        meta: [
                            ...(order.meta || []),
                            {
                                key: 'refund-' + creditConfirmation.id,
                                value: totalAmount.toFixed(2),
                            },
                        ],
                    },
                },
                id: true,
                updatedAt: true,
            },
        },
    };

    apiClient.pimApi(jsonToGraphQLQuery({ mutation }));
    let retry = 15;
    while (retry > 0) {
        try {
            await apiClient.orderApi(`query { order { get(id: "${creditConfirmation.id}") { id } }}`);
            return creditConfirmation;
        } catch (exception) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            retry--;
        }
    }
    return creditConfirmation;
};
