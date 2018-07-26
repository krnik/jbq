import { TYPE, MIN_LEN, MAX_LEN, LEN, REGEX, MIN, MAX, SYM_SCHEMA_OBJECT, SYM_SCHEMA_FLAT, SYM_SCHEMA_COLLECTION } from '../../constants';

export const patterns = {
    Test: {
        string: {
            [TYPE]: 'string',
            [MAX_LEN]: 64,
            [MIN_LEN]: 2,
            [LEN]: 32,
            [REGEX]: /.+/,
            [Symbol.for('faker')]: ['internet.email'],
        },
        number: {
            [TYPE]: 'number',
            [MIN]: 18,
            [MAX]: 110,
            [Symbol.for('faker')]: ['random.number'],
        },
        boolean: {
            [TYPE]: 'boolean',
            [Symbol.for('faker')]: ['random.boolean'],
        },
        object: {
            [TYPE]: 'object',
            [SYM_SCHEMA_OBJECT]: {
                prop1: {
                    [TYPE]: 'string',
                    [Symbol.for('faker')]: ['lorem.word'],
                },
                prop2: {
                    [TYPE]: 'string',
                    [Symbol.for('faker')]: ['lorem.word'],
                },
            },
        },
        array: {
            [TYPE]: 'array',
            [SYM_SCHEMA_FLAT]: true,
            [SYM_SCHEMA_COLLECTION]: {
                [TYPE]: 'string',
                [SYM_SCHEMA_FLAT]: true,
            },
            [Symbol.for('faker')]: ['lorem.word'],
        },
        arrayOfObjects: {
            [TYPE]: 'array',
            [SYM_SCHEMA_COLLECTION]: {
                prop1: {
                    [TYPE]: 'string',
                    [Symbol.for('faker')]: ['lorem.word'],
                },
            },
        },
    },
    PrimitiveString: {
        [TYPE]: 'string',
        [MIN_LEN]: 2,
        [MAX_LEN]: 64,
        [LEN]: 32,
        [REGEX]: /.+/,
        [SYM_SCHEMA_FLAT]: true,
        [Symbol.for('faker')]: ['lorem.word'],
    },
};
