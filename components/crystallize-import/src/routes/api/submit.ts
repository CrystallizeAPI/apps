import {
    Bootstrapper,
    EVENT_NAMES,
    type JSONComponentContent,
    type JSONImage,
    type JSONProduct,
    type JSONProductVariant,
    type JsonSpec,
} from '@crystallize/import-utilities';
import { type ActionFunction, json } from '@remix-run/node';
import { v4 as uuidv4 } from 'uuid';
import type { NumericComponentConfig, Shape } from '@crystallize/schema/shape';
import type { Item } from '@crystallize/schema/item';
import { requireValidSession } from '~/core.server/session';
import { FIELD_MAPPINGS } from '~/core/import/types';

export interface FormSubmission {
    shape: Shape;
    folder?: Item;
    rows: Record<string, any>[];
    mapping: Record<string, string>;
    groupProductsBy?: string;
}

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

const runImport = async (
    spec: JsonSpec,
    {
        tenantIdentifier,
        sessionId,
    }: {
        tenantIdentifier: string;
        sessionId: string;
    },
) => {
    return new Promise((resolve, reject) => {
        const bootstrapper = new Bootstrapper();
        bootstrapper.config.logLevel = 'verbose';
        bootstrapper.setSessionId(sessionId);
        bootstrapper.setTenantIdentifier(tenantIdentifier);
        bootstrapper.setSpec(spec);

        bootstrapper.on(EVENT_NAMES.DONE, () => resolve(null));
        bootstrapper.on(EVENT_NAMES.ERROR, (err: any) => reject(err));
        bootstrapper.start();
    });
};

export const action: ActionFunction = async ({ request }) => {
    if (request.method !== 'POST') {
        return json({ message: 'Method not allowed' }, 405);
    }
    const { shape, folder, rows, mapping, groupProductsBy }: FormSubmission = await request.json();
    const { tenantIdentifier, userId } = await requireValidSession(request);
    const cookie = request.headers.get('Cookie') || '';
    const cookiePayload = cookie
        .split(';')
        .map((value: string): [string, string] => value.split('=') as [string, string])
        .reduce((acc: Record<string, any>, value: [string, string]) => {
            acc[decodeURIComponent(value[0]?.trim())] = decodeURIComponent(value[1]?.trim());
            return acc;
        }, {});

    const spec: JsonSpec = {};
    const variants = rows.map((row) => mapVariant(row, mapping, shape));

    const mapProduct = (obj: Record<string, JSONProduct>, row: Record<string, any>, i: number) => {
        const productName = row[mapping['item.name']];
        let product: JSONProduct = {
            name: productName || variants[i].name,
            shape: shape.identifier,
            vatType: 'No Tax',
            parentCataloguePath: folder?.tree?.path || '/',
            variants: [variants[i]],
            components: mapComponents(row, mapping, 'components', shape),
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

    if (shape.type === 'product') {
        spec.items = Object.values(rows.reduce(mapProduct, {}));
    } else {
        spec.items = rows.map((row) => ({
            name: row[mapping['item.name']],
            shape: shape.identifier,
            parentCataloguePath: folder?.tree?.path || '/',
            components: mapComponents(row, mapping, 'components', shape),
        }));
    }

    try {
        await runImport(spec, {
            tenantIdentifier,
            sessionId: cookiePayload['connect.sid'],
        });
    } catch (err: any) {
        console.error(err);
        return json({ message: err.error }, 500);
    }
    return json({ message: 'done' }, 200);
};
