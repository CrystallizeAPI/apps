import type { Shape } from '@crystallize/schema';
import { useImport } from '../../provider';
interface ShapeChooserProps {
    shapes: Shape[];
}

export const ShapeChooser = ({ shapes }: ShapeChooserProps) => {
    const { dispatch, state } = useImport();

    return (
        <div className="flex flex-col py-2 w-full">
            <label className="pb-2">Shape</label>
            <select
                defaultValue={shapes[0].identifier}
                onChange={(e) =>
                    dispatch.updateSelectedShape(shapes.find((shape) => shape.identifier === e.target.value) as Shape)
                }
            >
                <optgroup label="Folders">
                    {shapes
                        .filter((shape) => shape.type === 'folder')
                        .map((shape) => (
                            <option key={shape.identifier} value={shape.identifier}>
                                {shape.name}
                            </option>
                        ))}
                </optgroup>
                <optgroup label="Products">
                    {shapes
                        .filter((shape) => shape.type === 'product')
                        .map((shape) => (
                            <option key={shape.identifier} value={shape.identifier}>
                                {shape.name}
                            </option>
                        ))}
                </optgroup>
                <optgroup label="Document">
                    {shapes
                        .filter((shape) => shape.type === 'document')
                        .map((shape) => (
                            <option key={shape.identifier} value={shape.identifier}>
                                {shape.name}
                            </option>
                        ))}
                </optgroup>
            </select>
        </div>
    );
};
