import { CONSTRUCTOR_NAME, INSTANCE_OF, PROPERTIES, SYM_TYPE_VALIDATE, TYPE } from '../constants';
import { E, is } from '../utils/index';

export const TypeObject = {
    // @ts-ignore
    [TYPE] (schemaValue: string, data: any) {
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
        const keys = [
            ...Object.getOwnPropertyNames(data),
            ...Object.getOwnPropertySymbols(data),
        ];
        if (schemaValue.length !== keys.length)
            return `Data should have exactly all #{schemaValue.toString()} keys.`;
        for (const key of schemaValue)
            if (!data.hasOwnProperty(key))
                return `Data should have ${key.toString()} property.`;
    },
    [SYM_TYPE_VALIDATE]: {
        [TYPE] (schemaValue: any = E.invalidArgument('schemaValue')) {
            if (!is.string(schemaValue))
                E.invalidSchemaPropType(TYPE, 'string', typeof schemaValue);
        },
        [CONSTRUCTOR_NAME] (schemaValue: any = E.invalidArgument('schemaValue')) {
            if (!is.string(schemaValue))
                E.invalidSchemaPropType(CONSTRUCTOR_NAME, 'string', typeof schemaValue);
        },
        [INSTANCE_OF] (schemaValue: any = E.invalidArgument('schemaValue')) {
            if (!is.objectInstance(schemaValue, 'Function'))
                E.invalidSchemaPropType(INSTANCE_OF, 'function', typeof schemaValue);
        },
        [PROPERTIES] (schemaValue: any = E.invalidArgument('schemaValue')) {
            if (!is.objectInstance(schemaValue, 'Array') ||
                !schemaValue.every((e: any) => is.number(e) || is.string(e) || is.symbol(e)))
                E.invalidSchemaPropType(PROPERTIES, 'array', typeof schemaValue);
        },
    },
};
