import { Print } from '../../util/print_token';

export class TypeStoreError {
    public static typeAlreadyExists(typeName: string): Error {
        const errorMessage = `Couldn't add ${Print.typeDef(
            typeName,
        )} type because it already exists.`;
        return new Error(errorMessage);
    }

    public static typeNotFound(typeName: string): Error {
        const errorMessage = `Couldn't find ${Print.typeDef(typeName)} type in TypeStore.`;
        return new Error(errorMessage);
    }
}
