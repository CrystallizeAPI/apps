import { Item } from '@crystallize/schema';
import { Shape } from '@crystallize/schema';

export type Action =
    | {
          type: 'UPDATE_SELECTED_SHAPE';
          shape: State['selectedShape'];
      }
    | {
          type: 'UPDATE_SELECTED_FOLDER';
          folder: State['selectedFolder'];
      }
    | {
          type: 'UPDATE_GROUP_PRODUCTS_BY';
          groupProductsBy: State['groupProductsBy'];
      }
    | {
          type: 'UPDATE_SPREADSHEET';
          headers: State['headers'];
          rows: State['rows'];
      }
    | {
          type: 'UPDATE_MAPPING';
          mapping: State['mapping'];
      }
    | {
          type: 'UPDATE_SUB_FOLDER_MAPPING';
          mapping: State['subFolderMapping'];
      }
    | {
          type: 'UPDATE_PRODUCT_VARIANT_ATTRIBUTES';
          attributes: State['attributes'];
      }
    | {
          type: 'UPDATE_LOADING';
          loading: State['loading'];
      }
    | {
          type: 'UPDATE_DONE';
          done: State['done'];
      }
    | {
          type: 'UPDATE_PREFLIGHT';
          preflight: State['preflight'];
      }
    | {
          type: 'UPDATE_MAIN_ERRORS';
          errors: State['errors'];
      };
export type Actions = {
    updateSelectedShape: (shape: State['selectedShape']) => void;
    updateSelectedFolder: (folder: State['selectedFolder']) => void;
    updateGroupProductsBy: (groupProductsBy: State['groupProductsBy']) => void;
    updateSpreadsheet: (headers: State['headers'], rows: State['rows']) => void;
    updateMapping: (mapping: State['mapping']) => void;
    updateSubFolderMapping: (mapping: State['subFolderMapping']) => void;
    updateProductVariantAttributes: (attributes: State['attributes']) => void;
    updateDone: (done: State['done']) => void;
    updateLoading: (loading: State['loading']) => void;
    updatePreflight: (preflight: State['preflight']) => void;
    updateMainErrors: (errors: State['errors']) => void;
};

export type Dispatch = (action: Action) => void;

export type State = {
    shapes: Shape[];
    folders: Item[];
    flows: {
        name: string;
        identifier: string;
        shapeRestrictions: string[];
        stages: Record<string, string>;
    }[];
    selectedShape: Shape;
    selectedFolder: Item;
    headers: string[];
    attributes: string[];
    rows: Record<string, any>[];
    // in the form of `path.to.field: "Spreadsheet Column Name"`
    mapping: Record<string, string>;
    // categorize/folderize, in the form of `path.to.field`
    subFolderMapping: {
        column: string;
        shapeIdentifier: string;
    }[];
    groupProductsBy?: string;
    errors?: string[];
    loading?: boolean;
    done?: boolean;
    channels: Record<string, string[]>;
    importId: string;
    preflight?: {
        validCount: number;
        errorCount: number;
        errors: {
            item: any;
            errors: any[];
        }[];
    };
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
