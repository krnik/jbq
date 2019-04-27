import { TYPE_NAME } from '../misc/constants';
import { TypeWrapper } from '../core/type_wrapper';
import { TypeAny } from './any';
import { TypeArray } from './array';
import { TypeBoolean } from './boolean';
import { TypeNumber } from './number';
import { TypeObject } from './object';
import { TypeString } from './string';

export function createTypes(): TypeWrapper {
    return new TypeWrapper()
        .set(TYPE_NAME.ANY, TypeAny)
        .set(TYPE_NAME.STRING, TypeString, { type: TYPE_NAME.ANY })
        .set(TYPE_NAME.BOOLEAN, TypeBoolean, { type: TYPE_NAME.ANY })
        .set(TYPE_NAME.NUMBER, TypeNumber, { type: TYPE_NAME.ANY })
        .set(TYPE_NAME.OBJECT, TypeObject, { type: TYPE_NAME.ANY })
        .set(TYPE_NAME.ARRAY, TypeArray, { type: TYPE_NAME.ANY });
}
