import { REQUIRED, SYM_SCHEMA_COLLECTION, SYM_SCHEMA_CONFIG, SYM_SCHEMA_PROPERTIES, SYM_TYPE_EXTERNAL, SYM_TYPE_FOR_LOOP, SYM_TYPE_NAME, SYM_TYPE_VALIDATE, TYPE } from '../constants';
import { IType, TypeWrapper } from '../types/Wrapper';
import { debug, E, is } from '../utils/index';

const DATA_VAR = '_d';
const INDENT = Symbol('parser_indent');

export interface ISchemaConfig {
    [INDENT]?: string;
    [TYPE]?: string;
}
export interface ISchema {
    [SYM_SCHEMA_CONFIG]?: ISchemaConfig;
    [SYM_SCHEMA_PROPERTIES]?: ISchemas;
    [SYM_SCHEMA_COLLECTION]?: ISchema;
    [property: string]: any;
}
export interface ISchemas {
    [schemaName: string]: ISchema;
}
type ValidateFunction = (data: any) => string | undefined;
type ParserResult<T> = {
    [K in keyof T]: ValidateFunction;
};

function getSchemaEntries<T extends ISchema> (
    schema: T,
    config: ISchemaConfig,
    indent: string = '  ',
) {
    const newConfig = {
        ...config,
        ...(schema[SYM_SCHEMA_CONFIG] || {}),
    };
    newConfig[INDENT] = (newConfig[INDENT] || '') + indent;
    return {
        config: newConfig,
        entries: Object.entries(schema),
    };
}

function sortEntriesByKeys (entries: Array<[string, any]>, firstKeys: string[]) {
    const result = firstKeys.reduce((acc, key) => {
        const entry = entries.find(([k]) => k === key);
        return entry
            ? (acc.push(entry), acc)
            : acc;
    }, ([] as Array<[string, any]>));
    const rest = entries.filter(([key]) => !firstKeys.includes(key));
    return [...result, ...rest];
}

function replacePhrase (base: string, phrase: string, to: string) {
    const regex = new RegExp(`[^\\w$_]\\b(${phrase})\\b[^\\w$_]?`, 'g');
    return base.replace(regex, (match, $1) => match.replace($1, to));
}

function getSourceCode (
    type: IType,
    entries: Array<[string, any]>,
    config: ISchemaConfig,
    dataVar: string,
    label: string,
) {
    const source = {
        code: '',
        params: [] as string[],
        args: [] as any[],
    };
    for (const [key, value] of entries) {
        debug('magenta', key, config[INDENT]);
        if (!type[key]) E.missingTypeMethod(type[SYM_TYPE_NAME], key);
        type[SYM_TYPE_VALIDATE][key](value);

        const paramName = `${dataVar}$${key}`;
        if (type[SYM_TYPE_EXTERNAL] && type[SYM_TYPE_EXTERNAL]!.includes(key)) {
            const typeMethod = type[key].bind(undefined, value);
            source.code += `\n${paramName}(${dataVar});`;
            source.args.push(typeMethod);
            source.params.push(paramName);
        } else {
            const methodBody = (type[key]
                .toString()
                .match(/{[\W\w]+}/g) as RegExpMatchArray)[0]
                .replace('///break', `\nbreak ${label};\n`);
            let code = replacePhrase(methodBody, 'data', dataVar);
            if (is.primitiveLiteral(value)) {
                code = replacePhrase(code, 'base', is.toLiteral(value));
                source.code += `\n${code}`;
            } else {
                code = replacePhrase(code, 'base', paramName);
                source.code += `\n${code}`;
                source.args.push(value);
                source.params.push(paramName);
            }
        }
    }
    return source;
}

function parseSchema (
    types: TypeWrapper,
    schema: ISchema,
    config: ISchemaConfig,
    name: string,
    dataVar: string,
    label: string,
) {
    debug('yellow', name, config[INDENT]);
    const typeName: string = schema[TYPE] || config[TYPE];
    if (!types.has(typeName)) E.missingType(typeName);
    const type = types.get(typeName)!;
    const source = {
        code: '',
        params: [] as string[],
        args: [] as any[],
    };
    const {
        config: schemaConfig,
        entries: schemaEntries,
    } = getSchemaEntries({ ...config, ...schema }, config);
    if (schemaEntries.length) {
        const src = getSourceCode(
            type,
            sortEntriesByKeys(schemaEntries, [TYPE, REQUIRED]),
            schemaConfig,
            dataVar,
            label,
        );
        source.code += `\n${label}: {${src.code}`;
        source.params.push(...src.params);
        source.args.push(...src.args);
    } else E.noKeysInSchema(name);
    if (schema.hasOwnProperty(SYM_SCHEMA_PROPERTIES)) {
        const allKeys = [
            ...Object.getOwnPropertyNames(schema[SYM_SCHEMA_PROPERTIES]),
            ...Object.getOwnPropertySymbols(schema[SYM_SCHEMA_PROPERTIES]),
        ];
        for (const [i, key] of allKeys.entries()) {
            const newDataVar = `${dataVar}_k${i}`;
            const src = parseSchema(
                types,
                schema[SYM_SCHEMA_PROPERTIES]![key as any],
                schemaConfig,
                key.toString(),
                newDataVar,
                `${newDataVar}_label`,
            );
            if (typeof key !== 'string') {
                const keyParam = `${newDataVar}$`;
                source.code += `\nconst ${newDataVar} = ${dataVar}[${keyParam}];${src.code}`;
                source.params.push(...[...src.params, keyParam]);
                source.args.push(...[...src.args, key]);
            } else {
                source.code += `\nconst ${newDataVar} = ${dataVar}['${key.replace('\'', '\\\'')}'];${src.code}`;
                source.params.push(...src.params);
                source.args.push(...src.args);
            }
        }
    }
    if (schema.hasOwnProperty(SYM_SCHEMA_COLLECTION)) {
        const useForOf = !type[SYM_TYPE_FOR_LOOP];
        const accessor = `${dataVar}$i`;
        const nextDataVar = useForOf
            ? `${dataVar}_i`
            : `${dataVar}[${accessor}]`;
        const src = parseSchema(
            types,
            schema[SYM_SCHEMA_COLLECTION]!,
            schemaConfig,
            name,
            nextDataVar,
            `${dataVar}_i_label`,
        );
        source.code += useForOf
            ? `
            {
                if (!(Symbol.iterator in ${dataVar})) {
                    return 'Data requires to have ${Symbol.iterator.toString()} property in order to use ${SYM_SCHEMA_COLLECTION.toString()} schema property.';
                }
                for (const ${nextDataVar} of ${dataVar}) {
                    ${src.code}
                }
            }`
            : `
            {
                for (let ${accessor} = 0; ${accessor} < ${dataVar}.length; ${accessor}++) {
                    ${src.code}
                }
            }`;
        source.params.push(...src.params);
        source.args.push(...src.args);
    }
    source.code += '\n}\n';
    return source;
}

export function parser<T extends ISchemas, K extends keyof T> (
    types: TypeWrapper,
    schemas: T,
) {
    const patterns = {} as ParserResult<T>;
    const { entries, config } = getSchemaEntries(schemas, {}, '');
    for (const [schemaName, schema] of entries) {
        const src = parseSchema(
            types,
            schema,
            config,
            schemaName,
            DATA_VAR,
            `${DATA_VAR}_label`,
        );
        const valdate = new Function([...src.params, DATA_VAR].toString(), src.code);
        patterns[schemaName as K] = valdate.bind(undefined, ...src.args);
    }
    return patterns;
}
