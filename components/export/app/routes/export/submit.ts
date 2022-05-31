import { type ActionFunction, json, Response, Headers } from '@remix-run/node';
import { ensureDirSync, writeFileSync } from 'fs-extra';
import { Parser } from 'json2csv';
import path from 'path';
import { v4 as uuid } from 'uuid';

export interface FormSubmission {
    rows: Record<string, any>[];
    mapping: Record<string, string>;
    fileType: 'json' | 'csv';
}

const mapRow = (row: Record<string, any>, mapping: Record<string, string>): Record<string, any> => {
    let mappedRow: Record<string, any> = {};
    Object.entries(mapping).forEach(([key, value]) => {
        mappedRow[value] = row[key];
    });
    return mappedRow;
};

export const action: ActionFunction = async ({ request }) => {
    if (request.method !== 'POST') {
        return json({ message: 'Method not allowed' }, 405);
    }
    const { rows, mapping, fileType }: FormSubmission = await request.json();

    const mappedRows = rows.map((row) => mapRow(row, mapping));

    const filePath = process.env.EXPORT_FILE_PATH || path.resolve(process.cwd(), 'export-data');
    const fileName = uuid() + '.' + fileType;
    ensureDirSync(filePath);

    if (fileType === 'json') {
        writeFileSync(path.resolve(filePath, fileName), JSON.stringify(mappedRows, '  ', 2));
        return json(fileName);
    } else if (fileType === 'csv') {
        const parser = new Parser({
            fields: Object.values(mapping),
        });
        const csv = parser.parse(mappedRows);
        writeFileSync(path.resolve(filePath, fileName), csv);
        return json(fileName);
    }
};
