import { TYPE } from '../constants';
import { printToken } from '../utils/print_token';

export const CompilationError = {
    missingType (typeName: string) {
        const errorMessage = `Could not find defintion of ${printToken.typePrototype(typeName)} type.`;
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
    missingTypeMethod (typeName: string, methodName: string) {
        const errorMessage = `Could not find method ${printToken.property(methodName)} in ${printToken.typePrototype(typeName)} type.`;
        return new Error(errorMessage);
    },
};

export const CodeBuilderError = {
    invalidDataPath (dataPath: string | string[]) {
        const errorMessage = `Data path in schema is invalid because it resolves to empty array. Please revisit this value ${dataPath}`;
        return new Error(errorMessage);
    },
    emptyConditionArray () {
        const errorMessage = 'CodeBuilder.createIf cannot create "if conditions" from an empty array.';
        return new Error(errorMessage);
    },
    variableAndDataVarFalsy () {
        const errorMessage = 'CodeBuilder.createIf cannot create "if conditions" if left-hand side of an operator is falsy.';
        return new Error(errorMessage);
    },
};
