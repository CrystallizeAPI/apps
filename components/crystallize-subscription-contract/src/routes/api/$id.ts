import { ActionFunction, json } from '@remix-run/node';
import CrystallizeAPI from '~/core.server/use-cases/crystallize/index';

export const action: ActionFunction = async ({ request, params }) => {
    const api = await CrystallizeAPI(request);
    const contract = await request.json();

    if (request.method === 'POST') {
        const { contract: updatedContract, errors } = await api.createContract(contract);
        return json({
            contract: updatedContract,
            errors,
        });
    }

    if (request.method === 'PUT') {
        const { contract: updatedContract, errors } = await api.updateContract(params.id!, contract);

        return json({
            contract: updatedContract,
            errors,
        });
    }
};
