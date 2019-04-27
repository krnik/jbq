import {
    EVERY,
    INCLUDES,
    LEN,
    PROP_DATA_PATH,
    SOME,
    SYM_METHOD_MACRO,
    SYM_TYPE_FOR_LOOP,
    SYM_TYPE_VALIDATE,
    TYPE,
    TYPE_NAME,
} from '../misc/constants';
import { CodeGenerator } from '../core/code_gen/code_gen';
import { ComparisonOperator } from '../core/code_gen/token/operator';
import { DataPathChecker, DataPathResolver, ParseValuesMinMax } from '../misc/typings';
import { TypeReflect } from '../util/type_reflect';
import { schemaValidate } from './schema_validator';

// TODO: maybe pass $DATA[i], i, $DATA instead of $DATA[i]
// check perf
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type arrMethodCallback = (elem: any, index: number, arr: any[]) => boolean;

export const TypeArray = {
    [TYPE](_schemaValue: string, $DATA: unknown): string | void {
        if (!Array.isArray($DATA))
            return '{"message": "Data should be a {{schemaValue}} type.", "path": "{{schemaPath}}"}';
    },
    [EVERY](schemaValue: arrMethodCallback, $DATA: unknown[]): string | void {
        const len = $DATA.length;
        for (let i = 0; i < len; i++)
            // @ts-ignore
            if (!schemaValue($DATA[i]))
                return '{"message": "Every element of data should satisfy test function.", "path": "{{schemaPath}}"}';
    },
    [SOME](schemaValue: arrMethodCallback, $DATA: unknown[]): string | void {
        const len = $DATA.length;
        let pass = false;
        for (let i = 0; i < len; i++)
            // @ts-ignore
            if (schemaValue($DATA[i])) {
                pass = true;
                break;
            }
        if (!pass)
            return '{"message": "At least one element of data should satisfy test function.", "path": "{{schemaPath}}"}';
    },
    [INCLUDES](schemaValue: unknown, $DATA: unknown[]): string | void {
        let found = false;
        for (let i = 0; i < $DATA.length; i++)
            if ($DATA[i] === schemaValue) {
                found = true;
                break;
            }
        if (!found)
            return '{"message": "Data should include {{schemaValue}}.", "path": "{{schemaPath}}"}';
    },
    [LEN](
        parseValues: ParseValuesMinMax,
        checkDataPath: DataPathChecker,
        resolveDataPath: DataPathResolver,
    ): string | undefined {
        const { schemaValue, variableName, schemaPath } = parseValues;
        const dataVariable = `${variableName}.length`;

        if (TypeReflect.number(schemaValue))
            return `${CodeGenerator.renderIfStatement([
                {
                    variableName: dataVariable,
                    value: schemaValue.toString(),
                    operator: ComparisonOperator.NotEqualStrict,
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
                    variableName: dataVariable,
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
            if (!checkDataPath(value)) return [`${value}`, value as string];
            const varName = resolveDataPath(value);
            return [`\${${varName}}`, varName];
        };

        if ('min' in schemaMinMax && 'max' in schemaMinMax) {
            const [minVal, min] = valOrResolve(schemaMinMax.min);
            const [maxVal, max] = valOrResolve(schemaMinMax.max);

            return `${CodeGenerator.renderIfStatement([
                {
                    variableName: dataVariable,
                    value: min,
                    operator: ComparisonOperator.LessThan,
                },
                {
                    variableName: dataVariable,
                    value: max,
                    operator: ComparisonOperator.GreaterThan,
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
                    variableName: dataVariable,
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
                    variableName: dataVariable,
                },
            ])}\n${CodeGenerator.renderReturnJSONMessage(
                `Data length should be smaller than ${maxVal}.`,
                schemaPath,
            )}`;
        }
    },
    [SYM_TYPE_VALIDATE]: {
        [TYPE]: schemaValidate.primitive(TYPE_NAME.ARRAY, TYPE, 'string'),
        [EVERY]: schemaValidate.isInstance(TYPE_NAME.ARRAY, EVERY, Function),
        [SOME]: schemaValidate.isInstance(TYPE_NAME.ARRAY, SOME, Function),
        [LEN]: schemaValidate.minMaxOrNumber(TYPE_NAME.ARRAY, LEN, true),
        [INCLUDES]: schemaValidate.any(TYPE_NAME.ARRAY, INCLUDES),
    },
    [SYM_TYPE_FOR_LOOP]: true,
};

Object.defineProperty(TypeArray[LEN], SYM_METHOD_MACRO, { value: true });
