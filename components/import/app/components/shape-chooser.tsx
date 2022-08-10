import type { Shape } from '~/types';

interface ShapeChooserProps {
    shapes: Shape[];
    setSelectedShape: (shape: Shape) => void;
}

export const ShapeChooser = ({ shapes, setSelectedShape }: ShapeChooserProps) => {
    return (
        <div className="shape-chooser">
            <h2>Select Shape</h2>
            <select
                className="grey"
                defaultValue={shapes[0].identifier}
                onChange={(e) => setSelectedShape(shapes.find((shape) => shape.identifier === e.target.value) as Shape)}
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
