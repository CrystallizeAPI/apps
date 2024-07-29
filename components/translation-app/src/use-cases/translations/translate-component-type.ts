import type { Translator } from '~/core/translator.server';
import type { Language, Preferences } from '../contracts/types';
import { translateSingleLine } from './translate-single-line';
import { translateRichText } from './translate-richtext';
import { translateParagraphCollection } from './translate-paragraph-collection';

type Deps = {
    translator: Translator;
};

export const translateComponentType = async (
    translateLanguage: Language,
    component: any,
    preferences: Preferences,
    { translator }: Deps,
) => {
    switch (component.type) {
        case 'singleLine':
            return await translateSingleLine(component, translateLanguage, preferences, { translator });
        case 'richText':
            return await translateRichText(component, translateLanguage, preferences, { translator });
        case 'paragraphCollection':
            return await translateParagraphCollection(component, translateLanguage, preferences, { translator });
        default:
            return null;
    }
};
