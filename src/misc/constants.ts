/**
 * If TypeMethod function have this property
 * set to true then code generator will use a reference to this function in validation
 * function instead of extracting its body. This allows to use external variables during
 * validation what would not be possible in some cases  if the function body
 * would be stringified.
 *
 * *Used in TypePrototype/TypeDefinition*
 */
export const SYM_METHOD_CLOSURE = Symbol.for('type_method_closure');

/**
 * If set to true defines type of TypeMethod function that will return
 * a chunk of validation function. So instead of being parsed this function is simply
 * invoked with some Code Generator helper functions passed as arguments.
 * See [VALUE](https://github.com/krnik/jbq/blob/master/src/types/Number.ts) method example.
 *
 * *Used in TypePrototype/TypeDefinition*
 */
export const SYM_METHOD_MACRO = Symbol.for('type_method_macro');

/**
 * Determines order in which the type methods are used during creation
 * of validation function. If not defined, the order will depend on
 * ECMASCript implementation.
 *
 * If this property value is `['required']` then before all other method
 * the method `required` will be parsed and appended to the validation
 * function code.
 *
 * *Used in TypePrototype/TypeDefinition*
 */
export const SYM_TYPE_KEY_ORDER = Symbol.for('type_key_order');

/**
 * Part of the TypePrototype/TypeDefinition. Contains methods
 * that are used to validate schema input. Should throw on incorrect
 * schema input value.
 *
 * *Used in TypePrototype/TypeDefinition*
 */
export const SYM_TYPE_VALIDATE = Symbol.for('type_validate');

/**
 * Used to indicate if collection can be indexed by number indices.
 *
 * `Array` type has this value set to `true` in its TypePrototype.
 * This results in using `for(let i=0;i<len;i++)` loop instead of
 * using [Iterable Protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols)
 * for performance reasons.
 *
 * *Used in TypePrototype/TypeDefinition*
 */
export const SYM_TYPE_FOR_LOOP = Symbol.for('type_for_loop');

export const CONSTRUCTOR_NAME = 'constructorName';
export const INSTANCE_OF = 'instanceOf';
export const MULTIPLE_OF = 'multipleOf';
export const PROPERTIES = 'properties';
export const PROP_COUNT = 'propCount';
export const KEY_COUNT = 'keyCount';
export const REQUIRED = 'required';
export const INCLUDES = 'includes';
export const ONE_OF = 'oneOf';
export const REGEX = 'regex';
export const EVERY = 'every';
export const VALUE = 'value';
export const TYPE = 'type';
export const SOME = 'some';
export const LEN = 'len';

export enum TYPE_NAME {
    BOOLEAN = 'boolean',
    STRING = 'string',
    NUMBER = 'number',
    OBJECT = 'object',
    ARRAY = 'array',
    ANY = 'any',
}

/**
 * Schema property used to indicate that the follownig schema expects data
 * to have some properties to validate. Used to describe nested schemas.
 *
 * # Examples
 * Following schema defines an `object` type with two properties `name` and `email`
 * of type `string`
 *
 *      const schema = {
 *          type: "object",
 *          [SYM_SCHEMA_PROPERTIES]: {
 *              name: { type: "string" },
 *              email: { type: "string" },
 *          }
 *      };
 */
export const SYM_SCHEMA_PROPERTIES = Symbol.for('schema_properties');

/**
 * Similar to *SYM_SCHEMA_PROPERTIES*. *SYM_SCHEMA_COLLECTION* expects schema object
 * as a value while *SYM_SCHEMA_PROPERTIES* expects object which properties
 * are different subschemas.
 *
 * Schema from this property is applied to all elements of a collection.
 *
 * # Examples
 * Following schema defines an `array` type that have all its elements of `number` type.
 *
 *      const schema = {
 *          type: "array",
 *          [SYM_SCHEMA_COLLECTION]: {
 *              type: "number",
 *          }
 *      };
 */
export const SYM_SCHEMA_COLLECTION = Symbol.for('schema_collection');

/**
 * Token that is replaced by labeled break statement during compilation.
 */
export const TOKEN_BREAK = '//{break}';
/**
 * Regular expression used to find templte expressions during compilation.
 * They're executed during compile time and should return values that are
 * possible to represent as a literal.
 *
 * Reason why we might want to have such expressions is that its much more
 * efficient to execute expression once and save its result instead of executing
 * it every time some value is validated.
 */
export const TOKEN_EXPR_REGEX = /{{(.*?)}}/g;

/**
 * Enum representing parameter names of validation function.
 */
export enum ParameterName {
    Data = '$DATA',
    Arguments = '$ARGS',
    SchemaValue = 'schemaValue',
    SchemaPath = 'schemaPath',
    ResolvedValue = 'resolvedValue',
}

/**
 * Enum representing a ways of dealing with `$dataPath` resolution.
 * Each of the variants defines what to do if `$dataPath` resolves
 * to `undefined`.
 */
export enum PathResolutionStrategy {
    /**
     * If `$dataPath` resolves to `undefined` - skip the check of a property that
     * expected value.
     */
    Skip = 'skip',
    /**
     * Validate resolved `$dataPath` is validated by schema.
     *
     * # Examples
     *
     * If the value from path `/age` resolves to a value that is not a `number`
     * the validation function will return an error.
     *
     *      const schema = {
     *          type: "number",
     *          min: {
     *              $dataPath: "/age",
     *              type: "number",
     *          }
     *      };
     */
    Schema = 'schema',
    /**
     * Returns an error from validation function.
     */
    Return = 'return',
    /**
     * Ignores the fact that the `$dataPath` resolved to undefined.
     */
    Ignore = 'ignore',
}

export const SCHEMA_PATH_SEPARATOR = '/';

export const PROP_DATA_PATH = '$dataPath';
