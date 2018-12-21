import { jbq, jbqTypes } from '../../src/main';

function example () {
    const schemas = {
        Simple: {
            type: 'string',
            len: 8,
        },
        // ...
        MinMax: {
            type: 'string',
            len: { min: 1, max: 16 },
        },
    };
    const validator = jbq(jbqTypes, schemas);
    validator.Simple('12345678');
    // -> undefined
    validator.Simple('1234567890');
    // -> error message

    validator.MinMax('1 to 16');
    // -> undefined
    validator.MinMax('');
    // -> error message
}
