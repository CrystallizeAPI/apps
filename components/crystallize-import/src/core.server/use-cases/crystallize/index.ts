import { Shape } from '@crystallize/schema';
import { requirePimAwareApiClient } from '~/core.server/auth.server';
import { fetchShapes } from './fetch-shapes';
import { fetchFolders } from './fetch-folders';
import { fetchValidationsSchema } from './fetch-validations-schema';
import { fetchFlows } from './fetch-flows';
import { PushItemToFlowItemArg, pushItemToFlow } from './push-item-to-flow';

export default async (request: Request) => {
    const apiClient = await requirePimAwareApiClient(request);
    return {
        apiClient,
        fetchShapes: () => fetchShapes({ apiClient }),
        fetchFolders: (shapes: Shape[]) => fetchFolders(shapes, { apiClient }),
        fetchValidationsSchema: () => fetchValidationsSchema({ apiClient }),
        fetchFlows: () => fetchFlows({ apiClient }),
        pushItemToFlow: (item: PushItemToFlowItemArg, stageId: string) => pushItemToFlow(item, stageId, { apiClient }),
    };
};
