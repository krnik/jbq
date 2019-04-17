import { TYPE } from '../../constants';
import { printToken } from '../../utils/print_token';

export class CompilationError {
    public static missingType (typeName: string): Error {
        const errorMessage = `Could not find defintion of ${
            printToken.typePrototype(typeName)
            } type.`;
        return new Error(errorMessage);
    }

    public static missingSchemaTypeProperty (schema: { [k: string]: any }): Error {
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
    }

    public static missingTypeMethod (typeName: string, methodName: string) {
        const errorMessage = `Could not find method ${
            printToken.property(methodName)
            } in ${
            printToken.typePrototype(typeName)
            } type.`;
        return new Error(errorMessage);
    }
}
