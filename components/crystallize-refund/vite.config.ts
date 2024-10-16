import { vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';
import { createRoutesFromFolders } from '@remix-run/v1-route-convention';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    server: {
        port: 3001
    },
    plugins: [
        remix({
            appDirectory: 'src',
            routes: async (defineRoutes) => createRoutesFromFolders(defineRoutes, { appDirectory: 'src' }),
        }),
        tsconfigPaths(),
    ],
});
