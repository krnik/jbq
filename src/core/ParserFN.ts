import { SYM_SCHEMA_CHECK, SYM_SCHEMA_COLLECTION, SYM_SCHEMA_CONFIG, SYM_SCHEMA_FLAT, SYM_SCHEMA_OBJECT, TYPE } from '../constants';
import { TypeWrapper, ITypePrototype } from '../types/Wrapper';
import { debug, E } from '../utils/index';
const INDENT = Symbol('schema_parser_indent');

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
    [SYM_SCHEMA_CHECK]?: (v: any) => void;
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

function createFN (typeName: string, type: ITypePrototype, entries: Array<[string, any]>, config: ISchemaConfig): (v: any) => void {
    let fn = `'use strict';`;
    const paramsNames: string[] = [];
    const paramsValues: any[] = [];
    for (const [key, value] of entries) {
        debug('magenta', key, config[INDENT]);
        const typeMethodBody = (type[key].toString().match(/{[\W\w]+}/g) as RegExpMatchArray)[0];
        const paramName = `__${typeName}_${key}`;
        const indent = typeMethodBody.match(/([^\n]+)}$/) || '';
        fn = `${fn}\n${indent && indent[1]}${typeMethodBody.replace(/\bbase\b/g, paramName)}`;
        paramsNames.push(paramName);
        paramsValues.push(value);
    }
    console.log(fn);
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
        pattern[SYM_SCHEMA_OBJECT] = parserFN(types, { [name]: schema[SYM_SCHEMA_OBJECT] as ISchema }, schemaConfig)[name];
    if (schema.hasOwnProperty(SYM_SCHEMA_COLLECTION))
        pattern[SYM_SCHEMA_COLLECTION] = parserFN(types, { [name]: schema[SYM_SCHEMA_COLLECTION] as ISchema }, schemaConfig)[name];
    return pattern;
}

export function parserFN (types: TypeWrapper, schemas: ISchemas, config: ISchemaConfig) {
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
