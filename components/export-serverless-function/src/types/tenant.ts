export interface Tenant {
    id: string;
    shapes: {
        identifier: string;
    }[];
    availableLanguages: {
        code: string;
    }[];
}
