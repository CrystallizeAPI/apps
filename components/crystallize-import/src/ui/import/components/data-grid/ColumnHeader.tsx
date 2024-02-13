import { Popover } from 'react-tiny-popover';
import cn from 'classnames';

import { AiFillCaretDown } from 'react-icons/ai';
import { BsTrashFill } from 'react-icons/bs';
import { useImport } from '../../provider';
import { useState } from 'react';
import { FieldMapping, FIELD_MAPPINGS } from '../../../../contracts/ui-types';
import { ComponentChoiceComponentConfig, Shape } from '@crystallize/schema';

interface ColumnMapperProps {
    title: string;
    shapeFields: FieldMapping[];
    selectedShapeField?: FieldMapping;
    onChange: (key: string) => void;
}

interface ColumnHeaderProps {
    title: string;
}

const ColumnMapperList = ({ title, shapeFields, onChange }: ColumnMapperProps) => {
    const { state } = useImport();

    return (
        <>
            <h3 className="popover-list-title">{title}</h3>
            <ul className="popover-list">
                {shapeFields
                    .filter((field) => !state.mapping[field.key])
                    .map((field) => (
                        <li className="popover-item" key={field.key} onClick={() => onChange(field.key)}>
                            {field.description}
                        </li>
                    ))}
            </ul>
        </>
    );
};

export const ColumnHeader = ({ title }: ColumnHeaderProps) => {
    const { state, dispatch } = useImport();
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const shapeFields: FieldMapping[] = Object.values(FIELD_MAPPINGS.item);
    if (state.selectedShape.type === 'product') {
        shapeFields.push(...Object.values(FIELD_MAPPINGS.productVariant));

        shapeFields.push(
            ...state.attributes.map(
                (attr): FieldMapping => ({
                    key: `variantAttribute.${attr}`,
                    description: `Attribute "${attr}"`,
                }),
            ),
        );
    }
    const processComponents = (components: Shape['components'], prefix: string) => {
        components?.forEach(({ id, name, type, config }) => {
            if (type === 'contentChunk' && config && 'components' in config) {
                config.components?.forEach(({ id: subid, name: subname, type: subtype }) =>
                    shapeFields.push({
                        key: `${prefix}.${id}.${subid}`,
                        description: `${name} - ${subname}`,
                        type: subtype,
                    }),
                );
                return;
            }
            shapeFields.push({
                key: `${prefix}.${id}`,
                description: name,
                type,
            });
        });
    };
    processComponents(state.selectedShape.components, 'components');
    processComponents(state.selectedShape.variantComponents, 'variantComponents');

    const selectedShapeField = shapeFields.find(({ key }) => state.mapping[key] === title);
    const availableShapeFields = shapeFields.filter(({ key }) => !state.mapping[key]);
    const basicItemFields = availableShapeFields.filter(({ key }) => key.startsWith('item.'));
    const productVariantFields = availableShapeFields.filter(({ key }) => key.startsWith('variant.'));
    const productVariantAttributeFields = availableShapeFields.filter(({ key }) => key.startsWith('variantAttribute.'));
    const itemComponentsFields = availableShapeFields.filter(({ key }) => key.startsWith('components.'));
    const variantComponentFields = availableShapeFields.filter(({ key }) => key.startsWith('variantComponents.'));

    const onChange = (key: string) => {
        const newMapping = {
            ...state.mapping,
            [key]: title,
        };
        if (selectedShapeField?.key) {
            delete newMapping[selectedShapeField.key];
        }

        dispatch.updateMapping(newMapping);
        setIsPopoverOpen(!isPopoverOpen);
    };

    const subFolderMapped = state.subFolderMapping?.find((folderM) => folderM.column === title);
    return (
        <>
            <span style={{ flexGrow: 1 }}>{title}</span>
            <Popover
                onClickOutside={() => setIsPopoverOpen(false)}
                isOpen={isPopoverOpen}
                positions={['bottom']}
                content={
                    <div className="popover">
                        <>
                            <h3 className="popover-list-title">Categories</h3>
                            <p className="italic text-gray-300 text-xs pt-2 pl-2 pr-2 m-0">
                                Create a subfolder from that column.
                            </p>
                            <ul className="popover-list">
                                {state.shapes
                                    .filter((shape) => shape.type === 'folder')
                                    .map((shape) => (
                                        <li
                                            className={`popover-item ${subFolderMapped?.shapeIdentifier === shape.identifier ? 'font-bold' : ''}`}
                                            key={shape.identifier}
                                            onClick={() => {
                                                const newMapping = [
                                                    // we remove the existing one and put it back at the end of the array if so
                                                    ...(state.subFolderMapping?.filter(
                                                        (folderM) => folderM.column !== title,
                                                    ) ?? []),
                                                    {
                                                        column: title,
                                                        shapeIdentifier: shape.identifier,
                                                    },
                                                ];
                                                dispatch.updateSubFolderMapping(newMapping);
                                                setIsPopoverOpen(!isPopoverOpen);
                                            }}
                                        >
                                            {shape.name}
                                        </li>
                                    ))}
                                {subFolderMapped && (
                                    <li
                                        className="popover-item popover-item-remove"
                                        onClick={() => {
                                            // just remove the existing one
                                            const newMapping = state.subFolderMapping?.filter(
                                                (folderM) => folderM.column !== title,
                                            );
                                            dispatch.updateSubFolderMapping(newMapping);
                                            setIsPopoverOpen(!isPopoverOpen);
                                        }}
                                    >
                                        <span style={{ flexGrow: 1, textAlign: 'left' }}>Clear</span> <BsTrashFill />
                                    </li>
                                )}
                            </ul>
                        </>
                        <hr className="w-2/3" />
                        <h3 className="popover-list-title">Field Mapping</h3>
                        <p className="italic text-gray-300 text-xs pt-2 pl-2 pr-2 m-0">One to one mapping.</p>
                        {!!basicItemFields.length && (
                            <ColumnMapperList
                                title="Item Details"
                                shapeFields={basicItemFields}
                                selectedShapeField={selectedShapeField}
                                onChange={onChange}
                            />
                        )}
                        {!!productVariantFields.length && (
                            <ColumnMapperList
                                title="Product Variants"
                                shapeFields={productVariantFields}
                                selectedShapeField={selectedShapeField}
                                onChange={onChange}
                            />
                        )}
                        {!!productVariantAttributeFields.length && (
                            <ColumnMapperList
                                title="Product Variant Attributes"
                                shapeFields={productVariantAttributeFields}
                                selectedShapeField={selectedShapeField}
                                onChange={onChange}
                            />
                        )}
                        {!!itemComponentsFields.length && (
                            <ColumnMapperList
                                title="Item Components"
                                shapeFields={itemComponentsFields}
                                selectedShapeField={selectedShapeField}
                                onChange={onChange}
                            />
                        )}
                        {!!variantComponentFields.length && (
                            <ColumnMapperList
                                title="Product Variant Components"
                                shapeFields={variantComponentFields}
                                selectedShapeField={selectedShapeField}
                                onChange={onChange}
                            />
                        )}
                        {selectedShapeField && (
                            <li className="popover-item popover-item-remove" onClick={() => onChange('')}>
                                <span style={{ flexGrow: 1, textAlign: 'left' }}>Clear</span> <BsTrashFill />
                            </li>
                        )}
                    </div>
                }
            >
                <button
                    className={cn('popover-button', selectedShapeField || subFolderMapped ? 'mapped' : '')}
                    onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                >
                    <span style={{ flexGrow: 1, textAlign: 'left' }}>
                        {selectedShapeField ? selectedShapeField.description : 'Choose Mapping'}
                    </span>{' '}
                    <AiFillCaretDown />
                </button>
            </Popover>
        </>
    );
};
