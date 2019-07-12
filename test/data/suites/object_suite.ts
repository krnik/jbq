import {
    CONSTRUCTOR_NAME,
    INSTANCE_OF,
    KEY_COUNT,
    PROPERTIES,
    PROP_COUNT,
    PROP_DATA_PATH,
    SYM_SCHEMA_PROPERTIES,
    TYPE,
    TYPE_NUMBER,
    TYPE_OBJECT,
} from '../../../src/misc/constants';
import { SYM_FAKER } from '../../utils';
import { TestSuite } from './suite.interface';

export const suitesObject: TestSuite[] = [
    {
        name: `${TYPE_OBJECT}#${TYPE}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [SYM_FAKER]: (): object => ({}),
        },
    },
    {
        name: `${TYPE_OBJECT}#${TYPE}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [SYM_FAKER]: (): object => [],
        },
    },
    {
        name: `${TYPE_OBJECT}#${CONSTRUCTOR_NAME}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [CONSTRUCTOR_NAME]: 'Set',
            [SYM_FAKER]: (): object => new Set(),
        },
    },
    {
        name: `${TYPE_OBJECT}#${CONSTRUCTOR_NAME}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [CONSTRUCTOR_NAME]: 'Array',
            [SYM_FAKER]: (): object => new Set(),
        },
    },
    {
        name: `${TYPE_OBJECT}#${INSTANCE_OF}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [INSTANCE_OF]: Set,
            [SYM_FAKER]: (): object => new Set(),
        },
    },
    {
        name: `${TYPE_OBJECT}#${INSTANCE_OF}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [INSTANCE_OF]: Map,
            [SYM_FAKER]: (): object => new Set(),
        },
    },
    {
        name: `${TYPE_OBJECT}#${PROPERTIES}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [PROPERTIES]: ['key', Symbol.for('key')],
            [SYM_FAKER]: (): object => ({ key: true, [Symbol.for('key')]: true }),
        },
    },
    {
        name: `${TYPE_OBJECT}#${PROPERTIES}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [PROPERTIES]: ['key', Symbol.for('key')],
            [SYM_FAKER]: (): object => ({ [Symbol.for('key')]: true }),
        },
    },
    {
        name: `${TYPE_OBJECT}#${KEY_COUNT} -- exact`,
        valid: true,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [KEY_COUNT]: 0,
            [SYM_FAKER]: (): object => ({}),
        },
    },
    {
        name: `${TYPE_OBJECT}#${KEY_COUNT} -- exact`,
        valid: false,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [KEY_COUNT]: 1,
            [SYM_FAKER]: (): object => ({}),
        },
    },
    {
        name: `${TYPE_OBJECT}#${KEY_COUNT} -- exact ${PROP_DATA_PATH}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                keys: {
                    [TYPE]: TYPE_NUMBER,
                    [SYM_FAKER]: (): number => 0,
                },
                obj: {
                    [TYPE]: TYPE_OBJECT,
                    [KEY_COUNT]: { [PROP_DATA_PATH]: 'keys' },
                    [SYM_FAKER]: (): object => ({}),
                },
            },
        },
    },
    {
        name: `${TYPE_OBJECT}#${KEY_COUNT} -- exact ${PROP_DATA_PATH}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                keys: {
                    [TYPE]: TYPE_NUMBER,
                    [SYM_FAKER]: (): number => 1,
                },
                obj: {
                    [TYPE]: TYPE_OBJECT,
                    [KEY_COUNT]: { [PROP_DATA_PATH]: 'keys' },
                    [SYM_FAKER]: (): object => ({}),
                },
            },
        },
    },
    {
        name: `${TYPE_OBJECT}#${KEY_COUNT} -- min`,
        valid: true,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [KEY_COUNT]: { min: 1 },
            [SYM_FAKER]: (): object => ({ whoa: true }),
        },
    },
    {
        name: `${TYPE_OBJECT}#${KEY_COUNT} -- min`,
        valid: false,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [KEY_COUNT]: { min: 2 },
            [SYM_FAKER]: (): object => ({ whoa: true }),
        },
    },
    {
        name: `${TYPE_OBJECT}#${KEY_COUNT} -- min ${PROP_DATA_PATH}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                keys: {
                    [TYPE]: TYPE_NUMBER,
                    [SYM_FAKER]: (): number => 1,
                },
                obj: {
                    [TYPE]: TYPE_OBJECT,
                    [KEY_COUNT]: {
                        min: { [PROP_DATA_PATH]: 'keys' },
                    },
                    [SYM_FAKER]: (): object => ({ whoa: true }),
                },
            },
        },
    },
    {
        name: `${TYPE_OBJECT}#${KEY_COUNT} -- min ${PROP_DATA_PATH}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                keys: {
                    [TYPE]: TYPE_NUMBER,
                    [SYM_FAKER]: (): number => 2,
                },
                obj: {
                    [TYPE]: TYPE_OBJECT,
                    [KEY_COUNT]: {
                        min: { [PROP_DATA_PATH]: 'keys' },
                    },
                    [SYM_FAKER]: (): object => ({ whoa: true }),
                },
            },
        },
    },
    {
        name: `${TYPE_OBJECT}#${KEY_COUNT} -- max`,
        valid: true,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [KEY_COUNT]: { max: 2 },
            [SYM_FAKER]: (): object => ({ whoa: true }),
        },
    },
    {
        name: `${TYPE_OBJECT}#${KEY_COUNT} -- max`,
        valid: false,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [KEY_COUNT]: { max: 0 },
            [SYM_FAKER]: (): object => ({ whoa: true }),
        },
    },
    {
        name: `${TYPE_OBJECT}#${KEY_COUNT} -- max ${PROP_DATA_PATH}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                keys: {
                    [TYPE]: TYPE_NUMBER,
                    [SYM_FAKER]: (): number => 1,
                },
                obj: {
                    [TYPE]: TYPE_OBJECT,
                    [KEY_COUNT]: {
                        max: { [PROP_DATA_PATH]: 'keys' },
                    },
                    [SYM_FAKER]: (): object => ({ whoa: true }),
                },
            },
        },
    },
    {
        name: `${TYPE_OBJECT}#${KEY_COUNT} -- max ${PROP_DATA_PATH}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                keys: {
                    [TYPE]: TYPE_NUMBER,
                    [SYM_FAKER]: (): number => 0,
                },
                obj: {
                    [TYPE]: TYPE_OBJECT,
                    [KEY_COUNT]: {
                        max: { [PROP_DATA_PATH]: 'keys' },
                    },
                    [SYM_FAKER]: (): object => ({ whoa: true }),
                },
            },
        },
    },
    {
        name: `${TYPE_OBJECT}#${KEY_COUNT} -- min / max`,
        valid: true,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [KEY_COUNT]: { min: 1, max: 2 },
            [SYM_FAKER]: (): object => ({ whoa: 1 }),
        },
    },
    {
        name: `${TYPE_OBJECT}#${KEY_COUNT} -- min / max`,
        valid: false,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [KEY_COUNT]: { min: 2, max: 2 },
            [SYM_FAKER]: (): object => ({ whoa: 1 }),
        },
    },
    {
        name: `${TYPE_OBJECT}#${KEY_COUNT} -- min ${PROP_DATA_PATH} / max`,
        valid: true,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                keys: {
                    [TYPE]: TYPE_OBJECT,
                    [SYM_SCHEMA_PROPERTIES]: {
                        min: {
                            [TYPE]: TYPE_NUMBER,
                            [SYM_FAKER]: (): number => 1,
                        },
                        max: {
                            [TYPE]: TYPE_NUMBER,
                            [SYM_FAKER]: (): number => 2,
                        },
                    },
                },
                obj: {
                    [TYPE]: TYPE_OBJECT,
                    [KEY_COUNT]: {
                        min: { [PROP_DATA_PATH]: 'keys/min' },
                        max: 2,
                    },
                    [SYM_FAKER]: (): object => ({ whoa: true, yeah: false }),
                },
            },
        },
    },
    {
        name: `${TYPE_OBJECT}#${KEY_COUNT} -- min ${PROP_DATA_PATH} / max`,
        valid: false,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                keys: {
                    [TYPE]: TYPE_OBJECT,
                    [SYM_SCHEMA_PROPERTIES]: {
                        min: {
                            [TYPE]: TYPE_NUMBER,
                            [SYM_FAKER]: (): number => 3,
                        },
                        max: {
                            [TYPE]: TYPE_NUMBER,
                            [SYM_FAKER]: (): number => 3,
                        },
                    },
                },
                obj: {
                    [TYPE]: TYPE_OBJECT,
                    [KEY_COUNT]: {
                        min: { [PROP_DATA_PATH]: 'keys/min' },
                        max: 2,
                    },
                    [SYM_FAKER]: (): object => ({ whoa: true, yeah: false }),
                },
            },
        },
    },
    {
        name: `${TYPE_OBJECT}#${KEY_COUNT} -- min / max ${PROP_DATA_PATH}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                keys: {
                    [TYPE]: TYPE_OBJECT,
                    [SYM_SCHEMA_PROPERTIES]: {
                        min: {
                            [TYPE]: TYPE_NUMBER,
                            [SYM_FAKER]: (): number => 1,
                        },
                        max: {
                            [TYPE]: TYPE_NUMBER,
                            [SYM_FAKER]: (): number => 2,
                        },
                    },
                },
                obj: {
                    [TYPE]: TYPE_OBJECT,
                    [KEY_COUNT]: {
                        min: 1,
                        max: { [PROP_DATA_PATH]: 'keys/max' },
                    },
                    [SYM_FAKER]: (): object => ({ whoa: true, yeah: false }),
                },
            },
        },
    },
    {
        name: `${TYPE_OBJECT}#${KEY_COUNT} -- min / max ${PROP_DATA_PATH}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                keys: {
                    [TYPE]: TYPE_OBJECT,
                    [SYM_SCHEMA_PROPERTIES]: {
                        min: {
                            [TYPE]: TYPE_NUMBER,
                            [SYM_FAKER]: (): number => 3,
                        },
                        max: {
                            [TYPE]: TYPE_NUMBER,
                            [SYM_FAKER]: (): number => 3,
                        },
                    },
                },
                obj: {
                    [TYPE]: TYPE_OBJECT,
                    [KEY_COUNT]: {
                        min: 3,
                        max: { [PROP_DATA_PATH]: 'keys/max' },
                    },
                    [SYM_FAKER]: (): object => ({ whoa: true, yeah: false }),
                },
            },
        },
    },
    {
        name: `${TYPE_OBJECT}#${KEY_COUNT} -- min ${PROP_DATA_PATH} / max ${PROP_DATA_PATH}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                keys: {
                    [TYPE]: TYPE_OBJECT,
                    [SYM_SCHEMA_PROPERTIES]: {
                        min: {
                            [TYPE]: TYPE_NUMBER,
                            [SYM_FAKER]: (): number => 1,
                        },
                        max: {
                            [TYPE]: TYPE_NUMBER,
                            [SYM_FAKER]: (): number => 2,
                        },
                    },
                },
                obj: {
                    [TYPE]: TYPE_OBJECT,
                    [KEY_COUNT]: {
                        min: { [PROP_DATA_PATH]: 'keys/min' },
                        max: { [PROP_DATA_PATH]: 'keys/max' },
                    },
                    [SYM_FAKER]: (): object => ({ whoa: true, yeah: false }),
                },
            },
        },
    },
    {
        name: `${TYPE_OBJECT}#${KEY_COUNT} -- min ${PROP_DATA_PATH} / max ${PROP_DATA_PATH}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                keys: {
                    [TYPE]: TYPE_OBJECT,
                    [SYM_SCHEMA_PROPERTIES]: {
                        min: {
                            [TYPE]: TYPE_NUMBER,
                            [SYM_FAKER]: (): number => 1,
                        },
                        max: {
                            [TYPE]: TYPE_NUMBER,
                            [SYM_FAKER]: (): number => 2,
                        },
                    },
                },
                obj: {
                    [TYPE]: TYPE_OBJECT,
                    [KEY_COUNT]: {
                        min: { [PROP_DATA_PATH]: 'keys/min' },
                        max: { [PROP_DATA_PATH]: 'keys/max' },
                    },
                    [SYM_FAKER]: (): object => ({}),
                },
            },
        },
    },
    {
        name: `${TYPE_OBJECT}#${PROP_COUNT} -- exact`,
        valid: true,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [PROP_COUNT]: 1,
            [SYM_FAKER]: (): object => ({ [Symbol()]: 0 }),
        },
    },
    {
        name: `${TYPE_OBJECT}#${PROP_COUNT} -- exact`,
        valid: false,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [PROP_COUNT]: 2,
            [SYM_FAKER]: (): object => ({ [Symbol()]: 0 }),
        },
    },
    {
        name: `${TYPE_OBJECT}#${PROP_COUNT} -- exact ${PROP_DATA_PATH}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                keys: {
                    [TYPE]: TYPE_NUMBER,
                    [SYM_FAKER]: (): number => 1,
                },
                obj: {
                    [TYPE]: TYPE_OBJECT,
                    [PROP_COUNT]: { [PROP_DATA_PATH]: 'keys' },
                    [SYM_FAKER]: (): object => ({ [Symbol()]: 0 }),
                },
            },
        },
    },
    {
        name: `${TYPE_OBJECT}#${PROP_COUNT} -- exact ${PROP_DATA_PATH}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                keys: {
                    [TYPE]: TYPE_NUMBER,
                    [SYM_FAKER]: (): number => 2,
                },
                obj: {
                    [TYPE]: TYPE_OBJECT,
                    [PROP_COUNT]: { [PROP_DATA_PATH]: 'keys' },
                    [SYM_FAKER]: (): object => ({ [Symbol()]: 0 }),
                },
            },
        },
    },
    {
        name: `${TYPE_OBJECT}#${PROP_COUNT} -- min`,
        valid: true,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [PROP_COUNT]: { min: 1 },
            [SYM_FAKER]: (): object => ({ [Symbol()]: 0 }),
        },
    },
    {
        name: `${TYPE_OBJECT}#${PROP_COUNT} -- min`,
        valid: false,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [PROP_COUNT]: { min: 2 },
            [SYM_FAKER]: (): object => ({ [Symbol()]: 0 }),
        },
    },
    {
        name: `${TYPE_OBJECT}#${PROP_COUNT} -- min ${PROP_DATA_PATH}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                keys: {
                    [TYPE]: TYPE_NUMBER,
                    [SYM_FAKER]: (): number => 1,
                },
                obj: {
                    [TYPE]: TYPE_OBJECT,
                    [PROP_COUNT]: {
                        min: { [PROP_DATA_PATH]: 'keys' },
                    },
                    [SYM_FAKER]: (): object => ({ [Symbol()]: 0 }),
                },
            },
        },
    },
    {
        name: `${TYPE_OBJECT}#${PROP_COUNT} -- min ${PROP_DATA_PATH}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                keys: {
                    [TYPE]: TYPE_NUMBER,
                    [SYM_FAKER]: (): number => 2,
                },
                obj: {
                    [TYPE]: TYPE_OBJECT,
                    [PROP_COUNT]: {
                        min: { [PROP_DATA_PATH]: 'keys' },
                    },
                    [SYM_FAKER]: (): object => ({ [Symbol()]: 0 }),
                },
            },
        },
    },
    {
        name: `${TYPE_OBJECT}#${PROP_COUNT} -- max`,
        valid: true,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [PROP_COUNT]: { max: 2 },
            [SYM_FAKER]: (): object => ({ [Symbol()]: 0 }),
        },
    },
    {
        name: `${TYPE_OBJECT}#${PROP_COUNT} -- max`,
        valid: false,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [PROP_COUNT]: { max: 0 },
            [SYM_FAKER]: (): object => ({ [Symbol()]: 0 }),
        },
    },
    {
        name: `${TYPE_OBJECT}#${PROP_COUNT} -- max ${PROP_DATA_PATH}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                keys: {
                    [TYPE]: TYPE_NUMBER,
                    [SYM_FAKER]: (): number => 1,
                },
                obj: {
                    [TYPE]: TYPE_OBJECT,
                    [PROP_COUNT]: {
                        max: { [PROP_DATA_PATH]: 'keys' },
                    },
                    [SYM_FAKER]: (): object => ({ [Symbol()]: 0 }),
                },
            },
        },
    },
    {
        name: `${TYPE_OBJECT}#${PROP_COUNT} -- max ${PROP_DATA_PATH}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                keys: {
                    [TYPE]: TYPE_NUMBER,
                    [SYM_FAKER]: (): number => 0,
                },
                obj: {
                    [TYPE]: TYPE_OBJECT,
                    [PROP_COUNT]: {
                        max: { [PROP_DATA_PATH]: 'keys' },
                    },
                    [SYM_FAKER]: (): object => ({ [Symbol()]: 0 }),
                },
            },
        },
    },
    {
        name: `${TYPE_OBJECT}#${PROP_COUNT} -- min / max`,
        valid: true,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [PROP_COUNT]: { min: 1, max: 2 },
            [SYM_FAKER]: (): object => ({ [Symbol()]: 0 }),
        },
    },
    {
        name: `${TYPE_OBJECT}#${PROP_COUNT} -- min / max`,
        valid: false,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [PROP_COUNT]: { min: 2, max: 2 },
            [SYM_FAKER]: (): object => ({ [Symbol()]: 0 }),
        },
    },
    {
        name: `${TYPE_OBJECT}#${PROP_COUNT} -- min ${PROP_DATA_PATH} / max`,
        valid: true,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                keys: {
                    [TYPE]: TYPE_OBJECT,
                    [SYM_SCHEMA_PROPERTIES]: {
                        min: {
                            [TYPE]: TYPE_NUMBER,
                            [SYM_FAKER]: (): number => 1,
                        },
                        max: {
                            [TYPE]: TYPE_NUMBER,
                            [SYM_FAKER]: (): number => 2,
                        },
                    },
                },
                obj: {
                    [TYPE]: TYPE_OBJECT,
                    [PROP_COUNT]: {
                        min: { [PROP_DATA_PATH]: 'keys/min' },
                        max: 2,
                    },
                    [SYM_FAKER]: (): object => ({ [Symbol()]: 0, [Symbol()]: 0 }),
                },
            },
        },
    },
    {
        name: `${TYPE_OBJECT}#${PROP_COUNT} -- min ${PROP_DATA_PATH} / max`,
        valid: false,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                keys: {
                    [TYPE]: TYPE_OBJECT,
                    [SYM_SCHEMA_PROPERTIES]: {
                        min: {
                            [TYPE]: TYPE_NUMBER,
                            [SYM_FAKER]: (): number => 3,
                        },
                        max: {
                            [TYPE]: TYPE_NUMBER,
                            [SYM_FAKER]: (): number => 3,
                        },
                    },
                },
                obj: {
                    [TYPE]: TYPE_OBJECT,
                    [PROP_COUNT]: {
                        min: { [PROP_DATA_PATH]: 'keys/min' },
                        max: 2,
                    },
                    [SYM_FAKER]: (): object => ({ [Symbol()]: 0, [Symbol()]: 0 }),
                },
            },
        },
    },
    {
        name: `${TYPE_OBJECT}#${PROP_COUNT} -- min / max ${PROP_DATA_PATH}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                keys: {
                    [TYPE]: TYPE_OBJECT,
                    [SYM_SCHEMA_PROPERTIES]: {
                        min: {
                            [TYPE]: TYPE_NUMBER,
                            [SYM_FAKER]: (): number => 1,
                        },
                        max: {
                            [TYPE]: TYPE_NUMBER,
                            [SYM_FAKER]: (): number => 2,
                        },
                    },
                },
                obj: {
                    [TYPE]: TYPE_OBJECT,
                    [PROP_COUNT]: {
                        min: 1,
                        max: { [PROP_DATA_PATH]: 'keys/max' },
                    },
                    [SYM_FAKER]: (): object => ({ [Symbol()]: 0, [Symbol()]: 0 }),
                },
            },
        },
    },
    {
        name: `${TYPE_OBJECT}#${PROP_COUNT} -- min ${PROP_DATA_PATH} / max ${PROP_DATA_PATH}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                keys: {
                    [TYPE]: TYPE_OBJECT,
                    [SYM_SCHEMA_PROPERTIES]: {
                        min: {
                            [TYPE]: TYPE_NUMBER,
                            [SYM_FAKER]: (): number => 1,
                        },
                        max: {
                            [TYPE]: TYPE_NUMBER,
                            [SYM_FAKER]: (): number => 2,
                        },
                    },
                },
                obj: {
                    [TYPE]: TYPE_OBJECT,
                    [PROP_COUNT]: {
                        min: { [PROP_DATA_PATH]: 'keys/min' },
                        max: { [PROP_DATA_PATH]: 'keys/max' },
                    },
                    [SYM_FAKER]: (): object => ({ [Symbol()]: 0, [Symbol()]: 0 }),
                },
            },
        },
    },
    {
        name: `${TYPE_OBJECT}#${PROP_COUNT} -- min ${PROP_DATA_PATH} / max ${PROP_DATA_PATH}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_OBJECT,
            [SYM_SCHEMA_PROPERTIES]: {
                keys: {
                    [TYPE]: TYPE_OBJECT,
                    [SYM_SCHEMA_PROPERTIES]: {
                        min: {
                            [TYPE]: TYPE_NUMBER,
                            [SYM_FAKER]: (): number => 3,
                        },
                        max: {
                            [TYPE]: TYPE_NUMBER,
                            [SYM_FAKER]: (): number => 3,
                        },
                    },
                },
                obj: {
                    [TYPE]: TYPE_OBJECT,
                    [PROP_COUNT]: {
                        min: { [PROP_DATA_PATH]: 'keys/min' },
                        max: { [PROP_DATA_PATH]: 'keys/max' },
                    },
                    [SYM_FAKER]: (): object => ({ [Symbol()]: 0, [Symbol()]: 0 }),
                },
            },
        },
    },
];
