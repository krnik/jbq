import { equal } from 'assert';
import { jbq, types } from '../../src/lib';

const schema = { type: 'string' };
const { Type } = jbq(types, { Type: schema });

equal(Type(''), undefined);
equal(typeof Type(new String('Hello!')), 'object');
