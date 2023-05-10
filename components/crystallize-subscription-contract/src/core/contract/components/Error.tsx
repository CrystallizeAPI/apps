import { useContract } from '../provider';

export const ContractError: React.FC<{ path: string }> = ({ path }) => {
    const { state } = useContract();

    if (!state.errors[path]) {
        return null;
    }

    return <div className="invalid-feedback text-pink-600">{state.errors[path]}</div>;
};
