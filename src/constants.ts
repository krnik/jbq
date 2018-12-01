/**
 * TYPE CONSTANTS
 */
export const SYM_METHOD_WITH_CLOSURE = Symbol.for('type_method_with_closure');
export const SYM_METHOD_RETURNS_BODY = Symbol.for('type_method_returns_body');
export const SYM_METHOD_RETURNS_FN = Symbol.for('type_method_returns_fn');
export const SYM_TYPE_KEY_ORDER = Symbol.for('type_key_order');
export const SYM_TYPE_VALIDATE = Symbol.for('type_validate');
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
export const MIN = 'min';
export const MAX = 'max';
export const TYPE_NAME = {
    BOOLEAN: 'boolean',
    STRING: 'string',
    NUMBER: 'number',
    OBJECT: 'object',
    ARRAY: 'array',
    ANY: 'any',
};
/**
 * SCHEMA CONSTANTS
 */
export const SYM_SCHEMA_PROPERTIES = Symbol.for('schema_properties');
export const SYM_SCHEMA_COLLECTION = Symbol.for('schema_collection');
export const SYM_SCHEMA_CONFIG = Symbol.for('schema_config');
export const SYM_SCHEMA_INHERIT = Symbol.for('schema_inherit');
/**
 * TOKENS
 */
export const TOKEN_BREAK = '//{break}';
export const TOKEN_EXPR_REGEX = /#{((schemaValue|schemaPath).*?)}/g;
/**
 * COMPILATION CONSTANTS
 */
export const BASE_DATA_PARAMETER = '$v';
