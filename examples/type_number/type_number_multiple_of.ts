import { equal } from 'assert';
import { jbq, types } from '../../src/lib';

const schema = { type: 'number', multipleOf: 1 };
const { MultipleOf } = jbq(types, { MultipleOf: schema });

equal(MultipleOf(10), undefined);
equal(MultipleOf(0), undefined);
equal(typeof MultipleOf(1.1), 'object');
equal(typeof MultipleOf(Math.PI), 'object');
