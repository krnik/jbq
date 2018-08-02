import { MAX, MIN, SYM_TYPE_VALIDATE } from '../constants';
import { E, isType } from '../utils/index';

export const TypeNumber = {
    [MIN] (base: number, value: any) {
        if (base > value) return { base, value };
    },
    [MAX] (base: number, value: any) {
        if (base < value) return { base, value };
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
};
