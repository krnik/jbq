/**
 * TYPE CONSTANTS, NAMES, INTERFACES
 */
// Properties
export const SYM_TYPE_VALIDATE = Symbol.for('type_validate');
export const SYM_TYPE_PARSE = Symbol.for('type_parse');
const PERMISSION = 'permission';
const REQUIRED = 'required';
const MIN_LEN = 'minLen';
const MAX_LEN = 'maxLen';
const REGEX = 'regex';
const TYPE = 'type';
const LEN = 'len';
const MIN = 'min';
const MAX = 'max';
export const TYPE_PROPERTY = {
    PERMISSION,
    REQUIRED,
    MIN_LEN,
    MAX_LEN,
    REGEX,
    TYPE,
    LEN,
    MIN,
    MAX,
};
// Type Names
export const TYPE_NAME = {
    BOOLEAN: 'boolean',
    STRING: 'string',
    NUMBER: 'number',
    OBJECT: 'object',
    ARRAY: 'array',
    ROOT: 'root',
 };

type TypePrototypeParseMethod = (...args: any[]) => { base: any, check: TypePrototypeMethod };
type TypePrototypeValidateMethod = (...args: any[]) => void;
type TypePrototypeMethod = (...args: any[]) => boolean;
interface ITypePrototypeParse {
    [method: string]: TypePrototypeParseMethod;
}
interface ITypePrototypeValidate {
    [method: string]: TypePrototypeValidateMethod;
}
export interface ITypePrototype {
    [SYM_TYPE_PARSE]: ITypePrototypeParse;
    [SYM_TYPE_VALIDATE]: ITypePrototypeValidate;
    [method: string]: TypePrototypeMethod;
}
/**
 * SCHEMA CONSTANTS, INTERFACES
 */
export const SYM_SCHEMA_OBJECT = Symbol.for('schema_object');
export const SYM_SCHEMA_COLLECTION = Symbol.for('schema_collection');
export const SYM_SCHEMA_FLAT = Symbol.for('schema_flat');
export const SYM_SCHEMA_CONFIG = Symbol.for('schema_config');

interface ISchemaConfig {
    [TYPE]: string;
    [setting: string]: any;
}
interface ISchema {
    [SYM_SCHEMA_FLAT]?: boolean;
    [SYM_SCHEMA_CONFIG]?: ISchemaConfig;
    [SYM_SCHEMA_OBJECT]?: ISchema;
    [SYM_SCHEMA_COLLECTION]?: ISchema;
    [property: string]: any;
}
export interface ISchemas {
    [schema: string]: ISchema;
}
