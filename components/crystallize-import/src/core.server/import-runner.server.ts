import { Bootstrapper, EVENT_NAMES, JsonSpec } from '@crystallize/import-utilities';
import { error } from 'ajv/dist/vocabularies/applicator/dependencies';

type Deps = {
    tenantIdentifier: string;
    sessionId: string | undefined;
    skipPublication?: boolean;
    verbose?: boolean;
};

type Item = {
    id: string;
    name: string;
    language: string;
    shape: {
        type: 'document' | 'folder' | 'product';
        identifier: string;
    };
};

type Subscriptons = {
    onItemCreated?: (item: Item) => Promise<void>;
    onItemUpdated?: (item: Item) => Promise<void>;
};

export const runImport = async (
    spec: JsonSpec,
    { onItemCreated, onItemUpdated }: Subscriptons,
    { tenantIdentifier, sessionId, skipPublication, verbose }: Deps,
) => {
    return new Promise((resolve) => {
        const errors: any = [];
        const bootstrapper = new Bootstrapper();
        if (verbose === true) {
            bootstrapper.config.logLevel = 'verbose';
        }
        if (sessionId) {
            bootstrapper.setSessionId(sessionId);
        } else {
            bootstrapper.setAccessToken(
                `${process.env.CRYSTALLIZE_ACCESS_TOKEN_ID}`,
                `${process.env.CRYSTALLIZE_ACCESS_TOKEN_SECRET}`,
            );
        }
        bootstrapper.setTenantIdentifier(tenantIdentifier);
        bootstrapper.setSpec(spec);

        if (skipPublication) {
            bootstrapper.config.skipPublication = true;
        }

        if (onItemCreated) {
            bootstrapper.on(EVENT_NAMES.ITEM_CREATED, (data) => onItemCreated(data).catch((err) => errors.push(err)));
        }
        if (onItemUpdated) {
            bootstrapper.on(EVENT_NAMES.ITEM_UPDATED, (data) => onItemUpdated(data).catch((err) => errors.push(err)));
        }

        bootstrapper.on(EVENT_NAMES.DONE, () => {
            bootstrapper.kill();
            if (errors.length > 0) {
                resolve({
                    success: false,
                    errors,
                });
            }
            resolve({
                success: true,
            });
        });
        bootstrapper.on(EVENT_NAMES.ERROR, (err: any) => {
            errors.push(err);
        });
        bootstrapper.start();
    });
};
