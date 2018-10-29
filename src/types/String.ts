import { LEN, MAX_LEN, MIN_LEN, REGEX, SYM_TYPE_VALIDATE, TYPE } from '../constants';
import { E, is } from '../utils/index';

export const TypeString = {
    [TYPE] (_schemaValue: string, data: any) {
        if (typeof data !== 'string')
            return `Data should be #{schemaValue} type. Got ${typeof data}.`;
    },
    [MIN_LEN] (schemaValue: number, data: any) {
        if (data.length < schemaValue)
            return `Data expected to have length greater or equal than #{schemaValue}. Got ${data.length}.`;
    },
    [MAX_LEN] (schemaValue: number, data: any) {
        if (data.length > schemaValue)
            return `Data expected to have length less or equal than #{schemaValue} chars. Got ${data.length}.`;
    },
    [REGEX] (schemaValue: RegExp, data: any) {
        if (!schemaValue.test(data))
            return `Data expected to pass #{schemaValue.toString()} test.`;
    },
    [LEN] (schemaValue: number, data: any) {
        if (data.length !== schemaValue)
            return `Data expected to have length equal to #{schemaValue}. Got ${data.length}.`;
    },
    [SYM_TYPE_VALIDATE]: {
        [TYPE] (schemaValue: any = E.invalidArgument('schemaValue')) {
            if (!is.string(schemaValue))
                throw E.invalidSchemaPropType(TYPE, 'string', typeof schemaValue);
        },
        [MIN_LEN] (schemaValue: any = E.invalidArgument('schemaValue')) {
            if (!is.number(schemaValue))
                throw E.invalidSchemaPropType(MIN_LEN, 'number', typeof schemaValue);
        },
        [MAX_LEN] (schemaValue: any = E.invalidArgument('schemaValue')) {
            if (!is.number(schemaValue))
                throw E.invalidSchemaPropType(MAX_LEN, 'number', typeof schemaValue);
        },
        [REGEX] (schemaValue: any = E.invalidArgument('schemaValue')) {
            if (!is.objectInstance(schemaValue, 'RegExp'))
                throw E.invalidSchemaPropType(REGEX, 'RegExp', typeof schemaValue);
        },
        [LEN] (schemaValue: any = E.invalidArgument('schemaValue')) {
            if (!is.number(schemaValue))
                throw E.invalidSchemaPropType(LEN, 'number', typeof schemaValue);
        },
    },
};
