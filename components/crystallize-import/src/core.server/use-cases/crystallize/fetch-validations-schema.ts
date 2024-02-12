import { ClientInterface } from '@crystallize/js-api-client';
import Ajv, { JSONSchemaType, ValidateFunction } from 'ajv';
import { JTDDataType } from 'ajv/dist/core';

type Deps = {
    apiClient: ClientInterface;
};

type ValidationSchema<T> = {
    schema: JSONSchemaType<T>;
    validate: ValidateFunction<JTDDataType<T>>;
};

export const fetchValidationsSchema = async ({ apiClient }: Deps): Promise<Record<string, ValidationSchema<any>>> => {
    if (!apiClient.config.tenantId) {
        throw new Error('tenantId not set on the ClientInterface.');
    }
    const query = `#graphql
        query ($tenantId: ID!, $language: String!) {
            shape {
                get(identifier: "validation-rules", tenantId: $tenantId) {
                    items(language: $language) {
                  components {
                    componentId
                    content {
                      __typename
                      ... on ContentChunkContent {
                        chunks {
                          componentId
                          content {
                            ... on SingleLineContent {
                              text
                            }
                            ... on RichTextContent {
                                plainText
                            }
                            ... on FileContent {
                              files {
                                url
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
            }
        }
    }`;

    const res = await apiClient.pimApi(query, {
        tenantId: apiClient.config.tenantId,
        language: 'en',
    });

    // we take the first item in the array
    const item = res?.shape?.get?.items[0];
    if (!item) {
        return {};
    }
    const shapes = item?.components?.find((component: any) => component?.componentId === 'shapes');
    if (!shapes) {
        return {};
    }

    const chunks = shapes?.content?.chunks;
    if (!chunks) {
        return {};
    }

    const results =
        chunks.reduce((rules: Record<string, [string, string]>, chunk: any) => {
            const identifier = chunk?.find((c: any) => c?.componentId === 'identifier')?.content?.text;
            const schemaUrl = chunk?.find((c: any) => c?.componentId === 'schema')?.content?.files[0]?.url;
            const inlineschema = chunk?.find((c: any) => c?.componentId === 'inline-schema')?.content?.plainText;
            return {
                ...rules,
                [identifier]: [inlineschema, schemaUrl],
            };
        }, {}) ?? {};

    const keys = Object.keys(results);
    await Promise.all(
        keys.map(async (key) => {
            const [inlineSchema, url] = results[key];

            let schema = null;
            if (inlineSchema && inlineSchema.length > 0) {
                try {
                    schema = JSON.parse(inlineSchema);
                } catch (e) {
                    console.error(`Invalid inline schema for ${key}`);
                }
            }
            if (!schema) {
                schema = await fetch(url).then((res) => res.json());
            }

            const ajv = new Ajv({ allErrors: true, code: { esm: true } });
            const validate = ajv.compile(schema);
            results[key] = {
                schema,
                validate,
            };
        }),
    );
    return results;
};
