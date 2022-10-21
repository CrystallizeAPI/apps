import type { Item } from '@crystallize/schema/item';

interface FolderChooserProps {
    folders: Item[];
    setSelectedFolder: (folder: Item) => void;
}

export const FolderChooser = ({ folders, setSelectedFolder }: FolderChooserProps) => {
    return (
        <div className="folder-chooser ">
            <h2>Select Import Location</h2>
            <select
                className="grey"
                defaultValue={folders[0].tree?.path}
                onChange={(e) =>
                    setSelectedFolder(folders.find((folder) => folder.tree?.path === e.target.value) as Item)
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
