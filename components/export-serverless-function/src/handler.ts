import 'dotenv/config';
import { writeFileSync } from 'fs';
import path from 'path';
import { getAllItemsForShape, getTenantByIdentifier } from './graphql';
import { ExportRequest, Item, ItemsExportOptions } from './types';

const { CRYSTALLIZE_TENANT_IDENTIFIER, FUNCTION_TYPE } = process.env;

export const exportItemsByShape = async (
    tenantId: string,
    shapeIdentifier: string,
    language: string,
): Promise<any[]> => {
    const items = await getAllItemsForShape(tenantId, shapeIdentifier, language);
    return items;
};

export const exportItems = async (options: ItemsExportOptions): Promise<Record<string, Item[]>> => {
    const tenant = await getTenantByIdentifier(CRYSTALLIZE_TENANT_IDENTIFIER || '');
    const shapeItems: Record<string, any[]> = {};
    const shapeIdentifiers = options.shapeIdentifiers || tenant.shapes.map(({ identifier }) => identifier);

    for (const shapeIdentifier of shapeIdentifiers) {
        for (const language of options.languages) {
            const items = await exportItemsByShape(tenant.id, shapeIdentifier, language);
            shapeItems[`${shapeIdentifier}_${language}`] = items || [];
        }
    }

    return shapeItems;
};

export const exportJson = (filename: string, items: Item[]) => {
    writeFileSync(path.join(process.cwd(), 'data', `${filename}.json`), JSON.stringify(items, null, 2));
};

export const execute = async (request: ExportRequest) => {
    switch (request.type) {
        case 'items':
            if (!request.items) {
                throw new Error('items options must be specified');
            }
            const items = await exportItems(request.items);
            Object.entries(items).map(([key, items]) => {
                exportJson(key, items);
            });
            break;
        case 'shapes':
            throw new Error('unhandled type');
        case 'orders':
            throw new Error('unhandled type');
    }
};

export const handler = async (event: any) => {
    if (!CRYSTALLIZE_TENANT_IDENTIFIER) {
        throw new Error('CRYSTALLIZE_TENANT_IDENTIFIER must be set');
    }

    switch (FUNCTION_TYPE) {
        case 'aws-lambda':
            await Promise.all(event.Records.forEach((record: any) => execute(JSON.parse(record.body))));
            break;
        case 'cloudflare':
            break;
        case 'netlify':
            break;
        default:
            await execute(event as ExportRequest);
    }
};

// TODO: Remove
handler({
    format: 'json',
    type: 'items',
    items: {
        languages: ['en', 'no'],
        // shapeIdentifiers: ['default-product'],
    },
} as ExportRequest);
