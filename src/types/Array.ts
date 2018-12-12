import { EVERY, INCLUDES, LEN, PROP_DATA_PATH, SOME, SYM_METHOD_MACRO, SYM_TYPE_FOR_LOOP, SYM_TYPE_VALIDATE, TYPE, TYPE_NAME } from '../constants';
import { CodeBuilder } from '../core/Code';
import { DataPathChecker, DataPathResolver, IDataPathSchemaValue, IParseValuesMinMax } from '../typings';
import { is } from '../utils/type';
import { schemaValidate } from './schemaValidate';

type arrMethodCallback = (elem: any, index?: number, arr?: any[]) => boolean;
export const TypeArray = {
    [TYPE] (_schemaValue: string, $DATA: any): string | void {
        if (!Array.isArray($DATA))
            return '{"message": "Data should be a {{schemaValue}} type.", "path": "{{schemaPath}}"}';
    },
    [EVERY] (schemaValue: arrMethodCallback, $DATA: any[]): string | void {
        const len = $DATA.length;
        for (let i = 0; i < len; i++)
            if (!schemaValue($DATA[i])) return '{"message": "Every element of data should satisfy test function.", "path": "{{schemaPath}}"}';
    },
    [SOME] (schemaValue: arrMethodCallback, $DATA: any[]): string | void {
        const len = $DATA.length;
        for (let i = 0; i < len; i++) {
            if (schemaValue($DATA[i])) break;
            if (i === len - 1) return '{"message": "At least one element of data should satisfy test function.", "path": "{{schemaPath}}"}';
        }
    },
    [INCLUDES] (schemaValue: any, $DATA: any[]): string | void {
        let found = false;
        for (let i = 0; i < $DATA.length; i++)
            if ($DATA[i] === schemaValue) {
                found = true;
                break;
            }
        if (!found)
            return '{"message": "Data should include {{schemaValue}}.", "path": "{{schemaPath}}"}';
    },
    [LEN] (
        parseValues: IParseValuesMinMax,
        checkDataPath: DataPathChecker,
        resolveDataPath: DataPathResolver,
    ): string | undefined {
        const { schemaValue, dataVariable, schemaPath } = parseValues;
        const dataVar = `${dataVariable}.length`;
        if (is.number(schemaValue))
            return CodeBuilder.createIfReturn(
                [{ cmp: '!==', val: schemaValue.toString() }],
                schemaPath,
                dataVar,
                `Data length should be equal to ${schemaValue}.`,
            );
        if (checkDataPath(schemaValue)) {
            const sch = schemaValue as IDataPathSchemaValue;
            const varName = resolveDataPath(sch);
            return CodeBuilder.createIfReturn(
                [{ cmp: '!==', val: varName }],
                schemaPath,
                dataVar,
                `Data length should be equal to \${${varName}} ${CodeBuilder.parsePath(sch[PROP_DATA_PATH])}.`,
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
                schemaPath,
                dataVar,
                `Data length should be in range ${minVal}..${maxVal}.`,
            );
        }
        if ('min' in schemaMinMax) {
            const [minVal, min] = valOrResolve(schemaMinMax.min);
            return CodeBuilder.createIfReturn(
                [{ cmp: '<', val: min }],
                schemaPath,
                dataVar,
                `Data length should be greater than ${minVal}.`,
            );
        }
        if ('max' in schemaMinMax) {
            const [maxVal, max] = valOrResolve(schemaMinMax.max);
            return CodeBuilder.createIfReturn(
                [{ cmp: '>', val: max }],
                schemaPath,
                dataVar,
                `Data length should be smaller than ${maxVal}.`,
            );
        }
    },
    [SYM_TYPE_VALIDATE]: {
        [TYPE]: schemaValidate.primitive(TYPE_NAME.ARRAY, TYPE, 'string'),
        [EVERY]: schemaValidate.isInstance(TYPE_NAME.ARRAY, EVERY, 'Function'),
        [SOME]: schemaValidate.isInstance(TYPE_NAME.ARRAY, SOME, 'Function'),
        [LEN]: schemaValidate.minMaxOrNumber(TYPE_NAME.ARRAY, LEN, true),
        [INCLUDES]: schemaValidate.any(TYPE_NAME.ARRAY, INCLUDES),
    },
    [SYM_TYPE_FOR_LOOP]: true,
};

Object.defineProperty(TypeArray[LEN], SYM_METHOD_MACRO, { value: true });
