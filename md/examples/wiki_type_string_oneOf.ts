import { jbq, jbqTypes } from '../../src/main';

function example () {
    const schema = {
        type: 'string',
        oneOf: ['user', 'guest'],
    };
    const validator = jbq(jbqTypes, { String: schema });
    validator.String('user');
    // -> undefined
    validator.String('admin');
    // -> error message
}
