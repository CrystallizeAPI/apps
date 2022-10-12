import { createClient } from '@crystallize/js-api-client';
import { requireValidSession } from '~/core.server/session';
import { Contract, ContractError } from '~/core/contract/types';
import fetchSubscriptionCatalogue from './fetchSubscriptionCatalogue';
import { fetchAll as fetchAllContracts, fetchById } from './fetchSubscriptionContracts';
import fetchSubscriptionContractTemplate from './fetchSubscriptionContractTemplate';
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
        fetchSubscriptionCatalogue: (): Promise<any> => fetchSubscriptionCatalogue(apiClient),
        fetchSubscriptionContractById: (id: string): Promise<Contract> => fetchById(apiClient, id),
        fetchAllSubscriptionContracts: (customerIdentifier?: string): Promise<Contract[]> =>
            fetchAllContracts(apiClient, customerIdentifier),
        updateContract: (
            contractId: string,
            contract: Contract,
        ): Promise<{ contract: Contract; errors: ContractError[] }> => updateContract(apiClient, contractId, contract),
        createContract: (contract: Contract): Promise<{ contract: Contract; errors: ContractError[] }> =>
            createContract(apiClient, contract),
        fetchSubscriptionContractTemplate: (config: any): Promise<any> =>
            fetchSubscriptionContractTemplate(apiClient, config),
    };
};
