import type { CodegenConfig } from '@graphql-codegen/cli';

const tokenId = process.env.CRYSTALLIZE_ACCESS_TOKEN_ID;
const tokenSecret = process.env.CRYSTALLIZE_ACCESS_TOKEN_SECRET;

if (!tokenId || !tokenSecret) {
    throw new Error('Missing env variable(s) when generating api legacy schemas');
}

const config: CodegenConfig = {
    overwrite: true,
    schema: [
        {
            [`https://pim.crystallize.com/graphql`]: {
                headers: {
                    'X-Crystallize-Access-Token-Id': tokenId,
                    'X-Crystallize-Access-Token-Secret': tokenSecret,
                },
            },
        },
    ],
    generates: {
        './src/__generated__/types.ts': {
            plugins: ['typescript'],
            config: {
                preResolveTypes: false,
            },
        },
    },
};

export default config;
