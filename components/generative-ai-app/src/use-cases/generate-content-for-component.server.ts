import { ClientInterface } from '@crystallize/js-api-client';
import { Generator } from '~/core/generator.server';
import { getComponentList } from './get-component-list.server';
import { toComponentInput } from './to-component-input.server';
import { updateVariantComponent } from './update-variant-component';
import { updateItemComponent } from './update-item-component';
import { json } from '@remix-run/node';

type Deps = {
    apiClient: ClientInterface;
    generator: Generator;
};

type Args = {
    componentId: string;
    prompt: string;
    itemId: string;
    variantId?: string;
    sku?: string;
    language: string;
};

export const generateContentForComponent = async (
    { componentId, prompt, itemId, variantId, sku: optionalSKU, language }: Args,
    { apiClient, generator }: Deps,
) => {
    const { components: existingComponentList, sku } = await getComponentList(
        { language, itemId, sku: optionalSKU, variantId },
        { apiClient },
    );
    let generatedText: string | null = null;
    try {
        generatedText = await generator.generate({
            text: prompt,
            language,
        });
        // here we just have to replace the text of the component with the generated text
        // for paragraphs, we don't handle title
        const splitId = componentId.split('.');
        const component = existingComponentList.find((c) => c.componentId === splitId[0]);
        splitId.shift();
        if (component) {
            const input = toComponentInput(component, splitId.join('.'), generatedText);
            if (sku) {
                await updateVariantComponent(
                    {
                        input,
                        language,
                        sku,
                        productId: itemId,
                    },
                    { apiClient },
                );
                return {
                    success: true,
                    generatedText,
                    event: 'refetchItemVariantComponents',
                };
            }
            await updateItemComponent({ itemId, language, input }, { apiClient });
            return {
                success: true,
                generatedText,
                event: 'refetchItemComponents',
            };
        }
        return json({
            success: false,
            generatedText,
            error: 'Nothing to do.',
        });
    } catch (error) {
        console.error(error);
        return {
            success: false,
            generatedText,
            error: error instanceof Error ? error.message : 'Unknown error.',
        };
    }
};
