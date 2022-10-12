import { Address } from '@crystallize/js-api-client';
import { Col, Form, Row } from 'react-bootstrap';
import { FaRegAddressCard } from 'react-icons/fa';
import { ContractError } from './Error';

export const AddressForm: React.FC<{
    type: string;
    value: Address | null;
    addressIndex: number;
    onChange: Function;
}> = ({ type, value, addressIndex, onChange }) => {
    return (
        <fieldset>
            <legend>
                <FaRegAddressCard /> Address {type}
            </legend>
            <Row>
                <Form.Group as={Col}>
                    <Form.Control
                        type="text"
                        placeholder="First name"
                        value={value?.firstName || ''}
                        onChange={(event) => onChange('firstName', event.target.value)}
                    />
                    <ContractError path={`addresses.${addressIndex}.firstName`} />
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Control
                        type="text"
                        placeholder="Last name"
                        value={value?.lastName || ''}
                        onChange={(event) => onChange('lastName', event.target.value)}
                    />
                    <ContractError path={`addresses.${addressIndex}.lastName`} />
                </Form.Group>
            </Row>
            <Row>
                <Form.Group as={Col}>
                    <Form.Control
                        type="text"
                        placeholder="Street"
                        value={value?.street || ''}
                        onChange={(event) => onChange('street', event.target.value)}
                    />
                    <ContractError path={`addresses.${addressIndex}.street`} />
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Control
                        type="text"
                        placeholder="Street Complement"
                        value={value?.street2 || ''}
                        onChange={(event) => onChange('street2', event.target.value)}
                    />
                    <ContractError path={`${addressIndex}.street2`} />
                </Form.Group>
            </Row>
            <Row>
                <Form.Group as={Col}>
                    <Form.Control
                        type="text"
                        placeholder="Street Number"
                        value={value?.streetNumber || ''}
                        onChange={(event) => onChange('streetNumber', event.target.value)}
                    />
                    <ContractError path={`addresses.${addressIndex}.streetNumber`} />
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Control
                        type="text"
                        placeholder="Zipcode"
                        value={value?.postalCode || ''}
                        onChange={(event) => onChange('postalCode', event.target.value)}
                    />
                    <ContractError path={`${addressIndex}.postalCode`} />
                </Form.Group>
            </Row>
            <Row>
                <Form.Group as={Col}>
                    <Form.Control
                        type="text"
                        placeholder="City"
                        value={value?.city || ''}
                        onChange={(event) => onChange('city', event.target.value)}
                    />
                    <ContractError path={`addresses.${addressIndex}.city`} />
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Control
                        type="text"
                        placeholder="Country"
                        value={value?.country || ''}
                        onChange={(event) => onChange('country', event.target.value)}
                    />
                    <ContractError path={`addresses.${addressIndex}.country`} />
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Control
                        type="text"
                        placeholder="State/Province"
                        value={value?.state || ''}
                        onChange={(event) => onChange('state', event.target.value)}
                    />
                    <ContractError path={`addresses.${addressIndex}.state`} />
                </Form.Group>
            </Row>
        </fieldset>
    );
};
