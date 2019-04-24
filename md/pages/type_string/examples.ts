import { jbq, jbqTypes } from '../../../src/main';

{
//example:len
const schemas = {
    Simple: {
        type: 'string',
        len: 8,
    },
    // ...
    MinMax: {
        type: 'string',
        len: { min: 1, max: 16 },
    },
};
const validator = jbq(jbqTypes, schemas);
validator.Simple('12345678');
// -> undefined
validator.Simple('1234567890');
// -> error message

validator.MinMax('1 to 16');
// -> undefined
validator.MinMax('');
// -> error message
//example:len
}

{
//example:oneOf
const schema = {
    type: 'string',
    oneOf: ['user', 'guest'],
};
const validator = jbq(jbqTypes, { String: schema });
validator.String('user');
// -> undefined
validator.String('admin');
// -> error message
//example:oneOf
}

{
//example:regex
const schema = {
    type: 'string',
    regex: /@/,
};
const validator = jbq(jbqTypes, { String: schema });
validator.String('my@mail');
// -> undefined
validator.String('');
// -> error message
//example:regex
}

{
//example:type
const schema = {
    type: 'string',
};
const validator = jbq(jbqTypes, { String: schema });
validator.String('');
// -> undefined
validator.String(new String('Hello!'));
// -> error message
//example:type
}
