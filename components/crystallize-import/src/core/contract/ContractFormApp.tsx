import { useNavigate } from '@remix-run/react';
import { FormEvent, useEffect } from 'react';
import { Alert, Container } from 'react-bootstrap';
import { CreateContractForm } from './components/CreateContractForm';
import { EditContractForm } from './components/EditContractForm';
import { ContractContextProvider, useContract } from './provider';
import { Contract } from './types';

export const ContractFormApp: React.FC<{ contract: Contract; mode: 'create' | 'edit' }> = ({ contract, mode }) => {
    return (
        <Container className="contract-form">
            <ContractContextProvider initialState={{ contract, mode }}>
                <App />
            </ContractContextProvider>
        </Container>
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
        <Container className="ContractApp">
            {Object.keys(state.errors).length > 0 && (
                <Alert variant={'danger'}>
                    <Alert.Heading>Error!</Alert.Heading>
                    There are {Object.keys(state.errors).length} errors in the contract that you need to fix.
                    <br />
                    {state.errors['fatal'] ?? ''}
                </Alert>
            )}
            {state.saved && (
                <Alert variant={'success'}>
                    <Alert.Heading>Congratulations!</Alert.Heading>The contract has been saved.
                    {state.mode === 'create' && state.saved === true && (
                        <>
                            <hr />
                            Redirect in 3sec.
                        </>
                    )}
                </Alert>
            )}
            {state.mode === 'edit' && <EditContractForm submit={submit} />}
            {state.mode === 'create' && state.saved === false && <CreateContractForm submit={submit} />}
        </Container>
    );
};
