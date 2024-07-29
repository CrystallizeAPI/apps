import type { ClientInterface } from '@crystallize/js-api-client';

export const updateVariantName =
    (apiClient: ClientInterface) =>
    async ({ id, sku, language, input }: { id: string; sku: string; language: string; input: any }) => {
        console.log({ id, sku, language, input });
        const data = await apiClient.pimApi(
            `#graphql
                mutation($id: ID!, $sku: String, $language: String!, $input: UpdateSingleProductVariantInput!)   {
                    product {
                    updateVariant(productId: $id, sku: $sku, language: $language, input: $input){
                        id 
                    }
                }
            }`,
            {
                id,
                sku,
                language,
                input,
            },
        );

        return data;
    };
