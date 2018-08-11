import { LEN, MAX, MAX_LEN, MIN, MIN_LEN, REGEX, SYM_SCHEMA_COLLECTION, SYM_SCHEMA_PROPERTIES, TYPE, VALUE } from '../../constants';

const SYM_FAKER = Symbol.for('faker');
const name = {
    [TYPE]: 'string',
    [MAX_LEN]: 64,
    [MIN_LEN]: 2,
    [SYM_FAKER]: ['name.firstName'],
};
const email = {
    [TYPE]: 'string',
    [MIN_LEN]: 4,
    [REGEX]: /@/,
    [SYM_FAKER]: ['internet.email'],
};
const password = {
    [TYPE]: 'string',
    [MIN_LEN]: 4,
    [SYM_FAKER]: ['internet.password'],
};
const date = {
    [TYPE]: 'string',
    [REGEX]: /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/,
    [SYM_FAKER]: ['helpers.replaceSymbolWithNumber', '####-##-##T##:##:##.###Z'],
};
const age = {
    [TYPE]: 'number',
    [MIN]: 18,
    [MAX]: 120,
    [SYM_FAKER]: ['random.number', { max: 120, min: 18 }],
};
const isTrue = {
    [TYPE]: 'boolean',
    [VALUE]: true,
    [SYM_FAKER]: () => true,
};
const isFalse = {
    [TYPE]: 'boolean',
    [VALUE]: false,
    [SYM_FAKER]: () => false,
};
const id = {
    [TYPE]: 'number',
    [MIN]: 1,
    [MAX]: 10000,
    [SYM_FAKER]: ['random.number', { max: 10000, min: 1 }],
};
const content = {
    [TYPE]: 'string',
    [MIN_LEN]: 1,
    [SYM_FAKER]: ['lorem.paragraph'],
};

export const schemas = {
    Name: name,
    Email: email,
    Password: password,
    Date: date,
    Age: age,
    IsTrue: isTrue,
    IsFalse: isFalse,
    Address: {
        [TYPE]: 'object',
        [SYM_SCHEMA_PROPERTIES]: {
            street: {
                [TYPE]: 'string',
                [LEN]: 8,
                [SYM_FAKER]: () => 'Main St.',
            },
            zipCode: {
                [TYPE]: 'string',
                [LEN]: 6,
                [REGEX]: /\d{2}-\d{3}/,
                [SYM_FAKER]: ['address.zipCode', '##-###'],
            },
        },
    },
    User: {
        [TYPE]: 'object',
        [SYM_SCHEMA_PROPERTIES]: {
            age,
            email,
            password,
            joined: date,
            firstName: name,
            lastName: name,
            male: isTrue,
            admin: isFalse,
            files: {
                [TYPE]: 'array',
                [SYM_SCHEMA_COLLECTION]: id,
            },
            comments: {
                [TYPE]: 'array',
                [SYM_SCHEMA_COLLECTION]: id,
            },
        },
    },
    File: {
        [TYPE]: 'object',
        [SYM_SCHEMA_PROPERTIES]: {
            date,
            content,
            user: id,
            title: name,
        },
    },
    Comment: {
        [TYPE]: 'object',
        [SYM_SCHEMA_PROPERTIES]: {
            date,
            content,
            user: id,
        },
    },
    UserResources: {
        [TYPE]: 'object',
        [SYM_SCHEMA_PROPERTIES]: {
            files: {
                [TYPE]: 'array',
                [SYM_SCHEMA_COLLECTION]: {
                    [TYPE]: 'object',
                    [SYM_SCHEMA_PROPERTIES]: {
                        date,
                        content,
                        user: id,
                        title: name,
                    },
                },
            },
            comments: {
                [TYPE]: 'array',
                [SYM_SCHEMA_COLLECTION]: {
                    [TYPE]: 'object',
                    [SYM_SCHEMA_PROPERTIES]: {
                        date,
                        content,
                        user: id,
                    },
                },
            },
        },
    },
};
