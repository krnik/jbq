import { jbq, jbqTypes } from '../../src/main';

function example () {
    const schema = {
        type: 'object',
    };
    const validator = jbq(jbqTypes, { Object: schema });
    validator.Object({});
    // -> undefined
    validator.Object(new Map());
    // -> undefined
    validator.Object(null);
    // -> error message
    validator.Object([]);
    // -> error message
}
