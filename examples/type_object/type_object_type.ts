import { equal } from 'assert';
import { jbq, types } from '../../src/lib';

const schema = { type: 'object' };
const { Type } = jbq(types, { Type: schema });

equal(Type({}), undefined);
equal(Type(new Map()), undefined);
equal(typeof Type(null), 'object');
equal(typeof Type([]), 'object');
