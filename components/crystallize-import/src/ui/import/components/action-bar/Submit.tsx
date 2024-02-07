import { FormSubmission } from '~/contracts/form-submission';
import { useImport } from '../../provider';

const submit = async (data: FormSubmission) => {
    // setError('');
    // setLoading(true);
    try {
        const res = await fetch('/api/submit', {
            method: 'POST',
            cache: 'no-cache',
            body: JSON.stringify(data),
        });
        if (res.status !== 200) {
            const error = await res.json();
            // setError(error.message);
        } else {
            // setDone(true);
        }
    } catch (err: any) {
        // setError(err.message);
    } finally {
        // setLoading(false);
    }
};

export const Submit = () => {
    const { state } = useImport();

    const buttonText = state.rows?.length
        ? `Import ${state.rows.filter((row) => row._import).length} rows`
        : `No rows to import`;

    return (
        <div>
            <button
                className="submit"
                onClick={() =>
                    submit({
                        shape: state.selectedShape,
                        folder: state.selectedFolder,
                        groupProductsBy: state.groupProductsBy,
                        mapping: state.mapping,
                        rows: state.rows.filter((row) => row._import),
                    })
                }
                type="button"
                disabled={!state.rows?.length || state.done}
            >
                {state.done ? 'Import completed' : buttonText}
            </button>
        </div>
    );
};
