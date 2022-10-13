import { ClientInterface } from '@crystallize/js-api-client';
import { getManyShapesQuery } from '@crystallize/import-export-sdk/shape';
import { Shape } from '@crystallize/schema/shape';

export default async (apiClient: ClientInterface): Promise<Shape[]> => {
    if (!apiClient.config.tenantId) {
        throw new Error('tenantId not set');
    }

    const { query, variables } = getManyShapesQuery({
        tenantId: apiClient.config.tenantId,
    });
    return apiClient.pimApi(query, variables).then((res) => res?.shape?.getMany);
};
