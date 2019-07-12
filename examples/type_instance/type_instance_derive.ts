import { deepEqual } from 'assert';
import { TypeInstance, TypeNumber } from '../../src/dev';

const numeric = new TypeInstance('numeric').derive(TypeNumber);
// numeric will now have access to all keywords of type it derives from
deepEqual(
    numeric.getKeywords().sort(),
    ['type', 'required', 'value', 'multipleOf', 'oneOf'].sort(),
);
