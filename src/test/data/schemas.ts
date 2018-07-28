import { LEN, MAX, MAX_LEN, MIN, MIN_LEN, REGEX, SYM_SCHEMA_COLLECTION, SYM_SCHEMA_FLAT, SYM_SCHEMA_OBJECT, TYPE, VALUE } from '../../constants';

const name = {
    [TYPE]: 'string',
    [MAX_LEN]: 64,
    [MIN_LEN]: 2,
    [Symbol.for('faker')]: ['name.firstName'],
};
const email = {
    [TYPE]: 'string',
    [MIN_LEN]: 4,
    [REGEX]: /@/,
    [Symbol.for('faker')]: ['internet.email'],
};
const password = {
    [TYPE]: 'string',
    [MIN_LEN]: 4,
    [Symbol.for('faker')]: ['internet.password'],
};
const date = {
    [TYPE]: 'string',
    [REGEX]: /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/,
    [Symbol.for('faker')]: ['helpers.replaceSymbolWithNumber', '####-##-##T##:##:##.###Z'],
};
const age = {
    [TYPE]: 'number',
    [MIN]: 18,
    [MAX]: 120,
    [Symbol.for('faker')]: ['random.number', { max: 120, min: 18 }],
};
const isTrue = {
    [TYPE]: 'boolean',
    [VALUE]: true,
    [Symbol.for('faker')]: () => true,
};
const isFalse = {
    [TYPE]: 'boolean',
    [VALUE]: false,
    [Symbol.for('faker')]: () => false,
};
const id = {
    [TYPE]: 'number',
    [MIN]: 1,
    [MAX]: 10000,
    [Symbol.for('faker')]: ['random.number', { max: 10000, min: 1 }],
};
const content = {
    [TYPE]: 'string',
    [MIN_LEN]: 1,
    [Symbol.for('faker')]: ['lorem.paragraph'],
};

export const schemas = {
    Name: {
        ...name,
        [SYM_SCHEMA_FLAT]: true,
    },
    Email: {
        ...email,
        [SYM_SCHEMA_FLAT]: true,
    },
    Password: {
        ...password,
        [SYM_SCHEMA_FLAT]: true,
    },
    Date: {
        ...date,
        [SYM_SCHEMA_FLAT]: true,
    },
    Age: {
        ...age,
        [SYM_SCHEMA_FLAT]: true,
    },
    IsTrue: {
        ...isTrue,
        [SYM_SCHEMA_FLAT]: true,
    },
    IsFalse: {
        ...isFalse,
        [SYM_SCHEMA_FLAT]: true,
    },
    Address: {
        [TYPE]: 'object',
        [SYM_SCHEMA_FLAT]: true,
        [SYM_SCHEMA_OBJECT]: {
            street: {
                [TYPE]: 'string',
                [LEN]: 8,
                [Symbol.for('faker')]: () => 'Main St.',
            },
            zipCode: {
                [TYPE]: 'string',
                [LEN]: 6,
                [REGEX]: /\d{2}-\d{3}/,
                [Symbol.for('faker')]: ['address.zipCode', '##-###'],
            },
        },
    },
    User: {
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
            [SYM_SCHEMA_FLAT]: true,
            [SYM_SCHEMA_COLLECTION]: {
                ...id,
                [SYM_SCHEMA_FLAT]: true,
            },
        },
        comments: {
            [TYPE]: 'array',
            [SYM_SCHEMA_FLAT]: true,
            [SYM_SCHEMA_COLLECTION]: {
                ...id,
                [SYM_SCHEMA_FLAT]: true,
            },
        },
    },
    File: {
        date,
        content,
        user: id,
        title: name,
    },
    Comment: {
        date,
        content,
        user: id,
    },
    UserResources: {
        files: {
            [TYPE]: 'array',
            [SYM_SCHEMA_FLAT]: true,
            [SYM_SCHEMA_COLLECTION]: {
                date,
                content,
                user: id,
                title: name,
            },
        },
        comments: {
            [TYPE]: 'array',
            [SYM_SCHEMA_FLAT]: true,
            [SYM_SCHEMA_COLLECTION]: {
                date,
                content,
                user: id,
            },
        },
    },
};
