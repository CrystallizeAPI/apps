import { Bootstrapper, EVENT_NAMES, JsonSpec } from '@crystallize/import-utilities';
import { EventEmitter } from 'events';
import util from 'util';

export const dump = (obj: any, depth?: number) => {
    console.log(util.inspect(obj, false, depth, true));
};

type Deps = {
    emitter: EventEmitter;
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
    importUuid: string,
    spec: JsonSpec,
    { onItemCreated, onItemUpdated }: Subscriptons,
    { tenantIdentifier, sessionId, skipPublication, verbose, emitter }: Deps,
) => {
    // dump({ spec }, 200);
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
            bootstrapper.on(EVENT_NAMES.ITEM_CREATED, (data) => {
                emitter.emit(importUuid, {
                    event: 'item-created',
                    data,
                });
                onItemCreated(data).catch((err) => {
                    console.error('onItemCreated error', err);
                    errors.push(err);
                });
            });
        }
        if (onItemUpdated) {
            bootstrapper.on(EVENT_NAMES.ITEM_UPDATED, (data) => {
                emitter.emit(importUuid, {
                    event: 'item-updated',
                    data,
                });
                onItemUpdated(data).catch((err) => {
                    console.error('onItemUpdated error', err);
                    errors.push(err);
                });
            });
        }

        bootstrapper.on(EVENT_NAMES.DONE, () => {
            emitter.emit(importUuid, { event: 'done' });
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
            emitter.emit(importUuid, {
                event: 'item-error',
                data: err,
            });
            errors.push(err);
        });
        emitter.emit(importUuid, { event: 'started' });
        bootstrapper.start();
    });
};
