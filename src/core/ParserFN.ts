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
    [SYM_SCHEMA_CHECK]?: Array<() => void>;
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

function typePropFirst (entries: [string, any][]) {
    const _type = entries.filter((e) => e[0] === TYPE);
    const _rest = entries.filter((e) => e[0] !== TYPE);
    return [..._type, ..._rest];
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
    let fn = `
      'use strict';
`;
    const argNames = [];
    const args = [];
    for (const [key, value] of typePropFirst(schemaEntries)) {
        debug('magenta', key, schemaConfig[INDENT]);
        let fnBody = type[key].toString().match(/{[\W\w]+}/g)[0];
        const argName = `__${typeName}_${key}`;
        fnBody = fnBody.replace(/\bbase\b/g, argName);
        argNames.push(argName);
        args.push(value);
        fn = fn + '\n' + fnBody;
    }
    // console.log(fn);
    // fn = fn + '}';
    // fn = fn.replace(/<args>/g, [...argNames, 'value']);
    fn = new Function([...argNames, 'value'].toString(), fn);
    // console.log(fn.toString());
    pattern[SYM_SCHEMA_CHECK] = fn.bind(null, ...args);
    pattern[SYM_SCHEMA_CHECK](...[...args, 'Mario']);
    // console.log(pattern[SYM_SCHEMA_CHECK]);
    if (schema.hasOwnProperty(SYM_SCHEMA_FLAT)) pattern[SYM_SCHEMA_FLAT] = schema[SYM_SCHEMA_FLAT];
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
