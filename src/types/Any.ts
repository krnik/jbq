import { SYM_TYPE_VALIDATE, TYPE } from '../constants';
import { E, is } from '../utils/index';

export const TypeAny = {
    [TYPE] (/** base: string, data: any */) {
        ///break
    },
    [SYM_TYPE_VALIDATE]: {
        [TYPE] (value: any) {
            if (!is.string(value))
                E.invalidSchemaPropType(TYPE, 'string primitive', typeof value);
        }
    },
};
