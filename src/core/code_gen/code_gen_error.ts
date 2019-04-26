export class CodeGeneratorError {
    public static emptyIfConditionArray(): Error {
        const errorMessage =
            'CodeGenerator.renderIfStatement cannot create "if conditions" from an empty array.';
        return new Error(errorMessage);
    }

    public static invalidDataPath(dataPath: string | string[]): Error {
        const errorMessage = `Data path in schema is invalid because it resolves to empty array. Please revisit this value ${dataPath}`;
        return new Error(errorMessage);
    }
}
