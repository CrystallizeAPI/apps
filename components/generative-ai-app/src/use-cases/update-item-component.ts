import type { ClientInterface } from '@crystallize/js-api-client';
import { ComponentInput } from '~/__generated__/types';

type Deps = {
    apiClient: ClientInterface;
};
type Args = {
    itemId: string;
    language: string;
    input: ComponentInput;
};
export const updateItemComponent = async ({ itemId, language, input }: Args, { apiClient }: Deps) => {
    const data = await apiClient.pimApi(
        `#graphql
      mutation($itemId: ID!, $language: String!, $input: ComponentInput!)   {
        item {
          updateComponent(itemId: $itemId, language: $language, input: $input){
            id 
          }
        }
    }`,
        {
            itemId,
            language,
            input,
        },
    );
    return data.item.updateComponent;
};
