import { jbq, jbqTypes } from '../../src/main';

function example () {
    const schema = {
        type: 'object',
        instanceOf: Map,
    };
    const validator = jbq(jbqTypes, { Object: schema });
    validator.Object(new Map());
    // -> undefined
    validator.Object(new Set());
    // -> error message
}
