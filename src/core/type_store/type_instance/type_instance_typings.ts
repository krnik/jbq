import { RestParams } from '../../../misc/typings';
import { ValidationResult } from '../../jbq/jbq_typings';

type KeywordValidationFunction = (...args: RestParams) => ValidationResult | string | void;

/**
 * Enum defines three possible types of functions passed as
 * a `KeywordDescriptor.validator` value.
 *
 * Possible Values:
 * - `Function`
 * - `Closure`
 * - `Macro`
 */
export enum KeywordValidationFunctionKind {
    /**
     * Defines a function that is not a closure and can be safelly stringified
     * in order to create keyword validation block. Those function should have the following
     * signature.
     *
     * `schemaValue` - value defined in schema object as `keyword` property value
     *
     * `$DATA` - value that should be validated
     *
     *      function validator (
     *          schemaValue: any,
     *          $DATA: any
     *      ): ValidationResult;
     */
    Function = 'Function',
    /**
     * Defines a function that cannot be safelly stringified in order to create keyword
     * validation block. Those functions will be referenced in validation functions.
     * Closure functions should have the following signature.
     *
     * `schemaValue` - value defined in schema object as `keyword` property value
     *
     * `schemaPath` - string - path to the currently processed keyword
     *
     * `$DATA` - value that should be validated
     *
     *      function validator (
     *          schemaValue: any,
     *          schemaPath: any,
     *          $DATA: any
     *      ): ValidationResult;
     */
    Closure = 'Closure',
    /**
     * Defines a function that creates a source code of validation block itself.
     * Those functions should have the following signature.
     *
     * `parseValues` - see `ParseValues` in docs
     *
     * `checkDataPath` - function that checks if passed argument is a `$dataPath` object
     *
     * `resolveDataPath` - function that will return a string - variable name that stores
     * value resolved from the path passed as an argument
     *
     *      function validator (
     *          parseValues: ParseValues,
     *          checkDataPath: DataPathChecker,
     *          resolveDataPath: DataPathResolver,
     *      ): string;
     */
    Macro = 'Macro',
}

/**
 * Defines the shape of an object passed as a second argument to the
 * `TypeInstance.prototype.setKeyword` function.
 */
export interface KeywordDescriptor {
    validator: KeywordValidationFunction;
    kind: KeywordValidationFunctionKind;
    schemaValidator: (schemaValue: unknown) => unknown;
    acceptDataPath: boolean;
}
