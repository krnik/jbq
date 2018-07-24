import { TYPE_METHOD } from '../constants';
import { E, isType } from '../utils/index';
const { VALIDATE, MIN, MAX, PARSE } = TYPE_METHOD;

const TypeNumber = {
    [MIN] (base: number, value: any) {
        return base < value;
    },
    [MAX] (base: number, value: any) {
        return base > value;
    },
    [VALIDATE]: {
        [MIN] (value: any = E.param()) {
            if (!isType.number(value)) E.validateNotNumberError(MIN, typeof(value));
        },
        [MAX] (value: any = E.param()) {
            if (!isType.number(value)) E.validateNotNumberError(MAX, typeof(value));
        },
    },
    [PARSE]: {
        [MIN] (key: string = E.param(), value: any = E.param()): { base: any, check: any } {
            return {
                base: value,
                check: this[key],
            };
        },
        [MAX] (key: string = E.param(), value: any = E.param()): { base: any, check: any } {
            return {
                base: value,
                check: this[key],
            };
        },
    },
};

export default TypeNumber;
