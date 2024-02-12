import { FormSubmission } from '~/contracts/form-submission';
import { useImport } from '../../provider';
import { useRef, forwardRef } from 'react';

const FlowStagesSelect = forwardRef<HTMLSelectElement>((props, ref) => {
    const { state } = useImport();

    return (
        <select className="inline-block w-1/2 text-xs p-1" ref={ref} defaultValue={''}>
            <option disabled value={''}>
                Select a Stage
            </option>
            {state.flows
                .filter((flow) => {
                    if (flow.shapeRestrictions.length === 0) return true;
                    if (flow.shapeRestrictions.includes(state.selectedShape.identifier)) return true;
                })
                .map((flow) => (
                    <optgroup key={flow.identifier} label={flow.name}>
                        {Object.keys(flow.stages).map((identifier) => (
                            <option key={identifier} value={identifier}>
                                {flow.stages[identifier]}
                            </option>
                        ))}
                    </optgroup>
                ))}
        </select>
    );
});

export const Submit = () => {
    const { state, dispatch } = useImport();

    const buttonText = state.rows?.length
        ? `Import ${state.rows.filter((row) => row._import).length} rows`
        : `No rows to import`;

    const publishRef = useRef<HTMLInputElement>(null);
    const validFlowRef = useRef<HTMLSelectElement>(null);
    const invalidFlowRef = useRef<HTMLSelectElement>(null);
    return (
        <div>
            <button
                className="submit mb-2"
                onClick={async () => {
                    dispatch.updateLoading(true);
                    try {
                        const post: FormSubmission = {
                            shapeIdentifier: state.selectedShape.identifier,
                            folderPath: state.selectedFolder.tree?.path ?? '/',
                            groupProductsBy: state.groupProductsBy,
                            mapping: state.mapping,
                            rows: state.rows.filter((row) => row._import),
                            doPublish: publishRef.current?.checked ?? false,
                            validFlowStage: validFlowRef.current?.value ?? undefined,
                            invalidFlowStage: invalidFlowRef.current?.value ?? undefined,
                        };
                        const res = await fetch('/api/submit', {
                            method: 'POST',
                            cache: 'no-cache',
                            body: JSON.stringify(post),
                        });
                        if (res.status !== 200) {
                            const error = await res.json();
                            console.error(error);
                        } else {
                            const response = await res.json();
                            if (response.success === true) {
                                dispatch.updateDone(true);
                            } else {
                                console.error('dispatching', response.errors);
                                dispatch.updateMainErrors(response.errors);
                            }
                        }
                    } catch (err: any) {
                        console.error(err);
                    } finally {
                        dispatch.updateLoading(false);
                    }
                }}
                type="button"
                disabled={!state.rows?.length || state.done}
            >
                {state.done ? 'Import completed' : buttonText}
            </button>
            <div className="text-xs flex flex-col">
                <label>
                    <input type="checkbox" ref={publishRef} />
                    Publish
                </label>
                <label>
                    Send valid to: <FlowStagesSelect ref={validFlowRef} />
                </label>
                <label>
                    Send errors to: <FlowStagesSelect ref={invalidFlowRef} />
                </label>
            </div>
            {(state.preflight?.errorCount ?? 0) > 0 && (
                <p className="text-error"> You have {state.preflight?.errorCount ?? 0} errors.</p>
            )}
        </div>
    );
};
