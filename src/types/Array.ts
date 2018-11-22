import { EVERY, INCLUDES, LEN, MAX_LEN, MIN_LEN, SOME, SYM_TYPE_FOR_LOOP, SYM_TYPE_VALIDATE, TYPE } from '../constants';
import { Err, is } from '../utils/main';

type arrMethodCallback = (elem: any, index?: number, arr?: any[]) => boolean;
export const TypeArray = {
    [TYPE] (_schemaValue: string, data: any) {
        if (!Array.isArray(data))
            return 'Data should be #{schemaValue} type.';
    },
    [EVERY] (schemaValue: arrMethodCallback, data: any[]) {
        const len = data.length;
        for (let i = 0; i < len; i++)
            if (!schemaValue(data[i])) return 'Every element of data should pass test function.';
    },
    [SOME] (schemaValue: arrMethodCallback, data: any[]) {
        const len = data.length;
        for (let i = 0; i < len; i++) {
            if (schemaValue(data[i])) break;
            if (i === len - 1) return 'At least one element of data should pass test function.';
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
            return 'Data should include #{schemaValue}.';
    },
    [MIN_LEN] (schemaValue: number, data: any[]) {
        if (data.length < schemaValue)
            return `Data should have length greater or equal than #{schemaValue}. Got ${data.length}.`;
    },
    [MAX_LEN] (schemaValue: number, data: any[]) {
        if (data.length > schemaValue)
            return `Data should have length less or equal than #{schemaValue}. Got ${data.length}.`;
    },
    [LEN] (schemaValue: number, data: any[]) {
        if (data.length !== schemaValue)
            return `Data should have length equal to #{schemaValue}. Got ${data.length}.`;
    },
    [SYM_TYPE_VALIDATE]: {
        [TYPE] (schemaValue: any = Err.invalidArgument('schemaValue')) {
            if (!is.string(schemaValue))
                throw Err.invalidSchemaPropType(TYPE, 'string', typeof schemaValue);
        },
        [EVERY] (schemaValue: any = Err.invalidArgument('schemaValue')) {
            if (!is.objectInstance(schemaValue, 'Function'))
                throw Err.invalidSchemaPropType(EVERY, 'function', typeof schemaValue);
        },
        [SOME] (schemaValue: any = Err.invalidArgument('schemaValue')) {
            if (!is.objectInstance(schemaValue, 'Function'))
                throw Err.invalidSchemaPropType(SOME, 'function', typeof schemaValue);
        },
        [INCLUDES] (_schemaValue: any = Err.invalidArgument('schemaValue')) {
            // this function will accept any schemaValue excluding undefined
        },
        [MIN_LEN] (schemaValue: any = Err.invalidArgument('schemaValue')) {
            if (!is.number(schemaValue))
                throw Err.invalidSchemaPropType(MIN_LEN, 'number', typeof schemaValue);
        },
        [MAX_LEN] (schemaValue: any = Err.invalidArgument('schemaValue')) {
            if (!is.number(schemaValue))
                throw Err.invalidSchemaPropType(MAX_LEN, 'number', typeof schemaValue);
        },
        [LEN] (schemaValue: any = Err.invalidArgument('schemaValue')) {
            if (!is.number(schemaValue))
                throw Err.invalidSchemaPropType(LEN, 'number', typeof schemaValue);
        },
    },
    [SYM_TYPE_FOR_LOOP]: true,
};
