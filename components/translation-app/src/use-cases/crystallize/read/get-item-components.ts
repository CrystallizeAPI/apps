import type { Item, Maybe } from '~/__generated__/types';
import { Component } from './fragments';
import type { ClientInterface } from '@crystallize/js-api-client';

export const getItemComponents = (apiClient: ClientInterface) => async (id: string, language: string) => {
    const data = await apiClient.pimApi(
        `#graphql
     query GET_PRODUCT_COMPONENTS($id: ID!, $language: String!, $versionLabel: VersionLabel) {
      item {
       get(id: $id, language: $language, versionLabel: $versionLabel) {
        name
        type
        components {
          ...Component
        }
      }
    }
  }
  ${Component}
    `,
        {
            id,
            language,
            version: 'draft',
        },
    );

    return data?.item?.get as Maybe<Item>;
};
