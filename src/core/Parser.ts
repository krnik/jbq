import { SYM_SCHEMA_COLLECTION, SYM_SCHEMA_CONFIG, SYM_SCHEMA_PROPERTIES, SYM_TYPE_EXTERNAL, SYM_TYPE_FOR_LOOP, SYM_TYPE_KEY_ORDER, SYM_TYPE_NAME, SYM_TYPE_VALIDATE, TOKEN_BREAK, TOKEN_EXPR_REGEX, TYPE } from '../constants';
import { IType, TypeWrapper } from '../types/Wrapper';
import { E, is } from '../utils/index';

const INDENT = Symbol('parser_indent');

export interface IConfig {
    [TYPE]?: string;
    [INDENT]?: string;
}

export interface ISchema {
    [SYM_SCHEMA_CONFIG]?: IConfig;
    [SYM_SCHEMA_PROPERTIES]?: ISchemas;
    [SYM_SCHEMA_COLLECTION]?: ISchema;
    [property: string]: any;
}

export interface ISchemas {
    [schema: string]: ISchema;
}

interface INames {
    var: string;
    prop: string;
    path: string;
    param: string;
    count: number;
}

interface ISource {
    code: string;
    args: any[];
    params: string[];
}

interface IParserOptions {
    debug?: boolean;
}

type ValidateFn = (data: any) => string | undefined;

type OmitSymbols<T> = Pick<T, { [K in keyof T]: K extends symbol ? never : K }[keyof T]>;

type ParserResult<T> = { [P in keyof OmitSymbols<T>]: ValidateFn };

export class Parser {
    private types: TypeWrapper;
    private options: IParserOptions;

    constructor (types: TypeWrapper, opt: IParserOptions = {}) {
        this.types = types;
        this.options = {};
        if (is.boolean(opt.debug))
            this.options.debug = opt.debug;
    }

    public compile<T, K extends keyof OmitSymbols<T>> (schemas: T) {
        const patterns = {} as ParserResult<T>;
        const { config, entries } = this.schemaEntries(schemas, {}, '');
        for (const [name, schema] of entries) {
            const [src, names] = this.initVars(name);
            const varName = names.var;
            this.parseSchema(schema, config, names, src);
            // console.log(src.code);
            // console.log(src.params);
            // console.log(src.args);
            const validate = new Function([...src.params, varName].toString(), src.code);
            patterns[name as K] = validate.bind(undefined, ...src.args);
        }
        return patterns;
    }

    private parseSchema (schema: ISchema, conf: IConfig, names: INames, source: ISource) {
        this.debug('green', names.prop, conf[INDENT]);
        const typeName: string = schema[TYPE] || conf[TYPE];
        if (!this.types.has(typeName)) E.missingType(typeName);
        const type = this.types.get(typeName)!;
        const { entries, config } = this.schemaEntries({...conf, ...schema }, conf);
        source.code += `label_${names.var}: {\n`;
        const save = Object.assign({}, names);

        for (const [prop, base] of this.sortByKey(entries, type[SYM_TYPE_KEY_ORDER]))
            this.parseProperty(type, base, this.updateNames(names, prop), config, source);

        if (schema.hasOwnProperty(SYM_SCHEMA_PROPERTIES)) {
            const keys = this.getAllKeys(schema[SYM_SCHEMA_PROPERTIES]!);
            for (const [i, key] of keys.entries()) {
                if (typeof key !== 'string') {
                    this.updateNames(names, key.toString(), `_${i}`);
                    source.params.push(names.param);
                    source.args.push(key);
                    source.code += `\nconst ${names.var} = ${save.var}[${names.param}];\n`;
                } else {
                    this.updateNames(names, key, `_${i}`);
                    source.code += `\nconst ${names.var} = ${save.var}[${is.toLiteral(key)}];\n`;
                }
                this.parseSchema(
                    schema[SYM_SCHEMA_PROPERTIES]![key as any],
                    config,
                    names,
                    source,
                );
                names.var = save.var;
                names.path = save.path;
            }
        }

        if (schema.hasOwnProperty(SYM_SCHEMA_COLLECTION)) {
            this.updateNames(names, '[]', '_i');
            if (!type[SYM_TYPE_FOR_LOOP]) {
                source.code += `
                    if (!(Symbol.iterator in ${save.var}))
                        return 'Data requires to have ${Symbol.iterator.toString()} method implemented in order to use for..of loop';
                    for (const ${names.var} of ${save.var})
                `;
                this.parseSchema(schema[SYM_SCHEMA_COLLECTION]!, config, names, source);
            } else {
                const accessor = `${save.var}$i`;
                source.code += `
                    const ${save.var}_len = ${save.var}.length;
                    for (let ${accessor} = 0; ${accessor} < ${save.var}_len; ${accessor}++) {
                        const ${names.var} = ${save.var}[${accessor}];
                `;
                this.parseSchema(schema[SYM_SCHEMA_COLLECTION]!, config, names, source);
                source.code += '\n}\n';
            }
            names.var = save.var;
            names.path = save.path;
        }

        source.code += '\n}\n';
    }

    private parseProperty (type: IType, base: any, names: INames, conf: IConfig, src: ISource) {
        this.debug('cyan', names.prop, conf[INDENT]);
        if (!type[names.prop]) E.missingTypeMethod(type[SYM_TYPE_NAME], names.prop);
        type[SYM_TYPE_VALIDATE][names.prop](base);
        if (type[SYM_TYPE_EXTERNAL] && type[SYM_TYPE_EXTERNAL]!.includes(names.prop)) {
            src.params.push(names.param);
            src.args.push(type[names.prop].bind(undefined, base, `${names.path}#${names.prop}`));
            src.code += `
                const ${names.param}_result = ${names.param}(${names.var});
                if (${names.param}_result) return ${names.param}_result;
            `;
        } else {
            const body = this.getMethodBody(type, names, base);
            if (is.primitiveLiteral(base))
                src.code += `${body}\n`;
            else {
                src.args.push(base);
                src.params.push(names.param);
                src.code += `${body}\n`;
            }
        }
    }

    private schemaEntries<T extends ISchema> (schema: T, config: IConfig, indent: string = ' ') {
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

    private updateNames (names: INames, prop: string, varSuffix: string = '') {
        const count = names.count + 1;
        names.prop = prop;
        names.count = count;
        names.var = `${names.var}${varSuffix}`;
        names.param = `$${count}`;
        if (varSuffix) names.path += `/${prop}`;
        return names;
    }

    private getAllKeys (schema: object) {
        return [
            ...Object.getOwnPropertyNames(schema),
            ...Object.getOwnPropertySymbols(schema),
        ];
    }

    private replaceToken (source: string, phrase: string, to: string) {
        const regex = new RegExp(`[^\\w$_]\\b(${phrase})\\b[^\\w$_]?`, 'g');
        return source.replace(regex, (match, $1) => match.replace($1, to));
    }

    private initVars (prop: string): [ISource, INames] {
        return [
            {
                code: '',
                args: [] as any[],
                params: [] as string[],
            },
            {
                prop,
                var: '$v',
                count: -1,
                param: `$$`,
                path: prop.toUpperCase(),
            },
        ];
    }

    private evalExpressions (body: string, base: any, path: string) {
        // @ts-ignore
        return body.replace(TOKEN_EXPR_REGEX, (match, expr) => {
            return new Function('base', 'path', `return ${expr}`)(base, path);
        });
    }

    private sortByKey (entries: Array<[string, any]>, firstKeys: string[]) {
        const result = firstKeys.reduce((acc, key) => {
            const entry = entries.find(([k]) => k === key);
            return entry
                ? (acc.push(entry), acc)
                : acc;
        }, ([] as Array<[string, any]>));
        const rest = entries.filter(([k]) => !firstKeys.includes(k));
        return [...result, ...rest];
    }

    private getMethodBody (type: IType, names: INames, base: any) {
        let body = (type[names.prop]
            .toString()
            .match(/{[\W\w]+}/g) as RegExpMatchArray)[0]
            .replace(TOKEN_BREAK, `break label_${names.var};`);
        body = this.evalExpressions(body, base, names.path);
        body = this.replaceToken(body, 'data', names.var);
        return is.primitiveLiteral(base)
            ? this.replaceToken(body, 'base', this.toLiteral(base))
            : this.replaceToken(body, 'base', names.param);
    }

    private toLiteral (value: any) {
        if (typeof value === 'string')
            return `\`${value.replace('\`', '\\\`')}\``;
        return value;
    }

    private debug (col: string, msg: string, indent?: string) {
        if (!this.options.debug) return;
        const colors: { [k: string]: string } = {
            reset: '\x1b[0m',
            red: '\x1b[31m',
            green: '\x1b[32m',
            yellow: '\x1b[33m',
            blue: '\x1b[34m',
            magenta: '\x1b[35m',
            cyan: '\x1b[36m',
            white: '\x1b[37m',
        };
        return console.log(`${colors[col]}${indent || ''}${msg}${colors.reset}\n`);
    }
}
