import { catalogueFetcherGraphqlBuilder, ClientInterface, createCatalogueFetcher } from '@crystallize/js-api-client';

export default async (apiClient: ClientInterface) => {
    const fetcher = createCatalogueFetcher(apiClient);
    const builder = catalogueFetcherGraphqlBuilder;
    const data: any = await fetcher({
        catalogue: {
            __args: {
                path: '/',
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
    return data.catalogue.children.filter((product: any) => product.__typename === 'Product');
};
