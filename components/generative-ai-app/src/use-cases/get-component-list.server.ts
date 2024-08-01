import { ClientInterface } from '@crystallize/js-api-client';
import { getVariants } from './get-variants';
import { getVariantComponents } from './get-variant-components.server';
import { getItemComponents } from './get-item-components.server';

type Deps = {
    apiClient: ClientInterface;
};

type Args = {
    language: string;
    itemId: string;
    variantId?: string;
    sku?: string;
};
export const getComponentList = async (
    { language, itemId, sku: optionalSKU, variantId }: Args,
    { apiClient }: Deps,
) => {
    const isVariant = Boolean(variantId || optionalSKU);

    const getSku = async (args: Args) => {
        if (args.sku) {
            return args.sku;
        }
        const item = await getVariants(itemId, language, { apiClient });
        return item?.variants.find((variant) => variant.id === variantId)?.sku || '';
    };
    if (isVariant) {
        const sku = await getSku({ language, itemId, sku: optionalSKU, variantId });
        const data = await getVariantComponents(itemId, language, sku, { apiClient });
        return {
            components: data?.variant?.components || [],
            sku,
        };
    }

    const item = await getItemComponents(itemId, language, { apiClient });
    return {
        components: item?.components || [],
        sku: undefined,
    };
};
