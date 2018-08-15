import { SYM_TYPE_VALIDATE, TYPE, VALUE } from '../constants';
import { E, isType } from '../utils/index';

export const TypeBoolean = {
  [TYPE] (base: string, data: any) {
    if (data !== true && data !== false)
        return `Data should be ${base} type. Got ${typeof data}.`;
  },
  [VALUE] (base: boolean, data: any) {
    if (base !== data)
        return `Data should be equal to ${base}. Got ${data}.`;
  },
  [SYM_TYPE_VALIDATE]: {
    [TYPE] (value: any = E.invalidArgument('value')) {
        if (!isType.string(value))
            E.invalidSchemaPropType(TYPE, 'string primitive', typeof value);
    },
    [VALUE] (value: any = E.invalidArgument('value')) {
        if (!isType.boolean(value))
            E.invalidSchemaPropType(VALUE, 'boolean primitive', typeof value);
    },
  },
};
