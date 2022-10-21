import { createClient } from '@crystallize/js-api-client';
import { Item } from '@crystallize/schema/item';
import { Shape } from '@crystallize/schema/shape';
import { requireValidSession } from '~/core.server/session';
import fetchTenantShapesAndFolders from './fetchTenantShapesAndFolders';

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
        fetchTenantShapesAndFolders: (): Promise<{ shapes: Shape[]; folders: Item[] }> =>
            fetchTenantShapesAndFolders(apiClient),
    };
};
