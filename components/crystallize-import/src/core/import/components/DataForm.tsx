import { DataSheetGrid, keyColumn, textColumn, checkboxColumn, Column } from 'react-datasheet-grid';

import { useImport } from '../provider';
import { ColumnHeader } from './data-grid/ColumnHeader';

export const DataMatchingForm = () => {
    const { state, dispatch } = useImport();

    const shapeFields: {
        key: string;
        value: string;
        type?: string;
    }[] = [
        {
            key: 'item.name',
            value: 'Item Name',
        },
        {
            key: 'item.externalReference',
            value: 'Item External Reference',
        },
    ];

    if (state.selectedShape.type === 'product') {
        shapeFields.push(
            ...[
                {
                    key: 'variant.name',
                    value: 'Variant Name',
                },
                {
                    key: 'variant.sku',
                    value: 'Variant SKU',
                },
                {
                    key: 'variant.images',
                    value: 'Variant Images',
                },
                {
                    key: 'variant.price',
                    value: 'Variant Price',
                },
                {
                    key: 'variant.stock',
                    value: 'Variant Stock',
                },
                {
                    key: 'variant.attribute',
                    value: 'Variant Attribute',
                },
                {
                    key: 'variant.externalReference',
                    value: 'Variant External Reference',
                },
            ],
        );
    }

    state.selectedShape.components?.map(({ id, name, type }) =>
        shapeFields.push({
            key: `component.${id}`,
            value: `Component "${name}"`,
            type,
        }),
    );
    state.selectedShape.variantComponents?.map(({ id, name, type }) =>
        shapeFields.push({
            key: `variantComponent.${id}`,
            value: `Variant Component "${name}"`,
            type,
        }),
    );

    const columnsFromRows: Column[] = state.headers.map(
        (header): Column => ({
            ...keyColumn(header, textColumn),
            title: <ColumnHeader title={header} shapeFields={shapeFields} />,
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
                <h1>Match column labels to item components</h1>
                <h2>
                    <strong>{state.rows.length}</strong> rows were found in this file.
                </h2>
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
