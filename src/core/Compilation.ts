import { BASE_DATA_PARAMETER, SYM_SCHEMA_COLLECTION, SYM_SCHEMA_CONFIG, SYM_SCHEMA_PROPERTIES, SYM_TYPE_EXTERNAL, SYM_TYPE_FOR_LOOP, SYM_TYPE_KEY_ORDER, SYM_TYPE_VALIDATE, TOKEN_BREAK, TOKEN_EXPR_REGEX, TYPE } from '../constants';
import { IType, TypeWrapper } from '../types/Wrapper';
import { E, is } from '../utils';
import { CodeChunk } from './CodeChunks';

const INDENT = Symbol('compilation_indent');

interface ISchema {
    [SYM_SCHEMA_CONFIG]?: IConfig;
    [SYM_SCHEMA_PROPERTIES]?: ISchemas;
    [SYM_SCHEMA_COLLECTION]?: ISchema;
    [property: string]: any;
}

interface ISchemas {
    [schema: string]: ISchema;
}

interface ISource {
    code: string;
    arguments: any[];
    parameters: string[];
    dataParameter: string;
}

interface IContext {
    key: string;
    dataVariable: string;
    parameterCount: number;
    resolvedCount: number;
    schemaPath: string;
}

interface IDataPath {
    $dataPath: string | string[];
}

export interface IConfig {
    [TYPE]?: string;
    [INDENT]?: string;
}

export class Compilation {
    private name: string;
    private types: TypeWrapper;
    private schema: ISchema;
    private debugLog: boolean;

    constructor (types: TypeWrapper, schemaName: string, schema: ISchema, debug: boolean) {
        this.types = types;
        this.name = schemaName;
        this.schema = schema;
        this.debugLog = debug;
    }

    public exec (): ISource {
        const source = this.createSource();
        const context = this.createContext();
        const config = this.schema[SYM_SCHEMA_CONFIG] || {};
        this.parseSchema(this.schema, config, context, source);
        return source;
    }

    private parseSchema (schema: ISchema, config: IConfig, context: IContext, source: ISource) {
        this.debug('schema', context.key, config[INDENT]);
        const typeName: string = schema[TYPE] || config[TYPE];
        if (typeName == null)
            throw E.compilation.missingSchemaTypeProperty(schema);
        if (!this.types.has(typeName))
            throw E.compilation.missingType(typeName);
        const type = this.types.get(typeName)!;
        const updatedConfig = this.updateConfig(config, schema);
        const contextSnapshot = this.getContextSnapshot(context);

        source.code += CodeChunk.label(context.dataVariable);

        const sortedEntries = this.sortByKey({ ...updatedConfig, ...schema }, type[SYM_TYPE_KEY_ORDER]!);
        for (const [property, schemaValue] of sortedEntries) {
            if (!type[property])
                throw E.compilation.missingTypeMethod(typeName, property);
            this.updateContextKey(context, property);
            this.debug('property', `${context.key} @ ${context.schemaPath}`, updatedConfig[INDENT]);
            if (!this.isDataPath(schemaValue))
                this.parseProperty(type, schemaValue, context, source);
            else
                this.parsePropertyDataPath(type, schemaValue, context, source);
            context.schemaPath = contextSnapshot.schemaPath;
        }

        if (schema.hasOwnProperty(SYM_SCHEMA_PROPERTIES)) {
            const keys = [
                ...Object.getOwnPropertyNames(schema[SYM_SCHEMA_PROPERTIES]),
                ...Object.getOwnPropertySymbols(schema[SYM_SCHEMA_PROPERTIES]),
            ];
            for (const [i, key] of keys.entries()) {
                if (typeof key !== 'string') {
                    context.parameterCount++;
                    const parameter = `$${context.parameterCount}`;
                    this.updateContextKey(context, key.toString(), `_${i}`);
                    source.arguments.push(key);
                    source.parameters.push(parameter);
                    source.code += CodeChunk
                        .defineVariable(context.dataVariable, contextSnapshot.dataVariable, parameter);
                } else {
                    this.updateContextKey(context, key, `_${i}`);
                    source.code += CodeChunk
                        .defineVariable(context.dataVariable, contextSnapshot.dataVariable, this.toLiteral(key));
                }
                this.parseSchema(schema[SYM_SCHEMA_PROPERTIES]![key as any], updatedConfig, context, source);
                context.dataVariable = contextSnapshot.dataVariable;
                context.schemaPath = contextSnapshot.schemaPath;
            }
        }

        if (schema.hasOwnProperty(SYM_SCHEMA_COLLECTION)) {
            this.updateContextKey(context, '[]', '_i');
            if (type[SYM_TYPE_FOR_LOOP]) {
                const accessor = `${contextSnapshot.dataVariable}$i`;
                source.code += CodeChunk.forLoop(context.dataVariable, contextSnapshot.dataVariable, accessor);
                this.parseSchema(schema[SYM_SCHEMA_COLLECTION]!, updatedConfig, context, source);
                source.code += CodeChunk.closeBlock();
            } else {
                source.code += CodeChunk.forOfLoop(context.dataVariable, contextSnapshot.dataVariable);
                this.parseSchema(schema[SYM_SCHEMA_COLLECTION]!, updatedConfig, context, source);
            }
            context.dataVariable = contextSnapshot.dataVariable;
            context.schemaPath = contextSnapshot.schemaPath;
        }

        source.code += CodeChunk.closeBlock();
    }

    private parseProperty (type: IType, schemaValue: any, context: IContext, source: ISource) {
        type[SYM_TYPE_VALIDATE][context.key](schemaValue);
        const method = type[context.key];
        if (type[SYM_TYPE_EXTERNAL] && type[SYM_TYPE_EXTERNAL]!.includes(context.key)) {
            context.parameterCount++;
            const parameter = `$${context.parameterCount}`;
            source.parameters.push(parameter);
            source.arguments.push(method.bind(undefined, schemaValue, context.schemaPath));
            source.code += CodeChunk.externCall(parameter, context.dataVariable);
        } else {
            const paramOrLiteral = is.primitiveLiteral(schemaValue)
                ? this.toLiteral(schemaValue)
                : (context.parameterCount++, `$${context.parameterCount}`);
            const body = this.getMethodBody(method, context, schemaValue, paramOrLiteral);
            source.code += body;
            if (!is.primitiveLiteral(schemaValue)) {
                source.parameters.push(paramOrLiteral);
                source.arguments.push(schemaValue);
            }
        }
    }

    private parsePropertyDataPath (type: IType, schemaValue: IDataPath, context: IContext, source: ISource) {
        const method = type[context.key];
        context.resolvedCount++;
        const resolvedPath = `${context.dataVariable}_data_${context.resolvedCount}`;
        source.code += CodeChunk
            .resolveDataCall(schemaValue.$dataPath, resolvedPath);
        if (type[SYM_TYPE_EXTERNAL] && type[SYM_TYPE_EXTERNAL]!.includes(context.key)) {
            context.parameterCount++;
            const parameter = `$${context.parameterCount}`;
            source.parameters.push(parameter);
            source.arguments.push(method);
            source.code += CodeChunk.externCallResolve(parameter, resolvedPath, this.toLiteral(context.schemaPath), context.dataVariable);
        } else
            source.code += this.getMethodBody(method, context, `\${${resolvedPath}}`, resolvedPath);
    }

    private getMethodBody (method: () => void, context: IContext, schemaValue: any, paramOrLiteral: string) {
        let body = method.toString();
        const start = body.indexOf('{');
        const end = body.lastIndexOf('}');
        body = body
            .slice(start, end + 1)
            .replace(TOKEN_BREAK, `break label_${context.dataVariable};`);
        body = this.evalExpressions(body, context, schemaValue);
        body = this.replaceToken(body, 'data', context.dataVariable);
        return this.replaceToken(body, 'schemaValue', paramOrLiteral) + '\n';
    }

    private evalExpressions (str: string, context: IContext, schemaValue: string) {
        // @ts-ignore
        return str.replace(TOKEN_EXPR_REGEX, (match, expr) => {
            return new Function('schemaPath', 'schemaValue', `return ${expr}`)(context.schemaPath, schemaValue);
        });
    }

    private isDataPath (schemaValue: any) {
        return typeof schemaValue === 'object' && schemaValue.hasOwnProperty('$dataPath');
    }

    private toLiteral (schemaValue: any) {
        if (typeof schemaValue === 'string')
            return `\`${schemaValue.replace(/`/g, '\\`')}\``;
        return schemaValue;
    }

    private replaceToken (str: string, token: string, to: string) {
        const regex = new RegExp(`[^\\w$_]\\b(${token})\\b[^\\w$_]?`, 'g');
        return str.replace(regex, (match, $1) => match.replace($1, to));
    }

    private updateConfig (config: IConfig, schema: ISchema, indent = '') {
        const newConfig = {
            ...config,
            ...(schema[SYM_SCHEMA_CONFIG] || {}),
        };
        newConfig[INDENT] = (newConfig[INDENT] || '') + indent;
        return newConfig;
    }

    private sortByKey (schema: ISchema, firstKeys: string[]) {
        const entries = Object.entries(schema);
        const first = firstKeys
            .map((key) => entries.find(([k]) => k === key)!)
            .filter((e) => e);
        const rest = entries.filter(([key]) => !firstKeys.includes(key));
        return [...first, ...rest];
    }

    private createContext () {
        return {
            key: '',
            dataVariable: BASE_DATA_PARAMETER,
            parameterCount: -1,
            resolvedCount: -1,
            schemaPath: this.name.toUpperCase(),
        };
    }

    private getContextSnapshot (context: IContext) {
        return Object.assign({}, context);
    }

    private updateContextKey (context: IContext, key: string, dataVarSuffix?: string) {
        context.key = key;
        context.schemaPath = `${context.schemaPath}/${key}`;
        if (dataVarSuffix)
            context.dataVariable = context.dataVariable + dataVarSuffix;
    }

    private createSource (): ISource {
        return {
            code: '',
            arguments: [],
            parameters: [],
            dataParameter: '$v',
        };
    }

    private debug (level: 'schema' | 'property', message: string, indent?: string) {
        if (!this.debugLog) return;
        const levels = {
            schema: (m: string, i: string) => `\x1b[32m${i}${m}\x1b[0m`,
            property: (m: string, i: string) => `\x1b[36m${i}${m}\x1b[0m`,
        };
        // tslint:disable-next-line
        return console.log(levels[level](message, indent || ''));
    }
}
