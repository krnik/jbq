import { ISchemas } from 'core/Parser';
import { CONSTRUCTOR_NAME, EVERY, INCLUDES, INSTANCE_OF, LEN, MAX, MAX_LEN, MIN, MIN_LEN, PROPERTIES, REGEX, SOME, SYM_SCHEMA_COLLECTION, SYM_SCHEMA_PROPERTIES, TYPE, VALUE } from '../../constants';
import { callFaker } from '../data/index';

const randomCharacters = (len = 0) => new Array(len)
    .fill(0)
    .reduce((acc) => `${acc}${String.fromCharCode(~~(Math.random() * 1000))}`, '');
const callFakerIfNeeded = (arg: any) => typeof arg === 'function' ? arg() : callFaker(arg);
const SYM_FAKER = Symbol.for('faker');
const VALID = Symbol('valid') as any;
const INVALID = Symbol('invalid') as any;
const $String: { [k: string]: any } = {
    [TYPE]: 'string',
    [MAX_LEN]: 64,
    [MIN_LEN]: 2,
    [REGEX]: /@/,
};
$String[VALID] = {
    ...$String,
    [SYM_FAKER]: ['internet.email'],
};
$String[INVALID] = {
    [TYPE]: {
        ...$String,
        [SYM_FAKER]: ['random.number'],
    },
    [MAX_LEN]: {
        ...$String,
        [SYM_FAKER]: () => randomCharacters(124),
    },
    [MIN_LEN]: {
        ...$String,
        [SYM_FAKER]: () => randomCharacters(1),
    },
    [REGEX]: {
        ...$String,
        [SYM_FAKER]: () => randomCharacters(64).replace(new RegExp($String[REGEX], 'g'), ''),
    },
};
const $Number: { [k: string]: any } = {
    [TYPE]: 'number',
    [MIN]: 18,
    [MAX]: 120,
};
$Number[VALID] = {
    ...$Number,
    [SYM_FAKER]: ['random.number', { max: 120, min: 18 }],
};
$Number[INVALID] = {
    [TYPE]: {
        ...$Number,
        [SYM_FAKER]: ['lorem.word'],
    },
    [MIN]: {
        ...$Number,
        [SYM_FAKER]: ['random.number', { max: 17 }],
    },
    [MAX]: {
        ...$Number,
        [SYM_FAKER]: ['random.number', { min: 121 }],
    },
};
const $Boolean: { [k: string]: any } = {
    [TYPE]: 'boolean',
    [VALUE]: true,
};
$Boolean[VALID] = {
    ...$Boolean,
    [SYM_FAKER]: () => true,
};
$Boolean[INVALID] = {
    [TYPE]: {
        ...$Boolean,
        [SYM_FAKER]: ['lorem.word'],
    },
    [VALUE]: {
        ...$Boolean,
        [SYM_FAKER]: () => false,
    },
};
const $Object: { [k: string]: any } = {
    [TYPE]: 'object',
    [CONSTRUCTOR_NAME]: 'Array',
    [INSTANCE_OF]: Object,
};
$Object[VALID] = {
    ...$Object,
    [PROPERTIES]: ['0'],
    [SYM_FAKER]: () => [{
        string: callFakerIfNeeded($String[VALID][SYM_FAKER]),
        number: callFakerIfNeeded($Number[VALID][SYM_FAKER]),
        boolean: callFakerIfNeeded($Boolean[VALID][SYM_FAKER]),
        array: callFakerIfNeeded($Array[VALID][SYM_FAKER]),
    }],
};
$Object[INVALID] = {
    [TYPE]: {
        ...$Object,
        [SYM_FAKER]: ['random.number'],
    },
    [CONSTRUCTOR_NAME]: {
        ...$Object,
        [SYM_FAKER]: () => {
            class MyArr extends Array {}
            return new MyArr();
        },
    },
    [INSTANCE_OF]: {
        ...$Object,
        [INSTANCE_OF]: RegExp,
        [SYM_FAKER]: () => [],
    },
    [PROPERTIES]: {
        ...$Object,
        [PROPERTIES]: ['0', '1'],
        [SYM_FAKER]: () => [{
            string: callFakerIfNeeded($String[VALID][SYM_FAKER]),
            number: callFakerIfNeeded($Number[VALID][SYM_FAKER]),
        }],
    },
};

const $Array: { [k: string]: any } = {
    [TYPE]: 'array',
    [EVERY]: (e: any) => Boolean(e),
    [SOME]: (e: any) => Boolean(e),
    [INCLUDES]: 1,
    [MIN_LEN]: 4,
    [MAX_LEN]: 16,
    [LEN]: 8,
    [SYM_SCHEMA_COLLECTION]: {
        [TYPE]: 'number',
    }
};
$Array[VALID] = {
    ...$Array,
    [SYM_FAKER]: () => new Array($Array[LEN]).fill(1),
};
$Array[INVALID] = {
    [TYPE]: {
        ...$Array,
        [SYM_FAKER]: ['random.number'],
    },
    [EVERY]: {
        ...$Array,
        [SYM_FAKER]: () => new Array($Array[LEN]).fill(0),
    },
    [SOME]: {
        ...$Array,
        [SYM_FAKER]: () => new Array($Array[LEN]).fill(0),
    },
    [INCLUDES]: {
        ...$Array,
        [SYM_FAKER]: () => new Array($Array[LEN]).fill(0),
    },
    [MIN_LEN]: {
        ...$Array,
        [LEN]: 3,
        [SYM_FAKER]: () => new Array(3).fill(1),
    },
    [MAX_LEN]: {
        ...$Array,
        [LEN]: 32,
        [SYM_FAKER]: () => new Array(32).fill(1),
    },
    [LEN]: {
        ...$Array,
        [SYM_FAKER]: () => new Array(~~(Math.random() * $Array[MIN_LEN] + 1)).fill(1),
    },
};

export const schemas: { [k: string]: ISchemas } = {
    valid: {
        String: $String[VALID],
        Number: $Number[VALID],
        Boolean: $Boolean[VALID],
        Object: $Object[VALID],
        Array: $Array[VALID],
        Symbols: {
            ...$Object[VALID],
            [SYM_SCHEMA_COLLECTION]: {
                [TYPE]: 'object',
                [SYM_SCHEMA_PROPERTIES]: {
                    string: $String[VALID],
                    number: $Number[VALID],
                    boolean: $Boolean[VALID],
                    array: $Array[VALID],
                },
            },
        },
    },
    invalid: {
        String_type: $String[INVALID][TYPE],
        String_min_len: $String[INVALID][MIN_LEN],
        String_max_len: $String[INVALID][MAX_LEN],
        String_regex: $String[INVALID][REGEX],
        Number_type: $Number[INVALID][TYPE],
        Number_min: $Number[INVALID][MIN],
        Number_max: $Number[INVALID][MAX],
        Boolean_type: $Boolean[INVALID][TYPE],
        Boolean_value: $Boolean[INVALID][VALUE],
        Object_type: $Object[INVALID][TYPE],
        Object_constructor_name: $Object[INVALID][CONSTRUCTOR_NAME],
        Object_instance_of: $Object[INVALID][INSTANCE_OF],
        Object_properties: $Object[INVALID][PROPERTIES],
        Array_type: $Array[INVALID][TYPE],
        Array_min_len: $Array[INVALID][MIN_LEN],
        Array_max_len: $Array[INVALID][MAX_LEN],
        Array_len: $Array[INVALID][LEN],
        Array_some: $Array[INVALID][SOME],
        Array_every: $Array[INVALID][EVERY],
        Array_includes: $Array[INVALID][INCLUDES],
    },
};
