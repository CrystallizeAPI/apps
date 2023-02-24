import { json, LoaderFunction, redirect } from '@remix-run/server-runtime';
import { createClient, CrystallizeSignature } from '@crystallize/js-api-client';
import { useLoaderData } from '@remix-run/react';
import fetchRandomComic from 'src/core/fetchRandomComic';
import { Image } from '@crystallize/reactjs-components';
import { Link } from 'react-router-dom';
import decodeCrystallizeSignature from 'src/core/decodeCrystallizeSignature';
import { commitSession, getSession } from 'src/session';
import { ActionMenu, Avatar, Button, Card, Dialog } from '@crystallize/design-system';
import { signal, NavigateTo } from '@crystallize/app-signal';
import { useEffect } from 'react';
import { ClientOnly } from '@crystallize/reactjs-hooks';

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
    }, [signal]);

    const destination: NavigateTo = {
        area: 'grid',
        id: '12345'
    };
    return (
        <>

            <Avatar
                name="Hello World"
                size="2xl"
                className='avatar'
            />
            <h1>
                Hello World App - Using Design System
            </h1>

            <div className="app-toolbar">
                <Dialog>
                    <Dialog.Trigger asChild>
                        <Button intent={'action'}>Open dialog</Button>
                    </Dialog.Trigger>
                    <Dialog.Content>
                        <Dialog.Title>This is an Dialog example</Dialog.Title>
                        <Dialog.Description>With a fancy toolbar menu</Dialog.Description>
                        <div className="flex items-center justify-between">
                            Here will go the main content
                            <ActionMenu>
                                <ActionMenu.Item onSelect={() => console.warn('Download')}>Download</ActionMenu.Item>
                                <ActionMenu.Item className="danger" onSelect={() => console.warn('Delete')}>
                                    Delete
                                </ActionMenu.Item>
                            </ActionMenu>
                        </div>
                    </Dialog.Content>
                </Dialog>
                <div className='button-group'>
                    <Button intent={'danger'} onClick={async () => { await signal.toggleAreaMenu(false); }}>Toggle Area Menu Off</Button>
                    <br />
                    <Button onClick={async () => { await signal.toggleAreaMenu(true); }}>Toggle Area Menu On</Button>
                </div>

                <div className='button-group'>
                    <Button onClick={async () => { await signal.changeLanguage('en'); }}>Change language to en</Button>
                    <br />
                    <Button onClick={async () => { await signal.changeLanguage('fr-fr'); }}>Change language to fr</Button>
                </div>
                <div className='button-group'>
                    <Button intent='action' onClick={async () => { await signal.navigateTo(destination) }}>Button to Grid</Button>
                    <ClientOnly>
                        <a className={'c-btn c-btn-sm c-btn-action'} href={signal.getUrl(destination)} onClick={(event) => {
                            // Stop if the user wants to open in a new tab
                            if (!(event.metaKey || event.ctrlKey)) {
                                event.preventDefault();
                                signal.navigateTo(destination);
                            }
                        }}>
                            Link to Grid
                        </a>
                    </ClientOnly>
                </div>
            </div>

            <div className="app-container">
                <Card>
                    <h2>{comic.name}</h2>
                </Card>
                <div className="image-wrapper">
                    <Image {...comic.images} sizes="100vw" alt={comic.name} className="comic" />
                </div>
                <Link to={'/'}>Next comic</Link>
            </div>
        </>
    );
};
