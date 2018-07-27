import { TypeWrapper } from '../types/Wrapper';
import { TYPE, SYM_SCHEMA_COLLECTION, SYM_SCHEMA_CONFIG, SYM_SCHEMA_FLAT, SYM_SCHEMA_OBJECT, ITypePrototype } from '../constants';
import { debug, E } from '../utils/index';
const INDENT = Symbol('schema_parser_indent');

interface ISchemaConfig {
    [INDENT]?: string;
    [TYPE]?: string;
    [option: string]: unknown;
}

interface ISchema {
    [SYM_SCHEMA_FLAT]?: boolean;
    [SYM_SCHEMA_CONFIG]?: ISchemaConfig;
    [SYM_SCHEMA_OBJECT]?: ISchema;
    [SYM_SCHEMA_COLLECTION]?: ISchema;
    [property: string]: ISchema | any;
}
interface ISchemas {
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

function sortTypeFirst (a: [string, any], b: [string, any]) {
    switch (true) {
    case a[0] === TYPE: return 1;
    case b[0] === TYPE: return 1;
    default: return -1;
    }
}

function parseSchema (types: TypeWrapper, schema: ISchema, config: ISchemaConfig, name: string) {
    const pattern: ISchema = {
        check: [],
    };
    const typeName: string = schema[TYPE] || config[TYPE];
    if (!types.has(typeName)) E.missingType(typeName);
    const type = types.get(typeName) as ITypePrototype;

    const { config: schemaConfig, entries: schemaEntries } = getSchemaEntries(schema, config);
    for (const [key, value] of schemaEntries.sort(sortTypeFirst)) {
        debug('magenta', key, schemaConfig[INDENT]);
        pattern.check.push(type[key].bind(type, value));
    }

    if (schema.hasOwnProperty(SYM_SCHEMA_FLAT)) pattern[SYM_SCHEMA_FLAT] = schema[SYM_SCHEMA_FLAT];
    if (schema.hasOwnProperty(SYM_SCHEMA_OBJECT)) {
        pattern[SYM_SCHEMA_OBJECT] = parser(types, { [name]: schema[SYM_SCHEMA_OBJECT] as ISchema }, schemaConfig)[name];
    }
    if (schema.hasOwnProperty(SYM_SCHEMA_COLLECTION)) {
        pattern[SYM_SCHEMA_COLLECTION] = parser(types, { [name]: schema[SYM_SCHEMA_COLLECTION] as ISchema }, schemaConfig)[name];
    }
    return pattern;
}

export function parser (types: TypeWrapper, schemas: ISchemas, config: ISchemaConfig) {
    const patterns: ISchemas = {};
    const {
        entries,
        config: schemasConfig,
    } = getSchemaEntries(schemas, config, '');
    for (const [schemaName, schema] of entries) {
        debug('yellow', schemaName, schemasConfig[INDENT],);
        if (schema.hasOwnProperty(SYM_SCHEMA_FLAT)) {
            patterns[schemaName] = parseSchema(types, schema, schemasConfig, schemaName);
        } else {
            patterns[schemaName] = {};
            const {
                config: schemaConfig,
                entries: schemaEntries,
            } = getSchemaEntries(schema, schemasConfig);
            for (const [propertyName, property] of schemaEntries) {
                debug('blue', propertyName, schemaConfig[INDENT]);
                patterns[schemaName][propertyName] = parseSchema(types, property, schemaConfig, schemaName);
            }
        }
    }
    // console.log(patterns);
    return patterns;
}

