import { Popover } from 'react-tiny-popover';
import cn from 'classnames';
import { useImport } from '../../provider';
import { useState } from 'react';

type ShapeField = {
    key: string;
    value: string;
    type?: string;
};

interface ColumnMapperProps {
    shapeFields: ShapeField[];
    selectedShapeField?: ShapeField;
    onChange: (key: string) => void;
}

interface ColumnHeaderProps {
    title: string;
    shapeFields: ShapeField[];
}

const ColumnMapper = ({ shapeFields, selectedShapeField, onChange }: ColumnMapperProps) => {
    const { state } = useImport();
    const basicItemFields = shapeFields.filter(({ key }) => key.startsWith('item.'));
    const productVariantFields = shapeFields.filter(({ key }) => key.startsWith('variant.'));
    const itemComponentsFields = shapeFields.filter(({ key }) => key.startsWith('component.'));
    const variantComponentFields = shapeFields.filter(({ key }) => key.startsWith('variantComponent.'));

    return (
        <ul
            style={{
                color: '#222',
                background: 'white',
                borderRadius: 10,
                border: '1px solid var(--dsg-border-color)',
                listStyle: 'none',
                padding: 0,
                boxShadow: '2px 2px 5px 0 rgba(0, 0, 0, 0.3)',
                overflow: 'hidden',
                fontFamily: 'system-ui, sans-serif',
            }}
        >
            {shapeFields
                .filter((field) => !state.mapping[field.key])
                .map((field) => (
                    <li
                        style={{
                            padding: 10,
                            background: field.key === selectedShapeField?.key ? 'var(--dsg-border-color)' : 'white',
                        }}
                        key={field.key}
                        onClick={() => onChange(field.key)}
                    >
                        {field.value}
                    </li>
                ))}
            {selectedShapeField && (
                <li
                    style={{
                        padding: 10,
                        background: 'rgb(239, 72, 54)',
                    }}
                    onClick={() => onChange('')}
                >
                    Remove Mapping
                </li>
            )}
        </ul>
    );
};

export const ColumnHeader = ({ title, shapeFields }: ColumnHeaderProps) => {
    const { state, dispatch } = useImport();
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const selectedShapeField = shapeFields.find(({ key }) => state.mapping[key] === title);

    return (
        <>
            <span style={{ flexGrow: 1 }}>{title}</span>
            <Popover
                isOpen={isPopoverOpen}
                positions={['bottom']}
                content={
                    <ColumnMapper
                        shapeFields={shapeFields}
                        selectedShapeField={selectedShapeField}
                        onChange={(key: string) => {
                            const newMapping = {
                                ...state.mapping,
                                [key]: title,
                            };
                            if (selectedShapeField?.key) {
                                delete newMapping[selectedShapeField.key];
                            }

                            dispatch.updateMapping(newMapping);
                            setIsPopoverOpen(!isPopoverOpen);
                        }}
                    />
                }
            >
                <button
                    style={{ width: '100%' }}
                    onClick={(e) => {
                        setIsPopoverOpen(!isPopoverOpen);
                    }}
                >
                    {selectedShapeField ? selectedShapeField.value : 'Choose Mapping'}
                </button>
            </Popover>
        </>
    );
};
