import { Action, Actions, Dispatch, State } from '../../contracts/ui-types';

export const Reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'UPDATE_SELECTED_SHAPE':
            return {
                ...state,
                mapping: {},
                selectedShape: action.shape,
                preflight: undefined,
                errors: [],
            };
        case 'UPDATE_SELECTED_FOLDER':
            return {
                ...state,
                selectedFolder: action.folder,
                preflight: undefined,
                errors: [],
            };
        case 'UPDATE_GROUP_PRODUCTS_BY':
            return {
                ...state,
                groupProductsBy: action.groupProductsBy,
                preflight: undefined,
                errors: [],
            };
        case 'UPDATE_SPREADSHEET':
            return {
                ...state,
                headers: action.headers,
                rows: action.rows,
                preflight: undefined,
                errors: [],
            };

        case 'UPDATE_MAPPING':
            return {
                ...state,
                mapping: action.mapping,
                preflight: undefined,
                errors: [],
            };
        case 'UPDATE_PRODUCT_VARIANT_ATTRIBUTES':
            return {
                ...state,
                attributes: action.attributes,
                preflight: undefined,
                errors: [],
            };

        case 'UPDATE_LOADING':
            return {
                ...state,
                loading: action.loading,
                preflight: action.loading ? undefined : state.preflight,
                errors: action.loading ? undefined : state.errors,
            };
        case 'UPDATE_DONE':
            return {
                ...state,
                rows: [],
                headers: [],
                mapping: {},
                done: action.done,
                preflight: undefined,
                errors: [],
            };
        case 'UPDATE_PREFLIGHT':
            return {
                ...state,
                preflight: action.preflight,
                errors: [],
            };
        case 'UPDATE_MAIN_ERRORS':
            return {
                ...state,
                errors: action.errors,
            };
    }
};

export const mapToReducerActions = (dispatch: Dispatch): Actions => ({
    updateSelectedShape: (shape) => dispatch({ type: 'UPDATE_SELECTED_SHAPE', shape }),
    updateSelectedFolder: (folder) => dispatch({ type: 'UPDATE_SELECTED_FOLDER', folder }),
    updateGroupProductsBy: (groupProductsBy) => dispatch({ type: 'UPDATE_GROUP_PRODUCTS_BY', groupProductsBy }),
    updateSpreadsheet: (headers, rows) => dispatch({ type: 'UPDATE_SPREADSHEET', headers, rows }),
    updateMapping: (mapping) => dispatch({ type: 'UPDATE_MAPPING', mapping }),
    updateDone: (done) => dispatch({ type: 'UPDATE_DONE', done }),
    updateLoading: (loading) => dispatch({ type: 'UPDATE_LOADING', loading }),
    updateProductVariantAttributes: (attributes) => dispatch({ type: 'UPDATE_PRODUCT_VARIANT_ATTRIBUTES', attributes }),
    updatePreflight: (preflight) => dispatch({ type: 'UPDATE_PREFLIGHT', preflight }),
    updateMainErrors: (errors) => dispatch({ type: 'UPDATE_MAIN_ERRORS', errors }),
});
