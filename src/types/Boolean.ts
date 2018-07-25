import { ITypePrototype, SYM_TYPE_PARSE, SYM_TYPE_VALIDATE, VALUE } from '../constants';
import { E, isType } from '../utils/index';

export const TypeBoolean: ITypePrototype = {
  [VALUE] (base: boolean, value: any) {
    if (base !== value) throw { args: { base, value }, msg: E.msg.validationError(VALUE) };
  },
  [SYM_TYPE_VALIDATE]: {
    [VALUE] (value: any = E.param()) {
        if (!isType.boolean(value))
            E.typeValidateError(VALUE, 'boolean primitive', typeof(value));
    },
  },
  [SYM_TYPE_PARSE]: {
    [VALUE] (key: string, base: any): { base: any, check: any } {
        return {
            base,
            check: this[key],
        };
    },
  },
};
