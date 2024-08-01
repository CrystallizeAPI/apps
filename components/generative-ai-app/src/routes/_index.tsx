import { ActionFunctionArgs, LoaderFunctionArgs, json, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { buildServices } from '~/core/services.server';
import { getComponentList } from '~/use-cases/get-component-list.server';
import { GenComponentForm } from '~/ui/components/gen-component-form';
import { generateContentForComponent } from '~/use-cases/generate-content-for-component.server';
import { useEffect } from 'react';
import { signal } from '@crystallize/app-signal';

export const action = async ({ request }: ActionFunctionArgs) => {
    const { generator, apiClient } = await buildServices(request);
    const url = new URL(request.url);
    const itemId = url.searchParams.get('itemId');
    const variantId = url.searchParams.get('variantId') || undefined;
    const language = url.searchParams.get('language') || 'en';
    const formData = await request.formData();
    const prompt = formData.get('prompt') as string;
    const componentId = formData.get('componentId') as string;
    if (!itemId) {
        return redirect('/missing-item');
    }
    const result = await generateContentForComponent(
        { componentId, prompt, itemId, variantId, language },
        { generator, apiClient },
    );
    return json(result);
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const { apiClient } = await buildServices(request);
    const url = new URL(request.url);
    const itemId = url.searchParams.get('itemId');
    const language = url.searchParams.get('language') || 'en';
    const variantId = url.searchParams.get('variantId') || undefined;
    if (!itemId) {
        return redirect('/missing-item');
    }
    const { components } = await getComponentList(
        {
            itemId,
            language,
            variantId,
            sku: undefined,
        },
        { apiClient },
    );

    return json({
        itemId,
        language,
        components,
    });
};

export default function Index() {
    const { components } = useLoaderData<typeof loader>();
    useEffect(() => {
        signal.send('ready');
    }, []);
    return (
        <div className="bg-gray-50">
            <div className="min-h-[100vh] pb-24 max-w-[1200px] mx-auto px-8">
                {components.map((component) => (
                    <GenComponentForm key={component.componentId} component={component} />
                ))}
            </div>
        </div>
    );
}
