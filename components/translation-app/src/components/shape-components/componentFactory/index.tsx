import { SingleLine, RichText, ParagraphCollection } from '../index';
import { CopyButton } from '~/components/copy-button';
import { componentType } from '../helpers';
import type { ComponentWithTranslation } from '~/use-cases/contracts/types';
import type { ParagraphCollectionContent, RichTextContent, SingleLineContent } from '~/__generated__/types';

type StructuralColor = {
    text: string;
    bg: string;
};

const getTranslation = (component: ComponentWithTranslation) => {
    if (component.type === 'singleLine') {
        return (component.content as SingleLineContent)?.text ?? '';
    }

    if (component.type === 'richText') {
        return (component.content as RichTextContent).plainText?.toString() ?? '';
    }

    if (component.type === 'paragraphCollection') {
        return (
            (component.content as ParagraphCollectionContent).paragraphs
                ?.map((paragraph) => `${paragraph.title} \n ${paragraph.body}`)
                .join('\n\n') ?? ''
        );
    }

    return '';
};

export default function ComponentFactory({
    component,
    isStructuralComponent,
    structuralColor,
}: {
    isStructuralComponent?: boolean;
    structuralColor?: StructuralColor;
    component: ComponentWithTranslation;
}) {
    const componentTypes: Record<string, JSX.Element> = {
        singleLine: <SingleLine key={component.componentId} data={component} />,
        richText: <RichText key={component.componentId} data={component} />,
        paragraphCollection: <ParagraphCollection key={component.componentId} data={component} />,
    };

    const { type, translationState } = component;
    const hasTranslation = translationState === 'translated';
    const isTranslating = translationState === 'translating';

    if (!component.content || ('paragraphs' in component.content && !component.content?.paragraphs?.length)) {
        return null;
    }

    if (isStructuralComponent) {
        return (
            <div className="group bg-[#fff] border-b border-solid border-purple-100 ">
                <div className="flex pl-6 pt-2 items-end gap-2 justify-between">
                    <div className="flex capitalize h-7 items-center font-medium text-sm gap-2">
                        {hasTranslation && (
                            <div className="bg-s-green-600 rounded-full justify-center w-4 h-4 text-[10px] font-medium flex items-center text-[#fff]">
                                ✓
                            </div>
                        )}
                        <span className={`${structuralColor?.text} italic font-normal text-xs`}>
                            {component?.componentId}
                        </span>
                        {isTranslating && (
                            <div className="border-gray-200 h-4 w-4 animate-spin-slow rounded-full border-[3px] border-t-s-green-600" />
                        )}
                    </div>
                </div>

                <div className="relative">
                    {componentTypes[type]}
                    {hasTranslation && (
                        <div className="group-hover:block hidden absolute top-2 p-0.5 rounded-md bg-purple-50 right-2">
                            <div className="flex flex-row gap-2 w-full justify-end">
                                <CopyButton text={getTranslation(component)} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="group">
            <div className="flex pl-2 pt-2 items-end gap-2 justify-between">
                <div className="flex capitalize h-7 pb-2 items-center font-medium text-sm gap-2">
                    {hasTranslation ? (
                        <div className="bg-s-green-600 rounded-full justify-center w-4 h-4 text-[10px] font-medium flex items-center text-[#fff]">
                            ✓
                        </div>
                    ) : (
                        <div className="-mr-1">{componentType[type]}</div>
                    )}
                    <span className="font-medium text-xs">{component?.componentId}</span>
                    {isTranslating && (
                        <div className="border-gray-200 h-4 w-4 animate-spin-slow rounded-full border-[3px] border-t-s-green-600" />
                    )}
                </div>
            </div>

            <div className="relative shadow bg-[#fff] overflow-hidden rounded-md ">
                {componentTypes[type]}
                {hasTranslation && (
                    <div className="group-hover:block hidden absolute top-2 p-0.5 rounded-md bg-purple-50 right-2">
                        <div className="flex flex-row gap-2 w-full justify-end">
                            <CopyButton text={getTranslation(component)} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
