import type { Item } from '@crystallize/schema';
import { useImport } from '../../provider';

interface FolderChooserProps {
    folders: Item[];
}

export const FolderChooser = ({ folders }: FolderChooserProps) => {
    const { dispatch } = useImport();

    return (
        <div className="flex flex-col px-6 py-2 w-full">
            <label className="pb-2">Import location</label>
            <select
                defaultValue={folders[0].tree?.path}
                onChange={(e) =>
                    dispatch.updateSelectedFolder(
                        folders.find((folder) => folder.tree?.path === e.target.value) as Item,
                    )
                }
            >
                {folders.map((folder) => (
                    <option key={folder.tree?.path} value={folder.tree?.path}>
                        {folder.tree?.path}
                    </option>
                ))}
            </select>
        </div>
    );
};
