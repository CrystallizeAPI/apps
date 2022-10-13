import { createClient } from '@crystallize/js-api-client';
import { Shape } from '@crystallize/schema/shape';
import { requireValidSession } from '~/core.server/session';
import { Contract, ContractError } from '~/core/contract/types';
import fetchSubscriptionCatalogue from './fetchSubscriptionCatalogue';
import { fetchAll as fetchAllContracts, fetchById } from './fetchSubscriptionContracts';
import fetchSubscriptionContractTemplate from './fetchSubscriptionContractTemplate';
import fetchTenantShapes from './fetchTenantShapes';
import { createContract, updateContract } from './pushContract';

export default async (request: Request) => {
    const signatureChecked = await requireValidSession(request);
    const cookie = request.headers.get('Cookie') || '';
    const cookiePayload = cookie
        .split(';')
        .map((value: string): [string, string] => value.split('=') as [string, string])
        .reduce((memo: Record<string, any>, value: [string, string]) => {
            memo[decodeURIComponent(value[0]?.trim())] = decodeURIComponent(value[1]?.trim());
            return memo;
        }, {});

    const apiClient = createClient({
        tenantId: signatureChecked.tenantId,
        tenantIdentifier: signatureChecked.tenantIdentifier,
        sessionId: cookiePayload['connect.sid'],
    });

    return {
        fetchTenantShapes: (): Promise<Shape[]> => fetchTenantShapes(apiClient),
        updateContract: (
            contractId: string,
            contract: Contract,
        ): Promise<{ contract: Contract; errors: ContractError[] }> => updateContract(apiClient, contractId, contract),
        createContract: (contract: Contract): Promise<{ contract: Contract; errors: ContractError[] }> =>
            createContract(apiClient, contract),
    };
};
