import { SYM_TYPE_VALIDATE } from '../constants';

export const E = {
    param (paramName?: string, desired?: string, actual?: string) {
        const errorMessage = !paramName
        ? 'Parameter is required. Got undefined instead.'
        : `Parameter ${paramName} requires to be a ${desired}. Got '${actual}' instead.`;
        throw Error(errorMessage);
    },
    typeValidateError (propName: string, desired: string, valueType: string) {
        const errorMessage = `[${propName}] property requires value to be a ${desired}. Got ${valueType} instead.`;
        throw Error(errorMessage);
    },
    missingType (typeName: string) {
        const errorMessage = `Could not find deifintion of '${typeName}' type.`;
        throw Error(errorMessage);
    },
    typeProtoInvalidMethod (typeName: string, methodName: string, type: string) {
        const errorMessage = `[${typeName}] type must have [${methodName}] schema validator function defined in ${SYM_TYPE_VALIDATE.toString()} property. Got ${type}.`;
        throw Error(errorMessage);
    },
};
