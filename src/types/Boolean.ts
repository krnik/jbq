import { SYM_TYPE_VALIDATE, TYPE, TYPE_NAME, VALUE } from '../constants';
import { schemaValidate } from './schemaValidate';

export const TypeBoolean = {
    [TYPE] (_schemaValue: string, $DATA: any): string | void {
        if ($DATA !== true && $DATA !== false)
            return `{"message": "Data should be {{schemaValue}} type. Got ${typeof $DATA}.", "path": "{{schemaPath}}"}`;
    },
    [VALUE] (schemaValue: boolean, $DATA: any): string | void {
        if (schemaValue !== $DATA)
            return `{"message": "Data should be equal to {{resolvedValue || schemaValue}}. Got ${$DATA}.", "path": "{{schemaPath}}"}`;
    },
    [SYM_TYPE_VALIDATE]: {
        [TYPE]: schemaValidate.primitive(TYPE_NAME.BOOLEAN, TYPE, 'string'),
        [VALUE]: schemaValidate.primitive(TYPE_NAME.BOOLEAN, VALUE, 'boolean', true),
    },
};
