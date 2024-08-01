import { apiClient } from '../shared';

export async function updateVariantRichText(
    itemId: string,
    sku: string,
    language: string,
    componentId: string,
    content: string,
) {
    try {
        const data = await apiClient.pimApi(
            `#graphql
          mutation(
            $productId: ID!
            $sku: String!
            $language: String!
            $componentId: String!
            $text: String!
          ) {
            product {
              updateVariantComponent(
                productId: $productId
                sku: $sku
                language: $language
                input: { componentId: $componentId, richText: { html: [$text] } }
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
                text: content,
            },
        );
        return data.product.updateVariantComponent;
    } catch (error) {
        console.error(error);
    }
}
