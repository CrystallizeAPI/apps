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
import type { Shape } from '@crystallize/schema/shape';
import type { Item } from '@crystallize/schema/item';
import { requireValidSession } from '~/core.server/session';

export interface FormSubmission {
    shape: Shape;
    folder?: Item;
    rows: Record<string, any>[];
    mapping: Record<string, string>;
    groupProductsBy?: string;
}

const mapVariant = (row: Record<string, any>, mapping: Record<string, string>): JSONProductVariant => {
    const name = row[mapping['variant.name']];
    const sku = row[mapping['variant.sku']];
    const images = row[mapping['variant.images']];
    const price = row[mapping['variant.price']];
    const stock = row[mapping['variant.stock']];
    const attribute = row[mapping['variant.attribute']];

    const variant: JSONProductVariant = {
        name,
        sku,
        price,
        stock,
    };

    if (images) {
        variant.images = images.split(',').map(
            (src: string): JSONImage => ({
                src,
            }),
        );
    }

    if (attribute) {
        variant.attributes = {};
        variant.attributes[mapping['variant.attribute']] = `${attribute}`;
    }

    return variant;
};

const mapComponents = (
    row: Record<string, any>,
    mapping: Record<string, string>,
    shape: Shape,
): Record<string, JSONComponentContent> => {
    const components: Record<string, JSONComponentContent> = {};
    Object.entries(mapping)
        .filter(([key]) => key.split('.')[0] === 'component')
        .forEach(([key, value]) => {
            const componentId = key.split('.')[1];
            const content = row[value];
            components[componentId] = content;
        });
    return components;
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

    const { tenantId, tenantIdentifier } = await requireValidSession(request);
    const cookie = request.headers.get('Cookie') || '';
    const cookiePayload = cookie
        .split(';')
        .map((value: string): [string, string] => value.split('=') as [string, string])
        .reduce((memo: Record<string, any>, value: [string, string]) => {
            memo[decodeURIComponent(value[0]?.trim())] = decodeURIComponent(value[1]?.trim());
            return memo;
        }, {});

    const spec: JsonSpec = {};
    const variants = rows.map((row) => mapVariant(row, mapping));

    const products: Record<string, JSONProduct> = rows.reduce((obj: Record<string, JSONProduct>, row, i) => {
        const productName = row[mapping['item.name']];
        let product: JSONProduct = {
            name: productName || variants[i].name,
            shape: shape.identifier,
            vatType: 'No Tax',
            parentCataloguePath: folder?.tree?.path || '/',
            variants: [variants[i]],
            components: mapComponents(row, mapping, shape),
            // variantComponents: mapVariantComponents(row, mapping, shape),
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
    }, {});

    spec.items = Object.values(products);

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
