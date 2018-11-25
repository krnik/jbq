import { LEN, ONE_OF, REGEX, SYM_TYPE_VALIDATE, TYPE, TYPE_NAME } from '../constants';
import { schemaValidate } from './schemaValidate';

interface IKeyCountMin { min: number; }
interface IKeyCountMax { max: number; }
type KeyCountSchema = IKeyCountMax | IKeyCountMin | (IKeyCountMax & IKeyCountMin);

export const TypeString = {
    [TYPE] (_schemaValue: string, data: any) {
        if (typeof data !== 'string')
            return `{"message": "Data should be #{schemaValue} type. Got ${typeof data}.", "path": "#{schemaPath}"}`;
    },
    [REGEX] (schemaValue: RegExp, data: any) {
        if (!schemaValue.test(data))
            return `{"message": "Data expected to pass #{schemaValue.toString()} test.", "path": "#{schemaPath}"}`;
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
    [ONE_OF] (schemaValue: string[], data: any) {
        if (!schemaValue.includes(data))
            return `{"message": "Data expected to be one of [#{schemaValue.toString()}].", "path": "#{schemaPath}"}`;
    },
    [SYM_TYPE_VALIDATE]: {
        [TYPE]: schemaValidate.primitive(TYPE_NAME.STRING, TYPE, 'string'),
        [REGEX]: schemaValidate.isInstance(TYPE_NAME.STRING, REGEX, 'RegExp'),
        [LEN]: schemaValidate.minMaxOrNumber(TYPE_NAME.STRING, LEN),
        [ONE_OF]: schemaValidate.arrayOf(TYPE_NAME.STRING, ONE_OF, 'string'),
    },
};
