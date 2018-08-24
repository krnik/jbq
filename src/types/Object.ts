import { CONSTRUCTOR_NAME, INSTANCE_OF, PROPERTIES, SYM_TYPE_VALIDATE, TYPE } from '../constants';
import { E, is } from '../utils/index';

export const TypeObject = {
    [TYPE] (base: string, data: any) {
        if (!(data && typeof data === 'object'))
            return `Data should be ${base} type. Got ${typeof data}.`;
    },
    [CONSTRUCTOR_NAME] (base: string, data: any) {
        if (Object.getPrototypeOf(data).constructor.name !== base)
            return `Data should be direct instance of ${base}.`;
    },
    [INSTANCE_OF] (base: () => void, data: any) {
        if (!(data instanceof base))
            return `Data should be instance of ${base}.`;
    },
    [PROPERTIES] (base: Array<(string | number | symbol)>, data: any) {
        const keys = [
            ...Object.getOwnPropertyNames(data),
            ...Object.getOwnPropertySymbols(data),
        ];
        if (base.length !== keys.length)
            return `Data should have exactly ${base} keys.`;
        for (const key of base)
            if (!data.hasOwnProperty(key))
                return `Data should have ${key.toString()} property.`;
    },
    [SYM_TYPE_VALIDATE]: {
        [TYPE] (value: any = E.invalidArgument('value')) {
            if (!is.string(value))
                E.invalidSchemaPropType(TYPE, 'string', typeof value);
        },
        [CONSTRUCTOR_NAME] (value: any = E.invalidArgument('value')) {
            if (!is.string(value))
                E.invalidSchemaPropType(CONSTRUCTOR_NAME, 'string', typeof value);
        },
        [INSTANCE_OF] (value: any = E.invalidArgument('value')) {
            if (!is.objectInstance(value, 'Function'))
                E.invalidSchemaPropType(INSTANCE_OF, 'function', typeof value);
        },
        [PROPERTIES] (value: any = E.invalidArgument('value')) {
            if (!is.objectInstance(value, 'Array') ||
                !value.every((e: any) => is.number(e) || is.string(e) || is.symbol(e)))
                E.invalidSchemaPropType(PROPERTIES, 'array', typeof value);
        },
    },
};
