import { useCallback, useEffect, useMemo, useState } from 'react';

import type { Component, ComponentChoiceContent, ContentChunkContent, ItemType } from '~/__generated__/types';
import { ComponentType } from '~/__generated__/types';
import type { ComponentWithTranslation, Preferences, PropertyWithTranslation } from '../use-cases/contracts/types';

import { signal, type RefetchItem } from '@crystallize/app-signal';
import { allowedTypes } from '../use-cases/contracts/allowed-components';
import { translateComponentType } from '~/use-cases/translations/translate-component-type';
import type { Translator, TranslatorArgs } from './translator.server';
import type { SerializeFrom } from '@remix-run/node';
import { debounce } from '~/use-cases/utils/debounce';

type UpdateComponent = {
    type: ComponentType;
    componentIndex: number;
    chunkIndex?: number;
    chunkComponentIndex?: number;
    translation?: any;
    translationState?: ComponentWithTranslation['translationState'];
    isChoice?: boolean;
};

type UpdateProperty = {
    propertyIndex: number;
    translation?: any;
    translationState?: ComponentWithTranslation['translationState'];
};

type UseTranslationsProps = {
    itemId: string;
    itemType: ItemType;
    fromLanguage: string;
    properties: SerializeFrom<PropertyWithTranslation[] | null>;
    toLanguage: string | null;
    components?: SerializeFrom<Component[] | null>;
    variantSku?: string | null;
};

type HandleTranslationProps = {
    componentIndex: number;
    preferences: Preferences;
    variantSku?: string | null;
    component?: SerializeFrom<Component>;
};

type HandlePropertyProps = {
    property: PropertyWithTranslation;
    propertyIndex: number;
    preferences: Preferences;
};

const debounceRefetchItem = debounce<RefetchItem>((payload) => signal.send('refetchItem', payload), 600);

const debounceRefetchItemComponents = debounce<RefetchItem>(
    (payload) => signal.send('refetchItemComponents', payload),
    600,
);

const debounceRefetchItemVariantComponents = debounce<RefetchItem>(
    (payload) => signal.send('refetchItemVariantComponents', payload),
    600,
);

const translator: Translator = {
    translate: async (args: TranslatorArgs) => {
        const results = await fetch('/api/translate/v2', {
            method: 'POST',
            body: JSON.stringify(args),
        });
        const json = await results.json();
        return json.translation;
    },
};

export const useTranslations = ({
    itemId,
    itemType,
    fromLanguage,
    toLanguage,
    components,
    variantSku,
    properties,
}: UseTranslationsProps) => {
    const [processingTranslations, setProcessingTranslations] = useState<Map<string, boolean>>(new Map());

    const [propertiesWithTranslation, setPropertiesWithTranslation] =
        useState<SerializeFrom<PropertyWithTranslation[] | null>>(properties);

    const [componentWithTranslation, setComponentWithTranslation] = useState<
        SerializeFrom<ComponentWithTranslation[] | null> | undefined
    >(components);

    useEffect(() => {
        setComponentWithTranslation(components);
        setPropertiesWithTranslation(properties);
    }, [components, properties]);

    // use memo since we pass this as dept to useCallback
    const translateLanguage = useMemo(
        () => ({
            from: fromLanguage,
            to: toLanguage as string,
        }),
        [fromLanguage, toLanguage],
    );

    const currentProcessingTranslationsCount = [...processingTranslations.values()].filter(Boolean).length;
    const totalProcessingTranslationsCount = processingTranslations.size;

    const onUpdateComponent = useCallback(
        async (translation: ComponentWithTranslation | PropertyWithTranslation, type: string = 'component') => {
            const formData = new FormData();
            const data = JSON.stringify({
                translation,
                type,
                itemType,
                itemId,
                variantSku,
                language: toLanguage,
            });

            formData.append('data', data);
            await fetch('/?index', { method: 'POST', body: formData });

            const payload = { itemId, itemLanguage: toLanguage as string };

            if (type === 'property') {
                return debounceRefetchItem(payload);
            }

            return variantSku ? debounceRefetchItemVariantComponents(payload) : debounceRefetchItemComponents(payload);
        },
        [itemId, toLanguage, variantSku, itemType],
    );

    const updateComponent = useCallback(
        ({
            type,
            componentIndex,
            chunkIndex,
            chunkComponentIndex,
            translation,
            isChoice = false,
            translationState,
        }: UpdateComponent) => {
            let rootComponent: SerializeFrom<ComponentWithTranslation> | undefined = undefined;

            setComponentWithTranslation((prev) => {
                const copy = [...(prev ?? [])];
                let component = copy[componentIndex];

                if (isChoice) {
                    component = (copy[componentIndex].content as ComponentChoiceContent)?.selectedComponent;
                } else if (typeof chunkIndex === 'number' && typeof chunkComponentIndex === 'number') {
                    component = (copy[componentIndex].content as ContentChunkContent).chunks[chunkIndex][
                        chunkComponentIndex
                    ] as ComponentWithTranslation;
                }

                component.translationState = translationState;

                if (translationState === 'translated') {
                    if (type === ComponentType.SingleLine) {
                        component.content = { text: translation };
                    } else if (type === ComponentType.RichText) {
                        component.content = { plainText: translation };
                    } else if (type === ComponentType.ParagraphCollection) {
                        component.content = { paragraphs: translation };
                    }
                }

                rootComponent = copy[componentIndex];

                return copy;
            });

            return rootComponent;
        },
        [],
    );

    const updateProperty = useCallback(({ propertyIndex, translation, translationState }: UpdateProperty) => {
        let updatedProperty: PropertyWithTranslation | undefined = undefined;

        setPropertiesWithTranslation((prev) => {
            const copy = [...(prev ?? [])];
            let property = copy[propertyIndex];

            property.translationState = translationState;
            if (translation) {
                property.content = translation;
            }

            updatedProperty = copy[propertyIndex];

            return copy;
        });

        return updatedProperty;
    }, []);

    const handleChunkTranslation = useCallback(
        ({ component, componentIndex, preferences }: HandleTranslationProps) => {
            (component?.content as ContentChunkContent)?.chunks.forEach((chunkComponents, chunkIndex) => {
                chunkComponents.forEach((chunkComponent, chunkComponentIndex) => {
                    (async () => {
                        if (!allowedTypes.includes(chunkComponent.type)) {
                            return;
                        }

                        const id = `${component?.componentId}-${chunkComponentIndex}-${chunkComponent.componentId}`;
                        const base = {
                            type: chunkComponent.type,
                            componentIndex,
                            chunkIndex,
                            chunkComponentIndex,
                        };

                        setProcessingTranslations((prev) => new Map(prev.set(id, true)));

                        try {
                            updateComponent({
                                ...base,
                                translationState: 'translating',
                            });
                            const data = await translateComponentType(translateLanguage, chunkComponent, preferences, {
                                translator,
                            });
                            const component = updateComponent({
                                ...base,
                                translationState: 'translated',
                                translation: data?.translation,
                            });
                            preferences.shouldPushTranslationToDraft && !!component && onUpdateComponent(component);
                        } catch {
                            updateComponent({
                                ...base,
                                translationState: 'error',
                            });
                            // TODO: show error message
                        } finally {
                            setProcessingTranslations((prev) => new Map(prev.set(id, false)));
                        }
                    })();
                });
            });
        },
        [translateLanguage, updateComponent, onUpdateComponent],
    );

    const handleChoiceTranslation = useCallback(
        async ({ component, componentIndex, preferences }: HandleTranslationProps) => {
            if (!component) {
                return;
            }

            setProcessingTranslations((prev) => new Map(prev.set(component.componentId, true)));

            try {
                updateComponent({
                    type: component.type,
                    componentIndex,
                    translationState: 'translating',
                    isChoice: true,
                });
                const data = await translateComponentType(translateLanguage, component, preferences, { translator });
                const updatedComponent = updateComponent({
                    type: component.type,
                    componentIndex,
                    translationState: 'translated',
                    translation: data?.translation,
                    isChoice: true,
                });
                preferences.shouldPushTranslationToDraft && !!updatedComponent && onUpdateComponent(updatedComponent);
            } catch {
                updateComponent({
                    type: component.type,
                    componentIndex,
                    translationState: 'error',
                });
                // TODO: show error message
            } finally {
                setProcessingTranslations((prev) => new Map(prev.set(component.componentId, false)));
            }
        },
        [translateLanguage, updateComponent, onUpdateComponent],
    );
    const handleBaseComponentTranslation = useCallback(
        async ({ component, componentIndex, preferences }: HandleTranslationProps) => {
            if (!component) {
                return;
            }

            setProcessingTranslations((prev) => new Map(prev.set(component.componentId, true)));

            try {
                updateComponent({
                    type: component.type,
                    componentIndex,
                    translationState: 'translating',
                });
                const data = await translateComponentType(translateLanguage, component, preferences, { translator });
                const updatedComponent = updateComponent({
                    type: component.type,
                    componentIndex,
                    translationState: 'translated',
                    translation: data?.translation,
                });
                preferences.shouldPushTranslationToDraft && !!updatedComponent && onUpdateComponent(updatedComponent);
            } catch {
                updateComponent({
                    type: component.type,
                    componentIndex,
                    translationState: 'error',
                });
                // TODO: show error message
            } finally {
                setProcessingTranslations((prev) => new Map(prev.set(component.componentId, false)));
            }
        },
        [translateLanguage, updateComponent, onUpdateComponent],
    );

    const handleNameTranslation = useCallback(
        async ({ property, propertyIndex, preferences }: HandlePropertyProps) => {
            setProcessingTranslations((prev) => new Map(prev.set(property.type, true)));

            try {
                updateProperty({
                    propertyIndex,
                    translationState: 'translating',
                });
                const translation = await translator.translate({
                    text: property.content,
                    language: translateLanguage,
                    preferences,
                });
                const updatedProperty = updateProperty({
                    propertyIndex,
                    translation,
                    translationState: 'translated',
                });
                preferences.shouldPushTranslationToDraft &&
                    !!updatedProperty &&
                    onUpdateComponent(updatedProperty, 'property');
            } catch {
                updateProperty({
                    propertyIndex,
                    translationState: 'error',
                });
                // TODO: show error message
            } finally {
                setProcessingTranslations((prev) => new Map(prev.set(property.type, false)));
            }
        },
        [translateLanguage, updateProperty, onUpdateComponent],
    );

    const onTranslate = useCallback(
        (preferences: Preferences) => {
            setProcessingTranslations(new Map());

            properties?.forEach((property, propertyIndex) => {
                if (property.type === 'name') {
                    return handleNameTranslation({
                        property,
                        propertyIndex,
                        preferences,
                    });
                }
            });

            components?.forEach((component, componentIndex) => {
                const props = { component, componentIndex, preferences };

                if (component.type === 'contentChunk') {
                    return handleChunkTranslation(props);
                }

                if (component.type === 'componentChoice') {
                    return handleChoiceTranslation({
                        ...props,
                        component: (component.content as ComponentChoiceContent)?.selectedComponent,
                    });
                }

                allowedTypes.includes(component.type) && handleBaseComponentTranslation(props);
            });
        },
        [
            components,
            properties,
            handleChoiceTranslation,
            handleChunkTranslation,
            handleBaseComponentTranslation,
            handleNameTranslation,
        ],
    );

    return {
        componentWithTranslation,
        propertiesWithTranslation,
        onTranslate,
        currentProcessingTranslationsCount,
        totalProcessingTranslationsCount,
    };
};
