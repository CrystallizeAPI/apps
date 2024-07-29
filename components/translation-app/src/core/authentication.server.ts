import type { CrystallizeSignature } from '@crystallize/js-api-client';
import { type JWTPayload, SignJWT, jwtVerify } from 'jose';

interface JWTOptions {
    expiresIn: string;
    audience: string;
    subject: string;
    issuer: string;
}

type Deps = {
    jwtSecret: string;
    crystallizeSignatureSecret: string;
};

type Auth = {
    userId: string;
    tenantId: string;
    tenantIdentifier: string;
};

export const createAuthGuard = ({ jwtSecret, crystallizeSignatureSecret }: Deps) => {
    const decodeCrystallizeSignature = async (signature: string): Promise<CrystallizeSignature> => {
        const payload = (await jwtVerify(signature, new TextEncoder().encode(crystallizeSignatureSecret)))
            .payload as CrystallizeSignature;
        // we don't need to check the HMAC here, as there is no body in URL requests
        return payload;
    };
    const createCookieToken = async (
        payload: Pick<CrystallizeSignature, 'tenantId' | 'tenantIdentifier' | 'userId'>,
        { expiresIn, audience, issuer, subject }: JWTOptions,
    ): Promise<string> => {
        const token = await new SignJWT({
            ...payload,
            iss: issuer,
            sub: subject,
            aud: audience,
        })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime(expiresIn)
            .sign(new TextEncoder().encode(jwtSecret));
        return token;
    };

    const getAuthFromCookieToken = async (token: string): Promise<Auth> => {
        const decoded = await decodeToken(token);
        return {
            userId: decoded.userId,
            tenantId: decoded.tenantId,
            tenantIdentifier: decoded.tenantIdentifier,
        } as Auth;
    };

    const decodeToken = async (token: string): Promise<Omit<JWTPayload, 'aud'> & { aud: string }> => {
        return (await jwtVerify(token, new TextEncoder().encode(jwtSecret))).payload as Omit<JWTPayload, 'aud'> & {
            aud: string;
        };
    };

    return {
        decodeCrystallizeSignature,
        createCookieToken,
        getAuthFromCookieToken,
    };
};
