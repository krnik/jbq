import { PARAMETER, SYM_METHOD_CLOSURE, SYM_METHOD_MACRO, SYM_SCHEMA_COLLECTION, SYM_SCHEMA_PROPERTIES, SYM_TYPE_FOR_LOOP, SYM_TYPE_KEY_ORDER, SYM_TYPE_VALIDATE, TOKEN_BREAK, TOKEN_EXPR_REGEX, TYPE } from '../constants';
import { schemaValidate } from '../types/schemaValidate';
import { IType, ITypeMethod, TypeWrapper } from '../types/Wrapper';
import { IDataPathSchemaValue, IParseValues } from '../typings';
import { DebugLog } from '../utils/debug';
import { is } from '../utils/type';
import { CodeBuilder } from './Code';
import { CompilationError } from './error';

interface ICompilationOptions {
    debug?: boolean;
}

interface ICompilationConfig {
    indent: number;
}

export interface ISchema {
    [SYM_SCHEMA_PROPERTIES]?: {
        [schemaName: string]: ISchema;
    };
    [SYM_SCHEMA_COLLECTION]?: ISchema;
    [property: string]: any;
}

type Nullable<T> = null | undefined | T;

export class Compilation {
    public Code: CodeBuilder;
    private Debug: DebugLog;
    private types: TypeWrapper;
    private schema: ISchema;

    constructor (
        types: TypeWrapper,
        schema: ISchema,
        schemaName: string,
        options: ICompilationOptions = {},
    ) {
        this.types = types;
        this.schema = schema;
        this.Debug = new DebugLog(Boolean(options.debug));
        this.Code = new CodeBuilder(schemaName, this);
    }

    public execSync () {
        const config = { indent: 0 };
        this.parseSchemaSync(this.schema, config);
        return this.Code.source;
    }

    // exec () {}

    private parseSchemaSync (
        schema: ISchema,
        config: ICompilationConfig,
    ) {
        const { Debug, Code } = this;
        Debug.schema(Code.schemaPath, config.indent);
        const typeName: Nullable<string> = schema[TYPE];
        if (typeName == null)
            throw CompilationError.missingSchemaTypeProperty(schema);
        const type = this.getType(typeName);
        const snapshot = Code.snapshot;
        config.indent += 2;

        Code.openBlock();

        const entries = this.sortEntries(schema, type);
        for (const [property, schemaValue] of entries) {
            if (!type[property])
                throw CompilationError.missingTypeMethod(typeName, property);
            type[SYM_TYPE_VALIDATE][property](schemaValue);
            Debug.property(property, config.indent);
            Code.updateContext(property);
            this.parseProperty(type[property], schemaValue);
            snapshot.restore();
        }

        if (schema.hasOwnProperty(SYM_SCHEMA_PROPERTIES)) {
            const subSchemas = schema[SYM_SCHEMA_PROPERTIES]!;
            const properties = [
                ...Object.getOwnPropertyNames(subSchemas),
                ...Object.getOwnPropertySymbols(subSchemas),
            ];
            for (const property of properties) {
                if (typeof property !== 'string') {
                    const parameter = Code.createParam(property);
                    Code.defineVar(snapshot.dataVariable, parameter);
                } else {
                    Code.updateContext(property, true);
                    Code.defineVar(snapshot.dataVariable, CodeBuilder.propertyAccessor(property));
                }
                this.parseSchemaSync(
                    schema[SYM_SCHEMA_PROPERTIES]![property as keyof typeof subSchemas],
                    config,
                );
                snapshot.restore();
            }
        }

        if (schema.hasOwnProperty(SYM_SCHEMA_COLLECTION)) {
            const elementSchema = schema[SYM_SCHEMA_COLLECTION]!;
            Code.updateContext('[]', true);
            if (type[SYM_TYPE_FOR_LOOP]) {
                Code.loopFor(snapshot.dataVariable);
                this.parseSchemaSync(elementSchema, config);
                Code.closeBlock();
            } else {

                Code.loopForOf(snapshot.dataVariable);
                this.parseSchemaSync(elementSchema, config);
            }
            snapshot.restore();
        }

        Code.closeBlock();
    }

    private parseProperty (method: ITypeMethod, schemaValue: any) {
        const parseValues: IParseValues = {
            schemaValue,
            schemaPath: this.Code.schemaPath,
            dataVariable: this.Code.dataVariable,
        };
        const helpers = [
            (v: any) => schemaValidate.dataPath(v),
            (v: IDataPathSchemaValue) => this.Code.resolveDataPath(v),
        ];
        switch (true) {
            case method.hasOwnProperty(SYM_METHOD_CLOSURE):
                this.parsePropertyWithClosure(method, parseValues);
                break;
            case method.hasOwnProperty(SYM_METHOD_MACRO):
                this.Code.appendCode(method(parseValues, ...helpers) as string);
                break;
            default:
                this.parsePropertyExtractBody(method, parseValues);
        }
        this.Code.appendCode('\n');
    }

    private parsePropertyExtractBody (method: ITypeMethod, parseValues: IParseValues) {
        const { schemaValue, dataVariable } = parseValues;
        const isDataPath = schemaValidate.dataPath(parseValues.schemaValue);
        let resolvedPath: string;
        if (isDataPath) {
            resolvedPath = this.Code.resolveDataPath(schemaValue);
            parseValues.resolvedValue = resolvedPath;
        }
        let body = method.toString();
        const start = body.indexOf('{');
        const end = body.lastIndexOf('}');
        body = body
            .slice(start, end + 1)
            .replace(TOKEN_BREAK, this.Code.createBreakStatement());
        body = this.evalExpressions(body, parseValues);
        body = this.replaceToken(body, PARAMETER.DATA, dataVariable);
        // if isDataPath schemaValue must be replaced with resolved value
        const param = isDataPath
            ? resolvedPath!
            : is.primitiveLiteral(schemaValue)
                ? this.toLiteral(schemaValue)
                : this.Code.createParam(schemaValue);
        body = this.replaceToken(body, 'schemaValue', param);
        this.Code.appendCode(body);
    }

    private parsePropertyWithClosure (method: ITypeMethod, parseValues: IParseValues) {
        const { schemaValue } = parseValues;
        const resolvedValue = schemaValidate.dataPath(schemaValue)
            ? this.Code.resolveDataPath(schemaValue)
            : undefined;
        const fnParam = this.Code.createParam(method);
        const schemaParam = is.primitiveLiteral(schemaValue)
            ? this.toLiteral(schemaValue)
            : this.Code.createParam(schemaValue);
        this.Code.callFnWithClosure(fnParam, schemaParam, resolvedValue);
    }

    private evalExpressions (str: string, parseValues: IParseValues) {
        const { schemaPath, schemaValue, resolvedValue } = parseValues;
        return str.replace(TOKEN_EXPR_REGEX, (_match, expr) => {
            const fn = new Function(
                'schemaPath',
                'schemaValue',
                'resolvedValue',
                `return ${expr}`,
            );
            return fn(schemaPath, schemaValue, `\${${resolvedValue}}`);
        });
    }

    private replaceToken (str: string, token: string, to: string) {
        const escaped = token.replace(/[/{}$]/g, (m) => `\\${m}`);
        const regex = new RegExp(`[^\\w_\\-\\$?](${escaped})\\b[^\\w$_]?`, 'g');
        return str.replace(regex, (match, $1) => match.replace($1, to));
    }

    private getType (typeName: string) {
        if (!this.types.has(typeName))
            throw CompilationError.missingType(typeName);
        return this.types.get(typeName)!;
    }

    private sortEntries (schema: ISchema, type: IType) {
        const sortOrder = type[SYM_TYPE_KEY_ORDER];
        const entries = Object.entries(schema);
        const firstEntries = sortOrder
            .map((key) => entries.find(([k]) => key === k)!)
            .filter((entry) => entry);
        const tailEntries = entries.filter(([key]) => !sortOrder.includes(key));
        return [...firstEntries, ...tailEntries];
    }

    private toLiteral (schemaValue: any) {
        if (typeof schemaValue === 'string')
            return `\`${schemaValue.replace(/`/g, '\\`')}\``;
        return schemaValue;
    }
}
