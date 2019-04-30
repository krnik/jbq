import { SYM_METHOD_CLOSURE, SYM_METHOD_MACRO } from '../../../misc/constants';

/**
 * Interface representing a function that is a TypeDefinition validation method.
 * This function is used to build final validation function.
 *
 * Usually, during building of validation function, TypeMethod function is stringified
 * and its body is used to build a validation block in validation function.
 *
 * There are two exceptions. Symbols defined below determine behavior of code generator
 * when parsing TypeMethod with respective property.
 *
 * `[Symbol.for('type_method_closure')]` - If TypeMethod function have this property
 * set to true then code generator will use a reference to this function in validation
 * function instead of extracting its body. This allows to use external variables during
 * validation what would not be possible in some cases  if the function body
 * would be stringified.
 *
 * `[Symbol.for('type_method_macro')]` - Type of TypeMethod function that will return
 * a chunk of validation function. So instead of being parsed this function is simply
 * invoked with some Code Generator helper functions passed as arguments.
 * See [VALUE](https://github.com/krnik/jbq/blob/master/src/types/Number.ts) method example.
 */
export interface TypeMethod {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (...args: any[]): string | undefined | void;
    [SYM_METHOD_CLOSURE]?: boolean;
    [SYM_METHOD_MACRO]?: boolean;
}

/**
 * Alias to any function that is used to validate schema input.
 */
export type TypeValidationMethod = (v: unknown) => void;
