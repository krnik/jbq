import { jbq, jbqTypes } from '../../../src/main';

{
//example:constructorName
const schema = {
    type: 'object',
    constructorName: 'Set',
};
const validator = jbq(jbqTypes, { Object: schema });
validator.Object(new Set());
// -> undefined
validator.Object({});
// -> error message
//example:constructorName
}

{
//example:instanceOf
const schema = {
    type: 'object',
    instanceOf: Map,
};
const validator = jbq(jbqTypes, { Object: schema });
validator.Object(new Map());
// -> undefined
validator.Object(new Set());
// -> error message
//example:instanceOf
}

{
//example:keyCount
const schemas = {
    Simple: {
        type: 'object',
        keyCount: 0,
    },
    Min: {
        type: 'object',
        keyCount: { min: 0 },
    },
    Max: {
        type: 'object',
        keyCount: { max: 1 },
    },
    MinMax: {
        type: 'object',
        keyCount: { min: 1, max: 2 },
    },
};
const validator = jbq(jbqTypes, schemas);
validator.Simple({});
// -> undefined
validator.Simple({ key: 'value' });
// -> error message

validator.Min({});
// -> undefined

validator.Max({ hello: 'world' });
// -> undefined
validator.Max({ a: 0, b: 0 });
// -> error message

validator.MinMax({ hello: 'world' });
// -> undefined
validator.MinMax({ hello: 'there', general: 'Kenobi' });
// -> error message
//example:keyCount
}

{
//example:propCount
const schemas = {
    Simple: {
        type: 'object',
        propCount: 1,
    },
    Min: {
        type: 'object',
        propCount: { min: 1 },
    },
    // ...
};
const validator = jbq(jbqTypes, schemas);
validator.Simple({ [Symbol()]: true });
// -> undefined
validator.Simple({
    [Symbol('meta_1')]: true,
    [Symbol('meta_2')]: false,
    data: {},
});
// -> error message

validator.Min({ key: 'value' });
// -> undefined
validator.Min({});
// -> error message
//example:propCount
}

{
//example:properties
const schema = {
    type: 'object',
    properties: ['hello'],
};
const validator = jbq(jbqTypes, { Object: schema });
validator.Object({ hello: 'World' });
// -> undefined
validator.Object({ world: 'hello' });
// -> error message
//example:properties
}

{
//example:type
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
//example:type
}
