import { useNavigate } from '@remix-run/react';
import { FormEvent, useEffect } from 'react';
import { CreateContractForm } from './components/CreateContractForm';
import { EditContractForm } from './components/EditContractForm';
import { ContractContextProvider, useContract } from './provider';
import { Contract } from './types';

export const ContractFormApp: React.FC<{ contract: Contract; mode: 'create' | 'edit' }> = ({ contract, mode }) => {
    return (
        <div className="contract-form">
            <ContractContextProvider initialState={{ contract, mode }}>
                <App />
            </ContractContextProvider>
        </div>
    );
};

export const App: React.FC = ({}) => {
    const { state, dispatch } = useContract();
    const navigate = useNavigate();

    useEffect(() => {
        let timeout;
        if (state.mode === 'create' && state.saved === true) {
            timeout = setTimeout(() => {
                navigate('/edit/' + state.contract.id);
            }, 1000);
        }
        return () => {};
    }, [state.mode, state.saved]);

    const submit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch.updateContractRequest();
        const response = await fetch('/api/' + (state.mode === 'edit' ? state.contract.id : 'new'), {
            method: state.mode === 'edit' ? 'PUT' : 'POST',
            body: JSON.stringify(state.contract),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            const body = await response.json();
            if (body.errors.length === 0) {
                dispatch.updateContract(body.contract);
            } else {
                dispatch.setErrors(body.errors);
            }
            window.scrollTo(0, 0);
        }
    };
    if (Object.keys(state.errors).length > 0) {
        console.error(state.errors);
    }
    return (
        <div className="ContractApp">
            {Object.keys(state.errors).length > 0 && (
                <div className="bg-pink-100 border-pink-600 border rounded-lg px-6 py-4 gap-2 flex-col">
                    <div className="flex gap-2">
                        <span className="font-bold text-sm text-pink-600">Pump the brakes, champ.</span>
                        <span className="font-bold text-sm text-pink-600">
                            There are {Object.keys(state.errors).length} errors in the contract that you need to fix.
                        </span>
                    </div>
                    <span className="italic font-normal text-pink-600 text-sm">{state.errors['fatal'] ?? ''}</span>
                </div>
            )}
            {state.saved && (
                <div className="bg-green-100 border-green-600 border rounded-lg px-6 py-4 gap-2 flex ">
                    <span className="font-bold text-sm text-green-600">You're the bee's knees!</span>
                    <span className="italic font-normal text-green-600 text-sm">
                        The contract has been saved. {state.mode === 'create' && state.saved && 'Redirect in 3sec.'}
                    </span>
                </div>
            )}
            {state.mode === 'edit' && <EditContractForm submit={submit} />}
            {state.mode === 'create' && state.saved === false && <CreateContractForm submit={submit} />}
        </div>
    );
};
