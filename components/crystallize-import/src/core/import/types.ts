import { Item } from '@crystallize/schema/item';
import { Shape } from '@crystallize/schema/shape';

export type Action =
    | {
          type: 'UPDATE_SELECTED_SHAPE';
          shape: Shape;
      }
    | {
          type: 'UPDATE_SELECTED_FOLDER';
          folder: Item;
      }
    | {
          type: 'UPDATE_GROUP_PRODUCTS_BY';
          groupProductsBy: string;
      }
    | {
          type: 'UPDATE_ROWS';
          rows: Record<string, any>[];
      }
    | {
          type: 'UPDATE_HEADERS';
          headers: string[];
      }
    | {
          type: 'UPDATE_MAPPING';
          mapping: Record<string, string>;
      }
    | {
          type: 'UPDATE_PRODUCT_VARIANT_ATTRIBUTES';
          attributes: string[];
      };

export type Actions = {
    updateSelectedShape: (shape: Shape) => void;
    updateSelectedFolder: (folder: Item) => void;
    updateGroupProductsBy: (groupProductsBy: string) => void;
    updateRows: (rows: Record<string, any>[]) => void;
    updateHeaders: (headers: string[]) => void;
    updateMapping: (mapping: Record<string, string>) => void;
    updateProductVariantAttributes: (attributes: string[]) => void;
};

export type Dispatch = (action: Action) => void;

export type State = {
    shapes: Shape[];
    folders: Item[];
    selectedShape: Shape;
    selectedFolder: Item;
    headers: string[];
    attributes: string[];
    rows: Record<string, any>[];
    mapping: Record<string, string>;
    groupProductsBy?: string;
    error?: string;
    loading?: boolean;
    done?: boolean;
};

export type FieldMapping = {
    key: string;
    description: string;
    type?: string;
};

export const FIELD_MAPPINGS: Record<string, Record<string, FieldMapping>> = {
    item: {
        name: {
            key: 'item.name',
            description: 'Item Name',
        },
        externalReference: {
            key: 'item',
            description: 'Item External Reference',
        },
    },
    productVariant: {
        name: {
            key: 'variant.name',
            description: 'Variant Name',
        },
        sku: {
            key: 'variant.sku',
            description: 'Variant SKU',
        },
        images: {
            key: 'variant.images',
            description: 'Variant Images',
        },
        price: {
            key: 'variant.price',
            description: 'Variant Price',
        },
        stock: {
            key: 'variant.stock',
            description: 'Variant Stock',
        },
        externalReference: {
            key: 'variant.externalReference',
            description: 'Variant External Reference',
        },
    },
};
