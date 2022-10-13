import { Address } from '@crystallize/js-api-client';
import { Action, Actions, Contract, ContractError, Dispatch, PhaseType, State, Tier } from './types';

export function Reducer(state: State, action: Action) {
    switch (action.type) {
        case 'UPDATE_CONTRACT_REQUEST': {
            return {
                ...state,
                loading: true,
                saved: false,
                errors: {},
            } as State;
        }
        case 'UPDATE_CONTRACT': {
            return {
                ...state,
                loading: false,
                saved: true,
                contract: {
                    ...action.contract,
                },
            } as State;
        }
        case 'UPDATE_DATES': {
            return {
                ...state,
                contract: {
                    ...state.contract,
                    status: {
                        ...state.contract.status,
                        ...action.dates,
                    },
                },
            } as State;
        }
        case 'UPDATE_CUSTOMER_IDENTIFIER': {
            return {
                ...state,
                contract: {
                    ...state.contract,
                    customerIdentifier: action.identifier,
                },
            } as State;
        }
        case 'UPDATE_ADDRESS': {
            const currentAddresses = state.contract?.addresses || [];
            const newAddresses = currentAddresses.map((address: Address, addressIndex: number) => {
                if (addressIndex !== action.index) {
                    return address;
                }
                return {
                    ...address,
                    ...action.address,
                };
            });

            return {
                ...state,
                saved: false,
                contract: {
                    ...state.contract,
                    addresses: newAddresses.length > 0 ? newAddresses : [{ ...action.address }],
                },
            } as State;
        }
        case 'UPDATE_PHASE_PRICE': {
            const phase = state.contract[action.phase];
            if (!phase) {
                return state;
            }
            return {
                ...state,
                saved: false,
                contract: {
                    ...state.contract,
                    [action.phase]: {
                        ...state.contract[action.phase]!,
                        ...action.price,
                        meteredVariables: state.contract[action.phase].meteredVariables.map((variable: any) => {
                            return {
                                ...variable,
                                tiers: variable.tiers.map((tier: any) => {
                                    return {
                                        ...tier,
                                        currency: action.price.currency ?? tier.currency,
                                    };
                                }),
                            };
                        }),
                    },
                },
            } as State;
        }
        case 'ADD_METERED_VARIABLE_NEW_TIER': {
            const phase = state.contract[action.phase];
            if (!phase) {
                return state;
            }

            const meteredVariables = phase.meteredVariables.map((variable: any) => {
                if (variable.identifier !== action.meteredVariableIdentifier) {
                    return variable;
                }
                return {
                    ...variable,
                    tiers: [
                        ...variable.tiers,
                        {
                            threshold: '',
                            price: 0,
                            currency: state.contract.recurring.currency,
                        },
                    ],
                };
            });
            return {
                ...state,
                saved: false,
                contract: {
                    ...state.contract,
                    [action.phase]: {
                        ...state.contract[action.phase]!,
                        meteredVariables: meteredVariables,
                    },
                },
            } as State;
        }
        case 'REMOVE_METERED_VARIABLE_TIER': {
            const phase = state.contract[action.phase];
            if (!phase) {
                return state;
            }

            const meteredVariables = phase.meteredVariables.map((variable: any) => {
                if (variable.identifier !== action.meteredVariableIdentifier) {
                    return variable;
                }
                let tiers = [...variable.tiers];
                tiers.splice(action.tierIndex, 1);
                return {
                    ...variable,
                    tiers: [...tiers],
                };
            });
            return {
                ...state,
                saved: false,
                contract: {
                    ...state.contract,
                    [action.phase]: {
                        ...state.contract[action.phase]!,
                        meteredVariables: meteredVariables,
                    },
                },
            } as State;
        }

        case 'UPDATE_METERED_VARIABLE_TIER': {
            const phase = state.contract[action.phase];
            if (!phase) {
                return state;
            }
            const meteredVariables = phase.meteredVariables.map((variable: any) => {
                if (variable.identifier !== action.meteredVariableIdentifier) {
                    return variable;
                }
                return {
                    ...variable,
                    tiers: variable.tiers.map((tier: Tier, tierIndex: number) => {
                        if (tierIndex !== action.tierIndex) {
                            return tier;
                        }
                        return {
                            ...tier,
                            ...action.tier,
                        };
                    }),
                };
            });
            return {
                ...state,
                saved: false,
                contract: {
                    ...state.contract,
                    [action.phase]: {
                        ...state.contract[action.phase]!,
                        meteredVariables: meteredVariables,
                    },
                },
            } as State;
        }
        case 'UPDATE_METERED_VARIABLE_TIER_TYPE': {
            const phase = state.contract[action.phase];
            if (!phase) {
                return state;
            }
            const meteredVariables = phase.meteredVariables.map((variable: any) => {
                if (variable.identifier !== action.meteredVariableIdentifier) {
                    return variable;
                }
                return {
                    ...variable,
                    tierType: action.tierType,
                };
            });
            return {
                ...state,
                contract: {
                    ...state.contract,
                    [action.phase]: {
                        ...state.contract[action.phase]!,
                        meteredVariables: meteredVariables,
                    },
                },
            } as State;
        }
        case 'REMOVE_PHASE': {
            const phase = state.contract[action.phase];
            if (!phase) {
                return state;
            }

            delete state.contract[action.phase];
            return {
                ...state,
            } as State;
        }
        case 'DUPLICATE_PHASE': {
            const source = state.contract[action.source];
            if (!source) {
                return state;
            }
            return {
                ...state,
                saved: false,
                contract: {
                    ...state.contract,
                    [action.target]: {
                        ...source,
                    },
                },
            } as State;
        }
        case 'SET_ERRORS': {
            return {
                ...state,
                saved: false,
                loading: false,
                errors: action.errors.reduce((memo: Record<string, string>, error: ContractError) => {
                    memo[error.path] = error.message;
                    return memo;
                }, {}),
            };
        }
        default: {
            throw new Error(`Contract - Unhandled action type`);
        }
    }
}

export function mapToReducerActions(dispatch: Dispatch): Actions {
    return {
        updateAddress: (index: number, address: Partial<Address>) =>
            dispatch({ type: 'UPDATE_ADDRESS', index, address }),
        addMeteredVariableTier: (phase: PhaseType, meteredVariableIdentifier: string) =>
            dispatch({ type: 'ADD_METERED_VARIABLE_NEW_TIER', phase, meteredVariableIdentifier }),
        updateMeteredVariableTier: (
            phase: PhaseType,
            meteredVariableIdentifier: string,
            tierIndex: number,
            tier: Partial<Tier>,
        ) => dispatch({ type: 'UPDATE_METERED_VARIABLE_TIER', phase, meteredVariableIdentifier, tierIndex, tier }),
        updateMeteredVariableTierType: (phase: PhaseType, meteredVariableIdentifier: string, tierType: string) =>
            dispatch({ type: 'UPDATE_METERED_VARIABLE_TIER_TYPE', phase, meteredVariableIdentifier, tierType }),
        updatePhasePrice: (phase: PhaseType, price: { price?: string; currency?: string }) =>
            dispatch({ type: 'UPDATE_PHASE_PRICE', phase, price }),
        updateContract: (contract: Contract) => dispatch({ type: 'UPDATE_CONTRACT', contract }),
        updateContractRequest: () => dispatch({ type: 'UPDATE_CONTRACT_REQUEST' }),
        removePhase: (phase: PhaseType) => dispatch({ type: 'REMOVE_PHASE', phase }),
        duplicatePhase: (source: PhaseType, target: PhaseType) => dispatch({ type: 'DUPLICATE_PHASE', source, target }),
        setErrors: (errors: ContractError[]) => dispatch({ type: 'SET_ERRORS', errors }),
        updateCustomerIdentifier: (identifier: string) => dispatch({ type: 'UPDATE_CUSTOMER_IDENTIFIER', identifier }),
        updateDates: (dates: { renewAt?: Date; activeUntil?: Date }) => dispatch({ type: 'UPDATE_DATES', dates }),
        removeMeteredVariableTier: (phase: PhaseType, meteredVariableIdentifier: string, tierIndex: number) =>
            dispatch({ type: 'REMOVE_METERED_VARIABLE_TIER', phase, meteredVariableIdentifier, tierIndex }),
    };
}
