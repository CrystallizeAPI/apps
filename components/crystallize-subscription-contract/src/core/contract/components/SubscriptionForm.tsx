import { useContract } from '../provider';
import { PhaseForm } from './PhaseForm';
import { Button } from '@crystallize/design-system';
export const SubscriptionForm: React.FC = () => {
    const { state, dispatch } = useContract();
    const { contract } = state;
    return (
        <fieldset>
            <div className="flex gap-8">
                <div className="w-1/2">
                    <PhaseForm type={'recurring'} />
                </div>
                {contract.initial ? (
                    <div className="w-1/2">
                        <PhaseForm type={'initial'} />
                    </div>
                ) : (
                    <div className="w-1/2 gap-2 flex-col flex border border-gray-400 rounded border-dashed items-center justify-center">
                        <p className="text-gray-500 italic font-medium">No initial period</p>
                        <Button
                            size="sm"
                            variant="elevate"
                            onClick={() => {
                                dispatch.duplicatePhase('recurring', 'initial');
                            }}
                        >
                            Add initial period +
                        </Button>
                    </div>
                )}
            </div>
        </fieldset>
    );
};
