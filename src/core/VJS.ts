import { TypeWrapper } from '../types/Wrapper';
import { ISchemas, parser } from './Parser';

type VJSValidators<T> = {
    [K in keyof T]: (d: any) => string | undefined;
};

export function VJS<T extends ISchemas> (types: TypeWrapper, schemas: T) {
    const result = {} as VJSValidators<T>;
    for (const [schemaName, schema] of Object.entries(parser(types, schemas))) {
        result[schemaName] = schema;
    }
    return result;
}
