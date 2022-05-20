export * from './item';
export * from './tenant';

type ItemFieldKey =
    | 'id'
    | 'name'
    | 'path'
    | 'externalReference'
    | 'createdAt'
    | 'updatedAt'
    | 'components'
    | 'topics.id'
    | 'topics.path'
    | 'variants.id'
    | 'variants.name'
    | 'variants.sku'
    | 'variants.attributes'
    | 'variants.priceVariant'
    | 'variants.stockLocations'
    | 'variants.subscriptionPlans'
    | 'variants.images';

export interface ItemsExportOptions {
    publishedOnly?: boolean;
    pathPrefix?: string;
    shapeIdentifiers?: string[];
    languages?: string[];
    includeFields?: ItemFieldKey[];
    includeComponents?: string[];
    customMapping?: {
        fields?: Record<ItemFieldKey, string>;
        componentIds?: Record<string, string>;
    };
}

export interface FileOptions {
    format: 'xlsx' | 'csv' | 'json' | 'xml' | 'pdf';
    name?: string;
    prefix?: string;
    compress?: boolean;
}

export interface ExportRequest {
    type: 'items' | 'shapes' | 'orders';
    file: FileOptions;
    items?: ItemsExportOptions;
    shapes?: {
        identifiers?: string[];
    };
    orders?: {
        customerIdentifier?: string;
        pipelineId?: string;
        pipelineStageId?: string;
        sort?: {
            field: 'createdAt' | 'updatedAt';
            direction: 'asc' | 'desc';
        };
    };
}
