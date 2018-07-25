import { SYM_SCHEMA_FLAT } from '../constants';

export const E = {
    param () {
        const errorMessage = 'Parameter is required. Got undefined instead.';
        throw Error(errorMessage);
    },
    nullValue (propName?: string) {
        const errorMessage = propName
            ? `[${propName}] property disallows null as a value.`
            : 'Parameter cannot be is null.';
        throw Error(errorMessage);
    },
    validateTypeError (propName: string, valueType: string) {
        const errorMessage = `[${propName}] property requires value to be string primitive. Got "${valueType}" type instead.`;
        throw Error(errorMessage);
    },
    typeValidateError (propName: string, desired: string, valueType: string) {
        const errorMessage = `[${propName}] property requires value to be a ${desired}. Got ${valueType} instead.`;
        throw Error(errorMessage);
    },
    validateRequiredError (propName: string, valueType: string) {
        const errorMessage = `[${propName}] property requires value to be boolean primitive. Gor "${valueType}" type, instead.`;
        throw Error(errorMessage);
    },
    validateNotNumberError (propName: string, valueType: string) {
        const errorMessage = `[${propName}] property requires value to be number primitive. Gor "${valueType}" type instead.`;
        throw Error(errorMessage);
    },
    validateMatchError (propName: string, valueType: string) {
        const errorMessage = `[${propName}] property requires value to be instance of RegExp. Got ${valueType} type instead.`;
        throw Error(errorMessage);
    },
    missingType (typeName: string) {
        const errorMessage = `Could not find deifintion of '${typeName}' type.`;
        throw Error(errorMessage);
    },
    invalidMethod (typeName: string, valueType: string) {
        const errorMessage = `Validator method of type '${typeName}' must be a function. Got ${valueType} instead.`;
        throw Error(errorMessage);
    },
    typeProtoInvalidMethod (typeName: string, methodName: string, type: string) {
        const errorMessage = `[${typeName}] type must have [${methodName}] method validator and parser functions defined in [PARSE] and [VALIDATE] properties. Got ${type}.`;
        throw Error(errorMessage);
    },
    validatorDuplicateKeys (patternName: string) {
        const errorMessage = `Property '${patternName}' already exist on validator instance.`;
        throw Error(errorMessage);
    },
    msg: {
        nullValue () {
            return `Attempted to get properties of values undefined or null. If you want to validate primitive values such as undefined or null please add ${SYM_SCHEMA_FLAT.toString()} symbol to the pattern. Then whole data value will be passed to check invoking function.`;
        },
        nonIterable () {
            return `Attempted to iterate over data value. But it does not have defined ${Symbol.iterator.toString()} property.`;
        },
        validationError (propName: string) {
            return `Validation error - value failed check at [${propName}].`;
        }
    },
};
