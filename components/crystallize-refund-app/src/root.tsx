import type { MetaFunction } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import { RiRefund2Line } from 'react-icons/ri';

import styles from './styles/app.css';
export const meta: MetaFunction = () => ({
    charset: 'utf-8',
    title: 'Crystallize Refund App',
    viewport: 'width=device-width,initial-scale=1',
});

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
                        <RiRefund2Line className="r-icon" />
                        Refund App
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
