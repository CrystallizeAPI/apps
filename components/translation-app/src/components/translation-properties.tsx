import type { PropertyWithTranslation } from '~/use-cases/contracts/types';
import { CopyButton } from '~/components/copy-button';

type TranslationPropertiesProps = {
    properties: PropertyWithTranslation[];
};

export function TranslationProperties({ properties }: TranslationPropertiesProps) {
    return (
        <div className="my-4">
            {properties.map((property) => {
                const hasTranslation = property.translationState === 'translated';
                const isTranslating = property.translationState === 'translating';

                return (
                    <div key={property.type} className="group">
                        <div className="flex pl-2 pt-2 items-end gap-2 justify-between">
                            <div className="flex capitalize h-7 pb-2 items-center font-medium text-sm gap-2">
                                {hasTranslation && (
                                    <div className="bg-s-green-600 rounded-full justify-center w-4 h-4 text-[10px] font-medium flex items-center text-[#fff]">
                                        ✓
                                    </div>
                                )}
                                <span className="font-medium text-xs">{property.type}</span>
                                {isTranslating && (
                                    <div className="border-gray-200 h-4 w-4 animate-spin-slow rounded-full border-[3px] border-t-s-green-600" />
                                )}
                            </div>
                        </div>

                        <div className="relative shadow bg-[#fff] overflow-hidden rounded-md ">
                            <input
                                key={property.type}
                                className={`${
                                    !hasTranslation
                                        ? 'text-base font-normal text-gray-400 italic'
                                        : 'text-base font-normal'
                                } px-6 py-4 !bg-[#fff] w-full`}
                                value={property.content}
                                disabled={property.translationState !== 'translated'}
                            />
                            {hasTranslation && (
                                <div className="group-hover:block hidden absolute top-2 p-0.5 rounded-md bg-purple-50 right-2">
                                    <div className="flex flex-row gap-2 w-full justify-end">
                                        <CopyButton text={property.content} />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
