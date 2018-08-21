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
    [PROPERTIES] (base: string[], data: any) {
        if (base.length !== Object.keys(data).length)
            return `Data should have exactly ${base} keys.`;
        for (const key of base)
            if (!data.hasOwnProperty(key))
                return `Data should have ${key} property.`;
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
            if (!is.objectInstance(value, 'Array'))
                E.invalidSchemaPropType(PROPERTIES, 'array', typeof value);
        },
    },
};
