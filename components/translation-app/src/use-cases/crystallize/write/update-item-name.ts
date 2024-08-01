import type { ClientInterface } from '@crystallize/js-api-client';
import type { ItemType } from '~/__generated__/types';

export const updateItemName =
    (apiClient: ClientInterface) =>
    async ({ id, itemType, language, input }: { id: string; itemType: ItemType; language: string; input: any }) => {
        const data = await apiClient.pimApi(
            `#graphql
      mutation($id: ID!, $language: String!, $input: Update${itemType.replace(
          /^./,
          itemType[0].toUpperCase(),
      )}Input!)   {
        ${itemType} {
          update(id: $id, language: $language, input: $input){
            id 
          }
        }
    }`,
            {
                id,
                itemType,
                language,
                input,
            },
        );
        return data;
    };
