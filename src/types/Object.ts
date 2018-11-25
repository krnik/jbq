import { CONSTRUCTOR_NAME, INSTANCE_OF, KEY_COUNT, PROPERTIES, PROP_COUNT, SYM_TYPE_RETURNS_BODY, SYM_TYPE_VALIDATE, TYPE, TYPE_NAME } from '../constants';
import { schemaValidate } from './schemaValidate';

interface IKeyCountMin { min: number; }
interface IKeyCountMax { max: number; }
type KeyCountSchema = IKeyCountMax | IKeyCountMin | (IKeyCountMax & IKeyCountMin);

export const TypeObject = {
    [TYPE] (_schemaValue: string, data: any): string | void {
        if (!(data && typeof data === 'object' && !Array.isArray(data)))
            return `{"message": "Data should be #{schemaValue} type. Got ${typeof data}.", "path": "#{schemaPath}"}`;
    },
    [CONSTRUCTOR_NAME] (schemaValue: string, data: any): string | void {
        if (Object.getPrototypeOf(data).constructor.name !== schemaValue)
            return `{"message": "Data should be direct instance of #{schemaValue}.", "path": "#{schemaPath"}`;
    },
    [INSTANCE_OF] (schemaValue: () => void, data: any): string | void {
        if (!(data instanceof schemaValue))
            return `{"message": "Data should be instance of #{schemaValue.name}.", "path": "#{schemaPath}"}`;
    },
    [PROPERTIES] (schemaValue: Array<(string | number | symbol)>, data: any): string | void {
        for (const key of schemaValue)
            if (!data.hasOwnProperty(key))
                return `{"message": "Data should have ${key.toString()} property.", "path": "#{schemaPath}"}`;
    },
    [KEY_COUNT] (schemaValue: number | KeyCountSchema, schemaPath: string): string {
        const body = (conditions: Array<[string, number]>, errChunk: string): string => {
            const ifConds = conditions
                .map((val) => `Object.keys(data).length ${val[0]} ${val[1]}`)
                .join(' || ');
            const expected = conditions
                .map((val) => val.toString())
                .join('..');
            return `if (${ifConds}) {
                return '{"message": "Data should have number of keys ${errChunk} ${expected}", "path": "${schemaPath}"}';
            }`;
        };
        if (typeof schemaValue === 'number')
            return body([['!==', schemaValue]], 'equal to');
        if ('min' in schemaValue && 'max' in schemaValue)
            return body([['<', schemaValue.min], ['>', schemaValue.max]], 'in range');
        if ('min' in schemaValue)
            return body([['<', schemaValue.min]], 'greater than');
        else
            return body([['>', schemaValue.max]], 'smaller than');
    },
    [PROP_COUNT] (schemaValue: number | KeyCountSchema, schemaPath: string): string {
        const body = (conditions: Array<[string, number]>, errChunk: string): string => {
            const ifConditions = conditions
                .map((val) => `(Object.getOwnPropertyNames(data).length + Object.getOwnPropertySymbols(data)) ${val[0]} ${val[1]}`)
                .join(' || ');
            const expected = conditions
                .map((val) => val.toString())
                .join('..');
            return `if (${ifConditions})
                return '{"message": "Data should have number of properties ${errChunk} ${expected}", "path": "${schemaPath}"}';`;
        };
        if (typeof schemaValue === 'number')
            return body([['!==', schemaValue]], 'equal to');
        if ('min' in schemaValue && 'max' in schemaValue)
            return body([['<', schemaValue.min], ['>', schemaValue.max]], 'in range');
        if ('min' in schemaValue)
            return body([['<', schemaValue.min]], 'greater than');
        return body([['>', schemaValue.max]], 'smaller than');
    },
    [SYM_TYPE_VALIDATE]: {
        [TYPE]: schemaValidate.primitive(TYPE_NAME.OBJECT, TYPE, 'string'),
        [CONSTRUCTOR_NAME]: schemaValidate.primitive(TYPE_NAME.OBJECT, CONSTRUCTOR_NAME, 'string'),
        [INSTANCE_OF]: schemaValidate.isInstance(TYPE_NAME.OBJECT, INSTANCE_OF, 'Function'),
        [PROPERTIES]: schemaValidate.arrayOfPropertyNames(TYPE_NAME.OBJECT, PROPERTIES),
        [KEY_COUNT]: schemaValidate.minMaxOrNumber(TYPE_NAME.OBJECT, KEY_COUNT),
        [PROP_COUNT]: schemaValidate.minMaxOrNumber(TYPE_NAME.OBJECT, PROP_COUNT),
    },
};

Object.defineProperty(TypeObject[KEY_COUNT], SYM_TYPE_RETURNS_BODY, { value: true });
Object.defineProperty(TypeObject[PROP_COUNT], SYM_TYPE_RETURNS_BODY, { value: true });
