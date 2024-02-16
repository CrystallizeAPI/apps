import { Item } from '@crystallize/schema';
import { Shape } from '@crystallize/schema';
import { useImport } from '../../provider';
import { FolderChooser } from './FolderChooser';
import { ShapeChooser } from './ShapeChooser';
import { Submit } from './Submit';

export interface ActionBarProps {
    shapes: Shape[];
    folders: Item[];
}

export const ActionBar = ({ shapes, folders }: ActionBarProps) => {
    const { state, dispatch } = useImport();

    return (
        <div className=" pt-2  bg-white gap-4 rounded-b-md shadow-sm">
            <div className="grid grid-cols-[1fr_1fr_230px] px-6">
                <div className="flex ">
                    <ShapeChooser shapes={shapes} />
                    <FolderChooser folders={folders} />
                </div>

                <Submit />
            </div>

            {(state.preflight?.errorCount ?? 0) > 0 && (
                <div className="block text-xs  px-6 py-1 text-sm text-right">
                    <span className="text-pink-700 font-medium">
                        You have {state.preflight?.errorCount ?? 0} errors.{' '}
                    </span>
                </div>
            )}
        </div>
    );
};
