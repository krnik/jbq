import faker from 'faker';
import { SYM_SCHEMA_COLLECTION, SYM_SCHEMA_FLAT, SYM_SCHEMA_OBJECT, TYPE } from '../../constants';

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

export function createData (patterns: { [k: string]: any }) {
    const result: { [k: string]: any } = {};
    for (const [field, reqs] of Object.entries(patterns)) {
        if (!reqs.hasOwnProperty(TYPE))
            result[field] = createData(reqs);
        if (reqs[SYM_SCHEMA_FLAT]) {
            if (reqs[SYM_SCHEMA_OBJECT])
                result[field] = createData({ x: reqs[SYM_SCHEMA_OBJECT] }).x;
            if (reqs[SYM_SCHEMA_COLLECTION])
                result[field] = new Array(3).fill(0).map(() => createData({ x: reqs[SYM_SCHEMA_COLLECTION] }).x);
        } else {
            if (reqs[SYM_SCHEMA_OBJECT])
                result[field] = createData(reqs[SYM_SCHEMA_OBJECT]);
            if (reqs[SYM_SCHEMA_COLLECTION])
                result[field] = new Array(3).fill(0).map(() => createData(reqs[SYM_SCHEMA_COLLECTION]));
        }
        if (reqs[FAKER])
            if (typeof reqs[FAKER] === 'function')
                result[field] = reqs[FAKER]();
            else {
                const [path, args] = (reqs[FAKER] as [string, any[]]);
                result[field] = reqs[SYM_SCHEMA_COLLECTION]
                ? new Array(3).fill(0).map(() => callFaker(path, args))
                : callFaker(path, args);
            }
    }
    return result;
}
