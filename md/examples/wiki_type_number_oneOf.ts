import { jbq, jbqTypes } from '../../src/main';

function example () {
    const schema = {
        type: 'number',
        oneOf: [2, 4, 8, 16],
    };
    const validator = jbq(jbqTypes, { Number: schema });
    validator.Number(2);
    // -> undefined
    validator.Number(1);
    // -> error message
}
