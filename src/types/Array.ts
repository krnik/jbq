import { EVERY, INCLUDES, LEN, MAX_LEN, MIN_LEN, SOME, SYM_TYPE_FOR_LOOP, SYM_TYPE_VALIDATE, TYPE } from '../constants';
import { E, is } from '../utils/index';

type arrMethodCallback = (elem: any, index?: number, arr?: any[]) => boolean;
export const TypeArray = {
    // @ts-ignore
    [TYPE] (schemaValue: string, data: any) {
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
            if (i === len - 1) return 'At least one element of data should pass test function.';
            if (schemaValue(data[i])) break;
        }
    },
    [INCLUDES] (schemaValue: any, data: any[]) {
        let found = false;
        const len = data.length;
        for (let i = 0; i < len; i++)
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
        [TYPE] (schemaValue: any = E.invalidArgument('schemaValue')) {
            if (!is.string(schemaValue))
                E.invalidSchemaPropType(TYPE, 'string', typeof schemaValue);
        },
        [EVERY] (schemaValue: any = E.invalidArgument('schemaValue')) {
            if (!is.objectInstance(schemaValue, 'Function'))
                E.invalidSchemaPropType(EVERY, 'function', typeof schemaValue);
        },
        [SOME] (schemaValue: any = E.invalidArgument('schemaValue')) {
            if (!is.objectInstance(schemaValue, 'Function'))
                E.invalidSchemaPropType(SOME, 'function', typeof schemaValue);
        },
        // @ts-ignore
        [INCLUDES] (schemaValue: any = E.invalidArgument('schemaValue')) {
            // for now this function will accept any schemaValue excluding undefined
        },
        [MIN_LEN] (schemaValue: any = E.invalidArgument('schemaValue')) {
            if (!is.number(schemaValue))
                E.invalidSchemaPropType(MIN_LEN, 'number', typeof schemaValue);
        },
        [MAX_LEN] (schemaValue: any = E.invalidArgument('schemaValue')) {
            if (!is.number(schemaValue))
                E.invalidSchemaPropType(MAX_LEN, 'number', typeof schemaValue);
        },
        [LEN] (schemaValue: any = E.invalidArgument('schemaValue')) {
            if (!is.number(schemaValue))
                E.invalidSchemaPropType(LEN, 'number', typeof schemaValue);
        },
    },
    [SYM_TYPE_FOR_LOOP]: true,
};
