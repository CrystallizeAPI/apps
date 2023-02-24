import type { MetaFunction } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import styles from './styles.css';
import CrystallizeDesignSystem from '@crystallize/design-system/styles.css';

export const meta: MetaFunction = () => ({
    charset: 'utf-8',
    title: 'Random Crystallize comic',
    viewport: 'width=device-width,initial-scale=1',
});

export function links() {
    return [
        { rel: 'stylesheet', href: CrystallizeDesignSystem },
        { rel: 'stylesheet', href: styles },
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
                <Outlet />
                <ScrollRestoration />
                <Scripts />
                <LiveReload port={443} />
            </body>
        </html>
    );
}
