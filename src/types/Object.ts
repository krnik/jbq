import { CONSTRUCTOR_NAME, INSTANCE_OF, SYM_TYPE_VALIDATE, TYPE } from '../constants';
import { E, isType } from '../utils/index';

export const TypeObject = {
  [TYPE] (base: string, value: any) {
    if (typeof value !== 'object' || !value) return `Value should be ${base} type. Got ${typeof value}.`;
  },
  [CONSTRUCTOR_NAME] (base: string, value: any) {
    if (Object.getPrototypeOf(value).constructor.name !== base)
        return `Value should be direct instance of ${base}.`;
  },
  [INSTANCE_OF] (base: () => void, value: any) {
    if (!(value instanceof base)) return `Value should be instance of ${base}.`;
  },
  [SYM_TYPE_VALIDATE]: {
    [TYPE] (value: any = E.param()) {
        if (!isType.string(value)) E.typeValidateError(TYPE, 'string primitive', typeof value);
    },
    [CONSTRUCTOR_NAME] (value: any = E.param()) {
      if (!isType.string(value))
        E.typeValidateError(CONSTRUCTOR_NAME, 'string primitive', typeof(value));
    },
    [INSTANCE_OF] (value: any = E.param()) {
      if (!isType.objectInstance(value, 'Function'))
        E.typeValidateError(INSTANCE_OF, 'Function', typeof(value));
    },
  },
};
