import { SYM_TYPE_VALIDATE } from '../constants';
import { printToken } from '../utils/printToken';

export const WrapperError = {
    invalidTypeName (type: string) {
        const errorMessage = `Couldn't add new type because it's name is not a ${printToken.type('string')} type. Got ${printToken.type(type)}.`;
        return new Error(errorMessage);
    },
    typeAlreadyDefined (typeName: string) {
        const errorMessage = `Couldn't add ${printToken.typeProto(typeName)} type because it already exists.`;
        return new Error(errorMessage);
    },
    typeNotAnObject (typeName: string, type: string) {
        const errorMessage = `Couldn't add ${printToken.typeProto(typeName)} type because it must be an ${printToken.type('object')}. Got ${printToken.type(type)}.`;
        return new Error(errorMessage);
    },
    invalidProperty (typeName: string, property: string, desired: string) {
        const errorMessage = `Couldn't add ${printToken.typeProto(typeName)} type because its ${printToken.property(property)} property is not of ${printToken.type(desired)} type.`;
        return new Error(errorMessage);
    },
    invalidPropertyElems (typeName: string, property: string, desired: string) {
        const errorMessage = `Couldn't add ${printToken.typeProto(typeName)} type because it's ${printToken.property(property)} property elements must be of ${printToken.type(desired)} type.`;
        return new Error(errorMessage);
    },
    missingSchemaValueValidaor (typeName: string, property: string) {
        const errorMessage = `${printToken.typeProto(typeName)} type must have ${printToken.property(property)} schema validator function defined in [${SYM_TYPE_VALIDATE.toString()}] property.`;
        return new Error(errorMessage);
    },
    missingTypeExtend (typeName: string, protoName: string) {
        const errorMessage = `Couldn't extend ${printToken.typeProto(typeName)} with ${printToken.typeProto(protoName)} because it does not exist.`;
        return new Error(errorMessage);
    },
    missingTypeToAddMethod (typeName: string, methodName: string) {
        const errorMessage = `Couldn't add ${printToken.property(methodName)} method to ${printToken.typeProto(typeName)} because type does not exists.`;
        return new Error(errorMessage);
    },
    typeAddMethodExists (typeName: string, methodName: string) {
        const errorMessage = `Couldn't add ${printToken.property(methodName)} method to ${printToken.typeProto(typeName)} because method already exists.`;
        return new Error(errorMessage);
    },
    invalidMethodType (typeName: string, methodName: string, type: string) {
        const errorMessage = `Couldn't add ${printToken.property(methodName)} to ${printToken.typeProto(typeName)} because method is not a function. It's ${printToken.type(type)}`;
        return new Error(errorMessage);
    },
    invalidMethodSymbols (typeName: string, methodName: string) {
        const errorMessage = `Couldn't add ${printToken.typeProto(typeName)} because it's method ${printToken.property(methodName)} has invalid symbol properties.`;
        return new Error(errorMessage);
    },
};

export const TypeProtoError = {
    missingArgument (typeName: string, methodName: string) {
        const errorMessage = `Schema validation method ${printToken.typeProto(typeName)} in ${printToken.property(methodName)} type expects 'schemaValue' parameter to not be undefined.`;
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
        const errorMessage = `${printToken.property(methodName)} in ${printToken.typeProto(typeName)} property requires schema value to be a ${printToken.type(expectedType)}. Got ${printToken.type(type)} type instead.`;
        return new Error(errorMessage);
    },
};
