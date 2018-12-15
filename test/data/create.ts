import faker from 'faker';
import { SYM_SCHEMA_PROPERTIES } from '../../src/constants';
import { ISchema } from '../../src/core/Compilation';
import { SYM_FAKER } from '../utils';

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

export interface ICreateInputSchema extends ISchema {
    [SYM_FAKER]?: (() => any) | [string, any[]?];
}

export function createData (schema: ICreateInputSchema) {
    let result: { [k: string]: any } = {};
    let touched = false;
    if (schema.hasOwnProperty(SYM_FAKER)) {
        touched = true;
        result = typeof schema[SYM_FAKER] === 'function'
            ? (schema[SYM_FAKER] as () => any)()
            : callFaker(schema[SYM_FAKER] as [string, any[]]);
    }
    if (schema.hasOwnProperty(SYM_SCHEMA_PROPERTIES))
        for (const [field, subschema] of Object.entries(schema[SYM_SCHEMA_PROPERTIES]!)) {
            const data = createData(subschema as ICreateInputSchema);
            if (data !== undefined) {
                touched = true;
                result[field] = data;
            }
        }
    return touched ? result : undefined ;
}
