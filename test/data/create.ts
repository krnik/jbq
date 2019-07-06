import faker from 'faker';
import { SYM_SCHEMA_PROPERTIES } from '../../src/misc/constants';
import { SYM_FAKER } from '../utils';
import { Schema } from '../../src/core/compilation/compilation_typings';

export function callFaker(fakerArgs: [string, unknown[]]): unknown {
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

export interface CreateInputSchema extends Schema {
    [SYM_FAKER]?: (() => unknown) | [string, unknown[]?];
}

interface FakerData {
    [k: string]: unknown;
}
export function createData(schema: CreateInputSchema): FakerData | undefined {
    let result: FakerData = {};
    let touched = false;
    if (schema.hasOwnProperty(SYM_FAKER)) {
        touched = true;
        result =
            typeof schema[SYM_FAKER] === 'function'
                ? ((schema[SYM_FAKER] as () => unknown)() as FakerData)
                : (callFaker(schema[SYM_FAKER] as [string, unknown[]]) as FakerData);
    }

    if (schema.hasOwnProperty(SYM_SCHEMA_PROPERTIES)) {
        const props = schema[SYM_SCHEMA_PROPERTIES] as Exclude<
            Schema[typeof SYM_SCHEMA_PROPERTIES],
            undefined
        >;
        for (const [field, subschema] of Object.entries(props)) {
            const data = createData(subschema as CreateInputSchema);
            if (data !== undefined) {
                touched = true;
                result[field] = data;
            }
        }
    }
    return touched ? result : undefined;
}
