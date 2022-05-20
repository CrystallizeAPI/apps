import { writeFileSync } from 'fs';
import path from 'path';
import { ExportRequest, Item } from '../types';

export const exportJson = (request: ExportRequest, filePath: string, shapeItems: Record<string, Item[]>) => {
    if (request.file.json?.singleFile) {
        const data = Object.entries(shapeItems).reduce((data: any, [key, value]) => {
            data[key] = value;
            return data;
        }, {});
        const name = request.file.name || 'export.json';
        return writeFileSync(path.resolve(filePath, name), JSON.stringify(data, null, 2));
    }

    Object.entries(shapeItems).map(([key, items]) => {
        writeFileSync(path.resolve(filePath, `${key}.json`), JSON.stringify(items, null, 2));
    });
};
