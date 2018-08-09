import { SYM_SCHEMA_CHECK, SYM_SCHEMA_COLLECTION, SYM_SCHEMA_OBJECT } from '../constants';
import { TypeWrapper } from '../types/Wrapper';
import { ISchema, ISchemaConfig, ISchemas, parser } from './Parser';

export class Validator {
    public static validateSync (schema: ISchema, data: any) {
        return Validator._validateSync(schema, data);
    }

    public static validate (schema: ISchema, data: any) {
        return Validator.
            _validate(schema, data)
            .catch((err) => [err, data]);
    }

    private static _validateSync (schema: ISchema, data: any): string | undefined {
        if (schema.hasOwnProperty(SYM_SCHEMA_CHECK)) {
            const err = (schema[SYM_SCHEMA_CHECK] as (v: any) => void)(data);
            if (err) return err;
        }
        if (schema.hasOwnProperty(SYM_SCHEMA_OBJECT)) {
            const err = Validator.validateSync(schema[SYM_SCHEMA_OBJECT] as ISchema, data);
            if (err) return err;
        }
        if (schema.hasOwnProperty(SYM_SCHEMA_COLLECTION)) {
            // TODO: add missing iterator error
            if (!data[Symbol.iterator]) throw {};
            for (const value of data) {
                const err = Validator.validateSync(schema[SYM_SCHEMA_COLLECTION] as ISchema, value);
                if (err) return err;
            }
        }
    }

    private static async _validate (schema: ISchema, data: any) {
        if (schema.hasOwnProperty(SYM_SCHEMA_CHECK))
            await schema[SYM_SCHEMA_CHECK];
        if (schema.hasOwnProperty(SYM_SCHEMA_OBJECT))
            await Validator._validate(schema[SYM_SCHEMA_OBJECT] as ISchema, data);
        if (schema.hasOwnProperty(SYM_SCHEMA_COLLECTION))
            if (!data[Symbol.iterator]) throw {};
            else await Promise.all([...data].map((value) => Validator
                ._validate(schema[SYM_SCHEMA_COLLECTION] as ISchema, value)));

    }

    [k: string]: (d: any) => any[];

    constructor (types: TypeWrapper, schemas: ISchemas, config: ISchemaConfig) {
        for (const [schemaName, schema] of Object.entries(parser(types, schemas, config))) {
            this[`${schemaName}Sync`] = Validator.validateSync.bind(undefined, schema);
            this[schemaName] = Validator.validate.bind(undefined, schema);
        }
    }
}
