import {
    LEN,
    ONE_OF,
    PROP_DATA_PATH,
    REGEX,
    SYM_SCHEMA_PROPERTIES,
    TYPE,
    TYPE_NUMBER,
    TYPE_OBJECT,
    TYPE_STRING,
} from '../../../src/misc/constants';
import { SYM_FAKER } from '../../utils';
import { TestSuite } from './suite.interface';

export const suitesString: TestSuite[] = [
    {
        name: `${TYPE_STRING}#${TYPE}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_STRING,
            [SYM_FAKER]: ['lorem.word'],
        },
    },
    {
        name: `${TYPE_STRING}#${TYPE}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_STRING,
            [SYM_FAKER]: ['random.number'],
        },
    },
    {
        name: `${TYPE_STRING}#${REGEX}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_STRING,
            [REGEX]: /@/,
            [SYM_FAKER]: ['internet.email'],
        },
    },
    {
        name: `${TYPE_STRING}#${REGEX}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_STRING,
            [REGEX]: /@/,
            [SYM_FAKER]: ['lorem.word'],
        },
    },
    {
        name: `${TYPE_STRING}#${ONE_OF}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_STRING,
            [ONE_OF]: ['true', 'false'],
            [SYM_FAKER]: ['random.arrayElement', [['true', 'false']]],
        },
    },
    {
        name: `${TYPE_STRING}#${ONE_OF}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_STRING,
            [ONE_OF]: ['true', 'false'],
            [SYM_FAKER]: ['random.arrayElement', [['.true', '.false']]],
        },
    },
    {
        name: `${TYPE_STRING}#${LEN} -- exact`,
        valid: true,
        schema: {
            [TYPE]: TYPE_STRING,
            [LEN]: 10,
            [SYM_FAKER]: ['helpers.replaceSymbolWithNumber', ['####--####']],
        },
    },
    {
        name: `${TYPE_STRING}#${LEN} -- exact`,
        valid: false,
        schema: {
            [TYPE]: TYPE_STRING,
            [LEN]: 5,
            [SYM_FAKER]: ['helpers.replaceSymbolWithNumber', ['####--####']],
        },
    },
    {
        name: `${TYPE_STRING}#${LEN} -- exact ${PROP_DATA_PATH}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                len: {
                    [TYPE]: TYPE_NUMBER,
                    [SYM_FAKER]: (): number => 5,
                },
                str: {
                    [TYPE]: TYPE_STRING,
                    [LEN]: { [PROP_DATA_PATH]: 'len' },
                    [SYM_FAKER]: ['helpers.replaceSymbolWithNumber', ['#####']],
                },
            },
        },
    },
    {
        name: `${TYPE_STRING}#${LEN} -- exact ${PROP_DATA_PATH}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                len: {
                    [TYPE]: TYPE_NUMBER,
                    [SYM_FAKER]: (): number => 10,
                },
                str: {
                    [TYPE]: TYPE_STRING,
                    [LEN]: { [PROP_DATA_PATH]: 'len' },
                    [SYM_FAKER]: ['helpers.replaceSymbolWithNumber', ['#####']],
                },
            },
        },
    },
    {
        name: `${TYPE_STRING}#${LEN} -- min`,
        valid: true,
        schema: {
            [TYPE]: TYPE_STRING,
            [LEN]: { min: 0 },
            [SYM_FAKER]: ['lorem.word'],
        },
    },
    {
        name: `${TYPE_STRING}#${LEN} -- min`,
        valid: false,
        schema: {
            [TYPE]: TYPE_STRING,
            [LEN]: { min: 1000 },
            [SYM_FAKER]: ['lorem.word'],
        },
    },
    {
        name: `${TYPE_STRING}#${LEN} -- min ${PROP_DATA_PATH}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                len: {
                    [TYPE]: TYPE_NUMBER,
                    [SYM_FAKER]: (): number => 0,
                },
                str: {
                    [TYPE]: TYPE_STRING,
                    [LEN]: {
                        min: { [PROP_DATA_PATH]: 'len' },
                    },
                    [SYM_FAKER]: ['lorem.word'],
                },
            },
        },
    },
    {
        name: `${TYPE_STRING}#${LEN} -- min ${PROP_DATA_PATH}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                len: {
                    [TYPE]: TYPE_NUMBER,
                    [SYM_FAKER]: (): number => 1000,
                },
                str: {
                    [TYPE]: TYPE_STRING,
                    [LEN]: {
                        min: { [PROP_DATA_PATH]: 'len' },
                    },
                    [SYM_FAKER]: ['lorem.word'],
                },
            },
        },
    },
    {
        name: `${TYPE_STRING}#${LEN} -- max`,
        valid: true,
        schema: {
            [TYPE]: TYPE_STRING,
            [LEN]: { max: 1000 },
            [SYM_FAKER]: ['lorem.word'],
        },
    },
    {
        name: `${TYPE_STRING}#${LEN} -- max`,
        valid: false,
        schema: {
            [TYPE]: TYPE_STRING,
            [LEN]: { max: 0 },
            [SYM_FAKER]: ['lorem.word'],
        },
    },
    {
        name: `${TYPE_STRING}#${LEN} -- max ${PROP_DATA_PATH}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                len: {
                    [TYPE]: TYPE_NUMBER,
                    [SYM_FAKER]: (): number => 1000,
                },
                str: {
                    [TYPE]: TYPE_STRING,
                    [LEN]: {
                        max: { [PROP_DATA_PATH]: 'len' },
                    },
                    [SYM_FAKER]: ['lorem.word'],
                },
            },
        },
    },
    {
        name: `${TYPE_STRING}#${LEN} -- max ${PROP_DATA_PATH}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                len: {
                    [TYPE]: TYPE_NUMBER,
                    [SYM_FAKER]: (): number => 0,
                },
                str: {
                    [TYPE]: TYPE_STRING,
                    [LEN]: {
                        max: { [PROP_DATA_PATH]: 'len' },
                    },
                    [SYM_FAKER]: ['lorem.word'],
                },
            },
        },
    },
    {
        name: `${TYPE_STRING}#${LEN} -- min / max`,
        valid: true,
        schema: {
            [TYPE]: TYPE_STRING,
            [LEN]: {
                min: 0,
                max: 1000,
            },
            [SYM_FAKER]: ['lorem.word'],
        },
    },
    {
        name: `${TYPE_STRING}#${LEN} -- min / max`,
        valid: false,
        schema: {
            [TYPE]: TYPE_STRING,
            [LEN]: {
                min: 0,
                max: 0,
            },
            [SYM_FAKER]: ['lorem.word'],
        },
    },
    {
        name: `${TYPE_STRING}#${LEN} -- min ${PROP_DATA_PATH} / max`,
        valid: true,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                len: {
                    [TYPE]: TYPE_OBJECT,
                    [SYM_SCHEMA_PROPERTIES]: {
                        min: {
                            [TYPE]: TYPE_NUMBER,
                            [SYM_FAKER]: (): number => 0,
                        },
                        max: {
                            [TYPE]: TYPE_NUMBER,
                            [SYM_FAKER]: (): number => 1000,
                        },
                    },
                },
                str: {
                    [TYPE]: TYPE_STRING,
                    [LEN]: {
                        min: { [PROP_DATA_PATH]: 'len/min' },
                        max: 1000,
                    },
                    [SYM_FAKER]: ['lorem.word'],
                },
            },
        },
    },
    {
        name: `${TYPE_STRING}#${LEN} -- min ${PROP_DATA_PATH} / max`,
        valid: false,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                len: {
                    [TYPE]: TYPE_OBJECT,
                    [SYM_SCHEMA_PROPERTIES]: {
                        min: {
                            [TYPE]: TYPE_NUMBER,
                            [SYM_FAKER]: (): number => 0,
                        },
                        max: {
                            [TYPE]: TYPE_NUMBER,
                            [SYM_FAKER]: (): number => 0,
                        },
                    },
                },
                str: {
                    [TYPE]: TYPE_STRING,
                    [LEN]: {
                        min: { [PROP_DATA_PATH]: 'len/min' },
                        max: 0,
                    },
                    [SYM_FAKER]: ['lorem.word'],
                },
            },
        },
    },
    {
        name: `${TYPE_STRING}#${LEN} -- min / max ${PROP_DATA_PATH}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                len: {
                    [TYPE]: TYPE_OBJECT,
                    [SYM_SCHEMA_PROPERTIES]: {
                        min: {
                            [TYPE]: TYPE_NUMBER,
                            [SYM_FAKER]: (): number => 0,
                        },
                        max: {
                            [TYPE]: TYPE_NUMBER,
                            [SYM_FAKER]: (): number => 1000,
                        },
                    },
                },
                str: {
                    [TYPE]: TYPE_STRING,
                    [LEN]: {
                        min: 0,
                        max: { [PROP_DATA_PATH]: 'len/max' },
                    },
                    [SYM_FAKER]: ['lorem.word'],
                },
            },
        },
    },
    {
        name: `${TYPE_STRING}#${LEN} -- min / max ${PROP_DATA_PATH}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                len: {
                    [TYPE]: TYPE_OBJECT,
                    [SYM_SCHEMA_PROPERTIES]: {
                        min: {
                            [TYPE]: TYPE_NUMBER,
                            [SYM_FAKER]: (): number => 0,
                        },
                        max: {
                            [TYPE]: TYPE_NUMBER,
                            [SYM_FAKER]: (): number => 0,
                        },
                    },
                },
                str: {
                    [TYPE]: TYPE_STRING,
                    [LEN]: {
                        min: 0,
                        max: { [PROP_DATA_PATH]: 'len/max' },
                    },
                    [SYM_FAKER]: ['lorem.word'],
                },
            },
        },
    },
    {
        name: `${TYPE_STRING}#${LEN} -- min ${PROP_DATA_PATH} / max ${PROP_DATA_PATH}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                len: {
                    [TYPE]: TYPE_OBJECT,
                    [SYM_SCHEMA_PROPERTIES]: {
                        min: {
                            [TYPE]: TYPE_NUMBER,
                            [SYM_FAKER]: (): number => 0,
                        },
                        max: {
                            [TYPE]: TYPE_NUMBER,
                            [SYM_FAKER]: (): number => 1000,
                        },
                    },
                },
                str: {
                    [TYPE]: TYPE_STRING,
                    [LEN]: {
                        min: { [PROP_DATA_PATH]: 'len/min' },
                        max: { [PROP_DATA_PATH]: 'len/max' },
                    },
                    [SYM_FAKER]: ['lorem.word'],
                },
            },
        },
    },
    {
        name: `${TYPE_STRING}#${LEN} -- min ${PROP_DATA_PATH} / max ${PROP_DATA_PATH}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                len: {
                    [TYPE]: TYPE_OBJECT,
                    [SYM_SCHEMA_PROPERTIES]: {
                        min: {
                            [TYPE]: TYPE_NUMBER,
                            [SYM_FAKER]: (): number => 0,
                        },
                        max: {
                            [TYPE]: TYPE_NUMBER,
                            [SYM_FAKER]: (): number => 0,
                        },
                    },
                },
                str: {
                    [TYPE]: TYPE_STRING,
                    [LEN]: {
                        min: { [PROP_DATA_PATH]: 'len/min' },
                        max: { [PROP_DATA_PATH]: 'len/max' },
                    },
                    [SYM_FAKER]: ['lorem.word'],
                },
            },
        },
    },
];
