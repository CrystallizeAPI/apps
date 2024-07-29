import { inspect } from 'util';

export const dump = (obj: any, depth = 100) => {
    console.log(inspect(obj, false, depth, true));
};
