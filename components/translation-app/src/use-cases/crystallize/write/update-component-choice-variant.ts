import { apiClient } from '../shared';

export async function updateVariantComponentChoice(
    itemId: string,
    sku: string,
    language: string,
    componentId: string,
    content: { translation: string; type: string; id: string },
) {
    const itemToUpdate =
        (content?.type === 'singleLine' && { singleLine: { text: content?.translation }, componentId: content.id }) ||
        (content?.type === 'richText' && { richText: { html: content?.translation }, componentId: content.id });

    try {
        const data = await apiClient.pimApi(
            `#graphql
        mutation(
          $productId: ID!
          $sku: String!
          $language: String!
          $componentId: String!
          $text: ComponentInput
        ) {
          product {
            updateVariantComponent(
              productId: $productId
              sku: $sku
              language: $language
              input: { componentId: $componentId, componentChoice: $text }
            ) {
              id
            }
          }
        }
    `,
            {
                productId: itemId,
                sku,
                language,
                componentId,
                text: itemToUpdate,
            },
        );
        return data.product.updateVariantComponent;
    } catch (error) {
        console.error(error);
    }
}
