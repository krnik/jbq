import { SYM_TYPE_VALIDATE, TYPE } from '../constants';
import { E, isType } from '../utils/index';

export const TypeRoot = {
    [TYPE] (base: string, value: any) {
        switch (base) {
        case 'array':
        case 'boolean':
        case 'number':
        case 'object':
        case 'string':
        default:
            if (base !== typeof value) throw { base, value };
        }
    },
    [SYM_TYPE_VALIDATE]: {
        [TYPE] (value: any = E.param()) {
            if (!isType.string(value)) E.typeValidateError(TYPE, 'string primitive', typeof(value));
        },
    },
};
