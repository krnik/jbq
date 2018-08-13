import faker from 'faker';
import { SYM_SCHEMA_COLLECTION, SYM_SCHEMA_PROPERTIES } from '../../constants';

const SYM_FAKER = Symbol.for('faker') as any;

export function callFaker (fakerArgs: [string, any[]]) {
    const [path, args] = fakerArgs;
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
        if (reqs[SYM_FAKER])
            if (typeof reqs[SYM_FAKER] === 'function')
                result[field] = reqs[SYM_FAKER]();
            else result[field] = reqs[SYM_SCHEMA_COLLECTION]
                ? new Array(3).fill(0).map(() => callFaker(reqs[SYM_FAKER]))
                : callFaker(reqs[SYM_FAKER]);
    }
    return result;
}
