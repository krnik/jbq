import { TYPE_METHOD } from '../constants';
import { E, isType } from '../utils/index';
const { VALIDATE, REGEX, MIN_LEN, MAX_LEN, LEN, PARSE } = TYPE_METHOD;

const TypeString = {
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
    [VALIDATE]: {
        [MIN_LEN] (value: any) {
            if (!isType.number(value)) E.validateNotNumberError(MIN_LEN, typeof(value));
        },
        [MAX_LEN] (value: any) {
            if (!isType.number(value)) E.validateNotNumberError(MAX_LEN, typeof(value));
        },
        [REGEX] (value: any) {
            if (!isType.objectInstance(value, 'RegExp'))
                E.validateMatchError(REGEX, typeof(value));
        },
        [LEN] (value: any) {
            if (!isType.number(value)) E.validateNotNumberError(LEN, typeof(value));
        },
    },
    [PARSE]: {
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

export default TypeString;
