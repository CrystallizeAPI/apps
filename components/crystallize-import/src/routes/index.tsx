import { json, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useState } from 'react';

import CrystallizeAPI from '~/core.server/use-cases/crystallize';
import { ImportContextProvider } from '~/core/import/provider';
import { State } from '~/core/import/types';
import { App } from '~/core/import/App';

export const loader: LoaderFunction = async ({ request }) => {
    const api = await CrystallizeAPI(request);
    try {
        const { shapes, folders } = await api.fetchTenantShapesAndFolders();
        return json({
            shapes,
            folders,
        });
    } catch (err) {
        console.error(err);
        return json({ shapes: [], folders: [] });
    }
};

export default function Index() {
    const { shapes, folders } = useLoaderData();
    const initialState: State = {
        shapes,
        folders,
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
