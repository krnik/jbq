import { TYPE_METHOD } from '../constants';
import { E } from '../utils/index';
import { IParsedProp } from './index';
const { TYPE, VALIDATE, PARSE } = TYPE_METHOD;

const root = {} as any;
root[TYPE] = function type (base: string, value: any) {
    return base === typeof value;
};
root[VALIDATE] = {
    [TYPE] (value: any = E.param()) {
        if (value === Object(value) || typeof(value) !== 'string')
            E.validateTypeError(TYPE, typeof(value));
    },
};
root[PARSE] = {
    [TYPE] (key: string = E.param(), value: any = E.param()): IParsedProp {
        return {
            base: value,
            check: this[key],
        };
    },
};

export default root;
