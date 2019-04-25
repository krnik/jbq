import { MULTIPLE_OF, ONE_OF, PROP_DATA_PATH, SYM_METHOD_MACRO, SYM_TYPE_VALIDATE, TYPE, TYPE_NAME, VALUE } from '../constants';
import { CodeGenerator } from '../core/code_gen/code_gen';
import { ComparisonOperator } from '../core/code_gen/token/operator';
import { DataPathChecker, DataPathResolver, ParseValuesMinMax } from '../typings';
import { TypeReflect } from '../utils/type_reflect';
import { schemaValidate } from './schema_validator';

export const TypeNumber = {
    [TYPE] (_schemaValue: string, $DATA: any): string | void {
        if (typeof $DATA !== 'number' || $DATA !== $DATA)
            return `{"message": "Data should be a number (NaN excluded) type. Got ${typeof $DATA}.", "path": "{{schemaPath}}"}`;
    },
    [VALUE] (
        parseValues: ParseValuesMinMax,
        checkDataPath: DataPathChecker,
        resolveDataPath: DataPathResolver,
    ): string | undefined {
        const { schemaValue, schemaPath, variableName } = parseValues;
        if (TypeReflect.number(schemaValue))
            return `${
                CodeGenerator.renderIfStatement([{
                    variableName,
                    operator: ComparisonOperator.NotEqualStrict,
                    value: schemaValue.toString(),
                }])
                }\n${
                CodeGenerator.renderReturnJSONMessage(
                    `Data should be equal to ${schemaValue}.`,
                    schemaPath,
                )
                }`;

        if (checkDataPath(schemaValue)) {
            const varName = resolveDataPath(schemaValue);
            return `${
                CodeGenerator.renderIfStatement([{
                    value: varName,
                    variableName,
                    operator: ComparisonOperator.NotEqualStrict,
                }])
                }\n${
                CodeGenerator.renderReturnJSONMessage(
                    `Data should be equal to \${${varName}} ${
                    CodeGenerator.renderDataPath(schemaValue[PROP_DATA_PATH])
                    }.`,
                    schemaPath,
                )
                }`;
        }

        const schemaMinMax = schemaValue as Exclude<ParseValuesMinMax['schemaValue'], number>;
        const valOrResolve = (value: any) => {
            if (!checkDataPath(value)) return [`${value}`, value];
            const varName = resolveDataPath(value);
            return [`\${${varName}}`, varName];
        };

        if ('min' in schemaMinMax && 'max' in schemaMinMax) {
            const [minVal, min] = valOrResolve(schemaMinMax.min);
            const [maxVal, max] = valOrResolve(schemaMinMax.max);
            return `${
                CodeGenerator.renderIfStatement(
                    [
                        {
                            variableName,
                            value: min,
                            operator: ComparisonOperator.LessThan,
                        },
                        {
                            variableName,
                            value: max,
                            operator: ComparisonOperator.GreaterThan,
                        },
                    ],
                )
                }\n${
                CodeGenerator.renderReturnJSONMessage(
                    `Data should be in range ${minVal}..${maxVal}.`,
                    schemaPath,
                )
                }`;
        }

        if ('min' in schemaMinMax) {
            const [minVal, min] = valOrResolve(schemaMinMax.min);
            return `${
                CodeGenerator.renderIfStatement([{
                    variableName,
                    value: min,
                    operator: ComparisonOperator.LessThan,
                }])
                }\n${
                CodeGenerator.renderReturnJSONMessage(
                    `Data should be greater than ${minVal}.`,
                    schemaPath,
                )
                }`;
        }

        if ('max' in schemaMinMax) {
            const [maxVal, max] = valOrResolve(schemaMinMax.max);
            return `${
                CodeGenerator.renderIfStatement([{
                    variableName,
                    value: max,
                    operator: ComparisonOperator.GreaterThan,
                }])
                }\n${
                CodeGenerator.renderReturnJSONMessage(
                    `Data should be smaller than ${maxVal}.`,
                    schemaPath,
                )
                }`;
        }
    },
    [MULTIPLE_OF] (schemaValue: number, $DATA: any): string | void {
        if ($DATA % schemaValue)
            return `{"message": "Data expected to be multiply of {{schemaValue}}.", "path": "{{schemaPath}}"}`;
    },
    [ONE_OF] (schemaValue: number[], $DATA: any): string | void {
        if (!schemaValue.includes($DATA))
            return `{"message": "Data should be one of {{schemaValue.toString()}}.", "path": "{{schemaPath}}"}`;
    },
    [SYM_TYPE_VALIDATE]: {
        [TYPE]: schemaValidate.primitive(TYPE_NAME.NUMBER, TYPE, 'string'),
        [VALUE]: schemaValidate.minMaxOrNumber(TYPE_NAME.NUMBER, VALUE, true),
        [MULTIPLE_OF]: schemaValidate.primitive(TYPE_NAME.NUMBER, MULTIPLE_OF, 'number', true),
        [ONE_OF]: schemaValidate.arrayOf(TYPE_NAME.NUMBER, ONE_OF, 'number'),
    },
};

Object.defineProperty(TypeNumber[VALUE], SYM_METHOD_MACRO, { value: true });
