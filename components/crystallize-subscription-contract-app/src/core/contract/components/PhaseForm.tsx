import { Button, Col, Form, Row } from 'react-bootstrap';
import { useContract } from '../provider';
import { Phase, PhaseType } from '../types';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { FaHandPointLeft } from 'react-icons/fa';
import { MeteredVariableForm } from './MeteredVariableForm';
import { ContractError } from './Error';
import { TbFidgetSpinner } from 'react-icons/tb';
import { GiSpikesInit } from 'react-icons/gi';

export const PhaseForm: React.FC<{ type: PhaseType }> = ({ type }) => {
    const { state, dispatch } = useContract();
    const { contract } = state;

    const phase = contract[type] as Phase;
    if (!phase) {
        return null;
    }

    return (
        <fieldset className="period-form">
            <legend>
                {type === 'initial' && <GiSpikesInit />}
                {type === 'recurring' && <TbFidgetSpinner />} {type} Phase ({phase.period} {phase.unit})
                {type === 'initial' && (
                    <Button
                        variant="danger"
                        size="sm"
                        className="float-end"
                        onClick={() => {
                            dispatch.removePhase(type);
                        }}
                    >
                        <RiDeleteBin6Fill />
                    </Button>
                )}
                {type === 'recurring' && (
                    <Button
                        variant="dark"
                        size="sm"
                        className="float-end"
                        onClick={() => {
                            dispatch.duplicatePhase('recurring', 'initial');
                        }}
                    >
                        <FaHandPointLeft />
                    </Button>
                )}
            </legend>
            <Row>
                <Form.Group as={Col}>
                    <Form.Control
                        type="text"
                        placeholder="Price"
                        value={`${phase.price}`}
                        onChange={(event) => {
                            dispatch.updatePhasePrice(type, { price: event.target.value });
                        }}
                    />
                    <ContractError path={`${type}.price`} />
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Control
                        type="text"
                        placeholder="Currency"
                        value={`${phase.currency}`}
                        onChange={(event) => {
                            dispatch.updatePhasePrice(type, { currency: event.target.value });
                        }}
                    />
                    <ContractError path={`${type}.currency`} />
                </Form.Group>
            </Row>

            {phase.meteredVariables?.map((variable: any, index: any) => (
                <Row key={`${variable.id}-${index}`}>
                    <MeteredVariableForm phase={type} value={variable} variableIndex={index} />
                </Row>
            ))}
        </fieldset>
    );
};
