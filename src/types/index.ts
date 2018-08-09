import { TYPE_NAME } from '../constants';
import { TypeArray } from './Array';
import { TypeBoolean } from './Boolean';
import { TypeNumber } from './Number';
import { TypeObject } from './Object';
import { TypeString } from './String';
import { TypeWrapper } from './Wrapper';

export function createTypes () {
    return new TypeWrapper()
        .set(TYPE_NAME.STRING, TypeString)
        .set(TYPE_NAME.BOOLEAN, TypeBoolean)
        .set(TYPE_NAME.NUMBER, TypeNumber)
        .set(TYPE_NAME.OBJECT, TypeObject)
        .set(TYPE_NAME.ARRAY, TypeArray);
}
