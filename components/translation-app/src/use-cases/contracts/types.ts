import type { Component } from '~/__generated__/types';

export type Preferences = {
    shouldPushTranslationToDraft: boolean;
    shouldIncludeAllVariants: boolean;
    customPromptFromUser?: string;
};

type TranslationState = 'translating' | 'translated' | 'error';
export type Translation = string | { title?: string; body?: string }[];

type PropertyName = {
    type: string;
    content: string;
};
export type Property = PropertyName;

export type ComponentWithTranslation = Component & {
    translationState?: TranslationState;
};

export type PropertyWithTranslation = Property & {
    translationState?: TranslationState;
};

export type Language = {
    from: string;
    to: string;
};
