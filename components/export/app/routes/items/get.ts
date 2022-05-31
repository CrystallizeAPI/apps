import { ActionFunction, json } from '@remix-run/node';
import { createClient } from '@crystallize/js-api-client';
import { gql } from 'graphql-request';
import type { Item } from '~/types';

const { CRYSTALLIZE_TENANT_IDENTIFIER } = process.env;

const query = gql`
    query ($path: String!) {
        catalogue(path: $path) {
            children {
                ...item
                ...product
                topics {
                    path
                    name
                }
            }
        }
    }

    fragment content on ComponentContent {
        ...boolean
        ...singleLine
        ...richText
        ...imageContent
        ...paragraphCollection
        ...itemRelations
        ...gridRelations
        ...location
        ...propertiesTable
        ...dateTime
        ...videoContent
        ...numeric
        ...selection
        ...file
    }

    fragment component on Component {
        id
        name
        type
        content {
            ...content
            ...componentChoice
            ...contentChunk
        }
    }

    fragment dateTime on DatetimeContent {
        datetime
    }

    fragment imageContent on ImageContent {
        images {
            ...image
        }
    }

    fragment image on Image {
        url
        altText
        key
        variants {
            url
            width
            key
        }
    }

    fragment item on Item {
        id
        name
        type
        path
        shape {
            identifier
        }
        components {
            ...component
        }
    }

    fragment location on LocationContent {
        lat
        long
    }

    fragment paragraphCollection on ParagraphCollectionContent {
        paragraphs {
            title {
                ...singleLine
            }
            body {
                ...richText
            }
            images {
                ...image
            }
        }
    }

    fragment product on Product {
        id
        name
        type
        language
        path

        components {
            ...component
        }

        variants {
            id
            name
            sku
            price
            stock
            priceVariants {
                identifier
                name
                price
                currency
            }
            stockLocations {
                identifier
                name
                stock
            }
            isDefault
            images {
                url
                altText
                key

                variants {
                    key
                    width
                    url
                }
            }

            subscriptionPlans {
                identifier
                name
                periods {
                    id
                    name
                    initial {
                        priceVariants {
                            identifier
                            name
                            price
                            currency
                        }
                    }
                    recurring {
                        priceVariants {
                            identifier
                            name
                            price
                            currency
                        }
                    }
                }
            }
        }

        vatType {
            name
            percent
        }
    }

    fragment propertiesTable on PropertiesTableContent {
        sections {
            ... on PropertiesTableSection {
                title
                properties {
                    key
                    value
                }
            }
        }
    }

    fragment itemRelations on ItemRelationsContent {
        items {
            id
            name
            path
        }
    }

    fragment gridRelations on GridRelationsContent {
        grids {
            id
            name
        }
    }

    fragment richText on RichTextContent {
        json
        html
        plainText
    }

    fragment boolean on BooleanContent {
        value
    }

    fragment singleLine on SingleLineContent {
        text
    }

    fragment videoContent on VideoContent {
        videos {
            ...video
        }
    }

    fragment video on Video {
        id
        playlists
        title
        thumbnails {
            ...image
        }
    }

    fragment numeric on NumericContent {
        number
        unit
    }

    fragment componentChoice on ComponentChoiceContent {
        selectedComponent {
            id
            name
            type
            content {
                ...content
            }
        }
    }

    fragment contentChunk on ContentChunkContent {
        chunks {
            id
            name
            type
            content {
                ...content
            }
        }
    }

    fragment selection on SelectionContent {
        options {
            key
            value
        }
    }

    fragment file on FileContent {
        files {
            url
            key
            title
            size
        }
    }
`;

export const getCatalogue = async (path: string, shapeIdentifier: string): Promise<Item[]> => {
    if (!CRYSTALLIZE_TENANT_IDENTIFIER) {
        throw new Error('Crystallize environment vars must be set');
    }

    const client = createClient({
        tenantIdentifier: CRYSTALLIZE_TENANT_IDENTIFIER,
    }).catalogueApi;

    const res = await client(query, {
        path,
    });
    return res?.catalogue?.children?.filter((item: Item) => item.shape.identifier === shapeIdentifier);
};

export const action: ActionFunction = async ({ request }) => {
    const { path, shapeIdentifier } = await request.json();
    const catalogue = await getCatalogue(path, shapeIdentifier);
    return json(catalogue, 200);
};
