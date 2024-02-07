import { type ActionFunctionArgs, json } from '@remix-run/node';
import { getCookieValue, requireValidSession } from '~/core.server/auth.server';
import { runImport } from '~/core.server/import-runner.server';
import { specFromFormSubmission } from '~/core.server/spec-from-form-submission.server';

export const action = async ({ request }: ActionFunctionArgs) => {
    if (request.method !== 'POST') {
        return json({ message: 'Method not allowed' }, 405);
    }
    const { tenantIdentifier } = await requireValidSession(request);
    const spec = await specFromFormSubmission(await request.json());

    try {
        await runImport(spec, {
            tenantIdentifier,
            sessionId: getCookieValue(request, 'connect.sid'),
        });
    } catch (err: any) {
        console.error(err);
        return json({ message: err.error }, 500);
    }
    return json({ message: 'done' }, 200);
};
