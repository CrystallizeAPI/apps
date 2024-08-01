import type { ClientInterface } from '@crystallize/js-api-client';
import { getAvailableLanguages } from './read/get-available-languages';
import { getItemComponents } from './read/get-item-components';
import { getVariantComponents } from './read/get-variant-components';
import { getVariants } from './read/get-variants';
import { updateItemComponent } from './write/update-item-component';
import { updateVariantComponent } from './write/update-variant-component';
import { updateItemName } from './write/update-item-name';
import { updateVariantName } from './write/update-variant-name';

export const getApi = (apiClient: ClientInterface) => {
    return {
        getAvailableLanguages: async () => getAvailableLanguages(apiClient)(apiClient.config.tenantIdentifier),
        getItemComponents: async (...params: Parameters<ReturnType<typeof getItemComponents>>) =>
            getItemComponents(apiClient)(...params),
        getVariantComponents: async (...params: Parameters<ReturnType<typeof getVariantComponents>>) =>
            getVariantComponents(apiClient)(...params),
        getVariants: async (...params: Parameters<ReturnType<typeof getVariants>>) => getVariants(apiClient)(...params),
        updateItemComponent: async (...params: Parameters<ReturnType<typeof updateItemComponent>>) =>
            updateItemComponent(apiClient)(...params),
        updateVariantComponent: async (...params: Parameters<ReturnType<typeof updateVariantComponent>>) =>
            updateVariantComponent(apiClient)(...params),
        updateItemName: async (...params: Parameters<ReturnType<typeof updateItemName>>) =>
            updateItemName(apiClient)(...params),
        updateVariantName: async (...params: Parameters<ReturnType<typeof updateVariantName>>) =>
            updateVariantName(apiClient)(...params),
    };
};
