import { EventEmitter } from 'events';

declare global {
    // eslint-disable-next-line no-var
    var __services: Awaited<ReturnType<typeof build>>;
}

export const buildServices = async () => {
    if (!global.__services) {
        global.__services = await build();
    }
    return global.__services;
};

const build = async () => {
    const emitter = new EventEmitter();
    return {
        emitter,
    };
};
