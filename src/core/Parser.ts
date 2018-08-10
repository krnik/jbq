import {
    SYM_SCHEMA_CHECK,
    SYM_SCHEMA_COLLECTION,
    SYM_SCHEMA_CONFIG,
    SYM_SCHEMA_FLAT,
    SYM_SCHEMA_OBJECT,
    SYM_TYPE_EXTERNAL,
    SYM_TYPE_VALIDATE,
    TYPE,
} from '../constants';
import { ITypePrototype, TypeWrapper } from '../types/Wrapper';
import { debug, E } from '../utils/index';

const INDENT = Symbol('schema_parser_indent');
export type checkFunction = (v: any) => string | undefined;
export interface ISchemaConfig {
    [INDENT]?: string;
    [TYPE]?: string;
    [option: string]: unknown;
}
export interface ISchema {
    [SYM_SCHEMA_FLAT]?: boolean;
    [SYM_SCHEMA_CONFIG]?: ISchemaConfig;
    [SYM_SCHEMA_OBJECT]?: ISchema;
    [SYM_SCHEMA_COLLECTION]?: ISchema;
    [SYM_SCHEMA_CHECK]?: checkFunction;
    [property: string]: ISchema | any;
}
export interface ISchemas {
    [schemaName: string]: ISchema;
}

function getSchemaEntries<T> (schema: { [k: string]: T }, config: ISchemaConfig, indent: string = '  ') {
    const newConfig = { ...config, ...((schema as ISchema)[SYM_SCHEMA_CONFIG] || {}) };
    newConfig[INDENT] = (newConfig[INDENT] || '') + indent;
    return {
        config: newConfig,
        entries: Object.entries(schema),
    };
}

function typePropFirst (entries: Array<[string, any]>) {
    const type = entries.filter((e) => e[0] === TYPE);
    const rest = entries.filter((e) => e[0] !== TYPE);
    return [...type, ...rest];
}

function createFN (
    typeName: string,
    type: ITypePrototype,
    entries: Array<[string, any]>,
    config: ISchemaConfig,
): checkFunction {
    let fn = '\'use strict\';';
    const paramsNames: string[] = [];
    const paramsValues: any[] = [];
    for (const [key, value] of entries) {
        debug('magenta', key, config[INDENT]);
        if (!type[key]) throw Error(E.missingTypeMethod(typeName, key));
        type[SYM_TYPE_VALIDATE][key](value);
        const paramName = `__${typeName}_${key}`;
        if (type[SYM_TYPE_EXTERNAL] && (type[SYM_TYPE_EXTERNAL] as string[]).includes(key)) {
            const typeMethod = type[key].bind(null, value);
            fn = `${fn}\n${paramName}(value);`;
            paramsValues.push(typeMethod);
        } else {
            const typeMethodBody = (type[key].toString().match(/{[\W\w]+}/g) as RegExpMatchArray)[0];
            const indent = typeMethodBody.match(/([^\n]+)}$/) || '';
            fn = `${fn}\n${indent && indent[1]}${typeMethodBody.replace(/\bbase\b/g, paramName)}`;
            paramsValues.push(value);
        }
        paramsNames.push(paramName);
    }
    const resultFn = new Function([...paramsNames, 'value'].toString(), fn);
    return resultFn.bind(null, ...paramsValues);
}

function parseSchema (types: TypeWrapper, schema: ISchema, config: ISchemaConfig, name: string) {
    const pattern: ISchema = {};
    const typeName: string = schema[TYPE] || config[TYPE];
    if (!types.has(typeName)) E.missingType(typeName);
    const type = types.get(typeName) as ITypePrototype;

    const {
        config: schemaConfig,
        entries: schemaEntries,
    } = getSchemaEntries({ ...config, ...schema }, config);
    if (schemaEntries.length)
        pattern[SYM_SCHEMA_CHECK] = createFN(typeName, type, typePropFirst(schemaEntries), schemaConfig);
    if (schema.hasOwnProperty(SYM_SCHEMA_FLAT))
        pattern[SYM_SCHEMA_FLAT] = schema[SYM_SCHEMA_FLAT];
    if (schema.hasOwnProperty(SYM_SCHEMA_OBJECT))
        pattern[SYM_SCHEMA_OBJECT] = parser(
            types,
            { [name]: schema[SYM_SCHEMA_OBJECT] as ISchema },
            schemaConfig,
        )[name];
    if (schema.hasOwnProperty(SYM_SCHEMA_COLLECTION))
        pattern[SYM_SCHEMA_COLLECTION] = parser(
            types,
            { [name]: schema[SYM_SCHEMA_COLLECTION] as ISchema },
            schemaConfig,
        )[name];
    return pattern;
}

export function parser (types: TypeWrapper, schemas: ISchemas, config: ISchemaConfig) {
    const patterns = {} as ISchemas;
    const {
        entries,
        config: schemasConfig,
    } = getSchemaEntries(schemas, config, '');
    for (const [schemaName, schema] of entries) {
        debug('yellow', schemaName, schemasConfig[INDENT]);
        if (schema.hasOwnProperty(SYM_SCHEMA_FLAT))
            patterns[schemaName] = parseSchema(types, schema, schemasConfig, schemaName);
        else {
            patterns[schemaName] = {};
            const {
                config: schemaConfig,
                entries: schemaEntries,
            } = getSchemaEntries(schema, schemasConfig);
            for (const [propertyName, property] of schemaEntries) {
                debug('blue', propertyName, schemaConfig[INDENT]);
                patterns[schemaName][propertyName] = parseSchema(types, property, schemaConfig, propertyName);
            }
        }
    }
    return patterns;
}
