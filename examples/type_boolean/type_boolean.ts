import { jbq, jbqTypes } from '../../src/lib';
import { equal } from 'assert';

const schemaType = { type: 'boolean' };
const { BooleanType } = jbq(jbqTypes, { BooleanType: schemaType });

equal(BooleanType(true), undefined);
equal(typeof BooleanType(0), 'string');

//example_region

const schemaValue = { type: 'boolean', value: true };
const { BooleanValue } = jbq(jbqTypes, { BooleanValue: schemaValue });

equal(BooleanValue(true), undefined);
equal(typeof BooleanValue(false), 'string');
