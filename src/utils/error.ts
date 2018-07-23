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
};
