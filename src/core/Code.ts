import { HANDLE_PATH_RESOLUTION, PARAMETER, PROP_DATA_PATH, SCHEMA_PATH_SEPARATOR, TYPE } from '../constants';
import { schemaValidate } from '../types/schemaValidate';
import { IDataPathSchemaValue } from '../typings';
import { as } from '../utils/type';
import { Compilation } from './Compilation';
import { CodeBuilderError } from './error';
import { ResolvedStore } from './ResolvedStore';

interface ICounter {
    data: number;
    parameters: number;
}

interface IContext {
    dataVariable: string;
    currentProp: string;
    schemaPath: string;
}

interface IIfConditions {
    cmp: string;
    val: string;
    variable?: string;
}

interface IIfOptions {
    dataVariable?: string;
    schemaPath: string;
    message: string;
    join?: string;
}

export interface ISource {
    code: string;
    arguments: any[];
    dataParam: string;
    argsParam: string;
}

export class CodeBuilder {
    public static propertyAccessor (key: string) {
        if (/^[a-zA-Z_$][\w$]*$/.test(key)) return `.${key}`;
        if (/^\d+$/.test(key)) return `[${key}]`;
        return `[${as.string(key)}]`;
    }

    public static parsePath (path: string | string[]) {
        return `(${Array.isArray(path) ? path.join(SCHEMA_PATH_SEPARATOR) : path})`;
    }

    public static createBreak (dataVar: string) {
        return `break label_${dataVar};`;
    }

    public static createIf (
        conditions: IIfConditions[],
        join?: string,
        dataVar?: string,
    ) {
        if (!conditions.length)
            throw CodeBuilderError.emptyConditionArray();
        const ifConditions = conditions
            .map(({ cmp, val, variable }) => {
                if (!variable && !dataVar)
                    throw CodeBuilderError.variableAndDataVarFalsy();
                return `${variable || dataVar} ${cmp} ${val}`;
            })
            .join(join || ' || ');
        return `if (${ifConditions})`;
    }

    public static createIfReturn (
        conditions: IIfConditions[],
        options: IIfOptions,
    ) {
        const { join, message, dataVariable, schemaPath } = options;
        return `${CodeBuilder.createIf(conditions, join, dataVariable)}
            return \`{ "message": "${message}", "path": "${schemaPath}" }\`;`;
    }

    public source: ISource;
    private context: IContext;
    private counter: ICounter = {
        data: -1,
        parameters: -1,
    };
    private Compilation: Compilation;
    private Store: ResolvedStore;
    private resolvedStrat?: HANDLE_PATH_RESOLUTION;

    constructor (
        schemaName: string,
        compilation: Compilation,
        resolvedStore: ResolvedStore,
        resolvedStrat?: HANDLE_PATH_RESOLUTION,
    ) {
        this.context = this.initializeContext(schemaName);
        this.source = this.initializeSource();
        this.Compilation = compilation;
        this.Store = resolvedStore;
        if (resolvedStrat)
            this.resolvedStrat = resolvedStrat;
    }

    public get schemaPath () {
        return this.context.schemaPath;
    }

    public get dataVariable () {
        return this.context.dataVariable;
    }

    public get snapshot () {
        const { schemaPath, dataVariable, currentProp } = this.context;
        return {
            schemaPath,
            dataVariable,
            currentProp,
            restore: () => {
                this.context.schemaPath = schemaPath;
                this.context.currentProp = currentProp;
                this.context.dataVariable = dataVariable;
            },
        };
    }

    public updateContext (property: string, updateDataVarName?: boolean) {
        this.context.currentProp = property;
        this.context.schemaPath += `${SCHEMA_PATH_SEPARATOR}${property}`;
        if (updateDataVarName)
            this.updateDataVar();
    }

    public updateDataVar () {
        this.counter.data += 1;
        this.context.dataVariable = `${PARAMETER.DATA}_${this.counter.data}`;
    }

    public createParam (value: any) {
        this.counter.parameters += 1;
        this.source.arguments.push(value);
        return `${this.source.argsParam}[${this.counter.parameters}]`;
    }

    public appendCode (code: string) {
        this.source.code += code;
    }

    public createBreakStatement () {
        return `break label_${this.dataVariable};`;
    }

    public openBlock () {
        this.source.code += this.chunkOpenBlock(this.dataVariable);
    }

    public closeBlock () {
        this.source.code += this.chunkCloseBlock();
    }

    public defineVar (snapshotDataVar: string, key: string) {
        this.source.code += this.chunkDefineVar(this.dataVariable, snapshotDataVar, key);
    }

    public loopForOf (snapshotDataVar: string) {
        this.source.code += this.chunkLoopForOf(this.dataVariable, snapshotDataVar);
    }

    public loopFor (snapshotDataVar: string) {
        this.source.code += this.chunkLoopFor(
            this.dataVariable,
            snapshotDataVar,
            `${snapshotDataVar}_accessor`,
        );
    }

    public callFnWithClosure (fnParam: string, schemaParam: string, resolvedValue?: string) {
        this.source.code += this.chunkCallFnWithClosure(
            resolvedValue || this.dataVariable,
            this.schemaPath,
            fnParam,
            schemaParam,
        );
    }

    public resolveDataPath (schemaValue: IDataPathSchemaValue) {
        this.updateDataVar();
        const resolvedVar = this.dataVariable;
        this.Store.addVar(resolvedVar, schemaValue);
        this.source.code += this.chunkResolveDataPath(schemaValue[PROP_DATA_PATH], resolvedVar);
        return resolvedVar;
    }

    public verifyVars () {
        const variables = this.Store.consumeVars();
        let code = '';
        let suffix = '';
        if (!variables.length)
            return suffix;
        switch (this.resolvedStrat) {
            case HANDLE_PATH_RESOLUTION.RETURN: {
                const paths = variables
                    .map(({ schemaValue }) => CodeBuilder.parsePath(schemaValue[PROP_DATA_PATH]))
                    .join(' OR ');
                code = CodeBuilder.createIfReturn(
                    variables.map(({ resolvedVar: variable }) =>
                        ({ variable, cmp: '===', val: 'undefined' })),
                    {
                        schemaPath: this.schemaPath,
                        message: `One of ${PROP_DATA_PATH} values (${paths}) resolved to undefined.`,
                    },
                );
                break;
            }
            case HANDLE_PATH_RESOLUTION.SCHEMA: {
                for (const { schemaValue } of variables) {
                    if (schemaValue && !schemaValidate.dataPath(schemaValue))
                        return suffix;
                    if (!(schemaValue as IDataPathSchemaValue).hasOwnProperty(TYPE))
                        return suffix;
                    const pathSchema = schemaValue as IDataPathSchemaValue;
                    const properties = [
                        ...Object.getOwnPropertyNames(pathSchema),
                        ...Object.getOwnPropertySymbols(pathSchema),
                    ];
                    const dataPathSchema = properties
                        .filter((key) => key !== PROP_DATA_PATH)
                        .reduce((o, k) => {
                            o[k as string] = (schemaValue as IDataPathSchemaValue)[k as string];
                            return o;
                        }, ({} as { [k: string]: any }));
                    const snapshot = this.snapshot;
                    this.updateContext(PROP_DATA_PATH);
                    this.Compilation.parseSchemaSync(dataPathSchema);
                    snapshot.restore();
                }
                break;
            }
            case HANDLE_PATH_RESOLUTION.SKIP: {
                const ifStatement = CodeBuilder.createIf(
                    variables.map(({ resolvedVar: variable }) =>
                        ({ variable, cmp: '!==', val: 'undefined' })),
                    ' && ',
                );
                code = `${ifStatement} {\n`;
                suffix = this.chunkCloseBlock();
                break;
            }
        }
        this.source.code += code;
        return suffix;
    }

    private chunkOpenBlock (dataVarName: string) {
        return `label_${dataVarName}: {\n`;
    }

    private chunkCloseBlock () {
        return `\n}\n`;
    }

    private chunkDefineVar (newVar: string, oldVar: string, accessor: string) {
        return `const ${newVar} = ${oldVar}${accessor};\n`;
    }

    private chunkLoopForOf (newVar: string, oldVar: string) {
        return `if (!(Symbol.iterator in ${oldVar}))
        return 'Data requires to have ${Symbol.iterator.toString()} method implemented in order to use for..of loop';
        for (const ${newVar} of ${oldVar})\n`;
    }

    private chunkLoopFor (newVar: string, oldVar: string, accessor: string) {
        return `const ${oldVar}_len = ${oldVar}.length;
        for (let ${accessor} = 0; ${accessor} < ${oldVar}_len; ${accessor}++) {
            const ${newVar} = ${oldVar}[${accessor}];\n`;
    }

    private chunkCallFnWithClosure (
        dataVar: string,
        schemaPath: string,
        fnParam: string,
        schemaParam: string,
    ) {
        const resultVar = `${fnParam.replace(/[\[\]]/g, '')}_res`;
        return `const ${resultVar} = ${fnParam}(${schemaParam}, ${as.string(schemaPath)}, ${dataVar});
        if (${resultVar}) return ${resultVar};\n`;
    }

    private chunkResolveDataPath (dataPath: string | string[], resolvedVar: string) {
        const paths = (Array.isArray(dataPath)
            ? dataPath
            : dataPath.split(SCHEMA_PATH_SEPARATOR))
            .filter((key) => key.length);
        if (!paths.length)
            throw CodeBuilderError.invalidDataPath(dataPath);
        const pathResolution = paths
            .reduce<string[]>((acc, key, index) => {
                acc.push(index
                    ? `${acc[index - 1]}${CodeBuilder.propertyAccessor(key)}`
                    : `${PARAMETER.DATA}${CodeBuilder.propertyAccessor(key)}`);
                return acc;
            }, [])
            .join(' && ');
        return `const ${resolvedVar} = ${pathResolution};\n`;
    }

    private initializeSource (): ISource {
        return {
            code: '',
            arguments: [],
            dataParam: PARAMETER.DATA,
            argsParam: PARAMETER.ARGUMENTS,
        };
    }

    private initializeContext (schemaName: string): IContext {
        return {
            dataVariable: PARAMETER.DATA,
            currentProp: '',
            schemaPath: schemaName,
        };
    }
}
