import { LEN, MAX_LEN, MIN_LEN, REGEX, SYM_TYPE_VALIDATE } from '../constants';
import { E, isType } from '../utils/index';

export const TypeString = {
    [MIN_LEN] (base: number, value: any) {
        if (value.length < base) throw { args: { base, value }, msg: E.msg.validationError(MIN_LEN) };
    },
    [MAX_LEN] (base: number, value: any) {
        if (value.length > base) throw { args: { base, value }, msg: E.msg.validationError(MAX_LEN) };
    },
    [REGEX] (base: RegExp, value: any) {
        if (!base.test(value)) throw { args: { base, value }, msg: E.msg.validationError(REGEX) };
    },
    [LEN] (base: number, value: any) {
        if (value.length !== base) throw { args: { base, value }, msg: E.msg.validationError(LEN) };
    },
    [SYM_TYPE_VALIDATE]: {
        [MIN_LEN] (value: any) {
            if (!isType.number(value))
                E.typeValidateError(MIN_LEN, 'number primitive', typeof(value));
        },
        [MAX_LEN] (value: any) {
            if (!isType.number(value))
                E.typeValidateError(MAX_LEN, 'number primitive', typeof(value));
        },
        [REGEX] (value: any) {
            if (!isType.objectInstance(value, 'RegExp'))
                E.typeValidateError(REGEX, 'RegExp', typeof(value));
        },
        [LEN] (value: any) {
            if (!isType.number(value))
                E.typeValidateError(LEN, 'number primitive', typeof(value));
        },
    },
};
