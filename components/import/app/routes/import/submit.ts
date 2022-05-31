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
import type { Shape } from '~/types';

export interface FormSubmission {
    shape: Shape;
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

const runImport = async (spec: JsonSpec) => {
    const { CRYSTALLIZE_ACCESS_TOKEN_ID, CRYSTALLIZE_ACCESS_TOKEN_SECRET, CRYSTALLIZE_TENANT_IDENTIFIER } = process.env;
    if (!CRYSTALLIZE_ACCESS_TOKEN_ID || !CRYSTALLIZE_ACCESS_TOKEN_SECRET) {
        throw new Error('CRYSTALLIZE_ACCESS_TOKEN_ID and CRYSTALLIZE_ACCESS_TOKEN_SECRET must be set');
    }
    if (!CRYSTALLIZE_TENANT_IDENTIFIER) {
        throw new Error('CRYSTALLIZE_TENANT_IDENTIFIER must be set');
    }

    return new Promise((resolve) => {
        const bootstrapper = new Bootstrapper();
        // bootstrapper.config.logLevel = 'verbose';
        bootstrapper.setAccessToken(CRYSTALLIZE_ACCESS_TOKEN_ID, CRYSTALLIZE_ACCESS_TOKEN_SECRET);
        bootstrapper.setTenantIdentifier(CRYSTALLIZE_TENANT_IDENTIFIER);
        bootstrapper.setSpec(spec);

        bootstrapper.on(EVENT_NAMES.DONE, () => resolve(null));
        bootstrapper.on(EVENT_NAMES.ERROR, (err) => {
            throw new Error(err);
        });
        bootstrapper.start();
    });
};

export const action: ActionFunction = async ({ request }) => {
    if (request.method !== 'POST') {
        return json({ message: 'Method not allowed' }, 405);
    }
    const { shape, rows, mapping, groupProductsBy }: FormSubmission = await request.json();

    const spec: JsonSpec = {};
    const variants = rows.map((row) => mapVariant(row, mapping));

    const products: Record<string, JSONProduct> = rows.reduce((obj: Record<string, JSONProduct>, row, i) => {
        const productName = row[mapping['product.name']];
        let product: JSONProduct = {
            name: productName || variants[i].name,
            shape: shape.identifier,
            vatType: 'No Tax',
            parentCataloguePath: '/',
            variants: [variants[i]],
            components: mapComponents(row, mapping, shape),
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

    // console.log(JSON.stringify(products, '  ', 2));
    spec.items = Object.values(products);

    await runImport(spec);
    return new Response('done');
};
