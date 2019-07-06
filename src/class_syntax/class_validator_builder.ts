import { TYPE, TYPE_NAME, SYM_SCHEMA_PROPERTIES, SYM_SCHEMA_COLLECTION } from '../misc/constants';
import { Constructor, Option } from '../misc/typings';
import { Validator } from '../class_syntax';
import { Schema } from '../core/compilation/compilation_typings';

const SCHEMA = Symbol('schema');
const CREATE_INSTANCE = Symbol('create_instance');

interface ValidatorClass<T extends boolean = false> extends Constructor<Validator<T>> {
    [SCHEMA]: ClassValidatorBuilder;
    [CREATE_INSTANCE]?: true;
}

type SchemaProps = Exclude<Schema[typeof SYM_SCHEMA_PROPERTIES], undefined>;

type Property = string | symbol;

type DefaultCallback = (data: unknown) => unknown;
type TransformCallback = (propertyValue: unknown, data: unknown) => unknown;

export interface PropertyMeta {
    default: Option<DefaultCallback>;
    transform: Option<TransformCallback>;
    Constructor: Option<Constructor>;
    iterateOverData: Option<true>;
}

/** Utility class used to build schema for a class. */
export class ClassValidatorBuilder {
    /**
     * Ensures that constructor has a property which is an instance
     * of ClassValidatorBuilder.
     */
    public static extract(constructor: Function): ClassValidatorBuilder {
        if (!constructor.hasOwnProperty(SCHEMA))
            Object.defineProperty(constructor, SCHEMA, {
                value: new ClassValidatorBuilder(constructor as Constructor),
            });

        return (constructor as ValidatorClass)[SCHEMA];
    }

    public static shouldInstantiate(constructor: Function): void {
        Object.defineProperty(constructor, CREATE_INSTANCE, { value: true });
    }

    /** Object storing schema definition. */
    private schema: Schema = {};

    /**
     * Set of all decorated properties.
     */
    private propertyMeta: Map<Property, PropertyMeta> = new Map();

    /** Reference to the Constructor function */
    private constr: Constructor;
    public constructor(constructor: Constructor) {
        this.constr = constructor;
        this.schema = {
            [TYPE]: TYPE_NAME.OBJECT,
        };
    }

    /** Returns true if Class is supposed to return instance instead of supplying schema. */
    public shouldCreateInstance(this: ClassValidatorBuilder): boolean {
        return this.constr.hasOwnProperty(CREATE_INSTANCE);
    }

    /** Returns schema property of builder instance. */
    public getSchema(this: ClassValidatorBuilder): Schema {
        return this.schema;
    }

    /** Returns properties property of builder instance. */
    public getMeta(this: ClassValidatorBuilder): Map<Property, PropertyMeta> {
        return this.propertyMeta;
    }

    private updateMeta<K extends keyof PropertyMeta, V extends Option<PropertyMeta[K]>>(
        this: ClassValidatorBuilder,
        property: Property,
        kind?: K,
        value?: V,
    ): void {
        let meta = this.propertyMeta.get(property);
        if (meta === undefined) {
            const propertyMeta: PropertyMeta = {
                default: undefined,
                transform: undefined,
                Constructor: undefined,
                iterateOverData: undefined,
            };
            this.propertyMeta.set(property, propertyMeta);
            meta = propertyMeta;
        }

        if (kind !== undefined) {
            if (kind === 'Constructor' && meta.Constructor !== undefined) {
                const errorMessage = `Attempt to set Constructor property of ${
                    this.constr.name
                }[${property.toString()}] while it already exists.`;
                throw new Error(errorMessage);
            }
            meta[kind] = value;
        }
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
        this.updateMeta(property);
        const subSchema = this.getSubSchemas();
        this.ensureProperty(subSchema, property);

        subSchema[property as string][schemaProperty as string] = schemaValue;

        return this;
    }

    private ensureProperty(
        this: ClassValidatorBuilder,
        schema: SchemaProps | Schema,
        property: Property,
    ): void {
        if (!schema.hasOwnProperty(property)) schema[property as string] = {};
    }

    /**
     * This method is used to set either `Symbol.for('schema_properties')` or
     * `Symbol.for('schema_collection')` properties of the builder' schema.
     *
     * If `property` argument is provided then `Symbol.for('schema_properties')` property
     * will be extended. Otherwise `schema_collection` property will be extended.
     *
     */
    public setSymbolSchemaProperty(
        this: ClassValidatorBuilder,
        symbol: typeof SYM_SCHEMA_PROPERTIES | typeof SYM_SCHEMA_COLLECTION,
        sourceConstructor: Constructor,
        property?: Property,
    ): ClassValidatorBuilder {
        const sourceBuilder = ClassValidatorBuilder.extract(sourceConstructor);
        const shouldInstantiate = sourceBuilder.shouldCreateInstance();

        // Target schema, if symbol eq SYM_SCHEMA_PROPERTIES then @shape decorator
        // was invoked. This means we're interested in the target class [SYM_SCHEMA_PROPERTIES]
        // schema property.
        // const target = symbol === SYM_SCHEMA_PROPERTIES ? builder.schema[SYM_SCHEMA_PROPERTIES] : builder.schema;

        if (symbol === SYM_SCHEMA_PROPERTIES) {
            const sourceSchema = sourceBuilder.getSchema()[SYM_SCHEMA_PROPERTIES];
            if (property !== undefined && shouldInstantiate) {
                this.updateMeta(property, 'Constructor', sourceConstructor);
                return this;
            }

            if (sourceSchema === undefined) {
                const symStr = symbol.toString();
                const errorMessage = `setSymbolSchemaProperty: attempt to assign ${symStr} of the ${
                    sourceConstructor.name
                } Class to the ${this.constr.name} Class.\nClass ${
                    sourceConstructor.name
                } schema' have ${symStr} not defined.\nThis error means that you've used @shape(${
                    sourceConstructor.name
                }) on a ${this.constr.name} property without defining any properties on ${
                    sourceConstructor.name
                }.`;
                throw new Error(errorMessage);
            }

            if (property === undefined) {
                this.ensureProperty(this.schema, SYM_SCHEMA_PROPERTIES);

                return this.mergeSchema(
                    this.schema[SYM_SCHEMA_PROPERTIES] as SchemaProps,
                    sourceSchema,
                );
            } else {
                this.updateMeta(property);
                const own = this.getSubSchemas(property)[property as string];
                this.ensureProperty(own, SYM_SCHEMA_PROPERTIES);
                return this.mergeSchema(own[SYM_SCHEMA_PROPERTIES] as SchemaProps, sourceSchema);
            }
        } else {
            if (property !== undefined && shouldInstantiate) {
                this.updateMeta(property, 'Constructor', sourceConstructor);
                this.updateMeta(property, 'iterateOverData', true);
                return this;
            }

            if (property === undefined) {
                if (this.schema.hasOwnProperty(SYM_SCHEMA_COLLECTION)) {
                    const errorMessage = `Cannot append ${SYM_SCHEMA_COLLECTION.toString()} twice to the ${
                        this.constr.name
                    } schema.`;
                    throw new Error(errorMessage);
                }
                this.schema[SYM_SCHEMA_COLLECTION] = sourceBuilder.getSchema();
            } else {
                const subSchema = this.getSubSchemas(property)[property as string];
                if (subSchema.hasOwnProperty(SYM_SCHEMA_COLLECTION)) {
                    const errorMessage = `Cannot append ${SYM_SCHEMA_COLLECTION.toString()} twice to the ${
                        this.constr.name
                    }[${property.toString()}]`;
                    throw new Error(errorMessage);
                }
                subSchema[SYM_SCHEMA_COLLECTION] = sourceBuilder.getSchema();
            }
        }
        return this;
    }

    /** Add function that will produce default value for a `property`. */
    public addDefault(this: ClassValidatorBuilder, property: Property, fn: CallableFunction): void {
        this.updateMeta(property, 'default', fn as DefaultCallback);
    }

    /** Add function that will transform value of a `property`. */
    public addTransform(
        this: ClassValidatorBuilder,
        property: Property,
        fn: CallableFunction,
    ): void {
        this.updateMeta(property, 'transform', fn as TransformCallback);
    }

    /**
     * Ensures that root schema has `Symbol.for('schema_properties')` property and returns it.
     *
     * If `property` parameter is supplied then this function ensures that root schemas schema_properties
     * symbol also has `property` property.
     */
    private getSubSchemas(this: ClassValidatorBuilder, property?: Property): SchemaProps {
        if (!this.schema.hasOwnProperty(SYM_SCHEMA_PROPERTIES))
            this.schema[SYM_SCHEMA_PROPERTIES] = {};

        if (property !== undefined) {
            const symProperties = this.schema[SYM_SCHEMA_PROPERTIES] as SchemaProps;
            if (!symProperties.hasOwnProperty(property)) symProperties[property as string] = {};
        }

        return this.schema[SYM_SCHEMA_PROPERTIES] as SchemaProps;
    }

    private mergeSchema(
        this: ClassValidatorBuilder,
        target: SchemaProps,
        source: SchemaProps,
    ): ClassValidatorBuilder {
        const props = [
            ...Object.getOwnPropertyNames(source),
            ...Object.getOwnPropertySymbols(source),
        ] as string[];
        for (const property of props) {
            if (target.hasOwnProperty(property)) {
                const errorMessage = `Cannot merge schemas because property ${property.toString()} already exists in ${
                    this.constr.name
                } schema and cannot be overwritten`;
                throw new Error(errorMessage);
            }
            target[property] = source[property];
        }
        return this;
    }
}
