import { printToken } from '../utils/print_token';

export const TypeProtoError = {
    missingArgument (typeName: string, methodName: string) {
        const errorMessage = `Schema validation method ${printToken.typePrototype(typeName)} in ${printToken.property(methodName)} type expects 'schemaValue' parameter to not be undefined.`;
        throw new Error(errorMessage);
    },
};

export const SchemaValidationError = {
    invalidSchemaType (
        typeName: string,
        methodName: string,
        expectedType: string,
        type: string,
    ) {
        const errorMessage = `${printToken.property(methodName)} property in ${printToken.typePrototype(typeName)} type requires schema value to be a ${printToken.type(expectedType)}. Got ${printToken.type(type)} type instead.`;
        return new Error(errorMessage);
    },
};
