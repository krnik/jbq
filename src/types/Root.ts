import { ITypePrototype, SYM_TYPE_PARSE, SYM_TYPE_VALIDATE, TYPE } from '../constants';
import { E, isType } from '../utils/index';

export const TypeRoot: ITypePrototype = {
    [TYPE] (base: string, value: any) {
        switch (base) {
        case 'array':
        case 'boolean':
        case 'number':
        case 'object':
        case 'string':
        default:
            if (base !== typeof value) throw { args: { base, value }, msg: E.msg.validationError(TYPE) };
        }
    },
    [SYM_TYPE_VALIDATE]: {
        [TYPE] (value: any = E.param()) {
            if (!isType.string(value)) E.typeValidateError(TYPE, 'string primitive', typeof(value));
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
