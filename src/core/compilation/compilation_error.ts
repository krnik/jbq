import { TYPE } from '../../misc/constants';
import { Print } from '../../util/print_token';

export class CompilationError {
    public static missingType(typeName: string): Error {
        const errorMessage = `Could not find defintion of ${Print.typeDef(typeName)} type.`;
        return new Error(errorMessage);
    }

    public static missingSchemaTypeProperty(schema: { [k: string]: unknown }, path: string): Error {
        let json: string;
        try {
            for (const sym of Object.getOwnPropertySymbols(schema)) {
                schema[sym.toString()] = schema[(sym as unknown) as string];
                delete schema[(sym as unknown) as string];
            }
            json = JSON.stringify(schema);
        } catch (err) {
            json = `keys: [${Object.keys(schema).join(',')}]`;
        }
        const errorMessage = `Schema must have a [${TYPE}] property. Schema ${json}. Path: ${path}.`;
        return new Error(errorMessage);
    }

    public static missingTypeMethod(typeName: string, methodName: string): Error {
        const errorMessage = `Could not find method ${Print.property(
            methodName,
        )} in ${Print.typeDef(typeName)} type.`;
        return new Error(errorMessage);
    }
}
