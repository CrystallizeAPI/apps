import type { Maybe, Product } from '~/__generated__/types';
import type { ClientInterface } from '@crystallize/js-api-client';

export const getVariants = (apiClient: ClientInterface) => async (id: string, language: string) => {
    const data = await apiClient.pimApi(
        `#graphql
     query GET_PRODUCT_COMPONENTS($id: ID!, $language: String!, $versionLabel: VersionLabel) {
      product {
       get(id: $id, language: $language, versionLabel: $versionLabel) {
        variants {
          id
          sku
        }
      }
    }
  }
    `,
        {
            id,
            language,
            version: 'draft',
        },
    );

    return data?.product?.get as Maybe<Product>;
};
