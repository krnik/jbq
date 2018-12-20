import { CONSTRUCTOR_NAME, INSTANCE_OF, KEY_COUNT, PROPERTIES, PROP_COUNT, PROP_DATA_PATH, SYM_METHOD_MACRO, SYM_TYPE_VALIDATE, TYPE, TYPE_NAME } from '../constants';
import { CodeBuilder } from '../core/Code';
import { DataPathChecker, DataPathResolver, IDataPathSchemaValue, IParseValuesMinMax } from '../typings';
import { is } from '../utils/type';
import { schemaValidate } from './schemaValidate';

function createPropKeyCountMacro (resolveDataVarCmp: (d: string) => string) {
    return function propKeyCountMacro (
        parseValues: IParseValuesMinMax,
        checkDataPath: DataPathChecker,
        resolveDataPath: DataPathResolver,
    ): string | undefined {
        const { schemaValue, dataVariable, schemaPath } = parseValues;
        const dataVar = resolveDataVarCmp(dataVariable);
        if (is.number(schemaValue))
            return CodeBuilder.createIfReturn(
                [{ cmp: '!==', val: schemaValue.toString() }],
                {
                    schemaPath,
                    dataVariable: dataVar,
                    message: `Data should have exactly ${schemaValue} keys.`,
                },
            );
        if (checkDataPath(schemaValue)) {
            const sch = schemaValue as IDataPathSchemaValue;
            const varName = resolveDataPath(sch);
            return CodeBuilder.createIfReturn(
                [{ cmp: '!==', val: varName }],
                {
                    schemaPath,
                    dataVariable: dataVar,
                    message: `Data should have exactly \${${varName}} ${CodeBuilder.parsePath(sch[PROP_DATA_PATH])} keys.`,
                },
            );
        }
        const schemaMinMax = schemaValue as Exclude<IParseValuesMinMax['schemaValue'], number>;
        const valOrResolve = (value: any) => {
            if (!checkDataPath(value)) return [`${value}`, value];
            const varName = resolveDataPath(value);
            return [`\${${varName}}`, varName];
        };
        if ('min' in schemaMinMax && 'max' in schemaMinMax) {
            const [minVal, min] = valOrResolve(schemaMinMax.min);
            const [maxVal, max] = valOrResolve(schemaMinMax.max);
            return CodeBuilder.createIfReturn(
                [{ cmp: '<', val: min }, { cmp: '>', val: max }],
                {
                    schemaPath,
                    dataVariable: dataVar,
                    message: `Data should have number of keys in range ${minVal}..${maxVal}.`,
                },
            );
        }
        if ('min' in schemaMinMax) {
            const [minVal, min] = valOrResolve(schemaMinMax.min);
            return CodeBuilder.createIfReturn(
                [{ cmp: '<', val: min }],
                {
                    schemaPath,
                    dataVariable: dataVar,
                    message: `Data should have more than ${minVal} keys.`,
                },
            );
        }
        if ('max' in schemaMinMax) {
            const [maxVal, max] = valOrResolve(schemaMinMax.max);
            return CodeBuilder.createIfReturn(
                [{ cmp: '>', val: max }],
                {
                    join: ' || ',
                    schemaPath,
                    dataVariable: dataVar,
                    message: `Data should have less than ${maxVal} keys.`,
                },
            );
        }
    };
}

export const TypeObject = {
    [TYPE] (_schemaValue: string, $DATA: any): string | void {
        if (!($DATA && typeof $DATA === 'object' && !Array.isArray($DATA)))
            return `{"message": "Data should be {{schemaValue}} type. Got ${typeof $DATA}.", "path": "{{schemaPath}}"}`;
    },
    [CONSTRUCTOR_NAME] (schemaValue: string, $DATA: any): string | void {
        if (Object.getPrototypeOf($DATA).constructor.name !== schemaValue)
            return `{"message": "Data should be direct instance of {{schemaValue}}.", "path": "{{schemaPath}}"}`;
    },
    [INSTANCE_OF] (schemaValue: () => void, $DATA: any): string | void {
        if (!($DATA instanceof schemaValue))
            return `{"message": "Data should be instance of {{schemaValue.name}}.", "path": "{{schemaPath}}"}`;
    },
    [PROPERTIES] (schemaValue: Array<(string | number | symbol)>, $DATA: any): string | void {
        for (const key of schemaValue)
            if (!$DATA.hasOwnProperty(key))
                return `{"message": "Data should have ${key.toString()} property.", "path": "{{schemaPath}}"}`;
    },
    [KEY_COUNT]: createPropKeyCountMacro((d) => `Object.keys(${d}).length`),
    [PROP_COUNT]: createPropKeyCountMacro((d) =>
        `(Object.getOwnPropertyNames(${d}).length + Object.getOwnPropertySymbols(${d}).length)`),
    [SYM_TYPE_VALIDATE]: {
        [TYPE]: schemaValidate.primitive(TYPE_NAME.OBJECT, TYPE, 'string'),
        [CONSTRUCTOR_NAME]: schemaValidate.primitive(TYPE_NAME.OBJECT, CONSTRUCTOR_NAME, 'string'),
        [INSTANCE_OF]: schemaValidate.isInstance(TYPE_NAME.OBJECT, INSTANCE_OF, 'Function'),
        [PROPERTIES]: schemaValidate.arrayOfPropertyNames(TYPE_NAME.OBJECT, PROPERTIES),
        [KEY_COUNT]: schemaValidate.minMaxOrNumber(TYPE_NAME.OBJECT, KEY_COUNT, true),
        [PROP_COUNT]: schemaValidate.minMaxOrNumber(TYPE_NAME.OBJECT, PROP_COUNT, true),
    },
};

Object.defineProperty(TypeObject[KEY_COUNT], SYM_METHOD_MACRO, { value: true });
Object.defineProperty(TypeObject[PROP_COUNT], SYM_METHOD_MACRO, { value: true });
