import { DataSheetGrid, keyColumn, textColumn } from 'react-datasheet-grid';
import type { Shape } from '~/types';

interface DataMatchingFormProps {
    shape: Shape;
    headers: string[];
    rows: Record<string, any>[];
    mapping: Record<string, string>;
    setRows: (rows: Record<string, any>[]) => void;
    setMapping: (mapping: Record<string, string>) => void;
}

export const DataMatchingForm = ({ shape, headers, rows, mapping, setMapping, setRows }: DataMatchingFormProps) => {
    const columns = headers.map((header) => ({
        ...keyColumn(header, textColumn),
        title: header,
    }));

    return (
        <div className="match-form">
            <div className="match-header">
                <h1>Match column labels to product components</h1>
                <h2>
                    <strong>{rows.length}</strong> components were recognized in this file.
                </h2>
            </div>
            <div className="dsg-container">
                <div className="dsg-row">
                    {headers.map((header) => (
                        <div
                            key={header}
                            className="dsg-cell"
                            style={{ flex: '1 1 0%', flexDirection: 'column', alignItems: 'start', minWidth: '100px' }}
                        >
                            <label className="match-label">
                                Map "{header}" to
                                <input
                                    className="match-select"
                                    type="text"
                                    defaultValue={mapping[header]}
                                    onChange={(e) => {
                                        const m: Record<string, string> = {
                                            ...mapping,
                                        };
                                        m[header] = e.target.value;
                                        setMapping(m);
                                    }}
                                />
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            <DataSheetGrid lockRows={true} value={rows} onChange={setRows} columns={columns} gutterColumn={false} />
        </div>
    );
};
