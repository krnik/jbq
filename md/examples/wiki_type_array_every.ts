import { jbq, jbqTypes } from '../../src/main';

function example () {
    const schema = {
        type: 'array',
        every: (element: any) => typeof element === 'number',
    };
    const validator = jbq(jbqTypes, { Array: schema });
    validator.Array([]);
    // -> undefined
    validator.Array([1, 2, 3, NaN]);
    // -> undefined
    validator.Array([1, 2, 3, false]);
    // -> error message
    validator.Array({});
    // -> error message
}
