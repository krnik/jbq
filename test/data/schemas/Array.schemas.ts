import { TYPE, TYPE_NAME, EVERY, SOME, INCLUDES, LEN, PROP_DATA_PATH, SYM_SCHEMA_PROPERTIES } from '../../../src/constants';
import { SYM_FAKER } from '../../utils';

export const schemasArray = [
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
        name: `${TYPE_NAME.ARRAY}_${LEN} -- min`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.ARRAY,
            [LEN]: { min: 1 },
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
        name: `${TYPE_NAME.ARRAY}_${LEN} -- max`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.ARRAY,
            [LEN]: { max: 10 },
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
            [SYM_FAKER]: () => ({ array: [], max: 0 }),
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
        name: `${TYPE_NAME.ARRAY}_${LEN} -- min / max ${PROP_DATA_PATH}`,
        valid: true,
        schema: {},
    },
    {
        name: `${TYPE_NAME.ARRAY}_${LEN} -- min ${PROP_DATA_PATH} / max ${PROP_DATA_PATH}`,
        valid: true,
        schema: {},
    },
];
