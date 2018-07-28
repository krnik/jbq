import { SYM_SCHEMA_CHECK, SYM_SCHEMA_COLLECTION, SYM_SCHEMA_OBJECT } from '../constants';
import { TypeWrapper } from '../types/Wrapper';
import { ISchema, ISchemaConfig, ISchemas, parser } from './Parser';

export class Validator {
    private static _validateSync (schema: ISchema, data: any) {
        if (schema.hasOwnProperty(SYM_SCHEMA_CHECK))
            for (const check of schema[SYM_SCHEMA_CHECK] as any[])
                check(data);
        if (schema.hasOwnProperty(SYM_SCHEMA_OBJECT))
            Validator.validateSync(schema[SYM_SCHEMA_OBJECT] as ISchema, data);
        if (schema.hasOwnProperty(SYM_SCHEMA_COLLECTION)) {
            if (!data[Symbol.iterator]) throw {};
            for (const value of data)
                Validator.validateSync(schema[SYM_SCHEMA_COLLECTION] as ISchema, value);
        }
    }

    private static async _validate (schema: ISchema, data: any) {
        if (schema.hasOwnProperty(SYM_SCHEMA_CHECK))
            await Promise.all((schema[SYM_SCHEMA_CHECK] as any[]).map((fn: any) => fn()));
        if (schema.hasOwnProperty(SYM_SCHEMA_OBJECT))
            await Validator._validate(schema[SYM_SCHEMA_OBJECT] as ISchema, data);
        if (schema.hasOwnProperty(SYM_SCHEMA_COLLECTION))
            if (!data[Symbol.iterator]) throw {};
            else await Promise.all([...data].map((value) => Validator
                ._validate(schema[SYM_SCHEMA_COLLECTION] as ISchema, value)));

    }

    public static validateSync (schema: ISchema, data: any) {
        try {
            Validator._validateSync(schema, data);
            return [undefined, data];
        } catch (err) {
            return [err, data];
        }
    }

    public static validate (schema: ISchema, data: any) {
        return Validator.
            _validate(schema, data)
            .then(() => [undefined, data])
            .catch((err) => [err, data]);
    }

    [k: string]: (d: any) => any[];

    constructor (types: TypeWrapper, schemas: ISchemas, config: ISchemaConfig) {
        const _schemas = parser(types, schemas, config);
        for (const [schemaName, schema] of Object.entries(_schemas)) {
            this[`${schemaName}Sync`] = Validator.validateSync.bind(undefined, schema);
            this[schemaName] = Validator.validate.bind(undefined, schema);
        }
    }
}
