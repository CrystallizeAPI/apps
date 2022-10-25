import { DataSheetGrid, keyColumn, textColumn, checkboxColumn, Column } from 'react-datasheet-grid';
import { FaUndo } from 'react-icons/fa';
import { useImport } from '../provider';
import { ColumnHeader } from './data-grid/ColumnHeader';

export const DataMatchingForm = () => {
    const { state, dispatch } = useImport();

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
            <div className="match-header">
                <div>
                    <h1>Match column labels to item components</h1>
                    <h2>
                        <strong>{state.rows.length}</strong> rows were found in this file.
                    </h2>
                </div>
                <div>
                    <button
                        className="reset"
                        onClick={() => {
                            dispatch.updateRows([]);
                            dispatch.updateMapping({});
                        }}
                    >
                        <FaUndo />
                    </button>
                </div>
            </div>
            <DataSheetGrid
                value={state.rows}
                onChange={(rows) => dispatch.updateRows(rows)}
                columns={columns}
                height={800}
                rowClassName={({ rowData }) => (rowData._import ? 'row-included' : 'row-excluded')}
                headerRowHeight={80}
            />
        </div>
    );
};
