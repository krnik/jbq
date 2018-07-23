import { TYPE_METHOD } from '../constants';
import { E, isType } from '../utils/index';
const { VALIDATE, MATCH, MIN_LEN, MAX_LEN, LEN, PARSE } = TYPE_METHOD;

const TypeString = {
    [MIN_LEN] (base: number, value: any) {},
    [MAX_LEN] (base: number, value: any) {},
    [MATCH] (base: RegExp, value: any) {},
    [LEN] (base: number, value: any) {},
    [VALIDATE]: {
        [MIN_LEN] (value: any) {
            if (!isType.number(value)) E.validateNotNumberError(MIN_LEN, typeof(value));
        },
        [MAX_LEN] (value: any) {
            if (!isType.number(value)) E.validateNotNumberError(MAX_LEN, typeof(value));
        },
        [MATCH] (value: any) {
            if (!isType.objectInstance(value, 'RegExp'))
                E.validateMatchError(MATCH, typeof(value));
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
        [MATCH] (key: string, value: any): { base: any, check: any } {
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
