import { jbq, jbqTypes } from '../../src/main';

function example () {
    const schemas = {
        Simple: {
            type: 'object',
            keyCount: 0,
        },
        Min: {
            type: 'object',
            keyCount: { min: 0 },
        },
        Max: {
            type: 'object',
            keyCount: { max: 1 },
        },
        MinMax: {
            type: 'object',
            keyCount: { min: 1, max: 2 },
        },
    };
    const validator = jbq(jbqTypes, schemas);
    validator.Simple({});
    // -> undefined
    validator.Simple({ key: 'value' });
    // -> error message

    validator.Min({});
    // -> undefined

    validator.Max({ hello: 'world' });
    // -> undefined
    validator.Max({ a: 0, b: 0 });
    // -> error message

    validator.MinMax({ hello: 'world' });
    // -> undefined
    validator.MinMax({ hello: 'there', general: 'Kenobi' });
    // -> error message
}
