/**
 * TYPE CONSTANTS
 */
export const SYM_TYPE_KEY_ORDER = Symbol.for('type_key_order');
export const SYM_TYPE_EXTERNAL = Symbol.for('type_external');
export const SYM_TYPE_VALIDATE = Symbol.for('type_validate');
export const SYM_TYPE_FOR_LOOP = Symbol.for('type_for_loop');
export const CONSTRUCTOR_NAME = 'constructorName';
export const MIN_PROP_COUNT = 'minPropCount';
export const MAX_PROP_COUNT = 'maxPropCount';
export const INSTANCE_OF = 'instanceOf';
export const MULTIPLE_OF = 'multipleOf';
export const PROPERTIES = 'properties';
export const REQUIRED = 'required';
export const INCLUDES = 'includes';
export const MIN_LEN = 'minLen';
export const MAX_LEN = 'maxLen';
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
/**
 * TOKENS
 */
export const TOKEN_BREAK = '//{break}';
export const TOKEN_EXPR_REGEX = /#{((schemaValue|schemaPath).*?)}/g;
/**
 * COMPILATION CONSTANTS
 */
export const BASE_DATA_PARAMETER = '$v';
