import { jbq, types } from '../../src/lib';
import { equal } from 'assert';

const schemas = {
    ExactProp: {
        type: 'object',
        propCount: 1,
    },
    MinProp: {
        type: 'object',
        propCount: { min: 1 },
    },
    // and so on...
};
const { ExactProp, MinProp } = jbq(types, schemas);

equal(ExactProp({ [Symbol()]: true }), undefined);
equal(
    typeof ExactProp({
        [Symbol('meta_1')]: true,
        [Symbol('meta_2')]: false,
    }),
    'object',
);

equal(MinProp({ key: 'value' }), undefined);
equal(typeof MinProp({}), 'object');
