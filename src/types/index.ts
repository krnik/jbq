import { TYPE_NAME } from '../constants';
import TypeArray from './Array';
import TypeBoolean from './Boolean';
import TypeNumber from './Number';
import TypeObject from './Object';
import TypeRoot from './Root';
import TypeString from './String';
import Wrapper from './Wrapper';

export function types () {
    return new Wrapper(TypeRoot)
        .set(TYPE_NAME.STRING, TypeString)
        .set(TYPE_NAME.BOOLEAN, TypeBoolean)
        .set(TYPE_NAME.NUMBER, TypeNumber)
        .set(TYPE_NAME.OBJECT, TypeObject)
        .set(TYPE_NAME.ARRAY, TypeArray);
};

export default new Wrapper(TypeRoot)
    .set(TYPE_NAME.STRING, TypeString)
    .set(TYPE_NAME.BOOLEAN, TypeBoolean)
    .set(TYPE_NAME.NUMBER, TypeNumber)
    .set(TYPE_NAME.OBJECT, TypeObject)
    .set(TYPE_NAME.ARRAY, TypeArray);
