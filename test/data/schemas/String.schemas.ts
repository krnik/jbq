import { LEN, ONE_OF, PROP_DATA_PATH, REGEX, SYM_SCHEMA_PROPERTIES, TYPE, TYPE_NAME } from '../../../src/constants';
import { SYM_FAKER } from '../../utils';
import { ITestSuite } from './typings';

export const schemasString: ITestSuite[] = [
    {
        name: `${TYPE_NAME.STRING}_${TYPE}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.STRING,
            [SYM_FAKER]: ['lorem.word'],
        },
    },
    {
        name: `${TYPE_NAME.STRING}_${TYPE}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_NAME.STRING,
            [SYM_FAKER]: ['random.number'],
        },
    },
    {
        name: `${TYPE_NAME.STRING}_${REGEX}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.STRING,
            [REGEX]: /@/,
            [SYM_FAKER]: ['internet.email'],
        },
    },
    {
        name: `${TYPE_NAME.STRING}_${REGEX}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_NAME.STRING,
            [REGEX]: /@/,
            [SYM_FAKER]: ['lorem.word'],
        },
    },
    {
        name: `${TYPE_NAME.STRING}_${ONE_OF}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.STRING,
            [ONE_OF]: ['true', 'false'],
            [SYM_FAKER]: ['random.arrayElement', [['true', 'false']]],
        },
    },
    {
        name: `${TYPE_NAME.STRING}_${ONE_OF}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_NAME.STRING,
            [ONE_OF]: ['true', 'false'],
            [SYM_FAKER]: ['random.arrayElement', [['.true', '.false']]],
        },
    },
    {
        name: `${TYPE_NAME.STRING}_${LEN} -- exact`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.STRING,
            [LEN]: 10,
            [SYM_FAKER]: ['helpers.replaceSymbolWithNumber', ['####--####']],
        },
    },
    {
        name: `${TYPE_NAME.STRING}_${LEN} -- exact`,
        valid: false,
        schema: {
            [TYPE]: TYPE_NAME.STRING,
            [LEN]: 5,
            [SYM_FAKER]: ['helpers.replaceSymbolWithNumber', ['####--####']],
        },
    },
    {
        name: `${TYPE_NAME.STRING}_${LEN} -- exact ${PROP_DATA_PATH}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                len: {
                    [TYPE]: TYPE_NAME.NUMBER,
                    [SYM_FAKER]: () => 5,
                },
                str: {
                    [TYPE]: TYPE_NAME.STRING,
                    [LEN]: { [PROP_DATA_PATH]: 'len' },
                    [SYM_FAKER]: ['helpers.replaceSymbolWithNumber', ['#####']],
                },
            },
        },
    },
    {
        name: `${TYPE_NAME.STRING}_${LEN} -- exact ${PROP_DATA_PATH}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                len: {
                    [TYPE]: TYPE_NAME.NUMBER,
                    [SYM_FAKER]: () => 10,
                },
                str: {
                    [TYPE]: TYPE_NAME.STRING,
                    [LEN]: { [PROP_DATA_PATH]: 'len' },
                    [SYM_FAKER]: ['helpers.replaceSymbolWithNumber', ['#####']],
                },
            },
        },
    },
    {
        name: `${TYPE_NAME.STRING}_${LEN} -- min`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.STRING,
            [LEN]: { min: 0 },
            [SYM_FAKER]: ['lorem.word'],
        },
    },
    {
        name: `${TYPE_NAME.STRING}_${LEN} -- min`,
        valid: false,
        schema: {
            [TYPE]: TYPE_NAME.STRING,
            [LEN]: { min: 1000 },
            [SYM_FAKER]: ['lorem.word'],
        },
    },
    {
        name: `${TYPE_NAME.STRING}_${LEN} -- min ${PROP_DATA_PATH}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                len: {
                    [TYPE]: TYPE_NAME.NUMBER,
                    [SYM_FAKER]: () => 0,
                },
                str: {
                    [TYPE]: TYPE_NAME.STRING,
                    [LEN]: {
                        min: { [PROP_DATA_PATH]: 'len' },
                    },
                    [SYM_FAKER]: ['lorem.word'],
                },
            },
        },
    },
    {
        name: `${TYPE_NAME.STRING}_${LEN} -- min ${PROP_DATA_PATH}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                len: {
                    [TYPE]: TYPE_NAME.NUMBER,
                    [SYM_FAKER]: () => 1000,
                },
                str: {
                    [TYPE]: TYPE_NAME.STRING,
                    [LEN]: {
                        min: { [PROP_DATA_PATH]: 'len' },
                    },
                    [SYM_FAKER]: ['lorem.word'],
                },
            },
        },
    },
    {
        name: `${TYPE_NAME.STRING}_${LEN} -- max`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.STRING,
            [LEN]: { max: 1000 },
            [SYM_FAKER]: ['lorem.word'],
        },
    },
    {
        name: `${TYPE_NAME.STRING}_${LEN} -- max`,
        valid: false,
        schema: {
            [TYPE]: TYPE_NAME.STRING,
            [LEN]: { max: 0 },
            [SYM_FAKER]: ['lorem.word'],
        },
    },
    {
        name: `${TYPE_NAME.STRING}_${LEN} -- max ${PROP_DATA_PATH}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                len: {
                    [TYPE]: TYPE_NAME.NUMBER,
                    [SYM_FAKER]: () => 1000,
                },
                str: {
                    [TYPE]: TYPE_NAME.STRING,
                    [LEN]: {
                        max: { [PROP_DATA_PATH]: 'len' },
                    },
                    [SYM_FAKER]: ['lorem.word'],
                },
            },
        },
    },
    {
        name: `${TYPE_NAME.STRING}_${LEN} -- max ${PROP_DATA_PATH}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                len: {
                    [TYPE]: TYPE_NAME.NUMBER,
                    [SYM_FAKER]: () => 0,
                },
                str: {
                    [TYPE]: TYPE_NAME.STRING,
                    [LEN]: {
                        max: { [PROP_DATA_PATH]: 'len' },
                    },
                    [SYM_FAKER]: ['lorem.word'],
                },
            },
        },
    },
    {
        name: `${TYPE_NAME.STRING}_${LEN} -- min / max`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.STRING,
            [LEN]: {
                min: 0,
                max: 1000,
            },
            [SYM_FAKER]: ['lorem.word'],
        },
    },
    {
        name: `${TYPE_NAME.STRING}_${LEN} -- min / max`,
        valid: false,
        schema: {
            [TYPE]: TYPE_NAME.STRING,
            [LEN]: {
                min: 0,
                max: 0,
            },
            [SYM_FAKER]: ['lorem.word'],
        },
    },
    {
        name: `${TYPE_NAME.STRING}_${LEN} -- min ${PROP_DATA_PATH} / max`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                len: {
                    [TYPE]: TYPE_NAME.OBJECT,
                    [SYM_SCHEMA_PROPERTIES]: {
                        min: {
                            [TYPE]: TYPE_NAME.NUMBER,
                            [SYM_FAKER]: () => 0,
                        },
                        max: {
                            [TYPE]: TYPE_NAME.NUMBER,
                            [SYM_FAKER]: () => 1000,
                        },
                    },
                },
                str: {
                    [TYPE]: TYPE_NAME.STRING,
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
        name: `${TYPE_NAME.STRING}_${LEN} -- min ${PROP_DATA_PATH} / max`,
        valid: false,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                len: {
                    [TYPE]: TYPE_NAME.OBJECT,
                    [SYM_SCHEMA_PROPERTIES]: {
                        min: {
                            [TYPE]: TYPE_NAME.NUMBER,
                            [SYM_FAKER]: () => 0,
                        },
                        max: {
                            [TYPE]: TYPE_NAME.NUMBER,
                            [SYM_FAKER]: () => 0,
                        },
                    },
                },
                str: {
                    [TYPE]: TYPE_NAME.STRING,
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
        name: `${TYPE_NAME.STRING}_${LEN} -- min / max ${PROP_DATA_PATH}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                len: {
                    [TYPE]: TYPE_NAME.OBJECT,
                    [SYM_SCHEMA_PROPERTIES]: {
                        min: {
                            [TYPE]: TYPE_NAME.NUMBER,
                            [SYM_FAKER]: () => 0,
                        },
                        max: {
                            [TYPE]: TYPE_NAME.NUMBER,
                            [SYM_FAKER]: () => 1000,
                        },
                    },
                },
                str: {
                    [TYPE]: TYPE_NAME.STRING,
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
        name: `${TYPE_NAME.STRING}_${LEN} -- min / max ${PROP_DATA_PATH}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                len: {
                    [TYPE]: TYPE_NAME.OBJECT,
                    [SYM_SCHEMA_PROPERTIES]: {
                        min: {
                            [TYPE]: TYPE_NAME.NUMBER,
                            [SYM_FAKER]: () => 0,
                        },
                        max: {
                            [TYPE]: TYPE_NAME.NUMBER,
                            [SYM_FAKER]: () => 0,
                        },
                    },
                },
                str: {
                    [TYPE]: TYPE_NAME.STRING,
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
        name: `${TYPE_NAME.STRING}_${LEN} -- min ${PROP_DATA_PATH} / max ${PROP_DATA_PATH}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                len: {
                    [TYPE]: TYPE_NAME.OBJECT,
                    [SYM_SCHEMA_PROPERTIES]: {
                        min: {
                            [TYPE]: TYPE_NAME.NUMBER,
                            [SYM_FAKER]: () => 0,
                        },
                        max: {
                            [TYPE]: TYPE_NAME.NUMBER,
                            [SYM_FAKER]: () => 1000,
                        },
                    },
                },
                str: {
                    [TYPE]: TYPE_NAME.STRING,
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
        name: `${TYPE_NAME.STRING}_${LEN} -- min ${PROP_DATA_PATH} / max ${PROP_DATA_PATH}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                len: {
                    [TYPE]: TYPE_NAME.OBJECT,
                    [SYM_SCHEMA_PROPERTIES]: {
                        min: {
                            [TYPE]: TYPE_NAME.NUMBER,
                            [SYM_FAKER]: () => 0,
                        },
                        max: {
                            [TYPE]: TYPE_NAME.NUMBER,
                            [SYM_FAKER]: () => 0,
                        },
                    },
                },
                str: {
                    [TYPE]: TYPE_NAME.STRING,
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
