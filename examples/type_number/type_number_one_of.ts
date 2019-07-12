import { jbq, types } from '../../src/lib';
import { equal } from 'assert';

const schema = { type: 'number', oneOf: [2, 4, 8, 16] };
const { OneOf } = jbq(types, { OneOf: schema });

equal(OneOf(2), undefined);
equal(typeof OneOf(1), 'object');
