/* tslint:disable */
import { jbq, jbqTypes } from '../../../src/main';


{
    const schemas = {};
    const options = {};
    //example:use
    const { jbq, jbqTypes } = require('jbq');
    jbq(jbqTypes, schemas, options);
    //example:use
}


// TODO: replace PROPS with exported symbol from constants
// TODO: replace ITEMS with exported symbol from constants
{
//example:schema
const PROPS = Symbol.for('schema_properties');
const ITEMS = Symbol.for('schema_collection');
const userSchema = {                //  Define `userSchema`
    type: 'object',                 //  ▶ that is an object
    keys: ['names', 'email'],       //  ▶ that must have only two properies 'names' and 'email'
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

// Create validation functions with the names of schemas.
const { User, TwoChars } = jbq(jbqTypes, schemas);

TwoChars('22'); // -> undefined: no error occured, data is valid
TwoChars('');   // -> error message as JSON string format

User({ email: 'just a string', names: ['Git', 'Hub'] });
// -> undefined: no error occured, data is valid
User({
    email: 'a string',
    names: ['Git', new String('Hub')],
});
// -> error message saying that not all of `names` elements are string primitives
//example:schema
}

//example:datapathObject
const data = {
    breakfast: {
        egg: 10.25,
        tea: 5.0,
    },
};
//example:datapathObject

//example:datapathUse
const egg = {   // data.breakfast.egg will be matched
    $dataPath: 'breakfast/egg',
};
const tea = {   // data.breakfast.tea will be matched
    $dataPath: 'breakfast/tea',
};
//example:datapathUse

//example:datapath
const PROPS = Symbol.for('schema_properties');
const menuSchema = {
    type: 'object',
    [PROPS]: {
        colors: {
            type: 'array',
            includes: {
                $dataPath: 'mainColor',
            },
        },
    },
};

const validator = jbq(jbqTypes, { Menu: menuSchema });

validator.Menu({
    colors: ['red', 'green', 'blue'],
    mailColor: 'red',
});
// -> undefined

validator.Menu({
    colors: ['yellow', 'blue'],
    mainColor: 'red',
});
// -> error message
//example:datapath
