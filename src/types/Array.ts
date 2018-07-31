import { EVERY, INCLUDES, LEN, MAX_LEN, MIN_LEN, SOME, SYM_TYPE_VALIDATE } from '../constants';
import { E, isType } from '../utils/index';

type arrMethodCallback = (elem: any, index: number, arr: any[], thisArg?: any) => boolean;
export const TypeArray = {
    [EVERY] (base: arrMethodCallback, value: any[]) {
        if (!value.every(base)) throw { base, value };
    },
    [SOME] (base: arrMethodCallback, value: any[]) {
        if (!value.some(base)) throw { base, value };
    },
    [INCLUDES] (base: any, value: any[]) {
        if (!value.includes(base)) throw { base, value };
    },
    [MIN_LEN] (base: number, value: any[]) {
        if (value.length < base) throw { base, value };
    },
    [MAX_LEN] (base: number, value: any[]) {
        if (value.length > base) throw { base, value };
    },
    [LEN] (base: number, value: any[]) {
        if (value.length !== base) throw { base, value };
    },
    [SYM_TYPE_VALIDATE]: {
        [EVERY] (value: any = E.param()) {
            if (!isType.objectInstance(value, 'Function'))
                E.typeValidateError(EVERY, 'Function', typeof(value));
        },
        [SOME] (value: any = E.param()) {
            if (!isType.objectInstance(value, 'Function'))
                E.typeValidateError(SOME, 'Function', typeof(value));
        },
        [INCLUDES] (value: any = E.param()) {
            if (value === null) E.typeValidateError(INCLUDES, 'non-null value', typeof(value));
        },
        [MIN_LEN] (value: any = E.param()) {
            if (!isType.number(value))
                E.typeValidateError(MIN_LEN, 'number primitive', typeof(value));
        },
        [MAX_LEN] (value: any = E.param()) {
            if (!isType.number(value))
                E.typeValidateError(MAX_LEN, 'number primitive', typeof(value));
        },
        [LEN] (value: any = E.param()) {
            if (!isType.number(value))
                E.typeValidateError(LEN, 'number primitive', typeof(value));
        },
    },
};
