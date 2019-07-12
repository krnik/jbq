import { jbq, types } from '../../src/lib';
import { equal } from 'assert';

const schema = {
    type: 'array',
    some: (element: unknown): boolean => element === 100,
};
const { Some } = jbq(types, { Some: schema });

equal(Some([1, 10, 100]), undefined);
equal(Some([]), undefined);
equal(typeof Some([true, false]), 'object');
