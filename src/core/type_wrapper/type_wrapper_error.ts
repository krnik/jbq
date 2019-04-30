import { SYM_METHOD_CLOSURE, SYM_METHOD_MACRO, SYM_TYPE_VALIDATE } from '../../misc/constants';
import { PrintToken } from '../../util/print_token';

export class TypeWrapperErorr {
    public static typeAlreadyExists(typeName: string): Error {
        const errorMessage = `Couldn't add ${PrintToken.typePrototype(
            typeName,
        )} type because it already exists.`;
        return new Error(errorMessage);
    }

    public static typeToExtendWithDoesntExists(typeName: string, protoName: string): Error {
        const errorMessage = `Couldn't extend ${PrintToken.typePrototype(
            typeName,
        )} with ${PrintToken.typePrototype(protoName)} because it does not exist.`;
        return new Error(errorMessage);
    }

    public static invalidProperty(typeName: string, propertyName: string, desired: string): Error {
        const errorMessage = `Couldn't add ${PrintToken.typePrototype(
            typeName,
        )} type because its ${PrintToken.property(
            propertyName,
        )} property is not of ${PrintToken.type(desired)} type.`;
        return new Error(errorMessage);
    }

    public static invalidMethodSymbols(typeName: string, methodName: string): Error {
        const errorMessage = `Couldn't add ${PrintToken.typePrototype(
            typeName,
        )} because it's method ${PrintToken.property(
            methodName,
        )} has invalid symbol properties. Type cannot have both [${SYM_METHOD_CLOSURE.toString()}] and [${SYM_METHOD_MACRO.toString()}] properties set to true.`;
        return new Error(errorMessage);
    }

    public static missingSchemaValueValidaor(typeName: string, property: string): Error {
        const errorMessage = `${PrintToken.typePrototype(
            typeName,
        )} type must have ${PrintToken.property(
            property,
        )} schema validator function defined in [${SYM_TYPE_VALIDATE.toString()}] property.`;
        return new Error(errorMessage);
    }

    public static missingTypeToAddMethod(typeName: string, methodName: string): Error {
        const errorMessage = `Couldn't add ${PrintToken.property(
            methodName,
        )} method to ${PrintToken.typePrototype(typeName)} because it does not exists.`;
        return new Error(errorMessage);
    }

    public static typeAddMethodAlreadyExists(typeName: string, methodName: string): Error {
        const errorMessage = `Couldn't add ${PrintToken.property(
            methodName,
        )} method to ${PrintToken.typePrototype(typeName)} because method already exists.`;
        return new Error(errorMessage);
    }
}
