export interface TenantQueryResponse {
    tenant: {
        get: {
            shapes: Shape[];
        };
    };
}

export interface FolderQueryResponse {
    search: {
        edges: {
            node: Folder;
        }[];
    };
}

export interface Shape {
    identifier: string;
    name: string;
    type: string;
    components: {
        id: string;
        name: string;
        type: string;
    }[];
}

export interface Folder {
    name: string;
    path: string;
}
