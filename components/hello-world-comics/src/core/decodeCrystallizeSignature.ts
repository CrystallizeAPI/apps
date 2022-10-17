import jwt from 'jsonwebtoken';
import { CrystallizeSignature } from '@crystallize/js-api-client';
import { redirect } from '@remix-run/server-runtime';

export default (signatureJwt: string): CrystallizeSignature => {
    const signingSecret = process.env.CRYSTALLIZE_SIGNING_SECRET;
    // this is a Demo App, we don't want to crash if the signing secret is not set
    // therefore, if that is not set, we don't check the signature

    // in most app CRYSTALLIZE_SIGNING_SECRET should be set
    try {
        if (!signingSecret) {
            return jwt.decode(signatureJwt) as CrystallizeSignature;
        }
        return jwt.verify(signatureJwt, signingSecret) as CrystallizeSignature;
    } catch (expection: any) {
        console.log('Invalid Crystallize Signature: ', expection.message);
        throw redirect('/invalid');
    }
};
