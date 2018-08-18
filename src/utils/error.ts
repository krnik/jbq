import { SYM_TYPE_VALIDATE } from '../constants';

export const E = {
    invalidArgument (paramName: string, desired?: string, actual?: string) {
        const errorMessage = !desired
        ? `Parameter "${paramName}" is required.`
        : `Parameter "${paramName}" expects argument to be a "${desired}". Got "${actual}" type instead.`;
        throw Error(errorMessage);
    },
    invalidSchemaPropType (propName: string, desired: string, valueType: string) {
        const errorMessage = `[${propName}] property requires schema value to be a "${desired}". Got "${valueType}" type instead.`;
        throw Error(errorMessage);
    },
    missingType (typeName: string, protoName?: string) {
        const errorMessage = !protoName
            ? `Could not find defintion of <${typeName}> type.`
            : `Can't extend <${typeName}> type with <${protoName}> type because it is not defined.`;
        throw Error(errorMessage);
    },
    missingTypeMethod (typeName: string, methodName: string) {
        const errorMessage = `Could not find method [${methodName}] in <${typeName}> type.`;
        throw Error(errorMessage);
    },
    missingTypeValidationMethod (typeName: string, methodName: string) {
        const errorMessage = `<${typeName}> type must have [${methodName}] schema validator function defined in [${SYM_TYPE_VALIDATE.toString()}] property.`;
        throw Error(errorMessage);
    },
    invalidTypeProto (typeName: string) {
        const errorMessage = `Can't add type <${typeName}> that does not contain any methods`;
        throw Error(errorMessage);
    },
    invalidTypeProp (typeName: string, propName: string, desired: string) {
        const errorMessage = `Property [${propName}] of type <${typeName}> must be ${desired} type.`;
        throw Error(errorMessage);
    },
    typeAlreadyDefined (typeName: string) {
        const errorMessage = `Can't add <${typeName}> type because it already exists.`;
        throw Error(errorMessage);
    },
    noKeysInSchema (schemaName: string) {
        const errorMessage = `Every schema must have at least [type] property. [${schemaName}] got none.`;
        throw Error(errorMessage);
    },
};
