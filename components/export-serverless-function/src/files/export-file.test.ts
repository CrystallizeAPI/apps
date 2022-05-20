import test from 'ava';
import { readdirSync } from 'fs';
import path from 'path';
import { ExportRequest, Item } from '../types';
import { exportFile } from './export-file';

interface testCase {
    name: string;
    request: ExportRequest;
    shapeItems: Record<string, Item[]>;
    expectedFiles: string[];
}

const testCases: testCase[] = [
    {
        name: 'Exports separate json files by shape and language',
        request: {
            type: 'items',
            file: {
                format: 'json',
            },
        },
        shapeItems: {
            'my-product_en': [],
            'my-product_no': [],
            'my-folder_en': [],
            'my-folder_no': [],
            'my-document_en': [],
            'my-document_no': [],
        },
        expectedFiles: [
            'my-product_en.json',
            'my-product_no.json',
            'my-folder_en.json',
            'my-folder_no.json',
            'my-document_en.json',
            'my-document_no.json',
        ],
    },
    {
        name: 'Exports a single json file when singleFile is true',
        request: {
            type: 'items',
            file: {
                format: 'json',
                name: 'export.json',
                json: {
                    singleFile: true,
                },
            },
        },
        shapeItems: {
            'my-product_en': [],
            'my-product_no': [],
            'my-folder_en': [],
            'my-folder_no': [],
            'my-document_en': [],
            'my-document_no': [],
        },
        expectedFiles: ['export.json'],
    },
    {
        name: 'Compresses exported files into a zip',
        request: {
            type: 'items',
            file: {
                format: 'json',
                name: 'export.zip',
                compress: true,
            },
        },
        shapeItems: {
            'my-product_en': [],
            'my-product_no': [],
            'my-folder_en': [],
            'my-folder_no': [],
            'my-document_en': [],
            'my-document_no': [],
        },
        expectedFiles: ['export.zip'],
    },
];

testCases.forEach((tc) =>
    test.serial(tc.name, async (t) => {
        await exportFile(tc.request, tc.shapeItems);
        const files = readdirSync(path.resolve(process.cwd(), 'data'));
        t.is(files.length, tc.expectedFiles.length, 'number of files');
        files.map((file) => t.assert(tc.expectedFiles.includes(file), `files should contain ${file}`));
    }),
);
