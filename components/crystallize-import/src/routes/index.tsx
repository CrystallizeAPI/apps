import { Item } from '@crystallize/schema/item';
import { Shape } from '@crystallize/schema/shape';
import { json, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useState } from 'react';

import CrystallizeAPI from 'src/core.server/use-cases/crystallize';
import { DataMatchingForm } from '~/core/import/components/DataForm';
import { FileChooser } from '~/core/import/components/FileChooser';
import { FolderChooser } from '~/core/import/components/FolderChooser';
import { ShapeChooser } from '~/core/import/components/ShapeChooser';
import type { FormSubmission } from './api/submit';

export const loader: LoaderFunction = async ({ request }) => {
    const api = await CrystallizeAPI(request);
    try {
        const { shapes, folders } = await api.fetchTenantShapesAndFolders();
        return json({
            shapes,
            folders,
        });
    } catch (err) {
        console.error(err);
        return json({ shapes: [], folders: [] });
    }
};

export default function Index() {
    const { shapes, folders } = useLoaderData();
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
            const res = await fetch('/api/submit', {
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
        return (
            <div className="empty-screen">
                <span className="loader"></span>
            </div>
        );
    }
    return (
        <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4', padding: '20px 50px' }}>
            <div className="floating-actionbar">
                <div className="grid">
                    <ShapeChooser shapes={shapes} setSelectedShape={setSelectedShape} />
                    <FolderChooser folders={folders} setSelectedFolder={setSelectedFolder} />
                    <div style={{ flex: '1 1 0%' }}>
                        {selectedShape.type === 'product' && (
                            <div>
                                <h2>Group Product Variants By</h2>
                                <select
                                    className="grey"
                                    onChange={(e) => setGroupProductsBy(e.target.value)}
                                    disabled={!rows?.length}
                                >
                                    <option defaultChecked={true} value="" />
                                    {headers.map((header) => (
                                        <option key={header} value={header}>
                                            {header}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>
                    <div>
                        <button
                            className="action-button"
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
                            disabled={!rows?.length || done}
                        >
                            {done ? 'Import completed' : `Import ${rows.length} rows`}
                        </button>
                    </div>
                </div>
            </div>

            {!rows?.length ? (
                <div className="file-chooser-section app-section">
                    <FileChooser
                        onChange={({ headers, rows }) => {
                            setHeaders(headers);
                            setRows(rows);
                        }}
                    />
                </div>
            ) : (
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

                    {(loading || error) && (
                        <div className="feedback-container">
                            {loading && (
                                <>
                                    <div className="loader-wrapper" style={{ transform: 'scale(0.5,0.5)' }}>
                                        <div className="loader"></div>
                                    </div>
                                    <span className="import-message">Bip bop, importing your stuff...</span>
                                </>
                            )}

                            {error && (
                                <div className="error">
                                    <pre>Error: {error}</pre>
                                </div>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
