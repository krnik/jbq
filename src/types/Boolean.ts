import { SYM_TYPE_VALIDATE, TYPE, TYPE_NAME, VALUE } from '../constants';
import { schemaValidate } from './schemaValidate';

export const TypeBoolean = {
    [TYPE] (_schemaValue: string, data: any) {
        if (data !== true && data !== false)
            return `{"message": "Data should be #{schemaValue} type. Got ${typeof data}.", "path": "#{schemaPath}"}`;
    },
    [VALUE] (schemaValue: boolean, data: any) {
        if (schemaValue !== data)
            return `{"message": "Data should be equal to #{schemaValue}. Got ${data}.", "path": "#{schemaPath}"}`;
    },
    [SYM_TYPE_VALIDATE]: {
        [TYPE]: schemaValidate.primitive(TYPE_NAME.BOOLEAN, TYPE, 'boolean'),
        [VALUE]: schemaValidate.primitive(TYPE_NAME.BOOLEAN, VALUE, 'boolean'),
    },
};
