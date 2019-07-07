import { equal } from 'assert';
import { ValidationError } from '../../src/core/jbq/jbq_typings';
import { jbq, types } from '../../src/lib';

const PROPS = Symbol.for('schema_properties');
const ITEMS = Symbol.for('schema_collection');
/* eslint-disable prettier/prettier */
const userSchema = {                //  Define `userSchema`
    type: 'object',                 //  ▶ that is an object
    properties: ['names', 'email'], //  ▶ that can have only two properies 'names' and 'email'
    [PROPS]: {                      //  ▶ those properties have following schemas
        names: {                    //  ⯁ `names` property:
            type: 'array',          //      ▷ is an array
            len: 2,                 //      ▷ that have length equal 2
            [ITEMS]: {              //      ▷ all items in this array
                type: 'string',     //      ▷ are a strings
            },                      //
        },                          //
        email: {                    //  ⯁ `email` property
            type: 'string',         //      ▷ is a string
        },                          //
    },                              //
};                                  //

const schemas = {
    User: userSchema,
    TwoChars: {                     //  Define `TwoChars` schema
        type: 'string',             //  ▶ that is a string
        len: 2,                     //  ▶ that have length equal 2
    },
};
/* eslint-enable prettier/prettier */
//example_region
const { TwoChars, User } = jbq(types, schemas);

equal(TwoChars('AA'), undefined);
equal(TwoChars('  '), undefined);

const error = TwoChars('') as ValidationError;

equal(typeof error, 'object');
equal(error.path, 'TwoChars/len');
equal(error.message, 'Data length should be equal to 2.');

equal(User({ email: 'STRING', names: ['Git', 'Hub'] }), undefined);
equal(typeof User({ email: false, names: ['A', 'B'] }), 'object');
equal(typeof User({ email: 'email', names: [] }), 'object');
equal(typeof User({ email: 'email', names: {} }), 'object');
equal(typeof User({ email: 'email', names: [true] }), 'object');
