import { Item } from '@crystallize/schema/item';
import { Shape } from '@crystallize/schema/shape';
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
        <div className="grid floating-actionbar">
            <ShapeChooser shapes={shapes} />
            <FolderChooser folders={folders} />
            {state.selectedShape.type === 'product' ? (
                <div>
                    <h2>Group Product Variants By</h2>
                    <select
                        className="grey"
                        onChange={(e) => dispatch.updateGroupProductsBy(e.target.value)}
                        disabled={!state.rows?.length}
                    >
                        <option defaultChecked={true} value="" />
                        {state.headers.map((header) => (
                            <option key={header} value={header}>
                                {header}
                            </option>
                        ))}
                    </select>
                </div>
            ) : (
                <div style={{ flexGrow: '1' }} />
            )}
            <Submit />
        </div>
    );
};
