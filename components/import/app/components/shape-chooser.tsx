import type { Shape } from '~/types';

interface ShapeChooserProps {
    shapes: Shape[];
    setSelectedShape: (shape: Shape) => void;
}

export const ShapeChooser = ({ shapes, setSelectedShape }: ShapeChooserProps) => {
    return (
        <select
            onChange={(e) => setSelectedShape(shapes.find((shape) => shape.identifier === e.target.value) as Shape)}
        >
            {shapes.map((shape, i) => (
                <option key={shape.identifier} value={shape.identifier} selected={i === 0}>
                    {shape.name}
                </option>
            ))}
        </select>
    );
};
