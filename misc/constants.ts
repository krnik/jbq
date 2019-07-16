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

export const TYPE_BOOLEAN = 'boolean';
export const TYPE_STRING = 'string';
export const TYPE_NUMBER = 'number';
export const TYPE_OBJECT = 'object';
export const TYPE_ARRAY = 'array';
export const TYPE_ANY = 'any';

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
export const EXPRESSION_REGEX = /{{(.*?)}}/g;

export const SCHEMA_PATH_SEPARATOR = '/';

export const PROP_DATA_PATH = '$dataPath';

/** Default value for the `JBQOptions.asyncInterval` property. */
export const DEFAULT_ASYNC_INTERVAL = 50;
