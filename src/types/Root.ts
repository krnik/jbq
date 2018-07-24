import { ITypePrototype, SYM_TYPE_PARSE, SYM_TYPE_VALIDATE, TYPE } from '../constants';
import { E } from '../utils/index';

export const TypeRoot: ITypePrototype = {
    [TYPE] (base: string, value: any) {
        switch (base) {
        case 'array':
        case 'boolean':
        case 'number':
        case 'object':
        case 'string':
        default:
            return base === typeof value;
        }
    },
    [SYM_TYPE_VALIDATE]: {
        [TYPE] (value: any = E.param()) {
            if (value === Object(value) || typeof(value) !== 'string')
                E.typeValidateError(TYPE, 'string primitive', typeof(value));
        },
    },
    [SYM_TYPE_PARSE]: {
        [TYPE] (key: string, value: any): { base: any, check: any } {
            return {
                base: value,
                check: this[key],
            };
        },
    },
};
