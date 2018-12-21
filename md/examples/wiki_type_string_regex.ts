import { jbq, jbqTypes } from '../../src/main';

function example () {
    const schema = {
        type: 'string',
        regex: /@/,
    };
    const validator = jbq(jbqTypes, { String: schema });
    validator.String('my@mail');
    // -> undefined
    validator.String('');
    // -> error message
}
