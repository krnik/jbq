import { SYM_TYPE_VALIDATE, TYPE, VALUE } from '../constants';
import { E, isType } from '../utils/index';

export const TypeBoolean = {
  [TYPE] (base: string, value: any) {
    if (!(typeof value === 'boolean' && value !== Object(value)))
        return `Value should be ${base} type. Got ${typeof value}.`;
  },
  [VALUE] (base: boolean, value: any) {
    if (base !== value) return `Value should be equal to ${base}. Got ${value}.`;
  },
  [SYM_TYPE_VALIDATE]: {
    [TYPE] (value: any = E.param()) {
        if (!isType.string(value)) E.typeValidateError(TYPE, 'string primitive', typeof value);
    },
    [VALUE] (value: any = E.param()) {
        if (!isType.boolean(value))
            E.typeValidateError(VALUE, 'boolean primitive', typeof(value));
    },
  },
};
