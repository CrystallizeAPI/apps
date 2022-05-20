export interface Item {
    id: string;
    name: string;
    hasVersion: boolean;
    tree: {
        path: string;
    };
    externalReference?: string;
    createdAt: string;
    updatedAt?: string;
    topics?: {
        id: string;
        path: string;
    }[];
    components: {
        componentId: string;
        content: any; // TODO
    }[];
}
