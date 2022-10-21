import type { Item } from '@crystallize/schema/item';
import { useImport } from '../../provider';

interface FolderChooserProps {
    folders: Item[];
}

export const FolderChooser = ({ folders }: FolderChooserProps) => {
    const { dispatch } = useImport();

    return (
        <div className="folder-chooser ">
            <h2>Select Import Location</h2>
            <select
                className="grey"
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
