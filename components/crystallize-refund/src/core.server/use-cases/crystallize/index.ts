import { createClient, Order } from '@crystallize/js-api-client';
import { requireValidSession } from 'src/core.server/session';
import { fetchAll as fetchAllOrders, fetchById as fetchOrderById } from './fetchOrders';
import pushCreditNote from './pushCreditNote';

export default async (request: Request) => {
    const signatureChecked = await requireValidSession(request);
    const cookie = request.headers.get('Cookie') || '';
    const cookiePayload = cookie
        .split(';')
        .map((value: string): [string, string] => value.split('=') as [string, string])
        .reduce((memo: Record<string, any>, value: [string, string]) => {
            memo[decodeURIComponent(value[0]?.trim())] = decodeURIComponent(value[1]?.trim());
            return memo;
        }, {});

    const apiClient = createClient({
        tenantId: signatureChecked.tenantId,
        tenantIdentifier: signatureChecked.tenantIdentifier,
        sessionId: cookiePayload['connect.sid'],
    });

    return {
        fetchAllOrders: () => fetchAllOrders(apiClient),
        fetchOrderById: (orderId: string) => fetchOrderById(apiClient, orderId),
        pushCreditNote: (order: Order, refunds: Record<string, string>) => pushCreditNote(apiClient, order, refunds),
    };
};
