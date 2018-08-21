import { EVERY, INCLUDES, LEN, MAX_LEN, MIN_LEN, SOME, SYM_TYPE_VALIDATE, TYPE, SYM_TYPE_FOR_LOOP } from '../constants';
import { E, is } from '../utils/index';

type arrMethodCallback = (elem: any, index: number, arr: any[], thisArg?: any) => boolean;
export const TypeArray = {
    [TYPE] (base: string, data: any) {
        if (!Array.isArray(data))
            return `Data should be ${base} type.`;
    },
    [EVERY] (base: arrMethodCallback, data: any[]) {
        if (!data.every(base))
            return `Every element of data should pass test function.`;
    },
    [SOME] (base: arrMethodCallback, data: any[]) {
        if (!data.some(base))
            return `At least one element of data should pass test function.`;
    },
    [INCLUDES] (base: any, data: any[]) {
        if (!data.includes(base))
            return `Data should include ${base}.`;
    },
    [MIN_LEN] (base: number, data: any[]) {
        if (data.length < base)
            return `Data should have length greater or equal than ${base}. Got ${data.length}.`;
    },
    [MAX_LEN] (base: number, data: any[]) {
        if (data.length > base)
            return `Data should have length less or equal than ${base}. Got ${data.length}.`;
    },
    [LEN] (base: number, data: any[]) {
        if (data.length !== base)
            return `Data should have length equal to ${base}. Got ${data.length}.`;
    },
    [SYM_TYPE_VALIDATE]: {
        [TYPE] (value: any = E.invalidArgument('value')) {
            if (!is.string(value))
                E.invalidSchemaPropType(TYPE, 'string primitive', typeof value);
        },
        [EVERY] (value: any = E.invalidArgument('value')) {
            if (!is.objectInstance(value, 'Function'))
                E.invalidSchemaPropType(EVERY, 'function', typeof value);
        },
        [SOME] (value: any = E.invalidArgument('value')) {
            if (!is.objectInstance(value, 'Function'))
                E.invalidSchemaPropType(SOME, 'function', typeof value);
        },
        // @ts-ignore
        [INCLUDES] (value: any = E.invalidArgument('value')) {
            // for now this function will accept any value excluding undefined
        },
        [MIN_LEN] (value: any = E.invalidArgument('value')) {
            if (!is.number(value))
                E.invalidSchemaPropType(MIN_LEN, 'number', typeof value);
        },
        [MAX_LEN] (value: any = E.invalidArgument('value')) {
            if (!is.number(value))
                E.invalidSchemaPropType(MAX_LEN, 'number', typeof value);
        },
        [LEN] (value: any = E.invalidArgument('value')) {
            if (!is.number(value))
                E.invalidSchemaPropType(LEN, 'number', typeof value);
        },
    },
    [SYM_TYPE_FOR_LOOP]: true,
};
