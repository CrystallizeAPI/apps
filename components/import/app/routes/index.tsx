import { Folder } from '@crystallize/import-utilities/dist/generated/graphql';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { DataMatchingForm } from '~/components/data-form';
import { FileChooser } from '~/components/file-chooser';
import { FolderChooser } from '~/components/folder-chooser';
import { ShapeChooser } from '~/components/shape-chooser';
import { getFolders } from '~/models/folders.server';
import { getShapes } from '~/models/shapes.server';
import type { Shape } from '~/types';
import type { FormSubmission } from './import/submit';

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

export default function Index() {
    const { shapes, folders } = useLoaderData<LoaderData>();
    const [selectedShape, setSelectedShape] = useState(shapes[0]);
    const [selectedFolder, setSelectedFolder] = useState(folders[0]);
    const [headers, setHeaders] = useState([] as string[]);
    const [rows, setRows] = useState([] as Record<string, any>[]);
    const [mapping, setMapping] = useState({} as Record<string, string>);
    const [groupProductsBy, setGroupProductsBy] = useState('' as string);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);

    const submit = async (data: FormSubmission) => {
        setError('');
        setLoading(true);
        try {
            const res = await fetch('/import/submit', {
                method: 'POST',
                cache: 'no-cache',
                body: JSON.stringify(data),
            });
            if (res.status !== 200) {
                const error = await res.json();
                setError(error.message);
            } else {
                setDone(true);
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
                    <h1>Organize Your Import</h1>
                    <div className="flex">
                        <ShapeChooser shapes={shapes} setSelectedShape={setSelectedShape} />
                        <FolderChooser folders={folders} setSelectedFolder={setSelectedFolder} />
                    </div>
                </div>
            </div>
            {!rows?.length && (
                <div className="file-chooser-section app-section">
                    <FileChooser
                        onChange={({ headers, rows }) => {
                            setHeaders(headers);
                            setRows(rows);
                        }}
                    />
                </div>
            )}
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
                        <div className="group-products-section">
                            <div className="group-products-section-inner">
                                <div>
                                    <label>
                                        Group Products By:&nbsp;
                                        <select
                                            onChange={(e) => setGroupProductsBy(e.target.value)}
                                            style={{ marginTop: '10px' }}
                                        >
                                            <option defaultChecked={true} value="" />
                                            {headers.map((header) => (
                                                <option key={header} value={header}>
                                                    {header}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                </div>
                                <div>
                                    {!loading &&
                                        (done ? (
                                            <button>Import completed</button>
                                        ) : (
                                            <button
                                                onClick={() =>
                                                    submit({
                                                        shape: selectedShape as Shape,
                                                        folder: selectedFolder,
                                                        rows,
                                                        mapping,
                                                        groupProductsBy,
                                                    })
                                                }
                                                type="button"
                                            >
                                                Import {rows.length} Rows
                                            </button>
                                        ))}
                                </div>
                            </div>
                            {loading && <span className='import-message'>Importing! Please wait.</span>}
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
