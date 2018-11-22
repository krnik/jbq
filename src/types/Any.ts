import { REQUIRED, SYM_TYPE_KEY_ORDER, SYM_TYPE_VALIDATE, TYPE } from '../constants';
import { Err, is } from '../utils/main';

export const TypeAny = {
    [TYPE] (/** schemaValue: string, data: any */) {
        //{break}
    },
    [REQUIRED] (schemaValue: boolean, data: any) {
        if (data === undefined)
            if (!schemaValue) {
                //{break}
            } else
                return 'Value is required, got undefined';
    },
    [SYM_TYPE_VALIDATE]: {
        [TYPE] (schemaValue: any = Err.invalidArgument('schemaValue')) {
            if (!is.string(schemaValue))
                throw Err.invalidSchemaPropType(TYPE, 'string', typeof schemaValue);
        },
        [REQUIRED] (schemaValue: any = Err.invalidArgument('schemaValue')) {
            if (!is.boolean(schemaValue))
                throw Err.invalidSchemaPropType(REQUIRED, 'boolean', typeof schemaValue);
        },
    },
    [SYM_TYPE_KEY_ORDER]: [REQUIRED, TYPE],
};
