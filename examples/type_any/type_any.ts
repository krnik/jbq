import { jbq, types } from '../../src/lib';
import { equal } from 'assert';

const schemaType = { type: 'any' };
const { AnyType } = jbq(types, { AnyType: schemaType });

equal(AnyType({}), undefined);
equal(AnyType([]), undefined);
equal(AnyType(undefined), undefined);
equal(AnyType('string'), undefined);

//example_region

const schemaRequired = { type: 'any', required: true };
const { AnyRequired } = jbq(types, { AnyRequired: schemaRequired });

equal(AnyRequired(true), undefined);
equal(AnyRequired({}), undefined);
equal(typeof AnyRequired(undefined), 'object');
