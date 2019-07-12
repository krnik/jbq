import { equal } from 'assert';
import { jbq, types } from '../../src/lib';

const schema = { type: 'object', instanceOf: Map };
const { InstanceOf } = jbq(types, { InstanceOf: schema });

equal(InstanceOf(new Map()), undefined);
equal(typeof InstanceOf(new Set()), 'object');
