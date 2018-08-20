import { TypeWrapper } from '../types/Wrapper';
import { ISchemas, parser } from './Parser';

export class VJS {
    [k: string]: (d: any) => string | undefined;

    constructor (types: TypeWrapper, schemas: ISchemas) {
        for (const [schemaName, schema] of Object.entries(parser(types, schemas)))
            this[schemaName] = schema;
    }
}
