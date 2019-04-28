import { TYPE, TYPE_NAME, SYM_SCHEMA_PROPERTIES, SYM_SCHEMA_COLLECTION } from '../misc/constants';
import { Schema } from '../core/compilation/interface/schema.interface';

export const SCHEMA = Symbol('schema');

interface ValidatorClass extends Function {
    [SCHEMA]: ClassValidatorBuilder;
}

type SchemaProps = Exclude<Schema[typeof SYM_SCHEMA_PROPERTIES], undefined>;

type Property = string | symbol;

/** Utility class used to build schema for a class. */
export class ClassValidatorBuilder {
    /**
     * Ensures that constructor has a property which is an instance
     * of ClassValidatorBuilder.
     */
    public static extract(constructor: Function): ClassValidatorBuilder {
        if (!constructor.hasOwnProperty(SCHEMA))
            Object.defineProperty(constructor, SCHEMA, {
                value: new ClassValidatorBuilder(),
            });

        return (constructor as ValidatorClass)[SCHEMA];
    }

    /** Object storing schema definition. */
    private schema: Schema = {};
    /** Set of all decorated properties. */
    private properties: Set<Property> = new Set();
    /** Set of functions that are used to produce default values for properties. */
    private defaults: Map<Property, CallableFunction> = new Map();
    /** Set of functions that are used to transform instance properties. */
    private transforms: Map<Property, CallableFunction> = new Map();

    public constructor() {
        this.schema = {
            [TYPE]: TYPE_NAME.OBJECT,
        };
    }

    /** Returns schema property of builder instance. */
    public getSchema(this: ClassValidatorBuilder): Schema {
        return this.schema;
    }

    /** Returns properties property of builder instance. */
    public getProperties(this: ClassValidatorBuilder): Set<Property> {
        return this.properties;
    }

    /** Returns defaults property of builder instance. */
    public getDefaults(this: ClassValidatorBuilder): Map<Property, CallableFunction> {
        return this.defaults;
    }

    /** Returns transforms property of builder instance. */
    public getTransforms(this: ClassValidatorBuilder): Map<Property, CallableFunction> {
        return this.transforms;
    }

    /**
     * Adds a property to a schema at the root level.
     *
     * # Examples
     *
     *      const builder = ClassValidatorBuilder.extract(SomeClass);
     *      Object.getOwnPropertyNames(builder.schema); // ['type']
     *      // schema
     *      { type: 'object' };
     *
     *
     *      builder.append('volume', '100m3');
     *      Object.getOwnPropertyNames(builder.schema); // ['type', 'volume']
     *      // schema
     *      {
     *          type: 'object',
     *          volume: '100m3',
     *      };
     */
    public append(
        this: ClassValidatorBuilder,
        schemaProperty: Property,
        schemaValue: unknown,
    ): ClassValidatorBuilder {
        this.schema[schemaProperty as string] = schemaValue;
        return this;
    }

    /**
     * Works similarly to `.append` method but it will append the schema property
     * to one of properties of `Symbol.for('schema_properties')` property builder' schema.
     *
     * # Examples
     *
     *      const builder = ClassValidatorBuilder.extract(SomeClass);
     *      // schema
     *      { type: 'object' };
     *
     *      builder.appendToSchema('type', 'string', 'name');
     *      // schema
     *      {
     *          type: 'object',
     *          [Symbol.for('schema_properties')]: {
     *              name: { type: 'string' },
     *          },
     *      };
     */
    public appendToSubSchema(
        this: ClassValidatorBuilder,
        schemaProperty: Property,
        schemaValue: unknown,
        property: Property,
    ): ClassValidatorBuilder {
        const subSchema = this.getSubSchemas();

        if (!subSchema.hasOwnProperty(property)) subSchema[property as string] = {};

        subSchema[property as string][schemaProperty as string] = schemaValue;
        this.properties.add(property);

        return this;
    }

    /**
     * This method is used to set either `Symbol.for('schema_properties')` or
     * `Symbol.for('schema_collection')` properties of the builder' schema.
     *
     * If `property` argument is provided then `Symbol.for('schema_properties')` property
     * will be extended. Otherwise `schema_collection` property will be extended.
     *
     * # Examples
     *
     *      const builder = ClassValidatorBuilder.extract(SomeClass);
     *      // builder schema
     *      { type: 'object' };
     *      const other = ClassValidatorBuilder.extract(OtherClass);
     *      // other schema
     *      { type: 'number' }
     *
     *      builder.setSymbolSchemaProperty(
     *          Symbol.for('schema_collection'),
     *          other,
     *      );
     *      // builder schema
     *      {
     *          type: 'object',
     *          [Symbol.for('schema_collection')]: { type: 'number' }
     *      }
     *
     *      builder.setSymbolSchemaProperty(
     *          Symbol.for('schema_properties'),
     *          other,
     *          'age',
     *      );
     *      // builder schema
     *      {
     *          type: 'object',
     *          [Symbol.for('schema_collection')]: { type: 'number' },
     *          [Symbol.for('schema_properties')]: {
     *              age: { type: 'number' },
     *          },
     *      };
     */
    public setSymbolSchemaProperty(
        this: ClassValidatorBuilder,
        symbol: typeof SYM_SCHEMA_PROPERTIES | typeof SYM_SCHEMA_COLLECTION,
        subSchemas: ClassValidatorBuilder,
        property?: Property,
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

    /** Add function that will produce default value for a `property`. */
    public addDefault(this: ClassValidatorBuilder, property: Property, fn: CallableFunction): void {
        this.defaults.set(property, fn);
        this.properties.add(property);
    }

    /** Add function that will transform value of a `property`. */
    public addTransform(
        this: ClassValidatorBuilder,
        property: Property,
        fn: CallableFunction,
    ): void {
        this.transforms.set(property, fn);
        this.properties.add(property);
    }

    /** Ensures that schema has `Symbol.for('schema_properties')` property and returns it. */
    private getSubSchemas(this: ClassValidatorBuilder): SchemaProps {
        if (!this.schema.hasOwnProperty(SYM_SCHEMA_PROPERTIES))
            this.schema[SYM_SCHEMA_PROPERTIES] = {};

        return this.schema[SYM_SCHEMA_PROPERTIES] as SchemaProps;
    }
}
