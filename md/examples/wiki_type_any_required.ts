import { jbq, jbqTypes } from '../../src/main';

function example () {
    const schema = {
        type: 'any',
        required: true,
    };
    const validator = jbq(jbqTypes, { Any: schema });
    validator.Any(true);
    // -> undefined
    validator.Any({});
    // -> undefined
    validator.Any(undefined);
    // -> error message
}
