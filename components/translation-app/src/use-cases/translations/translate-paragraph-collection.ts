import type { Translator } from '~/core/translator.server';
import type { Language, Preferences } from '../contracts/types';

type Deps = {
    translator: Translator;
};

export const translateParagraphCollection = async (
    component: any,
    translateLanguage: Language,
    preferences: Preferences,
    { translator }: Deps,
) => {
    return {
        id: component.id,
        type: 'paragraphCollection',
        translation: await Promise.all(
            component?.content?.paragraphs.map(async (paragraph: any) => {
                const titleText = paragraph?.title?.text?.trim();
                const bodyText = paragraph?.body?.plainText?.toString()?.trim();

                const [title, body] = await Promise.all([
                    titleText
                        ? translator.translate({
                              text: titleText,
                              language: translateLanguage,
                              preferences,
                          })
                        : null,
                    bodyText
                        ? translator.translate({
                              text: bodyText,
                              language: translateLanguage,
                              preferences,
                          })
                        : null,
                ]);

                return {
                    title: { text: title },
                    body: { plainText: [body] },
                    images: paragraph?.images,
                };
            }),
        ),
    };
};
