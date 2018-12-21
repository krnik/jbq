import { jbq, jbqTypes } from '../../src/main';

function example () {
    const schema = {
        type: 'number',
    };
    const validator = jbq(jbqTypes, { Number: schema });
    validator.Number(100);
    // -> undefined
    validator.Number(NaN);
    // -> error message
    validator.Number('10');
    // -> error message
}
