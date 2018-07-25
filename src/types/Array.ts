import { EVERY, INCLUDES, ITypePrototype, LEN, MAX_LEN, MIN_LEN, SOME, SYM_TYPE_PARSE, SYM_TYPE_VALIDATE } from '../constants';
import { E, isType } from '../utils/index';

type arrMethodCallback = (elem: any, index: number, arr: any[], thisArg?: any) => boolean;
export const TypeArray: ITypePrototype = {
    [EVERY] (base: arrMethodCallback, value: any[]) {
        if (!value.every(base)) throw { args: { base, value }, msg: E.msg.validationError(EVERY) };
    },
    [SOME] (base: arrMethodCallback, value: any[]) {
        if (!value.some(base)) throw { args: { base, value }, msg: E.msg.validationError(SOME) };
    },
    [INCLUDES] (base: any, value: any[]) {
        if (!value.includes(base)) throw { args: { base, value }, msg: E.msg.validationError(INCLUDES) };
    },
    [MIN_LEN] (base: number, value: any[]) {
        if (value.length < base) throw { args: { base, value }, msg: E.msg.validationError(MIN_LEN) };
    },
    [MAX_LEN] (base: number, value: any[]) {
        if (value.length > base) throw { args: { base, value }, msg: E.msg.validationError(MAX_LEN) };
    },
    [LEN] (base: number, value: any[]) {
        if (value.length !== base) throw { args: { base, value }, msg: E.msg.validationError(LEN) };
    },
    [SYM_TYPE_PARSE]: {
        [EVERY] (key: string, base: any): { base: any, check: any } {
            return {
                base,
                check: this[key],
            };
        },
        [SOME] (key: string, base: any): { base: any, check: any } {
            return {
                base,
                check: this[key],
            };
        },
        [INCLUDES] (key: string, base: any): { base: any, check: any } {
            return {
                base,
                check: this[key],
            };
        },
        [MIN_LEN] (key: string, base: any): { base: any, check: any } {
            return {
                base,
                check: this[key],
            };
        },
        [MAX_LEN] (key: string, base: any): { base: any, check: any } {
            return {
                base,
                check: this[key],
            };
        },
        [LEN] (key: string, base: any): { base: any, check: any } {
            return {
                base,
                check: this[key],
            };
        },
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
