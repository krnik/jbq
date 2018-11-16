import unitTestTypeAny from './Any';
import unitTestTypeArray from './Array';
import unitTestTypeBoolean from './Boolean';
import unitTestTypeNumber from './Number';
import unitTestTypeObject from './Object';
import unitTestTypeString from './String';
import unitTestTypeWrapper from './Wrapper';

export default () => (
    unitTestTypeAny(),
    unitTestTypeArray(),
    unitTestTypeBoolean(),
    unitTestTypeNumber(),
    unitTestTypeObject(),
    unitTestTypeString(),
    unitTestTypeWrapper()
);
