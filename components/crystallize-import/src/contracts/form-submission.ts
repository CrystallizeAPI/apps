export interface FormSubmission {
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
    invalidFlowStage?: string;
}
