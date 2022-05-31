import type { Shape } from '~/types';

interface ShapeChooserProps {
    shapes: Shape[];
    setSelectedShape: (shape: Shape) => void;
}

export const ShapeChooser = ({ shapes, setSelectedShape }: ShapeChooserProps) => {
    return (
        <select
            defaultValue={shapes[0].identifier}
            onChange={(e) => setSelectedShape(shapes.find((shape) => shape.identifier === e.target.value) as Shape)}
        >
            {shapes.map((shape) => (
                <option key={shape.identifier} value={shape.identifier}>
                    {shape.name}
                </option>
            ))}
        </select>
    );
};
