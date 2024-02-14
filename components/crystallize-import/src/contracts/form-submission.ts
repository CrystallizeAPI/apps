export interface FormSubmission {
    importId?: string;
    shapeIdentifier: string;
    folderPath: string;
    rows: Record<string, any>[];
    mapping: Record<string, string>;
    subFolderMapping: {
        column: string;
        shapeIdentifier: string;
    }[];
    groupProductsBy?: string;
    doPublish: boolean;
    channel?: string;
    validFlowStage?: string;
    roundPrices?: boolean;
    invalidFlowStage?: string;
}
