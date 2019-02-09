import { jbq, jbqTypes } from '../../../src/main';

{
//example:every
const schema = {
    type: 'array',
    every: (element: any) => typeof element === 'number',
};
const validator = jbq(jbqTypes, { Array: schema });
validator.Array([]);
// -> undefined
validator.Array([1, 2, 3, NaN]);
// -> undefined
validator.Array([1, 2, 3, false]);
// -> error message
validator.Array({});
// -> error message
//example:every
}

{
//example:includes
const schema = {
    type: 'array',
    includes: true,
};
const validator = jbq(jbqTypes, { Array: schema });
validator.Array([false, false, true]);
// -> undefined
validator.Array([false, 1, {}]);
// -> error message
//example:includes
}

{
//example:len
const schemas = {
    Simple: {
        type: 'array',
        len: 2,
    },
    Min: {
        type: 'array',
        len: { min: 1 },
    },
    Max: {
        type: 'array',
        len: { max: 2 },
    },
    MinMax: {
        type: 'array',
        len: { min: 1, max: 5 },
    },
};
const validator = jbq(jbqTypes, schemas);
validator.Simple([true, false]);
// -> undefined
validator.Simple([]);
// -> error message

validator.Min([true]);
// -> undefined
validator.Min([]);
// -> error message

validator.Max([true, false]);
// -> undefined
validator.Max([1, 1, 1]);
// -> error message

validator.MinMax([1, 2, 3, 4, 5]);
// -> undefined
validator.MinMax([]);
// -> error message
validator.MinMax([1, 2, 3, 4, 5, 6]);
// -> error message
//example:len
}

{
//example:some
const schema = {
    type: 'array',
    some: (element: any) => element === 100,
};
const validator = jbq(jbqTypes, { Array: schema });
validator.Array([1, 10, 100]);
// -> undefined
validator.Array([]);
// -> error message
validator.Array([true, false]);
// -> error message
//example:some
}

{
//example:type
const schema = {
    type: 'array',
};
const validator = jbq(jbqTypes, { Array: schema });
validator.Array([]);
// -> undefined
validator.Array({});
// -> error message
validator.Array(true);
// -> error message
//example:type
}
