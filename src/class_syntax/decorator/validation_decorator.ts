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
import { Schema } from '../../core/compilation/interface/schema.interface';
import { ParseValuesMinMax, Constructor, ArrIterCallback } from '../../misc/typings';
import { TypeReflect } from '../../util/type_reflect';
import { ClassValidatorBuilder } from '../class_validator_builder';

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
 *
 * # Examples
 *
 *      \@type('string')
 *      class FullName {}
 *      // schema of FullName
 *      { type: 'string' };
 *
 *      class Names {
 *          \@type('array')
 *          \@collection(FullName)
 *          public names!: string[];
 *      }
 *      // schema of Names
 *      {
 *          type: 'object',
 *          [Symbol.for('schema_properties')]: {
 *              names: {
 *                  type: 'array',
 *                  [Symbol.for('schema_collection')]: {
 *                      type: 'string',
 *                  },
 *              },
 *          },
 *      }
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
 *
 * # Examples
 *
 *      class Name {
 *          \@string
 *          public firstName!: string;
 *      }
 *
 *      class Person {
 *
 *          \@schema({
 *              type: 'string',     // conflicts with `@object` decorator
 *              [Symbol.for('schema_properties')]: {
 *                  firstName: { type: 'boolean' }, // conflicts with Name.firstName
 *              },
 *          })
 *          \@object
 *          \@shape(Name)
 *          public name!: Shape<Name>; // Not really `Shape<Name>` anymore.
 *      }
 *
 * The outcome of using schema property depends purely on order of execution of decorators.
 * If `@shape` is executed as last decorator then it will overwrite any common schema properties.
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
 *
 * When `@shape` is used on a class it will always extend schema.
 *
 *      \@instantiate
 *      class ID {
 *          \@number
 *          public no!: number;
 *      }
 *
 *      \@shape(ID)
 *      class Resource {}
 *
 * Schema of `Resource` class will inherit all sub properties of `ID` class' schema.
 * This means that a valid class signature for `Resource` is the following.
 *
 *      \@shape(ID)
 *      class Resource implements Shape<ID> {}
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
 *
 * # Examples
 *
 *      \@number
 *      \@value({ min: 100 })
 *      class NumGte100 {}
 *
 *      class Poll extends Validator {
 *          \@array
 *          \@collection(NumGte100)
 *          public votes!: number[];
 *
 *          \@array
 *          \@shape(HighestVotes)
 *          public votes2!: number[];
 *      }
 *
 *      compileClass(Poll);
 *
 *      const poll = new Poll().build({ votes: [100, 112] });
 *      poll.votes; // [100, 112]
 */
export const collection = decoratorSubSchemaFactory(SYM_SCHEMA_COLLECTION);
