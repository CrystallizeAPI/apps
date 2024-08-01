import { apiClient } from '../shared';

export async function updateParagraphCollection(itemId: string, language: string, componentId: string, content: any) {
    try {
        const data = await apiClient.pimApi(
            `#graphql
                mutation(
                    $itemId: ID!
                    $language: String!
                    $componentId: String!
                    $content: [ParagraphContentInput!]!
                ) {
                    item {
                    updateComponent(
                        itemId: $itemId
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
                itemId,
                language,
                componentId,
                content,
            },
        );
        return data.item.updateComponent;
    } catch (error) {
        console.error(error);
    }
}
