import { jbq, types } from '../../src/lib';
import { equal } from 'assert';

const schema = { type: 'array', includes: true };
const { Includes } = jbq(types, { Includes: schema });

equal(Includes([false, false, true]), undefined);
equal(typeof Includes([false, 1, {}]), 'object');
