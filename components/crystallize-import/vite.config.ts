import { unstable_vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    server: {
        port: 3002,
    },
    plugins: [
        remix({
            appDirectory: './src',
        }),
        tsconfigPaths(),
    ],
});
