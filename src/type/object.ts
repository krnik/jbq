import {
    CONSTRUCTOR_NAME,
    INSTANCE_OF,
    KEY_COUNT,
    PROP_COUNT,
    PROP_DATA_PATH,
    PROPERTIES,
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
            ])}\n${CodeGenerator.renderReturnJSONMessage(
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
            ])}\n${CodeGenerator.renderReturnJSONMessage(
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
            ])}\n${CodeGenerator.renderReturnJSONMessage(
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
            ])}\n${CodeGenerator.renderReturnJSONMessage(
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
            ])}\n${CodeGenerator.renderReturnJSONMessage(
                `Data should have less than ${maxVal} keys.`,
                schemaPath,
            )}`;
        }
    };
}

export const TypeObject = {
    [TYPE](_schemaValue: string, $DATA: unknown): string | void {
        if (!($DATA && typeof $DATA === 'object' && !Array.isArray($DATA)))
            return `{"message": "Data should be {{schemaValue}} type. Got ${typeof $DATA}.", "path": "{{schemaPath}}"}`;
    },
    [CONSTRUCTOR_NAME](schemaValue: string, $DATA: object): string | void {
        if (Object.getPrototypeOf($DATA).constructor.name !== schemaValue)
            return `{"message": "Data should be direct instance of {{schemaValue}}.", "path": "{{schemaPath}}"}`;
    },
    [INSTANCE_OF](schemaValue: () => void, $DATA: object): string | void {
        if (!($DATA instanceof schemaValue))
            return `{"message": "Data should be instance of {{schemaValue.name}}.", "path": "{{schemaPath}}"}`;
    },
    [PROPERTIES](schemaValue: (string | number | symbol)[], $DATA: object): string | void {
        for (const key of schemaValue)
            if (!$DATA.hasOwnProperty(key))
                return `{"message": "Data should have ${key.toString()} property.", "path": "{{schemaPath}}"}`;
    },
    [KEY_COUNT]: createPropKeyCountMacro((d): string => `Object.keys(${d}).length`),
    [PROP_COUNT]: createPropKeyCountMacro(
        (d): string =>
            `(Object.getOwnPropertyNames(${d}).length + Object.getOwnPropertySymbols(${d}).length)`,
    ),
    [SYM_TYPE_VALIDATE]: {
        [TYPE]: schemaValidate.primitive(TYPE_NAME.OBJECT, TYPE, 'string'),
        [CONSTRUCTOR_NAME]: schemaValidate.primitive(TYPE_NAME.OBJECT, CONSTRUCTOR_NAME, 'string'),
        [INSTANCE_OF]: schemaValidate.isInstance(TYPE_NAME.OBJECT, INSTANCE_OF, Function),
        [PROPERTIES]: schemaValidate.arrayOfPropertyNames(TYPE_NAME.OBJECT, PROPERTIES),
        [KEY_COUNT]: schemaValidate.minMaxOrNumber(TYPE_NAME.OBJECT, KEY_COUNT, true),
        [PROP_COUNT]: schemaValidate.minMaxOrNumber(TYPE_NAME.OBJECT, PROP_COUNT, true),
    },
};

Object.defineProperty(TypeObject[KEY_COUNT], SYM_METHOD_MACRO, { value: true });
Object.defineProperty(TypeObject[PROP_COUNT], SYM_METHOD_MACRO, { value: true });
