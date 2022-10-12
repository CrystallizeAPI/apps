import {
    Address,
    SubscriptionContractMeteredVariableReferenceInputRequest,
    SubscriptionContractMeteredVariableTierInputRequest,
    SubscriptionContractPhaseInput,
} from '@crystallize/js-api-client';

export type PhaseType = 'initial' | 'recurring';
export type Action =
    | { type: 'UPDATE_CONTRACT'; contract: Contract }
    | { type: 'UPDATE_ADDRESS'; index: number; address: Partial<Address> }
    | { type: 'ADD_METERED_VARIABLE_NEW_TIER'; phase: PhaseType; meteredVariableIdentifier: string }
    | { type: 'REMOVE_METERED_VARIABLE_TIER'; phase: PhaseType; meteredVariableIdentifier: string; tierIndex: number }
    | {
          type: 'UPDATE_METERED_VARIABLE_TIER_TYPE';
          phase: PhaseType;
          meteredVariableIdentifier: string;
          tierType: string;
      }
    | { type: 'UPDATE_PHASE_PRICE'; phase: PhaseType; price: { price?: string; currency?: string } }
    | { type: 'UPDATE_CONTRACT_REQUEST' }
    | { type: 'DUPLICATE_PHASE'; source: PhaseType; target: PhaseType }
    | { type: 'REMOVE_PHASE'; phase: PhaseType }
    | { type: 'UPDATE_CUSTOMER_IDENTIFIER'; identifier: string }
    | { type: 'UPDATE_DATES'; dates: { renewAt?: Date; activeUntil?: Date } }
    | { type: 'SET_ERRORS'; errors: ContractError[] }
    | {
          type: 'UPDATE_METERED_VARIABLE_TIER';
          phase: PhaseType;
          meteredVariableIdentifier: string;
          tierIndex: number;
          tier: Partial<Tier>;
      };

export type Actions = {
    updateContractRequest: () => void;
    updateContract: (contract: Contract) => void;
    updateAddress: (index: number, address: Partial<Address>) => void;
    addMeteredVariableTier: (phase: PhaseType, meteredVariableIdentifier: string) => void;
    removeMeteredVariableTier: (phase: PhaseType, meteredVariableIdentifier: string, tierIndex: number) => void;
    updateMeteredVariableTierType: (phase: PhaseType, meteredVariableIdentifier: string, tierType: string) => void;
    updateMeteredVariableTier: (
        phase: PhaseType,
        meteredVariableIdentifier: string,
        tierIndex: number,
        tier: Partial<Tier>,
    ) => void;
    updatePhasePrice: (phase: PhaseType, price: { price?: string; currency?: string }) => void;
    removePhase: (phase: PhaseType) => void;
    duplicatePhase: (source: PhaseType, target: PhaseType) => void;
    setErrors: (errors: ContractError[]) => void;
    updateCustomerIdentifier: (identifier: string) => void;
    updateDates: (dates: { renewAt?: Date; activeUntil?: Date }) => void;
};
export type Dispatch = (action: Action) => void;

export type State = {
    contract: Contract;
    loading: boolean;
    errors: Record<string, string>;
    saved: boolean;
    mode: 'create' | 'edit';
    currency: string;
};

export type ContractError = {
    path: string;
    message: string;
};

export type Contract = any;

export type Phase = SubscriptionContractPhaseInput & {
    period: number;
    unit: string;
};
export type Tier = Omit<SubscriptionContractMeteredVariableTierInputRequest, 'price'> & {
    price: string;
};
export type MeteredVariable = SubscriptionContractMeteredVariableReferenceInputRequest & {
    identifier: string;
    name: string;
    unit: string;
};
