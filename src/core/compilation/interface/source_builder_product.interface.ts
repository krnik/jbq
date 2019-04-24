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
    arguments: any[];
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
