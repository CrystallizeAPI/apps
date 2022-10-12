import { Col, Row } from 'react-bootstrap';
import { MdSubscriptions } from 'react-icons/md';
import { useContract } from '../provider';
import { PhaseForm } from './PhaseForm';

export const SubscriptionForm: React.FC = () => {
    const { state } = useContract();
    const { contract } = state;
    return (
        <fieldset>
            <legend>
                <MdSubscriptions /> Subscription Pricing
            </legend>
            <Row>
                {contract.initial && (
                    <Col>
                        <PhaseForm type={'initial'} />
                    </Col>
                )}
                <Col>
                    <PhaseForm type={'recurring'} />
                </Col>
            </Row>
        </fieldset>
    );
};
