import { equal } from 'assert';
import { jbq, types } from '../../src/lib';

const schema = { type: 'object', constructorName: 'Set' };
const { CtrName } = jbq(types, { CtrName: schema });

equal(CtrName(new Set()), undefined);
equal(typeof CtrName({}), 'object');
