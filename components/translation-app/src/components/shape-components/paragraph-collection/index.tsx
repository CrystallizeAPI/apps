import { CopyButton } from '~/components/copy-button';
import TextareaAutosize from 'react-textarea-autosize';
import type { ComponentWithTranslation } from '~/use-cases/contracts/types';
import type { ParagraphCollectionContent } from '~/__generated__/types';

export const ParagraphCollection = ({ data }: { data: ComponentWithTranslation }) => {
    const paragraphs = (data.content as ParagraphCollectionContent)?.paragraphs ?? [];
    const hasTranslation = data.translationState === 'translated';

    return (
        <form className="flex flex-col gap-4">
            {paragraphs?.map((el: any, innerIndex: number) => {
                return (
                    <div key={innerIndex}>
                        <div className="relative flex justify-between items-center">
                            <input
                                value={el?.title?.text}
                                placeholder="Paragraph title"
                                className={`!bg-[#fff] w-full pt-3 text-lg font-medium px-6  placeholder:font-normal placeholder:text-base placeholder:italic focus:outline-none
                ${!hasTranslation ? 'text-base font-normal text-gray-400 italic' : 'text-base font-medium'}`}
                                readOnly
                            />
                        </div>
                        <div className="w-full relative flex">
                            <TextareaAutosize
                                value={el.body?.plainText?.toString() ?? ''}
                                placeholder="Paragraph body"
                                className={`!bg-[#fff] px-6 py-4 min-h-[140px] w-full focus:outline-none ${
                                    !hasTranslation
                                        ? 'text-base font-normal text-gray-400 italic '
                                        : 'text-base font-normal'
                                }`}
                                readOnly
                            />
                        </div>
                        {el?.images && (
                            <div className="px-6 py-6 flex gap-2">
                                {el?.images?.map((image: any, index: number) => (
                                    <div className="w-32 rounded overflow-hidden p-2 bg-[#fff] shadow" key={index}>
                                        <img src={image?.url} className="w-full" alt="Item" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}
        </form>
    );
};
