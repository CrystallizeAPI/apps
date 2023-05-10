import { useContract } from '../provider';
import { Phase, PhaseType } from '../types';
import { MeteredVariableForm } from './MeteredVariableForm';
import { ContractError } from './Error';
import { Button } from '@crystallize/design-system';
export const PhaseForm: React.FC<{ type: PhaseType }> = ({ type }) => {
    const { state, dispatch } = useContract();
    const { contract } = state;

    const phase = contract[type] as Phase;
    if (!phase) {
        return null;
    }

    return (
        <div className="period-form bg-white px-6 shadow border rounded py-6 ">
            <div>
                <div className="justify-end ">
                    <div className="flex items-center">
                        <h3 className="font-medium text-sm text-gray-500 w-full">Subscription {type}</h3>

                        {type === 'initial' && (
                            <Button
                                intent="danger"
                                size="xs"
                                onClick={() => {
                                    dispatch.removePhase(type);
                                }}
                            >
                                <span className="text-xs block">Remove initial period</span>
                            </Button>
                        )}
                    </div>
                    <div className="flex flex-col py-2 flex-wrap">
                        <div className="flex items-center">
                            <input
                                type="text"
                                placeholder="Price"
                                className="border shadow rounded-l h-12 pl-4 text-lg font-bold w-auto bg-transparent"
                                value={`${phase.price}`}
                                onChange={(event) => {
                                    dispatch.updatePhasePrice(type, { price: event.target.value });
                                }}
                            />
                            <input
                                type="text"
                                placeholder="Currency"
                                className="pl-4 h-12 shadow text-sm rounded-r border-y border-r font-normal w-auto bg-transparent"
                                value={`${phase.currency}`}
                                onChange={(event) => {
                                    dispatch.updatePhasePrice(type, { currency: event.target.value });
                                }}
                            />

                            {type && (
                                <div className="pl-4 font-medium italic text-gray-500 text-sm">
                                    / {phase.period} {phase.unit}
                                </div>
                            )}
                        </div>
                        <ContractError path={`${type}.price`} />
                        <ContractError path={`${type}.currency`} />
                    </div>
                </div>
            </div>

            {phase.meteredVariables?.map((variable: any, index: any) => (
                <div className="flex flex-col" key={`${variable.id}-${index}`}>
                    <MeteredVariableForm phase={type} value={variable} variableIndex={index} />
                </div>
            ))}
        </div>
    );
};
