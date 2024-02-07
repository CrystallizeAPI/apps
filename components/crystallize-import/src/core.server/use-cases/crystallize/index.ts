import { Item } from '@crystallize/schema';
import { Shape } from '@crystallize/schema';
import { requirePimAwareApiClient } from '~/core.server/auth.server';
import fetchTenantShapesAndFolders from './fetchTenantShapesAndFolders';

export default async (request: Request) => {
    const apiClient = await requirePimAwareApiClient(request);
    return {
        fetchTenantShapesAndFolders: (): Promise<{ shapes: Shape[]; folders: Item[] }> =>
            fetchTenantShapesAndFolders(apiClient),
    };
};
