import { MAX, MIN, SYM_TYPE_VALIDATE, TYPE } from '../constants';
import { E, is } from '../utils/index';

export const TypeNumber = {
    // @ts-ignore
    [TYPE] (schemaValue: string, data: any) {
        if (typeof data !== 'number' || isNaN(data))
            return `Data should be a number (NaN excluded) type. Got ${typeof data}.`;
    },
    [MIN] (schemaValue: number, data: any) {
        if (schemaValue > data)
            return `Data expected to be equal to at least #{schemaValue}. Got ${data}.`;
    },
    [MAX] (schemaValue: number, data: any) {
        if (schemaValue < data)
            return `Data expected to be equal to at most #{schemaValue}. Got ${data}.`;
    },
    [SYM_TYPE_VALIDATE]: {
        [TYPE] (schemaValue: any = E.invalidArgument('schemaValue')) {
            if (!is.string(schemaValue))
                E.invalidSchemaPropType(TYPE, 'string', typeof schemaValue);
        },
        [MIN] (schemaValue: any = E.invalidArgument('schemaValue')) {
            if (!is.number(schemaValue))
                E.invalidSchemaPropType(MIN, 'number', typeof schemaValue);
        },
        [MAX] (schemaValue: any = E.invalidArgument('schemaValue')) {
            if (!is.number(schemaValue))
                E.invalidSchemaPropType(MAX, 'number', typeof schemaValue);
        },
    },
};
