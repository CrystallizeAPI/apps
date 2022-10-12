import { Address } from '@crystallize/js-api-client';
import { Link } from '@remix-run/react';
import { Badge, Button, Col, Form, Row } from 'react-bootstrap';
import { AddressForm } from './AddressForm';
import { useContract } from '../provider';
import { FormEvent } from 'react';
import { TbListDetails } from 'react-icons/tb';
import { FaSave, FaUserTie } from 'react-icons/fa';
import { SubscriptionForm } from './SubscriptionForm';
import { MdCancel } from 'react-icons/md';

export const EditContractForm: React.FC<{ submit: (event: FormEvent<HTMLFormElement>) => void }> = ({ submit }) => {
    const { state, dispatch } = useContract();
    const { contract, errors } = state;
    const { status, customerIdentifier, customer } = contract;

    return (
        <Form method="post" className={Object.keys(errors).length > 0 ? 'is-invalid' : ''} onSubmit={submit}>
            <fieldset disabled>
                <TbListDetails />{' '}
                <Badge className={'float-end'} bg={contract.status.renewAt ? 'success' : 'danger'}>
                    {contract.status.renewAt ? 'ACTIVE' : 'CANCELLED'}
                </Badge>
                <strong>Contract Id</strong>: #{contract.id}, <strong>Renew At</strong>: {status.renewAt},{' '}
                <strong>Active Until</strong>: {status.activeUntil}
            </fieldset>
            <fieldset>
                <legend>
                    <FaUserTie />
                    Customer Information -{' '}
                    <a href={`https://pim.crystallize.com/en/${customerIdentifier}`} target="_blank">
                        #{customerIdentifier}
                    </a>
                </legend>
                {!customer && <p>No Customer Information</p>}
                {customer && (
                    <>
                        <Row>
                            <Col>{customer.firstName}</Col>
                            <Col> {customer.lastName}</Col>
                        </Row>
                        <Row>
                            <Col>{customer.email}</Col>
                            <Col> {customer.phone}</Col>
                        </Row>
                        <Row>
                            <Col>{customer.companyName}</Col>
                            <Col> {customer.taxNumber}</Col>
                        </Row>
                    </>
                )}
            </fieldset>
            {contract.addresses?.map((address: Address, index: number) => {
                return (
                    <AddressForm
                        key={`address-${index}`}
                        addressIndex={index}
                        type={`${address.type}`}
                        value={address}
                        onChange={(property: string, value: string) =>
                            dispatch.updateAddress(index, { [property]: value })
                        }
                    />
                );
            })}
            <SubscriptionForm />
            <fieldset>
                <Button variant="success" className={'float-end'} type="submit" disabled={state.loading}>
                    <FaSave /> Save the changes
                </Button>
                <Link className="btn btn-danger" to={'/'}>
                    <MdCancel /> Cancel
                </Link>
            </fieldset>
        </Form>
    );
};
