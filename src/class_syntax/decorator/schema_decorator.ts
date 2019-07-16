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
    TYPE_ANY,
    TYPE_ARRAY,
    TYPE_BOOLEAN,
    TYPE_NUMBER,
    TYPE_OBJECT,
    TYPE_STRING,
    VALUE,
} from '../../misc/constants';
import { ArrIterCallback } from '../../misc/typings';
import { ParseValuesMinMax } from '../../type/type_definition_typings';
import { ValidatorBuilder } from '../validator_builder';

type ReturnsDecorator<V> = (value: V) => PropertyDecorator;

export const schemaDecoratorFactory = <V = unknown>(keyword: string): ReturnsDecorator<V> => {
    return (value: V): PropertyDecorator => {
        return (prototype: object, property: string | symbol): void => {
            ValidatorBuilder.extract(prototype.constructor)
                .getPropertyMetadata(property)
                .addKeyword(keyword, value);
        };
    };
};

// export const schemaDecoratorFactory = <V = unknown>(keyword: string): FactoryResult<V> => (
//     value: V,
// ): SchemaDecorator => (...params: ClassDecoratorParams | PropertyDecoratorParams): void => {
//     if (isClassDecorator(params)) {
//         ValidatorBuilder.extract(params[0]).addKeyword(keyword, value);
//     } else {
//         ValidatorBuilder.extract(params[0].constructor)
//             .getPropertyMetadata(params[1])
//             .addKeyword(keyword, value);
//     }
// };

/**
 * *Property Decorator*
 *
 * Assigns `type` keyword to the schema.
 */
export const type = schemaDecoratorFactory<string>(TYPE);

/** Shorthand `@type` decorator that assigns schema `type` keyword to `any` */
export const any = type(TYPE_ANY);

/** Shorthand `@type` decorator that assigns schema `type` keyword to `array` */
export const array = type(TYPE_ARRAY);

/** Shorthand `@type` decorator that assigns schema `type` keyword to `boolean` */
export const boolean = type(TYPE_BOOLEAN);

/** Shorthand `@type` decorator that assigns schema `type` keyword to `number` */
export const number = type(TYPE_NUMBER);

/** Shorthand `@type` decorator that assigns schema `type` keyword to `object` */
export const object = type(TYPE_OBJECT);

/** Shorthand `@type` decorator that assigns schema `type` keyword to `string` */
export const string = type(TYPE_STRING);

/** Assigns schema `required` keyword to `false` */
export const optional = schemaDecoratorFactory(REQUIRED)(false);

/** Assigns schema `every` keyword to provided callback */
export const every = schemaDecoratorFactory<ArrIterCallback<boolean, unknown>>(EVERY);

/** Assigns schema `some` keyword to provided callback */
export const some = schemaDecoratorFactory<ArrIterCallback<boolean, unknown>>(SOME);

/** Assigns schema `includes` keyword to provided value */
export const includes = schemaDecoratorFactory<unknown>(INCLUDES);

/** Assigns schema `len` keyword to provided value */
export const len = schemaDecoratorFactory<ParseValuesMinMax['schemaValue']>(LEN);

/** Assigns schema `value` keyword to provided value */
export const value = schemaDecoratorFactory<ParseValuesMinMax['schemaValue'] | boolean>(VALUE);

/** Assigns schema `multipleOf` keyword to provided number */
export const multipleOf = schemaDecoratorFactory<number>(MULTIPLE_OF);

/** Assigns schema `regex` keyword to provided RegExp instance */
export const regex = schemaDecoratorFactory<RegExp>(REGEX);

/** Assigns schema `oneOf` keyword to provided value */
export const oneOf = schemaDecoratorFactory<string[] | number[]>(ONE_OF);

/** Assigns schema `keyCount` keyword to provided value */
export const keyCount = schemaDecoratorFactory<ParseValuesMinMax['schemaValue']>(KEY_COUNT);

/** Assigns schema `propCount` keyword to provided value */
export const propCount = schemaDecoratorFactory<ParseValuesMinMax['schemaValue']>(PROP_COUNT);

/** Assigns schema `properties` keyword to provided value */
export const properties = schemaDecoratorFactory<(string | symbol | number)[]>(PROPERTIES);

/** Assigns schema `instanceOf` keyword to provided value */
export const instanceOf = schemaDecoratorFactory<Function>(INSTANCE_OF);

/** Assigns schema `constructorName` keyword to provided value */
export const constructorName = schemaDecoratorFactory<string>(CONSTRUCTOR_NAME);
