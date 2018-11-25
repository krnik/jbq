import { TYPE } from '../constants';

export const Err = {
    codeChunk: {
        invalidDataPath (dataPath: string | string[]) {
            const errorMessage = `Data path in schema is invalid because it resolves to empty array. Please revisit this value ${dataPath}`;
            return new Error(errorMessage);
        },
    },
    compilation: {
        missingType (type: string) {
            const errorMessage = `Could not find defintion of <${type}> type.`;
            return new Error(errorMessage);
        },

        missingTypeMethod (type: string, method: string) {
            const errorMessage = `Could not find method [${method}] in <${type}> type.`;
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
};
