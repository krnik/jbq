import { TypeStore, TypeAny, TypeNumber } from '../../src/dev';
import { deepEqual } from 'assert';

const store = new TypeStore().addType(TypeAny).addType(TypeNumber);

// ('any' | 'number')[]
const typeNames = store.getTypeNames();
deepEqual(typeNames, ['any', 'number']);
