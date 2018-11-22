import { MAX, MIN, MULTIPLE_OF, ONE_OF, SYM_TYPE_VALIDATE, TYPE } from '../constants';
import { Err, is } from '../utils/main';

export const TypeNumber = {
    [TYPE] (_schemaValue: string, data: any) {
        if (typeof data !== 'number' || data !== data)
            return `Data should be a number (NaN excluded) type. Got ${typeof data}.`;
    },
    [MIN] (schemaValue: number, data: any) {
        if (schemaValue > data)
            return `Data expected to be equal to at least #{schemaValue}. Got ${data}.`;
    },
    [MAX] (schemaValue: number, data: any) {
        if (schemaValue < data)
            return `Data expected to be equal to at most #{schemaValue}. Got ${data}.`;
    },
    [MULTIPLE_OF] (schemaValue: number, data: any) {
        if (data % schemaValue)
            return `Data expected to be multiply of #{schemaValue}.`;
    },
    [ONE_OF] (schemaValue: number[], data: any) {
        if (!schemaValue.includes(data))
            return `Data should be one of #{schemaValue.toString()}.`;
    },
    [SYM_TYPE_VALIDATE]: {
        [TYPE] (schemaValue: any = Err.invalidArgument('schemaValue')) {
            if (!is.string(schemaValue))
                throw Err.invalidSchemaPropType(TYPE, 'string', typeof schemaValue);
        },
        [MIN] (schemaValue: any = Err.invalidArgument('schemaValue')) {
            if (!is.number(schemaValue))
                throw Err.invalidSchemaPropType(MIN, 'number', typeof schemaValue);
        },
        [MAX] (schemaValue: any = Err.invalidArgument('schemaValue')) {
            if (!is.number(schemaValue))
                throw Err.invalidSchemaPropType(MAX, 'number', typeof schemaValue);
        },
        [MULTIPLE_OF] (schemaValue: any = Err.invalidArgument('schemaValue')) {
            if (!is.number(schemaValue))
                throw Err.invalidSchemaPropType(MULTIPLE_OF, 'number', typeof schemaValue);
        },
        [ONE_OF] (schemaValue: any = Err.invalidArgument('schemaValue')) {
            switch (true) {
                case !is.objectInstance(schemaValue, 'Array'):
                    throw Err.invalidSchemaPropType(ONE_OF, 'number[]', typeof schemaValue);
                case !schemaValue.length:
                    throw Err.unexpectedValue(ONE_OF, 'an array with length at least 1');
                case !schemaValue.every((e: any) => is.number(e)):
                    throw Err.invalidSchemaPropType(
                        ONE_OF,
                        'number[]',
                        typeof schemaValue.find((e: any) => !is.number(e)),
                    );
            }
        },
    },
};
