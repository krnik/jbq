import { SYM_TYPE_VALIDATE, TYPE, VALUE } from '../constants';
import { E, is } from '../utils/index';

export const TypeBoolean = {
    // @ts-ignore
    [TYPE] (base: string, data: any) {
        if (data !== true && data !== false)
            return `Data should be #{base} type. Got ${typeof data}.`;
    },
    [VALUE] (base: boolean, data: any) {
        if (base !== data)
            return `Data should be equal to #{base}. Got ${data}.`;
    },
    [SYM_TYPE_VALIDATE]: {
        [TYPE] (value: any = E.invalidArgument('value')) {
            if (!is.string(value))
                E.invalidSchemaPropType(TYPE, 'string', typeof value);
        },
        [VALUE] (value: any = E.invalidArgument('value')) {
            if (!is.boolean(value))
                E.invalidSchemaPropType(VALUE, 'boolean', typeof value);
        },
    },
};
