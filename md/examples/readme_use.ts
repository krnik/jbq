import { jbq, jbqTypes } from '../../src/main';

function example () {
    const PROPS = Symbol.for('schema_properties');
    const ITEMS = Symbol.for('schema_collection');
    const schemas = {
        // User schema expects value to be an object
        // with properties ['names', 'email']
        // 'name' property will be an array of string with 2 elements
        User: {
            type: 'object',
            properties: ['name', 'email'],
            [PROPS]: {
                names: {
                    type: 'array',
                    len: 2,
                    [ITEMS]: {
                        type: 'string',
                    },
                },
                email: {
                    type: 'string',
                },
            },
        },
        // TwoChars will be an string that will contain only 2 characters
        TwoChars: {
            type: 'string',
            len: 2,
        },
    };

    const { User, TwoChars } = jbq(jbqTypes, schemas);

    TwoChars('22');
    // -> undefined: no error occured, data is valid
    TwoChars('');
    // -> error message as JSON string format

    const userDataValid = {
        email: 'just a string, no more requirements specified in schema',
        names: ['Git', 'Hub'],
    };
    User(userDataValid);
    // -> undefined: no error occured, data is valid

    const userDataInvalid = {
        email: 'a string',
        names: ['Git', new String('Hub')],
    };
    User(userDataInvalid);
    // -> error message saying that not all of `names` elements are string primitives
}
