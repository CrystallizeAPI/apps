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

    const pimAwareClient = createClient({
        tenantId: signatureChecked.tenantId,
        tenantIdentifier: signatureChecked.tenantIdentifier,
        sessionId: cookiePayload['connect.sid'],
    });


    // apiClient is a PIM Client if there is a static auth token we need to use it...
    // it can be more abstract but this is only here that we need to use it.
    // so let's keep it simple for now
    // let's check
    const authMethod = await pimAwareClient.pimApi(`#graphql
        query GET_TENANT_AUTHENTICATION_METHOD($tenantId: ID!, $identifier: String!) {
            tenant {
                    get(id: $tenantId, identifier: $identifier) {
                        authenticationMethod {
                            catalogue
                            search
                        }
                        staticAuthToken
                    }
                }
            }
        `, {
        tenantId: pimAwareClient.config.tenantId,
        identifier: pimAwareClient.config.tenantIdentifier,
    })

    const apiClient = createClient({
        tenantId: pimAwareClient.config.tenantId,
        tenantIdentifier: pimAwareClient.config.tenantIdentifier,
        sessionId: cookiePayload['connect.sid'],
        ...(authMethod.tenant.get.authenticationMethod.catalogue === 'staticToken' && {
            staticAuthToken: authMethod.tenant.get.staticAuthToken,
        }),
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
