import { jbq, jbqTypes } from '../../src/main';

function example () {
    const schema = {
        type: 'object',
        constructorName: 'Set',
    };
    const validator = jbq(jbqTypes, { Object: schema });
    validator.Object(new Set());
    // -> undefined
    validator.Object({});
    // -> error message
}
