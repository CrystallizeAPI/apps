import { ActionBar } from './components/action-bar/ActionBar';
import { DataMatchingForm } from './components/DataForm';
import { FileChooser } from './components/FileChooser';
import { useImport } from './provider';

export const App = () => {
    const { state, dispatch } = useImport();
    const { shapes, folders, selectedShape, selectedFolder, headers, rows } = state;

    return (
        <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4', padding: '20px 50px' }}>
            <ActionBar shapes={shapes} folders={folders} />

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
