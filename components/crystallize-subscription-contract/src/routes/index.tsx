import { json, LoaderFunction } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import CrystallizeAPI from 'src/core.server/use-cases/crystallize';
import { ContractList } from '~/core/contract/components/ContractList';
import { Icon, Button } from '@crystallize/design-system';
export const loader: LoaderFunction = async ({ request }) => {
    const api = await CrystallizeAPI(request);

    const contracts = await api.fetchAllSubscriptionContracts();
    return json({ contracts });
};

export default () => {
    const { contracts } = useLoaderData();
    return (
        <div className="container bg-gray-50">
            <div className="flex items-center  justify-between pt-2">
                <div className="flex items-center gap-2">
                    <Icon.SubscriptionPlans />
                    <h1 className="font-medium text-gray-700 ">Subscription Contract List</h1>
                </div>
                <Button variant="elevate" as={Link} to={'/create'}>
                    Create a new Contract +
                </Button>
            </div>
            {contracts.length > 0 ? (
                <ContractList contracts={contracts} />
            ) : (
                <div className="min-h-[50vh] flex justify-center items-center">No contracts found</div>
            )}
        </div>
    );
};
