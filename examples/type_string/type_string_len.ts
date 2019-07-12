import { equal } from 'assert';
import { jbq, types } from '../../src/lib';

const schemas = {
    ExactLen: {
        type: 'string',
        len: 8,
    },
    MinMaxLen: {
        type: 'string',
        len: { min: 1, max: 16 },
    },
    // and so on...
};
const { ExactLen, MinMaxLen } = jbq(types, schemas);

equal(ExactLen('12345678'), undefined);
equal(typeof ExactLen('1234567890'), 'object');

equal(MinMaxLen('1 to 16'), undefined);
equal(typeof MinMaxLen(''), 'object');
