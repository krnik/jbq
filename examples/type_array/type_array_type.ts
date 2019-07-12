import { jbq, types } from '../../src/lib';
import { equal } from 'assert';

const schemaType = { type: 'array' };
const { Type } = jbq(types, { Type: schemaType });

equal(Type([]), undefined);
equal(typeof Type({}), 'object');
equal(typeof Type(true), 'object');
