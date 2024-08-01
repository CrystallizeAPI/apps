import { apiClient } from '../shared';

export async function updateRichTextComponent(itemId: string, language: string, componentId: string, content: string) {
    try {
        const data = await apiClient.pimApi(
            `#graphql
            mutation(
                $itemId: ID!
                $language: String!
                $componentId: String!
                $content: String!
            ) {
                item {
                updateComponent(
                    itemId: $itemId
                    language: $language
                    input: { componentId: $componentId, richText: { html: [$content] } }
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
