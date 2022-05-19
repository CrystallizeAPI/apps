import { GraphQLClient } from 'graphql-request';

export const getClient = (): GraphQLClient => {
    const { CRYSTALLIZE_ACCESS_TOKEN_ID, CRYSTALLIZE_ACCESS_TOKEN_SECRET } = process.env;

    return new GraphQLClient('https://pim.crystallize.com/graphql', {
        headers: {
            'X-Crystallize-Access-Token-Id': CRYSTALLIZE_ACCESS_TOKEN_ID,
            'X-Crystallize-Access-Token-Secret': CRYSTALLIZE_ACCESS_TOKEN_SECRET,
        } as HeadersInit,
    });
};
