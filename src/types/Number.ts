import { MULTIPLE_OF, ONE_OF, PROP_DATA_PATH, SYM_METHOD_MACRO, SYM_TYPE_VALIDATE, TYPE, TYPE_NAME, VALUE } from '../constants';
import { CodeBuilder } from '../core/Code';
import { DataPathChecker, DataPathResolver, IDataPathSchemaValue, IParseValuesMinMax } from '../typings';
import { is } from '../utils/type';
import { schemaValidate } from './schemaValidate';

export const TypeNumber = {
    [TYPE] (_schemaValue: string, $DATA: any): string | void {
        if (typeof $DATA !== 'number' || $DATA !== $DATA)
            return `{"message": "Data should be a number (NaN excluded) type. Got ${typeof $DATA}.", "path": "{{schemaPath}}"}`;
    },
    [VALUE] (
        parseValues: IParseValuesMinMax,
        checkDataPath: DataPathChecker,
        resolveDataPath: DataPathResolver,
    ) {
        const { schemaValue, schemaPath, dataVariable } = parseValues;
        if (is.number(schemaValue))
            return CodeBuilder.createIf(
                [{ cmp: '!==', val: schemaValue.toString() }],
                schemaPath,
                dataVariable,
                `Data should be equal to ${schemaValue}.`,
            );
        if (checkDataPath(schemaValue)) {
            const sch = schemaValue as IDataPathSchemaValue;
            const varName = resolveDataPath(sch);
            return CodeBuilder.createIf(
                [{ cmp: '!==', val: varName }],
                schemaPath,
                dataVariable,
                `Data should be equal to \${${varName}} ${CodeBuilder.parsePath(sch[PROP_DATA_PATH])}.`,
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
            return CodeBuilder.createIf(
                [{ cmp: '<', val: min }, { cmp: '>', val: max }],
                schemaPath,
                dataVariable,
                `Data should be in range ${minVal}..${maxVal}.`,
            );
        }
        if ('min' in schemaMinMax) {
            const [minVal, min] = valOrResolve(schemaMinMax.min);
            return CodeBuilder.createIf(
                [{ cmp: '<', val: min }],
                schemaPath,
                dataVariable,
                `Data should be greater than ${minVal}.`,
            );
        }
        if ('max' in schemaMinMax) {
            const [maxVal, max] = valOrResolve(schemaMinMax.max);
            return CodeBuilder.createIf(
                [{ cmp: '>', val: max }],
                schemaPath,
                dataVariable,
                `Data should be smaller than ${maxVal}.`,
            );
        }
    },
    [MULTIPLE_OF] (schemaValue: number, $DATA: any): string | void {
        if ($DATA % schemaValue)
            return `{"message": "Data expected to be multiply of {{schemaValue}}.", "path": "{{schemaPath}}"}`;
    },
    [ONE_OF] (schemaValue: number[], $DATA: any): string | void {
        if (!schemaValue.includes($DATA))
            return `{"message": "Data should be one of {{schemaValue.toString()}}.", "path": "{{schemaPath}}"}`;
    },
    [SYM_TYPE_VALIDATE]: {
        [TYPE]: schemaValidate.primitive(TYPE_NAME.NUMBER, TYPE, 'string'),
        [VALUE]: schemaValidate.minMaxOrNumber(TYPE_NAME.NUMBER, VALUE, true),
        [MULTIPLE_OF]: schemaValidate.primitive(TYPE_NAME.NUMBER, MULTIPLE_OF, 'number', true),
        [ONE_OF]: schemaValidate.arrayOf(TYPE_NAME.NUMBER, ONE_OF, 'number'),
    },
};

Object.defineProperty(TypeNumber[VALUE], SYM_METHOD_MACRO, { value: true });
