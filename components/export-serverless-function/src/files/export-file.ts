import AdmZip from 'adm-zip';
import { fstat, readdirSync } from 'fs';
import { ensureDirSync, removeSync } from 'fs-extra';
import path from 'path';
import { ExportRequest, Item } from '../types';
import { exportJson } from './export-json';
import { exportXlsx } from './export-xlsx';

export const exportFile = async (request: ExportRequest, shapeItems: Record<string, Item[]>) => {
    const filePath = path.resolve(process.cwd(), 'data');
    removeSync(filePath);
    ensureDirSync(filePath);

    switch (request.file.format) {
        case 'json':
            exportJson(request, filePath, shapeItems);
            break;
        case 'xlsx':
            await exportXlsx(filePath, shapeItems);
            break;
    }

    if (request.file.compress) {
        const zip = new AdmZip();
        const files = readdirSync(filePath);
        files.forEach((file) => zip.addLocalFile(path.resolve(filePath, file)));
        zip.writeZip(path.resolve(filePath, 'export.zip'));
        files.forEach((file) => removeSync(path.resolve(filePath, file)));
        // return zip.toBuffer();
    }
};
