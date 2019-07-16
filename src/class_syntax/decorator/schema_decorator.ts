import {
    TYPE,
    TYPE_ANY,
    TYPE_ARRAY,
    TYPE_BOOLEAN,
    TYPE_NUMBER,
    TYPE_OBJECT,
    TYPE_STRING,
    REQUIRED,
    EVERY,
    SOME,
    INCLUDES,
    LEN,
    VALUE,
    MULTIPLE_OF,
    REGEX,
    ONE_OF,
    KEY_COUNT,
    PROP_COUNT,
    PROPERTIES,
    INSTANCE_OF,
    CONSTRUCTOR_NAME,
} from '../../misc/constants';
import { ValidatorBuilder } from '../validator_builder';
import { ArrIterCallback } from '../../misc/typings';
import { ParseValuesMinMax } from '../../type/type_definition_typings';

type ClassDecoratorParams = [Function];
type PropertyDecoratorParams = [object, string | symbol, unknown?];
const isClassDecorator = (
    params: ClassDecoratorParams | PropertyDecoratorParams,
): params is ClassDecoratorParams => typeof params[0] === 'function';

const schemaKeywordDecoratorFactory = <V>(
    keyword: string,
): ((value: V) => PropertyDecorator | ClassDecorator) => (
    value: V,
): PropertyDecorator | ClassDecorator => (
    ...params: ClassDecoratorParams | PropertyDecoratorParams
): void => {
    if (isClassDecorator(params)) {
        ValidatorBuilder.extract(params[0]).addKeyword(keyword, value);
    } else {
        ValidatorBuilder.extract(params[0].constructor)
            .getPropertyMetadata(params[1])
            .addKeyword(keyword, value);
    }
};

/**
 * *Property Decorator*
 *
 * Assigns `type` keyword to the schema.
 */
export const type = schemaKeywordDecoratorFactory(TYPE);

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
export const optional = schemaKeywordDecoratorFactory(REQUIRED)(false);

/** Assigns schema `every` keyword to provided callback */
export const every = schemaKeywordDecoratorFactory<ArrIterCallback<unknown, boolean>>(EVERY);

/** Assigns schema `some` keyword to provided callback */
export const some = schemaKeywordDecoratorFactory<ArrIterCallback<unknown, boolean>>(SOME);

/** Assigns schema `includes` keyword to provided value */
export const includes = schemaKeywordDecoratorFactory<unknown>(INCLUDES);

/** Assigns schema `len` keyword to provided value */
export const len = schemaKeywordDecoratorFactory<ParseValuesMinMax['schemaValue']>(LEN);

/** Assigns schema `value` keyword to provided value */
export const value = schemaKeywordDecoratorFactory<ParseValuesMinMax['schemaValue'] | boolean>(
    VALUE,
);

/** Assigns schema `multipleOf` keyword to provided number */
export const multipleOf = schemaKeywordDecoratorFactory<number>(MULTIPLE_OF);

/** Assigns schema `regex` keyword to provided RegExp instance */
export const regex = schemaKeywordDecoratorFactory<RegExp>(REGEX);

/** Assigns schema `oneOf` keyword to provided value */
export const oneOf = schemaKeywordDecoratorFactory<string[] | number[]>(ONE_OF);

/** Assigns schema `keyCount` keyword to provided value */
export const keyCount = schemaKeywordDecoratorFactory<ParseValuesMinMax['schemaValue']>(KEY_COUNT);

/** Assigns schema `propCount` keyword to provided value */
export const propCount = schemaKeywordDecoratorFactory<ParseValuesMinMax['schemaValue']>(
    PROP_COUNT,
);

/** Assigns schema `properties` keyword to provided value */
export const properties = schemaKeywordDecoratorFactory<(string | symbol | number)[]>(PROPERTIES);

/** Assigns schema `instanceOf` keyword to provided value */
export const instanceOf = schemaKeywordDecoratorFactory<Function>(INSTANCE_OF);

/** Assigns schema `constructorName` keyword to provided value */
export const constructorName = schemaKeywordDecoratorFactory<string>(CONSTRUCTOR_NAME);
