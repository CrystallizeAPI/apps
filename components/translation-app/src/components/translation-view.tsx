import type { Component, ItemType } from '~/__generated__/types';

import { TranslationForm } from '~/components/translation-form';
import { TranslationToolbar } from '~/components/translation-toolbar';
import { TranslationProgress } from '~/components/translation-progress';
import { TranslationProperties } from '~/components/translation-properties';
import { useTranslations } from '~/core/use-translations';
import type { Property } from '~/use-cases/contracts/types';
import type { SerializeFrom } from '@remix-run/node';

type TranslationViewProps = {
    itemId: string;
    itemType: ItemType;
    availableLanguages: { code: string; name: string }[];
    fromLanguage: string;
    toLanguage: string | null;
    variantSku?: string | null;
    properties: SerializeFrom<Property[] | null>;
    components?: SerializeFrom<Component[] | null>;
};

export function TranslationView({
    itemId,
    itemType,
    fromLanguage,
    toLanguage,
    components,
    properties,
    availableLanguages,
    variantSku,
}: TranslationViewProps) {
    const {
        componentWithTranslation,
        propertiesWithTranslation,
        onTranslate,
        currentProcessingTranslationsCount,
        totalProcessingTranslationsCount,
    } = useTranslations({
        itemId,
        itemType,
        fromLanguage,
        toLanguage,
        components,
        variantSku,
        properties,
    });

    return (
        <div className="pt-4 bg-gray-50">
            <TranslationToolbar
                availableLanguages={availableLanguages}
                toLanguage={toLanguage}
                fromLanguage={fromLanguage}
                onTranslate={onTranslate}
            />
            <TranslationProgress
                currentProcessingTranslationsCount={currentProcessingTranslationsCount}
                totalProcessingTranslationsCount={totalProcessingTranslationsCount}
            />
            <TranslationProperties properties={propertiesWithTranslation} />
            <TranslationForm components={componentWithTranslation} />
        </div>
    );
}
