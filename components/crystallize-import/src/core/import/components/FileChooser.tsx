import { useState, useCallback } from 'react';
import * as d3 from 'd3';

import { useDropzone } from 'react-dropzone';
import readXlsxFile from 'read-excel-file';

export interface Data {
    headers: string[];
    rows: Record<string, any>[];
}

const readJson = async (file: File): Promise<Data> => {
    try {
        const data = JSON.parse(await file.text());

        if (!data) {
            throw new Error('no data');
        }

        if (Array.isArray(data) && data.length) {
            return {
                headers: Object.keys(data[0]),
                rows: data,
            };
        }

        if (typeof data === 'object') {
            const entries: [string, any][] = Object.entries(data);
            const headers = ['key', ...Object.keys(entries[0][1])];
            const rows = entries.map(([key, value]) => ({
                key,
                ...value,
            }));
            return {
                headers,
                rows,
            };
        }

        if (data.items?.length && Array.isArray(data.items)) {
            return {
                headers: Object.keys(data.items[0]),
                rows: data.items,
            };
        }

        throw new Error('unable to decode json');
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const readCsv = async (file: File): Promise<Data> => {
    const rows = d3.csvParse(await file.text());
    return {
        headers: Object.keys(rows[0]),
        rows,
    };
};

const readXlsx = async (file: File): Promise<Data> => {
    const allRows = await readXlsxFile(file);
    const headers = allRows[0].map((col) => col.toString());
    const rows = allRows.splice(1).map((row) =>
        row.reduce((record: Record<string, any>, col, i) => {
            record[headers[i]] = col;
            return record;
        }, {}),
    );

    return {
        headers,
        rows,
    };
};

interface FileChooserProps {
    onChange: (data: Data) => void;
}

export const FileChooser = ({ onChange }: FileChooserProps) => {
    const [loading, setLoading] = useState(false);

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        setLoading(true);
        const file = acceptedFiles[0];
        const extension = file.name.split('.').at(-1);
        switch (extension) {
            case 'xlsx':
                onChange(await readXlsx(file));
                setLoading(false);
                break;
            case 'csv':
                onChange(await readCsv(file));
                setLoading(false);
                break;
            case 'json':
                onChange(await readJson(file));
                setLoading(false);
                break;
            default:
                throw new Error('Unsupported file format');
                break;
        }
    }, []);
    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return !loading ? (
        <div className="file-chooser" {...getRootProps()}>
            <input {...getInputProps()} />
            <img src="/file_upload.svg" alt="Click to Upload" />
            <span>Upload File</span>
        </div>
    ) : (
        <div className="center">
            <div className="loader-wrapper">
                <div className="loader"></div>
            </div>
            <span>Uploading ...</span>
        </div>
    );
};
