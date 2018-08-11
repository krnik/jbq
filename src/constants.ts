/**
 * TYPE CONSTANTS
 */
export const SYM_TYPE_EXTERNAL = Symbol.for('type_external');
export const SYM_TYPE_VALIDATE = Symbol.for('type_validate');
export const CONSTRUCTOR_NAME = 'constructorName';
export const INSTANCE_OF = 'instanceOf';
export const PERMISSION = 'permission';
export const REQUIRED = 'required';
export const INCLUDES = 'includes';
export const MIN_LEN = 'minLen';
export const MAX_LEN = 'maxLen';
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
 };
/**
 * SCHEMA CONSTANTS
 */
export const SYM_SCHEMA_PROPERTIES = Symbol.for('schema_properties');
export const SYM_SCHEMA_COLLECTION = Symbol.for('schema_collection');
export const SYM_SCHEMA_CONFIG = Symbol.for('schema_config');
export const SYM_SCHEMA_CHECK = Symbol('schema_check');
