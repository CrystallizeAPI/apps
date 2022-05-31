import { createClient } from '@crystallize/js-api-client';
import type { Shape, TenantQueryResponse } from '~/types';

const { CRYSTALLIZE_ACCESS_TOKEN_ID, CRYSTALLIZE_ACCESS_TOKEN_SECRET, CRYSTALLIZE_TENANT_IDENTIFIER } = process.env;

export const getShapes = async (): Promise<Shape[]> => {
    if (!CRYSTALLIZE_TENANT_IDENTIFIER || !CRYSTALLIZE_ACCESS_TOKEN_ID || !CRYSTALLIZE_ACCESS_TOKEN_SECRET) {
        throw new Error('Crystallize environment vars must be set');
    }

    const client = createClient({
        tenantIdentifier: CRYSTALLIZE_TENANT_IDENTIFIER,
        accessTokenId: CRYSTALLIZE_ACCESS_TOKEN_ID,
        accessTokenSecret: CRYSTALLIZE_ACCESS_TOKEN_SECRET,
    }).pimApi;

    const res: TenantQueryResponse = await client(
        `
          query ($tenantIdentifier: String!) {
              tenant {
                  get(identifier: $tenantIdentifier) {
                      shapes {
                          identifier
                          name
                          type
                          components {
                              id
                              name
                              type
                          }
                      }
                  }
              }
          }
      `,
        {
            tenantIdentifier: CRYSTALLIZE_TENANT_IDENTIFIER,
        },
    );

    return res.tenant.get.shapes;
};
