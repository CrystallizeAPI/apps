import jwt from 'jsonwebtoken';
import { CrystallizeSignature } from '@crystallize/js-api-client';
import { redirect } from '@remix-run/server-runtime';

export default (signatureJwt: string, host: string): CrystallizeSignature => {
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
