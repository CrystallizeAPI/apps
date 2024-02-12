import { ClientInterface } from '@crystallize/js-api-client';
import { Shape } from '@crystallize/schema';
import { Item } from '@crystallize/schema';

type Deps = {
    apiClient: ClientInterface;
};

export const fetchFolders = async (shapes: Shape[], { apiClient }: Deps): Promise<Item[]> => {
    if (!apiClient.config.tenantId) {
        throw new Error('tenantId not set on the ClientInterface.');
    }
    if (shapes.length === 0) {
        return [];
    }

    const folders: Item[] = await Promise.all(
        shapes
            .filter((shape) => shape.type === 'folder')
            .map(async (shape) => {
                const query = `#graphql
                    query GET_ITEMS_FOR_SHAPE($tenantId: ID!, $identifier: String!, $language: String!) {
                        shape {
                            get(identifier: $identifier, tenantId: $tenantId) {
                                items(language: $language) {
                                    id
                                    name
                                    tree {
                                        path
                                    }
                                }
                            }
                        }
                    }`;

                const res = await apiClient.pimApi(query, {
                    tenantId: apiClient.config.tenantId,
                    identifier: shape.identifier,
                    language: 'en',
                });
                return res?.shape?.get?.items;
            }),
    ).then((res) => res.flat().filter((item) => !!item && item?.tree?.path));

    return [
        {
            name: 'Root',
            tree: {
                path: '/',
            },
        } as Item,
        ...folders,
    ];
};
