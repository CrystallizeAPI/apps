import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useState } from 'react';
import { DataMatchingForm } from '~/components/data-form';
import { FileChooser } from '~/components/file-chooser';
import { ShapeChooser } from '~/components/shape-chooser';
import { getShapes } from '~/models/shapes.server';
import type { Shape } from '~/types';
import type { FormSubmission } from './import/submit';

type LoaderData = {
    shapes: Awaited<ReturnType<typeof getShapes>>;
};

export const loader = async () => {
    return json<LoaderData>({
        shapes: await getShapes(),
    });
};

// const schema = z.object({
//     shape: z.any(),
//     mapping: z.record(z.string(), z.string()),
//     rows: z.array(
//                 z.record(z.string(), z.any()),
//     ),
// });

// const mutation = makeDomainFunction(schema)(async values => (
//     // do something
// ))

// const action: ActionFunction = async ({ request }) => {
//     formAction({ request, schema, mutation, successPath: '/import/status' });
// };

const submit = async (data: FormSubmission) => {
    await fetch('/import/submit', {
        method: 'POST',
        cache: 'no-cache',
        body: JSON.stringify(data),
    });
};

export default function Index() {
    const { shapes } = useLoaderData<LoaderData>();
    const [selectedShape, setSelectedShape] = useState(shapes[0]);
    const [headers, setHeaders] = useState([] as string[]);
    const [rows, setRows] = useState([] as Record<string, any>[]);
    const [mapping, setMapping] = useState({} as Record<string, string>);
    const [groupProductsBy, setGroupProductsBy] = useState('' as string);

    if (!shapes) {
        return 'loading';
    }

    return (
        <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
            {selectedShape && <p>Chosen Shape: {selectedShape.identifier}</p>}
            <FileChooser
                onChange={({ headers, rows }) => {
                    setHeaders(headers);
                    setRows(rows);
                }}
            />
            <ShapeChooser shapes={shapes} setSelectedShape={setSelectedShape} />
            {!!rows?.length && (
                <div>
                    <DataMatchingForm
                        shape={selectedShape}
                        headers={headers}
                        rows={rows}
                        setRows={setRows}
                        mapping={mapping}
                        setMapping={setMapping}
                    />
                    <div>
                        <label>
                            Group Products By:&nbsp;
                            <select onChange={(e) => setGroupProductsBy(e.target.value)}>
                                <option disabled selected value="" />
                                {headers.map((header) => (
                                    <option key={header} value={header}>
                                        {header}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <div>
                        <button
                            onClick={() =>
                                submit({
                                    shape: selectedShape as Shape,
                                    rows,
                                    mapping,
                                    groupProductsBy,
                                })
                            }
                            type="button"
                        >
                            Import
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
