import type { LinksFunction, MetaFunction } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';

import datagridStyles from '../node_modules/react-datasheet-grid/dist/style.css';
import styles from '~/styles/app.css';

export const links: LinksFunction = () => {
    return [
        {
            rel: 'stylesheet',
            href: datagridStyles,
        },
        {
            rel: 'stylesheet',
            href: styles,
        },
    ];
};

export const meta: MetaFunction = () => ({
    charset: 'utf-8',
    title: 'Import | Crystallize ',
    viewport: 'width=device-width,initial-scale=1',
});

export default function App() {
    return (
        <html lang="en">
            <head>
                <Meta />
                <Links />
            </head>
            <body>
                <Outlet />
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}
