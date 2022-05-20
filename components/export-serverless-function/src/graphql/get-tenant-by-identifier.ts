import { gql } from 'graphql-request';
import { Tenant } from '../types';
import { getClient } from './client';

const query = gql`
    query ($tenantIdentifier: String!) {
        tenant {
            get(identifier: $tenantIdentifier) {
                id
                shapes {
                    identifier
                }
                availableLanguages {
                    code
                }
            }
        }
    }
`;

export const getTenantByIdentifier = async (tenantIdentifier: string): Promise<Tenant> => {
    const res = await getClient().request(query, {
        tenantIdentifier,
    });
    return res.tenant.get;
};
