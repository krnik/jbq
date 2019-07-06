/**
 * Interface representing internal context of `SourceBuider` instance.
 * It's used to keep track of variable names, currently processed schema
 * property and schema path from root to the property.
 */
export interface SourceBuilderContext {
    /**
     * Represents variable name that is a source of data for currently processed
     * part of the schema.
     *
     * For root schema the variableName would be the `$DATA` parameter of the
     * validation function.
     */
    variableName: string;
    /**
     * Represents `Schema` property that is currently processed.
     * It's used to create `schemaPath` by adding the property name after `#` at
     * the end of the `schemaPath`
     */
    currentProperty: string;
    /**
     * Represents path from `Schema` root to currently processed part of it.
     */
    schemaPath: string;
}

export interface SourceBuilderSnapshot extends SourceBuilderContext {
    restore(): void;
}

/**
 * Utility interface that represents internal state of SourceBuilder instance.
 * It's used to track how many variables or parameters were created during compilation
 * and to use the correct index of parameter when there is a need to extract parameter.
 *
 * For example if `TypeMethod` is defined as closure via `Symbol.for('type_method_closure')`
 * it will be pushed to `parameters` of the function to keep its scope values untouched.
 */
export interface SourceBuilderCounter {
    /**
     * `ofDataVariables` represents number of variables created
     * by accessing `$DATA` properties.
     */
    ofDataVariables: number; // rename
    /**
     * Represents numbers of parameters created for current validation function.
     * It's used during compilation to track which index of parameter should be
     * used when needed.
     */
    parameters: number;
}

/**
 * An interface that is used to create end-product of the `SourceBuilder` that
 * is a validation functions.
 * It cointains all necessary elements needed to create one.
 */
export interface SourceBuilderProduct {
    /**
     * Property that contains string content of validation function.
     */
    code: string;
    /**
     * An array that contains all the values that will be passed as an
     * `argumentsParameter` to the validation function.
     *
     * Array is used instead of naming every argument separately because
     * functions length is `u8` type while arrays length is `u32` type.
     */
    arguments: unknown[];
    /**
     * Name of the parameter that represents input value.
     */
    dataParameter: string;
    /**
     * Name of the parameter that represents an array of arguments that validation
     * function expects.
     */
    argsParameter: string;
}
