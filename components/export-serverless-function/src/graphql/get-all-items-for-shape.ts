import { gql, GraphQLClient } from 'graphql-request';
import { getClient } from './client';

const query = gql`
    query ($tenantId: ID!, $shapeIdentifier: String!, $language: String!) {
        shape {
            get(identifier: $shapeIdentifier, tenantId: $tenantId) {
                items(language: $language) {
                    id
                    name
                    tree {
                        path
                    }
                    externalReference
                    createdAt
                    updatedAt
                    version {
                        label
                    }
                    topics {
                        id
                        path
                    }
                    components {
                        componentId
                        content {
                            ...ComponentContent
                            ... on ComponentChoiceContent {
                                selectedComponent {
                                    componentId
                                    content {
                                        ...ComponentContent
                                    }
                                }
                            }
                            ... on ContentChunkContent {
                                chunks {
                                    componentId
                                    content {
                                        ...ComponentContent
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    fragment ComponentContent on ComponentContent {
        ... on BooleanContent {
            value
        }
        ... on DatetimeContent {
            datetime
        }
        ... on FileContent {
            files {
                url
            }
        }
        ... on GridRelationsContent {
            grids {
                id
            }
        }
        ... on ImageContent {
            images {
                url
            }
        }
        ... on ItemRelationsContent {
            items {
                id
            }
        }
        ... on LocationContent {
            lat
            long
        }
        ... on NumericContent {
            number
            unit
        }
        ... on ParagraphCollectionContent {
            paragraphs {
                title {
                    text
                }
                body {
                    plainText
                }
                images {
                    url
                }
                videos {
                    playlists
                }
            }
        }
        ... on PropertiesTableContent {
            sections {
                title
                properties {
                    key
                    value
                }
            }
        }
        ... on RichTextContent {
            plainText
        }
        ... on SelectionContent {
            options {
                key
                value
            }
        }
        ... on SingleLineContent {
            text
        }
        ... on VideoContent {
            videos {
                playlists
            }
        }
    }
`;

export const getAllItemsForShape = async (tenantId: string, shapeIdentifier: string, language: string) => {
    const res = await getClient().request(query, {
        tenantId,
        shapeIdentifier,
        language,
    });
    return res.shape.get.items;
};
