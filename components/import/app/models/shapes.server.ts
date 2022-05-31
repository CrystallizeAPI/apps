import { createClient } from '@crystallize/js-api-client';
import type { Shape, TenantQueryResponse } from '~/types';

export const getShapes = async (): Promise<Shape[]> => {
    const client = createClient({
        tenantIdentifier: 'brunost',
        accessTokenId: 'f8d30e69b3aa17518422',
        accessTokenSecret: '3694328c160d0fde7932f2c0caf52e4c25efc841',
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
            tenantIdentifier: 'brunost',
        },
    );

    return res.tenant.get.shapes;
};
