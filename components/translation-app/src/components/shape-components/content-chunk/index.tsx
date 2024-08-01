import { componentType } from '../helpers';
import { CopyButton } from '~/components/copy-button';
import TextareaAutosize from 'react-textarea-autosize';
import { IconButton, Icon, Tooltip } from '@crystallize/design-system';
import ComponentFactory from '../componentFactory';
const ContentChunk = ({
    data,
    item,
    setEditedTranslation,
}: {
    data: any;
    item: { id: string; language: string };
    setEditedTranslation: any;
}) => {
    const hasTranslation = false;
    Object.keys(data.content).map((chunk, i) => {
        console.log({ data });
        console.log({ chunk });
        return (
            <div className="bg-purple-100 rounded-t-md" key={chunk}>
                <div className="flex pl-2 pt-2 items-end gap-2 justify-between mt-4">
                    <div className="flex capitalize h-7 items-center   font-medium text-sm gap-2">
                        {hasTranslation ? (
                            <div className="bg-s-green-600 rounded-full justify-center w-4 h-4 text-[10px] font-medium flex items-center text-[#fff]">
                                ✓
                            </div>
                        ) : (
                            <div className="-mr-1">
                                <Icon.Chunk />
                            </div>
                        )}
                        <span className="font-medium text-xs">Meta</span>
                        {/* {loading && !hasTranslation && (
              <div className="border-gray-200 h-4 w-4 animate-spin-slow rounded-full border-[3px] border-t-s-green-600" />
            )} */}
                    </div>
                    <div>
                        {/* {hasTranslation && (
              <div className="flex flex-row gap-2 w-full justify-end">
                <CopyButton text={cmp?.translation ?? ""} />
                <Tooltip content="Add this translation to draft">
                  <IconButton className="!w-7 !h-7" onClick={handleClick}>
                    <Icon.Rocket width="20" height="20" />
                  </IconButton>
                </Tooltip>
              </div>
            )} */}
                    </div>
                </div>

                <div className="pt-2">abs</div>
            </div>
        );
    });
};

export default ContentChunk;
