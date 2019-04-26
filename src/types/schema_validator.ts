import { PROP_DATA_PATH } from '../constants';
import { DataPath } from '../typings';
import { PrintToken } from '../utils/print_token';
import { TypeReflect } from '../utils/type_reflect';

const SchemaValidationError = {
    missingArgument(typeName: string, methodName: string): Error {
        const errorMessage = `Schema validation method ${PrintToken.typePrototype(
            typeName,
        )} in ${PrintToken.property(
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
        const errorMessage = `${PrintToken.property(
            methodName,
        )} property in ${PrintToken.typePrototype(
            typeName,
        )} type requires schema value to be a ${PrintToken.type(
            expectedType,
        )}. Got ${PrintToken.type(type)} type instead.`;
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

function primitive<T extends keyof typeof TypeReflect>(
    typeName: string,
    methodName: string,
    type: T,
    acceptDataPath?: boolean,
) {
    return (schemaValue: any = SchemaValidationError.missingArgument(typeName, methodName)) => {
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

function isInstance(typeName: string, methodName: string, constructor: Function) {
    return (schemaValue: any = SchemaValidationError.missingArgument(typeName, methodName)) => {
        if (!TypeReflect.instance(schemaValue, constructor))
            throw SchemaValidationError.invalidSchemaType(
                typeName,
                methodName,
                constructor.name,
                typeof schemaValue,
            );
    };
}

function minMaxOrNumber(typeName: string, methodName: string, acceptDataPath?: boolean) {
    return (schemaValue: any = SchemaValidationError.missingArgument(typeName, methodName)) => {
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
            if (
                'min' in schemaValue &&
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
                'max' in schemaValue &&
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

function arrayOfPropertyNames(typeName: string, methodName: string) {
    return (schemaValue: any = SchemaValidationError.missingArgument(typeName, methodName)) => {
        if (!TypeReflect.instance<any[]>(schemaValue, Array) || !schemaValue.length)
            throw SchemaValidationError.invalidSchemaType(
                typeName,
                methodName,
                'array',
                typeof schemaValue,
            );
        if (
            !schemaValue.every(
                (p: any) => TypeReflect.string(p) || TypeReflect.number(p) || TypeReflect.symbol(p),
            )
        )
            throw SchemaValidationError.invalidSchemaType(
                typeName,
                methodName,
                'symbol | number | string',
                typeof schemaValue.find(
                    (p: any) =>
                        !(TypeReflect.string(p) || TypeReflect.number(p) || TypeReflect.symbol(p)),
                ),
            );
    };
}

function arrayOf<T extends keyof typeof TypeReflect>(
    typeName: string,
    methodName: string,
    elementType: T,
) {
    return (schemaValue: any = SchemaValidationError.missingArgument(typeName, methodName)) => {
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

function any(typeName: string, methodName: string) {
    return (_schemaValue: any = SchemaValidationError.missingArgument(typeName, methodName)) => {};
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
