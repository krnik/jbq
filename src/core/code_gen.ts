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
     */
    public static renderPropertyAccessor(accessor: string): string {
        if (/^[a-zA-Z_$][\w$]*$/.test(accessor)) return `.${accessor}`;
        if (/^\d+$/.test(accessor)) return `[${accessor}]`;
        return `[${CodeGenerator.asString(accessor)}]`;
    }

    /**
     * Renders labeled break statement, expects current block label name as an
     * argument.
     */
    public static renderLabeledBreakStatement(blockLabel: string): string {
        return `${Keyword.Break} label_${blockLabel};`;
    }

    /**
     * Renders labeled block opening.
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
     * Renders return statement that returns object value.
     */
    public static renderReturnObject(message: string, path: string): string {
        return `${Keyword.Return} { "message": "${message}", "path": "${path}" };`;
    }

    /**
     * Renders `const` variable initialization.
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
     */
    public static renderForOfLoop(variableName: string, iterable: string, path: string): string {
        const ifCondition = {
            variableName: 'Symbol.iterator',
            operator: Keyword.In,
            value: iterable,
            negate: true,
        };
        return `${CodeGenerator.renderIfStatement([ifCondition])}
                ${CodeGenerator.renderReturnObject(
                    `Data requires to have ${Symbol.iterator.toString()} method implemented in order to use for..of loop`,
                    path,
                )}
            ${Keyword.For} (${Keyword.Const} ${variableName} ${Keyword.Of} ${iterable}) {`;
    }

    /**
     * Renders for loop.
     */
    public static renderForLoop(
        variableName: string,
        collection: string,
        accessor: string,
    ): string {
        return `
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
     */
    public static renderDataPath(dataPath: string | string[]): string {
        return `(${Array.isArray(dataPath) ? dataPath.join(SCHEMA_PATH_SEPARATOR) : dataPath})`;
    }

    /**
     * Renders `str` as string.
     */
    public static asString(str: string): string {
        return `\`${str.replace(/`/g, '\\`')}\``;
    }

    private static Error = CodeGeneratorError;
}
