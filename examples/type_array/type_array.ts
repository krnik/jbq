import { jbq, jbqTypes } from '../../src/lib';
import { equal } from 'assert';

const schemaType = { type: 'array' };
const { ArrayType } = jbq(jbqTypes, { ArrayType: schemaType });

equal(ArrayType([]), undefined);
equal(typeof ArrayType({}), 'string');
equal(typeof ArrayType(true), 'string');

//example_region

const schemaEvery = {
    type: 'array',
    every: (element: unknown): boolean => typeof element === 'number' && element === element,
};
const { ArrayEvery } = jbq(jbqTypes, { ArrayEvery: schemaEvery });

equal(ArrayEvery([]), undefined);
equal(typeof ArrayEvery([1, 2, 3, NaN]), 'string');
equal(typeof ArrayEvery([1, 2, 3, false]), 'string');
equal(typeof ArrayEvery({}), 'string');

//example_region

const schemaSome = {
    type: 'array',
    some: (element: unknown): boolean => element === 100,
};
const { ArraySome } = jbq(jbqTypes, { ArraySome: schemaSome });

equal(ArraySome([1, 10, 100]), undefined);
equal(ArraySome([]), undefined);
equal(typeof ArraySome([true, false]), 'string');

//example_region

const schemaIncludes = { type: 'array', includes: true };
const { ArrayIncludes } = jbq(jbqTypes, { ArrayIncludes: schemaIncludes });

equal(ArrayIncludes([false, false, true]), undefined);
equal(typeof ArrayIncludes([false, 1, {}]), 'string');

//example_region

const schemasLen = {
    SimpleLen: {
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
const { SimpleLen, MinLen, MaxLen, MinMaxLen } = jbq(jbqTypes, schemasLen);

equal(SimpleLen([true, false]), undefined);
equal(typeof SimpleLen([]), 'string');

equal(MinLen([true]), undefined);
equal(typeof MinLen([]), 'string');

equal(MaxLen([true, false]), undefined);
equal(typeof MaxLen([1, 1, 1]), 'string');

equal(MinMaxLen([1, 2, 3, 4, 5]), undefined);
equal(typeof MinMaxLen([]), 'string');
equal(typeof MinMaxLen([1, 2, 3, 4, 5, 6]), 'string');
