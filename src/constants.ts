/**
 * TYPE CONSTANTS, NAMES, INTERFACES
 */
export const SYM_TYPE_VALIDATE = Symbol.for('type_validate');
export const SYM_TYPE_PARSE = Symbol.for('type_parse');
export const PERMISSION = 'permission';
export const REQUIRED = 'required';
export const INCLUDES = 'includes';
export const MIN_LEN = 'minLen';
export const MAX_LEN = 'maxLen';
export const REGEX = 'regex';
export const EVERY = 'every';
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
    ROOT: Symbol('type_root'),
 };

type TypePrototypeParseMethod = (...args: any[]) => { base: any, check: TypePrototypeMethod };
type TypePrototypeValidateMethod = (...args: any[]) => void;
type TypePrototypeMethod = (...args: any[]) => boolean;
export interface ITypePrototypeParse {
    [method: string]: TypePrototypeParseMethod;
}
export interface ITypePrototypeValidate {
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
