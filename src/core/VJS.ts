import { TypeWrapper } from '../types/Wrapper';
import { ISchemas, parser } from './Parser';

export class VJS {
    private static validateSync (fn: any, data: any) {
        const err = fn(data);
        if (err) return err;
    }

    [k: string]: {
        validSync: (d: any) => string | undefined;
    };

    constructor (types: TypeWrapper, schemas: ISchemas) {
        for (const [schemaName, schema] of Object.entries(parser(types, schemas)))
            this[schemaName] = {
                validSync: VJS.validateSync.bind(undefined, schema),
            };
    }
}
