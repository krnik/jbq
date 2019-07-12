import { CodeGenerator } from '../core/code_gen';
import { ComparisonOperator } from '../core/code_gen/token/operator';
import { DataPathChecker, DataPathResolver } from '../core/compilation/compilation_typings';
import { ValidationResult } from '../core/jbq/jbq_typings';
import { TypeInstance } from '../core/type_store/type_instance';
import { KeywordValidationFunctionKind } from '../core/type_store/type_instance/type_instance_typings';
import { EVERY, INCLUDES, LEN, PROP_DATA_PATH, SOME, TYPE, TYPE_ARRAY } from '../misc/constants';
import { AnyArray, ArrIterCallback } from '../misc/typings';
import { TypeReflect } from '../util/type_reflect';
import { TypeAny } from './any';
import { schemaValidate } from './schema_validator';
import { ParseValuesMinMax } from './type_definition_typings';

// TODO: check performance: pass $DATA[i], i, $DATA instead of $DATA[i]
// TODO: Replace string return with object return ;]
// TODO: Enable message injection
// TODO: object shape modification?

export const TypeArray = new TypeInstance(TYPE_ARRAY)
    .derive(TypeAny)
    .setKeyword(TYPE, {
        validator(_schemaValue: string, $DATA: unknown): ValidationResult {
            if (!Array.isArray($DATA))
                return {
                    message: 'Data should be a {{schemaValue}} type.',
                    path: '{{schemaPath}}',
                };
        },
        schemaValidator: schemaValidate.primitive(TYPE_ARRAY, TYPE, 'string'),
    })
    .setKeyword(EVERY, {
        validator<T>(schemaValue: ArrIterCallback<boolean, T>, $DATA: AnyArray): ValidationResult {
            const len = $DATA.length;
            if (len !== 0)
                for (let i = 0; i < len; i++)
                    if (!schemaValue($DATA[i], i, $DATA))
                        return {
                            message: 'Every element of data should satisfy test function.',
                            path: '{{schemaPath}}',
                        };
        },
        schemaValidator: schemaValidate.isInstance(TYPE_ARRAY, EVERY, Function),
    })
    .setKeyword(SOME, {
        validator<T>(schemaValue: ArrIterCallback<boolean, T>, $DATA: AnyArray): ValidationResult {
            const len = $DATA.length;
            if (len !== 0) {
                let pass = false;
                for (let i = 0; i < len; i++)
                    // @ts-ignore
                    if (schemaValue($DATA[i], i, $DATA)) {
                        pass = true;
                        break;
                    }
                if (!pass)
                    return {
                        message: 'At least one element of data should satisfy test function.',
                        path: '{{schemaPath}}',
                    };
            }
        },
        schemaValidator: schemaValidate.isInstance(TYPE_ARRAY, SOME, Function),
    })
    .setKeyword(INCLUDES, {
        validator(schemaValue: unknown, $DATA: unknown[]): ValidationResult {
            let found = false;
            for (let i = 0; i < $DATA.length; i++)
                if ($DATA[i] === schemaValue) {
                    found = true;
                    break;
                }
            if (!found)
                return { message: 'Data should include {{schemaValue}}.', path: '{{schemaPath}}' };
        },
        schemaValidator: schemaValidate.any(TYPE_ARRAY, INCLUDES),
    })
    .setKeyword(LEN, {
        validator(
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
                ])}\n${CodeGenerator.renderReturnObject(
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
                ])}\n${CodeGenerator.renderReturnObject(
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
                ])}\n${CodeGenerator.renderReturnObject(
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
                ])}\n${CodeGenerator.renderReturnObject(
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
                ])}\n${CodeGenerator.renderReturnObject(
                    `Data length should be smaller than ${maxVal}.`,
                    schemaPath,
                )}`;
            }
        },
        kind: KeywordValidationFunctionKind.Macro,
        // TODO: Ensure LEN is u32
        schemaValidator: schemaValidate.minMaxOrNumber(TYPE_ARRAY, LEN, true),
    })
    .setUseForOfLoop(false);
