import { ClientInterface, createSubscriptionContractManager } from '@crystallize/js-api-client';
import { jsonToGraphQLQuery } from 'json-to-graphql-query';

export default async (apiClient: ClientInterface, config: any) => {
    const contractManager = createSubscriptionContractManager(apiClient);
    const planQuery = {
        subscriptionPlan: {
            get: {
                __args: {
                    tenantId: apiClient.config.tenantId,
                    identifier: config.planIdentifier,
                },
                periods: {
                    id: true,
                    initial: {
                        period: true,
                        unit: true,
                    },
                    recurring: {
                        period: true,
                        unit: true,
                    },
                },
                meteredVariables: {
                    id: true,
                    identifier: true,
                    name: true,
                    unit: true,
                },
            },
        },
    };

    const [planResult, template] = await Promise.all([
        apiClient.pimApi(jsonToGraphQLQuery({ query: planQuery })),
        contractManager.createSubscriptionContractTemplateBasedOnVariantIdentity(
            config.productPath,
            { id: config.variantId },
            config.planIdentifier,
            config.periodId,
            config.priceVariant,
            'en',
        ),
    ]);

    const plan = planResult.subscriptionPlan.get;
    const period = plan.periods.filter((p: any) => p.id === config.periodId)[0];

    const definition: Record<string, any> = plan.meteredVariables.reduce((accumulator: any, variable: any) => {
        accumulator[variable.id] = variable;
        return accumulator;
    }, {});

    const initial = !template.initial
        ? {}
        : {
              ...template.initial,
              ...period.initial,
              meteredVariables: template.initial?.meteredVariables.map((variable: any) => {
                  return {
                      ...variable,
                      tierType: variable.tierType.value, // should be in the lib
                      ...definition[variable.id],
                  };
              }),
          };
    const recurring = !template.recurring
        ? {}
        : {
              ...template.recurring,
              ...period.recurring,
              meteredVariables: template.recurring?.meteredVariables.map((variable: any) => {
                  return {
                      ...variable,
                      tierType: variable.tierType.value, // should be in the lib
                      ...definition[variable.id],
                  };
              }),
          };

    return {
        ...template,
        initial,
        recurring,
    };
};
