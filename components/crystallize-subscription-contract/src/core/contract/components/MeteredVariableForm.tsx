import { ContractError } from './Error';
import { useContract } from '../provider';
import { PhaseType, Tier } from '../types';
import { Button, Tag, Icon, Input, IconButton } from '@crystallize/design-system';
export const MeteredVariableForm: React.FC<{ phase: PhaseType; value: any; variableIndex: number }> = ({
    phase,
    value,
    variableIndex,
}) => {
    const { dispatch } = useContract();

    const computedTierRanges = value.tiers.map((tier: Tier, tierIndex: number) => {
        const from = tier.threshold;
        const to = value.tiers[tierIndex + 1]?.threshold || `∞`;
        return {
            ...tier,
            from,
            to,
        };
    });

    return (
        <div className="meteredVariable-form border-t mt-2 flex flex-col bg-white py-3">
            <div className="flex items-center">
                <h4 className="font-medium text-sm text-gray-500 w-full">{value.name}</h4>

                <select
                    value={`${value.tierType}`}
                    className="c-btn c-btn-sm"
                    onChange={(event) => {
                        dispatch.updateMeteredVariableTierType(phase, value.identifier, event.target.value);
                    }}
                >
                    <option disabled>Tier Type</option>
                    <option value="graduated">Graduated</option>
                    <option value="volume">Volume</option>
                </select>
                <ContractError path={`${phase}.meteredVariables.${variableIndex}.tierType`} />
            </div>
            {computedTierRanges.length > 0 && (
                <div className="shadow border rounded overflow-hidden mt-2">
                    {computedTierRanges.map((tier: Tier & { from: string; to: string }, tierIndex: number) => {
                        return (
                            <>
                                <div
                                    className="flex justify-evently border-b last:border-none pl-4"
                                    key={`${value.id}-tier-${tierIndex}`}
                                >
                                    <div className="flex items-center border-r ">
                                        <Input
                                            type="text"
                                            className="w-1/3 placeholder:text-xs font-medium py-4"
                                            placeholder="From"
                                            value={tier.from}
                                            onChange={(event) => {
                                                dispatch.updateMeteredVariableTier(phase, value.identifier, tierIndex, {
                                                    threshold: parseInt(event.target.value) || 0,
                                                });
                                            }}
                                        />

                                        <span className="w-1/3">
                                            <Icon.Arrow className="-rotate-90" />
                                        </span>
                                        <span className=" cursor-not-allowed w-[40px]">{tier.to}</span>
                                    </div>
                                    <div className="flex items-center  py-4 px-4">
                                        <Input
                                            type="text"
                                            placeholder="Price"
                                            value={tier.price}
                                            onChange={(event) => {
                                                dispatch.updateMeteredVariableTier(phase, value.identifier, tierIndex, {
                                                    price: event.target.value,
                                                });
                                            }}
                                        />
                                        <Tag className="input-group-text">{tier.currency}</Tag>
                                    </div>
                                    <div className="flex items-center justify-end w-1/3">
                                        <IconButton
                                            onClick={() =>
                                                dispatch.removeMeteredVariableTier(phase, value.identifier, tierIndex)
                                            }
                                        >
                                            <Icon.Cancel className="w-4 h-4" />
                                        </IconButton>
                                    </div>
                                </div>
                                <ContractError
                                    path={`${phase}.meteredVariables.${variableIndex}.tiers.${tierIndex}.price`}
                                />
                                <ContractError
                                    path={`${phase}.meteredVariables.${variableIndex}.tiers.${tierIndex}.threshold`}
                                />
                            </>
                        );
                    })}
                </div>
            )}

            <div className="mt-2">
                <Button
                    size="sm"
                    onClick={() => {
                        dispatch.addMeteredVariableTier(phase, value.identifier);
                    }}
                >
                    Add Tier +
                </Button>
            </div>
        </div>
    );
};
