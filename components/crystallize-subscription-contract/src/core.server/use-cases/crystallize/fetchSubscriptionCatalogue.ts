import { catalogueFetcherGraphqlBuilder, ClientInterface, createCatalogueFetcher, createClient } from '@crystallize/js-api-client';

export default async (apiClient: ClientInterface) => {
    const fetcher = createCatalogueFetcher(apiClient);
    const builder = catalogueFetcherGraphqlBuilder;
    const genericPathToTest = ['/', '/subscriptions'];
    let children = []
    for (const path of genericPathToTest) {
        const data: any = await fetcher({
            catalogue: {
                __args: {
                    path,
                    language: 'en',
                },
                children: {
                    __on: [
                        builder.onProduct(
                            {
                                name: true,
                                id: true,
                                path: true,
                            },
                            {
                                onVariant: {
                                    id: true,
                                    name: true,
                                    sku: true,
                                    ...builder.onSubscriptionPlan({
                                        onPeriod: (name: string) => {
                                            return {
                                                period: true,
                                                unit: true,
                                            };
                                        },
                                    }),
                                },
                            },
                        ),
                    ],
                },
            },
        });
        children = data.catalogue?.children?.filter((product: any) => product.__typename === 'Product') ?? [];

        if (children.length > 1) {
            return children;
        }
    }
    return children
};
