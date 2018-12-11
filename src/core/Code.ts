import { PARAMETER, PROP_DATA_PATH } from '../constants';
import { IDataPathSchemaValue } from '../typings';
import { as } from '../utils/type';
import { Compilation } from './Compilation';
import { CodeChunkError } from './error';

interface ICounter {
    dataNames: number;
    parameters: number;
    resolvedPaths: number;
}

interface IContext {
    dataVariable: string;
    currentProp: string;
    schemaPath: string;
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
        return `[${as.string(key)}]`;
    }

    public static parsePath (path: string | string[]) {
        return `(${Array.isArray(path) ? path.join('/') : path})`;
    }

    public static createBreak (dataVar: string) {
        return `break label_${dataVar};`;
    }

    public static createIf (
        conditions: Array<{ cmp: string, val: string }>,
        schemaPath: string,
        dataVar: string,
        msg: string,
        conditionJoin = ' || ',
    ) {
        if (!conditions.length) throw new Error('conditions cannot be empty!');
        const ifConditions = conditions
            .map(({ cmp, val }) => `${dataVar} ${cmp} ${val}`)
            .join(conditionJoin);
        return `if (${ifConditions})
            return \`{ "message": "${msg}", "path": "${schemaPath}" }\``;
    }

    public source: ISource;
    private context: IContext;
    private counter: ICounter = {
        dataNames: -1,
        parameters: -1,
        resolvedPaths: -1,
    };
    // @ts-ignore
    private compilation: Compilation;

    constructor (schemaName: string, compilationInstance: Compilation) {
        this.context = this.initializeContext(schemaName);
        this.source = this.initializeSource();
        this.compilation = compilationInstance;
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
        this.context.schemaPath += `/${property}`;
        if (updateDataVarName) {
            this.counter.dataNames += 1;
            this.context.dataVariable = `${PARAMETER.DATA}_${this.counter.dataNames}`;
        }
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
        return `break label_${this.context.dataVariable};`;
    }

    public openBlock () {
        this.source.code += this.chunkOpenBlock(this.context.dataVariable);
    }

    public closeBlock () {
        this.source.code += this.chunkCloseBlock();
    }

    public defineVar (snapshotDataVar: string, key: string) {
        this.source.code += this.chunkDefineVar(this.context.dataVariable, snapshotDataVar, key);
    }

    public loopForOf (snapshotDataVar: string) {
        this.source.code += this.chunkLoopForOf(this.context.dataVariable, snapshotDataVar);
    }

    public loopFor (snapshotDataVar: string) {
        this.source.code += this.chunkLoopFor(
            this.context.dataVariable,
            snapshotDataVar,
            `${snapshotDataVar}_accessor`,
        );
    }

    public callFnWithClosure (fnParam: string, schemaParam: string, resolvedValue?: string) {
        this.source.code += this.chunkCallFnWithClosure(
            resolvedValue || this.context.dataVariable,
            this.context.schemaPath,
            fnParam,
            schemaParam,
        );
    }

    public resolveDataPath (schemaValue: IDataPathSchemaValue) {
        this.counter.resolvedPaths += 1;
        const resolvedVar = `${this.context.dataVariable}$${this.counter.resolvedPaths}`;
        this.source.code += this.chunkResolveDataPath(schemaValue[PROP_DATA_PATH], resolvedVar);
        return resolvedVar;
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
        const paths = (Array.isArray(dataPath) ? dataPath : dataPath.split('/'))
            .filter((key) => key.length);
        if (!paths.length)
            throw CodeChunkError.invalidDataPath(dataPath);
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
