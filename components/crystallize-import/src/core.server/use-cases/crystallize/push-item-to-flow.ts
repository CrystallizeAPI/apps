import { ClientInterface } from '@crystallize/js-api-client';

type Deps = {
    apiClient: ClientInterface;
};

export type PushItemToFlowItemArg = {
    id: string;
    language: string;
    version: 'published' | 'draft';
};
export const pushItemToFlow = async (
    { id, language = 'en', version = 'published' }: PushItemToFlowItemArg,
    stage: string,
    { apiClient }: Deps,
): Promise<void> => {
    const query = `#graphql
        mutation ADD_TO_STAGE($itemId: ID!, $language: String!, $version: VersionLabel!, $stage: String!) {
            addItemFlowStage(itemId: $itemId, language: $language, version: $version, stage: $stage) {
                ... on FlowStageContent {
                    id
                }
                ... on BasicError {
                    error: message
                }
            }
        }
    `;
    const res = await apiClient.nextPimApi(query, {
        itemId: id,
        language,
        version,
        stage,
    });

    if (!res?.addItemFlowStage?.id) {
        throw new Error(
            res?.addItemFlowStage?.error || `Failed to add item to flow ${id}-${language}-${version} to stage ${stage}`,
        );
    }
};
