import { equal } from 'assert';
import { jbq, types } from '../../src/lib';

const schema = { type: 'object', properties: ['hello'] };
const { Properties } = jbq(types, { Properties: schema });

equal(Properties({ hello: 'World' }), undefined);
equal(typeof Properties({ world: 'hello' }), 'object');
