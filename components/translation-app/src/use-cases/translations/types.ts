import type { Preferences } from '../contracts/types';
import type { Component } from '~/__generated__/types';
import type { Translator } from '~/core/translator.server';

export type TranslateComponentProps = {
    fromLanguage: string;
    toLanguage: string;
    component: Component;
    preferences: Preferences;
    translator: Translator;
};
