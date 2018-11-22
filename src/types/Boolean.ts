import { SYM_TYPE_VALIDATE, TYPE, VALUE } from '../constants';
import { Err, is } from '../utils/main';

export const TypeBoolean = {
    [TYPE] (_schemaValue: string, data: any) {
        if (data !== true && data !== false)
            return `Data should be #{schemaValue} type. Got ${typeof data}.`;
    },
    [VALUE] (schemaValue: boolean, data: any) {
        if (schemaValue !== data)
            return `Data should be equal to #{schemaValue}. Got ${data}.`;
    },
    [SYM_TYPE_VALIDATE]: {
        [TYPE] (schemaValue: any = Err.invalidArgument('schemaValue')) {
            if (!is.string(schemaValue))
                throw Err.invalidSchemaPropType(TYPE, 'string', typeof schemaValue);
        },
        [VALUE] (schemaValue: any = Err.invalidArgument('schemaValue')) {
            if (!is.boolean(schemaValue))
                throw Err.invalidSchemaPropType(schemaValue, 'boolean', typeof schemaValue);
        },
    },
};
