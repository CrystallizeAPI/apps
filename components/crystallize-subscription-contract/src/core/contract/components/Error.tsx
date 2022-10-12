import { useContract } from '../provider';

export const ContractError: React.FC<{ path: string }> = ({ path }) => {
    const { state } = useContract();

    if (!state.errors[path]) {
        return null;
    }

    return <div className="invalid-feedback">{state.errors[path]}</div>;
};
