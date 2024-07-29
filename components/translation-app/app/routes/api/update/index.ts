import { ActionFunction, json } from '@remix-run/node';
import { updateVariantComponentChoice } from '~/use-cases/write/update-component-choice-variant';
import { updateContentChunk } from '~/use-cases/write/update-content-chunk';
import { updateVariantChunk } from '~/use-cases/write/update-content-chunk-variant';
import { updateParagraphCollection } from '~/use-cases/write/update-paragraph-collection';
import { updateVariantParagraph } from '~/use-cases/write/update-paragraph-variant';
import { updateRichTextComponent } from '~/use-cases/write/update-rich-text-component';
import { updateVariantRichText } from '~/use-cases/write/update-rich-text-variant';
import { updateSingleLineComponent } from '~/use-cases/write/update-single-line-component';
import { updateVariantSingleLine } from '~/use-cases/write/update-single-line-variant';

export const action: ActionFunction = async ({ request }) => {
    const body = await request.json();
    console.log('body', body);
    try {
        switch (body.type) {
            case 'singleLine':
                await updateSingleLineComponent(body.id, body.language, body.componentId, body.content || '');
                break;
            case 'richText':
                await updateRichTextComponent(body.id, body.language, body.componentId, body.content || '');
                break;
            case 'paragraphCollection':
                await updateParagraphCollection(body.id, body.language, body.componentId, body.content || []);
                break;
            case 'contentChunk':
                await updateContentChunk(body.id, body.language, body.componentId, body.content || []);
                break;
            case 'variantSingleLine':
                await updateVariantSingleLine(
                    body.productId,
                    body.sku,
                    body.language,
                    body.componentId,
                    body.content || '',
                );
                break;
            case 'variantRichText':
                await updateVariantRichText(
                    body.productId,
                    body.sku,
                    body.language,
                    body.componentId,
                    body.content || '',
                );
                break;
            case 'variantComponentChoice':
                await updateVariantComponentChoice(
                    body.productId,
                    body.sku,
                    body.language,
                    body.componentId,
                    body.content || '',
                );
                break;
            case 'variantParagraphCollection':
                await updateVariantParagraph(
                    body.productId,
                    body.sku,
                    body.language,
                    body.componentId,
                    body.content || [],
                );
                break;
            case 'variantContentChunk':
                await updateVariantChunk(body.productId, body.sku, body.language, body.componentId, body.content || []);
                break;
            default:
                break;
        }
    } catch (e) {
        console.log('error', e);
    }

    return json({
        success: true,
    });
};
