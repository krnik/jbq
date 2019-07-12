import { TypeStore } from '../core/type_store';
import { TypeAny } from './any';
import { TypeArray } from './array';
import { TypeBoolean } from './boolean';
import { TypeNumber } from './number';
import { TypeObject } from './object';
import { TypeString } from './string';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createTypes() {
    return new TypeStore()
        .addType(TypeAny)
        .addType(TypeArray)
        .addType(TypeBoolean)
        .addType(TypeNumber)
        .addType(TypeObject)
        .addType(TypeString);
}

export const types = createTypes();

export { TypeAny, TypeArray, TypeBoolean, TypeNumber, TypeObject, TypeString };
