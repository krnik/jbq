import { REQUIRED, SYM_TYPE_VALIDATE, TYPE } from '../constants';
import { E, is } from '../utils/index';

export const TypeAny = {
    [TYPE] (/** base: string, data: any */) {
        ///break
    },
    [REQUIRED] (base: boolean, data: any) {
        if (data === undefined && !base) {
            ///break
        }
    },
    [SYM_TYPE_VALIDATE]: {
        [TYPE] (value: any) {
            if (!is.string(value))
                E.invalidSchemaPropType(TYPE, 'string', typeof value);
        },
        [REQUIRED] (value: any) {
            if (!is.boolean(value))
                E.invalidSchemaPropType(REQUIRED, 'boolean', typeof value);
        },
    },
};
