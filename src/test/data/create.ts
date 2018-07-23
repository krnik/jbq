import { IPatternsInput } from 'core/PatternParser';
import faker from 'faker';
import { SYM, TYPE_METHOD } from '../../constants';

const FAKER = Symbol.for('faker') as any;

function callFaker (path: string, args: any[]) {
    const props = path.split('.');
    let fn = faker;
    let i = 0;
    while (i < props.length) {
        // @ts-ignore
        fn = fn[props[i]];
        i++;
    }
    // @ts-ignore
    return fn(...(Array.isArray(args) ? args : [args]));
}

export function createData (patterns: IPatternsInput) {
    const result: { [k: string]: any } = {};
    for (const [field, reqs] of Object.entries(patterns)) {
        if (!reqs.hasOwnProperty(TYPE_METHOD.TYPE)) result[field] = createData(reqs);
        if (reqs[SYM.FLAT]) {
            if (reqs[SYM.OBJECT]) result[field] = createData({ x: reqs[SYM.OBJECT] }).x;
            if (reqs[SYM.COLLECTION]) result[field] = new Array(3).fill(0).map(() => createData({ x: reqs[SYM.COLLECTION] }).x);
        } else {
            if (reqs[SYM.OBJECT]) result[field] = createData(reqs[SYM.OBJECT]);
            if (reqs[SYM.COLLECTION]) result[field] = new Array(3).fill(0).map(() => createData(reqs[SYM.COLLECTION]));
        }

        if (reqs[FAKER]) {
            const [path, args] = (reqs[FAKER] as [string, any[]]);
            result[field] = reqs[SYM.COLLECTION]
                ? new Array(3).fill(0).map(() => callFaker(path, args))
                : callFaker(path, args);
        }
    }
    return result;
}
