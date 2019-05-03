import { jbq, jbqTypes } from '../../src/lib';
import { equal } from 'assert';

const schemaType = { type: 'any' };
const { AnyType } = jbq(jbqTypes, { AnyType: schemaType });

equal(AnyType({}), undefined);
equal(AnyType([]), undefined);
equal(AnyType(undefined), undefined);
equal(AnyType('string'), undefined);

//example_region

const schemaRequired = { type: 'any', required: true };
const { AnyRequired } = jbq(jbqTypes, { AnyRequired: schemaRequired });

equal(AnyRequired(true), undefined);
equal(AnyRequired({}), undefined);
equal(typeof AnyRequired(undefined), 'string');
