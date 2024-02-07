import { ClientInterface, CrystallizeSignature, createClient } from '@crystallize/js-api-client';
import { createCookieSessionStorage, redirect } from '@remix-run/node';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const { getSession, commitSession } = createCookieSessionStorage({
    cookie: {
        name: '__session',
        httpOnly: true,
        path: '/',
        sameSite: 'none',
        secrets: [crypto.createHash('md5').update(`${process.env.CRYSTALLIZE_SIGNING_SECRET}`).digest('hex')],
        secure: true,
    },
});

export const requireValidSession = async (request: Request) => {
    const url = new URL(request.url);
    const signature = url.searchParams.get('crystallizeSignature') || '';
    const signaturePayload: CrystallizeSignature | null =
        signature.length > 0 ? decodeCrystallizeSignature(signature, request.headers.get('Host')!) : null;
    const session = await getSession(request.headers.get('Cookie'));

    if (!session.has('signatureChecked') && !signaturePayload) {
        throw redirect('/invalid');
    }

    if (signaturePayload) {
        session.set('signatureChecked', signaturePayload);
        throw redirect('/', {
            headers: {
                'Set-Cookie': await commitSession(session),
            },
        });
    }

    // we necessarily have a signature payload at this point
    return session.get('signatureChecked') as CrystallizeSignature;
};

const decodeCrystallizeSignature = (signatureJwt: string, host: string): CrystallizeSignature => {
    try {
        // Verify the signature ONLY if we are not in a Crystallize ENV
        // There is no other way to do multi-tenancy Apps otherwise
        if (host.endsWith('.crystallize.com')) {
            return jwt.decode(signatureJwt) as unknown as CrystallizeSignature;
        }
        return jwt.verify(signatureJwt, `${process.env.CRYSTALLIZE_SIGNING_SECRET}`) as unknown as CrystallizeSignature;
    } catch (expection: any) {
        console.log('Invalid Crystallize Signature: ', expection.message);
        throw redirect('/invalid');
    }
};

export const getCookieValue = (request: Request, name: string): string | undefined => {
    const cookie = request.headers.get('Cookie') || '';
    const payload = cookie
        .split(';')
        .map((value: string): [string, string] => value.split('=') as [string, string])
        .reduce((memo: Record<string, any>, value: [string, string]) => {
            memo[decodeURIComponent(value[0]?.trim())] = decodeURIComponent(value[1]?.trim());
            return memo;
        }, {});

    return payload[name];
};
export const requirePimAwareApiClient = async (request: Request): Promise<ClientInterface> => {
    const signatureChecked = await requireValidSession(request);
    const host = request.headers.get('Host')!;
    // Verify the signature ONLY if we are not in a Crystallize ENV
    // There is no other way to do multi-tenancy Apps otherwise
    if (host.endsWith('.crystallize.com')) {
        return createClient({
            tenantId: signatureChecked.tenantId,
            tenantIdentifier: signatureChecked.tenantIdentifier,
            sessionId: getCookieValue(request, 'connect.sid'),
        });
    }

    return createClient({
        tenantId: signatureChecked.tenantId,
        tenantIdentifier: signatureChecked.tenantIdentifier,
        accessTokenId: `${process.env.CRYSTALLIZE_ACCESS_TOKEN_ID}`,
        accessTokenSecret: `${process.env.CRYSTALLIZE_ACCESS_TOKEN_SECRET}`,
    });
};
