import type { LoaderFunctionArgs } from '@remix-run/node';
import { eventStream } from 'remix-utils/sse/server';
import { buildServices } from '~/core.server/services.server';

export async function loader({ request, params }: LoaderFunctionArgs) {
    const { emitter } = await buildServices();

    return eventStream(request.signal, (send) => {
        const handler = (data: any) => {
            send({ event: 'log', data: JSON.stringify(data) });
        };
        emitter.addListener(params.id!, handler);
        send({ event: 'init', data: 'Started' });
        const interval = setInterval(() => {
            send({ event: 'ping', data: 'pong' });
        }, 10000);
        return function clear() {
            emitter.removeListener(params.id!, handler);
            clearInterval(interval);
        };
    });
}
