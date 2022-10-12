import { ClientInterface } from '@crystallize/js-api-client';
import { jsonToGraphQLQuery } from 'json-to-graphql-query';

const price = {
    currency: true,
    discounts: {
        percent: true,
    },
    gross: true,
    net: true,
    tax: {
        name: true,
        percent: true,
    },
};

const nodeQuery = () => {
    return {
        id: true,
        additionalInformation: true,
        createdAt: true,
        updatedAt: true,
        cart: {
            name: true,
            productId: true,
            productVariantId: true,
            quantity: true,
            sku: true,
            price: price,
            imageUrl: true,
        },
        total: price,
        meta: {
            key: true,
            value: true,
        },
        customer: {
            firstName: true,
            lastName: true,
            companyName: true,
            identifier: true,
            addresses: {
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
                city: true,
                country: true,
                postalCode: true,
                street: true,
                streetNumber: true,
                street2: true,
                type: true,
                state: true,
            },
        },
    };
};

export const fetchAll = async (apiClient: ClientInterface): Promise<any> => {
    const buildQueryFrom = (cursor?: string) => {
        const args: Record<string, any> = {
            first: 25,
            tenantId: apiClient.config.tenantId,
        };
        if (cursor && cursor.length > 0) {
            args.after = cursor;
        }
        return {
            order: {
                getMany: {
                    __args: args,
                    pageInfo: {
                        endCursor: true,
                        hasNextPage: true,
                    },
                    edges: {
                        cursor: true,
                        node: nodeQuery(),
                    },
                },
            },
        };
    };

    async function* fetch() {
        let query = buildQueryFrom();
        let data: any;
        let endCursor: string | undefined;
        do {
            data = await apiClient.pimApi(jsonToGraphQLQuery({ query }));
            for (const edge of data.order.getMany.edges) {
                yield edge.node;
                endCursor = edge.cursor;
            }
            query = buildQueryFrom(endCursor);
        } while (data.order.getMany.pageInfo?.hasNextPage);
    }

    let items = [];
    for await (const node of fetch()) {
        items.push(node);
    }
    return items;
};

export const fetchById = async (apiClient: ClientInterface, orderId: string): Promise<any> => {
    const query = {
        order: {
            get: {
                __args: {
                    id: orderId,
                },
                ...nodeQuery(),
            },
        },
    };
    const data: any = await apiClient.pimApi(jsonToGraphQLQuery({ query }));
    return data.order.get;
};
