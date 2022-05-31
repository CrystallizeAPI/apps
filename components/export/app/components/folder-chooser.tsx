import type { Folder } from '~/types';

interface FolderChooserProps {
    folders: Folder[];
    setSelectedFolder: (folder: Folder) => void;
}

export const FolderChooser = ({ folders, setSelectedFolder }: FolderChooserProps) => {
    return (
        <div className="folder-chooser">
            <h2>Select Folder for Export</h2>
            <select
                defaultValue={folders[0].path}
                onChange={(e) => setSelectedFolder(folders.find((folder) => folder.path === e.target.value) as Folder)}
            >
                {folders.map((folder) => (
                    <option key={folder.path} value={folder.path}>
                        {folder.name} (Path: {folder.path})
                    </option>
                ))}
            </select>
        </div>
    );
};
