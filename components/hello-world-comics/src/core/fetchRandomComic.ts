import { catalogueFetcherGraphqlBuilder, ClientInterface, createCatalogueFetcher, createSearcher } from "@crystallize/js-api-client";

export default async (client: ClientInterface) => {
    const totalResults: any = await client.searchApi(`query {
        search( first: 1, filter: { type: DOCUMENT, include: { paths: "/comics" } } ) {
          aggregations {
            totalResults
          }
        }
      }
    `);
    const total = totalResults.search.aggregations.totalResults;
    const randomCursor = Math.floor(Math.random() * total - 1);
    const base = Buffer.from(randomCursor.toString()).toString('base64');

    const search = createSearcher(client).search;
    const comicPathResults = (await search('en', {
        name: true,
        path: true
    }, {
        //@ts-ignore
        type: 'DOCUMENT',
        include: {
            paths: '/comics'
        }
    }, undefined, undefined, {
        perPage: 1,
        total: 1
    }, {
        after: base
    }).next()).value;

    const fetcher = createCatalogueFetcher(client);
    const builder = catalogueFetcherGraphqlBuilder;
    const comic: any = await fetcher({
        catalogue: {
            __args: {
                path: comicPathResults.path,
                language: 'en'
            },
            id: true,
            name: true,
            ...builder.onComponent('stripe', 'Image', {
                images: {
                    url: true,
                    variants: {
                        url: true,
                        width: true,
                        height: true
                    }
                }
            })
        }
    });
    return {
        name: comic.catalogue.name,
        images: comic.catalogue.stripe.content.images[0]
    }
}

