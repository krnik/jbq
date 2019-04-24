import { jbq, jbqTypes } from '../../../src/main';

{
//example:required
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
//example:required
}

{
//example:type
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
//example:type
}
