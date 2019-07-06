import { DataPath } from '../core/compilation/compilation_typings';
import { PROP_DATA_PATH } from '../misc/constants';
import { Constructor } from '../misc/typings';
import { Print } from '../util/print_token';
import { TypeReflect } from '../util/type_reflect';

// TODO: Grant access to current schema object for debugging purposes.
const SchemaValidationError = {
    missingArgument(typeName: string, methodName: string): Error {
        const errorMessage = `Schema validation method ${Print.typeDef(
            typeName,
        )} in ${Print.property(
            methodName,
        )} type expects 'schemaValue' parameter to not be undefined.`;
        throw new Error(errorMessage);
    },
    invalidSchemaType(
        typeName: string,
        methodName: string,
        expectedType: string,
        type: string,
    ): Error {
        const errorMessage = `${Print.property(methodName)} property in ${Print.typeDef(
            typeName,
        )} type requires schema value to be a ${Print.type(expectedType)}. Got ${Print.type(
            type,
        )} type instead.`;
        return new Error(errorMessage);
    },
};

function dataPath(schemaValue: unknown): schemaValue is DataPath {
    return (
        schemaValue instanceof Object &&
        schemaValue.hasOwnProperty(PROP_DATA_PATH) &&
        (TypeReflect.string((schemaValue as DataPath)[PROP_DATA_PATH]) ||
            TypeReflect.arrayOf((schemaValue as DataPath)[PROP_DATA_PATH], TypeReflect.string))
    );
}

type SchemaValidator = (v: unknown) => void;

function primitive<T extends keyof typeof TypeReflect>(
    typeName: string,
    methodName: string,
    type: T,
    acceptDataPath?: boolean,
): SchemaValidator {
    return (
        schemaValue: unknown = SchemaValidationError.missingArgument(typeName, methodName),
    ): void => {
        if (acceptDataPath && dataPath(schemaValue)) return;
        const check = TypeReflect[type] as ((v: unknown) => boolean);
        if (!check(schemaValue))
            throw SchemaValidationError.invalidSchemaType(
                typeName,
                methodName,
                type,
                typeof schemaValue,
            );
    };
}

function isInstance(
    typeName: string,
    methodName: string,
    constructor: Constructor,
): SchemaValidator {
    return (
        schemaValue: unknown = SchemaValidationError.missingArgument(typeName, methodName),
    ): void => {
        if (!TypeReflect.instance(schemaValue, constructor))
            throw SchemaValidationError.invalidSchemaType(
                typeName,
                methodName,
                constructor.name,
                typeof schemaValue,
            );
    };
}

function minMaxOrNumber(
    typeName: string,
    methodName: string,
    acceptDataPath?: boolean,
): SchemaValidator {
    return (
        schemaValue: unknown = SchemaValidationError.missingArgument(typeName, methodName),
    ): void => {
        if (acceptDataPath && dataPath(schemaValue)) return;
        if (TypeReflect.number(schemaValue)) return;

        if (typeof schemaValue === 'object' && schemaValue !== null) {
            if (!('min' in schemaValue || 'max' in schemaValue))
                throw SchemaValidationError.invalidSchemaType(
                    typeName,
                    methodName,
                    '{ [prop: string]: number } with at least one of keys ["min", "max"]',
                    typeof schemaValue,
                );

            if (
                TypeReflect.objectProps(schemaValue, ['min']) &&
                !(
                    (acceptDataPath && dataPath(schemaValue.min)) ||
                    TypeReflect.number(schemaValue.min)
                )
            )
                throw SchemaValidationError.invalidSchemaType(
                    typeName,
                    methodName,
                    '{ min: number | $dataPath }',
                    typeof schemaValue.min,
                );

            if (
                TypeReflect.objectProps(schemaValue, ['max']) &&
                !(
                    (acceptDataPath && dataPath(schemaValue.max)) ||
                    TypeReflect.number(schemaValue.max)
                )
            )
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

function arrayOfPropertyNames(typeName: string, methodName: string): SchemaValidator {
    return (
        schemaValue: unknown = SchemaValidationError.missingArgument(typeName, methodName),
    ): void => {
        if (!TypeReflect.instance(schemaValue, Array) || !schemaValue.length)
            throw SchemaValidationError.invalidSchemaType(
                typeName,
                methodName,
                'array',
                typeof schemaValue,
            );
        if (
            !schemaValue.every(
                (p: unknown): boolean =>
                    TypeReflect.string(p) || TypeReflect.number(p) || TypeReflect.symbol(p),
            )
        )
            throw SchemaValidationError.invalidSchemaType(
                typeName,
                methodName,
                'symbol | number | string',
                typeof schemaValue.find(
                    (p: unknown): boolean =>
                        !(TypeReflect.string(p) || TypeReflect.number(p) || TypeReflect.symbol(p)),
                ),
            );
    };
}

function arrayOf<T extends keyof typeof TypeReflect>(
    typeName: string,
    methodName: string,
    elementType: T,
): SchemaValidator {
    return (
        schemaValue: unknown = SchemaValidationError.missingArgument(typeName, methodName),
    ): void => {
        if (!TypeReflect.array(schemaValue) || !schemaValue.length)
            throw SchemaValidationError.invalidSchemaType(
                typeName,
                methodName,
                'array',
                typeof schemaValue,
            );
        const check = TypeReflect[elementType] as ((v: unknown) => boolean);
        if (!schemaValue.every((elem: unknown): boolean => check(elem)))
            throw SchemaValidationError.invalidSchemaType(
                typeName,
                methodName,
                elementType,
                typeof schemaValue.find((elem: unknown): boolean => !check(elem)),
            );
    };
}

function any(typeName: string, methodName: string): SchemaValidator {
    return (
        _schemaValue: unknown = SchemaValidationError.missingArgument(typeName, methodName),
    ): void => {
        _schemaValue;
    };
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
