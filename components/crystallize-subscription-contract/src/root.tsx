import type { MetaFunction } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import { FaFileSignature } from 'react-icons/fa';

export const meta: MetaFunction = () => ({
    charset: 'utf-8',
    title: 'Crystallize Subscription Contract App',
    viewport: 'width=device-width,initial-scale=1',
});

import styles from './styles/app.css';

export function links() {
    return [
        {
            rel: 'stylesheet',
            href: styles,
        },
    ];
}

export default function App() {
    return (
        <html lang="en">
            <head>
                <Meta />
                <Links />
            </head>
            <body>
                <div className="container">
                    <h1>
                        <FaFileSignature className="r-icon" />
                        Subscription Contract App
                    </h1>
                    <Outlet />
                </div>
                <ScrollRestoration />
                <Scripts />
                <LiveReload port={443} />
            </body>
        </html>
    );
}
