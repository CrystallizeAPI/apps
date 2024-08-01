import type { Translator } from '~/core/translator.server';
import type { Language, Preferences } from '../contracts/types';

type Deps = {
    translator: Translator;
};

export const translateRichText = async (
    component: any,
    translateLanguage: Language,
    preferences: Preferences,
    { translator }: Deps,
) => {
    const text = component?.content?.plainText?.toString()?.trim();

    if (!text) {
        return {
            id: component.id,
            type: 'richText',
            translation: null,
        };
    }

    const translation = await translator.translate({
        text,
        language: translateLanguage,
        preferences,
    });

    return {
        id: component.componentId,
        type: 'richText',
        translation: [translation],
    };
};
