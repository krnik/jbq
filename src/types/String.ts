import { LEN, ONE_OF, PROP_DATA_PATH, REGEX, SYM_METHOD_MACRO, SYM_TYPE_VALIDATE, TYPE, TYPE_NAME } from '../constants';
import { CodeBuilder } from '../core/Code';
import { DataPathChecker, DataPathResolver, IParseValuesMinMax } from '../typings';
import { is } from '../utils/type';
import { schemaValidate } from './schemaValidate';

export const TypeString = {
    [TYPE] (_schemaValue: string, $DATA: any): string | void {
        if (typeof $DATA !== 'string')
            return `{"message": "Data should be a {{schemaValue}} type. Got ${typeof $DATA}.", "path": "{{schemaPath}}"}`;
    },
    [REGEX] (schemaValue: RegExp, $DATA: any): string | void {
        if (!schemaValue.test($DATA))
            return `{"message": "Data expected to pass {{schemaValue.toString()}} test.", "path": "{{schemaPath}}"}`;
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
                {
                    schemaPath,
                    dataVariable: dataVar,
                    message: `Data length should be equal to ${schemaValue}.`,
                },
            );
        if (checkDataPath(schemaValue)) {
            const varName = resolveDataPath(schemaValue);
            return CodeBuilder.createIfReturn(
                [{ cmp: '!==', val: varName }],
                {
                    schemaPath,
                    dataVariable: dataVar,
                    message: `Data length should be equal to \${${varName}} ${
                        CodeBuilder.parsePath(schemaValue[PROP_DATA_PATH])
                    }.`,
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
                    message: `Data length should be in range ${minVal}..${maxVal}.`,
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
                    message: `Data length should be greater than ${minVal}.`,
                },
            );
        }
        if ('max' in schemaMinMax) {
            const [maxVal, max] = valOrResolve(schemaMinMax.max);
            return CodeBuilder.createIfReturn(
                [{ cmp: '>', val: max }],
                {
                    schemaPath,
                    dataVariable: dataVar,
                    message: `Data length should be smaller than ${maxVal}.`,
                },
            );
        }
    },

    [ONE_OF] (schemaValue: string[], $DATA: any): string | void {
        if (!schemaValue.includes($DATA))
            return `{"message": "Data expected to be one of [{{schemaValue.toString()}}].", "path": "{{schemaPath}}"}`;
    },
    [SYM_TYPE_VALIDATE]: {
        [TYPE]: schemaValidate.primitive(TYPE_NAME.STRING, TYPE, 'string'),
        [REGEX]: schemaValidate.isInstance(TYPE_NAME.STRING, REGEX, 'RegExp'),
        [LEN]: schemaValidate.minMaxOrNumber(TYPE_NAME.STRING, LEN, true),
        [ONE_OF]: schemaValidate.arrayOf(TYPE_NAME.STRING, ONE_OF, 'string'),
    },
};

Object.defineProperty(TypeString[LEN], SYM_METHOD_MACRO, { value: true });
