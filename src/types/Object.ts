import { CONSTRUCTOR_NAME, INSTANCE_OF, PROPERTIES, SYM_TYPE_VALIDATE, TYPE } from '../constants';
import { E, isType } from '../utils/index';

export const TypeObject = {
    [TYPE] (base: string, value: any) {
        if (typeof value !== 'object' || !value) return `Value should be ${base} type. Got ${typeof value}.`;
    },
    [CONSTRUCTOR_NAME] (base: string, value: any) {
        if (Object.getPrototypeOf(value).constructor.name !== base)
            return `Value should be direct instance of ${base}.`;
    },
    [INSTANCE_OF] (base: () => void, value: any) {
        if (!(value instanceof base)) return `Value should be instance of ${base}.`;
    },
    [PROPERTIES] (base: string[], value: any) {
        if (base.length !== Object.keys(value).length)
            return `Value should have exactly ${base} keys.`;
        for (const key of base)
            if (!value.hasOwnProperty(key))
                return `Value should have ${key} property.`;
    },
    [SYM_TYPE_VALIDATE]: {
        [TYPE] (value: any = E.param()) {
            if (!isType.string(value)) E.typeValidateError(TYPE, 'string primitive', typeof value);
        },
        [CONSTRUCTOR_NAME] (value: any = E.param()) {
        if (!isType.string(value))
            E.typeValidateError(CONSTRUCTOR_NAME, 'string primitive', typeof value);
        },
        [INSTANCE_OF] (value: any = E.param()) {
        if (!isType.objectInstance(value, 'Function'))
            E.typeValidateError(INSTANCE_OF, 'Function', typeof value);
        },
        [PROPERTIES] (value: any = E.param()) {
            if (!isType.objectInstance(value, 'Array'))
                E.typeValidateError(PROPERTIES, 'Array', typeof value);
            if ((value as any[]).some((el) => !isType.string(el)))
                E.typeValidateError(PROPERTIES, 'string[]', `element of ${typeof (value as any[]).find((el) => !isType.string(el))} type`);
        },
    },
};
