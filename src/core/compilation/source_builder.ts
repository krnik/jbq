import { ParameterName, PathResolutionStrategy, PROP_DATA_PATH, SCHEMA_PATH_SEPARATOR, TYPE } from '../../constants';
import { schemaValidate } from '../../types/schemaValidate';
import { DataPathSchemaValue } from '../../typings';
import { CodeGenerator } from '../code_gen/code_gen';
import { ComparisonOperator } from '../code_gen/token/operator';
import { Compilation } from './compilation';
import { Schema } from './interface/schema.interface';
import { SourceBuilderContext } from './interface/source_builder_context.interface';
import { SourceBuilderCounter } from './interface/source_builder_counter.interface';
import { SourceBuilderProduct } from './interface/source_builder_product.interface';
import { SourceBuilderSnapshot } from './interface/source_builder_snapshot.interface';
import { ResolvedPathStore } from './resolved_path_store';

/**
 * Class responsible for main validation function composition logic.
 * It keeps track of currently used variables, arguments and schemaPath.
 * It is also responsible for creating and updating its context and product.
 */
export class SourceBuilder {
    private product: SourceBuilderProduct;
    private counter: SourceBuilderCounter;
    private context: SourceBuilderContext;
    private pathResolutionStrategy: PathResolutionStrategy;
    private resolvedPaths: ResolvedPathStore;
    private Compilation: Compilation;

    constructor (
        compilation: Compilation,
        schemaName: string,
        resolvedPaths: ResolvedPathStore,
        pathResolutionStrategy: PathResolutionStrategy = PathResolutionStrategy.Ignore,
    ) {
        this.Compilation = compilation;
        this.resolvedPaths = resolvedPaths;
        this.pathResolutionStrategy = pathResolutionStrategy;
        this.context = this.createInitialContext(schemaName);
        this.counter = this.createInitialCounter();
        this.product = this.createInitialProduct();
    }

    public getProduct (this: SourceBuilder): SourceBuilderProduct {
        return this.product;
    }

    /**
     * Returns path from root of the `Schema` to currently processed part of it.
     */
    public getSchemaPath (this: SourceBuilder): string {
        return this.context.schemaPath;
    }

    /**
     * Returns name of currently used data variable.
     */
    public getVariableName (this: SourceBuilder): string {
        return this.context.variableName;
    }

    /**
     * Returns a Snapshot of `SourceBuilder` context so it can be restored later
     * as if the compilation wouldn't went deeper into the schema tree.
     */
    public getContextSnapshot (this: SourceBuilder): SourceBuilderSnapshot {
        const { schemaPath, variableName, currentProperty } = this.context;
        return {
            schemaPath,
            variableName,
            currentProperty,
            restore: () => {
                this.context.schemaPath = schemaPath;
                this.context.variableName = variableName;
                this.context.currentProperty = currentProperty;
            },
        };
    }

    /**
     * Update the context of `SourceBuilder` so it's context is up to date to
     * currently processed property of schema and the path to currently processed
     * part of schema is also up to date.
     */
    public updateBuilderContext (
        this: SourceBuilder,
        currentProperty: string,
        updateVariableName: boolean = false,
    ): void {
        this.context.currentProperty = currentProperty;
        this.context.schemaPath += `${SCHEMA_PATH_SEPARATOR}${currentProperty}`;
        if (updateVariableName)
            this.updateVariableName();
    }

    /**
     * Increases the counter of `$DATA` related variables. Updates the context of
     * `SourceBuilder` and then return newly updated variable name of soon to be
     * currently processed data value.
     */
    public updateVariableName (this: SourceBuilder): string {
        this.counter.ofDataVariables += 1;

        const variableName = `${ParameterName.Data}_${this.counter.ofDataVariables}`;
        this.context.variableName = variableName;
        return variableName;
    }

    /**
     * Increases the created parameter counter, pushes new argument value to the
     * argument array and returns a string that will resolve to pushed value.
     */
    public createParameter (this: SourceBuilder, value: any): string {
        this.counter.parameters += 1;
        this.product.arguments.push(value);
        return `${this.product.argsParameter}[${this.counter.parameters}]`;
    }

    /**
     * Appends labeled block opening to the product source code.
     */
    public openLabeledBlock (this: SourceBuilder): void {
        this.product.code += CodeGenerator
            .renderOpenLabeledBlock(this.context.variableName);
    }

    /**
     * Appends `}` to the product source code.
     */
    public closeBlock (this: SourceBuilder): void {
        this.product.code += CodeGenerator.renderCloseBlock();
    }

    /**
     * Appends `$dataPath` resolution to the product source code.
     * Then, returns the variable name to which resolved value is assigned to.
     */
    public resolveDataPath (schemaValue: DataPathSchemaValue): string {
        const variableName = this.updateVariableName();
        this.resolvedPaths.add(variableName, schemaValue);
        this.product.code += CodeGenerator.renderDataPathResolution(schemaValue[PROP_DATA_PATH], variableName);
        return variableName;
    }

    /**
     * Perform handling of `$dataPath` resolution results.
     */
    public validateResolvedVariables (this: SourceBuilder): string {
        const variables = this.resolvedPaths.consume();

        if (variables.length === 0)
            return '';

        let code = '';
        let suffix = '';

        switch (this.pathResolutionStrategy) {
            case PathResolutionStrategy.Return: {
                const paths = variables
                    .map(({ schemaValue }) => CodeGenerator.renderDataPath(schemaValue[PROP_DATA_PATH]));

                code = CodeGenerator.renderIfStatement(
                    variables.map(({ variableName }) => ({
                        variableName,
                        value: 'undefined',
                        operator: ComparisonOperator.EqualStrict,
                    })),
                );
                code += CodeGenerator.renderReturnJSONMessage(
                    `One of ${PROP_DATA_PATH} values (${paths}) resolved to undefined.`,
                    this.getSchemaPath(),
                );
                break;
            }

            case PathResolutionStrategy.Schema: {
                for (const { schemaValue } of variables) {
                    if (schemaValue && !schemaValidate.dataPath(schemaValue))
                        return suffix;

                    if (!(schemaValue.hasOwnProperty(TYPE)))
                        return suffix;

                    const properties = [
                        ...Object.getOwnPropertyNames(schemaValue),
                        ...Object.getOwnPropertySymbols(schemaValue),
                    ];

                    const schemaOfDataPath = properties
                        .filter((key) => key !== PROP_DATA_PATH)
                        .reduce(
                            (acc, key) => {
                                // Hack to ignore `symbol` indexing error.
                                acc[key as string] = schemaValue[key as string];
                                return acc;
                            },
                            {} as Schema,
                        );

                    const snapshot = this.getContextSnapshot();
                    this.updateBuilderContext(PROP_DATA_PATH);
                    this.Compilation.parseSchemaSync(schemaOfDataPath);
                    snapshot.restore();
                }
                break;
            }

            case PathResolutionStrategy.Skip: {
                const ifStatement = CodeGenerator.renderIfStatement(
                    variables.map(({ variableName }) => ({
                        variableName,
                        value: 'undefined',
                        operator: ComparisonOperator.NotEqualStrict,
                    })),
                );

                code += `${ifStatement} {`;
                suffix = CodeGenerator.renderCloseBlock();
                break;
            }

            default:
                break;
        }

        this.product.code += code;
        return suffix;
    }

    /**
     * Appends a string to the end of the product source code.
     */
    public append (this: SourceBuilder, code: string): void {
        this.product.code += code;
    }

    /**
     * Returns a break statement chunk for currently processed block.
     */
    public breakStatement (this: SourceBuilder): string {
        return CodeGenerator.renderLabeledBreakStatement(this.context.variableName);
    }

    public callClosure (this: SourceBuilder, functionParam: string, schemaParam: string): void {
        this.product.code += CodeGenerator.renderFunctionCall(
            functionParam,
            schemaParam,
            this.context.schemaPath,
            this.context.variableName,
        );
    }

    public defineVariable (this: SourceBuilder, variableName: string, accessor: string): void {
        this.product.code += CodeGenerator.renderVariableInitialization(
            this.context.variableName,
            variableName,
            accessor,
        );
    }

    public forLoop (this: SourceBuilder, variableName: string, useForOfLoop: boolean): void {
        this.product.code += useForOfLoop
            ? CodeGenerator.renderForOfLoop(this.context.variableName, variableName, this.context.schemaPath)
            : CodeGenerator.renderForLoop(this.context.variableName, variableName, `${variableName}_accessor`);
    }

    public propertyAccessor (this: SourceBuilder, property: string): string {
        return CodeGenerator.renderPropertyAccessor(property);
    }

    private createInitialProduct (this: SourceBuilder): SourceBuilderProduct {
        return {
            code: '',
            arguments: [],
            dataParameter: ParameterName.Data,
            argsParameter: ParameterName.Arguments,
        };
    }

    private createInitialContext (this: SourceBuilder, schemaName: string): SourceBuilderContext {
        return {
            variableName: ParameterName.Data,
            currentProperty: '',
            schemaPath: schemaName,
        };
    }

    private createInitialCounter (this: SourceBuilder): SourceBuilderCounter {
        return {
            parameters: -1,
            ofDataVariables: -1,
        };
    }
}