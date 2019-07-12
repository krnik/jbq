import { SCHEMA_PATH_SEPARATOR } from '../misc/constants';
import { CodeGeneratorError } from './code_gen/code_gen_error';
import { IfCondition } from './code_gen/code_gen_typings';
import { Keyword } from './code_gen/token/keyword';
import { ComparisonOperator, LogicalOperator } from './code_gen/token/operator';
import { ParameterName } from './compilation/compilation_typings';

/**
 * Utility class that provides functionality to help building validation
 * function code.
 */
export class CodeGenerator {
    /**
     * Renders provided `accessor` string as a object property accessor.
     *
     * # Example
     * #example:code_generator_render_property_accessor
     */
    public static renderPropertyAccessor(accessor: string): string {
        if (/^[a-zA-Z_$][\w$]*$/.test(accessor)) return `.${accessor}`;
        if (/^\d+$/.test(accessor)) return `[${accessor}]`;
        return `[${CodeGenerator.asString(accessor)}]`;
    }

    /**
     * Renders labeled break statement, expects current block label name as an
     * argument.
     *
     * # Example
     * #example:code_generator_render_labeled_break_statement
     */
    public static renderLabeledBreakStatement(blockLabel: string): string {
        return `${Keyword.Break} label_${blockLabel};`;
    }

    /**
     * Renders labeled block opening.
     *
     * # Example
     * #example:code_generator_render_open_labeled_block
     */
    public static renderOpenLabeledBlock(blockLabel: string): string {
        return `label_${blockLabel}: {`;
    }

    /**
     * Returns single `}` character.
     */
    public static renderCloseBlock(): string {
        return '}';
    }

    /**
     * Renders "if statement".
     *
     * # Example
     * #example:code_generator_render_if_statement
     */
    public static renderIfStatement(
        conditions: IfCondition[],
        condLogicOperator: LogicalOperator = LogicalOperator.Or,
    ): string {
        if (conditions.length === 0) throw CodeGenerator.Error.emptyIfConditionArray();
        return `${Keyword.If} (${conditions
            .map(
                ({ operator, value, variableName, negate }): string => {
                    const condition = `${variableName} ${operator} ${value}`;
                    return negate ? `!(${condition})` : condition;
                },
            )
            .join(condLogicOperator)})`;
    }

    /**
     * Renders return statement that returns basic `ValidationError` object.
     *
     * # Example
     * #example:code_generator_render_return_object
     */
    public static renderReturnObject(message: string, path: string): string {
        return `${Keyword.Return} { message: ${CodeGenerator.asString(
            message,
        )}, path: ${CodeGenerator.asString(path)} };`;
    }

    /**
     * Renders variable initialization.
     *
     * # Example
     * #example:code_generator_render_variable_initialization
     */
    public static renderVariableInitialization(
        variableName: string,
        value: string,
        accessor: string = '',
        keyword: Keyword.Const | Keyword.Let | Keyword.Var = Keyword.Const,
    ): string {
        return `${keyword} ${variableName} = ${value}${accessor};`;
    }

    /**
     * Renders for..of loop.
     *
     * # Example
     * #example:code_generator_render_for_of_loop
     */
    public static renderForOfLoop(
        variableName: string,
        iterable: string,
        schemaPath: string,
    ): string {
        const ifCondition = {
            variableName: 'Symbol.iterator',
            operator: Keyword.In,
            value: iterable,
            negate: true,
        };
        return `${CodeGenerator.renderIfStatement([ifCondition])}
                ${CodeGenerator.renderReturnObject(
                    `Data requires to have ${Symbol.iterator.toString()} method implemented in order to use for..of loop`,
                    schemaPath,
                )}
            ${Keyword.For} (${Keyword.Const} ${variableName} ${Keyword.Of} ${iterable}) {`;
    }

    /**
     * Renders for loop.
     *
     * # Example
     * #example:code_generator_render_for_loop
     */
    public static renderForLoop(
        variableName: string,
        collection: string,
        accessor: string,
        schemaPath: string,
    ): string {
        const noLengthProp = CodeGenerator.renderReturnObject(
            'Data must have "length" of type "number" property in order to iterate over its elements using indexed access.',
            schemaPath,
        );
        const lengthPropertyCheck = `if (typeof ${collection}.length !== 'number') ${noLengthProp}`;
        return `
            ${lengthPropertyCheck}
            ${CodeGenerator.renderVariableInitialization(
                `${collection}_len`,
                collection,
                '.length',
            )}
            ${Keyword.For} (
                ${CodeGenerator.renderVariableInitialization(accessor, '0', '', Keyword.Let)}
                ${accessor} ${ComparisonOperator.LessThan} ${collection}_len;
                ${accessor}++
            ) {
                ${CodeGenerator.renderVariableInitialization(
                    variableName,
                    collection,
                    `[${accessor}]`,
                )}`;
    }

    /**
     * Renders function call, checks if it returned truthy value, if so then return
     * from validation function.
     *
     * # Example
     * #example:code_generator_render_function_call
     */
    public static renderFunctionCall(
        fnParam: string,
        schemaValue: string,
        schemaPath: string,
        variableName: string,
    ): string {
        const resultVariableName = `${fnParam.replace(/[\[\]]/g, '')}_res`;
        return `${
            Keyword.Const
        } ${resultVariableName} = ${fnParam}(${schemaValue}, ${CodeGenerator.asString(
            schemaPath,
        )}, ${variableName});
        ${Keyword.If} (${resultVariableName}) return ${resultVariableName};`;
    }

    /**
     * Renders $dataPath resolution.
     *
     * # Example
     * #example:code_generator_render_data_path_resolution
     */
    public static renderDataPathResolution(
        dataPath: string | string[],
        variableName: string,
        baseVariable: string = ParameterName.Data,
    ): string {
        const paths = (Array.isArray(dataPath)
            ? dataPath
            : dataPath.split(SCHEMA_PATH_SEPARATOR)
        ).filter((key): number => key.length);

        if (!paths.length) throw CodeGenerator.Error.invalidDataPath(dataPath);

        const pathResolution = paths
            .reduce(
                (acc, key, index): string[] => {
                    acc.push(
                        index > 0
                            ? `${acc[index - 1]}${CodeGenerator.renderPropertyAccessor(key)}`
                            : `${baseVariable}${CodeGenerator.renderPropertyAccessor(key)}`,
                    );
                    return acc;
                },
                [] as string[],
            )
            .join(LogicalOperator.And);

        return CodeGenerator.renderVariableInitialization(variableName, pathResolution);
    }

    /**
     * Renders `$dataPath` as string.
     *
     * # Example
     * #example:code_generator_render_data_path
     */
    public static renderDataPath(dataPath: string | string[]): string {
        return `(${Array.isArray(dataPath) ? dataPath.join(SCHEMA_PATH_SEPARATOR) : dataPath})`;
    }

    /**
     * Renders `str` as string.
     *
     * # Example
     * #example:code_generator_as_string
     */
    public static asString(str: string): string {
        return `\`${str.replace(/`/g, '\\`')}\``;
    }

    private static Error = CodeGeneratorError;
}
