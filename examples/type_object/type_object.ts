import { jbq, types } from '../../src/lib';
import { equal } from 'assert';

const schemaType = { type: 'object' };
const { ObjectType } = jbq(types, { ObjectType: schemaType });

equal(ObjectType({}), undefined);
equal(ObjectType(new Map()), undefined);
equal(typeof ObjectType(null), 'object');
equal(typeof ObjectType([]), 'object');

//example_region

const schema = { type: 'object', constructorName: 'Set' };
const { ObjectConstrName } = jbq(types, { ObjectConstrName: schema });

equal(ObjectConstrName(new Set()), undefined);
equal(typeof ObjectConstrName({}), 'object');

//example_region

const schemaInstanceOf = { type: 'object', instanceOf: Map };
const { ObjectInstance } = jbq(types, { ObjectInstance: schemaInstanceOf });

equal(ObjectInstance(new Map()), undefined);
equal(typeof ObjectInstance(new Set()), 'object');

//example_region

const schemaProps = { type: 'object', properties: ['hello'] };
const { ObjectProperties } = jbq(types, { ObjectProperties: schemaProps });

equal(ObjectProperties({ hello: 'World' }), undefined);
equal(typeof ObjectProperties({ world: 'hello' }), 'object');

//example_region

const schemasKeyCount = {
    SimpleKey: {
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
const { SimpleKey, MinKey, MaxKey, MinMaxKey } = jbq(types, schemasKeyCount);

equal(SimpleKey({}), undefined);
equal(typeof SimpleKey({ key: 'value' }), 'object');

equal(MinKey({ 1: 1 }), undefined);
equal(typeof MinKey({}), 'object');

equal(MaxKey({ hello: 'world' }), undefined);
equal(typeof MaxKey({ a: 0, b: 0 }), 'object');

equal(MinMaxKey({ hello: 'world' }), undefined);
equal(typeof MinMaxKey({ hello: 'there', general: 'Kenobi', bo: true }), 'object');

//example_region

const schemasPropCount = {
    SimpleProp: {
        type: 'object',
        propCount: 1,
    },
    MinProp: {
        type: 'object',
        propCount: { min: 1 },
    },
    // and so on...
};
const { SimpleProp, MinProp } = jbq(types, schemasPropCount);

equal(SimpleProp({ [Symbol()]: true }), undefined);
equal(
    typeof SimpleProp({
        [Symbol('meta_1')]: true,
        [Symbol('meta_2')]: false,
    }),
    'object',
);

equal(MinProp({ key: 'value' }), undefined);
equal(typeof MinProp({}), 'object');
