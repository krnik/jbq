import { equal } from 'assert';
import { jbq, SYM_COLLECTION, SYM_PROPERTIES, types } from '../../src/lib';

/* eslint-disable prettier/prettier */
const userSchema = {                //  Define `userSchema`
    type: 'object',                 //  ▶ that is an object
    properties: ['names', 'email'], //  ▶ that can have only two properies 'names' and 'email'
    [SYM_PROPERTIES]: {             //  ▶ properties of this object have following schemas
        names: {                    //  ⯁ `names` property:
            type: 'array',          //      ▷ is an array
            len: 2,                 //      ▷ that have length equal 2
            [SYM_COLLECTION]: {     //      ▷ all items in this array
                type: 'string',     //      ▷ are strings
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

const { TwoChars, User } = jbq(types, schemas);

equal(TwoChars('AA'), undefined);
equal(TwoChars('  '), undefined);
equal(typeof TwoChars('Kenobi'), 'object');

const validUsers = [
    { email: 'some_string', names: ['Git', 'Hub'] },
    { email: '', names: ['John', 'Doe'] },
];
validUsers.forEach(
    (userData): void => {
        equal(User(userData), undefined);
    },
);

const invalidUsers = [
    { names: ['A', 'B'] },
    { email: 'test@test.com', names: [] },
    { email: 'test@test.com', names: ['Boolean', true] },
];
invalidUsers.forEach(
    (userData): void => {
        equal(typeof User(userData), 'object');
    },
);
