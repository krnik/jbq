import { jbq, jbqTypes } from '../../src/main';

function example () {
    const schema = {
        type: 'array',
    };
    const validator = jbq(jbqTypes, { Array: schema });
    validator.Array([]);
    // -> undefined
    validator.Array({});
    // -> error message
    validator.Array(true);
    // -> error message
}
