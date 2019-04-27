import { TYPE } from '../../misc/constants';
import { PrintToken } from '../../util/print_token';

export class CompilationError {
    public static missingType(typeName: string): Error {
        const errorMessage = `Could not find defintion of ${PrintToken.typePrototype(
            typeName,
        )} type.`;
        return new Error(errorMessage);
    }

    public static missingSchemaTypeProperty(schema: { [k: string]: unknown }): Error {
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
        const errorMessage = `Schema must have a [${TYPE}] property. Schema ${json}.`;
        return new Error(errorMessage);
    }

    public static missingTypeMethod(typeName: string, methodName: string): Error {
        const errorMessage = `Could not find method ${PrintToken.property(
            methodName,
        )} in ${PrintToken.typePrototype(typeName)} type.`;
        return new Error(errorMessage);
    }
}
