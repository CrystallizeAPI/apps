import { FormEvent } from 'react';
import { Link } from '@remix-run/react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { AddressForm } from './AddressForm';
import { useContract } from '../provider';
import { ContractError } from './Error';
import { MdCancel } from 'react-icons/md';
import { SubscriptionForm } from './SubscriptionForm';
import { HiOutlineSparkles } from 'react-icons/hi';
import DatePicker from 'react-datepicker';

export const CreateContractForm: React.FC<{ submit: (event: FormEvent<HTMLFormElement>) => void }> = ({ submit }) => {
    const { state, dispatch } = useContract();
    const { contract, errors } = state;

    return (
        <Form method="post" className={Object.keys(errors).length > 0 ? 'is-invalid' : ''} onSubmit={submit}>
            <fieldset>
                <legend>Customer Information</legend>
                <Row>
                    <Form.Group as={Col}>
                        <Form.Control
                            type="text"
                            value={contract.customerIdentifier || ''}
                            onChange={(event) => dispatch.updateCustomerIdentifier(event.target.value)}
                            required={true}
                        />
                    </Form.Group>
                </Row>
            </fieldset>
            <fieldset>
                <legend>Dates</legend>
                <Row>
                    <Form.Group as={Col}>
                        <Form.Label>RenewAt</Form.Label>
                        <DatePicker
                            selected={contract.status?.renewAt || new Date()}
                            onChange={(date: Date) => dispatch.updateDates({ renewAt: date })}
                        />
                        <ContractError path={`status.renewAt`} />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Active Until</Form.Label>
                        <DatePicker
                            selected={contract.status?.activeUntil || new Date()}
                            onChange={(date: Date) => dispatch.updateDates({ activeUntil: date })}
                        />
                        <ContractError path={`status.activeUntil`} />
                    </Form.Group>
                </Row>
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
            <fieldset>
                <Button variant="success" className={'float-end'} type="submit" disabled={state.loading}>
                    <HiOutlineSparkles /> Create new Contract
                </Button>
                <Link className="btn btn-danger" to={'/'}>
                    <MdCancel /> Cancel
                </Link>
            </fieldset>
        </Form>
    );
};
