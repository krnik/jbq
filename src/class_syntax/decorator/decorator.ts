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
import { ParseValuesMinMax } from '../../misc/typings';
import { TypeReflect } from '../../util/type_reflect';
import { ClassValidatorBuilder } from '../class_validator_builder';

type ClassDecoratorParams = [Function];
type ClassInstancePropertyDecoratorParams = [object, string | symbol, unknown];
type DecoratorParams = ClassDecoratorParams | ClassInstancePropertyDecoratorParams;
type Constructor = new (...args: unknown[]) => unknown;
type SchemaSymbol = typeof SYM_SCHEMA_PROPERTIES | typeof SYM_SCHEMA_COLLECTION;
type Decorator = (...args: DecoratorParams) => void;
type DecoratorFactory<T> = (schemaValue: T) => Decorator;

function isClassDecroator(args: DecoratorParams): args is ClassDecoratorParams {
    return TypeReflect.instance(args[0], Function);
}

const decoratorFactory = <T>(schemaProperty: string | symbol): DecoratorFactory<T> => (
    schemaValue: T,
): Decorator => (...args: DecoratorParams): void => {
    if (isClassDecroator(args)) {
        const [constructor] = args;
        const builder = ClassValidatorBuilder.extract(constructor);
        builder.append(schemaProperty, schemaValue);
    } else {
        const [prototype, property] = args;
        const builder = ClassValidatorBuilder.extract(prototype.constructor);
        builder.appendToSubSchema(schemaProperty, schemaValue, property);
    }
};

const decoratorSubSchemaFactory = (schemaSymbol: SchemaSymbol): DecoratorFactory<Constructor> => (
    schemaShape: Constructor,
): Decorator => (...args: DecoratorParams): void => {
    const target = ClassValidatorBuilder.extract(schemaShape);

    if (isClassDecroator(args)) {
        const [constructor] = args;
        const builder = ClassValidatorBuilder.extract(constructor);
        builder.setSymbolSchemaProperty(schemaSymbol, target);
    } else {
        const [prototype, property] = args;
        const builder = ClassValidatorBuilder.extract(prototype.constructor);
        builder.setSymbolSchemaProperty(schemaSymbol, target, property);
    }
};

export const type = decoratorFactory<string>(TYPE);
export const any = decoratorFactory(TYPE)(TYPE_NAME.ANY);
export const array = decoratorFactory(TYPE)(TYPE_NAME.ARRAY);
export const boolean = decoratorFactory(TYPE)(TYPE_NAME.BOOLEAN);
export const number = decoratorFactory(TYPE)(TYPE_NAME.NUMBER);
export const object = decoratorFactory(TYPE)(TYPE_NAME.OBJECT);
export const string = decoratorFactory(TYPE)(TYPE_NAME.STRING);
export const optional = decoratorFactory(REQUIRED)(false);
export const every = decoratorFactory<(elem: unknown, index: number, arr: unknown[]) => boolean>(
    EVERY,
);
export const some = decoratorFactory<(elem: unknown, index: number, arr: unknown[]) => boolean>(
    SOME,
);
export const includes = decoratorFactory<unknown>(INCLUDES);
export const len = decoratorFactory<ParseValuesMinMax['schemaValue']>(LEN);
export const value = decoratorFactory<number | boolean>(VALUE);
export const multipleOf = decoratorFactory<number>(MULTIPLE_OF);
export const regex = decoratorFactory<RegExp>(REGEX);
export const oneOf = decoratorFactory<string[] | number[]>(ONE_OF);
export const keyCount = decoratorFactory<ParseValuesMinMax['schemaValue']>(KEY_COUNT);
export const propCount = decoratorFactory<ParseValuesMinMax['schemaValue']>(PROP_COUNT);
export const properties = decoratorFactory<(string | symbol | number)[]>(PROPERTIES);
export const instanceOf = decoratorFactory<Constructor>(INSTANCE_OF);
export const constructorName = decoratorFactory<string>(CONSTRUCTOR_NAME);

export const schema = (schemaObject: Schema): Decorator => (...args: DecoratorParams): void => {
    const schemaProperties = [
        ...Object.getOwnPropertyNames(schemaObject),
        ...Object.getOwnPropertySymbols(schemaObject),
    ];
    if (isClassDecroator(args)) {
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
export const shape = decoratorSubSchemaFactory(SYM_SCHEMA_PROPERTIES);

export const collection = decoratorSubSchemaFactory(SYM_SCHEMA_COLLECTION);
