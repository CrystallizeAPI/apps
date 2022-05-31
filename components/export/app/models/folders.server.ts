import { createClient } from '@crystallize/js-api-client';
import type { Folder, FolderQueryResponse } from '~/types';

const { CRYSTALLIZE_TENANT_IDENTIFIER } = process.env;

export const getFolders = async (): Promise<Folder[]> => {
    if (!CRYSTALLIZE_TENANT_IDENTIFIER) {
        throw new Error('Crystallize environment vars must be set');
    }

    const client = createClient({
        tenantIdentifier: CRYSTALLIZE_TENANT_IDENTIFIER,
    }).searchApi;

    const res: FolderQueryResponse = await client(
        `
          query {
              search(first: 100, filter: { type: FOLDER }) {
                edges {
                  node {
                    name
                    path
                  }
                }
              }
          }
      `,
        {
            tenantIdentifier: CRYSTALLIZE_TENANT_IDENTIFIER,
        },
    );

    const folders: Folder[] = [
        {
            name: 'Root',
            path: '/',
        },
    ];
    return folders.concat(res.search.edges.map(({ node }) => node));
};
