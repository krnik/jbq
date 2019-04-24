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
