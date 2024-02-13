import {
    JSONItem,
    type JSONComponentContent,
    type JSONImage,
    type JSONProduct,
    type JSONProductVariant,
    JSONContentChunk,
} from '@crystallize/import-utilities';
import { v4 as uuidv4 } from 'uuid';
import type { ContentChunkComponentConfig, NumericComponentConfig, Shape, ShapeComponent } from '@crystallize/schema';
import { FIELD_MAPPINGS } from '~/contracts/ui-types';
import { FormSubmission } from '~/contracts/form-submission';

const contentForComponent = (component: ShapeComponent, key: string, content: string): any => {
    if (component.type === 'boolean') {
        return !!content;
    }

    if (component.type === 'datetime') {
        return new Date(content).toISOString();
    }

    if (component.type === 'gridRelations') {
        return [...content.split(',').map((name) => ({ name }))];
    }

    if (component.type === 'images') {
        return [...content.split(',').map((src) => ({ src }))];
    }

    if (component.type === 'itemRelations') {
        return [...content.split(',').map((externalReference) => ({ externalReference }))];
    }

    if (component.type === 'location') {
        return {
            lat: Number.parseFloat(content.split(',')[0]),
            long: Number.parseFloat(content.split(',')[1]),
        };
    }

    if (component.type === 'numeric') {
        const unit = (component.config as NumericComponentConfig).units?.[0];
        return {
            number: Number.parseFloat(content),
            ...(unit ? { unit } : {}),
        };
    }

    if (component.type === 'paragraphCollection') {
        return {
            html: content,
        };
    }

    if (component.type === 'singleLine' || component.type === 'richText') {
        return content;
    }

    if (component.type === 'contentChunk') {
        const keyParts = key.split('.');
        const chunkId = keyParts[1];

        const subcomp = (component.config as ContentChunkComponentConfig)?.components?.find((c) => c.id === chunkId);
        return [
            {
                [chunkId]: contentForComponent(subcomp, keyParts.slice(1).join('.'), content),
            },
        ];
    }
    throw new Error(`Component type "${component.type} is not yet supported for import"`);
};

const mapComponents = (
    row: Record<string, any>,
    mapping: Record<string, string>,
    prefix: 'components' | 'variantComponents',
    shape: Shape,
): Record<string, JSONComponentContent> => {
    return Object.entries(mapping)
        .filter(([key]) => key.split('.')[0] === prefix)
        .reduce((acc: Record<string, JSONComponentContent>, [key, value]) => {
            const keyParts = key.split('.');
            const componentId = keyParts[1];
            const component = shape[prefix]?.find((cmp) => cmp.id === componentId);
            const content: string = row[value];

            if (!component) {
                console.error('Component does not exist', componentId);
                return acc;
            }

            if (!content) {
                return acc;
            }

            if (acc[componentId] && component.type === 'contentChunk') {
                // that's normal, we can have multiple content chunks
                // but the import will only fill the 1st one
                const existingChunks = acc[componentId] as JSONContentChunk;
                const existingChunkEntries = existingChunks[0];
                const newChunkEntries = contentForComponent(component, keyParts.slice(1).join('.'), content)[0];
                acc[componentId] = [
                    {
                        ...existingChunkEntries,
                        ...newChunkEntries,
                    },
                ];
                return acc;
            }

            acc[componentId] = contentForComponent(component, keyParts.slice(1).join('.'), content);

            return acc;
        }, {});
};

type MapVariantOptions = {
    roundPrices?: boolean;
};
const mapVariant = (
    row: Record<string, any>,
    mapping: Record<string, string>,
    shape: Shape,
    options?: MapVariantOptions,
): JSONProductVariant => {
    const name = row[mapping[FIELD_MAPPINGS.item.name.key]];
    const sku = row[mapping['variant.sku']];
    const images = row[mapping['variant.images']];
    let price = row[mapping['variant.price']] ? Number.parseFloat(row[mapping['variant.price']]) : undefined;
    const stock = row[mapping['variant.stock']] ? Number.parseFloat(row[mapping['variant.stock']]) : undefined;
    const externalReference = row[mapping[FIELD_MAPPINGS.productVariant.externalReference.key]];

    const attributeKeys = Object.keys(mapping).filter((key) => key.startsWith('variantAttribute.'));
    const attributes: Record<string, string> = attributeKeys.reduce((acc: Record<string, string>, key) => {
        const attr = key.split('.').at(-1) as string;
        acc[attr] = `${row[mapping[key]] || ''}`;
        return acc;
    }, {});

    if (options?.roundPrices && price) {
        price = Math.round(price * 100) / 100;
    }
    const variant: JSONProductVariant = {
        name,
        sku,
        price,
        stock,
        externalReference,
        attributes,
    };

    if (images) {
        variant.images = images.split(',').map(
            (src: string): JSONImage => ({
                src,
            }),
        );
    }

    variant.components = mapComponents(row, mapping, 'variantComponents', shape);
    return variant;
};

export const specFromFormSubmission = async (submission: FormSubmission, shapes: Shape[]) => {
    const { shapeIdentifier, folderPath, rows, mapping, groupProductsBy, subFolderMapping, roundPrices } = submission;

    const shape = shapes.find((s) => s.identifier === shapeIdentifier);
    if (!shape) {
        throw new Error(`Shape ${shapeIdentifier} not found.`);
    }
    const buildExternalReference = (name: string) => {
        return folderPath.replace(/^\//, '-').replace(/\//g, '-') + '-' + name.replace(/\//g, '-').toLocaleLowerCase();
    };

    const folders = subFolderMapping
        ? rows.reduce((memo: JSONItem[], row) => {
              const depth = subFolderMapping.length;
              for (let d = 0; d < depth; d++) {
                  const column = subFolderMapping[d].column;
                  const name = row[column];
                  const folder = {
                      name,
                      shape: subFolderMapping[d].shapeIdentifier,
                      externalReference: buildExternalReference(name),
                      ...(d === 0
                          ? { parentCataloguePath: folderPath }
                          : { parentExternalReference: buildExternalReference(row[subFolderMapping[d - 1].column]) }),
                  };
                  if (!memo.some((f) => f.externalReference === folder.externalReference)) {
                      memo.push(folder);
                  }
              }
              return memo;
          }, [])
        : [];

    // init spec with folder
    const items: JSONItem[] = folders;

    const findParent = (row: Record<string, any>) => {
        if (subFolderMapping) {
            const last = subFolderMapping.length - 1;
            const folder = folders.find(
                (f) => f.externalReference === buildExternalReference(row[subFolderMapping[last].column]),
            );
            if (folder) {
                return {
                    parentExternalReference: folder.externalReference,
                };
            }
            return { parentCataloguePath: folderPath };
        }
    };

    if (shape.type === 'product') {
        const variants = rows.map((row) =>
            mapVariant(row, mapping, shape, {
                roundPrices: !!roundPrices,
            }),
        );
        const mapProduct = (obj: Record<string, JSONProduct>, row: Record<string, any>, i: number) => {
            const productName = row[mapping['item.name']];
            let product: JSONProduct = {
                name: productName || variants[i].name,
                shape: shape.identifier,
                vatType: 'No Tax',
                variants: [variants[i]],
                components: mapComponents(row, mapping, 'components', shape),
                ...findParent(row),
            };

            if (groupProductsBy && row[groupProductsBy]) {
                if (obj[row[groupProductsBy]]) {
                    product = obj[row[groupProductsBy]];
                    product.variants = product.variants.concat(variants[i]);
                }
                obj[row[groupProductsBy]] = product;
            } else {
                obj[uuidv4()] = product;
            }
            return obj;
        };
        items.push(...Object.values(rows.reduce(mapProduct, {})));
    } else {
        items.push(
            ...rows.map((row) => ({
                name: row[mapping['item.name']],
                shape: shape.identifier,
                components: mapComponents(row, mapping, 'components', shape),
                ...findParent(row),
            })),
        );
    }
    return {
        items,
    };
};
