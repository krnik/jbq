import { TYPE, TYPE_NAME, SYM_SCHEMA_PROPERTIES, SYM_SCHEMA_COLLECTION } from '../misc/constants';
import { Schema } from '../core/compilation/interface/schema.interface';

const SCHEMA_CLASS = Symbol('schema_class');

interface ValidatorClass extends Function {
    [SCHEMA_CLASS]: ClassValidatorBuilder;
}

type SchemaProps = Exclude<Schema[typeof SYM_SCHEMA_PROPERTIES], undefined>;

export class ClassValidatorBuilder {
    public static extract(constructor: Function): ClassValidatorBuilder {
        if (!constructor.hasOwnProperty(SCHEMA_CLASS))
            Object.defineProperty(constructor, SCHEMA_CLASS, {
                value: new ClassValidatorBuilder(),
            });

        return (constructor as ValidatorClass)[SCHEMA_CLASS];
    }

    private schema: Schema = {};

    public constructor() {
        this.schema = {
            [TYPE]: TYPE_NAME.OBJECT,
        };
    }

    public append(
        this: ClassValidatorBuilder,
        schemaProperty: string | symbol,
        schemaValue: unknown,
    ): ClassValidatorBuilder {
        this.schema[schemaProperty as string] = schemaValue;
        return this;
    }

    public appendToSubSchema(
        this: ClassValidatorBuilder,
        schemaProperty: string | symbol,
        schemaValue: unknown,
        property: string | symbol,
    ): ClassValidatorBuilder {
        const subSchema = this.getSubSchemas();

        if (!subSchema.hasOwnProperty(property)) subSchema[property as string] = {};

        subSchema[property as string][schemaProperty as string] = schemaValue;

        return this;
    }

    public setSymbolSchemaProperty(
        this: ClassValidatorBuilder,
        symbol: typeof SYM_SCHEMA_PROPERTIES | typeof SYM_SCHEMA_COLLECTION,
        subSchemas: ClassValidatorBuilder,
        property?: string | symbol,
    ): ClassValidatorBuilder {
        const target =
            symbol === SYM_SCHEMA_PROPERTIES ? subSchemas.schema[symbol] : subSchemas.schema;
        if (property !== undefined) {
            const subSchema = this.getSubSchemas();

            if (!subSchema.hasOwnProperty(property)) subSchema[property as string] = {};

            subSchema[property as string][symbol] = target;
        } else {
            this.schema[symbol] = target;
        }
        return this;
    }

    private getSubSchemas(this: ClassValidatorBuilder): SchemaProps {
        if (!this.schema.hasOwnProperty(SYM_SCHEMA_PROPERTIES))
            this.schema[SYM_SCHEMA_PROPERTIES] = {};

        return this.schema[SYM_SCHEMA_PROPERTIES] as SchemaProps;
    }
}
