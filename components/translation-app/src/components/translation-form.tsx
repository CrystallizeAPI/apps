import ComponentFactory from './shape-components/componentFactory';
import type { ContentChunkContent, ComponentChoiceContent } from '~/__generated__/types';
import { componentType } from './shape-components/helpers';
import type { ComponentWithTranslation } from '../use-cases/contracts/types';
import { allowedTypes } from '~/use-cases/contracts/allowed-components';

type TranslationFormProps = {
    components?: ComponentWithTranslation[];
};

export const colorMap = [
    { bg: 'bg-s-purple-100', text: 'text-s-purple-500' },
    { bg: 'bg-s-green-100', text: 'text-s-green-600' },
    { bg: 'bg-s-blue-100', text: 'text-s-blue-500' },
    { bg: 'bg-green-100', text: 'text-green-500' },
    { bg: 'bg-s-orange-100', text: 'text-s-orange-500' },
    { bg: 'bg-s-pink-100', text: 'text-s-pink-500' },
    { bg: 'bg-cyan-100', text: 'text-cyan-600' },
];

export function TranslationForm({ components }: TranslationFormProps) {
    return (
        <div className="my-6 border-b border-0 border-solid border-gray-200">
            <div className="space-y-4">
                {components?.map((component) => {
                    const { type } = component;

                    if (type === 'contentChunk') {
                        return (
                            <div key={component.componentId} className="space-y-4">
                                {(component.content as ContentChunkContent)?.chunks.map((chunk, index) => {
                                    const color = colorMap[index % colorMap.length];
                                    return (
                                        <div key={index} className={`${color.bg} pl-2 pt-4 rounded-md`}>
                                            <div className="flex capitalize h-7 pb-4 items-center font-medium text-sm gap-2">
                                                <div className="-mr-1">{componentType['contentChunk']}</div>
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
                                                        <ComponentFactory
                                                            structuralColor={color}
                                                            isStructuralComponent
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
                            <div className="pl-2 pt-4 rounded-md bg-purple-100" key={component.componentId}>
                                <div className="flex capitalize h-7 pb-4 items-center font-medium text-sm gap-2">
                                    <div className="-mr-1">{componentType[type]}</div>
                                    <span className="font-medium text-xs text-purple-500">
                                        {component?.componentId}
                                    </span>
                                </div>
                                <div className="overflow-hidden rounded-tl-md">
                                    <ComponentFactory
                                        isStructuralComponent
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
                            <ComponentFactory component={component} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
