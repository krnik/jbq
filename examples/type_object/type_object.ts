import { jbq, jbqTypes } from '../../src/lib';
import { equal } from 'assert';

const schemaType = { type: 'object' };
const { ObjectType } = jbq(jbqTypes, { ObjectType: schemaType });

equal(ObjectType({}), undefined);
equal(ObjectType(new Map()), undefined);
equal(typeof ObjectType(null), 'string');
equal(typeof ObjectType([]), 'string');

//example_region

const schema = { type: 'object', constructorName: 'Set' };
const { ObjectConstrName } = jbq(jbqTypes, { ObjectConstrName: schema });

equal(ObjectConstrName(new Set()), undefined);
equal(typeof ObjectConstrName({}), 'string');

//example_region

const schemaInstanceOf = { type: 'object', instanceOf: Map };
const { ObjectInstance } = jbq(jbqTypes, { ObjectInstance: schemaInstanceOf });

equal(ObjectInstance(new Map()), undefined);
equal(typeof ObjectInstance(new Set()), 'string');

//example_region

const schemaProps = { type: 'object', properties: ['hello'] };
const { ObjectProperties } = jbq(jbqTypes, { ObjectProperties: schemaProps });

equal(ObjectProperties({ hello: 'World' }), undefined);
equal(typeof ObjectProperties({ world: 'hello' }), 'string');

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
const { SimpleKey, MinKey, MaxKey, MinMaxKey } = jbq(jbqTypes, schemasKeyCount);

equal(SimpleKey({}), undefined);
equal(typeof SimpleKey({ key: 'value' }), 'string');

equal(MinKey({ 1: 1 }), undefined);
equal(typeof MinKey({}), 'string');

equal(MaxKey({ hello: 'world' }), undefined);
equal(typeof MaxKey({ a: 0, b: 0 }), 'string');

equal(MinMaxKey({ hello: 'world' }), undefined);
equal(typeof MinMaxKey({ hello: 'there', general: 'Kenobi', bo: true }), 'string');

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
const { SimpleProp, MinProp } = jbq(jbqTypes, schemasPropCount);

equal(SimpleProp({ [Symbol()]: true }), undefined);
equal(
    typeof SimpleProp({
        [Symbol('meta_1')]: true,
        [Symbol('meta_2')]: false,
    }),
    'string',
);

equal(MinProp({ key: 'value' }), undefined);
equal(typeof MinProp({}), 'string');
