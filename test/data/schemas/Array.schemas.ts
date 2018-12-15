import { EVERY, INCLUDES, LEN, PROP_DATA_PATH, SOME, SYM_SCHEMA_PROPERTIES, TYPE, TYPE_NAME } from '../../../src/constants';
import { SYM_FAKER } from '../../utils';
import { ITestSuite } from './typings';

export const schemasArray: ITestSuite[] = [
    {
        name: `${TYPE_NAME.ARRAY}_${TYPE}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.ARRAY,
            [SYM_FAKER]: () => ([]),
        },
    },
    {
        name: `${TYPE_NAME.ARRAY}_${TYPE}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_NAME.ARRAY,
            [SYM_FAKER]: () => ({}),
        },
    },
    {
        name: `${TYPE_NAME.ARRAY}_${EVERY}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.ARRAY,
            [EVERY]: (elem: any) => typeof elem === 'number',
            [SYM_FAKER]: () => [0, 1, 1, 1, 0, 0, 1],
        },
    },
    {
        name: `${TYPE_NAME.ARRAY}_${EVERY}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_NAME.ARRAY,
            [EVERY]: (elem: any) => typeof elem === 'number',
            [SYM_FAKER]: () => [0, 1, 1, 1, 0, 0, 1, false],
        },
    },
    {
        name: `${TYPE_NAME.ARRAY}_${SOME}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.ARRAY,
            [SOME]: (elem: any) => typeof elem === 'undefined',
            [SYM_FAKER]: () => [0, 1, 1, 1, 0, , 1, false],
        },
    },
    {
        name: `${TYPE_NAME.ARRAY}_${SOME}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_NAME.ARRAY,
            [SOME]: (elem: any) => typeof elem === 'function',
            [SYM_FAKER]: () => [0, 1, 1, 1, 0, , 1, false],
        },
    },
    {
        name: `${TYPE_NAME.ARRAY}_${INCLUDES}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.ARRAY,
            [INCLUDES]: 100,
            [SYM_FAKER]: () => [100],
        },
    },
    {
        name: `${TYPE_NAME.ARRAY}_${INCLUDES}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_NAME.ARRAY,
            [INCLUDES]: 100,
            [SYM_FAKER]: () => [10],
        },
    },
    {
        name: `${TYPE_NAME.ARRAY}_${LEN} -- exact`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.ARRAY,
            [LEN]: 0,
            [SYM_FAKER]: () => [],
        },
    },
    {
        name: `${TYPE_NAME.ARRAY}_${LEN} -- exact`,
        valid: false,
        schema: {
            [TYPE]: TYPE_NAME.ARRAY,
            [LEN]: 0,
            [SYM_FAKER]: () => [0],
        },
    },
    {
        name: `${TYPE_NAME.ARRAY}_${LEN} -- exact ${PROP_DATA_PATH}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                array: {
                    [TYPE]: TYPE_NAME.ARRAY,
                    [LEN]: { [PROP_DATA_PATH]: 'len' },
                },
                len: { [TYPE]: TYPE_NAME.NUMBER },
            },
            [SYM_FAKER]: () => ({ array: [], len: 0 }),
        },
    },
    {
        name: `${TYPE_NAME.ARRAY}_${LEN} -- exact ${PROP_DATA_PATH}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                array: {
                    [TYPE]: TYPE_NAME.ARRAY,
                    [LEN]: { [PROP_DATA_PATH]: 'len' },
                },
                len: { [TYPE]: TYPE_NAME.NUMBER },
            },
            [SYM_FAKER]: () => ({ array: [], len: 10 }),
        },
    },
    {
        name: `${TYPE_NAME.ARRAY}_${LEN} -- min`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.ARRAY,
            [LEN]: { min: 1 },
            [SYM_FAKER]: () => [null],
        },
    },
    {
        name: `${TYPE_NAME.ARRAY}_${LEN} -- min`,
        valid: false,
        schema: {
            [TYPE]: TYPE_NAME.ARRAY,
            [LEN]: { min: 2 },
            [SYM_FAKER]: () => [null],
        },
    },
    {
        name: `${TYPE_NAME.ARRAY}_${LEN} -- min ${PROP_DATA_PATH}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                array: {
                    [TYPE]: TYPE_NAME.ARRAY,
                    [LEN]: { min: { [PROP_DATA_PATH]: 'len' } },
                },
                len: { [TYPE]: TYPE_NAME.NUMBER },
            },
            [SYM_FAKER]: () => ({ array: [], len: 0 }),
        },
    },
    {
        name: `${TYPE_NAME.ARRAY}_${LEN} -- min ${PROP_DATA_PATH}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                array: {
                    [TYPE]: TYPE_NAME.ARRAY,
                    [LEN]: { min: { [PROP_DATA_PATH]: 'len' } },
                },
                len: { [TYPE]: TYPE_NAME.NUMBER },
            },
            [SYM_FAKER]: () => ({ array: [0], len: 5 }),
        },
    },
    {
        name: `${TYPE_NAME.ARRAY}_${LEN} -- max`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.ARRAY,
            [LEN]: { max: 10 },
            [SYM_FAKER]: () => new Array(5),
        },
    },
    {
        name: `${TYPE_NAME.ARRAY}_${LEN} -- max`,
        valid: false,
        schema: {
            [TYPE]: TYPE_NAME.ARRAY,
            [LEN]: { max: 4 },
            [SYM_FAKER]: () => new Array(5),
        },
    },
    {
        name: `${TYPE_NAME.ARRAY}_${LEN} -- max ${PROP_DATA_PATH}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                array: {
                    [TYPE]: TYPE_NAME.ARRAY,
                    [LEN]: { max: { [PROP_DATA_PATH]: 'len' } },
                },
                len: { [TYPE]: TYPE_NAME.NUMBER },
            },
            [SYM_FAKER]: () => ({ array: [], len: 0 }),
        },
    },
    {
        name: `${TYPE_NAME.ARRAY}_${LEN} -- max ${PROP_DATA_PATH}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                array: {
                    [TYPE]: TYPE_NAME.ARRAY,
                    [LEN]: { max: { [PROP_DATA_PATH]: 'len' } },
                },
                len: { [TYPE]: TYPE_NAME.NUMBER },
            },
            [SYM_FAKER]: () => ({ array: new Array(10), len: 5 }),
        },
    },
    {
        name: `${TYPE_NAME.ARRAY}_${LEN} -- min / max`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.ARRAY,
            [LEN]: { min: 2, max: 4 },
            [SYM_FAKER]: () => [1, 2, 3],
        },
    },
    {
        name: `${TYPE_NAME.ARRAY}_${LEN} -- min / max`,
        valid: false,
        schema: {
            [TYPE]: TYPE_NAME.ARRAY,
            [LEN]: { min: 1, max: 2 },
            [SYM_FAKER]: () => [1, 2, 3],
        },
    },
    {
        name: `${TYPE_NAME.ARRAY}_${LEN} -- min ${PROP_DATA_PATH} / max`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                array: {
                    [TYPE]: TYPE_NAME.ARRAY,
                    [LEN]: {
                        min: { [PROP_DATA_PATH]: 'len' },
                        max: 10,
                    },
                },
                len: { [TYPE]: TYPE_NAME.NUMBER },
            },
            [SYM_FAKER]: () => ({ array: new Array(5), len: 4 }),
        },
    },
    {
        name: `${TYPE_NAME.ARRAY}_${LEN} -- min ${PROP_DATA_PATH} / max`,
        valid: false,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                array: {
                    [TYPE]: TYPE_NAME.ARRAY,
                    [LEN]: {
                        min: { [PROP_DATA_PATH]: 'len' },
                        max: 10,
                    },
                },
                len: { [TYPE]: TYPE_NAME.NUMBER },
            },
            [SYM_FAKER]: () => ({ array: new Array(5), len: 8 }),
        },
    },
    {
        name: `${TYPE_NAME.ARRAY}_${LEN} -- min / max ${PROP_DATA_PATH}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                array: {
                    [TYPE]: TYPE_NAME.ARRAY,
                    [LEN]: {
                        min: 5,
                        max: { [PROP_DATA_PATH]: 'len' },
                    },
                },
                len: { [TYPE]: TYPE_NAME.NUMBER },
            },
            [SYM_FAKER]: () => ({ array: new Array(5), len: 6 }),
        },
    },
    {
        name: `${TYPE_NAME.ARRAY}_${LEN} -- min / max ${PROP_DATA_PATH}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                array: {
                    [TYPE]: TYPE_NAME.ARRAY,
                    [LEN]: {
                        min: 10,
                        max: { [PROP_DATA_PATH]: 'len' },
                    },
                },
                len: { [TYPE]: TYPE_NAME.NUMBER },
            },
            [SYM_FAKER]: () => ({ array: new Array(5), len: 4 }),
        },
    },
    {
        name: `${TYPE_NAME.ARRAY}_${LEN} -- min ${PROP_DATA_PATH} / max ${PROP_DATA_PATH}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                array: {
                    [TYPE]: TYPE_NAME.ARRAY,
                    [LEN]: {
                        min: { [PROP_DATA_PATH]: 'len' },
                        max: { [PROP_DATA_PATH]: 'maximum' },
                    },
                },
                len: { [TYPE]: TYPE_NAME.NUMBER },
            },
            [SYM_FAKER]: () => ({ array: new Array(5), len: 4, maximum: 10 }),
        },
    },
    {
        name: `${TYPE_NAME.ARRAY}_${LEN} -- min ${PROP_DATA_PATH} / max ${PROP_DATA_PATH}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                array: {
                    [TYPE]: TYPE_NAME.ARRAY,
                    [LEN]: {
                        min: { [PROP_DATA_PATH]: 'len' },
                        max: { [PROP_DATA_PATH]: 'maximum' },
                    },
                },
                len: { [TYPE]: TYPE_NAME.NUMBER },
            },
            [SYM_FAKER]: () => ({ array: new Array(5), len: 6, maximum: 6 }),
        },
    },
];
