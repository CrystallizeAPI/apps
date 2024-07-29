export const getComponentByType = (type: string, arr: any) => {
    return arr?.components?.filter((comp: any) => {
        return comp.type === type;
    });
};
