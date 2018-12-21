import { jbq, jbqTypes } from '../../src/main';

function example () {
    const schemas = {
        Simple: {
            type: 'array',
            len: 2,
        },
        Min: {
            type: 'array',
            len: { min: 1 },
        },
        Max: {
            type: 'array',
            len: { max: 2 },
        },
        MinMax: {
            type: 'array',
            len: { min: 1, max: 5 },
        },
    };
    const validator = jbq(jbqTypes, schemas);
    validator.Simple([true, false]);
    // -> undefined
    validator.Simple([]);
    // -> error message

    validator.Min([true]);
    // -> undefined
    validator.Min([]);
    // -> error message

    validator.Max([true, false]);
    // -> undefined
    validator.Max([1, 1, 1]);
    // -> error message

    validator.MinMax([1, 2, 3, 4, 5]);
    // -> undefined
    validator.MinMax([]);
    // -> error message
    validator.MinMax([1, 2, 3, 4, 5, 6]);
    // -> error message
}
