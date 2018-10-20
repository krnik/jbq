import { REQUIRED, SYM_TYPE_KEY_ORDER, SYM_TYPE_VALIDATE, TYPE } from '../constants';
import { E, is } from '../utils/index';

export const TypeAny = {
    [TYPE] (/** schemaValue: string, data: any */) {
        //{break}
    },
    [REQUIRED] (schemaValue: boolean, data: any) {
        if (data === undefined && !schemaValue) {
            //{break}
        }
    },
    [SYM_TYPE_VALIDATE]: {
        [TYPE] (schemaValue: any) {
            if (!is.string(schemaValue))
                E.invalidSchemaPropType(TYPE, 'string', typeof schemaValue);
        },
        [REQUIRED] (schemaValue: any) {
            if (!is.boolean(schemaValue))
                E.invalidSchemaPropType(REQUIRED, 'boolean', typeof schemaValue);
        },
    },
    [SYM_TYPE_KEY_ORDER]: [REQUIRED, TYPE],
};
