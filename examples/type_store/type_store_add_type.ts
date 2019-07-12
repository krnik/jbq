import { deepEqual } from 'assert';
import { TypeAny, TypeArray, TypeStore } from '../../src/dev';

// TypeStore<['__empty__', '__empty__', undefined]>
const store = new TypeStore();
deepEqual(store.getTypeNames(), []);

// TypeStore<['any', 'type' | 'required', undefined]>
const tAny = store.addType(TypeAny);
deepEqual(store.getTypeNames(), ['any']);

// TypeStore<
// | ['any', 'type' | 'required', undefined]
// | ['array', 'type' | 'every' | 'some', 'includes', 'len', 'any']
// >;
tAny.addType(TypeArray);
deepEqual(tAny.getTypeNames(), ['any', 'array']);
