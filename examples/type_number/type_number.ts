import { jbq, jbqTypes } from '../../src/lib';
import { equal } from 'assert';

const schemaType = { type: 'number' };
const { NumberType } = jbq(jbqTypes, { NumberType: schemaType });

equal(NumberType(100), undefined);
equal(typeof NumberType(NaN), 'string');
equal(typeof NumberType('10'), 'string');

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
const { SimpleValue, MinValue, MaxValue, MinMaxValue } = jbq(jbqTypes, schemas);

equal(SimpleValue(10), undefined);
equal(typeof SimpleValue(9), 'string');

equal(MinValue(0), undefined);
equal(typeof MinValue(-10), 'string');

equal(MaxValue(100), undefined);
equal(typeof MaxValue(110), 'string');

equal(MinMaxValue(0), undefined);
equal(MinMaxValue(100), undefined);
equal(typeof MinMaxValue(101), 'string');

//example_region

const schemaMultipleOf = { type: 'number', multipleOf: 1 };
const { NumberMultipleOf } = jbq(jbqTypes, { NumberMultipleOf: schemaMultipleOf });

equal(NumberMultipleOf(10), undefined);
equal(NumberMultipleOf(0), undefined);
equal(typeof NumberMultipleOf(1.1), 'string');
equal(typeof NumberMultipleOf(Math.PI), 'string');

//example_region

const schemaOneOf = { type: 'number', oneOf: [2, 4, 8, 16] };
const { NumberOneOf } = jbq(jbqTypes, { NumberOneOf: schemaOneOf });

equal(NumberOneOf(2), undefined);
equal(typeof NumberOneOf(1), 'string');
