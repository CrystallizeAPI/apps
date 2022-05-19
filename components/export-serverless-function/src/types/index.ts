export * from './item';
export * from './tenant';

export interface ItemsExportOptions {
    shapeIdentifiers?: string[];
    languages: string[];
}

export interface ExportRequest {
    type: 'items' | 'shapes' | 'orders';
    format: 'xlsx' | 'csv' | 'json' | 'pdf';
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
