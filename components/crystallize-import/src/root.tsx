import type { MetaFunction } from '@remix-run/node';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import '../node_modules/react-datasheet-grid/dist/style.css';
import '~/styles/app.css';

export const meta: MetaFunction = () => [
    {
        charset: 'utf-8',
        title: 'Import | Crystallize ',
        viewport: 'width=device-width,initial-scale=1',
    },
];

export default function App() {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <Meta />
                <Links />
            </head>
            <body>
                <Outlet />
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}
