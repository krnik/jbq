import { IPatternsInput } from 'core/PatternParser';
import { SYM, TYPE_METHOD } from '../../constants';
const { TYPE, MAX_LEN, MIN_LEN, LEN, MAX, MIN, MATCH } = TYPE_METHOD;

export const patterns: IPatternsInput = {
    Test: {
        string: {
            [TYPE]: 'string',
            [MAX_LEN]: 64,
            [MIN_LEN]: 2,
            [LEN]: 32,
            [MATCH]: /.+/,
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
            [SYM.OBJECT]: {
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
            [SYM.FLAT]: true,
            [SYM.COLLECTION]: {
                [TYPE]: 'string',
                [SYM.FLAT]: true,
            },
            [Symbol.for('faker')]: ['lorem.word'],
        },
        arrayOfObjects: {
            [TYPE]: 'array',
            [SYM.COLLECTION]: {
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
        [MATCH]: /.+/,
        [SYM.FLAT]: true,
        [Symbol.for('faker')]: ['lorem.word'],
    },
};
