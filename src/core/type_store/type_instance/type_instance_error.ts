import { Print } from '../../../util/print_token';

export class TypeInstanceError {
    public static keywordNotFound(keyword: string, typeName: string): Error {
        const errorMessage = `Could not find keyword: ${Print.property(
            keyword,
        )} in type ${Print.typeDef(typeName)}.`;
        return new Error(errorMessage);
    }

    public static unrecognizedKeywordInKeywordOrder(
        keywordOrder: string[],
        keyword: string,
        typeName: string,
        existingKeywords: string[],
    ): Error {
        const errorMessage = `Could not set ${Print.array(keywordOrder)} as ${Print.property(
            'keywordOrder',
        )} because type ${Print.typeDef(typeName)} does not have keyword ${Print.property(
            keyword,
        )} defined.\nDefined keywords for this type are: ${Print.array(existingKeywords)}`;
        return new Error(errorMessage);
    }

    public static typeAlreadyDerives(
        typeName: string,
        currentDerivedTypeName: string,
        derivedTypeName: string,
    ): Error {
        const errorMessage = `Could not set ${Print.typeDef(
            derivedTypeName,
        )} as type to derive from for type ${Print.typeDef(
            typeName,
        )} because it already derives from type ${Print.typeDef(currentDerivedTypeName)}.`;
        return new Error(errorMessage);
    }
}
