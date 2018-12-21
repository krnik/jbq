import { jbq, jbqTypes } from '../../src/main';

function example () {
    const schemas = {
        Simple: {
            type: 'number',
            value: 10,
        },
        Min: {
            type: 'number',
            value: { min: 0 },
        },
        Max: {
            type: 'number',
            value: { max: 100 },
        },
        MinMax: {
            type: 'number',
            value: { min: 0, max: 100 },
        },
    };
    const validator = jbq(jbqTypes, schemas);
    validator.Simple(10);
    // -> undefined
    validator.Simple(9);
    // -> error message

    validator.Min(0);
    // -> undefined
    validator.Min(-10);
    // -> error message

    validator.Max(100);
    // -> undefined
    validator.Max(110);
    // -> error message

    validator.MinMax(0);
    // -> undefined
    validator.MinMax(100);
    // -> undefined
    validator.MinMax(101);
    // -> erorr message
}
