import { createTypes, TypeInstance, ValidationResult } from '../../src/dev';
import { jbq, SYM_COLLECTION, SYM_PROPERTIES } from '../../src/lib';
import { equal } from 'assert';

const map = new TypeInstance('map')
    .setKeyword('type', {
        validator(_schemaValue: string, $DATA: unknown): ValidationResult {
            if (!($DATA instanceof Map)) {
                return {
                    message: 'Data is not an instance of Map.',
                    path: '{{schemaPath}}',
                };
            }
        },
        schemaValidator(schemaValue: unknown): void {
            if (typeof schemaValue !== 'string') {
                throw new Error('schema value must be "string"');
            }
        },
    })
    // By default this value is set to true (validator will use Iterable Protocol to get
    // every element of collection).
    // Setting it to false will cause validator to use indexed access.
    .setUseForOfLoop(false);

const store = createTypes().addType(map);

const mapIterSchema = {
    type: 'array',
    required: true,
    [SYM_PROPERTIES]: {
        '1': { type: 'number' },
    },
};

const schema = {
    IsMap: {
        type: 'map',
        [SYM_COLLECTION]: mapIterSchema,
    },
};

const { IsMap } = jbq(store, schema);

const mapNumberVals = new Map()
    .set('one', 1)
    .set('two', 2)
    .set('three', 3);

// Returns an error saying that data cannot be iterated using integer indexed access
// beacuse its "length" property is not of type "number".
equal(typeof IsMap(mapNumberVals), 'object');
