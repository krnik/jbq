import { REQUIRED, SYM_TYPE_KEY_ORDER, SYM_TYPE_VALIDATE, TYPE, TYPE_NAME } from '../constants';
import { schemaValidate } from './schemaValidate';

export const TypeAny = {
    [TYPE] (/** schemaValue: string, data: any */) {
        //{break}
    },
    [REQUIRED] (schemaValue: boolean, data: any) {
        if (data === undefined)
            if (!schemaValue) {
                //{break}
            } else
                return '{"message": "Value is required, got undefined.", "path": "#{schemaPath}"}';
    },
    [SYM_TYPE_VALIDATE]: {
        [TYPE]: schemaValidate.primitive(TYPE_NAME.ANY, TYPE, 'string'),
        [REQUIRED]: schemaValidate.primitive(TYPE_NAME.ANY, REQUIRED, 'boolean'),
    },
    [SYM_TYPE_KEY_ORDER]: [REQUIRED, TYPE],
};
