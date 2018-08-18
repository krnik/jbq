import { MAX, MIN, SYM_TYPE_VALIDATE, TYPE } from '../constants';
import { E, isType } from '../utils/index';

export const TypeNumber = {
    [TYPE] (base: string, data: any) {
        if (!(typeof data === 'number' && data === data))
            return `Data should be ${base} (NaN excluded) type. Got ${typeof data}.`;
    },
    [MIN] (base: number, data: any) {
        if (base > data)
            return `Data expected to be equal to at least ${base}. Got ${data}.`;
    },
    [MAX] (base: number, data: any) {
        if (base < data)
            return `Data expected to be equal to at most ${base}. Got ${data}.`;
    },
    [SYM_TYPE_VALIDATE]: {
        [TYPE] (value: any = E.invalidArgument('value')) {
            if (!isType.string(value))
                E.invalidSchemaPropType(TYPE, 'string', typeof value);
        },
        [MIN] (value: any = E.invalidArgument('value')) {
            if (!isType.number(value))
                E.invalidSchemaPropType(MIN, 'number', typeof value);
        },
        [MAX] (value: any = E.invalidArgument('value')) {
            if (!isType.number(value))
                E.invalidSchemaPropType(MAX, 'number', typeof value);
        },
    },
};
