import { is } from '../utils/type';
import { SchemaValidationError, TypeProtoError } from './error';

function primitive<T extends keyof typeof is> (typeName: string, methodName: string, type: T) {
    return (schemaValue: any = TypeProtoError.missingArgument(typeName, methodName)) => {
        const check = is[type] as ((v: any) => boolean);
        if (!check(schemaValue))
            throw SchemaValidationError.invalidSchemaType(
                typeName,
                methodName,
                type,
                typeof schemaValue,
            );
    };
}

function isInstance (typeName: string, methodName: string, constructorName: string) {
    return (schemaValue: any = TypeProtoError.missingArgument(typeName, methodName)) => {
        if (!is.objectInstance(schemaValue, constructorName))
            throw SchemaValidationError.invalidSchemaType(
                typeName,
                methodName,
                constructorName,
                typeof schemaValue,
            );
    };
}

function minMaxOrNumber (typeName: string, methodName: string) {
    return (schemaValue: any = TypeProtoError.missingArgument(typeName, methodName)) => {
        if (typeof schemaValue === 'object'
            && !('min' in schemaValue || 'max' in schemaValue))
            throw SchemaValidationError.invalidSchemaType(
                typeName,
                methodName,
                '{ min?: number; max?: number; }',
                typeof schemaValue,
            );
        if (!is.number(schemaValue))
            throw SchemaValidationError.invalidSchemaType(
                typeName,
                methodName,
                'number',
                typeof schemaValue,
            );
    };
}

function arrayOfPropertyNames (typeName: string, methodName: string) {
    return (schemaValue: any = TypeProtoError.missingArgument(typeName, methodName)) => {
        if (!is.objectInstance(schemaValue, 'Array') || !schemaValue.length)
            throw SchemaValidationError.invalidSchemaType(
                typeName,
                methodName,
                'array',
                typeof schemaValue,
            );
        if (!schemaValue.every((p: any) => is.string(p) || is.number(p) || is.symbol(p)))
            throw SchemaValidationError.invalidSchemaType(
                typeName,
                methodName,
                'symbol | number | string',
                typeof schemaValue
                    .find((p: any) => !(is.string(p) || is.number(p) || is.symbol(p))),
            );
    };
}

function arrayOf<T extends keyof typeof is> (
    typeName: string,
    methodName: string,
    elementType: T,
) {
    return (schemaValue: any = TypeProtoError.missingArgument(typeName, methodName)) => {
        if (!is.objectInstance(schemaValue, 'Array') || !schemaValue.length)
            throw SchemaValidationError.invalidSchemaType(
                typeName,
                methodName,
                'array',
                typeof schemaValue,
            );
        const check = is[elementType] as ((v: any) => boolean);
        if (!schemaValue.every((p: any) => check(p)))
            throw SchemaValidationError.invalidSchemaType(
                typeName,
                methodName,
                elementType,
                typeof schemaValue.find((p: any) => !check(p)),
            );
    };
}

function any (typeName: string, methodName: string) {
    return (_schemaValue: any = TypeProtoError.missingArgument(typeName, methodName)) => 0;
}

export const schemaValidate = {
    any,
    primitive,
    minMaxOrNumber,
    isInstance,
    arrayOf,
    arrayOfPropertyNames,
};
