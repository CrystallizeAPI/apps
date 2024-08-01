import { createClient } from '@crystallize/js-api-client';
import { createAuthGuard } from './authentication.server';
import { createCookieSessionStorage, redirect } from '@remix-run/node';
import { createGenerator } from './generator.server';

const AUTH_SESSION_NAME = 'crystallize-gen-ai-app-auth-token';
const COOKIE_EXPIRES_IN = 5;

const { getSession, commitSession } = createCookieSessionStorage({
    cookie: {
        name: '__session',
        httpOnly: true,
        path: '/',
        sameSite: 'none',
        secrets: [`s233c${process.env.CRYSTALLIZE_SIGNATURE_SECRET}ret21`],
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
                issuer: 'crystallize-gen-ai-app',
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
            onRequestResolved: (timings: unknown, query: unknown, variables: unknown) => {
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
    const generator = await createGenerator({
        apiKey: `${process.env.OPENAI_API_KEY}`,
    });

    return {
        auth,
        generator,
        apiClient: crystallizeClient,
    };
};
