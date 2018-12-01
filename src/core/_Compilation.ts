import { BASE_DATA_PARAMETER, SYM_SCHEMA_COLLECTION, SYM_SCHEMA_INHERIT, SYM_SCHEMA_PROPERTIES, SYM_TYPE_KEY_ORDER, TYPE, SYM_TYPE_VALIDATE, SYM_TYPE_FOR_LOOP, SYM_METHOD_WITH_CLOSURE, SYM_METHOD_RETURNS_FN, SYM_METHOD_RETURNS_BODY } from '../constants';
import { IType, TypeWrapper, ITypeMethod } from '../types/Wrapper';
import { Debug } from '../utils/debug';
import { CodeChunk } from './CodeChunks';
import { CompilationError } from './error';
import { Func } from 'mocha';

interface ICompilationOptions {
    debug?: boolean;
}

interface ICompilationConfig {
    indent: number;
}

interface ISource {
    code: string;
    arguments: {
        [arg: string]: unknown;
    };
    dataParam: string;
}

interface ISchema {
    [SYM_SCHEMA_INHERIT]?: Partial<ISchema>;
    [SYM_SCHEMA_PROPERTIES]?: {
        [schemaName: string]: ISchema;
    };
    [SYM_SCHEMA_COLLECTION]?: ISchema;
    [property: string]: any;
}

interface IContext {
    dataVariable: string;
    currentProp: string;
    schemaPath: string;
    // make it a class
    // with getSnapshot
    // and restore methods
}

type Nullable<T> = null | undefined | T;

export class Compilation {
    public source = this.initSource();
    private debug: Debug;
    private types: TypeWrapper;
    private schema: ISchema;
    private schemaName: string;
    private context: IContext;
    private counter = {
        params: -1,
        resolvedPaths: -1,
    };

    constructor (
        types: TypeWrapper,
        schema: ISchema,
        schemaName: string,
        options: ICompilationOptions = {},
    ) {
        this.types = types;
        this.schemaName = schemaName;
        this.schema = schema;
        this.debug = new Debug(Boolean(options.debug));
        this.context = this.initContext();
    }

    public execSync () {
        const config = { indent: 0 };
        this.parseSchemaSync(this.schema, this.schema[SYM_SCHEMA_INHERIT], config);
        this.debug.code(this.source.code);
        return this.source;
    }

    // exec () {}

    private parseSchemaSync (
        schema: ISchema,
        inherit: Partial<ISchema> = {},
        config: ICompilationConfig,
    ) {
        this.debug.schema(this.context.schemaPath, config.indent);
        const typeName: Nullable<string> = schema[TYPE] || inherit[TYPE];
        if (typeName == null)
            throw CompilationError.missingSchemaTypeProperty(schema);
        const type = this.getType(typeName);
        const snapshot = this.getContextSnapshot();
        config.indent += 2;

        this.startLabeledBlock();

        const entries = this.sortEntries({ ...inherit, ...schema }, type);
        for (const [property, schemaValue] of entries) {
            if (!type[property])
                throw CompilationError.missingTypeMethod(typeName, property);
            type[SYM_TYPE_VALIDATE][property](schemaValue);
            this.debug.property(property, config.indent);
            this.updateContext(property);
            this.parseProperty(type[property], property, schemaValue);
            snapshot.restore();
        }

        if (schema.hasOwnProperty(SYM_SCHEMA_PROPERTIES)) {
            const subSchemas = schema[SYM_SCHEMA_PROPERTIES]!;
            const properties = [
                ...Object.getOwnPropertyNames(subSchemas),
                ...Object.getOwnPropertySymbols(subSchemas),
            ];
            for (const [i, property] of properties.entries()) {
                if (typeof property !== 'string') {

                } else {

                }
                this.parseSchemaSync(
                    schema[SYM_SCHEMA_PROPERTIES]![property as keyof typeof subSchemas],
                    inherit,
                    config,
                );
                snapshot.restore();
            }
        }

        if (schema.hasOwnProperty(SYM_SCHEMA_COLLECTION)) {
            const elementSchema = schema[SYM_SCHEMA_COLLECTION]!;
            if (type[SYM_TYPE_FOR_LOOP]) {

            } else {

            }
            snapshot.restore();
        }

        this.closeLabeledBlock();
    }

    private parseProperty (method: ITypeMethod, propertyName: string, schemaValue: any) {
        let resolvedDataVar: string;
        if (schemaValue instanceof Object && schemaValue.hasOwnProperty('$dataPath')) {
            this.counter.resolvedPaths++;
            resolvedDataVar = `${this.context.dataVariable}_data_${this.counter.resolvedPaths}`;
            this.source.code += CodeChunk.resolveDataPath(
                schemaValue.$dataPath,
                resolvedDataVar,
            );
        }
        const options = {
            exec: false,
            closure: false,
            endBody: false,
        };
        let checkBlock = '';
        switch (true) {
        case method.hasOwnProperty(SYM_METHOD_WITH_CLOSURE)
            && method.hasOwnProperty(SYM_METHOD_RETURNS_FN):
        case method.hasOwnProperty(SYM_METHOD_WITH_CLOSURE):
        case method.hasOwnProperty(SYM_METHOD_RETURNS_BODY):
            checkBlock = method(schemaValue, this.context.schemaPath) as string;
        case method.hasOwnProperty(SYM_METHOD_RETURNS_FN):
        default:
        }
    }

    private parsePropertyExtractBody (
        method: ITypeMethod,
        propertyName: string,
        schemaValue: any,
    ) {

    }

    private parsePropertyWithClosure (
        method: ITypeMethod,
        propertyName: string,
        schemaValue: any,
    ) {

    }

    private initSource (): ISource {
        return {
            code: '',
            arguments: {},
            dataParam: BASE_DATA_PARAMETER,
        };
    }

    private initContext (): IContext {
        return {
            currentProp: '',
            schemaPath: this.schemaName.toUpperCase(),
            dataVariable: BASE_DATA_PARAMETER,
        };
    }

    private updateContext (currentProp: string) {
        this.context.currentProp = currentProp;
        this.context.schemaPath += `/${currentProp}`;
    }

    private getContextSnapshot () {
        interface ISnapshot {
            context: IContext;
            restore: () => void;
        }
        const contextCopy = Object.assign({}, this.context);
        const contextSnapshot: ISnapshot = {
            context: contextCopy,
            restore: this.restoreContext.bind(this, contextCopy),
        };
        return contextSnapshot;
    }

    private restoreContext (this: Compilation, context: IContext) {
        this.context = context;
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

    private startLabeledBlock () {
        this.source.code += CodeChunk.label(this.context.dataVariable);
    }

    private closeLabeledBlock () {
        this.source.code += CodeChunk.closeBlock();
    }
}
