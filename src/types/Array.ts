import { EVERY, INCLUDES, LEN, MAX_LEN, MIN_LEN, SOME, SYM_TYPE_VALIDATE, TYPE } from '../constants';
import { E, isType } from '../utils/index';

type arrMethodCallback = (elem: any, index: number, arr: any[], thisArg?: any) => boolean;
export const TypeArray = {
    [TYPE] (base: string, value: any) {
        if (!Array.isArray(value)) return `Value should be ${base} type.`;
    },
    [EVERY] (base: arrMethodCallback, value: any[]) {
        if (!value.every(base)) return `Every element of value should pass test of ${base}.`;
    },
    [SOME] (base: arrMethodCallback, value: any[]) {
        if (!value.some(base)) return `At least one element of value should pass test of ${base}.`;
    },
    [INCLUDES] (base: any, value: any[]) {
        if (!value.includes(base)) return `Value should include ${base}.`;
    },
    [MIN_LEN] (base: number, value: any[]) {
        if (value.length < base) return `Value should have length greater or equal than ${base}. Got ${value.length}.`;
    },
    [MAX_LEN] (base: number, value: any[]) {
        if (value.length > base) return `Value should have length less or equal to ${base}. Got ${value.length}.`;
    },
    [LEN] (base: number, value: any[]) {
        if (value.length !== base) return `Value should have length equal to ${base}. Got ${value.length}.`;
    },
    [SYM_TYPE_VALIDATE]: {
        [TYPE] (value: any = E.param()) {
            if (!isType.string(value)) E.typeValidateError(TYPE, 'string primitive', typeof value);
        },
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
