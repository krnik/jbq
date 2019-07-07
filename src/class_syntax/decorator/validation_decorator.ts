import {
    CONSTRUCTOR_NAME,
    EVERY,
    INCLUDES,
    INSTANCE_OF,
    KEY_COUNT,
    LEN,
    MULTIPLE_OF,
    ONE_OF,
    PROPERTIES,
    PROP_COUNT,
    REGEX,
    REQUIRED,
    SOME,
    TYPE,
    TYPE_NAME,
    VALUE,
    SYM_SCHEMA_PROPERTIES,
    SYM_SCHEMA_COLLECTION,
} from '../../misc/constants';
import { Constructor, ArrIterCallback } from '../../misc/typings';
import { TypeReflect } from '../../util/type_reflect';
import { ClassValidatorBuilder } from '../class_validator_builder';
import { ParseValuesMinMax } from '../../type/type_definition_typings';
import { Schema } from '../../core/compilation/compilation_typings';

type ClassDecoratorParams = [Function];

type PropertyDecoratorParams = [object, string | symbol, unknown?];

type DecoratorParams = [Function] | PropertyDecoratorParams;

type Decorator = (...args: DecoratorParams) => void;

type DecoratorTypes = 'value' | 'constructor' | 'callback';

/** Decorator factory that expects value of type T as an argument. */
type ValueFactory<T> = (schemaValue: T) => Decorator;
/** Decorator factory that expects Constructor as an argument. */
type ConstructorFactory = <T>(schemaShape: Constructor<T>) => Decorator;
/** Decorator factory that expects function that returns boolean as an argument. */
type CallbackFactory = <T>(callback: ArrIterCallback<boolean, T>) => Decorator;

type DecoratorFactoryB<B extends DecoratorTypes, T> = B extends 'value'
    ? ValueFactory<T>
    : B extends 'constructor'
    ? ConstructorFactory
    : B extends 'callback'
    ? CallbackFactory
    : never;

function isClassDecorator(args: DecoratorParams): args is ClassDecoratorParams {
    return TypeReflect.instance(args[0], Function);
}

export function decoratorFactory<T = unknown, BASE extends DecoratorTypes = 'value'>(
    schemaProperty: string | symbol,
): DecoratorFactoryB<BASE, T> {
    return ((value: T): Decorator => (...args: DecoratorParams): void => {
        if (isClassDecorator(args)) {
            const [constructor] = args;
            const builder = ClassValidatorBuilder.extract(constructor);
            builder.append(schemaProperty, value);
        } else {
            const [prototype, property] = args;
            const builder = ClassValidatorBuilder.extract(prototype.constructor);
            builder.appendToSubSchema(schemaProperty, value, property);
        }
    }) as DecoratorFactoryB<BASE, T>;
}

/**
 * *Constructor / Property Decorator*
 *
 * Assigns `type` property to the root schema (if class is decorated) or to the
 * decorated property of the subSchemas.
 *
 * By default decorated classes have `type` property set to `object`.
 */
export const type = decoratorFactory<string>(TYPE);

/** Shorthand `@type` decorator that assigns schema `type` property to `any` */
export const any = decoratorFactory(TYPE)(TYPE_NAME.ANY);

/** Shorthand `@type` decorator that assigns schema `type` property to `array` */
export const array = decoratorFactory(TYPE)(TYPE_NAME.ARRAY);

/** Shorthand `@type` decorator that assigns schema `type` property to `boolean` */
export const boolean = decoratorFactory(TYPE)(TYPE_NAME.BOOLEAN);

/** Shorthand `@type` decorator that assigns schema `type` property to `number` */
export const number = decoratorFactory(TYPE)(TYPE_NAME.NUMBER);

/** Shorthand `@type` decorator that assigns schema `type` property to `object` */
export const object = decoratorFactory(TYPE)(TYPE_NAME.OBJECT);

/** Shorthand `@type` decorator that assigns schema `type` property to `string` */
export const string = decoratorFactory(TYPE)(TYPE_NAME.STRING);

/** Assigns schema `required` property to `false` */
export const optional = decoratorFactory(REQUIRED)(false);

/** Assigns schema `every` property to provided callback */
export const every = decoratorFactory<never, 'callback'>(EVERY);

/** Assigns schema `some` property to provided callback */
export const some = decoratorFactory<never, 'callback'>(SOME);

/** Assigns schema `includes` property to provided value */
export const includes = decoratorFactory(INCLUDES);

/** Assigns schema `len` property to provided value */
export const len = decoratorFactory<ParseValuesMinMax['schemaValue']>(LEN);

/** Assigns schema `value` property to provided value */
export const value = decoratorFactory<ParseValuesMinMax['schemaValue'] | boolean>(VALUE);

/** Assigns schema `multipleOf` property to provided number */
export const multipleOf = decoratorFactory<number>(MULTIPLE_OF);

/** Assigns schema `regex` property to provided RegExp instance */
export const regex = decoratorFactory<RegExp>(REGEX);

/** Assigns schema `oneOf` property to provided value */
export const oneOf = decoratorFactory<string[] | number[]>(ONE_OF);

/** Assigns schema `keyCount` property to provided value */
export const keyCount = decoratorFactory<ParseValuesMinMax['schemaValue']>(KEY_COUNT);

/** Assigns schema `propCount` property to provided value */
export const propCount = decoratorFactory<ParseValuesMinMax['schemaValue']>(PROP_COUNT);

/** Assigns schema `properties` property to provided value */
export const properties = decoratorFactory<(string | symbol | number)[]>(PROPERTIES);

/** Assigns schema `instanceOf` property to provided value */
export const instanceOf = decoratorFactory<never, 'constructor'>(INSTANCE_OF);

/** Assigns schema `constructorName` property to provided value */
export const constructorName = decoratorFactory<string>(CONSTRUCTOR_NAME);

/**
 * Assigns received schemaObject to the target schema.
 * Always succeeds (does not check if properties exists or not).
 *
 * Use with caution.
 */
export const schema = (schemaObject: Schema): Decorator => (...args: DecoratorParams): void => {
    const schemaProperties = [
        ...Object.getOwnPropertyNames(schemaObject),
        ...Object.getOwnPropertySymbols(schemaObject),
    ];

    if (isClassDecorator(args)) {
        const [constructor] = args;
        const builder = ClassValidatorBuilder.extract(constructor);
        for (const schemaProperty of schemaProperties) {
            builder.append(schemaProperty, schemaObject[schemaProperty as keyof Schema]);
        }
    } else {
        const [prototype, property] = args;
        const builder = ClassValidatorBuilder.extract(prototype.constructor);
        for (const schemaProperty of schemaProperties) {
            builder.appendToSubSchema(
                schemaProperty,
                schemaObject[schemaProperty as keyof Schema],
                property,
            );
        }
    }
};

type SchemaSymbol = typeof SYM_SCHEMA_PROPERTIES | typeof SYM_SCHEMA_COLLECTION;

const decoratorSubSchemaFactory = (schemaSymbol: SchemaSymbol): ConstructorFactory => (
    schemaShape: Constructor,
): Decorator => (...args: DecoratorParams): void => {
    if (isClassDecorator(args)) {
        const [constructor] = args;
        const builder = ClassValidatorBuilder.extract(constructor);
        builder.setSymbolSchemaProperty(schemaSymbol, schemaShape);
    } else {
        const [prototype, property] = args;
        const builder = ClassValidatorBuilder.extract(prototype.constructor);
        builder.setSymbolSchemaProperty(schemaSymbol, schemaShape, property);
    }
};

/**
 * Extends schema with provided class' schema.
 *
 * If provided class is decorated with `@instantiate` decorator then schema is not extended.
 * Instead provided class instance will be created.
 */
export const shape = decoratorSubSchemaFactory(SYM_SCHEMA_PROPERTIES);

/**
 * Appends `Symbol.for('schema_collection')` to the schema.
 *
 * When used on a class the provided class' schema will be always used to extend base
 * schema.
 *
 * When used on a property and a provided class `C` is decorated with `@instantiate` then
 * the base schema will not be extended. Instead, `C` class will be used to create instances
 * in the iterable elements.
 *
 * Currently only array-like (integer indexed with `length` property) objects support creating instances since they're easily
 * mutated.
 */
export const collection = decoratorSubSchemaFactory(SYM_SCHEMA_COLLECTION);
