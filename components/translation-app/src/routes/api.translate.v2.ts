import { type ActionFunction, json } from '@remix-run/node';
import { buildServices } from '~/core/services.server';

// Increase vercel serverless functions timeout
export const config = {
    maxDuration: 300,
};

export const action: ActionFunction = async ({ request }) => {
    const body = await request.json();
    const { backendTranslator } = await buildServices(request);
    const translation = await backendTranslator.translate(body);
    return json({ translation });
};
