import { useEventSource } from 'remix-utils/sse/react';
import { ActionBar } from './components/action-bar/ActionBar';
import { DataMatchingForm } from './components/DataForm';
import { FileChooser } from './components/FileChooser';
import { useImport } from './provider';
import { useEffect, useState } from 'react';

export const App = () => {
    const { state, dispatch } = useImport();
    const { shapes, folders } = state;
    const [streamLogs, setStreamLogs] = useState<any[]>([]);
    const data = useEventSource(`/api/import/stream/${state.importId}`, { event: 'log' });

    useEffect(() => {
        if (state.done) {
            setStreamLogs([]);
        }
        if (data) {
            setStreamLogs((prev) => [...prev, data]);
        }
    }, [data, state.done]);

    return (
        <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4', padding: '20px 50px' }}>
            <ActionBar shapes={shapes} folders={folders} />

            <div style={{ marginTop: 200 }} />
            {!state.rows?.length ? (
                <div className="file-chooser-section app-section">
                    <FileChooser
                        onChange={({ headers, rows }) => {
                            dispatch.updateSpreadsheet(
                                headers,
                                rows.map((row) => ({
                                    _import: true,
                                    ...row,
                                })),
                            );
                        }}
                    />
                </div>
            ) : (
                <>
                    {state.selectedShape.type === 'product' && (
                        <div className="app-section">
                            <div className="match-form">
                                <div className="match-header">
                                    <div>
                                        <h1>Customize Product Variant Attributes</h1>
                                        <h2>
                                            Define product variant attributes to use for data matching in the table
                                            below.
                                        </h2>
                                    </div>
                                </div>
                                <div className="attributes">
                                    {state.attributes.map((attr) => (
                                        <li key={attr}>{attr}</li>
                                    ))}
                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            const value: string = (e.target as any).attribute.value;
                                            if (!value || state.attributes.find((attr) => attr === value)) {
                                                return;
                                            }

                                            dispatch.updateProductVariantAttributes(state.attributes.concat(value));
                                        }}
                                    >
                                        <input type="text" name="attribute" />
                                        <button type="submit">Add</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}
                    {state.loading && (
                        <div>
                            <div className="feedback-container">
                                <div className="loader-wrapper" style={{ transform: 'scale(0.5,0.5)' }}>
                                    <div className="loader"></div>
                                </div>
                                <span className="import-message">Bip bop, doing stuff...</span>
                            </div>
                            <div className="feedback-container">
                                <div className="app-section">
                                    <div className="grid">
                                        <div className="stream-logs">
                                            <h2>Stream logs</h2>
                                            <ul>
                                                {streamLogs.map((log, i) => {
                                                    const decoded = JSON.parse(log);
                                                    return (
                                                        <li key={i}>
                                                            <pre>{JSON.stringify(decoded, undefined, 2)}</pre>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {state.errors && state.errors.length > 0 && (
                        <div className="error">
                            <p>Errors: </p>
                            <pre>{JSON.stringify(state.errors, null, 2)}</pre>
                        </div>
                    )}
                    {state.done && (
                        <div className="feedback-container">
                            <h1>Import completed</h1>
                        </div>
                    )}

                    {state.preflight && (
                        <div className="feedback-container">
                            {state.preflight.validCount > 0 && (
                                <div className="feedback">
                                    <h2>{state.preflight.validCount} rows are valid.</h2>
                                </div>
                            )}
                            {state.preflight.errorCount > 0 && (
                                <div className="text-error">
                                    <h2>{state.preflight.errorCount} rows are invalid.</h2>

                                    <div className="error-list grid">
                                        {state.preflight.errors.map((error, i) => (
                                            <details key={i} className="error-item shadow-md p-5 cursor-pointer">
                                                <summary>Record {i + 1}</summary>
                                                <ul>
                                                    {error.errors.map((err, j) => (
                                                        <li className="flex flex-row align-middle justify-between">
                                                            <p
                                                                key={j}
                                                                className="text-error font-semibold self-center p-3"
                                                            >
                                                                {err.message}
                                                            </p>
                                                            <pre className="text-xs">
                                                                {JSON.stringify(error.item, null, 2)}
                                                            </pre>
                                                            <pre className="text-xs">
                                                                {JSON.stringify(err, null, 2)}
                                                            </pre>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </details>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="app-section">
                        <DataMatchingForm />
                    </div>
                </>
            )}
        </div>
    );
};
