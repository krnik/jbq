import { equal } from 'assert';
import { jbq, types } from '../../src/lib';

const schema = { type: 'string', regex: /@/ };
const { Regex } = jbq(types, { Regex: schema });

equal(Regex('my@mail'), undefined);
equal(typeof Regex(''), 'object');
