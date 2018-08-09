import { MAX, MIN, SYM_TYPE_VALIDATE, TYPE } from '../constants';
import { E, isType } from '../utils/index';

export const TypeNumber = {
    [TYPE] (base: string, value: any) {
        if (!(typeof value === 'number' && value !== Object(value) && value === value))
            return `Value should be ${base} (NaN excluded) type. Got ${typeof value}.`;
    },
    [MIN] (base: number, value: any) {
        if (base > value) return `Value expected to be equal to at least ${base}. Got ${value}.`;
    },
    [MAX] (base: number, value: any) {
        if (base < value) return `Value expected to be equal to at most ${base}. Got ${value}.`;
    },
    [SYM_TYPE_VALIDATE]: {
        [TYPE] (value: any = E.param()) {
            if (!isType.string(value)) E.typeValidateError(TYPE, 'string primitive', typeof value);
        },
        [MIN] (value: any = E.param()) {
            if (!isType.number(value))
                E.typeValidateError(MIN, 'number primitive', typeof(value));
        },
        [MAX] (value: any = E.param()) {
            if (!isType.number(value))
                E.typeValidateError(MAX, 'number primitive', typeof(value));
        },
    },
};
