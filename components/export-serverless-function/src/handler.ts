import 'dotenv/config';
import { writeFileSync } from 'fs';
import { ensureDirSync, removeSync } from 'fs-extra';
import path from 'path';
import { Workbook } from 'exceljs';
import { getAllItemsForShape, getTenantByIdentifier } from './graphql';
import { ExportRequest, Item, ItemsExportOptions } from './types';

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

export const exportJson = (filePath: string, shapeItems: Record<string, Item[]>) => {
    Object.entries(shapeItems).map(([key, items]) => {
        writeFileSync(path.resolve(filePath, `${key}.json`), JSON.stringify(items, null, 2));
    });
};

export const exportXlsx = async (filePath: string, shapeItems: Record<string, Item[]>) => {
    const workbook = new Workbook();

    Object.entries(shapeItems).map(([key, items]) => {
        if (!items.length) {
            return;
        }

        const sheet = workbook.addWorksheet(key);
        sheet.columns = Object.keys(items[0]).map((key) => ({ header: key, key }));
        sheet.addRows(
            items.map((item) =>
                Object.entries(item).reduce((row: Record<string, any>, [key, value]) => {
                    row[key] = JSON.stringify(value);
                    return row;
                }, {}),
            ),
        );
    });

    await workbook.xlsx.writeFile(path.resolve(filePath, `export.xlsx`));
};

export const exportFile = async (request: ExportRequest, shapeItems: Record<string, Item[]>) => {
    const filePath = path.resolve(process.cwd(), 'data');
    removeSync(filePath);
    ensureDirSync(filePath);

    switch (request.file.format) {
        case 'json':
            exportJson(filePath, shapeItems);
            break;
        case 'xlsx':
            exportXlsx(filePath, shapeItems);
            break;
    }
};

export const execute = async (request: ExportRequest) => {
    switch (request.type) {
        case 'items':
            const shapeItems = await fetchItemsForExport(request.items || {});
            exportFile(request, shapeItems);
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
    file: {
        format: 'json',
    },
    type: 'items',
} as ExportRequest);
