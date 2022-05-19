export interface Item {
    id: string;
    name: string;
    tree: {
        path: string;
    };
    externalReference?: string;
    createdAt: string;
    updatedAt?: string;
    version?: {
        label: string;
    };
    topics?: {
        id: string;
        path: string;
    }[];
    components: {
        componentId: string;
        content: any; // TODO
    }[];
}
