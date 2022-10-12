import { Button, Col, Form, Row } from 'react-bootstrap';
import { ContractError } from './Error';
import { useContract } from '../provider';
import { PhaseType, Tier } from '../types';
import { FaInfinity } from 'react-icons/fa';
import { MdOutlineAddChart, MdOutlineCancelPresentation } from 'react-icons/md';

export const MeteredVariableForm: React.FC<{ phase: PhaseType; value: any; variableIndex: number }> = ({
    phase,
    value,
    variableIndex,
}) => {
    const { state, dispatch } = useContract();

    const computedTierRanges = value.tiers.map((tier: Tier, tierIndex: number) => {
        const from = tier.threshold;
        const to = value.tiers[tierIndex + 1]?.threshold || <FaInfinity />;
        return {
            ...tier,
            from,
            to,
        };
    });

    return (
        <fieldset className="meteredVariable-form">
            <legend>
                <div>
                    <Form.Select
                        className="float-end"
                        style={{ width: 200 }}
                        value={`${value.tierType}`}
                        onChange={(event) => {
                            dispatch.updateMeteredVariableTierType(phase, value.identifier, event.target.value);
                        }}
                    >
                        <option disabled>Tier Type</option>
                        <option value="graduated">Graduated</option>
                        <option value="volume">Volume</option>
                    </Form.Select>
                    {value.name}
                    <ContractError path={`${phase}.meteredVariables.${variableIndex}.tierType`} />
                </div>
            </legend>
            {computedTierRanges.map((tier: Tier & { from: string; to: string }, tierIndex: number) => {
                return (
                    <Row key={`${value.id}-tier-${tierIndex}`}>
                        <Form.Group as={Col}>
                            <Form.Control
                                type="text"
                                placeholder="From"
                                value={tier.from}
                                onChange={(event) => {
                                    dispatch.updateMeteredVariableTier(phase, value.identifier, tierIndex, {
                                        threshold: parseInt(event.target.value) || 0,
                                    });
                                }}
                            />
                            <ContractError
                                path={`${phase}.meteredVariables.${variableIndex}.tiers.${tierIndex}.threshold`}
                            />
                        </Form.Group>
                        <Form.Group as={Col}>{tier.to}</Form.Group>
                        <Form.Group as={Col} className="input-group">
                            <span className="input-group-text">{tier.currency}</span>
                            <Form.Control
                                type="text"
                                placeholder="Price"
                                value={tier.price}
                                onChange={(event) => {
                                    dispatch.updateMeteredVariableTier(phase, value.identifier, tierIndex, {
                                        price: event.target.value,
                                    });
                                }}
                            />
                            <ContractError
                                path={`${phase}.meteredVariables.${variableIndex}.tiers.${tierIndex}.price`}
                            />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Button
                                variant="outline-danger"
                                size="sm"
                                className="float-end"
                                onClick={() => {
                                    dispatch.removeMeteredVariableTier(phase, value.identifier, tierIndex);
                                }}
                            >
                                <MdOutlineCancelPresentation />
                            </Button>
                        </Form.Group>
                    </Row>
                );
            })}
            <Row>
                <Button
                    variant="dark"
                    size="sm"
                    onClick={() => {
                        dispatch.addMeteredVariableTier(phase, value.identifier);
                    }}
                >
                    <MdOutlineAddChart /> Add Tier
                </Button>
            </Row>
        </fieldset>
    );
};
