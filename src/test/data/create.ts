import faker from 'faker';
import { SYM_SCHEMA_COLLECTION, SYM_SCHEMA_PROPERTIES } from '../../constants';

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
        if (reqs[SYM_SCHEMA_PROPERTIES])
            result[field] = createData(reqs[SYM_SCHEMA_PROPERTIES]);
        if (reqs[SYM_SCHEMA_COLLECTION])
            result[field] = new Array(~~(Math.random() * 20))
                .fill(0).map(() => createData({ [field]: reqs[SYM_SCHEMA_COLLECTION] })[field]);
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
