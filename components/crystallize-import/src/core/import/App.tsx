import { ActionBar } from './components/action-bar/ActionBar';
import { DataMatchingForm } from './components/DataForm';
import { FileChooser } from './components/FileChooser';
import { useImport } from './provider';

export const App = () => {
    const { state, dispatch } = useImport();
    const { shapes, folders } = state;

    return (
        <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4', padding: '20px 50px' }}>
            <ActionBar shapes={shapes} folders={folders} />

            <div style={{ marginTop: 100 }} />

            {!state.rows?.length ? (
                <div className="file-chooser-section app-section">
                    <FileChooser
                        onChange={({ headers, rows }) => {
                            dispatch.updateHeaders(headers);
                            dispatch.updateRows(
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

                    <div className="app-section">
                        <DataMatchingForm />
                    </div>

                    {(state.loading || state.error) && (
                        <div className="feedback-container">
                            {state.loading && (
                                <>
                                    <div className="loader-wrapper" style={{ transform: 'scale(0.5,0.5)' }}>
                                        <div className="loader"></div>
                                    </div>
                                    <span className="import-message">Bip bop, importing your stuff...</span>
                                </>
                            )}

                            {state.error && (
                                <div className="error">
                                    <pre>Error: {state.error}</pre>
                                </div>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};
