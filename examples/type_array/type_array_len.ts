import { jbq, types } from '../../src/lib';
import { equal } from 'assert';

const schemasLen = {
    ExactLen: {
        type: 'array',
        len: 2,
    },
    MinLen: {
        type: 'array',
        len: { min: 1 },
    },
    MaxLen: {
        type: 'array',
        len: { max: 2 },
    },
    MinMaxLen: {
        type: 'array',
        len: { min: 1, max: 5 },
    },
};

const { ExactLen, MinLen, MaxLen, MinMaxLen } = jbq(types, schemasLen);

equal(ExactLen([true, false]), undefined);
equal(typeof ExactLen([]), 'object');

equal(MinLen([true]), undefined);
equal(typeof MinLen([]), 'object');

equal(MaxLen([true, false]), undefined);
equal(typeof MaxLen([1, 1, 1]), 'object');

equal(MinMaxLen([1, 2, 3, 4, 5]), undefined);
equal(typeof MinMaxLen([]), 'object');
equal(typeof MinMaxLen([1, 2, 3, 4, 5, 6]), 'object');
