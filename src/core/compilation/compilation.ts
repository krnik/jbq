import { ParameterName, SYM_METHOD_CLOSURE, SYM_METHOD_MACRO, SYM_SCHEMA_COLLECTION, SYM_SCHEMA_PROPERTIES, SYM_TYPE_FOR_LOOP, SYM_TYPE_KEY_ORDER, SYM_TYPE_VALIDATE, TOKEN_BREAK, TOKEN_EXPR_REGEX, TYPE } from '../../constants';
import { schemaValidate } from '../../types/schema_validator';
import { DataPathSchemaValue, ParseValues } from '../../typings';
import { LogService } from '../../utils/log_service';
import { TypeReflect } from '../../utils/type_reflect';
import { TypeDefinition } from '../type_wrapper/interface/type_definition.interface';
import { TypeMethod } from '../type_wrapper/interface/type_method.interface';
import { TypeWrapper } from '../type_wrapper/type_wrapper';
import { CompilationError } from './compilation_error';
import { CompilationOptions } from './interface/compilation_options.interface';
import { Schema } from './interface/schema.interface';
import { SourceBuilderProduct } from './interface/source_builder_product.interface';
import { ResolvedPathStore } from './resolved_path_store';
import { SourceBuilder } from './source_builder';

/**
 * Compilation class responsible for coordination of other subclasses
 * in an effort to create validation function.
 *
 * New instance is created for every schema.
 */
export class Compilation {
    private static Error = CompilationError;
    private log: LogService;
    private types: TypeWrapper;
    private schema: Schema;
    private sourceBuilder: SourceBuilder;
    private resolvedPaths: ResolvedPathStore;
    private options: CompilationOptions;
    private macroHelpers = [
        (value: any) => schemaValidate.dataPath(value),
        (value: DataPathSchemaValue) => this.sourceBuilder.resolveDataPath(value),
    ];

    constructor (
        types: TypeWrapper,
        schema: Schema,
        schemaName: string,
        options: CompilationOptions = {},
    ) {
        this.schema = schema;
        this.types = types;
        this.log = new LogService(Boolean(options.debug));
        this.resolvedPaths = new ResolvedPathStore();
        this.sourceBuilder = new SourceBuilder(
            this,
            schemaName,
            this.resolvedPaths,
            options.handleResolvedPaths,
        );
        this.options = options;
    }

    public execSync (this: Compilation): SourceBuilderProduct {
        this.parseSchemaSync(this.schema);
        return this.sourceBuilder.getProduct();
    }

    public parseSchemaSync (this: Compilation, schema: Schema): void {
        const { log, sourceBuilder } = this;

        log.schema(sourceBuilder.getSchemaPath());
        log.incIndent(2);

        const typeName: string | undefined = schema[TYPE];
        if (typeName === undefined)
            throw Compilation.Error.missingSchemaTypeProperty(schema);

        const type = this.getType(typeName);
        const sourceSnapshot = sourceBuilder.getContextSnapshot();

        sourceBuilder.openLabeledBlock();

        const schemaEntries = this.sortSchemaEntries(schema, type);
        for (const [property, schemaValue] of schemaEntries) {
            if (!type[property])
                throw Compilation.Error.missingTypeMethod(typeName, property);

            type[SYM_TYPE_VALIDATE][property](schemaValue);
            log.property(property);

            sourceBuilder.updateBuilderContext(property);

            this.parseProperty(type[property], schemaValue);

            sourceSnapshot.restore();

            // TODO: refactor when async will take care of large collections
            if (this.options.async)
                this.sourceBuilder.append('\nyield;\n');
        }

        if (schema.hasOwnProperty(SYM_SCHEMA_PROPERTIES)) {
            const subSchemas = schema[SYM_SCHEMA_PROPERTIES]!;
            const properties = [
                ...Object.getOwnPropertyNames(subSchemas),
                ...Object.getOwnPropertySymbols(subSchemas),
            ];

            for (const property of properties) {
                if (!TypeReflect.string(property)) {
                    const parameter = this.sourceBuilder.createParameter(property);
                    this.sourceBuilder.defineVariable(sourceSnapshot.variableName, parameter);
                } else {
                    this.sourceBuilder.updateBuilderContext(property, true);
                    this.sourceBuilder.defineVariable(
                        sourceSnapshot.variableName,
                        this.sourceBuilder.propertyAccessor(property),
                    );
                }

                this.parseSchemaSync(
                    schema[SYM_SCHEMA_PROPERTIES]![property as keyof typeof properties],
                );

                sourceSnapshot.restore();
            }
        }

        if (schema.hasOwnProperty(SYM_SCHEMA_COLLECTION)) {
            const elementSchema = schema[SYM_SCHEMA_COLLECTION]!;
            this.sourceBuilder.updateBuilderContext('[]', true);

            if (type[SYM_TYPE_FOR_LOOP]) {
                this.sourceBuilder.forLoop(sourceSnapshot.variableName, false);
                this.parseSchemaSync(elementSchema);
                this.sourceBuilder.closeBlock();
            } else {
                this.sourceBuilder.forLoop(sourceSnapshot.variableName, true);
                this.parseSchemaSync(elementSchema);
            }

            sourceSnapshot.restore();
        }

        sourceBuilder.closeBlock();
        log.incIndent(-2);
    }

    /**
     * Attempt to retry a `typeName` from `TypeWrapper`.
     * If type does not exists this function will throw.
     */
    private getType (this: Compilation, typeName: string): TypeDefinition {
        if (!this.types.has(typeName))
            throw CompilationError.missingType(typeName);
        return this.types.get(typeName)!;
    }

    /**
     * Rearranges the order of object entries to match the order defined in the
     * TypeDefinition `Symbol.for('type_key_order')` property.
     */
    private sortSchemaEntries (
        this: Compilation,
        schema: Schema,
        type: TypeDefinition,
    ): Array<[string, any]> {
        type EntryFilter = (entry: [string, any] | undefined) => entry is [string, any];

        const sortOrder = type[SYM_TYPE_KEY_ORDER];
        const entries = Object.entries(schema);

        const headEntries = sortOrder
            .map((key) => entries.find(([k]) => key === k))
            .filter(((entry) => entry !== undefined) as EntryFilter);

        const tailEntries = entries.filter(([key]) => !sortOrder.includes(key));

        return [...headEntries, ...tailEntries];
    }

    /**
     * Attempt to parse schema property and respective `TypeMethod` into a validation
     * function block.
     */
    private parseProperty (this: Compilation, method: TypeMethod, schemaValue: any): void {
        const parseValues: ParseValues = {
            schemaValue,
            schemaPath: this.sourceBuilder.getSchemaPath(),
            variableName: this.sourceBuilder.getVariableName(),
        };

        switch (true) {
            case method.hasOwnProperty(SYM_METHOD_CLOSURE):
                this.parseMethodClosure(method, parseValues);
                break;
            case method.hasOwnProperty(SYM_METHOD_MACRO):
                this.parseMethodMacro(method, parseValues);
                break;
            default:
                this.parseMethodExtractBody(method, parseValues);
        }
    }

    private parseMethodExtractBody (this: Compilation, method: TypeMethod, values: ParseValues): void {
        const { schemaValue, variableName } = values;
        const isDataPath = schemaValidate.dataPath(schemaValue);

        let resolvedPath: string;
        let suffix = '';

        if (isDataPath) {
            this.resolvedPaths.open();
            resolvedPath = this.sourceBuilder.resolveDataPath(schemaValue);
            values.resolvedValue = resolvedPath;
            suffix = this.sourceBuilder.validateResolvedVariables();
        }

        let body = method.toString();
        const start = body.indexOf('{');
        const end = body.lastIndexOf('}');

        body = body
            .slice(start, end + 1)
            .replace(TOKEN_BREAK, this.sourceBuilder.breakStatement());
        body = this.evaluateExpressions(body, values);
        body = this.replaceToken(body, ParameterName.Data, variableName);

        const parameterName: string = isDataPath
            ? resolvedPath!
            : TypeReflect.primitiveLiteral(schemaValue)
                ? this.toLiteral(schemaValue)
                : this.sourceBuilder.createParameter(schemaValue);

        body = this.replaceToken(body, ParameterName.SchemaValue, parameterName);

        this.sourceBuilder.append(body + suffix);
    }

    private evaluateExpressions (
        this: Compilation,
        sourceString: string,
        values: ParseValues,
    ): string {
        const { schemaPath, schemaValue, resolvedValue } = values;

        return sourceString.replace(TOKEN_EXPR_REGEX, (_match, expr) => {
            const fn = new Function(
                ParameterName.SchemaPath,
                ParameterName.SchemaValue,
                ParameterName.ResolvedValue,
                `return ${expr}`,
            );

            return fn(schemaPath, schemaValue, `\${${resolvedValue}}`);
        });
    }

    private replaceToken (
        this: Compilation,
        sourceString: string,
        token: string,
        replaceTo: string,
    ): string {
        const escaped = token.replace(/[/{}$]/g, (m) => `\\${m}`);
        const regex = new RegExp(`[^\\w_\\-\\$?](${escaped})\\b[^\\w$_]?`, 'g');
        return sourceString.replace(regex, (match, $1) => match.replace($1, replaceTo));
    }

    private toLiteral (this: Compilation, schemaValue: any): any {
        if (typeof schemaValue === 'string')
            return `\`${schemaValue.replace(/`/g, '\\`')}\``;
        return schemaValue;
    }

    private parseMethodClosure (this: Compilation, method: TypeMethod, values: ParseValues): void {
        this.resolvedPaths.open();
        const snapshot = this.sourceBuilder.getContextSnapshot();

        const { schemaValue } = values;

        const resolvedValue = schemaValidate.dataPath(schemaValue)
            ? this.sourceBuilder.resolveDataPath(schemaValue)
            : undefined;

        const functionParameter = this.sourceBuilder.createParameter(method);

        const schemaParameter = resolvedValue || (TypeReflect.primitiveLiteral(schemaValue)
            ? this.toLiteral(schemaValue)
            : this.sourceBuilder.createParameter(schemaValue));

        const suffix = this.sourceBuilder.validateResolvedVariables();
        snapshot.restore();
        this.sourceBuilder.callClosure(functionParameter, schemaParameter);
        this.sourceBuilder.append(suffix);
    }

    private parseMethodMacro (this: Compilation, method: TypeMethod, values: ParseValues): void {
        this.resolvedPaths.open();
        const code = method(values, ...this.macroHelpers) as string;
        const suffix = this.sourceBuilder.validateResolvedVariables();
        this.sourceBuilder.append(code + suffix);
    }
}
