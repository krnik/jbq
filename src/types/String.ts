import { LEN, MAX_LEN, MIN_LEN, REGEX, SYM_TYPE_VALIDATE, TYPE } from '../constants';
import { E, isType } from '../utils/index';

export const TypeString = {
    [TYPE] (base: string, value: any) {
        if (!(typeof value === 'string' && value !== Object(value)))
            return `Value should be ${base} type. Got ${typeof value}.`;
    },
    [MIN_LEN] (base: number, value: any) {
        if (value.length < base)
            return `Value expected to have length greater or equal than ${base}. Got ${value.length}.`;
    },
    [MAX_LEN] (base: number, value: any) {
        if (value.length > base)
            return `Value expected to have length less or equal than ${base} chars. Got ${value.length}.`;
    },
    [REGEX] (base: RegExp, value: any) {
        if (!base.test(value)) return `Value expected to pass ${base.toString()} test.`;
    },
    [LEN] (base: number, value: any) {
        if (value.length !== base) return `Value expected to have length equal to ${base}. Got ${value.length}.`;
    },
    [SYM_TYPE_VALIDATE]: {
        [TYPE] (value: any = E.param()) {
            if (!isType.string(value)) E.typeValidateError(TYPE, 'string primitive', typeof value);
        },
        [MIN_LEN] (value: any) {
            if (!isType.number(value))
                E.typeValidateError(MIN_LEN, 'number primitive', typeof(value));
        },
        [MAX_LEN] (value: any) {
            if (!isType.number(value))
                E.typeValidateError(MAX_LEN, 'number primitive', typeof(value));
        },
        [REGEX] (value: any) {
            if (!isType.objectInstance(value, 'RegExp'))
                E.typeValidateError(REGEX, 'RegExp', typeof(value));
        },
        [LEN] (value: any) {
            if (!isType.number(value))
                E.typeValidateError(LEN, 'number primitive', typeof(value));
        },
    },
};
