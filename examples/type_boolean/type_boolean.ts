import { jbq, types } from '../../src/lib';
import { equal } from 'assert';

const schemaType = { type: 'boolean' };
const { BooleanType } = jbq(types, { BooleanType: schemaType });

equal(BooleanType(true), undefined);
equal(typeof BooleanType(0), 'object');

//example_region

const schemaValue = { type: 'boolean', value: true };
const { BooleanValue } = jbq(types, { BooleanValue: schemaValue });

equal(BooleanValue(true), undefined);
equal(typeof BooleanValue(false), 'object');
