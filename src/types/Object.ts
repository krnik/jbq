import { CONSTRUCTOR_NAME, INSTANCE_OF, ITypePrototype, SYM_TYPE_PARSE, SYM_TYPE_VALIDATE } from '../constants';
import { E, isType } from '../utils/index';

export const TypeObject: ITypePrototype = {
  [CONSTRUCTOR_NAME] (base: string, value: any) {
    if (Object.getPrototypeOf(value).constructor.name !== base)
      throw { args: { base, value }, msg: E.msg.validationError(CONSTRUCTOR_NAME) };
  },
  [INSTANCE_OF] (base: () => void, value: any) {
    if (!(value instanceof base)) throw { args: { base, value }, msg: E.msg.validationError(INSTANCE_OF) };
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
  [SYM_TYPE_PARSE]: {
    [CONSTRUCTOR_NAME] (key: string, value: any): { base: any, check: any } {
            return {
                base: value,
                check: this[key],
            };
        },
    [INSTANCE_OF] (key: string, value: any): { base: any, check: any } {
            return {
                base: value,
                check: this[key],
            };
        },
  },
};
// INSTANCE_OF
// CONSTRTUCTOR_NAME
