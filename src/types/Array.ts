import { EVERY, INCLUDES, LEN, SOME, SYM_TYPE_FOR_LOOP, SYM_TYPE_RETURNS_BODY, SYM_TYPE_VALIDATE, TYPE, TYPE_NAME } from '../constants';
import { schemaValidate } from './schemaValidate';

interface IKeyCountMin { min: number; }
interface IKeyCountMax { max: number; }
type KeyCountSchema = IKeyCountMax | IKeyCountMin | (IKeyCountMax & IKeyCountMin);

type arrMethodCallback = (elem: any, index?: number, arr?: any[]) => boolean;
export const TypeArray = {
    [TYPE] (_schemaValue: string, data: any) {
        if (!Array.isArray(data))
            return '{"message": "Data should be a #{schemaValue} type.", "path": "#{schemaPath}"}';
    },
    [EVERY] (schemaValue: arrMethodCallback, data: any[]) {
        const len = data.length;
        for (let i = 0; i < len; i++)
            if (!schemaValue(data[i])) return '{"message": "Every element of data should satisfy test function.", "path": "#{schemaPath}"}';
    },
    [SOME] (schemaValue: arrMethodCallback, data: any[]) {
        const len = data.length;
        for (let i = 0; i < len; i++) {
            if (schemaValue(data[i])) break;
            if (i === len - 1) return '{"message": "At least one element of data should satisfy test function.", "path": "#{schemaPath}"}';
        }
    },
    [INCLUDES] (schemaValue: any, data: any[]) {
        let found = false;
        for (let i = 0; i < data.length; i++)
            if (data[i] === schemaValue) {
                found = true;
                break;
            }
        if (!found)
            return '{"message": "Data should include #{schemaValue}.", "path": "#{schemaPath}"}';
    },
    [LEN] (schemaValue: number | KeyCountSchema, schemaPath: string) {
        const body = (conditions: Array<[string, number]>, errChunk: string) => {
            const ifConditions = conditions
                .map((val) => `data.length ${val[0]} ${val[1]}`)
                .join(' || ');
            const expected = conditions.map((v) => v.toString()).join('..');
            return `if (${ifConditions})
                return '{"message": "Data should have length ${errChunk} ${expected}.", "path": "${schemaPath}"}'`;
        };
        if (typeof schemaValue === 'number')
            return body([['!==', schemaValue]], 'equal to');
        if ('min' in schemaValue && 'max' in schemaValue)
            return body([['<', schemaValue.min], ['>', schemaValue.max]], 'in range');
        if ('min' in schemaValue)
            return body([['<', schemaValue.min]], 'smaller than');
        else
            return body([['>', schemaValue.max]], 'grater than');
    },
    [SYM_TYPE_VALIDATE]: {
        [TYPE]: schemaValidate.primitive(TYPE_NAME.ARRAY, TYPE, 'string'),
        [EVERY]: schemaValidate.isInstance(TYPE_NAME.ARRAY, EVERY, 'Function'),
        [SOME]: schemaValidate.isInstance(TYPE_NAME.ARRAY, SOME, 'Function'),
        [LEN]: schemaValidate.minMaxOrNumber(TYPE_NAME.ARRAY, LEN),
        [INCLUDES]: schemaValidate.any(TYPE_NAME.ARRAY, INCLUDES),
    },
    [SYM_TYPE_FOR_LOOP]: true,
};

Object.defineProperty(TypeArray[LEN], SYM_TYPE_RETURNS_BODY, { value: true });
