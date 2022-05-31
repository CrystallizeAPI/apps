import { gql, GraphQLClient } from 'graphql-request';
import { Item } from '../types';
import { getClient } from './client';

const query = gql`
    query ($tenantId: ID!, $shapeIdentifier: String!, $language: String!, $versionLabel: VersionLabel) {
        shape {
            get(identifier: $shapeIdentifier, tenantId: $tenantId) {
                type
                items(language: $language) {
                    id
                    name
                    hasVersion(versionLabel: $versionLabel)
                    tree {
                        path
                    }
                    externalReference
                    createdAt
                    updatedAt
                    topics {
                        id
                        path
                    }
                    ...Product
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

    fragment Product on Product {
        variants {
            id
            name
            sku
            attributes {
                attribute
                value
            }
            priceVariants {
                identifier
                price
            }
            stockLocations {
                identifier
                stock
            }
            subscriptionPlans {
                identifier
            }
            images {
                url
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

export const getAllItemsForShape = async (
    tenantId: string,
    shapeIdentifier: string,
    language: string,
    versionLabel: string = 'current',
): Promise<Item[]> => {
    const res = await getClient().request(query, {
        tenantId,
        shapeIdentifier,
        language,
        versionLabel,
    });
    return res.shape.get.items;
};
