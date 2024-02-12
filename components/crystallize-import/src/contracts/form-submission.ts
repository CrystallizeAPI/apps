export interface FormSubmission {
    shapeIdentifier: string;
    folderPath: string;
    rows: Record<string, any>[];
    mapping: Record<string, string>;
    groupProductsBy?: string;
    doPublish: boolean;
    validFlowStage?: string;
    invalidFlowStage?: string;
}
