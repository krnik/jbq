import { SYM_TYPE_VALIDATE, TYPE, VALUE } from '../constants';
import { E, is } from '../utils/index';

export const TypeBoolean = {
    // @ts-ignore
    [TYPE] (schemaValue: string, data: any) {
        if (data !== true && data !== false)
            return `Data should be #{schemaValue} type. Got ${typeof data}.`;
    },
    [VALUE] (schemaValue: boolean, data: any) {
        if (schemaValue !== data)
            return `Data should be equal to #{schemaValue}. Got ${data}.`;
    },
    [SYM_TYPE_VALIDATE]: {
        [TYPE] (schemaValue: any = E.invalidArgument('schemaValue')) {
            if (!is.string(schemaValue))
                E.invalidSchemaPropType(TYPE, 'string', typeof schemaValue);
        },
        [VALUE] (schemaValue: any = E.invalidArgument('schemaValue')) {
            if (!is.boolean(schemaValue))
                E.invalidSchemaPropType(schemaValue, 'boolean', typeof schemaValue);
        },
    },
};
