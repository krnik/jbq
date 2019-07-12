import { jbq, types } from '../../src/lib';
import { equal } from 'assert';

const schema = { type: 'boolean', value: true };
const { Value } = jbq(types, { Value: schema });

equal(Value(true), undefined);
equal(typeof Value(false), 'object');
