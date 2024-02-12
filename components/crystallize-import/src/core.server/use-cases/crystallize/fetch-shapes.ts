import { ClientInterface } from '@crystallize/js-api-client';
import { getManyShapesQuery } from '@crystallize/import-export-sdk';
import { Shape } from '@crystallize/schema';

type Deps = {
    apiClient: ClientInterface;
};

export const fetchShapes = async ({ apiClient }: Deps): Promise<Shape[]> => {
    if (!apiClient.config.tenantId) {
        throw new Error('tenantId not set on the ClientInterface.');
    }
    const getManyShapes = getManyShapesQuery({ tenantId: apiClient.config.tenantId }, { includeComponents: true });
    return await apiClient.pimApi(getManyShapes.query, getManyShapes.variables).then((res) => res?.shape?.getMany);
};
