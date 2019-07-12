import { jbq, types } from '../../src/lib';
import { equal } from 'assert';

const schema = {
    type: 'array',
    every: (element: unknown): boolean => typeof element === 'number' && element === element,
};

const { Every } = jbq(types, { Every: schema });

equal(Every([]), undefined);
equal(typeof Every([1, 2, 3, NaN]), 'object');
equal(typeof Every([1, 2, 3, false]), 'object');
equal(typeof Every({}), 'object');
