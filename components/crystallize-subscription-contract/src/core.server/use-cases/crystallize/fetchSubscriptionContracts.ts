import { ClientInterface } from '@crystallize/js-api-client';
import { jsonToGraphQLQuery } from 'json-to-graphql-query';
import { Contract } from '~/core/contract/types';

const enrichMeteredVariables = (node: any): Contract => {
    if (!node.subscriptionPlan?.meteredVariables) {
        return node;
    }
    const definition: Record<string, any> = node.subscriptionPlan.meteredVariables.reduce(
        (accumulator: any, variable: any) => {
            accumulator[variable.id] = variable;
            return accumulator;
        },
        {},
    );

    const enrichedRecurring = {
        ...node.recurring,
        meteredVariables: node.recurring?.meteredVariables?.map((variable: any) => {
            return {
                ...variable,
                ...definition[variable.id],
            };
        }),
    };

    if (!node.initial) {
        return {
            ...node,
            recurring: enrichedRecurring,
        };
    }

    return {
        ...node,
        initial: {
            ...node.initial,
            meteredVariables: node.initial?.meteredVariables.map((variable: any) => {
                return {
                    ...variable,
                    ...definition[variable.id],
                };
            }),
        },
        recurring: enrichedRecurring,
    };
};

const nodeQuery = () => {
    return {
        id: true,
        customerIdentifier: true,
        customer: {
            email: true,
            firstName: true,
            lastName: true,
            companyName: true,
            phone: true,
            taxNumber: true,
        },
        addresses: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            street: true,
            street2: true,
            streetNumber: true,
            city: true,
            postalCode: true,
            country: true,
            state: true,
            type: true,
        },
        subscriptionPlan: {
            name: true,
            identifier: true,
            meteredVariables: {
                id: true,
                identifier: true,
                name: true,
                unit: true,
            },
        },
        status: {
            activeUntil: true,
            renewAt: true,
        },
        //BUG IN PROD: https://app.shortcut.com/crystallize/story/7495/fatal-error-server-side-when-querying-a-initial-period
        // initial: {
        //     period: true,
        //     unit: true,
        //     price: true,
        //     currency: true,
        //     meteredVariables: {
        //         id: true,
        //         tierType: true,
        //         tiers: {
        //             threshold: true,
        //             price: true,
        //             currency: true,
        //         },
        //     },
        // },
        recurring: {
            period: true,
            unit: true,
            price: true,
            currency: true,
            meteredVariables: {
                id: true,
                tierType: true,
                tiers: {
                    threshold: true,
                    price: true,
                    currency: true,
                },
            },
        },
    };
};

export const fetchAll = async (apiClient: ClientInterface, customerIdentifier?: string): Promise<Contract[]> => {
    const buildQueryFrom = (cursor?: string) => {
        const args: Record<string, any> = {
            first: 25,
            tenantId: apiClient.config.tenantId,
        };
        if (cursor && cursor.length > 0) {
            args.after = cursor;
        }
        if (customerIdentifier) {
            args.customerIdentifier = customerIdentifier;
        }
        return {
            subscriptionContract: {
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
            for (const edge of data.subscriptionContract.getMany.edges) {
                yield enrichMeteredVariables(edge.node);
                endCursor = edge.cursor;
            }
            query = buildQueryFrom(endCursor);
        } while (data.subscriptionContract.getMany.pageInfo?.hasNextPage);
    }

    let items = [];
    for await (const node of fetch()) {
        items.push(node);
    }
    return items;
};

export const fetchById = async (apiClient: ClientInterface, id: string): Promise<Contract> => {
    let query = {
        subscriptionContract: {
            get: {
                __args: {
                    id,
                },
                ...nodeQuery(),
            },
        },
    };
    const data = await apiClient.pimApi(jsonToGraphQLQuery({ query }));
    return enrichMeteredVariables(data.subscriptionContract.get);
};
