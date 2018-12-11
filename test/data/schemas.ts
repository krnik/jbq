import { CONSTRUCTOR_NAME, EVERY, INCLUDES, INSTANCE_OF, LEN, PROPERTIES, REGEX, REQUIRED, SOME, SYM_SCHEMA_PROPERTIES, TYPE, VALUE } from '../../src/constants';
import { callFaker } from './main';

const randomCharacters = (len = 0) => new Array(len)
    .fill(0)
    .reduce((acc) => `${acc}${String.fromCharCode(~~(Math.random() * 1000))}`, '');
const callFakerIfNeeded = (arg: any) => typeof arg === 'function' ? arg() : callFaker(arg);
const SYM_FAKER = Symbol.for('faker');
const VALID = Symbol('valid');
const INVALID = Symbol('invalid');
interface ITestSchema {
    [VALID]?: {
        [k: string]: any;
        [SYM_FAKER]: any;
    };
    [INVALID]?: {
        [k: string]: {
            [p: string]: any;
            [SYM_FAKER]: any;
        };
    };
    [k: string]: any;
}
const $String: ITestSchema = {
    [TYPE]: 'string',
    [LEN]: { min: 2, max: 64 },
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
    [LEN]: {
        ...$String,
        [SYM_FAKER]: () => randomCharacters(124),
    },
    [REGEX]: {
        ...$String,
        [SYM_FAKER]: () => randomCharacters(64).replace(new RegExp($String[REGEX], 'g'), ''),
    },
};
const $Number: ITestSchema = {
    [TYPE]: 'number',
    [VALUE]: { min: 18, max: 120 },
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
    [VALUE]: {
        ...$Number,
        [SYM_FAKER]: ['random.number', { max: 17 }],
    },
};
const $Boolean: ITestSchema = {
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
const $Object: ITestSchema = {
    [TYPE]: 'object',
    [CONSTRUCTOR_NAME]: 'Object',
    [INSTANCE_OF]: Object,
};
$Object[VALID] = {
    ...$Object,
    [PROPERTIES]: ['string', 'number', 'boolean', 'array'],
    [SYM_FAKER]: () => ({
        string: callFakerIfNeeded($String[VALID]![SYM_FAKER]),
        number: callFakerIfNeeded($Number[VALID]![SYM_FAKER]),
        boolean: callFakerIfNeeded($Boolean[VALID]![SYM_FAKER]),
        array: callFakerIfNeeded($Array[VALID]![SYM_FAKER]),
    }),
};
$Object[INVALID] = {
    [TYPE]: {
        ...$Object,
        [SYM_FAKER]: ['random.number'],
    },
    [CONSTRUCTOR_NAME]: {
        ...$Object,
        [SYM_FAKER]: () => {
            class MyObj extends Object { }
            return new MyObj();
        },
    },
    [INSTANCE_OF]: {
        ...$Object,
        [INSTANCE_OF]: RegExp,
        [SYM_FAKER]: () => ({}),
    },
    [PROPERTIES]: {
        ...$Object,
        [PROPERTIES]: ['0', '1'],
        [SYM_FAKER]: () => ({
            string: callFakerIfNeeded($String[VALID]![SYM_FAKER]),
            number: callFakerIfNeeded($Number[VALID]![SYM_FAKER]),
        }),
    },
};

const $Array: ITestSchema = {
    [TYPE]: 'array',
    [EVERY]: (e: any) => Boolean(e),
    [SOME]: (e: any) => Boolean(e),
    [INCLUDES]: 1,
    [LEN]: 8,
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
    [LEN]: {
        ...$Array,
        [SYM_FAKER]: () => new Array(~~(Math.random() * ($Array[LEN] >> 1) + 1)).fill(1),
    },
};
const $Required: ITestSchema = {
    [TYPE]: 'string',
    [REQUIRED]: false,
    [SYM_FAKER]: () => 'undefined',
};

export const schemas = {
    valid: {
        String: $String[VALID]!,
        Number: $Number[VALID]!,
        Boolean: $Boolean[VALID]!,
        Object: $Object[VALID]!,
        Array: $Array[VALID]!,
        Symbols: {
            ...$Object[VALID]!,
            [SYM_SCHEMA_PROPERTIES]: {
                string: $String[VALID]!,
                number: $Number[VALID]!,
                boolean: $Boolean[VALID]!,
                array: $Array[VALID]!,
            },
        },
        Required: $Required,
    },
    invalid: {
        String_type: $String[INVALID]![TYPE],
        String_min_len: $String[INVALID]![LEN],
        String_regex: $String[INVALID]![REGEX],
        Number_type: $Number[INVALID]![TYPE],
        Number_min: $Number[INVALID]![VALUE],
        Boolean_type: $Boolean[INVALID]![TYPE],
        Boolean_value: $Boolean[INVALID]![VALUE],
        Object_type: $Object[INVALID]![TYPE],
        Object_constructor_name: $Object[INVALID]![CONSTRUCTOR_NAME],
        Object_instance_of: $Object[INVALID]![INSTANCE_OF],
        Object_properties: $Object[INVALID]![PROPERTIES],
        Array_type: $Array[INVALID]![TYPE],
        Array_min_len: $Array[INVALID]![LEN],
        Array_len: $Array[INVALID]![LEN],
        Array_some: $Array[INVALID]![SOME],
        Array_every: $Array[INVALID]![EVERY],
        Array_includes: $Array[INVALID]![INCLUDES],
    },
};
