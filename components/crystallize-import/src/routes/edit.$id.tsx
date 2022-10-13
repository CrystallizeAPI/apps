import { json, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { ContractFormApp } from '~/core/contract/ContractFormApp';
import CrystallizeAPI from '~/core.server/use-cases/crystallize/index';

export const loader: LoaderFunction = async ({ request, params }) => {
    const api = await CrystallizeAPI(request);
    const contract = await api.fetchSubscriptionContractById(params.id!);
    return json({ contract });
};

export default () => {
    const { contract } = useLoaderData();
    return <ContractFormApp contract={contract} mode="edit" />;
};
