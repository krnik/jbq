import { jbq, jbqTypes } from '../../src/main';

function example () {
    const schema = {
        type: 'any',
    };
    const validator = jbq(jbqTypes, { Any: schema });
    validator.Any({});
    // -> undefined
    validator.Any([]);
    // -> undefined
    validator.Any(undefined);
    // -> undefined
    validator.Any('STRING!');
    // -> undefined
}
