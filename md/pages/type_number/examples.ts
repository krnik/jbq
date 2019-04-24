import { jbq, jbqTypes } from '../../../src/main';

{
//example:multipleOf
const schema = {
    type: 'number',
    multipleOf: 1,
};
const validator = jbq(jbqTypes, { Number: schema });
validator.Number(10);
// -> undefined
validator.Number(0);
// -> undefined
validator.Number(1.1);
// -> error message
validator.Number(Math.PI);
// -> error message
//example:multipleOf
}

{
//example:oneOf
const schema = {
    type: 'number',
    oneOf: [2, 4, 8, 16],
};
const validator = jbq(jbqTypes, { Number: schema });
validator.Number(2);
// -> undefined
validator.Number(1);
// -> error message
//example:oneOf
}

{
//example:type
const schema = {
    type: 'number',
};
const validator = jbq(jbqTypes, { Number: schema });
validator.Number(100);
// -> undefined
validator.Number(NaN);
// -> error message
validator.Number('10');
// -> error message
//example:type
}

{
//example:value
const schemas = {
    Simple: {
        type: 'number',
        value: 10,
    },
    Min: {
        type: 'number',
        value: { min: 0 },
    },
    Max: {
        type: 'number',
        value: { max: 100 },
    },
    MinMax: {
        type: 'number',
        value: { min: 0, max: 100 },
    },
};
const validator = jbq(jbqTypes, schemas);
validator.Simple(10);
// -> undefined
validator.Simple(9);
// -> error message

validator.Min(0);
// -> undefined
validator.Min(-10);
// -> error message

validator.Max(100);
// -> undefined
validator.Max(110);
// -> error message

validator.MinMax(0);
// -> undefined
validator.MinMax(100);
// -> undefined
validator.MinMax(101);
// -> erorr message
//example:value
}
