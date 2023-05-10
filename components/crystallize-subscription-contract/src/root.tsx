import type { MetaFunction } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import type { LinksFunction } from '@remix-run/node';
import stylesheet from '../styles/app.css';
import designSystemStyles from '@crystallize/design-system/styles.css';

export const meta: MetaFunction = () => ({
    charset: 'utf-8',
    title: 'Crystallize Subscription Contract App',
    viewport: 'width=device-width,initial-scale=1',
});

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: stylesheet },
    { rel: 'stylesheet', href: designSystemStyles },
];

export default function App() {
    return (
        <html lang="en">
            <head>
                <Meta />
                <Links />
            </head>
            <body>
                <div className="pt-6 bg-gray-50">
                    <div className="container mx-auto">
                        <Outlet />
                    </div>
                </div>

                <ScrollRestoration />
                <Scripts />
                <LiveReload port={443} />
            </body>
        </html>
    );
}
