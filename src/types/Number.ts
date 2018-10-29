import { MAX, MIN, MULTIPLY_OF, SYM_TYPE_VALIDATE, TYPE } from '../constants';
import { E, is } from '../utils/index';

export const TypeNumber = {
    [TYPE] (_schemaValue: string, data: any) {
        if (typeof data !== 'number' || data !== data)
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
    [MULTIPLY_OF] (schemaValue: number, data: any) {
        if (data % schemaValue)
            return `Data expected to be multiply of #{schemaValue}.`;
    },
    [SYM_TYPE_VALIDATE]: {
        [TYPE] (schemaValue: any = E.invalidArgument('schemaValue')) {
            if (!is.string(schemaValue))
                throw E.invalidSchemaPropType(TYPE, 'string', typeof schemaValue);
        },
        [MIN] (schemaValue: any = E.invalidArgument('schemaValue')) {
            if (!is.number(schemaValue))
                throw E.invalidSchemaPropType(MIN, 'number', typeof schemaValue);
        },
        [MAX] (schemaValue: any = E.invalidArgument('schemaValue')) {
            if (!is.number(schemaValue))
                throw E.invalidSchemaPropType(MAX, 'number', typeof schemaValue);
        },
        [MULTIPLY_OF] (schemaValue: any = E.invalidArgument('schemaValue')) {
            if (!is.number(schemaValue))
                throw E.invalidSchemaPropType(MULTIPLY_OF, 'number', typeof schemaValue);
        },
    },
};
