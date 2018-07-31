import { CONSTRUCTOR_NAME, INSTANCE_OF, SYM_TYPE_VALIDATE } from '../constants';
import { E, isType } from '../utils/index';

export const TypeObject = {
  [CONSTRUCTOR_NAME] (base: string, value: any) {
    if (Object.getPrototypeOf(value).constructor.name !== base)
    throw { base, value };
  },
  [INSTANCE_OF] (base: () => void, value: any) {
    if (!(value instanceof base)) throw { base, value };
  },
  [SYM_TYPE_VALIDATE]: {
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
