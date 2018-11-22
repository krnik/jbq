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
        .set(TYPE_NAME.STRING, TypeString, { type: TYPE_NAME.ANY })
        .set(TYPE_NAME.BOOLEAN, TypeBoolean, { type: TYPE_NAME.ANY })
        .set(TYPE_NAME.NUMBER, TypeNumber, { type: TYPE_NAME.ANY })
        .set(TYPE_NAME.OBJECT, TypeObject, { type: TYPE_NAME.ANY })
        .set(TYPE_NAME.ARRAY, TypeArray, { type: TYPE_NAME.ANY });
}
