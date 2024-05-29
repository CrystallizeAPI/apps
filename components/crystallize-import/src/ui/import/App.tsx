import { useEventSource } from 'remix-utils/sse/react';
import { ActionBar } from './components/action-bar/ActionBar';
import { DataMatchingForm } from './components/DataForm';
import { FileChooser } from './components/FileChooser';
import { useImport } from './provider';
import { useEffect, useState } from 'react';

const messageFactory = (decoded: any) => {
    switch (decoded.event) {
        case 'started':
            return 'Import started';
        case 'item-updated':
        case 'item-created':
            return (
                <>
                    <span>Updated item</span> <span className="text-tag">{decoded.data.id}</span> <span>with name</span>{' '}
                    <span className="text-tag">{decoded.data.name}</span> <span>in language</span>{' '}
                    <span className="text-tag">{decoded.data.language}</span> <span>using shape</span>{' '}
                    <span className="text-tag">{decoded.data.shape.identifier}</span>
                </>
            );
        case 'stage-pushed':
            return (
                <>
                    <span>Item</span> <span className="text-tag">{decoded.data.id}</span> <span>with name</span>{' '}
                    <span className="text-tag">{decoded.data.name}</span> <span>in language</span>{' '}
                    <span className="text-tag">{decoded.data.language}</span> was <span>pushed to stage</span>{' '}
                    <span className="text-tag">{decoded.data.stageId}</span>
                </>
            );

        case 'done':
            return <span className="font-bold">Import done 🎉</span>;
        default:
            return (
                <span>
                    <pre>{JSON.stringify(decoded.data, undefined, 2)}</pre>
                </span>
            );
    }
};
export const App = () => {
    const { state, dispatch } = useImport();
    const { shapes, folders } = state;
    const [streamLogs, setStreamLogs] = useState<any[]>([]);
    const data = useEventSource(`/api/import/stream/${state.importId}`, { event: 'log' });
    const [grouping, setGrouping] = useState<string>(state.headers[0] ?? '');

    useEffect(() => {
        if (state.done) {
            setStreamLogs([]);
        }
        if (data) {
            setStreamLogs((prev) => [...prev, data]);
        }
    }, [data, state.done]);

    useEffect(() => {
        dispatch.updateGroupProductsBy(grouping);
    }, [grouping]);

    return (
        <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4', padding: '0px 50px 200px' }}>
            <ActionBar shapes={shapes} folders={folders} />
            {state.selectedShape.type === 'product' && (
                <div className="flex bg-white mt-2 rounded-md px-6 py-4 gap-8 shadow-sm">
                    <div className="!grow-0">
                        <label className="pb-4 block">
                            Product variant attributes <br />
                        </label>
                        <div className="inline-flex  w-auto items-center bg-slate-100 border-0 py-1 px-1 rounded-md gap-2">
                            {state.attributes.map((attr) => (
                                <span
                                    className="bg-white text-xs font-bold rounded-sm px-4 py-2 text-gray-600 shadow"
                                    key={attr}
                                >
                                    {attr}
                                </span>
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
                                <input
                                    type="text"
                                    name="attribute"
                                    className="bg-slate-100 border-0 outline-none py-3 px-4 rounded-md"
                                    placeholder="i.e Color, Size"
                                />
                                <button
                                    type="submit"
                                    className="bg-white border-0 outline-0 py-2 px-3 mr-1 text-sm font-bold rounded-md shadow"
                                >
                                    +
                                </button>
                            </form>
                        </div>
                        <label></label>
                    </div>
                    <div className="max-w-sm">
                        <label className="pb-4 block">
                            Group products by: <br />
                        </label>
                        <select
                            className="grey w-[200px]"
                            onChange={(e) => setGrouping(e.target.value)}
                            disabled={!state.rows?.length}
                            value={grouping}
                        >
                            <option defaultChecked={true} disabled value="">
                                Select a column
                            </option>
                            {state.headers.map((header) => (
                                <option key={header} value={header}>
                                    {header}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            )}
            {!state.rows?.length ? (
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
            ) : (
                <>
                    <div className="app-section">
                        <DataMatchingForm />
                    </div>
                </>
            )}
            {(state.loading || state.done) && (
                <div className=" bg-white pt-4 rounded-md shadow-md mt-8">
                    <div className="pb-8 pt-6 px-6">
                        <h2 className="text-gray-600 font-semibold m-0">Progress log</h2>
                        <label>{state.done ? 'Import completed' : 'Running data import ...'}</label>
                    </div>
                    <div className="flex py-4 px-6 bg-slate-100 max-h-[500px] overflow-scroll reverse flex-col-reverse">
                        <div className="flex flex-col gap-2">
                            {streamLogs.map((log, i) => {
                                const decoded = JSON.parse(log);
                                return (
                                    <div key={i} className="flex items-start gap-4">
                                        <span className="text-xs text-slate-600 w-6 pt-1.5">{i + 1}</span>
                                        <span
                                            className={`${decoded.event} w-28 p-1.5 center rounded inline-flex text-[10px] font-bold`}
                                        >
                                            {decoded.event}
                                        </span>
                                        <span className="text-xs text-slate-600 pt-1.5">{messageFactory(decoded)}</span>
                                    </div>
                                );
                            })}
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

            {state.preflight && (
                <div>
                    {state.preflight.validCount > 0 && (
                        <h2 className="text-green-600 bg-green-100 font-medium px-6  rounded-md py-4 m-0">
                            {state.preflight.validCount} rows are valid.
                        </h2>
                    )}
                    {state.preflight.errorCount > 0 && (
                        <div className="flex flex-col bg-white rounded-md shadow-md">
                            <h2 className="text-pink-600 font-medium px-6  border-0 border-b border-solid border-slate-200 py-4 m-0">
                                {state.preflight.errorCount} rows are invalid.
                            </h2>

                            <div className="flex flex-col max-h-[800px] overflow-scroll rounded-md shadow">
                                {state.preflight.errors.map((error, i) => (
                                    <details
                                        key={i}
                                        className=" cursor-pointer  py-1 border-0 border-b border-solid border-slate-200 px-4"
                                    >
                                        <summary className="grid w-full !grid-cols-3">
                                            <div className="pl-4">
                                                <span className="text-xs">Record {i + 1}</span> <br />
                                                <span className="text-sm ">
                                                    {error.item?.name || <span className="italic">Missing Name</span>}
                                                </span>
                                            </div>

                                            <div className="col-span-2 flex gap-3 flex-wrap">
                                                {error.errors.map((err, j) => (
                                                    <span
                                                        key={j}
                                                        className="text-xs bg-pink-100 text-pink-600 px-3 py-1 rounded font-medium"
                                                    >
                                                        {err.message}
                                                    </span>
                                                ))}
                                            </div>
                                        </summary>
                                        <div>
                                            {error.errors.map((err, j) => (
                                                <li className="flex flex-col bg-slate-100 my-3 px-6 rounded-lg">
                                                    <p
                                                        key={j}
                                                        className="text-sm bg-pink-100 text-pink-600 px-3 py-1 rounded items-center"
                                                    >
                                                        {err.message}
                                                    </p>
                                                    <pre className="!text-xs">
                                                        {JSON.stringify(error.item, null, 2)}
                                                    </pre>
                                                    <pre className="text-xs">{JSON.stringify(err, null, 2)}</pre>
                                                </li>
                                            ))}
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
