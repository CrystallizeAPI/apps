import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/src/resources/chat/completions.js';

export type TranslatorArgs = {
    text: string;
    language: string;
};
type Deps = {
    apiKey: string;
};
export const createGenerator = async ({ apiKey }: Deps) => {
    const openai = new OpenAI({ apiKey });

    const sendMessages = async (messages: ChatCompletionMessageParam[]) => {
        const completion = await openai.chat.completions.create({
            messages: messages,
            model: 'gpt-3.5-turbo',
        });
        return completion;
    };

    const generate = async ({ text, language }: TranslatorArgs) => {
        const messages: ChatCompletionMessageParam[] = [
            {
                role: 'user',
                content: `You are now a content generator in a Product Information Management system focus on story telling. Generate a content in ${language} based on the provided prompt. Do not generate more than 10 lines. Here is the prompt: \n ${text}"`,
            },
        ];
        const completion = await sendMessages(messages);
        const result = completion.choices[0].message.content ?? '';
        return result.replace(/^"(.*)"$/, '$1').replaceAll(/<[^>]*>/g, '');
    };

    return {
        generate,
    };
};

export type Generator = Awaited<ReturnType<typeof createGenerator>>;
