import { inspect } from 'util';

export const dump = (obj: unknown, depth = 100) => {
    console.log(inspect(obj, false, depth, true));
};
