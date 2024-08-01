import { useFetcher, useLoaderData } from '@remix-run/react';
import type { Component, ContentChunkContent, ComponentChoiceContent } from '~/__generated__/types';
import TextareaAutosize from 'react-textarea-autosize';
import { allowedTypes } from '~/contracts/allowed-components';
import { SerializeFrom } from '@remix-run/node';
import { signal } from '@crystallize/app-signal';
import { useEffect } from 'react';
import { action } from '~/routes/_index';

export const colorMap = [
    { bg: 'bg-s-purple-100', text: 'text-s-purple-500' },
    { bg: 'bg-s-green-100', text: 'text-s-green-600' },
    { bg: 'bg-s-blue-100', text: 'text-s-blue-500' },
    { bg: 'bg-green-100', text: 'text-green-500' },
    { bg: 'bg-s-orange-100', text: 'text-s-orange-500' },
    { bg: 'bg-s-pink-100', text: 'text-s-pink-500' },
    { bg: 'bg-cyan-100', text: 'text-cyan-600' },
];

export const GenComponentForm: React.FC<{
    component: SerializeFrom<Component>;
}> = ({ component }) => {
    const { type } = component;

    if (type === 'contentChunk') {
        const suffledColorMap = colorMap.sort(() => Math.random() - 0.5);
        return (
            <div key={component.componentId} className="space-y-4 p-4 my-4">
                {(component.content as ContentChunkContent)?.chunks.map((chunk, index) => {
                    const color = suffledColorMap[index % colorMap.length];
                    return (
                        <div key={index} className={`${color.bg} pl-2 pt-4 rounded-md`}>
                            <div className="flex flex-col capitalize h-7 px-2 pb-4 font-medium text-sm gap-2">
                                <div className="-mr-1">{type}</div>
                                <span className={`font-medium text-xs ${color.text}`}>
                                    {component?.componentId} {`#${index + 1}`}
                                </span>
                            </div>

                            <div className="overflow-hidden rounded-tl-md">
                                {chunk.map((chunkComponent) => {
                                    if (!allowedTypes.includes(chunkComponent.type)) {
                                        return null;
                                    }

                                    return (
                                        <InnerForm
                                            structuralColor={color}
                                            isStructuralComponent
                                            idPrefix={component.componentId}
                                            key={chunkComponent.componentId}
                                            component={chunkComponent}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }

    if (
        type === 'componentChoice' &&
        allowedTypes.includes((component?.content as ComponentChoiceContent)?.selectedComponent.type)
    ) {
        return (
            <div className="rounded-md bg-purple-100 space-y-4 px-4 my-4" key={component.componentId}>
                <div className="flex capitalize h-7 pb-4 items-center font-medium text-sm gap-2">
                    <div className="-mr-1"> {type}</div>
                    <span className="font-medium text-xs text-purple-500">{component?.componentId}</span>
                </div>
                <div className="overflow-hidden rounded-tl-md">
                    <InnerForm
                        isStructuralComponent
                        idPrefix={component.componentId}
                        structuralColor={{
                            bg: 'bg-purple-100',
                            text: 'text-purple-500',
                        }}
                        component={(component.content as ComponentChoiceContent).selectedComponent}
                    />
                </div>
            </div>
        );
    }
    if (!allowedTypes.includes(component.type)) {
        return null;
    }
    return (
        <div key={component.componentId}>
            <InnerForm component={component} />
        </div>
    );
};

type SignalEvents = 'refetchItemComponents' | 'refetchItemVariantComponents';
export const InnerForm: React.FC<{
    component: SerializeFrom<Component>;
    isStructuralComponent?: boolean;
    idPrefix?: string;
    structuralColor?: { bg: string; text: string };
}> = ({ component, idPrefix }) => {
    const fetcher = useFetcher();
    const { itemId, language } = useLoaderData<{ itemId: string; language: string }>();

    useEffect(() => {
        const actionData = fetcher.data as typeof action;
        if (actionData && 'success' in actionData && actionData.success === true && 'event' in actionData) {
            signal.send(actionData.event as SignalEvents, {
                itemId,
                itemLanguage: language,
            });
        }
    }, [fetcher.data]);

    return (
        <fetcher.Form method="post">
            <div className="p-4">
                <span className="italic font-normal text-xs">{component.name}</span>
                <div className="flex flex-col mt-2">
                    <TextareaAutosize
                        rows={5}
                        cols={60}
                        name="prompt"
                        className={`!bg-[#fff] w-full p-4 min-h-[140px] text-sm ${
                            fetcher.state === 'submitting' ? 'cursor-not-allowed' : 'cursor-text'
                        }`}
                        defaultValue=""
                        placeholder="Please enter a prompt..."
                    />
                    <input
                        type="hidden"
                        name="componentId"
                        value={(idPrefix ? idPrefix + '.' : '') + component.componentId}
                    />
                    <button
                        type="submit"
                        className={`
                         w-full p-4 text-sm font-medium bg-cyan-50 text-cyan-800 hover:bg-cyan-200
                        ${fetcher.state === 'submitting' ? 'cursor-not-allowed' : 'cursor-pointer'}
                    `}
                        disabled={fetcher.state === 'submitting'}
                        aria-label="Generate content"
                    >
                        {fetcher.state === 'submitting' ? 'Generating...' : 'Generate'}
                    </button>
                </div>
            </div>
        </fetcher.Form>
    );
};
