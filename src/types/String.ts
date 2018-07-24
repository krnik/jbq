import { ITypePrototype, LEN, MAX_LEN, MIN_LEN, REGEX, SYM_TYPE_PARSE, SYM_TYPE_VALIDATE } from '../constants';
import { E, isType } from '../utils/index';

export const TypeString: ITypePrototype = {
    [MIN_LEN] (base: number, value: any) {
        return value.length > base;
    },
    [MAX_LEN] (base: number, value: any) {
        return value.length < base;
    },
    [REGEX] (base: RegExp, value: any) {
        return base.test(value);
    },
    [LEN] (base: number, value: any) {
        return value.length === base;
    },
    [SYM_TYPE_VALIDATE]: {
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
    [SYM_TYPE_PARSE]: {
        [MIN_LEN] (key: string, value: any): { base: any, check: any } {
            return {
                base: value,
                check: this[key],
            };
        },
        [MAX_LEN] (key: string, value: any): { base: any, check: any } {
            return {
                base: value,
                check: this[key],
            };
        },
        [REGEX] (key: string, value: any): { base: any, check: any } {
            return {
                base: value,
                check: this[key],
            };
        },
        [LEN] (key: string, value: any): { base: any, check: any } {
            return {
                base: value,
                check: this[key],
            };
        },
    },
};
