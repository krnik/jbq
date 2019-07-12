import { equal } from 'assert';
import { jbq, types } from '../../src/lib';

const schemas = {
    ExactKey: {
        type: 'object',
        keyCount: 0,
    },
    MinKey: {
        type: 'object',
        keyCount: { min: 1 },
    },
    MaxKey: {
        type: 'object',
        keyCount: { max: 1 },
    },
    MinMaxKey: {
        type: 'object',
        keyCount: { min: 1, max: 2 },
    },
};
const { ExactKey, MinKey, MaxKey, MinMaxKey } = jbq(types, schemas);

equal(ExactKey({}), undefined);
equal(typeof ExactKey({ key: 'value' }), 'object');

equal(MinKey({ 1: 1 }), undefined);
equal(typeof MinKey({}), 'object');

equal(MaxKey({ hello: 'world' }), undefined);
equal(typeof MaxKey({ a: 0, b: 0 }), 'object');

equal(MinMaxKey({ hello: 'world' }), undefined);
equal(typeof MinMaxKey({ hello: 'there', general: 'Kenobi', bo: true }), 'object');
