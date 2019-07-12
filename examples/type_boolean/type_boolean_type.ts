import { jbq, types } from '../../src/lib';
import { equal } from 'assert';

const schema = { type: 'boolean' };
const { Type } = jbq(types, { Type: schema });

equal(Type(true), undefined);
equal(typeof Type(0), 'object');
