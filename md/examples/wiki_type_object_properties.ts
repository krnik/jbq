import { jbq, jbqTypes } from '../../src/main';

function example () {
    const schema = {
        type: 'object',
        properties: ['hello'],
    };
    const validator = jbq(jbqTypes, { Object: schema });
    validator.Object({ hello: 'World' });
    // -> undefined
    validator.Object({ world: 'hello' });
    // -> error message
}
