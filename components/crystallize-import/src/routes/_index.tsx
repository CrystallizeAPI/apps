import { json, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import CrystallizeAPI from '~/core.server/use-cases/crystallize';
import { ImportContextProvider } from '~/ui/import/provider';
import { State } from '~/contracts/ui-types';
import { App } from '~/ui/import/App';

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const api = await CrystallizeAPI(request);
    try {
        const shapes = await api.fetchShapes();
        const [folders, flows] = await Promise.all([api.fetchFolders(shapes), api.fetchFlows()]);
        return json({
            shapes,
            flows,
            folders,
        });
    } catch (err) {
        console.error(err);
        return json({ shapes: [], folders: [], flows: [] });
    }
};

export default function Index() {
    const { shapes, folders, flows } = useLoaderData<typeof loader>();
    const initialState: State = {
        shapes,
        folders,
        flows,
        selectedShape: shapes[0],
        selectedFolder: folders[0],
        headers: [],
        attributes: [],
        rows: [],
        mapping: {},
    };

    if (!shapes || !folders) {
        return (
            <div className="empty-screen">
                <span className="loader"></span>
            </div>
        );
    }

    return (
        <ImportContextProvider initialState={initialState}>
            <App />
        </ImportContextProvider>
    );
}
