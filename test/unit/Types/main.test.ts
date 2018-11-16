import unitTestTypeAny from './Any.test';
import unitTestTypeArray from './Array.test';
import unitTestTypeBoolean from './Boolean.test';
import unitTestTypeNumber from './Number.test';
import unitTestTypeObject from './Object.test';
import unitTestTypeString from './String.test';
import unitTestTypeWrapper from './Wrapper.test';

export default () => (
    unitTestTypeAny(),
    unitTestTypeArray(),
    unitTestTypeBoolean(),
    unitTestTypeNumber(),
    unitTestTypeObject(),
    unitTestTypeString(),
    unitTestTypeWrapper()
);
