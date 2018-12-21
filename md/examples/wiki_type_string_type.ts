import { jbq, jbqTypes } from '../../src/main';

function example () {
    const schema = {
        type: 'string',
    };
    const validator = jbq(jbqTypes, { String: schema });
    validator.String('');
    // -> undefined
    validator.String(new String('Hello!'));
    // -> error message
}
