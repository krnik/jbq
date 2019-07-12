import { CodeGenerator } from '../core/code_gen';
import { ComparisonOperator } from '../core/code_gen/token/operator';
import { DataPathChecker, DataPathResolver } from '../core/compilation/compilation_typings';
import { ValidationResult } from '../core/jbq/jbq_typings';
import { TypeInstance } from '../core/type_store/type_instance';
import { KeywordValidationFunctionKind } from '../core/type_store/type_instance/type_instance_typings';
import { LEN, ONE_OF, PROP_DATA_PATH, REGEX, TYPE, TYPE_STRING } from '../misc/constants';
import { TypeReflect } from '../util/type_reflect';
import { TypeAny } from './any';
import { schemaValidate } from './schema_validator';
import { ParseValuesMinMax } from './type_definition_typings';

export const TypeString = new TypeInstance(TYPE_STRING)
    .derive(TypeAny)
    .setKeyword(TYPE, {
        validator(_schemaValue: string, $DATA: unknown): ValidationResult {
            if (typeof $DATA !== 'string')
                return {
                    message: `Data should be a {{schemaValue}} type. Got ${typeof $DATA}.`,
                    path: '{{schemaPath}}',
                };
        },
        schemaValidator: schemaValidate.isInstance(TYPE_STRING, TYPE, String),
    })
    .setKeyword(REGEX, {
        validator(schemaValue: RegExp, $DATA: string): ValidationResult {
            if (!schemaValue.test($DATA))
                return {
                    message: 'Data expected to pass {{schemaValue.toString()}} test.',
                    path: '{{schemaPath}}',
                };
        },
        schemaValidator: schemaValidate.isInstance(TYPE_STRING, REGEX, RegExp),
    })
    .setKeyword(LEN, {
        validator(
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
                        variableName: dataVar,
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
                        variableName: dataVar,
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
                        variableName: dataVar,
                    },
                ])}\n${CodeGenerator.renderReturnObject(
                    `Data length should be smaller than ${maxVal}.`,
                    schemaPath,
                )}`;
            }
        },
        schemaValidator: schemaValidate.minMaxOrNumber(TYPE_STRING, LEN, true),
        kind: KeywordValidationFunctionKind.Macro,
    })
    .setKeyword(ONE_OF, {
        validator(schemaValue: string[], $DATA: string): ValidationResult {
            if (!schemaValue.includes($DATA))
                return {
                    message: 'Data expected to be one of [{{schemaValue.toString()}}].',
                    path: '{{schemaPath}}',
                };
        },
        schemaValidator: schemaValidate.arrayOf(TYPE_STRING, ONE_OF, 'string'),
    }); // Prolly rename to ENUM
