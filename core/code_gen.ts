import { SCHEMA_PATH_SEPARATOR } from '../misc/constants.ts';
import { CodeGeneratorError } from './code_gen/code_gen_error.ts';
import { IfCondition } from './code_gen/code_gen_typings.ts';
import { Keyword } from './code_gen/token/keyword.ts';
import { ComparisonOperator, LogicalOperator } from './code_gen/token/operator.ts';
import { ParameterName } from './compilation/compilation_typings.ts';

/**
 * Utility class that provides functionality to help building validation
 * function code.
 */
export class CodeGenerator {
    /**
     * Renders provided `accessor` string as a object property accessor.
     *
     * # Example
     *     
     *     
     *     
     *     // Array<[accessor, expectedResult]>
     *     const numericAccessor = '100';
     *     equal(CodeGenerator.renderPropertyAccessor(numericAccessor), `[100]`);
     *     
     *     const validVarNameAccessor = '$jquery';
     *     equal(CodeGenerator.renderPropertyAccessor(validVarNameAccessor), `.$jquery`);
     *     
     *     const stringAccessor = '100=100';
     *     equal(CodeGenerator.renderPropertyAccessor(stringAccessor), '[`100=100`]');
     *     
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
     *     
     *     
     *     
     *     const label = 'validate_type_keyword';
     *     equal(CodeGenerator.renderLabeledBreakStatement(label), 'break label_validate_type_keyword;');
     *     
     *     const label2 = 'loop';
     *     equal(CodeGenerator.renderLabeledBreakStatement(label2), 'break label_loop;');
     *     
     */
    public static renderLabeledBreakStatement(blockLabel: string): string {
        return `${Keyword.Break} label_${blockLabel};`;
    }

    /**
     * Renders labeled block opening.
     *
     * # Example
     *     
     *     
     *     
     *     const label = 'validate_type';
     *     equal(CodeGenerator.renderOpenLabeledBlock(label), 'label_validate_type: {');
     *     
     *     const label2 = 'loop';
     *     equal(CodeGenerator.renderOpenLabeledBlock(label2), 'label_loop: {');
     *     
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
     *     
     *     
     *     
     *     
     *     const ifs: IfCondition[] = [];
     *     throws((): unknown => CodeGenerator.renderIfStatement(ifs, LogicalOperator.And));
     *     
     *     ifs.push({
     *         variableName: 'date',
     *         value: '"2019-01-01"',
     *         negate: true,
     *         operator: ComparisonOperator.Equal,
     *     });
     *     ifs.push({
     *         variableName: 'hour',
     *         value: '12',
     *         operator: ComparisonOperator.GreaterOrEqual,
     *     });
     *     equal(
     *         CodeGenerator.renderIfStatement(ifs, LogicalOperator.Or),
     *         'if (!(date === "2019-01-01")||hour >= 12)',
     *     );
     *     
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
     *     
     *     
     *     
     *     const message = 'Data value should be greater than 10.';
     *     const path = '/contact/age';
     *     
     *     equal(
     *         CodeGenerator.renderReturnObject(message, path),
     *         'return { message: `Data value should be greater than 10.`, path: `/contact/age` };',
     *     );
     *     
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
     *     
     *     
     *     
     *     equal(
     *         CodeGenerator.renderVariableInitialization('date', 'new Date()', '', Keyword.Let),
     *         'let date = new Date();',
     *     );
     *     
     *     equal(
     *         CodeGenerator.renderVariableInitialization(
     *             'APP_ID',
     *             'ENVIRONMENT',
     *             '.APPLICATION_ID',
     *             Keyword.Const,
     *         ),
     *         'const APP_ID = ENVIRONMENT.APPLICATION_ID;',
     *     );
     *     
     *     equal(CodeGenerator.renderVariableInitialization('name', 'user.name'), 'const name = user.name;');
     *     
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
     *     
     *     
     *     
     *     const forOfLoop = CodeGenerator.renderForOfLoop('user', 'allUsers', '');
     *     equal(true, forOfLoop.endsWith('for (const user of allUsers) {'));
     *     
     *     const forOfLoop2 = CodeGenerator.renderForOfLoop('item', 'documentCollection', '');
     *     equal(true, forOfLoop2.endsWith('for (const item of documentCollection) {'));
     *     
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
     *     
     *     
     *     
     *     const forLoop = CodeGenerator.renderForLoop('arrayItem', 'arrayOfNumbers', 'i', '');
     *     const lines = [
     *         'for (',
     *         'let i = 0;',
     *         'i < arrayOfNumbers_len;',
     *         'i++',
     *         ') {',
     *         'const arrayItem = arrayOfNumbers[i];',
     *     ];
     *     equal(true, lines.every((line): boolean => forLoop.includes(line)));
     *     
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
     *     
     *     
     *     
     *     const fnCall = CodeGenerator.renderFunctionCall('callback', '10', '/user/name', 'data');
     *     equal(true, fnCall.startsWith('const callback_res = callback(10, `/user/name`, data);'));
     *     equal(true, fnCall.endsWith('if (callback_res) return callback_res;'));
     *     
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
     *     
     *     
     *     
     *     const dataPath = 'contact/email';
     *     const resolution = CodeGenerator.renderDataPathResolution(dataPath, 'email', 'user');
     *     
     *     equal(resolution, 'const email = user.contact&&user.contact.email;');
     *     throws((): unknown => CodeGenerator.renderDataPathResolution('/', 'name'));
     *     equal(CodeGenerator.renderDataPathResolution(['/'], 'slash', 'data'), 'const slash = data[`/`];');
     *     
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
     *     
     *     
     *     
     *     const dataPath = ['my', 'little', 'pony'];
     *     equal(CodeGenerator.renderDataPath(dataPath), '(my/little/pony)');
     *     equal(CodeGenerator.renderDataPath('user/name'), '(user/name)');
     *     
     */
    public static renderDataPath(dataPath: string | string[]): string {
        return `(${Array.isArray(dataPath) ? dataPath.join(SCHEMA_PATH_SEPARATOR) : dataPath})`;
    }

    /**
     * Renders `str` as string.
     *
     * # Example
     *     
     *     
     *     
     *     equal(CodeGenerator.asString('github is a service'), '`github is a service`');
     *     equal(CodeGenerator.asString('taggedTemplate``'), '`taggedTemplate\\`\\``');
     *     
     */
    public static asString(str: string): string {
        return `\`${str.replace(/`/g, '\\`')}\``;
    }

    private static Error = CodeGeneratorError;
}
