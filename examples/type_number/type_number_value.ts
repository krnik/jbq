import { equal } from 'assert';
import { jbq, types } from '../../src/lib';

const schemas = {
    ExactValue: {
        type: 'number',
        value: 10,
    },
    MinValue: {
        type: 'number',
        value: { min: 0 },
    },
    MaxValue: {
        type: 'number',
        value: { max: 100 },
    },
    MinMaxValue: {
        type: 'number',
        value: { min: 0, max: 100 },
    },
};
const { ExactValue, MinValue, MaxValue, MinMaxValue } = jbq(types, schemas);

equal(ExactValue(10), undefined);
equal(typeof ExactValue(9), 'object');

equal(MinValue(0), undefined);
equal(typeof MinValue(-10), 'object');

equal(MaxValue(100), undefined);
equal(typeof MaxValue(110), 'object');

equal(MinMaxValue(0), undefined);
equal(MinMaxValue(100), undefined);
equal(typeof MinMaxValue(101), 'object');
