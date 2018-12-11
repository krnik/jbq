import { PROP_DATA_PATH } from '../constants';
import { IDataPathSchemaValue } from '../typings';
import { is } from '../utils/type';
import { SchemaValidationError, TypeProtoError } from './error';

function dataPath (schemaValue: IDataPathSchemaValue) {
    return schemaValue instanceof Object
        && schemaValue.hasOwnProperty(PROP_DATA_PATH)
        && (is.string(schemaValue[PROP_DATA_PATH])
            || is.arrayOf(schemaValue[PROP_DATA_PATH], is.string));
}

function primitive<T extends keyof typeof is> (
    typeName: string,
    methodName: string,
    type: T,
    acceptDataPath?: boolean,
) {
    return (schemaValue: any = TypeProtoError.missingArgument(typeName, methodName)) => {
        if (acceptDataPath && dataPath(schemaValue)) return;
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

function minMaxOrNumber (typeName: string, methodName: string, acceptDataPath?: boolean) {
    return (schemaValue: any = TypeProtoError.missingArgument(typeName, methodName)) => {
        if (acceptDataPath && dataPath(schemaValue)) return;
        if (is.number(schemaValue)) return;
        if (typeof schemaValue === 'object') {
            if (!('min' in schemaValue || 'max' in schemaValue))
                throw SchemaValidationError.invalidSchemaType(
                    typeName,
                    methodName,
                    '{ [prop: string]: number } with at least one of keys ["min", "max"]',
                    typeof schemaValue,
                );
            if ('min' in schemaValue && !(acceptDataPath && dataPath(schemaValue.min)
                || is.number(schemaValue.min)))
                throw SchemaValidationError.invalidSchemaType(
                    typeName,
                    methodName,
                    '{ min: number | $dataPath }',
                    typeof schemaValue.min,
                );
            if ('max' in schemaValue && !(acceptDataPath && dataPath(schemaValue.max)
                || is.number(schemaValue.max)))
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
        if (!is.array(schemaValue) || !schemaValue.length)
            throw SchemaValidationError.invalidSchemaType(
                typeName,
                methodName,
                'array',
                typeof schemaValue,
            );
        const check = is[elementType] as ((v: any) => boolean);
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
    return (_schemaValue: any = TypeProtoError.missingArgument(typeName, methodName)) => {};
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
