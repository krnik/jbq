import { jbq, types } from '../../src/lib';
import { equal } from 'assert';

const schemaType = { type: 'any' };
const { AnyType } = jbq(types, { AnyType: schemaType });

equal(AnyType({}), undefined);
equal(AnyType([]), undefined);
equal(AnyType(undefined), undefined);
equal(AnyType('string'), undefined);
