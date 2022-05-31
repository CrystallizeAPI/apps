export interface TenantQueryResponse {
    tenant: {
        get: {
            shapes: Shape[];
        };
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
