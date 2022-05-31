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

export interface Item {
    id: string;
    name: string;
    path: string;
    externalReference?: string;
    createdAt: string;
    updatedAt?: string;
    shape: {
        identifier: string;
    };
    topics?: {
        id: string;
        path: string;
    }[];
    components: {
        id: string;
        content: any; // TODO
    }[];
}

export interface Product extends Item {
    variants: {
        name: string;
        sku: string;
        stock: number;
        price: number;
        attributes: {
            attribute: string;
            value: string;
        }[];
        images: {
            url: string;
        }[];
    }[];
}
