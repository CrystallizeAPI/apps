import { apiClient } from '../shared';

type Paragraph = {
    title: string;
    body: string;
    images: any[];
};

export async function updateContentChunk(itemId: string, language: string, componentId: string, content: any) {
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

    try {
        const data = await apiClient.pimApi(
            `#graphql
              mutation(
                $itemId: ID!
                $language: String!
                $componentId: String!
                $content: [[ComponentInput!]!]!
              ) {
                item {
                  updateComponent(
                    itemId: $itemId
                    language: $language
                    input: { componentId: $componentId, contentChunk: { chunks: $content } }
                  ) {
                    id
                  }
                }
              }
              `,
            {
                itemId,
                language,
                componentId,
                content: itemsToUpdate.filter(Boolean),
            },
        );
        return data.item.updateComponent;
    } catch (error) {
        console.log(error);
    }
}
