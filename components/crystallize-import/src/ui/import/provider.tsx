import { createContext, FunctionComponent, ReactNode, useContext, useReducer } from 'react';
import { mapToReducerActions, Reducer } from './reducer';
import { Actions, Dispatch, State } from '~/contracts/ui-types';

const StateContext = createContext<State | undefined>(undefined);
const DispatchContext = createContext<Dispatch | undefined>(undefined);

export const ImportContextProvider: FunctionComponent<{
    children: ReactNode;
    initialState: State;
}> = ({ children, initialState }) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    return (
        <StateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
        </StateContext.Provider>
    );
};

const useImportContextState = () => {
    const context = useContext(StateContext);
    if (context === undefined) {
        throw new Error('useImportContextState must be used within the ContractContextProvider.');
    }
    return context;
};

const useImportContextDispatch = () => {
    const context = useContext(DispatchContext);
    if (context === undefined) {
        throw new Error('useImportContextDispatch must be used within the ContractContextProvider.');
    }
    return context;
};

export const useImport = (): { state: State; dispatch: Actions } => {
    const actions = mapToReducerActions(useImportContextDispatch());
    const state = useImportContextState();
    return {
        state,
        dispatch: actions,
    };
};
