import type { ClientInterface } from '@crystallize/js-api-client';

export const getAvailableLanguages = (apiClient: ClientInterface) => async (identifier: string) => {
    const data = await apiClient.pimApi(
        `#graphql
            query ($identifier: String!) {
                tenant {
                    get(identifier: $identifier) {
                        availableLanguages {
                            name
                            code
                        }
                    }
                }
            }
        `,
        {
            identifier,
        },
    );
    return data.tenant.get.availableLanguages;
};
