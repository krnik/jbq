import { ITypePrototype, MAX, MIN, SYM_TYPE_PARSE, SYM_TYPE_VALIDATE } from '../constants';
import { E, isType } from '../utils/index';

export const TypeNumber: ITypePrototype = {
    [MIN] (base: number, value: any) {
        return base < value;
    },
    [MAX] (base: number, value: any) {
        return base > value;
    },
    [SYM_TYPE_VALIDATE]: {
        [MIN] (value: any = E.param()) {
            if (!isType.number(value))
                E.typeValidateError(MIN, 'number primitive', typeof(value));
        },
        [MAX] (value: any = E.param()) {
            if (!isType.number(value))
                E.typeValidateError(MAX, 'number primitive', typeof(value));
        },
    },
    [SYM_TYPE_PARSE]: {
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
