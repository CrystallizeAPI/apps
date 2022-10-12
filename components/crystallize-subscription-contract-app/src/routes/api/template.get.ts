import { ActionFunction, json } from '@remix-run/node';
import CrystallizeAPI from '~/core.server/use-cases/crystallize/index';

export const action: ActionFunction = async ({ request }) => {
    const api = await CrystallizeAPI(request);
    const config = await request.json();
    const template = await api.fetchSubscriptionContractTemplate(config);

    return json({ config, template });
};
