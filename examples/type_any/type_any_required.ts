import { jbq, types } from '../../src/lib';
import { equal } from 'assert';

const schema = { type: 'any', required: true };
const { Required } = jbq(types, { Required: schema });

const validData = [true, {}, null, NaN, 0, -Infinity, 'Sumo!'];
validData.forEach(
    (data): void => {
        equal(Required(data), undefined);
    },
);

equal(typeof Required(undefined), 'object');
