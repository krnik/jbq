import { TYPE_NAME } from '../constants';
import { TypeAny } from './Any';
import { TypeArray } from './Array';
import { TypeBoolean } from './Boolean';
import { TypeNumber } from './Number';
import { TypeObject } from './Object';
import { TypeString } from './String';
import { TypeWrapper } from './Wrapper';

export function createTypes () {
    return new TypeWrapper()
        .set(TYPE_NAME.ANY, TypeAny)
        .set(TYPE_NAME.STRING, TypeString, TYPE_NAME.ANY)
        .set(TYPE_NAME.BOOLEAN, TypeBoolean, TYPE_NAME.ANY)
        .set(TYPE_NAME.NUMBER, TypeNumber, TYPE_NAME.ANY)
        .set(TYPE_NAME.OBJECT, TypeObject, TYPE_NAME.ANY)
        .set(TYPE_NAME.ARRAY, TypeArray, TYPE_NAME.ANY);
}
