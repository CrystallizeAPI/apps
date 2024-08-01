/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import type {
    Component,
    ComponentChoiceContent,
    ComponentInput,
    ContentChunkContent,
    FileContent,
    GridRelationsContent,
    Image,
    ImageContent,
    ItemRelationsContent,
    NumericContent,
    ParagraphCollectionContent,
    ParagraphContent,
    RichTextContent,
    SelectionContent,
    SingleLineContent,
    Video,
    VideoContent,
} from '~/__generated__/types';
import { ComponentType } from '~/__generated__/types';

export const EMPTY_TABLE = { title: '', properties: [{ key: '', value: '' }] };

export function updateArrayItem(array: any[], item: any, index: number) {
    return [...array.slice(0, index), item, ...array.slice(index + 1)];
}

export function handleImage(image: Image) {
    if (!image) {
        return image;
    }
    const {
        // @ts-expect-error
        id,
        url,
        // @ts-expect-error
        tempId,
        // @ts-expect-error
        preview,
        // @ts-expect-error
        file,
        // @ts-expect-error
        upload,
        key,
        variants,
        // @ts-expect-error
        isUploading,
        // @ts-expect-error
        uploadProgress,
        // @ts-expect-error
        fileType,
        // @ts-expect-error
        sizes,
        ...content
    } = image;

    const result = {
        key,
        ...content,
    };

    /**
     * if the object property is null, we can actually delete it
     */
    for (const key in result) {
        // @ts-expect-error
        if (result[key] === null || result[key] === undefined) {
            // @ts-expect-error
            delete result[key];
        }
    }

    return result;
}

export function handleVideo(video: Video) {
    return {
        key: video.id,
        title: video.title,
        ...(video.thumbnails && {
            thumbnails: video.thumbnails.map(handleImage),
        }),
    };
}

// Do not send null as of now, workaround for backend issue. #10186
export function handleSingleLine(singleLine?: SingleLineContent | null) {
    if (!singleLine || !singleLine.text) {
        return { text: '' };
    }

    return singleLine;
}

function componentHandler(component: Component, subComponentId?: string, generatedText?: string) {
    switch (component.type) {
        case ComponentType.Boolean: {
            if (!component || !component.content) {
                return { value: false };
            }

            return component.content;
        }
        case ComponentType.ComponentChoice: {
            //* reset the selected component
            if (!component.content || !(component.content as ComponentChoiceContent).selectedComponent) {
                return null;
            }

            const selected = (component.content as ComponentChoiceContent).selectedComponent;
            return toComponentInput(
                selected,
                subComponentId,
                subComponentId === selected.componentId ? generatedText : undefined,
            );
        }
        case ComponentType.ContentChunk: {
            if (!component.content || !(component.content as ContentChunkContent).chunks?.length) {
                return null;
            }

            const transformedChunks = (component.content as ContentChunkContent).chunks.map((chunk, chunkIndex) =>
                chunk.map((c) =>
                    toComponentInput(
                        c,
                        subComponentId,
                        chunkIndex === 0 && subComponentId === c.componentId ? generatedText : undefined,
                    ),
                ),
            );

            return { chunks: transformedChunks };
        }
        case ComponentType.Datetime: {
            if (!component.content) {
                return null;
            }

            return component.content;
        }
        case ComponentType.Files: {
            if (!component.content) {
                return null;
            }

            return (component.content as FileContent).files?.map(({ key, title }) => ({ key, title }));
        }
        case ComponentType.GridRelations: {
            const ids = (component?.content as GridRelationsContent)?.grids?.map((item) => item.id) || [];

            return { gridIds: ids };
        }
        case ComponentType.Images: {
            if (
                !component.content ||
                !(component.content as ImageContent).images ||
                (component.content as ImageContent).images?.length === 0
            ) {
                return null;
            }

            return (component.content as ImageContent).images?.filter((image) => !!image.key).map(handleImage);
        }
        case ComponentType.ItemRelations: {
            const ids = (component?.content as ItemRelationsContent)?.items?.map((item) => item.id) || [];
            const skus = (component?.content as ItemRelationsContent)?.productVariants?.map((item) => item.sku) || [];
            return { itemIds: ids, skus };
        }
        case ComponentType.Location: {
            if (!component.content) {
                return null;
            }

            return component.content;
        }
        case ComponentType.Numeric: {
            if (!component.content) {
                return null;
            }

            const { number, unit } = component.content as NumericContent;

            return {
                number: number ?? 0,
                unit,
            };
        }
        case ComponentType.ParagraphCollection: {
            const { content } = component;

            const paragraphs =
                (content as ParagraphCollectionContent)?.paragraphs?.map((paragraph: ParagraphContent, pIndex) => {
                    const { images, videos, title, body } = paragraph;

                    return {
                        body: { html: pIndex === 0 ? generatedText ?? body?.plainText : body?.plainText },
                        title: handleSingleLine(title),
                        images:
                            images && images?.length ? images?.filter((image) => !!image.key).map(handleImage) : null,
                        videos:
                            videos && videos?.length
                                ? videos
                                      .filter(Boolean)
                                      // @ts-expect-error
                                      ?.filter((video: Video) => !!video?.id || !!video?.tempId)
                                      .map(handleVideo)
                                : null,
                    };
                }) ?? [];

            return { paragraphs };
        }
        case ComponentType.PropertiesTable: {
            if (!component.content) {
                return null;
            }

            return component.content;
        }
        case ComponentType.RichText: {
            if (!component) {
                return null;
            }

            if (generatedText) {
                return { html: generatedText };
            }

            const { content } = component;

            if (content && 'plainText' in content && !content.plainText) {
                return null;
            }

            if (!content) {
                return null;
            }

            return { html: (content as RichTextContent).plainText };
        }
        case ComponentType.Selection: {
            if (!component.content || !(component.content as SelectionContent).options) {
                return null;
            }

            return {
                keys: (component.content as SelectionContent).options?.map(({ key }) => key),
            };
        }
        case ComponentType.SingleLine: {
            if (generatedText) {
                return handleSingleLine({
                    text: generatedText,
                } as SingleLineContent);
            }
            return handleSingleLine(component.content as SingleLineContent);
        }
        case ComponentType.Videos: {
            if (
                !component.content ||
                !(component.content as VideoContent).videos ||
                (component.content as VideoContent)?.videos?.length === 0
            ) {
                return null;
            }

            return (component.content as VideoContent)?.videos?.map(handleVideo).filter((v) => v.key);
        }

        default:
            break;
    }
}

export function toComponentInput(
    component: Component,
    subComponentId?: string,
    generatedText?: string,
): ComponentInput {
    return {
        componentId: component.componentId,
        [component.type]: componentHandler(component, subComponentId, generatedText),
    };
}
