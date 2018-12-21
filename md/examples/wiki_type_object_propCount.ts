import { jbq, jbqTypes } from '../../src/main';

function example () {
    const schemas = {
        Simple: {
            type: 'object',
            propCount: 1,
        },
        Min: {
            type: 'object',
            propCount: { min: 1 },
        },
        // ...
    };
    const validator = jbq(jbqTypes, schemas);
    validator.Simple({ [Symbol()]: true });
    // -> undefined
    validator.Simple({
        [Symbol('meta_1')]: true,
        [Symbol('meta_2')]: false,
        data: {},
    });
    // -> error message

    validator.Min({ key: 'value' });
    // -> undefined
    validator.Min({});
    // -> error message
}
