import { json, LoaderFunction, redirect } from '@remix-run/server-runtime';
import { createClient, CrystallizeSignature } from '@crystallize/js-api-client';
import { useLoaderData } from '@remix-run/react';
import fetchRandomComic from 'src/core/fetchRandomComic';
import { Image } from '@crystallize/reactjs-components';
import { Link } from 'react-router-dom';
import decodeCrystallizeSignature from 'src/core/decodeCrystallizeSignature';
import { commitSession, getSession } from 'src/session';
import { NavigateTo, signal } from '@crystallize/app-signal';
import { useEffect } from 'react';

export const loader: LoaderFunction = async ({ request }) => {
    try {
        const url = new URL(request.url);
        const signature = url.searchParams.get('crystallizeSignature') || '';
        const signaturePayload: CrystallizeSignature | null =
            signature.length > 0 ? decodeCrystallizeSignature(signature) : null;
        const session = await getSession(request.headers.get('Cookie'));

        if (!session.has('signatureChecked') && !signaturePayload) {
            return redirect('/invalid');
        }

        if (signaturePayload) {
            session.set('signatureChecked', signaturePayload);
            return redirect('/', {
                headers: {
                    'Set-Cookie': await commitSession(session),
                },
            });
        }

        // we necessarily have a signature payload at this point
        const signatureChecked = session.get('signatureChecked') as CrystallizeSignature;

        // this app just fetch a random comic from the public api
        // no auth required
        const client = createClient({
            tenantIdentifier: 'crystallize_marketing',
        });
        const comic = await fetchRandomComic(client);

        return json({ comic, initialSignature: signatureChecked });
    } catch (error) {
        console.log(error);
        throw redirect('/invalid');
    }
};

export default () => {
    const { comic } = useLoaderData();

    useEffect(() => {
        document.addEventListener('DOMContentLoaded', () => signal.send('ready'));
    });

    // @todo: coming soon
    // const destination: NavigateTo = {
    //     area: 'grid',
    //     id: '12345'
    // };
    return (
        <>
            <h1>Hello World App</h1>
            <div className="toolbar">
                <button onClick={async () => await signal.toggleAreaMenu()}> Toggle Menu </button>
                <button onClick={async () => await signal.changeLanguage('fr-fr')}> Change language to NO </button>

                {/* <a href={signal.getUrl(destination)} onClick={(event) => {
                    // Stop if the user wants to open in a new tab
                    if (!(2 === event.which || event.metaKey || event.ctrlKey)) {
                        event.preventDefault();
                        signal.navigateTo(destination);
                    }
                }}>
                    Go to Grid 123
                </a> */}
            </div>
            <div className="container">
                <h2>{comic.name}</h2>
                <div className="image-wrapper">
                    <Image {...comic.images} sizes="100vw" alt={comic.name} className="comic" />
                </div>
                <Link to={'/'}>Next comic</Link>
            </div>
        </>
    );
};
