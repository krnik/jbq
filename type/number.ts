import { CodeGenerator } from '../core/code_gen.ts';
import { ComparisonOperator } from '../core/code_gen/token/operator.ts';
import { DataPathChecker, DataPathResolver } from '../core/compilation/compilation_typings.ts';
import { ValidationResult } from '../core/jbq/jbq_typings.ts';
import { TypeInstance } from '../core/type_store/type_instance.ts';
import { KeywordValidationFunctionKind } from '../core/type_store/type_instance/type_instance_typings.ts';
import { MULTIPLE_OF, ONE_OF, PROP_DATA_PATH, TYPE, VALUE, TYPE_NUMBER } from '../misc/constants.ts';
import { TypeReflect } from '../util/type_reflect.ts';
import { TypeAny } from './any.ts';
import { schemaValidate } from './schema_validator.ts';
import { ParseValuesMinMax } from './type_definition_typings.ts';

export const TypeNumber = new TypeInstance(TYPE_NUMBER)
    .derive(TypeAny)
    .setKeyword(TYPE, {
        validator(_schemaValue: string, $DATA: unknown): ValidationResult {
            if (typeof $DATA !== 'number' || $DATA !== $DATA)
                return {
                    message: `Data should be a number (NaN excluded) type. Got ${typeof $DATA}.`,
                    path: '{{schemaPath}}',
                };
        },
        schemaValidator: schemaValidate.primitive(TYPE_NUMBER, TYPE, 'string'),
    })
    .setKeyword(VALUE, {
        validator(
            parseValues: ParseValuesMinMax,
            checkDataPath: DataPathChecker,
            resolveDataPath: DataPathResolver,
        ): string | undefined {
            const { schemaValue, schemaPath, variableName } = parseValues;
            if (TypeReflect.number(schemaValue))
                return `${CodeGenerator.renderIfStatement([
                    {
                        variableName,
                        operator: ComparisonOperator.NotEqualStrict,
                        value: schemaValue.toString(),
                    },
                ])}\n${CodeGenerator.renderReturnObject(
                    `Data should be equal to ${schemaValue}.`,
                    schemaPath,
                )}`;

            if (checkDataPath(schemaValue)) {
                const varName = resolveDataPath(schemaValue);
                return `${CodeGenerator.renderIfStatement([
                    {
                        value: varName,
                        variableName,
                        operator: ComparisonOperator.NotEqualStrict,
                    },
                ])}\n${CodeGenerator.renderReturnObject(
                    `Data should be equal to \${${varName}} ${CodeGenerator.renderDataPath(
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
                        variableName,
                        value: min,
                        operator: ComparisonOperator.LessThan,
                    },
                    {
                        variableName,
                        value: max,
                        operator: ComparisonOperator.GreaterThan,
                    },
                ])}\n${CodeGenerator.renderReturnObject(
                    `Data should be in range ${minVal}..${maxVal}.`,
                    schemaPath,
                )}`;
            }

            if ('min' in schemaMinMax) {
                const [minVal, min] = valOrResolve(schemaMinMax.min);
                return `${CodeGenerator.renderIfStatement([
                    {
                        variableName,
                        value: min,
                        operator: ComparisonOperator.LessThan,
                    },
                ])}\n${CodeGenerator.renderReturnObject(
                    `Data should be greater than ${minVal}.`,
                    schemaPath,
                )}`;
            }

            if ('max' in schemaMinMax) {
                const [maxVal, max] = valOrResolve(schemaMinMax.max);
                return `${CodeGenerator.renderIfStatement([
                    {
                        variableName,
                        value: max,
                        operator: ComparisonOperator.GreaterThan,
                    },
                ])}\n${CodeGenerator.renderReturnObject(
                    `Data should be smaller than ${maxVal}.`,
                    schemaPath,
                )}`;
            }
        },
        kind: KeywordValidationFunctionKind.Macro,
        schemaValidator: schemaValidate.minMaxOrNumber(TYPE_NUMBER, VALUE, true),
    })
    .setKeyword(ONE_OF, {
        validator(schemaValue: number[], $DATA: number): ValidationResult {
            if (!schemaValue.includes($DATA))
                return {
                    message: 'Data should be one of {{schemaValue.toString()}}.',
                    path: '{{schemaPath}}',
                };
        },
        schemaValidator: schemaValidate.arrayOf(TYPE_NUMBER, ONE_OF, 'number'),
    })
    .setKeyword(MULTIPLE_OF, {
        validator(schemaValue: number, $DATA: number): ValidationResult {
            if ($DATA % schemaValue)
                return {
                    message: 'Data expected to be multiply of {{schemaValue}}.',
                    path: '{{schemaPath}}',
                };
        },
        // Should not accept NaN, Infinity, 0, -Infinity
        schemaValidator: schemaValidate.primitive(TYPE_NUMBER, MULTIPLE_OF, 'number', true),
    });
