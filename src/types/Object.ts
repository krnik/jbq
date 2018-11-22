import { CONSTRUCTOR_NAME, INSTANCE_OF, MAX_KEY_COUNT, MAX_PROP_COUNT, MIN_KEY_COUNT, MIN_PROP_COUNT, PROPERTIES, SYM_TYPE_VALIDATE, TYPE } from '../constants';
import { Err, is } from '../utils/main';

export const TypeObject = {
    [TYPE] (_schemaValue: string, data: any) {
        if (!(data && typeof data === 'object' && !Array.isArray(data)))
            return `Data should be #{schemaValue} type. Got ${typeof data}.`;
    },
    [CONSTRUCTOR_NAME] (schemaValue: string, data: any) {
        if (Object.getPrototypeOf(data).constructor.name !== schemaValue)
            return `Data should be direct instance of #{schemaValue}.`;
    },
    [INSTANCE_OF] (schemaValue: () => void, data: any) {
        if (!(data instanceof schemaValue))
            return `Data should be instance of #{schemaValue.name}.`;
    },
    [PROPERTIES] (schemaValue: Array<(string | number | symbol)>, data: any) {
        for (const key of schemaValue)
            if (!data.hasOwnProperty(key))
                return `Data should have ${key.toString()} property.`;
    },
    [MIN_PROP_COUNT] (schemaValue: number, data: any) {
        if (Object.getOwnPropertyNames(data).length +
            Object.getOwnPropertySymbols(data).length < schemaValue)
            return `Data should have at least #{schemaValue} properties.`;
    },
    [MAX_PROP_COUNT] (schemaValue: number, data: any) {
        if (Object.getOwnPropertyNames(data).length +
            Object.getOwnPropertySymbols(data).length > schemaValue)
            return `Data should have at most #{schemaValue} properties.`;
    },
    [MIN_KEY_COUNT] (schemaValue: number, data: any) {
        if (Object.keys(data).length < schemaValue)
            return `Data should have at least #{schemaValue} properties.`;
    },
    [MAX_KEY_COUNT] (schemaValue: number, data: any) {
        if (Object.keys(data).length > schemaValue)
            return `Data should have at most #{schemaValue} properties.`;
    },
    [SYM_TYPE_VALIDATE]: {
        [TYPE] (schemaValue: any = Err.invalidArgument('schemaValue')) {
            if (!is.string(schemaValue))
                throw Err.invalidSchemaPropType(TYPE, 'string', typeof schemaValue);
        },
        [CONSTRUCTOR_NAME] (schemaValue: any = Err.invalidArgument('schemaValue')) {
            if (!is.string(schemaValue))
                throw Err.invalidSchemaPropType(CONSTRUCTOR_NAME, 'string', typeof schemaValue);
        },
        [INSTANCE_OF] (schemaValue: any = Err.invalidArgument('schemaValue')) {
            if (!is.objectInstance(schemaValue, 'Function'))
                throw Err.invalidSchemaPropType(INSTANCE_OF, 'function', typeof schemaValue);
        },
        [PROPERTIES] (schemaValue: any = Err.invalidArgument('schemaValue')) {
            if (!is.objectInstance(schemaValue, 'Array')
                || !schemaValue.every((e: any) => is.number(e) || is.string(e) || is.symbol(e)))
                throw Err.invalidSchemaPropType(PROPERTIES, 'array', typeof schemaValue);
        },
        [MIN_PROP_COUNT] (schemaValue: any = Err.invalidArgument('schemaValue')) {
            if (!is.number(schemaValue))
                throw Err.invalidSchemaPropType(MIN_PROP_COUNT, 'number', typeof schemaValue);
        },
        [MAX_PROP_COUNT] (schemaValue: any = Err.invalidArgument('schemaValue')) {
            if (!is.number(schemaValue))
                throw Err.invalidSchemaPropType(MAX_PROP_COUNT, 'number', typeof schemaValue);
        },
        [MIN_KEY_COUNT] (schemaValue: any = Err.invalidArgument('schemaValue')) {
            if (!is.number(schemaValue))
                throw Err.invalidSchemaPropType(MIN_KEY_COUNT, 'number', typeof schemaValue);
        },
        [MAX_KEY_COUNT] (schemaValue: any = Err.invalidArgument('schemaValue')) {
            if (!is.number(schemaValue))
                throw Err.invalidSchemaPropType(MAX_KEY_COUNT, 'number', typeof schemaValue);
        },
    },
};
