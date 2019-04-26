import {
    MULTIPLE_OF,
    ONE_OF,
    PROP_DATA_PATH,
    SYM_SCHEMA_PROPERTIES,
    TYPE,
    TYPE_NAME,
    VALUE,
} from '../../../src/constants';
import { SYM_FAKER } from '../../utils';
import { TestSuite } from './typings';

export const suitesNumber: TestSuite[] = [
    {
        name: `${TYPE_NAME.NUMBER}#${TYPE}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.NUMBER,
            [SYM_FAKER]: (): number => 0,
        },
    },
    {
        name: `${TYPE_NAME.NUMBER}#${TYPE}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_NAME.NUMBER,
            [SYM_FAKER]: (): number => NaN,
        },
    },
    {
        name: `${TYPE_NAME.NUMBER}#${MULTIPLE_OF}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.NUMBER,
            [MULTIPLE_OF]: 1,
            [SYM_FAKER]: (): number => 10,
        },
    },
    {
        name: `${TYPE_NAME.NUMBER}#${MULTIPLE_OF}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_NAME.NUMBER,
            [MULTIPLE_OF]: 1.5,
            [SYM_FAKER]: (): number => 10,
        },
    },
    {
        name: `${TYPE_NAME.NUMBER}#${ONE_OF}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.NUMBER,
            [ONE_OF]: [2, 4, 6, 8],
            [SYM_FAKER]: (): number => 8,
        },
    },
    {
        name: `${TYPE_NAME.NUMBER}#${ONE_OF}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_NAME.NUMBER,
            [ONE_OF]: [2, 4, 6, 8],
            [SYM_FAKER]: (): number => 7,
        },
    },
    {
        name: `${TYPE_NAME.NUMBER}#${VALUE} -- exact`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.NUMBER,
            [VALUE]: 8,
            [SYM_FAKER]: (): number => 8,
        },
    },
    {
        name: `${TYPE_NAME.NUMBER}#${VALUE} -- exact`,
        valid: false,
        schema: {
            [TYPE]: TYPE_NAME.NUMBER,
            [VALUE]: 0,
            [SYM_FAKER]: (): number => 8,
        },
    },
    {
        name: `${TYPE_NAME.NUMBER}#${VALUE} -- exact ${PROP_DATA_PATH}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                expected: {
                    [TYPE]: TYPE_NAME.NUMBER,
                    [SYM_FAKER]: (): number => 1,
                },
                actual: {
                    [TYPE]: TYPE_NAME.NUMBER,
                    [VALUE]: { [PROP_DATA_PATH]: 'expected' },
                    [SYM_FAKER]: (): number => 1,
                },
            },
        },
    },
    {
        name: `${TYPE_NAME.NUMBER}#${VALUE} -- exact ${PROP_DATA_PATH}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                expected: {
                    [TYPE]: TYPE_NAME.NUMBER,
                    [SYM_FAKER]: (): number => 1,
                },
                actual: {
                    [TYPE]: TYPE_NAME.NUMBER,
                    [VALUE]: { [PROP_DATA_PATH]: 'expected' },
                    [SYM_FAKER]: (): number => 0,
                },
            },
        },
    },
    {
        name: `${TYPE_NAME.NUMBER}#${VALUE} -- min`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.NUMBER,
            [VALUE]: { min: 10 },
            [SYM_FAKER]: (): number => 10,
        },
    },
    {
        name: `${TYPE_NAME.NUMBER}#${VALUE} -- min`,
        valid: false,
        schema: {
            [TYPE]: TYPE_NAME.NUMBER,
            [VALUE]: { min: 20 },
            [SYM_FAKER]: (): number => 10,
        },
    },
    {
        name: `${TYPE_NAME.NUMBER}#${VALUE} -- min ${PROP_DATA_PATH}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                expected: {
                    [TYPE]: TYPE_NAME.NUMBER,
                    [SYM_FAKER]: (): number => 1,
                },
                actual: {
                    [TYPE]: TYPE_NAME.NUMBER,
                    [VALUE]: {
                        min: { [PROP_DATA_PATH]: 'expected' },
                    },
                    [SYM_FAKER]: (): number => 1,
                },
            },
        },
    },
    {
        name: `${TYPE_NAME.NUMBER}#${VALUE} -- min ${PROP_DATA_PATH}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                expected: {
                    [TYPE]: TYPE_NAME.NUMBER,
                    [SYM_FAKER]: (): number => 10,
                },
                actual: {
                    [TYPE]: TYPE_NAME.NUMBER,
                    [VALUE]: {
                        min: { [PROP_DATA_PATH]: 'expected' },
                    },
                    [SYM_FAKER]: (): number => 1,
                },
            },
        },
    },
    {
        name: `${TYPE_NAME.NUMBER}#${VALUE} -- max`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.NUMBER,
            [VALUE]: { max: 10 },
            [SYM_FAKER]: (): number => 9,
        },
    },
    {
        name: `${TYPE_NAME.NUMBER}#${VALUE} -- max`,
        valid: false,
        schema: {
            [TYPE]: TYPE_NAME.NUMBER,
            [VALUE]: { max: 1 },
            [SYM_FAKER]: (): number => 9,
        },
    },
    {
        name: `${TYPE_NAME.NUMBER}#${VALUE} -- max ${PROP_DATA_PATH}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                expected: {
                    [TYPE]: TYPE_NAME.NUMBER,
                    [SYM_FAKER]: (): number => 1,
                },
                actual: {
                    [TYPE]: TYPE_NAME.NUMBER,
                    [VALUE]: {
                        max: { [PROP_DATA_PATH]: 'expected' },
                    },
                    [SYM_FAKER]: (): number => 0,
                },
            },
        },
    },
    {
        name: `${TYPE_NAME.NUMBER}#${VALUE} -- max ${PROP_DATA_PATH}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                expected: {
                    [TYPE]: TYPE_NAME.NUMBER,
                    [SYM_FAKER]: (): number => 10,
                },
                actual: {
                    [TYPE]: TYPE_NAME.NUMBER,
                    [VALUE]: {
                        max: { [PROP_DATA_PATH]: 'expected' },
                    },
                    [SYM_FAKER]: (): number => 20,
                },
            },
        },
    },
    {
        name: `${TYPE_NAME.NUMBER}#${VALUE} -- min / max`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.NUMBER,
            [VALUE]: {
                min: 10,
                max: 100,
            },
            [SYM_FAKER]: (): number => 90,
        },
    },
    {
        name: `${TYPE_NAME.NUMBER}#${VALUE} -- min / max`,
        valid: false,
        schema: {
            [TYPE]: TYPE_NAME.NUMBER,
            [VALUE]: {
                min: 10,
                max: 100,
            },
            [SYM_FAKER]: (): number => 0,
        },
    },
    {
        name: `${TYPE_NAME.NUMBER}#${VALUE} -- min ${PROP_DATA_PATH} / max`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                range: {
                    [TYPE]: TYPE_NAME.OBJECT,
                    [SYM_SCHEMA_PROPERTIES]: {
                        min: { [TYPE]: TYPE_NAME.NUMBER },
                        max: { [TYPE]: TYPE_NAME.NUMBER },
                    },
                    [SYM_FAKER]: (): object => ({ min: 10, max: 100 }),
                },
                value: {
                    [TYPE]: TYPE_NAME.NUMBER,
                    [VALUE]: {
                        min: { [PROP_DATA_PATH]: 'range/min' },
                        max: 100,
                    },
                    [SYM_FAKER]: (): number => 50,
                },
            },
        },
    },
    {
        name: `${TYPE_NAME.NUMBER}#${VALUE} -- min ${PROP_DATA_PATH} / max`,
        valid: false,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                range: {
                    [TYPE]: TYPE_NAME.OBJECT,
                    [SYM_SCHEMA_PROPERTIES]: {
                        min: { [TYPE]: TYPE_NAME.NUMBER },
                        max: { [TYPE]: TYPE_NAME.NUMBER },
                    },
                    [SYM_FAKER]: (): object => ({ min: 90, max: 100 }),
                },
                value: {
                    [TYPE]: TYPE_NAME.NUMBER,
                    [VALUE]: {
                        min: { [PROP_DATA_PATH]: 'range/min' },
                        max: 100,
                    },
                    [SYM_FAKER]: (): number => 50,
                },
            },
        },
    },
    {
        name: `${TYPE_NAME.NUMBER}#${VALUE} -- min / max ${PROP_DATA_PATH}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                range: {
                    [TYPE]: TYPE_NAME.OBJECT,
                    [SYM_SCHEMA_PROPERTIES]: {
                        min: { [TYPE]: TYPE_NAME.NUMBER },
                        max: { [TYPE]: TYPE_NAME.NUMBER },
                    },
                    [SYM_FAKER]: (): object => ({ min: 10, max: 100 }),
                },
                value: {
                    [TYPE]: TYPE_NAME.NUMBER,
                    [VALUE]: {
                        min: 10,
                        max: { [PROP_DATA_PATH]: 'range/max' },
                    },
                    [SYM_FAKER]: (): number => 50,
                },
            },
        },
    },
    {
        name: `${TYPE_NAME.NUMBER}#${VALUE} -- min / max ${PROP_DATA_PATH}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                range: {
                    [TYPE]: TYPE_NAME.OBJECT,
                    [SYM_SCHEMA_PROPERTIES]: {
                        min: { [TYPE]: TYPE_NAME.NUMBER },
                        max: { [TYPE]: TYPE_NAME.NUMBER },
                    },
                    [SYM_FAKER]: (): object => ({ min: 10, max: 100 }),
                },
                value: {
                    [TYPE]: TYPE_NAME.NUMBER,
                    [VALUE]: {
                        min: 10,
                        max: { [PROP_DATA_PATH]: 'range/max' },
                    },
                    [SYM_FAKER]: (): number => 500,
                },
            },
        },
    },
    {
        name: `${TYPE_NAME.NUMBER}#${VALUE} -- min ${PROP_DATA_PATH} / max ${PROP_DATA_PATH}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                range: {
                    [TYPE]: TYPE_NAME.OBJECT,
                    [SYM_SCHEMA_PROPERTIES]: {
                        min: { [TYPE]: TYPE_NAME.NUMBER },
                        max: { [TYPE]: TYPE_NAME.NUMBER },
                    },
                    [SYM_FAKER]: (): object => ({ min: 10, max: 100 }),
                },
                value: {
                    [TYPE]: TYPE_NAME.NUMBER,
                    [VALUE]: {
                        min: { [PROP_DATA_PATH]: 'range/min' },
                        max: { [PROP_DATA_PATH]: 'range/max' },
                    },
                    [SYM_FAKER]: (): number => 50,
                },
            },
        },
    },
    {
        name: `${TYPE_NAME.NUMBER}#${VALUE} -- min ${PROP_DATA_PATH} / max ${PROP_DATA_PATH}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                range: {
                    [TYPE]: TYPE_NAME.OBJECT,
                    [SYM_SCHEMA_PROPERTIES]: {
                        min: { [TYPE]: TYPE_NAME.NUMBER },
                        max: { [TYPE]: TYPE_NAME.NUMBER },
                    },
                    [SYM_FAKER]: (): object => ({ min: 100, max: 1000 }),
                },
                value: {
                    [TYPE]: TYPE_NAME.NUMBER,
                    [VALUE]: {
                        min: { [PROP_DATA_PATH]: 'range/min' },
                        max: { [PROP_DATA_PATH]: 'range/max' },
                    },
                    [SYM_FAKER]: (): number => 50,
                },
            },
        },
    },
];
