import { EVERY, ITypePrototype, SOME, SYM_TYPE_PARSE, SYM_TYPE_VALIDATE, INCLUDES, MIN_LEN, MAX_LEN, LEN } from '../constants';
import { E, isType } from '../utils/index';

type arrMethodCallback = (elem: any, index: number, arr: any[], thisArg?: any) => boolean;
export const TypeArray: ITypePrototype = {
    [EVERY] (base: arrMethodCallback, value: any[]): boolean {
        return value.every(base);
    },
    [SOME] (base: arrMethodCallback, value: any[]): boolean {
        return value.some(base);
    },
    [INCLUDES] (base: any, value: any[]) {
        return value.includes(base);
    },
    [MIN_LEN] (base: number, value: any[]) {
        return value.length >= base;
    },
    [MAX_LEN] (base: number, value: any[]) {
        return value.length <= base;
    },
    [LEN] (base: number, value: any[]) {
        return value.length === base;
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
    },
};
