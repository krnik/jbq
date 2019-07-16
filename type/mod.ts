import { TypeStore } from '../core/type_store.ts';
import { TypeAny } from './any.ts';
import { TypeArray } from './array.ts';
import { TypeBoolean } from './boolean.ts';
import { TypeNumber } from './number.ts';
import { TypeObject } from './object.ts';
import { TypeString } from './string.ts';

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
