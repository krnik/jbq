import { jbq, jbqTypes } from '../../src/main';

function example () {
    const schema = {
        type: 'array',
        includes: true,
    };
    const validator = jbq(jbqTypes, { Array: schema });
    validator.Array([false, false, true]);
    // -> undefined
    validator.Array([false, 1, {}]);
    // -> error message
}
