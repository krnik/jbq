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
        [TYPE] (schemaValue: any = E.invalidArgument('schemaValue')) {
            if (!is.string(schemaValue))
                throw E.invalidSchemaPropType(TYPE, 'string', typeof schemaValue);
        },
        [REQUIRED] (schemaValue: any = E.invalidArgument('schemaValue')) {
            if (!is.boolean(schemaValue))
                throw E.invalidSchemaPropType(REQUIRED, 'boolean', typeof schemaValue);
        },
    },
    [SYM_TYPE_KEY_ORDER]: [REQUIRED, TYPE],
};
