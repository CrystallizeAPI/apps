type TranslationProgressProps = {
    currentProcessingTranslationsCount: number;
    totalProcessingTranslationsCount: number;
};

export function TranslationProgress({
    currentProcessingTranslationsCount,
    totalProcessingTranslationsCount,
}: TranslationProgressProps) {
    if (totalProcessingTranslationsCount === 0) {
        return null;
    }
    const progressInLeft = (100 * currentProcessingTranslationsCount) / totalProcessingTranslationsCount;
    const translationIsDone =
        totalProcessingTranslationsCount - currentProcessingTranslationsCount === totalProcessingTranslationsCount;

    return (
        <div
            className={`${
                translationIsDone
                    ? 'w-[160px]  bg-s-green-200 border-s-green-600 '
                    : 'w-[400px] bg-[#fff] border-purple-200 '
            } text-sm overflow-hidden font-medium transition-all  fixed  bottom-10 z-10 left-1/2 -translate-x-1/2 border border-solid  rounded-2xl py-2 px-2 shadow-md`}
        >
            {translationIsDone ? (
                <div className="flex items-center relative gap-2">
                    <div className="bg-s-green-600 rounded-full justify-center w-4 h-4 text-[10px] font-medium flex items-center text-[#fff]">
                        ✓
                    </div>
                    <span className="text-s-green-700">Translation done</span>
                </div>
            ) : (
                <>
                    <span
                        className="absolute transition-all bg-s-green-200 h-full top-0 left-0"
                        style={{
                            width: `${100 - progressInLeft}%`,
                        }}
                    />
                    <div className="flex justify-between relative">
                        <span className="flex items-center gap-2">
                            <div className="border-gray-200 h-4 w-4 animate-spin-slow rounded-full border-[3px] border-t-s-green-600" />

                            <span>
                                Translating, <span className="font-normal">do not close the window</span>
                            </span>
                        </span>
                        <span>
                            {totalProcessingTranslationsCount - currentProcessingTranslationsCount}/
                            {totalProcessingTranslationsCount}
                        </span>
                    </div>
                </>
            )}
        </div>
    );
}
