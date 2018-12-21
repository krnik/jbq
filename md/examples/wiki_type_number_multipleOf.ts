import { jbq, jbqTypes } from '../../src/main';

function example () {
    const schema = {
        type: 'number',
        multipleOf: 1,
    };
    const validator = jbq(jbqTypes, { Number: schema });
    validator.Number(10);
    // -> undefined
    validator.Number(0);
    // -> undefined
    validator.Number(1.1);
    // -> error message
    validator.Number(Math.PI);
    // -> error message
}
