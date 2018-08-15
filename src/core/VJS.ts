import { TypeWrapper } from '../types/Wrapper';
import { ISchemaConfig, ISchemas, parser } from './Parser';

export class VJS {
    private static validateSync (fn: any, data: any) {
        const err = fn(data);
        if (err) return err;
    }

    [k: string]: {
        validSync: (v: any) => string | undefined;
    };

    constructor (types: TypeWrapper, schemas: ISchemas, config: ISchemaConfig) {
        for (const [schemaName, schema] of Object.entries(parser(types, schemas, config)))
            this[schemaName] = {
                validSync: VJS.validateSync.bind(undefined, schema),
            };
    }
}
