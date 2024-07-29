import type { ClientInterface } from '@crystallize/js-api-client';
import { ComponentInput } from '~/__generated__/types';

type Deps = {
    apiClient: ClientInterface;
};

type Args = {
    productId: string;
    language: string;
    sku: string;
    input: ComponentInput;
};

export const updateVariantComponent = async ({ productId, language, sku, input }: Args, { apiClient }: Deps) => {
    const data = await apiClient.pimApi(
        `#graphql
      mutation($productId: ID!, $language: String!, $sku: String!, $input: ComponentInput!)   {
        product {
          updateVariantComponent(productId: $productId, language: $language, sku: $sku, input: $input){
            id 
          }
        }
    }`,
        {
            productId,
            language,
            sku,
            input,
        },
    );
    return data.product?.updateComponent;
};
