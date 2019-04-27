import {
    LEN,
    ONE_OF,
    PROP_DATA_PATH,
    REGEX,
    SYM_METHOD_MACRO,
    SYM_TYPE_VALIDATE,
    TYPE,
    TYPE_NAME,
} from '../misc/constants';
import { CodeGenerator } from '../core/code_gen';
import { ComparisonOperator } from '../core/code_gen/token/operator';
import { DataPathChecker, DataPathResolver, ParseValuesMinMax } from '../misc/typings';
import { TypeReflect } from '../util/type_reflect';
import { schemaValidate } from './schema_validator';

export const TypeString = {
    [TYPE](_schemaValue: string, $DATA: unknown): string | void {
        if (typeof $DATA !== 'string')
            return `{"message": "Data should be a {{schemaValue}} type. Got ${typeof $DATA}.", "path": "{{schemaPath}}"}`;
    },
    [REGEX](schemaValue: RegExp, $DATA: string): string | void {
        if (!schemaValue.test($DATA))
            return `{"message": "Data expected to pass {{schemaValue.toString()}} test.", "path": "{{schemaPath}}"}`;
    },
    [LEN](
        parseValues: ParseValuesMinMax,
        checkDataPath: DataPathChecker,
        resolveDataPath: DataPathResolver,
    ): string | undefined {
        const { schemaValue, variableName, schemaPath } = parseValues;
        const dataVar = `${variableName}.length`;

        if (TypeReflect.number(schemaValue))
            return `${CodeGenerator.renderIfStatement([
                {
                    operator: ComparisonOperator.NotEqualStrict,
                    value: schemaValue.toString(),
                    variableName: dataVar,
                },
            ])}\n${CodeGenerator.renderReturnJSONMessage(
                `Data length should be equal to ${schemaValue}.`,
                schemaPath,
            )}`;

        if (checkDataPath(schemaValue)) {
            const varName = resolveDataPath(schemaValue);
            return `${CodeGenerator.renderIfStatement([
                {
                    operator: ComparisonOperator.NotEqualStrict,
                    value: varName,
                    variableName: dataVar,
                },
            ])}\n${CodeGenerator.renderReturnJSONMessage(
                `Data length should be equal to \${${varName}} ${CodeGenerator.renderDataPath(
                    schemaValue[PROP_DATA_PATH],
                )}.`,
                schemaPath,
            )}`;
        }

        const schemaMinMax = schemaValue as Exclude<ParseValuesMinMax['schemaValue'], number>;
        const valOrResolve = (value: unknown): [string, string] => {
            if (!checkDataPath(value)) return [`${value}`, `${value}`];
            const varName = resolveDataPath(value);
            return [`\${${varName}}`, varName];
        };

        if ('min' in schemaMinMax && 'max' in schemaMinMax) {
            const [minVal, min] = valOrResolve(schemaMinMax.min);
            const [maxVal, max] = valOrResolve(schemaMinMax.max);
            return `${CodeGenerator.renderIfStatement([
                {
                    operator: ComparisonOperator.LessThan,
                    value: min,
                    variableName: dataVar,
                },
                {
                    operator: ComparisonOperator.GreaterThan,
                    value: max,
                    variableName: dataVar,
                },
            ])}\n${CodeGenerator.renderReturnJSONMessage(
                `Data length should be in range ${minVal}..${maxVal}.`,
                schemaPath,
            )}`;
        }

        if ('min' in schemaMinMax) {
            const [minVal, min] = valOrResolve(schemaMinMax.min);
            return `${CodeGenerator.renderIfStatement([
                {
                    operator: ComparisonOperator.LessThan,
                    value: min,
                    variableName: dataVar,
                },
            ])}\n${CodeGenerator.renderReturnJSONMessage(
                `Data length should be greater than ${minVal}.`,
                schemaPath,
            )}`;
        }

        if ('max' in schemaMinMax) {
            const [maxVal, max] = valOrResolve(schemaMinMax.max);
            return `${CodeGenerator.renderIfStatement([
                {
                    operator: ComparisonOperator.GreaterThan,
                    value: max,
                    variableName: dataVar,
                },
            ])}\n${CodeGenerator.renderReturnJSONMessage(
                `Data length should be smaller than ${maxVal}.`,
                schemaPath,
            )}`;
        }
    },

    [ONE_OF](schemaValue: string[], $DATA: string): string | void {
        if (!schemaValue.includes($DATA))
            return `{"message": "Data expected to be one of [{{schemaValue.toString()}}].", "path": "{{schemaPath}}"}`;
    },
    [SYM_TYPE_VALIDATE]: {
        [TYPE]: schemaValidate.primitive(TYPE_NAME.STRING, TYPE, 'string'),
        [REGEX]: schemaValidate.isInstance(TYPE_NAME.STRING, REGEX, RegExp),
        [LEN]: schemaValidate.minMaxOrNumber(TYPE_NAME.STRING, LEN, true),
        [ONE_OF]: schemaValidate.arrayOf(TYPE_NAME.STRING, ONE_OF, 'string'),
    },
};

Object.defineProperty(TypeString[LEN], SYM_METHOD_MACRO, { value: true });
