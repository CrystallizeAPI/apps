import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useState } from 'react';
import { DataMatchingForm } from '~/components/data-form';
import { FolderChooser } from '~/components/folder-chooser';
import { ShapeChooser } from '~/components/shape-chooser';
import { getFolders } from '~/models/folders.server';
import { getShapes } from '~/models/shapes.server';
import type { Folder, Product, Shape } from '~/types';
import type { FormSubmission } from './export/submit';

type LoaderData = {
    shapes: Awaited<ReturnType<typeof getShapes>>;
    folders: Awaited<ReturnType<typeof getFolders>>;
};

export const loader = async () => {
    return json<LoaderData>({
        shapes: await getShapes(),
        folders: await getFolders(),
    });
};

const headers = [
    'Item Name',
    'Item Path',
    'Variant Name',
    'Variant SKU',
    'Variant Images',
    'Variant Price',
    'Variant Stock',
];

const mappingPresets: Record<string, Record<string, string>> = {
    'Google Product Specification': {
        'Variant SKU': 'id',
        'Variant Name': 'title',
        'Item Name': 'description',
        'Item Path': 'link',
        'Variant Images': 'image_link',
        'Variant Price': 'price',
        'Variant Stock': 'availability', // currently wrong, should convert to values "in_stock", "out_of_stock"
    },
};

const mapItem = (item: Product): Record<string, any>[] => {
    return item.variants.map((variant) => {
        const record: Record<string, any> = {
            'Item Name': item.name,
            'Item Path': item.path,
            'Variant Name': variant.name,
            'Variant SKU': variant.sku,
            'Variant Images': variant.images.map(({ url }) => url).join(','),
            'Variant Price': variant.price,
            'Variant Stock': variant.stock,
        };

        item.components
            .filter(({ content }) => !!content)
            .forEach(({ id, content }) => {
                if (content.text) {
                    record[`Component "${id}"`] = content.text;
                } else if (content.plainText?.length) {
                    record[`Component "${id}"`] = content.plainText.map((text: string) => text).join(' ');
                } else if (content.paragraphs?.length) {
                    record[`Component "${id}"`] = content.paragraphs[0].body.plainText
                        .map((text: string) => text)
                        .join(' ');
                } else {
                    console.warn('decoding component type not implemented', id, content);
                    record[`Component "${id}"`] = JSON.stringify(content);
                }
            });

        return record;
    });
};

export default function Index() {
    const { shapes, folders } = useLoaderData<LoaderData>();
    const [selectedShape, setSelectedShape] = useState(shapes[0]);
    const [selectedFolder, setSelectedFolder] = useState(folders[0]);
    const [fileType, setFileType] = useState('json' as 'json' | 'csv');
    const [rows, setRows] = useState([] as Record<string, any>[]);
    const [mapping, setMapping] = useState(mappingPresets['Google Product Specification']);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [fileName, setFileName] = useState('');

    const fetchItems = async ({ identifier }: Shape, { path }: Folder) => {
        const res = await fetch('/items/get', {
            method: 'POST',
            body: JSON.stringify({
                path,
                shapeIdentifier: identifier,
            }),
        });
        const items: Product[] = await res.json();
        setRows(items.flatMap(mapItem));
    };

    const submit = async (data: FormSubmission) => {
        setError('');
        setLoading(true);
        try {
            const res = await fetch('/export/submit', {
                method: 'POST',
                cache: 'no-cache',
                body: JSON.stringify(data),
            });
            if (res.status !== 200) {
                const error = await res.json();
                setError(error.message);
            } else {
                const fileName = await res.json();
                setFileName(fileName);
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (!shapes || !folders) {
        return 'loading';
    }

    return (
        <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
            <div className="app-section">
                <div className="app-section-inner">
                    <h1>Configure Your Export</h1>
                    <div className="flex">
                        <ShapeChooser shapes={shapes} setSelectedShape={setSelectedShape} />
                        <FolderChooser folders={folders} setSelectedFolder={setSelectedFolder} />
                    </div>
                    <div>
                        <h2>Mapping Preset</h2>
                        <select onChange={(e) => setMapping(mappingPresets[e.target.value])}>
                            {Object.keys(mappingPresets).map((key) => (
                                <option key={key} value={key}>
                                    {key}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button onClick={() => fetchItems(selectedShape, selectedFolder)}>Continue to Matching</button>
                </div>
            </div>
            {!!rows?.length && (
                <>
                    <div className="app-section">
                        <DataMatchingForm
                            shape={selectedShape}
                            headers={headers}
                            rows={rows}
                            setRows={setRows}
                            mapping={mapping}
                            setMapping={setMapping}
                        />
                    </div>

                    <div className="app-section">
                        <div className="app-section-inner">
                            <div>
                                {loading && <span>Exporting... Please wait...</span>}
                                {!loading &&
                                    (fileName ? (
                                        <span>
                                            Download:{' '}
                                            <a href={`/downloads/${fileName}`} target="_blank">
                                                {fileName}
                                            </a>
                                        </span>
                                    ) : (
                                        <>
                                            <div>
                                                <h2>Export File Type</h2>
                                                <select onChange={(e) => setFileType(e.target.value)}>
                                                    <option value="json">JSON</option>
                                                    <option value="csv">CSV</option>
                                                </select>
                                            </div>
                                            <button
                                                onClick={() =>
                                                    submit({
                                                        rows,
                                                        mapping,
                                                        fileType,
                                                    })
                                                }
                                                type="button"
                                            >
                                                Export {rows.length} Rows
                                            </button>
                                        </>
                                    ))}
                            </div>
                            {error && (
                                <div className="error">
                                    <pre>Error: {error}</pre>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
