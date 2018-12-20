import { CONSTRUCTOR_NAME, INSTANCE_OF, KEY_COUNT, PROPERTIES, PROP_COUNT, PROP_DATA_PATH, SYM_SCHEMA_PROPERTIES, TYPE, TYPE_NAME } from '../../../src/constants';
import { SYM_FAKER } from '../../utils';
import { ITestSuite } from './typings';

export const suitesObject: ITestSuite[] = [
    {
        name: `${TYPE_NAME.OBJECT}#${TYPE}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [SYM_FAKER]: () => ({}),
        },
    },
    {
        name: `${TYPE_NAME.OBJECT}#${TYPE}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [SYM_FAKER]: () => [],
        },
    },
    {
        name: `${TYPE_NAME.OBJECT}#${CONSTRUCTOR_NAME}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [CONSTRUCTOR_NAME]: 'Set',
            [SYM_FAKER]: () => new Set(),
        },
    },
    {
        name: `${TYPE_NAME.OBJECT}#${CONSTRUCTOR_NAME}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [CONSTRUCTOR_NAME]: 'Array',
            [SYM_FAKER]: () => new Set(),
        },
    },
    {
        name: `${TYPE_NAME.OBJECT}#${INSTANCE_OF}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [INSTANCE_OF]: Set,
            [SYM_FAKER]: () => new Set(),
        },
    },
    {
        name: `${TYPE_NAME.OBJECT}#${INSTANCE_OF}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [INSTANCE_OF]: Map,
            [SYM_FAKER]: () => new Set(),
        },
    },
    {
        name: `${TYPE_NAME.OBJECT}#${PROPERTIES}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [PROPERTIES]: ['key', Symbol.for('key')],
            [SYM_FAKER]: () => ({ key: true, [Symbol.for('key')]: true }),
        },
    },
    {
        name: `${TYPE_NAME.OBJECT}#${PROPERTIES}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [PROPERTIES]: ['key', Symbol.for('key')],
            [SYM_FAKER]: () => ({ [Symbol.for('key')]: true }),
        },
    },
    {
        name: `${TYPE_NAME.OBJECT}#${KEY_COUNT} -- exact`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [KEY_COUNT]: 0,
            [SYM_FAKER]: () => ({}),
        },
    },
    {
        name: `${TYPE_NAME.OBJECT}#${KEY_COUNT} -- exact`,
        valid: false,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [KEY_COUNT]: 1,
            [SYM_FAKER]: () => ({}),
        },
    },
    {
        name: `${TYPE_NAME.OBJECT}#${KEY_COUNT} -- exact ${PROP_DATA_PATH}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                keys: {
                    [TYPE]: TYPE_NAME.NUMBER,
                    [SYM_FAKER]: () => 0,
                },
                obj: {
                    [TYPE]: TYPE_NAME.OBJECT,
                    [KEY_COUNT]: { [PROP_DATA_PATH]: 'keys' },
                    [SYM_FAKER]: () => ({}),
                },
            },
        },
    },
    {
        name: `${TYPE_NAME.OBJECT}#${KEY_COUNT} -- exact ${PROP_DATA_PATH}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                keys: {
                    [TYPE]: TYPE_NAME.NUMBER,
                    [SYM_FAKER]: () => 1,
                },
                obj: {
                    [TYPE]: TYPE_NAME.OBJECT,
                    [KEY_COUNT]: { [PROP_DATA_PATH]: 'keys' },
                    [SYM_FAKER]: () => ({}),
                },
            },
        },
    },
    {
        name: `${TYPE_NAME.OBJECT}#${KEY_COUNT} -- min`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [KEY_COUNT]: { min: 1 },
            [SYM_FAKER]: () => ({ whoa: true }),
        },
    },
    {
        name: `${TYPE_NAME.OBJECT}#${KEY_COUNT} -- min`,
        valid: false,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [KEY_COUNT]: { min: 2 },
            [SYM_FAKER]: () => ({ whoa: true }),
        },
    },
    {
        name: `${TYPE_NAME.OBJECT}#${KEY_COUNT} -- min ${PROP_DATA_PATH}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                keys: {
                    [TYPE]: TYPE_NAME.NUMBER,
                    [SYM_FAKER]: () => 1,
                },
                obj: {
                    [TYPE]: TYPE_NAME.OBJECT,
                    [KEY_COUNT]: {
                        min: { [PROP_DATA_PATH]: 'keys' },
                    },
                    [SYM_FAKER]: () => ({ whoa: true }),
                },
            },
        },
    },
    {
        name: `${TYPE_NAME.OBJECT}#${KEY_COUNT} -- min ${PROP_DATA_PATH}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                keys: {
                    [TYPE]: TYPE_NAME.NUMBER,
                    [SYM_FAKER]: () => 2,
                },
                obj: {
                    [TYPE]: TYPE_NAME.OBJECT,
                    [KEY_COUNT]: {
                        min: { [PROP_DATA_PATH]: 'keys' },
                    },
                    [SYM_FAKER]: () => ({ whoa: true }),
                },
            },
        },
    },
    {
        name: `${TYPE_NAME.OBJECT}#${KEY_COUNT} -- max`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [KEY_COUNT]: { max: 2 },
            [SYM_FAKER]: () => ({ whoa: true }),
        },
    },
    {
        name: `${TYPE_NAME.OBJECT}#${KEY_COUNT} -- max`,
        valid: false,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [KEY_COUNT]: { max: 0 },
            [SYM_FAKER]: () => ({ whoa: true }),
        },
    },
    {
        name: `${TYPE_NAME.OBJECT}#${KEY_COUNT} -- max ${PROP_DATA_PATH}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                keys: {
                    [TYPE]: TYPE_NAME.NUMBER,
                    [SYM_FAKER]: () => 1,
                },
                obj: {
                    [TYPE]: TYPE_NAME.OBJECT,
                    [KEY_COUNT]: {
                        max: { [PROP_DATA_PATH]: 'keys' },
                    },
                    [SYM_FAKER]: () => ({ whoa: true }),
                },
            },
        },
    },
    {
        name: `${TYPE_NAME.OBJECT}#${KEY_COUNT} -- max ${PROP_DATA_PATH}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                keys: {
                    [TYPE]: TYPE_NAME.NUMBER,
                    [SYM_FAKER]: () => 0,
                },
                obj: {
                    [TYPE]: TYPE_NAME.OBJECT,
                    [KEY_COUNT]: {
                        max: { [PROP_DATA_PATH]: 'keys' },
                    },
                    [SYM_FAKER]: () => ({ whoa: true }),
                },
            },
        },
    },
    {
        name: `${TYPE_NAME.OBJECT}#${KEY_COUNT} -- min / max`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [KEY_COUNT]: { min: 1, max: 2 },
            [SYM_FAKER]: () => ({ whoa: 1 }),
        },
    },
    {
        name: `${TYPE_NAME.OBJECT}#${KEY_COUNT} -- min / max`,
        valid: false,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [KEY_COUNT]: { min: 2, max: 2 },
            [SYM_FAKER]: () => ({ whoa: 1 }),
        },
    },
    {
        name: `${TYPE_NAME.OBJECT}#${KEY_COUNT} -- min ${PROP_DATA_PATH} / max`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                keys: {
                    [TYPE]: TYPE_NAME.OBJECT,
                    [SYM_SCHEMA_PROPERTIES]: {
                        min: {
                            [TYPE]: TYPE_NAME.NUMBER,
                            [SYM_FAKER]: () => 1,
                        },
                        max: {
                            [TYPE]: TYPE_NAME.NUMBER,
                            [SYM_FAKER]: () => 2,
                        },
                    },
                },
                obj: {
                    [TYPE]: TYPE_NAME.OBJECT,
                    [KEY_COUNT]: {
                        min: { [PROP_DATA_PATH]: 'keys/min' },
                        max: 2,
                    },
                    [SYM_FAKER]: () => ({ whoa: true, yeah: false }),
                },
            },
        },
    },
    {
        name: `${TYPE_NAME.OBJECT}#${KEY_COUNT} -- min ${PROP_DATA_PATH} / max`,
        valid: false,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                keys: {
                    [TYPE]: TYPE_NAME.OBJECT,
                    [SYM_SCHEMA_PROPERTIES]: {
                        min: {
                            [TYPE]: TYPE_NAME.NUMBER,
                            [SYM_FAKER]: () => 3,
                        },
                        max: {
                            [TYPE]: TYPE_NAME.NUMBER,
                            [SYM_FAKER]: () => 3,
                        },
                    },
                },
                obj: {
                    [TYPE]: TYPE_NAME.OBJECT,
                    [KEY_COUNT]: {
                        min: { [PROP_DATA_PATH]: 'keys/min' },
                        max: 2,
                    },
                    [SYM_FAKER]: () => ({ whoa: true, yeah: false }),
                },
            },
        },
    },
    {
        name: `${TYPE_NAME.OBJECT}#${KEY_COUNT} -- min / max ${PROP_DATA_PATH}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                keys: {
                    [TYPE]: TYPE_NAME.OBJECT,
                    [SYM_SCHEMA_PROPERTIES]: {
                        min: {
                            [TYPE]: TYPE_NAME.NUMBER,
                            [SYM_FAKER]: () => 1,
                        },
                        max: {
                            [TYPE]: TYPE_NAME.NUMBER,
                            [SYM_FAKER]: () => 2,
                        },
                    },
                },
                obj: {
                    [TYPE]: TYPE_NAME.OBJECT,
                    [KEY_COUNT]: {
                        min: 1,
                        max: { [PROP_DATA_PATH]: 'keys/max' },
                    },
                    [SYM_FAKER]: () => ({ whoa: true, yeah: false }),
                },
            },
        },
    },
    {
        name: `${TYPE_NAME.OBJECT}#${KEY_COUNT} -- min / max ${PROP_DATA_PATH}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                keys: {
                    [TYPE]: TYPE_NAME.OBJECT,
                    [SYM_SCHEMA_PROPERTIES]: {
                        min: {
                            [TYPE]: TYPE_NAME.NUMBER,
                            [SYM_FAKER]: () => 3,
                        },
                        max: {
                            [TYPE]: TYPE_NAME.NUMBER,
                            [SYM_FAKER]: () => 3,
                        },
                    },
                },
                obj: {
                    [TYPE]: TYPE_NAME.OBJECT,
                    [KEY_COUNT]: {
                        min: 3,
                        max: { [PROP_DATA_PATH]: 'keys/max' },
                    },
                    [SYM_FAKER]: () => ({ whoa: true, yeah: false }),
                },
            },
        },
    },
    {
        name: `${TYPE_NAME.OBJECT}#${KEY_COUNT} -- min ${PROP_DATA_PATH} / max ${PROP_DATA_PATH}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                keys: {
                    [TYPE]: TYPE_NAME.OBJECT,
                    [SYM_SCHEMA_PROPERTIES]: {
                        min: {
                            [TYPE]: TYPE_NAME.NUMBER,
                            [SYM_FAKER]: () => 1,
                        },
                        max: {
                            [TYPE]: TYPE_NAME.NUMBER,
                            [SYM_FAKER]: () => 2,
                        },
                    },
                },
                obj: {
                    [TYPE]: TYPE_NAME.OBJECT,
                    [KEY_COUNT]: {
                        min: { [PROP_DATA_PATH]: 'keys/min' },
                        max: { [PROP_DATA_PATH]: 'keys/max' },
                    },
                    [SYM_FAKER]: () => ({ whoa: true, yeah: false }),
                },
            },
        },
    },
    {
        name: `${TYPE_NAME.OBJECT}#${KEY_COUNT} -- min ${PROP_DATA_PATH} / max ${PROP_DATA_PATH}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                keys: {
                    [TYPE]: TYPE_NAME.OBJECT,
                    [SYM_SCHEMA_PROPERTIES]: {
                        min: {
                            [TYPE]: TYPE_NAME.NUMBER,
                            [SYM_FAKER]: () => 1,
                        },
                        max: {
                            [TYPE]: TYPE_NAME.NUMBER,
                            [SYM_FAKER]: () => 2,
                        },
                    },
                },
                obj: {
                    [TYPE]: TYPE_NAME.OBJECT,
                    [KEY_COUNT]: {
                        min: { [PROP_DATA_PATH]: 'keys/min' },
                        max: { [PROP_DATA_PATH]: 'keys/max' },
                    },
                    [SYM_FAKER]: () => ({}),
                },
            },
        },
    },
    {
        name: `${TYPE_NAME.OBJECT}#${PROP_COUNT} -- exact`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [PROP_COUNT]: 1,
            [SYM_FAKER]: () => ({ [Symbol()]: 0 }),
        },
    },
    {
        name: `${TYPE_NAME.OBJECT}#${PROP_COUNT} -- exact`,
        valid: false,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [PROP_COUNT]: 2,
            [SYM_FAKER]: () => ({ [Symbol()]: 0 }),
        },
    },
    {
        name: `${TYPE_NAME.OBJECT}#${PROP_COUNT} -- exact ${PROP_DATA_PATH}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                keys: {
                    [TYPE]: TYPE_NAME.NUMBER,
                    [SYM_FAKER]: () => 1,
                },
                obj: {
                    [TYPE]: TYPE_NAME.OBJECT,
                    [PROP_COUNT]: { [PROP_DATA_PATH]: 'keys' },
                    [SYM_FAKER]: () => ({ [Symbol()]: 0 }),
                },
            },
        },
    },
    {
        name: `${TYPE_NAME.OBJECT}#${PROP_COUNT} -- exact ${PROP_DATA_PATH}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                keys: {
                    [TYPE]: TYPE_NAME.NUMBER,
                    [SYM_FAKER]: () => 2,
                },
                obj: {
                    [TYPE]: TYPE_NAME.OBJECT,
                    [PROP_COUNT]: { [PROP_DATA_PATH]: 'keys' },
                    [SYM_FAKER]: () => ({ [Symbol()]: 0 }),
                },
            },
        },
    },
    {
        name: `${TYPE_NAME.OBJECT}#${PROP_COUNT} -- min`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [PROP_COUNT]: { min: 1 },
            [SYM_FAKER]: () => ({ [Symbol()]: 0 }),
        },
    },
    {
        name: `${TYPE_NAME.OBJECT}#${PROP_COUNT} -- min`,
        valid: false,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [PROP_COUNT]: { min: 2 },
            [SYM_FAKER]: () => ({ [Symbol()]: 0 }),
        },
    },
    {
        name: `${TYPE_NAME.OBJECT}#${PROP_COUNT} -- min ${PROP_DATA_PATH}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                keys: {
                    [TYPE]: TYPE_NAME.NUMBER,
                    [SYM_FAKER]: () => 1,
                },
                obj: {
                    [TYPE]: TYPE_NAME.OBJECT,
                    [PROP_COUNT]: {
                        min: { [PROP_DATA_PATH]: 'keys' },
                    },
                    [SYM_FAKER]: () => ({ [Symbol()]: 0 }),
                },
            },
        },
    },
    {
        name: `${TYPE_NAME.OBJECT}#${PROP_COUNT} -- min ${PROP_DATA_PATH}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                keys: {
                    [TYPE]: TYPE_NAME.NUMBER,
                    [SYM_FAKER]: () => 2,
                },
                obj: {
                    [TYPE]: TYPE_NAME.OBJECT,
                    [PROP_COUNT]: {
                        min: { [PROP_DATA_PATH]: 'keys' },
                    },
                    [SYM_FAKER]: () => ({ [Symbol()]: 0 }),
                },
            },
        },
    },
    {
        name: `${TYPE_NAME.OBJECT}#${PROP_COUNT} -- max`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [PROP_COUNT]: { max: 2 },
            [SYM_FAKER]: () => ({ [Symbol()]: 0 }),
        },
    },
    {
        name: `${TYPE_NAME.OBJECT}#${PROP_COUNT} -- max`,
        valid: false,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [PROP_COUNT]: { max: 0 },
            [SYM_FAKER]: () => ({ [Symbol()]: 0 }),
        },
    },
    {
        name: `${TYPE_NAME.OBJECT}#${PROP_COUNT} -- max ${PROP_DATA_PATH}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                keys: {
                    [TYPE]: TYPE_NAME.NUMBER,
                    [SYM_FAKER]: () => 1,
                },
                obj: {
                    [TYPE]: TYPE_NAME.OBJECT,
                    [PROP_COUNT]: {
                        max: { [PROP_DATA_PATH]: 'keys' },
                    },
                    [SYM_FAKER]: () => ({ [Symbol()]: 0 }),
                },
            },
        },
    },
    {
        name: `${TYPE_NAME.OBJECT}#${PROP_COUNT} -- max ${PROP_DATA_PATH}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                keys: {
                    [TYPE]: TYPE_NAME.NUMBER,
                    [SYM_FAKER]: () => 0,
                },
                obj: {
                    [TYPE]: TYPE_NAME.OBJECT,
                    [PROP_COUNT]: {
                        max: { [PROP_DATA_PATH]: 'keys' },
                    },
                    [SYM_FAKER]: () => ({ [Symbol()]: 0 }),
                },
            },
        },
    },
    {
        name: `${TYPE_NAME.OBJECT}#${PROP_COUNT} -- min / max`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [PROP_COUNT]: { min: 1, max: 2 },
            [SYM_FAKER]: () => ({ [Symbol()]: 0 }),
        },
    },
    {
        name: `${TYPE_NAME.OBJECT}#${PROP_COUNT} -- min / max`,
        valid: false,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [PROP_COUNT]: { min: 2, max: 2 },
            [SYM_FAKER]: () => ({ [Symbol()]: 0 }),
        },
    },
    {
        name: `${TYPE_NAME.OBJECT}#${PROP_COUNT} -- min ${PROP_DATA_PATH} / max`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                keys: {
                    [TYPE]: TYPE_NAME.OBJECT,
                    [SYM_SCHEMA_PROPERTIES]: {
                        min: {
                            [TYPE]: TYPE_NAME.NUMBER,
                            [SYM_FAKER]: () => 1,
                        },
                        max: {
                            [TYPE]: TYPE_NAME.NUMBER,
                            [SYM_FAKER]: () => 2,
                        },
                    },
                },
                obj: {
                    [TYPE]: TYPE_NAME.OBJECT,
                    [PROP_COUNT]: {
                        min: { [PROP_DATA_PATH]: 'keys/min' },
                        max: 2,
                    },
                    [SYM_FAKER]: () => ({ [Symbol()]: 0, [Symbol()]: 0 }),
                },
            },
        },
    },
    {
        name: `${TYPE_NAME.OBJECT}#${PROP_COUNT} -- min ${PROP_DATA_PATH} / max`,
        valid: false,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                keys: {
                    [TYPE]: TYPE_NAME.OBJECT,
                    [SYM_SCHEMA_PROPERTIES]: {
                        min: {
                            [TYPE]: TYPE_NAME.NUMBER,
                            [SYM_FAKER]: () => 3,
                        },
                        max: {
                            [TYPE]: TYPE_NAME.NUMBER,
                            [SYM_FAKER]: () => 3,
                        },
                    },
                },
                obj: {
                    [TYPE]: TYPE_NAME.OBJECT,
                    [PROP_COUNT]: {
                        min: { [PROP_DATA_PATH]: 'keys/min' },
                        max: 2,
                    },
                    [SYM_FAKER]: () => ({ [Symbol()]: 0, [Symbol()]: 0 }),
                },
            },
        },
    },
    {
        name: `${TYPE_NAME.OBJECT}#${PROP_COUNT} -- min / max ${PROP_DATA_PATH}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                keys: {
                    [TYPE]: TYPE_NAME.OBJECT,
                    [SYM_SCHEMA_PROPERTIES]: {
                        min: {
                            [TYPE]: TYPE_NAME.NUMBER,
                            [SYM_FAKER]: () => 1,
                        },
                        max: {
                            [TYPE]: TYPE_NAME.NUMBER,
                            [SYM_FAKER]: () => 2,
                        },
                    },
                },
                obj: {
                    [TYPE]: TYPE_NAME.OBJECT,
                    [PROP_COUNT]: {
                        min: 1,
                        max: { [PROP_DATA_PATH]: 'keys/max' },
                    },
                    [SYM_FAKER]: () => ({ [Symbol()]: 0, [Symbol()]: 0 }),
                },
            },
        },
    },
    {
        name: `${TYPE_NAME.OBJECT}#${PROP_COUNT} -- min ${PROP_DATA_PATH} / max ${PROP_DATA_PATH}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                keys: {
                    [TYPE]: TYPE_NAME.OBJECT,
                    [SYM_SCHEMA_PROPERTIES]: {
                        min: {
                            [TYPE]: TYPE_NAME.NUMBER,
                            [SYM_FAKER]: () => 1,
                        },
                        max: {
                            [TYPE]: TYPE_NAME.NUMBER,
                            [SYM_FAKER]: () => 2,
                        },
                    },
                },
                obj: {
                    [TYPE]: TYPE_NAME.OBJECT,
                    [PROP_COUNT]: {
                        min: { [PROP_DATA_PATH]: 'keys/min' },
                        max: { [PROP_DATA_PATH]: 'keys/max' },
                    },
                    [SYM_FAKER]: () => ({ [Symbol()]: 0, [Symbol()]: 0 }),
                },
            },
        },
    },
    {
        name: `${TYPE_NAME.OBJECT}#${PROP_COUNT} -- min ${PROP_DATA_PATH} / max ${PROP_DATA_PATH}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_NAME.OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                keys: {
                    [TYPE]: TYPE_NAME.OBJECT,
                    [SYM_SCHEMA_PROPERTIES]: {
                        min: {
                            [TYPE]: TYPE_NAME.NUMBER,
                            [SYM_FAKER]: () => 3,
                        },
                        max: {
                            [TYPE]: TYPE_NAME.NUMBER,
                            [SYM_FAKER]: () => 3,
                        },
                    },
                },
                obj: {
                    [TYPE]: TYPE_NAME.OBJECT,
                    [PROP_COUNT]: {
                        min: { [PROP_DATA_PATH]: 'keys/min' },
                        max: { [PROP_DATA_PATH]: 'keys/max' },
                    },
                    [SYM_FAKER]: () => ({ [Symbol()]: 0, [Symbol()]: 0 }),
                },
            },
        },
    },
];
