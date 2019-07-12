import { CodeGenerator } from '../core/code_gen';
import { ComparisonOperator } from '../core/code_gen/token/operator';
import { DataPathChecker, DataPathResolver } from '../core/compilation/compilation_typings';
import { ValidationResult } from '../core/jbq/jbq_typings';
import { TypeInstance } from '../core/type_store/type_instance';
import { KeywordValidationFunctionKind } from '../core/type_store/type_instance/type_instance_typings';
import {
    CONSTRUCTOR_NAME,
    INSTANCE_OF,
    KEY_COUNT,
    PROPERTIES,
    PROP_COUNT,
    PROP_DATA_PATH,
    TYPE,
    TYPE_OBJECT,
} from '../misc/constants';
import { TypeReflect } from '../util/type_reflect';
import { TypeAny } from './any';
import { schemaValidate } from './schema_validator';
import { ParseValuesMinMax } from './type_definition_typings';

type Macro = (p: ParseValuesMinMax, c: DataPathChecker, r: DataPathResolver) => string | undefined;

function createPropKeyCountMacro(resolveDataVarCmp: (d: string) => string): Macro {
    return function propKeyCountMacro(
        parseValues: ParseValuesMinMax,
        checkDataPath: DataPathChecker,
        resolveDataPath: DataPathResolver,
    ): string | undefined {
        const { schemaValue, variableName, schemaPath } = parseValues;
        const dataVar = resolveDataVarCmp(variableName);
        if (TypeReflect.number(schemaValue))
            return `${CodeGenerator.renderIfStatement([
                {
                    value: schemaValue.toString(),
                    variableName: dataVar,
                    operator: ComparisonOperator.NotEqualStrict,
                },
            ])}\n${CodeGenerator.renderReturnObject(
                `Data should have exactly ${schemaValue} keys.`,
                schemaPath,
            )}`;

        if (checkDataPath(schemaValue)) {
            const varName = resolveDataPath(schemaValue);
            return `${CodeGenerator.renderIfStatement([
                {
                    value: varName,
                    variableName: dataVar,
                    operator: ComparisonOperator.NotEqualStrict,
                },
            ])}\n${CodeGenerator.renderReturnObject(
                `Data should have exactly \${${varName}} ${CodeGenerator.renderDataPath(
                    schemaValue[PROP_DATA_PATH],
                )} keys.`,
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
                `Data should have number of keys in range ${minVal}..${maxVal}.`,
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
                `Data should have more than ${minVal} keys.`,
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
                `Data should have less than ${maxVal} keys.`,
                schemaPath,
            )}`;
        }
    };
}

export const TypeObject = new TypeInstance(TYPE_OBJECT)
    .derive(TypeAny)
    .setKeyword(TYPE, {
        validator(_schemaValue: string, $DATA: unknown): ValidationResult {
            if (!($DATA && typeof $DATA === 'object' && !Array.isArray($DATA)))
                return {
                    message: 'Data should be {{schemaValue}} type.',
                    path: '{{schemaPath}}',
                };
        },
        schemaValidator: schemaValidate.primitive(TYPE_OBJECT, TYPE, 'string'),
    })
    .setKeyword(CONSTRUCTOR_NAME, {
        validator(schemaValue: string, $DATA: object): ValidationResult {
            if (Object.getPrototypeOf($DATA).constructor.name !== schemaValue)
                return {
                    message: 'Data should be direct instance of {{schemaValue}}.',
                    path: '{{schemaPath}}',
                };
        },
        schemaValidator: schemaValidate.primitive(TYPE_OBJECT, CONSTRUCTOR_NAME, 'string'),
    })
    .setKeyword(INSTANCE_OF, {
        validator(schemaValue: () => void, $DATA: object): ValidationResult {
            if (!($DATA instanceof schemaValue))
                return {
                    message: 'Data should be instance of {{schemaValue.name}}.',
                    path: '{{schemaPath}}',
                };
        },
        schemaValidator: schemaValidate.isInstance(TYPE_OBJECT, INSTANCE_OF, Function),
    })
    .setKeyword(PROPERTIES, {
        validator(schemaValue: (string | number | symbol)[], $DATA: object): ValidationResult {
            for (const key of schemaValue)
                if (!$DATA.hasOwnProperty(key))
                    return {
                        message: `Data should have ${key.toString()} property.`,
                        path: '{{schemaPath}}',
                    };
        },
        schemaValidator: schemaValidate.arrayOfPropertyNames(TYPE_OBJECT, PROPERTIES),
    })
    .setKeyword(KEY_COUNT, {
        validator: createPropKeyCountMacro((d): string => `Object.keys(${d}).length`),
        kind: KeywordValidationFunctionKind.Macro,
        schemaValidator: schemaValidate.minMaxOrNumber(TYPE_OBJECT, KEY_COUNT, true),
    })
    .setKeyword(PROP_COUNT, {
        validator: createPropKeyCountMacro(
            (d): string =>
                `(Object.getOwnPropertyNames(${d}).length + Object.getOwnPropertySymbols(${d}).length)`,
        ),
        kind: KeywordValidationFunctionKind.Macro,
        schemaValidator: schemaValidate.minMaxOrNumber(TYPE_OBJECT, PROP_COUNT, true),
    });
