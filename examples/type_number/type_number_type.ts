import { equal } from 'assert';
import { jbq, types } from '../../src/lib';

const schema = { type: 'number' };
const { Type } = jbq(types, { Type: schema });

equal(Type(100), undefined);
equal(typeof Type(NaN), 'object');
equal(typeof Type('10'), 'object');
