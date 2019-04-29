import { ParameterName, SCHEMA_PATH_SEPARATOR } from '../misc/constants';
import { TypeReflect } from '../util/type_reflect';
import { CodeGeneratorError } from './code_gen/code_gen_error';
import { IfCondition } from './code_gen/interface/if_condition.interface';
import { Keyword } from './code_gen/token/keyword';
import { ComparisonOperator, LogicalOperator } from './code_gen/token/operator';

/**
 * Utility class that provides functionality to help building validation
 * function code.
 */
export class CodeGenerator {
    /**
     * Renders provided `accessor` string as a object property accessor.
     *
     * # Examples
     *
     *    .renderPropertyAccessor('0');
     *    '[0]'
     *
     *    .renderPropertyAccessor('_prop_name');
     *    '._prop_name'
     *
     *    .renderPropertyAccessor('??_not_so_valid_variable_name');
     *    '["??_not_so_valid_variable_name"]'
     */
    public static renderPropertyAccessor(accessor: string): string {
        if (/^[a-zA-Z_$][\w$]*$/.test(accessor)) return `.${accessor}`;
        if (/^\d+$/.test(accessor)) return `[${accessor}]`;
        return `[${TypeReflect.asString(accessor)}]`;
    }

    /**
     * Renders labeled break statement, expects current block label name as an
     * argument.
     *
     * # Examples
     *
     *    .renderLabeledBreakStatement('data_0');
     *    'break label_data_0;'
     */
    public static renderLabeledBreakStatement(blockLabel: string): string {
        return `${Keyword.Break} label_${blockLabel};`;
    }

    /**
     * Renders labeled block opening.
     *
     * # Examples
     *
     *    .renderOpenLabeledBlock('myBlock');
     *    'label_myBlock: {';
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
     * # Examples
     *
     *    const conditions = [
     *      {
     *          operator: ComparisonOperator.EqualStrict,
     *          value: '100',
     *          variableName: 'resolved_0', // some variable from the scope
     *      },
     *    ];
     *
     *    .renderIfStatement(conditions);
     *    'if (resolved_0 === 100)';
     *
     *    const conds = [
     *      {
     *          operator: ComparisonOperator.GreaterThan,
     *          value: 0,
     *          variableName: 'a'
     *      },
     *      {
     *          operator: ComparisonOperator.GreaterThan,
     *          value: 0,
     *          variableName: 'b'
     *      },
     *    ];
     *
     *    .renderIfStatement(conditions, LogicalOperator.Or);
     *    'if (a > 0 || b > 0)';
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
     * Renders return statement that returns with JSON value.
     *
     * # Examples
     *
     *    .renderReturnJSONMessage('Oopsie', 'User#type');
     *    'return `{ "message": "Oopsie", "path": "User#type" }`;';
     */
    public static renderReturnJSONMessage(message: string, path: string): string {
        return `${Keyword.Return} \`{ "message": "${message}", "path": "${path}" }\`;`;
    }

    /**
     * Renders `const` variable initialization.
     *
     * # Examples
     *
     *    .renderVariableInitialization('myVar', 'window', '.fetch');
     *    'const myVar = window.fetch;';
     *
     *    .renderVariableInitialization('myVar', '100');
     *    'const myVar = 100;';
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
     * # Examples
     *
     *    .renderForOfLoop('item', 'arrayOfNumbers', 'Numbers');
     *    // renders stringified version of
     *    if (!(Symbol.iterator in arrayOfNumbers))
     *        return `{"message": "Data requires...", "path": "Numbers"}`;
     *    for (const item of arrayOfNumbers)
     */
    public static renderForOfLoop(variableName: string, iterable: string, path: string): string {
        const ifCondition = {
            variableName: 'Symbol.iterator',
            operator: Keyword.In,
            value: iterable,
            negate: true,
        };
        return `${CodeGenerator.renderIfStatement([ifCondition])}
                ${CodeGenerator.renderReturnJSONMessage(
                    `Data requires to have ${Symbol.iterator.toString()} method implemented in order to use for..of loop`,
                    path,
                )}
            ${Keyword.For} (${Keyword.Const} ${variableName} ${Keyword.Of} ${iterable})`;
    }

    /**
     * Renders for loop.
     *
     * # Examples
     *
     *    .renderForLoop('myVar', 'arrayOfNumbers', 'a_index');
     *    // renders stringified version of
     *    const myVar_len = arrayOfNumbers.length;
     *    for (
     *      let a_index = 0;
     *      a_index < myVar_len;
     *      a_inex++
     *    ) {
     *      const myVar = arrayOfNumbers[a_index];
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
     *
     * # Example
     *
     *    .renderFunctionCall('isValidUser', '{}', 'User', '$data');
     *    // returns stringified version of
     *    const isValidUser_res = isValidUser({}, 'User', $data);
     *    if (isValidUser_res) return isValidUser_res;
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
        } ${resultVariableName} = ${fnParam}(${schemaValue}, ${TypeReflect.asString(
            schemaPath,
        )}, ${variableName});
        ${Keyword.If} (${resultVariableName}) return ${resultVariableName};`;
    }

    /**
     * Renders $dataPath resolution.
     *
     * # Example
     *
     *    .renderDataPathResolution('/user/name', 'userName');
     *    // renders stringified version of
     *    const userName = $DATA && $DATA.user && $DATA.user.name;
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
     * Renders `$dataPath` as string for debugging purposes.
     */
    public static renderDataPath(dataPath: string | string[]): string {
        return `(${Array.isArray(dataPath) ? dataPath.join(SCHEMA_PATH_SEPARATOR) : dataPath})`;
    }
    private static Error = CodeGeneratorError;
}
