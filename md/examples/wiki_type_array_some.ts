import { jbq, jbqTypes } from '../../src/main';

function example () {
    const schema = {
        type: 'array',
        some: (element: any) => element === 100,
    };
    const validator = jbq(jbqTypes, { Array: schema });
    validator.Array([1, 10, 100]);
    // -> undefined
    validator.Array([]);
    // -> error message
    validator.Array([true, false]);
    // -> error message
}
