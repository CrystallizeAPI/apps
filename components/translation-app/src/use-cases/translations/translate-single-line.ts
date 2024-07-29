import type { Translator } from '~/core/translator.server';
import type { Language, Preferences } from '../contracts/types';

type Deps = {
    translator: Translator;
};

export const translateSingleLine = async (
    component: any,
    translateLanguage: Language,
    preferences: Preferences,
    { translator }: Deps,
) => {
    const text = component?.content?.text?.trim();

    const translation =
        text &&
        (await translator.translate({
            text,
            language: translateLanguage,
            preferences,
        }));

    return {
        id: component.componentId,
        type: 'singleLine',
        translation: translation || '',
    };
};
