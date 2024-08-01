import { apiClient } from '../shared';

type Paragraph = {
    title: string;
    body: string;
    images: any[];
};

export async function updateVariantChunk(
    itemId: string,
    sku: string,
    language: string,
    componentId: string,
    content: any,
) {
    try {
        const paragraphCollection = (paragraphs: Paragraph[]) => {
            return {
                paragraphs: paragraphs.map((paragraph: any) => {
                    return {
                        title: { text: paragraph.title || '' },
                        body: { html: paragraph.body || '' },
                        images: paragraph.images || [],
                    };
                }),
            };
        };

        let itemsToUpdate: any = [];

        content?.map((chunk: any) => {
            switch (chunk.type) {
                case 'singleLine':
                    itemsToUpdate.push({
                        singleLine: { text: chunk?.translation },
                        componentId: chunk.id,
                    });
                    break;
                case 'richText':
                    itemsToUpdate.push({
                        richText: { html: chunk?.translation },
                        componentId: chunk.id,
                    });
                    break;
                case 'paragraphCollection':
                    itemsToUpdate.push({
                        paragraphCollection: paragraphCollection(chunk?.paragraphs),
                        componentId: chunk.id,
                    });
                    break;
                default:
                    break;
            }
        });
        const data = await apiClient.pimApi(
            `#graphql
          mutation(
            $productId: ID!
            $sku: String!
            $language: String!
            $componentId: String!
            $content: [[ComponentInput!]!]!
          ) {
            product {
              updateVariantComponent(
                productId: $productId
                sku: $sku
                language: $language
                disableValidation: true
                input: {
                  componentId: $componentId
                  contentChunk: {
                    chunks: $content
                  }
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
                content: itemsToUpdate,
            },
        );
        return data.product.updateVariantComponent;
    } catch (error) {
        console.error(error);
    }
}
