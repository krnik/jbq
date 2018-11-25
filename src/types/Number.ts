import { MAX, MIN, MULTIPLE_OF, ONE_OF, SYM_TYPE_VALIDATE, TYPE, TYPE_NAME } from '../constants';
import { schemaValidate } from './schemaValidate';

export const TypeNumber = {
    [TYPE] (_schemaValue: string, data: any) {
        if (typeof data !== 'number' || data !== data)
            return `{"message": "Data should be a number (NaN excluded) type. Got ${typeof data}.", "path": "#{schemaPath}"}`;
    },
    [MIN] (schemaValue: number, data: any) {
        if (schemaValue > data)
            return `{"message": "Data expected to be equal to at least #{schemaValue}. Got ${data}.", "path": "#{schemaPath}"}`;
    },
    [MAX] (schemaValue: number, data: any) {
        if (schemaValue < data)
            return `{"message": "Data expected to be equal to at most #{schemaValue}. Got ${data}.", "path": "#{schemaPath}"}`;
    },
    [MULTIPLE_OF] (schemaValue: number, data: any) {
        if (data % schemaValue)
            return `{"message": "Data expected to be multiply of #{schemaValue}.", "path": "#{schemaPath}"}`;
    },
    [ONE_OF] (schemaValue: number[], data: any) {
        if (!schemaValue.includes(data))
            return `{"message": "Data should be one of #{schemaValue.toString()}.", "path": "#{schemaPath}"}`;
    },
    [SYM_TYPE_VALIDATE]: {
        [TYPE]: schemaValidate.primitive(TYPE_NAME.NUMBER, TYPE, 'string'),
        [MIN]: schemaValidate.primitive(TYPE_NAME.NUMBER, MIN, 'number'),
        [MAX]: schemaValidate.primitive(TYPE_NAME.NUMBER, MAX, 'number'),
        [MULTIPLE_OF]: schemaValidate.primitive(TYPE_NAME.NUMBER, MULTIPLE_OF, 'number'),
        [ONE_OF]: schemaValidate.arrayOf(TYPE_NAME.NUMBER, ONE_OF, 'number'),
    },
};
