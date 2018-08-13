import { SYM_SCHEMA_CHECK, SYM_SCHEMA_COLLECTION, SYM_SCHEMA_PROPERTIES } from '../constants';
import { TypeWrapper } from '../types/Wrapper';
import { checkFunction, ISchema, ISchemaConfig, ISchemas, parser } from './Parser';

export class VJS {
    public static validateSync (schema: ISchema, data: any) {
        return VJS._validateSync(schema, data);
    }

    public static validate (schema: ISchema, data: any) {
        return VJS._validate(schema, data);
    }

    private static _validateSync (schema: ISchema, data: any): string | undefined {
        if (schema.hasOwnProperty(SYM_SCHEMA_CHECK)) {
            const err = (schema[SYM_SCHEMA_CHECK] as checkFunction)(data);
            if (err) return err;
        }
        if (schema.hasOwnProperty(SYM_SCHEMA_PROPERTIES))
            for (const key of Object.keys(schema[SYM_SCHEMA_PROPERTIES] as ISchemas)) {
                const err = VJS._validateSync((schema[SYM_SCHEMA_PROPERTIES] as ISchemas)[key], data[key]);
                if (err) return err;
            }
        if (schema.hasOwnProperty(SYM_SCHEMA_COLLECTION)) {
            if (!data[Symbol.iterator])
                return `Schema requires data to have Symbol.iterator property and it was not found. ${data}.`;
            for (const value of data) {
                const err = VJS._validateSync(schema[SYM_SCHEMA_COLLECTION] as ISchema, value);
                if (err) return err;
            }
        }
    }

    private static async _validate (schema: ISchema, data: any): Promise<string | undefined> {
        if (schema.hasOwnProperty(SYM_SCHEMA_CHECK)) {
            const err = await (schema[SYM_SCHEMA_CHECK] as checkFunction)(data);
            if (err) return err;
        }
        if (schema.hasOwnProperty(SYM_SCHEMA_PROPERTIES)) {
            for (const key of Object.keys(schema[SYM_SCHEMA_PROPERTIES] as ISchemas)) {
                const err = await VJS._validate((schema[SYM_SCHEMA_PROPERTIES] as ISchemas)[key], data[key]);
                if (err) return err;
            }
        }
        if (schema.hasOwnProperty(SYM_SCHEMA_COLLECTION))
            if (!data[Symbol.iterator])
                return `Schema requires data to have Symbol.iterator property and it was not found. ${data}.`;
            else for (const value of data) {
                const err = await VJS._validate(schema[SYM_SCHEMA_COLLECTION] as ISchema, value);
                if (err) return err;
            }
    }

    [k: string]: {
        valid: (v: any) => Promise<string | undefined>;
        validSync: (v: any) => string | undefined;
    };

    constructor (types: TypeWrapper, schemas: ISchemas, config: ISchemaConfig) {
        for (const [schemaName, schema] of Object.entries(parser(types, schemas, config))) {
            this[schemaName] = {
                valid: VJS.validate.bind(undefined, schema),
                validSync: VJS.validateSync.bind(undefined, schema),
            };
        }
    }
}
