import * as React from 'react';
import { FunctionComponent } from 'react';
import { mapToReducerActions, Reducer } from './reducer';
import { Actions, Dispatch, State } from './types';

const StateContext = React.createContext<State | undefined>(undefined);
const DispatchContext = React.createContext<Dispatch | undefined>(undefined);

type InitialState = Omit<State, 'loading' | 'errors' | 'saved' | 'currency'>;

const initiateState = (initialState: InitialState): State => {
    return {
        ...initialState,
        loading: false,
        errors: {},
        saved: false,
        currency: 'EUR',
    };
};

export const ContractContextProvider: FunctionComponent<{
    children: React.ReactNode;
    initialState: InitialState;
}> = ({ children, initialState }) => {
    const [state, dispatch] = React.useReducer(Reducer, initiateState(initialState));
    return (
        <StateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
        </StateContext.Provider>
    );
};

function useContractContextState() {
    const context = React.useContext(StateContext);
    if (context === undefined) {
        throw new Error('useContractContextState must be used within the ContractContextProvider.');
    }
    return context;
}

function useContractContextDispatch() {
    const context = React.useContext(DispatchContext);
    if (context === undefined) {
        throw new Error('useContractContextDispatch must be used within the ContractContextProvider.');
    }
    return context;
}

export function useContract(): { state: State; dispatch: Actions } {
    const actions = mapToReducerActions(useContractContextDispatch());
    const state = useContractContextState();
    return {
        state,
        dispatch: actions,
    };
}
