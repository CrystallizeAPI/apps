import { ClientInterface } from '@crystallize/js-api-client';

type Deps = {
    apiClient: ClientInterface;
};

export const fetchFlows = async ({
    apiClient,
}: Deps): Promise<
    {
        name: string;
        identifier: string;
        stages: Record<string, string>;
        shapeRestrictions: string[];
    }[]
> => {
    if (!apiClient.config.tenantId) {
        throw new Error('tenantId not set on the ClientInterface.');
    }

    const query = `#graphql
        query {
            flows(first: 100) {
                ... on FlowConnection {
                    edges {
                        node {
                        name
                        identifier
                        stages {
                            identifier
                            name
                        }
                        restrictions {
                            ... on ItemFlowRestrictions {
                                acceptedShapeIdentifiers
                            }
                        }
                    }
                }
            }
        }
    }`;
    const res = await apiClient.nextPimApi(query);
    return res?.flows?.edges.map((edge: any) => {
        return {
            name: edge.node.name,
            identifier: edge.node.identifier,
            stages: edge.node.stages.reduce((acc: Record<string, string>, stage: any) => {
                acc[stage.identifier] = stage.name;
                return acc;
            }, {}),
            shapeRestrictions: edge.node.restrictions?.acceptedShapeIdentifiers ?? [],
        };
    });
};
