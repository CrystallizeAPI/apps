import { CrystallizeSignature } from '@crystallize/js-api-client';
import { createCookieSessionStorage, redirect } from '@remix-run/node';
import crypto from 'crypto';
import decodeCrystallizeSignature from './decodeCrystallizeSignature';

const { getSession, commitSession, destroySession } = createCookieSessionStorage({
    cookie: {
        name: '__session',
        httpOnly: true,
        path: '/',
        sameSite: 'none',
        secrets: [crypto.createHash('md5').update(`${process.env.CRYSTALLIZE_SIGNING_SECRET}`).digest('hex')],
        secure: true,
    },
});

export { getSession, commitSession, destroySession };

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
