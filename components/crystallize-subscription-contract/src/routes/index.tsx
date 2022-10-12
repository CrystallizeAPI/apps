import { json, LoaderFunction } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { TbWritingSign } from 'react-icons/tb';
import CrystallizeAPI from 'src/core.server/use-cases/crystallize';
import { ContractList } from '~/core/contract/components/ContractList';

export const loader: LoaderFunction = async ({ request }) => {
    const api = await CrystallizeAPI(request);

    const contracts = await api.fetchAllSubscriptionContracts();
    return json({ contracts });
};

export default () => {
    const { contracts } = useLoaderData();
    return (
        <div className="container">
            <div className="shadow-md bg-white rounded-sm">
                <h1 className="h2 d-flex mb-2 p-5 rounded-top align-items-center justify-content-between">
                    <span className="d-flex gap-2 align-items-center">
                        <TbWritingSign />
                        Contracts List
                    </span>
                    <Link
                        to={'/create'}
                        className="fs-6 bg-light p-3 rounded fw-medium text-decoration-none d-flex gap-2 align-items-center"
                    >
                        <TbWritingSign /> Create a new Contract
                    </Link>
                </h1>
                <ContractList contracts={contracts} />
            </div>
        </div>
    );
};
