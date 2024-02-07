import { Bootstrapper, EVENT_NAMES, JsonSpec } from '@crystallize/import-utilities';

export const runImport = async (
    spec: JsonSpec,
    {
        tenantIdentifier,
        sessionId,
    }: {
        tenantIdentifier: string;
        sessionId: string | undefined;
    },
) => {
    return new Promise((resolve, reject) => {
        const bootstrapper = new Bootstrapper();
        bootstrapper.config.logLevel = 'verbose';
        if (sessionId) {
            bootstrapper.setSessionId(sessionId);
        } else {
            bootstrapper.setAccessToken(
                `${process.env.CRYSTALLIZE_ACCESS_TOKEN}`,
                `${process.env.CRYSTALLIZE_ACCESS_TOKEN_SECRET}`,
            );
        }
        bootstrapper.setTenantIdentifier(tenantIdentifier);
        bootstrapper.setSpec(spec);

        bootstrapper.on(EVENT_NAMES.DONE, () => {
            bootstrapper.kill();
            resolve(null);
        });
        bootstrapper.on(EVENT_NAMES.ERROR, (err: any) => reject(err));
        bootstrapper.start();
    });
};
