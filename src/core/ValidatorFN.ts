import { SYM_SCHEMA_CHECK, SYM_SCHEMA_COLLECTION, SYM_SCHEMA_OBJECT } from '../constants';
import { TypeWrapper } from '../types/Wrapper';
import { ISchema, ISchemaConfig, ISchemas, parserFN } from './ParserFN';

export class ValidatorFN {
    private static _validateSync (schema: ISchema, data: any) {
      // console.log(schema[SYM_SCHEMA_CHECK]);
        if (schema.hasOwnProperty(SYM_SCHEMA_CHECK))
            schema[SYM_SCHEMA_CHECK](data);
        if (schema.hasOwnProperty(SYM_SCHEMA_OBJECT))
            ValidatorFN.validateSync(schema[SYM_SCHEMA_OBJECT] as ISchema, data);
        if (schema.hasOwnProperty(SYM_SCHEMA_COLLECTION)) {
            if (!data[Symbol.iterator]) throw {};
            for (const value of data)
                ValidatorFN.validateSync(schema[SYM_SCHEMA_COLLECTION] as ISchema, value);
        }
    }

    private static async _validate (schema: ISchema, data: any) {
        if (schema.hasOwnProperty(SYM_SCHEMA_CHECK))
            await Promise.all((schema[SYM_SCHEMA_CHECK] as any[]).map((fn: any) => fn()));
        if (schema.hasOwnProperty(SYM_SCHEMA_OBJECT))
            await ValidatorFN._validate(schema[SYM_SCHEMA_OBJECT] as ISchema, data);
        if (schema.hasOwnProperty(SYM_SCHEMA_COLLECTION))
            if (!data[Symbol.iterator]) throw {};
            else await Promise.all([...data].map((value) => ValidatorFN
                ._validate(schema[SYM_SCHEMA_COLLECTION] as ISchema, value)));

    }

    public static validateSync (schema: ISchema, data: any) {
            return ValidatorFN._validateSync(schema, data);
    }

    public static validate (schema: ISchema, data: any) {
        return ValidatorFN.
            _validate(schema, data)
            .then(() => [undefined, data])
            .catch((err) => [err, data]);
    }

    [k: string]: (d: any) => any[];

    constructor (types: TypeWrapper, schemas: ISchemas, config: ISchemaConfig) {
        const _schemas = parserFN(types, schemas, config);
        for (const [schemaName, schema] of Object.entries(_schemas)) {
            this[`${schemaName}Sync`] = ValidatorFN.validateSync.bind(undefined, schema);
            this[schemaName] = ValidatorFN.validate.bind(undefined, schema);
        }
    }
}
