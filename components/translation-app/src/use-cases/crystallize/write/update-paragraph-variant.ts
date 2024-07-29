import { apiClient } from '../shared';

export async function updateVariantParagraph(
    itemId: string,
    sku: string,
    language: string,
    componentId: string,
    content: any,
) {
    try {
        const data = await apiClient.pimApi(
            `#graphql
          mutation(
            $productId: ID!
            $sku: String!
            $language: String!
            $componentId: String!
            $content: [ParagraphContentInput!]!
          ) {
            product {
              updateVariantComponent(
                productId: $productId
                sku: $sku
                language: $language
                input: {
                  componentId: $componentId
                  paragraphCollection: { paragraphs: $content }
                }
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
                content,
            },
        );
        console.log(data);
        return data.product.updateVariantComponent;
    } catch (error) {
        console.error(error);
    }
}
