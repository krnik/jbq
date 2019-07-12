import { equal } from 'assert';
import { jbq, types } from '../../src/lib';

const schema = { type: 'string', oneOf: ['user', 'guest'] };
const { OneOf } = jbq(types, { OneOf: schema });

equal(OneOf('user'), undefined);
equal(typeof OneOf('admin'), 'object');
