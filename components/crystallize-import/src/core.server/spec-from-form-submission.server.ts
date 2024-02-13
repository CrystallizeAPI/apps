import {
    JSONItem,
    type JSONComponentContent,
    type JSONImage,
    type JSONProduct,
    type JSONProductVariant,
} from '@crystallize/import-utilities';
import { v4 as uuidv4 } from 'uuid';
import type { NumericComponentConfig, Shape } from '@crystallize/schema';
import { FIELD_MAPPINGS } from '~/contracts/ui-types';
import { FormSubmission } from '~/contracts/form-submission';

const mapComponents = (
    row: Record<string, any>,
    mapping: Record<string, string>,
    prefix: 'components' | 'variantComponents',
    shape: Shape,
): Record<string, JSONComponentContent> => {
    return Object.entries(mapping)
        .filter(([key]) => key.split('.')[0] === prefix)
        .reduce((acc: Record<string, JSONComponentContent>, [key, value]) => {
            const componentId = key.split('.')[1];
            const component = shape[prefix]?.find((cmp) => cmp.id === componentId);
            const content: string = row[value];

            if (!component) {
                console.error('Component does not exist', componentId);
                return acc;
            }

            if (!content) {
                return acc;
            }

            switch (component?.type) {
                case 'boolean':
                    acc[componentId] = !!content;
                    break;
                case 'datetime':
                    acc[componentId] = new Date(content).toISOString();
                    break;
                case 'gridRelations':
                    acc[componentId] = [...content.split(',').map((name) => ({ name }))];
                    break;
                case 'images':
                    acc[componentId] = [...content.split(',').map((src) => ({ src }))];
                    break;
                case 'itemRelations':
                    acc[componentId] = [...content.split(',').map((externalReference) => ({ externalReference }))];
                    break;
                case 'location':
                    acc[componentId] = {
                        lat: Number.parseFloat(content.split(',')[0]),
                        long: Number.parseFloat(content.split(',')[1]),
                    };
                    break;
                case 'numeric':
                    acc[componentId] = {
                        number: Number.parseFloat(content),
                        unit: component.config ? (component.config as NumericComponentConfig).units?.[0] : undefined,
                    };
                    break;
                case 'paragraphCollection':
                    acc[componentId] = {
                        html: content,
                    };
                    break;
                case 'singleLine':
                case 'richText':
                    acc[componentId] = content;
                    break;
                default:
                    throw new Error(`Component type "${component.type} is not yet supported for import"`);
            }
            return acc;
        }, {});
};

const mapVariant = (row: Record<string, any>, mapping: Record<string, string>, shape: Shape): JSONProductVariant => {
    const name = row[mapping[FIELD_MAPPINGS.item.name.key]];
    const sku = row[mapping['variant.sku']];
    const images = row[mapping['variant.images']];
    const price = row[mapping['variant.price']] ? Number.parseFloat(row[mapping['variant.price']]) : undefined;
    const stock = row[mapping['variant.stock']] ? Number.parseFloat(row[mapping['variant.stock']]) : undefined;
    const externalReference = row[mapping[FIELD_MAPPINGS.productVariant.externalReference.key]];

    const attributeKeys = Object.keys(mapping).filter((key) => key.startsWith('variantAttribute.'));
    const attributes: Record<string, string> = attributeKeys.reduce((acc: Record<string, string>, key) => {
        const attr = key.split('.').at(-1) as string;
        acc[attr] = `${row[mapping[key]] || ''}`;
        return acc;
    }, {});

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
    const { shapeIdentifier, folderPath, rows, mapping, groupProductsBy, subFolderMapping } = submission;

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
        const variants = rows.map((row) => mapVariant(row, mapping, shape));
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

            if (groupProductsBy) {
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
