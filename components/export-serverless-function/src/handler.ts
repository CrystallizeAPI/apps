import 'dotenv/config';
import { getAllItemsForShape, getTenantByIdentifier } from './graphql';
import { ExportRequest, Item, ItemsExportOptions } from './types';
import { exportFile } from './files/export-file';

const { CRYSTALLIZE_TENANT_IDENTIFIER, FUNCTION_TYPE } = process.env;

export const fetchItemsForExport = async (options: ItemsExportOptions): Promise<Record<string, Item[]>> => {
    const tenant = await getTenantByIdentifier(CRYSTALLIZE_TENANT_IDENTIFIER || '');
    const shapeItems: Record<string, Item[]> = {};
    const shapeIdentifiers = options.shapeIdentifiers || tenant.shapes.map(({ identifier }) => identifier);
    const languages = options.languages || tenant.availableLanguages.map(({ code }) => code);

    for (const shapeIdentifier of shapeIdentifiers) {
        for (const language of languages) {
            let items = await getAllItemsForShape(tenant.id, shapeIdentifier, language);

            if (options.publishedOnly) {
                items = items.filter((item) => item.hasVersion);
            }

            if (options.pathPrefix) {
                items = items.filter((item) => item.tree.path.startsWith(options.pathPrefix as string));
            }

            shapeItems[`${shapeIdentifier}_${language}`] = items || [];
        }
    }

    return shapeItems;
};

export const execute = async (request: ExportRequest) => {
    switch (request.type) {
        case 'items':
            const shapeItems = await fetchItemsForExport(request.items || {});
            exportFile(request, shapeItems);
            break;
        case 'shapes':
            throw new Error('not yet implemented');
        case 'orders':
            throw new Error('not yet implemented');
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
            throw new Error('not yet implemented');
        case 'netlify':
            throw new Error('not yet implemented');
        default:
            await execute(event as ExportRequest);
    }
};

// TODO: Remove
handler({
    file: {
        format: 'json',
        compress: true,
    },
    type: 'items',
} as ExportRequest);
