import { jbq, types } from '../../src/lib';
import { equal } from 'assert';

const schemaType = { type: 'number' };
const { NumberType } = jbq(types, { NumberType: schemaType });

equal(NumberType(100), undefined);
equal(typeof NumberType(NaN), 'object');
equal(typeof NumberType('10'), 'object');

//example_region

const schemas = {
    SimpleValue: {
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
const { SimpleValue, MinValue, MaxValue, MinMaxValue } = jbq(types, schemas);

equal(SimpleValue(10), undefined);
equal(typeof SimpleValue(9), 'object');

equal(MinValue(0), undefined);
equal(typeof MinValue(-10), 'object');

equal(MaxValue(100), undefined);
equal(typeof MaxValue(110), 'object');

equal(MinMaxValue(0), undefined);
equal(MinMaxValue(100), undefined);
equal(typeof MinMaxValue(101), 'object');

//example_region

const schemaMultipleOf = { type: 'number', multipleOf: 1 };
const { NumberMultipleOf } = jbq(types, { NumberMultipleOf: schemaMultipleOf });

equal(NumberMultipleOf(10), undefined);
equal(NumberMultipleOf(0), undefined);
equal(typeof NumberMultipleOf(1.1), 'object');
equal(typeof NumberMultipleOf(Math.PI), 'object');

//example_region

const schemaOneOf = { type: 'number', oneOf: [2, 4, 8, 16] };
const { NumberOneOf } = jbq(types, { NumberOneOf: schemaOneOf });

equal(NumberOneOf(2), undefined);
equal(typeof NumberOneOf(1), 'object');
