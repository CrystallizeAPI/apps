import { FormEvent } from 'react';
import { Link } from '@remix-run/react';
import { AddressForm } from './AddressForm';
import { useContract } from '../provider';
import { ContractError } from './Error';
import { SubscriptionForm } from './SubscriptionForm';
import DatePicker from 'react-datepicker';
import { Button, Input } from '@crystallize/design-system';

export const CreateContractForm: React.FC<{ submit: (event: FormEvent<HTMLFormElement>) => void }> = ({ submit }) => {
    const { state, dispatch } = useContract();
    const { contract, errors } = state;

    return (
        <form method="post" className={Object.keys(errors).length > 0 ? 'is-invalid' : ''} onSubmit={submit}>
            <fieldset>
                <legend>Customer Information</legend>
                <div className="flex">
                    <div>
                        <Input
                            type="text"
                            value={contract.customerIdentifier || ''}
                            onChange={(event) => dispatch.updateCustomerIdentifier(event.target.value)}
                            required={true}
                        />
                    </div>
                </div>
            </fieldset>
            <fieldset>
                <div className="flex gap-6 mb-6">
                    <div className="bg-white rounded shadow px-6 py-3">
                        <label className="text-xs font-medium text-gray-500">Renew At</label>
                        <DatePicker
                            className=""
                            selected={contract.status?.renewAt || new Date()}
                            onChange={(date: Date) => dispatch.updateDates({ renewAt: date })}
                        />
                        <ContractError path={`status.renewAt`} />
                    </div>
                    <div className="bg-white rounded shadow px-6 py-3">
                        <label className="text-xs font-medium text-gray-500">Active until</label>
                        <DatePicker
                            selected={contract.status?.activeUntil || new Date()}
                            onChange={(date: Date) => dispatch.updateDates({ activeUntil: date })}
                        />
                        <ContractError path={`status.activeUntil`} />
                    </div>
                </div>
            </fieldset>
            <AddressForm
                addressIndex={0}
                type={`billing`}
                value={contract.addresses?.[0] || null}
                onChange={(property: string, value: string) =>
                    //@ts-ignore
                    dispatch.updateAddress(0, { [property]: value, type: 'billing' })
                }
            />
            <SubscriptionForm />
            <div className="mt-6 flex gap-6 items-center">
                <Link className="btn btn-danger" to={'/'}>
                    Cancel
                </Link>
                <Button intent="action" type="submit" disabled={state.loading}>
                    Create new Contract
                </Button>
            </div>
        </form>
    );
};
