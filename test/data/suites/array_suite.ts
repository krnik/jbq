import {
    EVERY,
    INCLUDES,
    LEN,
    PROP_DATA_PATH,
    SOME,
    SYM_SCHEMA_PROPERTIES,
    TYPE,
    TYPE_ANY,
    TYPE_ARRAY,
    TYPE_NUMBER,
    TYPE_OBJECT,
} from '../../../src/misc/constants';
import { SYM_FAKER } from '../../utils';
import { TestSuite } from './suite.interface';

export const suitesArray: TestSuite[] = [
    {
        name: `${TYPE_ARRAY}#${TYPE}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_ARRAY,
            [SYM_FAKER]: (): [] => [],
        },
    },
    {
        name: `${TYPE_ARRAY}#${TYPE}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_ARRAY,
            [SYM_FAKER]: (): object => ({}),
        },
    },
    {
        name: `${TYPE_ARRAY}#${EVERY}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_ARRAY,
            [EVERY]: (elem: unknown): boolean => typeof elem === 'number',
            [SYM_FAKER]: (): number[] => [0, 1, 1, 1, 0, 0, 1],
        },
    },
    {
        name: `${TYPE_ARRAY}#${EVERY}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_ARRAY,
            [EVERY]: (elem: unknown): boolean => typeof elem === 'number',
            [SYM_FAKER]: (): unknown[] => [0, 1, 1, 1, 0, 0, 1, false],
        },
    },
    {
        name: `${TYPE_ARRAY}#${SOME}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_ARRAY,
            [SOME]: (elem: unknown): boolean => typeof elem === 'undefined',
            [SYM_FAKER]: (): unknown[] => [0, 1, 1, 1, 0, , 1, false],
        },
    },
    {
        name: `${TYPE_ARRAY}#${SOME}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_ARRAY,
            [SOME]: (elem: unknown): boolean => typeof elem === 'function',
            [SYM_FAKER]: (): unknown[] => [0, 1, 1, 1, 0, , 1, false],
        },
    },
    {
        name: `${TYPE_ARRAY}#${INCLUDES}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_ARRAY,
            [INCLUDES]: 100,
            [SYM_FAKER]: (): unknown[] => [100],
        },
    },
    {
        name: `${TYPE_ARRAY}#${INCLUDES}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_ARRAY,
            [INCLUDES]: 100,
            [SYM_FAKER]: (): unknown[] => [10],
        },
    },
    {
        name: `${TYPE_ARRAY}#${INCLUDES} -- ${PROP_DATA_PATH}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                element: {
                    [TYPE]: TYPE_ANY,
                    [SYM_FAKER]: (): unknown => 100,
                },
                arr: {
                    [TYPE]: TYPE_ARRAY,
                    [INCLUDES]: { [PROP_DATA_PATH]: 'element' },
                    [SYM_FAKER]: (): unknown[] => [1, 10, 100],
                },
            },
        },
    },
    {
        name: `${TYPE_ARRAY}#${INCLUDES} -- ${PROP_DATA_PATH}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                element: {
                    [TYPE]: TYPE_ANY,
                    [SYM_FAKER]: (): unknown => 1000,
                },
                arr: {
                    [TYPE]: TYPE_ARRAY,
                    [INCLUDES]: { [PROP_DATA_PATH]: 'element' },
                    [SYM_FAKER]: (): unknown[] => [1, 10, 100],
                },
            },
        },
    },
    {
        name: `${TYPE_ARRAY}#${LEN} -- exact`,
        valid: true,
        schema: {
            [TYPE]: TYPE_ARRAY,
            [LEN]: 0,
            [SYM_FAKER]: (): unknown[] => [],
        },
    },
    {
        name: `${TYPE_ARRAY}#${LEN} -- exact`,
        valid: false,
        schema: {
            [TYPE]: TYPE_ARRAY,
            [LEN]: 0,
            [SYM_FAKER]: (): unknown[] => [0],
        },
    },
    {
        name: `${TYPE_ARRAY}#${LEN} -- exact ${PROP_DATA_PATH}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                array: {
                    [TYPE]: TYPE_ARRAY,
                    [LEN]: { [PROP_DATA_PATH]: 'len' },
                },
                len: { [TYPE]: TYPE_NUMBER },
            },
            [SYM_FAKER]: (): object => ({ array: [], len: 0 }),
        },
    },
    {
        name: `${TYPE_ARRAY}#${LEN} -- exact ${PROP_DATA_PATH}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                array: {
                    [TYPE]: TYPE_ARRAY,
                    [LEN]: { [PROP_DATA_PATH]: 'len' },
                },
                len: { [TYPE]: TYPE_NUMBER },
            },
            [SYM_FAKER]: (): object => ({ array: [], len: 10 }),
        },
    },
    {
        name: `${TYPE_ARRAY}#${LEN} -- min`,
        valid: true,
        schema: {
            [TYPE]: TYPE_ARRAY,
            [LEN]: { min: 1 },
            [SYM_FAKER]: (): unknown[] => [null],
        },
    },
    {
        name: `${TYPE_ARRAY}#${LEN} -- min`,
        valid: false,
        schema: {
            [TYPE]: TYPE_ARRAY,
            [LEN]: { min: 2 },
            [SYM_FAKER]: (): unknown[] => [null],
        },
    },
    {
        name: `${TYPE_ARRAY}#${LEN} -- min ${PROP_DATA_PATH}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                array: {
                    [TYPE]: TYPE_ARRAY,
                    [LEN]: { min: { [PROP_DATA_PATH]: 'len' } },
                },
                len: { [TYPE]: TYPE_NUMBER },
            },
            [SYM_FAKER]: (): object => ({ array: [], len: 0 }),
        },
    },
    {
        name: `${TYPE_ARRAY}#${LEN} -- min ${PROP_DATA_PATH}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                array: {
                    [TYPE]: TYPE_ARRAY,
                    [LEN]: { min: { [PROP_DATA_PATH]: 'len' } },
                },
                len: { [TYPE]: TYPE_NUMBER },
            },
            [SYM_FAKER]: (): object => ({ array: [0], len: 5 }),
        },
    },
    {
        name: `${TYPE_ARRAY}#${LEN} -- max`,
        valid: true,
        schema: {
            [TYPE]: TYPE_ARRAY,
            [LEN]: { max: 10 },
            [SYM_FAKER]: (): unknown[] => new Array(5),
        },
    },
    {
        name: `${TYPE_ARRAY}#${LEN} -- max`,
        valid: false,
        schema: {
            [TYPE]: TYPE_ARRAY,
            [LEN]: { max: 4 },
            [SYM_FAKER]: (): unknown[] => new Array(5),
        },
    },
    {
        name: `${TYPE_ARRAY}#${LEN} -- max ${PROP_DATA_PATH}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                array: {
                    [TYPE]: TYPE_ARRAY,
                    [LEN]: { max: { [PROP_DATA_PATH]: 'len' } },
                },
                len: { [TYPE]: TYPE_NUMBER },
            },
            [SYM_FAKER]: (): object => ({ array: [], len: 0 }),
        },
    },
    {
        name: `${TYPE_ARRAY}#${LEN} -- max ${PROP_DATA_PATH}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                array: {
                    [TYPE]: TYPE_ARRAY,
                    [LEN]: { max: { [PROP_DATA_PATH]: 'len' } },
                },
                len: { [TYPE]: TYPE_NUMBER },
            },
            [SYM_FAKER]: (): object => ({ array: new Array(10), len: 5 }),
        },
    },
    {
        name: `${TYPE_ARRAY}#${LEN} -- min / max`,
        valid: true,
        schema: {
            [TYPE]: TYPE_ARRAY,
            [LEN]: { min: 2, max: 4 },
            [SYM_FAKER]: (): unknown[] => [1, 2, 3],
        },
    },
    {
        name: `${TYPE_ARRAY}#${LEN} -- min / max`,
        valid: false,
        schema: {
            [TYPE]: TYPE_ARRAY,
            [LEN]: { min: 1, max: 2 },
            [SYM_FAKER]: (): unknown[] => [1, 2, 3],
        },
    },
    {
        name: `${TYPE_ARRAY}#${LEN} -- min ${PROP_DATA_PATH} / max`,
        valid: true,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                array: {
                    [TYPE]: TYPE_ARRAY,
                    [LEN]: {
                        min: { [PROP_DATA_PATH]: 'len' },
                        max: 10,
                    },
                },
                len: { [TYPE]: TYPE_NUMBER },
            },
            [SYM_FAKER]: (): object => ({ array: new Array(5), len: 4 }),
        },
    },
    {
        name: `${TYPE_ARRAY}#${LEN} -- min ${PROP_DATA_PATH} / max`,
        valid: false,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                array: {
                    [TYPE]: TYPE_ARRAY,
                    [LEN]: {
                        min: { [PROP_DATA_PATH]: 'len' },
                        max: 10,
                    },
                },
                len: { [TYPE]: TYPE_NUMBER },
            },
            [SYM_FAKER]: (): object => ({ array: new Array(5), len: 8 }),
        },
    },
    {
        name: `${TYPE_ARRAY}#${LEN} -- min / max ${PROP_DATA_PATH}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                array: {
                    [TYPE]: TYPE_ARRAY,
                    [LEN]: {
                        min: 5,
                        max: { [PROP_DATA_PATH]: 'len' },
                    },
                },
                len: { [TYPE]: TYPE_NUMBER },
            },
            [SYM_FAKER]: (): object => ({ array: new Array(5), len: 6 }),
        },
    },
    {
        name: `${TYPE_ARRAY}#${LEN} -- min / max ${PROP_DATA_PATH}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                array: {
                    [TYPE]: TYPE_ARRAY,
                    [LEN]: {
                        min: 10,
                        max: { [PROP_DATA_PATH]: 'len' },
                    },
                },
                len: { [TYPE]: TYPE_NUMBER },
            },
            [SYM_FAKER]: (): object => ({ array: new Array(5), len: 4 }),
        },
    },
    {
        name: `${TYPE_ARRAY}#${LEN} -- min ${PROP_DATA_PATH} / max ${PROP_DATA_PATH}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                array: {
                    [TYPE]: TYPE_ARRAY,
                    [LEN]: {
                        min: { [PROP_DATA_PATH]: 'len' },
                        max: { [PROP_DATA_PATH]: 'maximum' },
                    },
                },
                len: { [TYPE]: TYPE_NUMBER },
            },
            [SYM_FAKER]: (): object => ({ array: new Array(5), len: 4, maximum: 10 }),
        },
    },
    {
        name: `${TYPE_ARRAY}#${LEN} -- min ${PROP_DATA_PATH} / max ${PROP_DATA_PATH}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                array: {
                    [TYPE]: TYPE_ARRAY,
                    [LEN]: {
                        min: { [PROP_DATA_PATH]: 'len' },
                        max: { [PROP_DATA_PATH]: 'maximum' },
                    },
                },
                len: { [TYPE]: TYPE_NUMBER },
            },
            [SYM_FAKER]: (): object => ({ array: new Array(5), len: 6, maximum: 6 }),
        },
    },
];
