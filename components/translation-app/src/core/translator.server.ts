import OpenAI from 'openai';
import type { ChatCompletionMessage } from 'openai/resources/index.mjs';
import type { Language, Preferences } from '../use-cases/contracts/types';

export type TranslatorArgs = {
    text: string;
    language: Language;
    preferences: Preferences;
};
type Deps = {
    apiKey: string;
};
export const createTranslator = async ({ apiKey }: Deps) => {
    const openai = new OpenAI({ apiKey });

    const sendMessages = async (messages: ChatCompletionMessage[]) => {
        const completion = await openai.chat.completions.create({
            messages: messages,
            model: 'gpt-3.5-turbo',
        });
        return completion;
    };

    const translate = async ({ text, language, preferences }: TranslatorArgs) => {
        const { from, to } = language;
        const messages: ChatCompletionMessage[] = [
            {
                role: 'user',
                content: `Translate from ${from} to ${to} (delimited with XML tags). ${
                    preferences.customPromptFromUser ? `And ${preferences.customPromptFromUser}` : ''
                }. <translation>${text}</translation>`,
            },
        ];
        const completion = await sendMessages(messages);
        const result = completion.choices[0].message.content ?? '';
        return result.replace(/<[^>]*>/g, '');
    };

    return {
        translate,
    };
};

export type Translator = Awaited<ReturnType<typeof createTranslator>>;
