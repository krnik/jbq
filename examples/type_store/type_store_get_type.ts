import { TypeAny, TypeArray, TypeStore, TypeInstance } from '../../src/dev';
import { equal } from 'assert';

const store = new TypeStore().addType(TypeAny).addType(TypeArray);

// TypeInstance<'any', 'type' | 'required', undefined>
const anyType = store.getType('any');
equal(anyType instanceof TypeInstance, true);
equal(anyType.name, 'any');

// TypeInstance<'array', 'type' | 'every' | 'some', 'includes', 'len', 'any'>
const arrayType = store.getType('array');
equal(arrayType instanceof TypeInstance, true);
equal(arrayType.name, 'array');

try {
    // @ts-ignore
    store.getType('null');
} catch (err) {
    // Error: no such type 'null'.
}
