import { Workbook } from 'exceljs';
import path from 'path';
import { Item } from '../types';

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
    return workbook.xlsx.writeBuffer();
};
