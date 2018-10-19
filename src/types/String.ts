import { LEN, MAX_LEN, MIN_LEN, REGEX, SYM_TYPE_VALIDATE, TYPE } from '../constants';
import { E, is } from '../utils/index';

export const TypeString = {
    [TYPE] (base: string, data: any) {
        if (typeof data !== 'string')
            return `Data should be ${base} type. Got ${typeof data}.`;
    },
    [MIN_LEN] (base: number, data: any) {
        if (data.length < base)
            return `Data expected to have length greater or equal than ${base}. Got ${data.length}.`;
    },
    [MAX_LEN] (base: number, data: any) {
        if (data.length > base)
            return `Data expected to have length less or equal than ${base} chars. Got ${data.length}.`;
    },
    [REGEX] (base: RegExp, data: any) {
        if (!base.test(data))
            return `Data expected to pass #{base.toString()} test.`;
    },
    [LEN] (base: number, data: any) {
        if (data.length !== base)
            return `Data expected to have length equal to ${base}. Got ${data.length}.`;
    },
    [SYM_TYPE_VALIDATE]: {
        [TYPE] (value: any = E.invalidArgument('value')) {
            if (!is.string(value))
                E.invalidSchemaPropType(TYPE, 'string', typeof value);
        },
        [MIN_LEN] (value: any = E.invalidArgument('value')) {
            if (!is.number(value))
                E.invalidSchemaPropType(MIN_LEN, 'number', typeof value);
        },
        [MAX_LEN] (value: any = E.invalidArgument('value')) {
            if (!is.number(value))
                E.invalidSchemaPropType(MAX_LEN, 'number', typeof value);
        },
        [REGEX] (value: any = E.invalidArgument('value')) {
            if (!is.objectInstance(value, 'RegExp'))
                E.invalidSchemaPropType(REGEX, 'RegExp', typeof value);
        },
        [LEN] (value: any = E.invalidArgument('value')) {
            if (!is.number(value))
                E.invalidSchemaPropType(LEN, 'number', typeof value);
        },
    },
};
