import { json, LoaderFunction, redirect } from '@remix-run/server-runtime';
import { createClient, CrystallizeSignature } from '@crystallize/js-api-client';
import { useLoaderData } from '@remix-run/react';
import fetchRandomComic from 'src/core/fetchRandomComic';
import { Image } from '@crystallize/reactjs-components';
import { Link } from 'react-router-dom';
import decodeCrystallizeSignature from 'src/core/decodeCrystallizeSignature';
import { commitSession, getSession } from 'src/session';

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
    const { initialSignature, comic } = useLoaderData();
    console.log(initialSignature, comic);
    return (
        <div className="container">
            <h1>{comic.name}</h1>
            <div className="image-wrapper">
                <Image {...comic.images} sizes="100vw" alt={comic.name} className="comic" />
            </div>
            <Link to={'/'}>Next comic</Link>
        </div>
    );
};
