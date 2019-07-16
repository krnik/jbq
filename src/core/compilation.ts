import {
    SYM_SCHEMA_COLLECTION,
    SYM_SCHEMA_PROPERTIES,
    TOKEN_BREAK,
    EXPRESSION_REGEX,
    TYPE,
} from '../misc/constants';
import { Option, Any, Some } from '../misc/typings';
import { schemaValidate } from '../type/schema_validator';
import { LogService } from '../util/log_service';
import { TypeReflect } from '../util/type_reflect';
import { CompilationError } from './compilation/compilation_error';
import { ResolvedPathStore } from './compilation/resolved_path_store';
import { SourceBuilder } from './compilation/source_builder';
import { DataPath, Schema, ParseValues, ParameterName } from './compilation/compilation_typings';
import { Options } from './jbq/jbq_typings';
import { TypeStore } from './type_store';
import { TypeInstance } from './type_store/type_instance';
import {
    KeywordDescriptor,
    KeywordValidationFunctionKind,
} from './type_store/type_instance/type_instance_typings';
import { SourceBuilderProduct } from './compilation/source_builder/source_builder_typings';

/**
 * Compilation class responsible for coordination of other subclasses
 * in an effort to create validation function.
 *
 * New instance is created for every schema.
 */
export class Compilation {
    private static Error = CompilationError;
    private log: LogService;
    private types: TypeStore;
    private schema: Schema;
    private sourceBuilder: SourceBuilder;
    private resolvedPaths: ResolvedPathStore;
    private macroHelpers = [
        (value: unknown): value is DataPath => schemaValidate.dataPath(value),
        (value: DataPath): string => this.sourceBuilder.resolveDataPath(value),
    ];

    public constructor(
        types: TypeStore<Any>,
        schema: Schema,
        schemaName: string,
        options: Options = {},
    ) {
        this.schema = schema;
        this.types = types;
        this.log = new LogService(Boolean(options.debug));
        this.resolvedPaths = new ResolvedPathStore();
        this.sourceBuilder = new SourceBuilder(this, schemaName, this.resolvedPaths, options);
    }

    public execSync(this: Compilation): SourceBuilderProduct {
        this.parseSchemaSync(this.schema);
        return this.sourceBuilder.getProduct();
    }

    public parseSchemaSync(this: Compilation, schema: Schema): void {
        const { log, sourceBuilder } = this;

        log.schema(sourceBuilder.getSchemaPath());
        log.incIndent(2);

        const typeName = schema[TYPE] as (string | undefined);
        if (typeName === undefined)
            throw Compilation.Error.missingSchemaTypeProperty(
                schema,
                sourceBuilder.getSchemaPath(),
            );

        const type = this.getType(typeName);
        const sourceSnapshot = sourceBuilder.getContextSnapshot();

        sourceBuilder.openLabeledBlock();

        const schemaEntries = this.sortSchemaEntries(schema, type);
        for (const [property, schemaValue] of schemaEntries) {
            if (!type.hasKeyword(property))
                throw Compilation.Error.missingTypeMethod(typeName, property);

            const keywordDescriptor = type.getKeyword(property);
            keywordDescriptor.schemaValidator(schemaValue);
            log.property(property);

            sourceBuilder.updateBuilderContext(property);
            this.parseProperty(keywordDescriptor, schemaValue);

            sourceSnapshot.restore();
        }

        if (schema.hasOwnProperty(SYM_SCHEMA_PROPERTIES)) {
            const subSchemas = schema[SYM_SCHEMA_PROPERTIES] as Some<
                Schema[typeof SYM_SCHEMA_PROPERTIES]
            >;
            const properties = [
                ...Object.getOwnPropertyNames(subSchemas),
                ...Object.getOwnPropertySymbols(subSchemas),
            ];

            for (const property of properties) {
                if (!TypeReflect.string(property)) {
                    const parameter = sourceBuilder.createParameter(property);
                    sourceBuilder.defineVariable(sourceSnapshot.variableName, parameter);
                } else {
                    sourceBuilder.updateBuilderContext(property, true);
                    sourceBuilder.defineVariable(
                        sourceSnapshot.variableName,
                        sourceBuilder.propertyAccessor(property),
                    );
                }

                this.parseSchemaSync(subSchemas[property as string]);

                sourceSnapshot.restore();
            }
        }

        if (schema.hasOwnProperty(SYM_SCHEMA_COLLECTION)) {
            const elementSchema = schema[SYM_SCHEMA_COLLECTION] as Some<
                Schema[typeof SYM_SCHEMA_COLLECTION]
            >;
            sourceBuilder.updateBuilderContext('[]', true);
            const useForOfLoop = type.getUseForOfLoop();

            sourceBuilder.forLoop(sourceSnapshot.variableName, useForOfLoop);
            this.parseSchemaSync(elementSchema);

            sourceBuilder.closeBlock();
            sourceSnapshot.restore();
        }

        sourceBuilder.closeBlock();
        log.incIndent(-2);
    }

    /**
     * Attempt to retry a `typeName` from `TypeWrapper`.
     * If type does not exists this function will throw.
     */
    private getType(this: Compilation, typeName: string): TypeInstance<Any, Any, Any> | never {
        if (!this.types.hasType(typeName)) throw Compilation.Error.missingType(typeName);
        return this.types.getType(typeName as Any) as TypeInstance<Any, Any, Any>;
    }

    /**
     * Rearranges the order of object entries to match the order defined in the
     * TypeDefinition `Symbol.for('type_key_order')` property.
     */
    private sortSchemaEntries(
        this: Compilation,
        schema: Schema,
        type: TypeInstance<Any, Any>,
    ): [string, unknown][] {
        type Entry = [string, unknown];
        type EntryFilter = (entry: Option<Entry>) => entry is Entry;

        const sortOrder = type.getKeywordOrder() || [];
        const entries = Object.entries(schema);

        const headEntries = sortOrder
            .map((key): Option<Entry> => entries.find(([k]): boolean => key === k))
            .filter(((entry): boolean => entry !== undefined) as EntryFilter);

        const tailEntries = entries.filter(([key]): boolean => !sortOrder.includes(key));

        return [...headEntries, ...tailEntries];
    }

    /**
     * Attempt to parse schema property and respective `TypeMethod` into a validation
     * function block.
     */
    private parseProperty(
        this: Compilation,
        keywordDescriptor: KeywordDescriptor,
        schemaValue: unknown,
    ): void {
        const parseValues: ParseValues = {
            schemaValue,
            schemaPath: this.sourceBuilder.getSchemaPath(),
            variableName: this.sourceBuilder.getVariableName(),
        };

        switch (keywordDescriptor.kind) {
            case KeywordValidationFunctionKind.Function:
                return this.parseMethodExtractBody(keywordDescriptor, parseValues);

            case KeywordValidationFunctionKind.Closure:
                return this.parseMethodClosure(keywordDescriptor, parseValues);

            case KeywordValidationFunctionKind.Macro:
                return this.parseMethodMacro(keywordDescriptor, parseValues);
        }
    }

    /**
     * Stringify function, evaluate expressions, add break token if needed and also
     * replace `schemaValue` and `$DATA` parameters with current context variables.
     */
    private parseMethodExtractBody(
        this: Compilation,
        keywordDescriptor: KeywordDescriptor,
        values: ParseValues,
    ): void {
        const { schemaValue, variableName } = values;
        const isDataPath = schemaValidate.dataPath(schemaValue);

        let resolvedPath = '';
        let suffix = '';

        if (isDataPath) {
            this.resolvedPaths.open();
            resolvedPath = this.sourceBuilder.resolveDataPath(schemaValue as DataPath);
            values.resolvedValue = resolvedPath;
            suffix = this.sourceBuilder.validateResolvedVariables();
        }

        // TODO: Revisit `toString` method in Function prototype.
        let body = keywordDescriptor.validator.toString();
        const start = body.indexOf('{');
        const end = body.lastIndexOf('}');

        body = body.slice(start, end + 1).replace(TOKEN_BREAK, this.sourceBuilder.breakStatement());
        body = this.evaluateExpressions(body, values);
        body = this.replaceToken(body, ParameterName.Data, variableName);

        const parameterName: string = isDataPath
            ? resolvedPath
            : TypeReflect.primitiveLiteral(schemaValue)
            ? this.toLiteral(schemaValue)
            : this.sourceBuilder.createParameter(schemaValue);

        body = this.replaceToken(body, ParameterName.SchemaValue, parameterName);

        this.sourceBuilder.append(body + suffix);
    }

    /**
     * Evaluate `{{}}` expressions.
     *
     * Currently provided values are `schemaValue`, `schemaPath` and `resolvedValue`.
     *
     * `schemaValue` - is a value from schema
     *
     * `schemaPath` - is a path from schema root to currently processed part of schema
     *
     * `resolvedValue` - is a variable name assigned to a resolved `$dataPath` value
     */
    private evaluateExpressions(
        this: Compilation,
        sourceString: string,
        values: ParseValues,
    ): string {
        const { schemaPath, schemaValue, resolvedValue } = values;

        return sourceString.replace(
            EXPRESSION_REGEX,
            (_match, expr): string => {
                const fn = new Function(
                    ParameterName.SchemaPath,
                    ParameterName.SchemaValue,
                    ParameterName.ResolvedValue,
                    `return ${expr.toString()}`,
                );

                return fn(schemaPath, schemaValue, `\${${resolvedValue}}`);
            },
        );
    }

    /** Replaces every `token` in the `sourceString` with `replaceTo`. */
    private replaceToken(
        this: Compilation,
        sourceString: string,
        token: string,
        replaceTo: string,
    ): string {
        const escaped = token.replace(/[/{}$]/g, (m): string => `\\${m}`);
        const regex = new RegExp(`[^\\w_\\-\\$?](${escaped})\\b[^\\w$_]?`, 'g');
        return sourceString.replace(regex, (match, $1): string => match.replace($1, replaceTo));
    }

    private toLiteral(this: Compilation, schemaValue: unknown): string {
        if (typeof schemaValue === 'string') return `\`${schemaValue.replace(/`/g, '\\`')}\``;
        return `${schemaValue}`;
    }

    /** Calls type method marked as closure. */
    private parseMethodClosure(
        this: Compilation,
        keywordDescriptor: KeywordDescriptor,
        values: ParseValues,
    ): void {
        this.resolvedPaths.open();
        const snapshot = this.sourceBuilder.getContextSnapshot();

        const { schemaValue } = values;

        const resolvedValue = schemaValidate.dataPath(schemaValue)
            ? this.sourceBuilder.resolveDataPath(schemaValue)
            : undefined;

        const functionParameter = this.sourceBuilder.createParameter(keywordDescriptor.validator);

        const schemaParameter =
            resolvedValue ||
            (TypeReflect.primitiveLiteral(schemaValue)
                ? this.toLiteral(schemaValue)
                : this.sourceBuilder.createParameter(schemaValue));

        const suffix = this.sourceBuilder.validateResolvedVariables();
        snapshot.restore();
        this.sourceBuilder.callClosure(functionParameter, schemaParameter);
        this.sourceBuilder.append(suffix);
    }

    /** Calls type method marked as macro and appends its result to the validation function source code. */
    private parseMethodMacro(
        this: Compilation,
        keywordDescriptor: KeywordDescriptor,
        values: ParseValues,
    ): void {
        this.resolvedPaths.open();
        const code = keywordDescriptor.validator(values, ...this.macroHelpers) as string;
        const suffix = this.sourceBuilder.validateResolvedVariables();
        this.sourceBuilder.append(code + suffix);
    }
}
