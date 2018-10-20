import { SYM_TYPE_VALIDATE, TYPE } from '../constants';

export const E = {
    wrapper: {
        invalidTypeName (type: string) {
            const errorMessage = `Can not add new type because it's name is not a "string" type. Got "${type}".`;
            return new Error(errorMessage);
        },
        typeAlreadyDefined (typeName: string) {
            const errorMessage = `Can not add <${typeName}> type because it already exists.`;
            return new Error(errorMessage);
        },
        typeNotAnObject (typeName: string, type: string) {
            const errorMessage = `Can not add <${typeName}> type because it must be an "object". Got "${type}".`;
            return new Error(errorMessage);
        },
        invalidProperty (typeName: string, property: string, desired: string) {
            const errorMessage = `Can not add <${typeName}> type because its [${property}] property is not of "${desired}" type.`;
            return new Error(errorMessage);
        },
        invalidPropertyElems (typeName: string, property: string, desired: string) {
            const errorMessage = `Can not add <${typeName}> type because it's [${property}] property elements must be of "${desired}" type.`;
            return new Error(errorMessage);
        },
        missingSchemaValueValidaor (typeName: string, key: string) {
            const errorMessage = `<${typeName}> type must have [${key}] schema validator function defined in [${SYM_TYPE_VALIDATE.toString()}] property.`;
            return new Error(errorMessage);
        },
        missingTypeExtend (typeName: string, protoName: string) {
            const errorMessage = `Can not extend <${typeName}> with <${protoName}> because it does not exist.`;
            return new Error(errorMessage);
        },
    },
    compilation: {
        missingType (type: string) {
            const errorMessage = `Could not find defintion of <${type}> type.`;
            return new Error(errorMessage);
        },

        missingTypeMethod (type: string, method: string) {
            const errorMessage  = `Could not find method [${method}] in <${type}> type.`;
            return new Error(errorMessage);
        },
        missingSchemaTypeProperty (schema: { [k: string]: any }) {
            let json: string;
            try {
                for (const sym of Object.getOwnPropertySymbols(schema)) {
                    if (sym.toString().includes('config')) continue;
                    schema[sym.toString()] = schema[sym as any];
                    delete schema[sym as any];
                }
                json = JSON.stringify(schema);
            } catch (err) {
                json = `keys: [${Object.keys(schema).join(',')}]`;
            }
            const errorMessage = `Schema must have a [${TYPE}] property. Schema ${json}.`;
            return new Error(errorMessage);
        },
    },
    invalidArgument (paramName: string, desired?: string, actual?: string) {
        const errorMessage = !desired
        ? `Parameter "${paramName}" is required.`
        : `Parameter "${paramName}" expects argument to be a "${desired}". Got "${actual}" type instead.`;
        throw new Error(errorMessage);
    },
    invalidSchemaPropType (propName: string, desired: string, valueType: string) {
        const errorMessage = `[${propName}] property requires schema value to be a "${desired}". Got "${valueType}" type instead.`;
        throw new Error(errorMessage);
    },
};
