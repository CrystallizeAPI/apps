import { ActionFunction, json } from '@remix-run/node';
import { updateVariantChunk } from '~/use-cases/write/update-content-chunk-variant';
import { updateVariantParagraph } from '~/use-cases/write/update-paragraph-variant';
import { updateVariantRichText } from '~/use-cases/write/update-rich-text-variant';
import { updateVariantSingleLine } from '~/use-cases/write/update-single-line-variant';

export const action: ActionFunction = async ({ request }) => {
    const body = await request.json();
    const { productId, sku, language, data } = body;

    try {
        data?.forEach(async (component: any) => {
            switch (component.type) {
                case 'singleLine':
                    await updateVariantSingleLine(productId, sku, language, component.id, component.translation);
                    break;
                case 'richText':
                    await updateVariantRichText(productId, sku, language, component.id, component.translation);
                    break;
                case 'paragraphCollection':
                    component?.paragraphs &&
                        component.paragraphs?.forEach(async (paragraph: any) => {
                            let content = {
                                title: { text: paragraph.title || '' },
                                body: { html: paragraph.body || '' },
                                images:
                                    paragraph?.images?.map((image: any) => {
                                        return { key: image.key };
                                    }) || [],
                            };
                            await updateVariantParagraph(productId, sku, language, component.id, content);
                        });
                    break;
                case 'contentChunk':
                    await updateVariantChunk(productId, sku, language, component.id, component.chunks);
                    break;
                default:
                    break;
            }
        });
        return json({
            success: true,
        });
    } catch (e) {
        return json({
            success: false,
            error: e,
        });
    }
};
