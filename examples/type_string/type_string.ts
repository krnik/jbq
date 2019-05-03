import { jbq, jbqTypes } from '../../src/lib';
import { equal } from 'assert';

const schemaType = { type: 'string' };
const { StringType } = jbq(jbqTypes, { StringType: schemaType });

equal(StringType(''), undefined);
equal(typeof StringType(new String('Hello!')), 'string');

//example_region

const schemaRegex = { type: 'string', regex: /@/ };
const { StringRegex } = jbq(jbqTypes, { StringRegex: schemaRegex });

equal(StringRegex('my@mail'), undefined);
equal(typeof StringRegex(''), 'string');

//example_region

const schemaOneOf = { type: 'string', oneOf: ['user', 'guest'] };
const { StringOneOf } = jbq(jbqTypes, { StringOneOf: schemaOneOf });

equal(StringOneOf('user'), undefined);
equal(typeof StringOneOf('admin'), 'string');

//example_region

const schemasLen = {
    SimpleLen: {
        type: 'string',
        len: 8,
    },
    MinMaxLen: {
        type: 'string',
        len: { min: 1, max: 16 },
    },
    // and so on...
};
const { SimpleLen, MinMaxLen } = jbq(jbqTypes, schemasLen);

equal(SimpleLen('12345678'), undefined);
equal(typeof SimpleLen('1234567890'), 'string');

equal(MinMaxLen('1 to 16'), undefined);
equal(typeof MinMaxLen(''), 'string');
