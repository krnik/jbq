import { PROP_DATA_PATH } from '../constants';
import { IDataPathSchemaValue } from '../typings';
import { TypeReflect } from '../utils/type_reflect';
import { SchemaValidationError, TypeProtoError } from './error';

function dataPath (schemaValue: any): schemaValue is IDataPathSchemaValue {
    return schemaValue instanceof Object
        && schemaValue.hasOwnProperty(PROP_DATA_PATH)
        && (TypeReflect.string(schemaValue[PROP_DATA_PATH])
            || TypeReflect.arrayOf(schemaValue[PROP_DATA_PATH], TypeReflect.string));
}

function primitive<T extends keyof typeof TypeReflect> (
    typeName: string,
    methodName: string,
    type: T,
    acceptDataPath?: boolean,
) {
    return (schemaValue: any = TypeProtoError.missingArgument(typeName, methodName)) => {
        if (acceptDataPath && dataPath(schemaValue)) return;
        const check = TypeReflect[type] as ((v: any) => boolean);
        if (!check(schemaValue))
            throw SchemaValidationError.invalidSchemaType(
                typeName,
                methodName,
                type,
                typeof schemaValue,
            );
    };
}

function isInstance (typeName: string, methodName: string, constructor: Function) {
    return (schemaValue: any = TypeProtoError.missingArgument(typeName, methodName)) => {
        if (!TypeReflect.instance(schemaValue, constructor))
            throw SchemaValidationError.invalidSchemaType(
                typeName,
                methodName,
                constructor.name,
                typeof schemaValue,
            );
    };
}

function minMaxOrNumber (typeName: string, methodName: string, acceptDataPath?: boolean) {
    return (schemaValue: any = TypeProtoError.missingArgument(typeName, methodName)) => {
        if (acceptDataPath && dataPath(schemaValue)) return;
        if (TypeReflect.number(schemaValue)) return;
        if (typeof schemaValue === 'object') {
            if (!('min' in schemaValue || 'max' in schemaValue))
                throw SchemaValidationError.invalidSchemaType(
                    typeName,
                    methodName,
                    '{ [prop: string]: number } with at least one of keys ["min", "max"]',
                    typeof schemaValue,
                );
            if ('min' in schemaValue && !(acceptDataPath && dataPath(schemaValue.min)
                || TypeReflect.number(schemaValue.min)))
                throw SchemaValidationError.invalidSchemaType(
                    typeName,
                    methodName,
                    '{ min: number | $dataPath }',
                    typeof schemaValue.min,
                );
            if ('max' in schemaValue && !(acceptDataPath && dataPath(schemaValue.max)
                || TypeReflect.number(schemaValue.max)))
                throw SchemaValidationError.invalidSchemaType(
                    typeName,
                    methodName,
                    '{ max: number | $dataPath }',
                    typeof schemaValue.max,
                );
            return;
        }
        throw SchemaValidationError.invalidSchemaType(
            typeName,
            methodName,
            'number, $dataPath or { min?: number | $dataPath, max?: number | $dataPath }',
            typeof schemaValue,
        );
    };
}

function arrayOfPropertyNames (typeName: string, methodName: string) {
    return (schemaValue: any = TypeProtoError.missingArgument(typeName, methodName)) => {
        if (!TypeReflect.instance<any[]>(schemaValue, Array) || !schemaValue.length)
            throw SchemaValidationError.invalidSchemaType(
                typeName,
                methodName,
                'array',
                typeof schemaValue,
            );
        if (!schemaValue.every((p: any) => TypeReflect.string(p) || TypeReflect.number(p) || TypeReflect.symbol(p)))
            throw SchemaValidationError.invalidSchemaType(
                typeName,
                methodName,
                'symbol | number | string',
                typeof schemaValue
                    .find((p: any) => !(TypeReflect.string(p) || TypeReflect.number(p) || TypeReflect.symbol(p))),
            );
    };
}

function arrayOf<T extends keyof typeof TypeReflect> (
    typeName: string,
    methodName: string,
    elementType: T,
) {
    return (schemaValue: any = TypeProtoError.missingArgument(typeName, methodName)) => {
        if (!TypeReflect.array(schemaValue) || !schemaValue.length)
            throw SchemaValidationError.invalidSchemaType(
                typeName,
                methodName,
                'array',
                typeof schemaValue,
            );
        const check = TypeReflect[elementType] as ((v: any) => boolean);
        if (!schemaValue.every((elem: any) => check(elem)))
            throw SchemaValidationError.invalidSchemaType(
                typeName,
                methodName,
                elementType,
                typeof schemaValue.find((elem: any) => !check(elem)),
            );
    };
}

function any (typeName: string, methodName: string) {
    // tslint:disable-next-line: no-empty
    return (_schemaValue: any = TypeProtoError.missingArgument(typeName, methodName)) => { };
}

export const schemaValidate = {
    any,
    arrayOf,
    dataPath,
    primitive,
    isInstance,
    minMaxOrNumber,
    arrayOfPropertyNames,
};
