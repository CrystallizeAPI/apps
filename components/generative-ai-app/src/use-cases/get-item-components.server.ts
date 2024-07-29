import type { Item, Maybe } from '~/__generated__/types';
import type { ClientInterface } from '@crystallize/js-api-client';
import { Component } from '~/core/graphql/fragments';

type Deps = {
    apiClient: ClientInterface;
};
export const getItemComponents = async (id: string, language: string, { apiClient }: Deps) => {
    const data = await apiClient.pimApi(
        `#graphql
     query GET_ITEM_COMPONENTS($id: ID!, $language: String!, $versionLabel: VersionLabel) {
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
