import { DataSheetGrid, keyColumn, textColumn, checkboxColumn, Column } from 'react-datasheet-grid';
import { FaUndo } from 'react-icons/fa';
import { PiAirplaneInFlightDuotone } from 'react-icons/pi';

import { useImport } from '../provider';
import { ColumnHeader } from './data-grid/ColumnHeader';
import { FormSubmission } from '~/contracts/form-submission';
import { useRef } from 'react';

export const DataMatchingForm = () => {
    const { state, dispatch } = useImport();

    const channelRef = useRef<HTMLSelectElement>(null);

    const columnsFromRows: Column[] = state.headers.map(
        (header): Column => ({
            ...keyColumn(header, textColumn),
            title: <ColumnHeader title={header} />,
            minWidth: 200,
        }),
    );

    const columns: Column[] = [
        {
            ...keyColumn('_import', checkboxColumn),
            minWidth: 40,
            maxWidth: 40,
        },
        ...columnsFromRows,
    ];

    return (
        <div className="match-form">
            <div className="px-6 py-8 flex justify-between">
                <div>
                    <h1 className="m-0 p-0">Match column labels to item components</h1>
                    <h2 className="m-0 p-0">
                        <strong>{state.rows.length}</strong> rows were found in this file.
                    </h2>
                </div>
                <div className="flex flex-row items-center space-x-2 shrink-0">
                    {state.channels[state.selectedShape.identifier] &&
                        state.channels[state.selectedShape.identifier].length > 0 && (
                            <select ref={channelRef} defaultValue={''} className="min-w-[150px]">
                                <option value={''} disabled>
                                    Channel
                                </option>
                                {state.channels[state.selectedShape.identifier].map((channel) => (
                                    <option key={channel} value={channel}>
                                        {channel}
                                    </option>
                                ))}
                            </select>
                        )}
                    <div className="flex items-center shrink-0 gap-3">
                        <button
                            className="flex px-4 gap-2 py-3.5 bg-green-100 text-green-800 hover:border-green-600 border border-solid border-transparent rounded cursor-pointer font-medium"
                            onClick={async () => {
                                dispatch.updateLoading(true);
                                try {
                                    const post: Omit<FormSubmission, 'doPublish'> = {
                                        shapeIdentifier: state.selectedShape.identifier,
                                        folderPath: state.selectedFolder.tree?.path ?? '/',
                                        groupProductsBy: state.groupProductsBy,
                                        mapping: state.mapping,
                                        subFolderMapping: state.subFolderMapping,
                                        channel: channelRef.current?.value,
                                        rows: state.rows.filter((row) => row._import),
                                    };
                                    const res = await fetch('/api/preflight', {
                                        method: 'POST',
                                        cache: 'no-cache',
                                        body: JSON.stringify(post),
                                    });
                                    if (res.status !== 200) {
                                        const error = await res.json();
                                        console.error(error);
                                    }
                                    dispatch.updatePreflight((await res.json()).results);
                                } catch (err: any) {
                                    console.error(err);
                                } finally {
                                    dispatch.updateLoading(false);
                                }
                            }}
                        >
                            <span>Preflight test</span> <PiAirplaneInFlightDuotone />
                        </button>
                        <button
                            className="flex-1 gap-2 bg-pink-100 text-pink-600 hover:border-pink-600 border border-solid border-transparent rounded cursor-pointer px-2 py-1 font-medium"
                            onClick={() => {
                                dispatch.updateSpreadsheet([], []);
                            }}
                        >
                            Reset upload
                        </button>
                    </div>
                </div>
            </div>
            <DataSheetGrid
                value={state.rows}
                onChange={(rows) => dispatch.updateSpreadsheet(state.headers, rows)}
                columns={columns}
                height={800}
                rowClassName={({ rowData }) => (rowData._import ? 'row-included' : 'row-excluded')}
                headerRowHeight={80}
            />
        </div>
    );
};
