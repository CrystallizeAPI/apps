import { createClient } from '@crystallize/js-api-client';
import { createTranslator } from './translator.server';
import { createAuthGuard } from './authentication.server';

import { createCookieSessionStorage, redirect } from '@remix-run/node';
import { getApi } from '~/use-cases/crystallize';

const AUTH_SESSION_NAME = 'crystallize-translation-app-auth-token';
const COOKIE_EXPIRES_IN = 5;

const { getSession, commitSession } = createCookieSessionStorage({
    cookie: {
        name: '__session',
        httpOnly: true,
        path: '/',
        sameSite: 'none',
        secrets: [`s3c${process.env.CRYSTALLIZE_SIGNATURE_SECRET}ret1`],
        secure: true,
    },
});

export const buildServices = async (request: Request) => {
    const guard = createAuthGuard({
        jwtSecret: `${process.env.JWT_SECRET}`,
        crystallizeSignatureSecret: `${process.env.CRYSTALLIZE_SIGNATURE_SECRET}`,
    });

    const session = await getSession(request.headers.get('Cookie'));
    if (!session.has(AUTH_SESSION_NAME)) {
        console.log('no auth session');
        const url = new URL(request.url);
        const signature = url.searchParams.get('crystallizeSignature') || '';
        if (!signature) {
            throw redirect('/invalid');
        }
        const payload = await guard.decodeCrystallizeSignature(signature);
        const host = request.headers.get('host') || url.host;
        const token = await guard.createCookieToken(
            {
                tenantId: payload.tenantId,
                tenantIdentifier: payload.tenantIdentifier,
                userId: payload.userId,
            },
            {
                expiresIn: COOKIE_EXPIRES_IN + 'd',
                audience: host,
                issuer: 'crystallize-translation-app',
                subject: 'crystallize-app',
            },
        );
        session.set(AUTH_SESSION_NAME, token);
        throw redirect(`/?${url.searchParams.toString()}`, {
            headers: {
                'Set-Cookie': await commitSession(session),
            },
        });
    }

    const auth = await guard.getAuthFromCookieToken(session.get(AUTH_SESSION_NAME));
    const debugOptions = {
        profiling: {
            onRequestResolved: (timings: any, query: any, variables: any) => {
                console.log('profiling', {
                    timings,
                    query,
                    variables,
                });
            },
        },
    };
    const profilingOptions = process.env.DEBUG_LEVEL ? debugOptions : {};
    const crystallizeClient = createClient(
        {
            tenantId: auth.tenantId,
            tenantIdentifier: auth.tenantIdentifier,
            accessTokenId: `${process.env.CRYSTALLIZE_ACCESS_TOKEN_ID}`,
            accessTokenSecret: `${process.env.CRYSTALLIZE_ACCESS_TOKEN_SECRET}`,
        },
        profilingOptions,
    );

    const translator = await createTranslator({
        apiKey: `${process.env.OPENAI_API_KEY}`,
    });

    return {
        apiClient: crystallizeClient,
        backendTranslator: translator,
        api: getApi(crystallizeClient),
    };
};
