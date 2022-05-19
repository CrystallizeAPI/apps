export const exportItemsByShape = async (shapeIdentifier: string): Promise<any[]> => {
    return [];
};

export const exportItems = async (shapeIdentifiers: string[]): Promise<Record<string, any[]>> => {
    const shapeItems: Record<string, any[]> = {};

    for (const identifier in shapeIdentifiers) {
        const items = await exportItemsByShape(identifier);
        shapeItems[identifier] = items;
    }

    return shapeItems;
};
