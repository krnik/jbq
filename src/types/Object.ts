import { CONSTRUCTOR_NAME, INSTANCE_OF, PROPERTIES, SYM_TYPE_VALIDATE, TYPE, MIN_PROP_COUNT, MAX_PROP_COUNT } from '../constants';
import { E, is } from '../utils/main';

export const TypeObject = {
    [TYPE] (_schemaValue: string, data: any) {
        if (!(data && typeof data === 'object'))
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
        const keys = [
            ...Object.getOwnPropertyNames(data),
            ...Object.getOwnPropertySymbols(data),
        ];
        if (keys.length < schemaValue)
            return `Data should have at least #{schemaValue} properties. It has ${keys.length}.`;
    },
    [MAX_PROP_COUNT] (schemaValue: number, data: any) {
        const keys = [
            ...Object.getOwnPropertyNames(data),
            ...Object.getOwnPropertySymbols(data),
        ];
        if (keys.length > schemaValue)
            return `Data should have at most #{schemaValue} properties. It has ${keys.length}.`;
    },
    [SYM_TYPE_VALIDATE]: {
        [TYPE] (schemaValue: any = E.invalidArgument('schemaValue')) {
            if (!is.string(schemaValue))
                throw E.invalidSchemaPropType(TYPE, 'string', typeof schemaValue);
        },
        [CONSTRUCTOR_NAME] (schemaValue: any = E.invalidArgument('schemaValue')) {
            if (!is.string(schemaValue))
                throw E.invalidSchemaPropType(CONSTRUCTOR_NAME, 'string', typeof schemaValue);
        },
        [INSTANCE_OF] (schemaValue: any = E.invalidArgument('schemaValue')) {
            if (!is.objectInstance(schemaValue, 'Function'))
                throw E.invalidSchemaPropType(INSTANCE_OF, 'function', typeof schemaValue);
        },
        [PROPERTIES] (schemaValue: any = E.invalidArgument('schemaValue')) {
            if (!is.objectInstance(schemaValue, 'Array')
                || !schemaValue.every((e: any) => is.number(e) || is.string(e) || is.symbol(e)))
                throw E.invalidSchemaPropType(PROPERTIES, 'array', typeof schemaValue);
        },
        [MIN_PROP_COUNT] (schemaValue: any = E.invalidArgument('schemaValue')) {
            if (!is.number(schemaValue))
                throw E.invalidSchemaPropType(MIN_PROP_COUNT, 'number', typeof schemaValue);
        },
        [MAX_PROP_COUNT] (schemaValue: any = E.invalidArgument('schemaValue')) {
            if (!is.number(schemaValue))
                throw E.invalidSchemaPropType(MAX_PROP_COUNT, 'number', typeof schemaValue);
        }
    },
};
