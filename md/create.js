/* eslint-disable */
const fs = require('fs');
const path = require('path');

const TYPE_METHOD = {
    CONSTRUCTOR_NAME: 'constructorName',
    MIN_PROP_COUNT: 'minPropCount',
    MAX_PROP_COUNT: 'maxPropCount',
    MIN_KEY_COUNT: 'minKeyCount',
    MAX_KEY_COUNT: 'maxKeyCount',
    INSTANCE_OF: 'instanceOf',
    MULTIPLE_OF: 'multipleOf',
    PROPERTIES: 'properties',
    REQUIRED: 'required',
    INCLUDES: 'includes',
    MIN_LEN: 'minLen',
    MAX_LEN: 'maxLen',
    ONE_OF: 'oneOf',
    REGEX: 'regex',
    EVERY: 'every',
    VALUE: 'value',
    TYPE: 'type',
    SOME: 'some',
    LEN: 'len',
    MIN: 'min',
    MAX: 'max',
};

const SYM = {
    TYPE_KEY_ORDER: 'Symbol.for(\'type_key_order\')',
    TYPE_VALIDATE: 'Symbol.for(\'type_validate\')',
    TYPE_EXTERNAL: 'Symbol.for(\'type_external\')',
    TYPE_FOR_LOOP: 'Symbol.for(\'type_for_loop\')',
    SCHEMA_PROPERTIES: 'Symbol.for(\'schema_properties\')',
    SCHEMA_CONFIG: 'Symbol.for(\'schema_config\')',
    SCHEMA_COLLECTION: 'Symbol.for(\'schema_collection\')',
};

const NAME = {
    LIB: 'VJS-Validator',
    REPO: 'vjs-validator',
    CONSTRUCTOR: 'VJS',
    TYPES: 'VJSTypes',
}
const TOKEN = {
    BREAK: '//{break}',
};

const WIKI = {
    HOME: 'Home',
    SIDEBAR: '_Sidebar',
    TYPE: 'type',
    TYPE_CUSTOM: 'type-custom',
    TYPE_EXAMPLE: 'type-example',
    TYPE_WRAPPER: 'type-wrapper',
    PARSER: 'parser',
};
const ANCHOR = {
    BOOL: {
        TYPE_EXAMPLE: `boolean-${TYPE_METHOD.TYPE}-example`,
        VALUE_EXAMPLE: `boolean-${TYPE_METHOD.VALUE}-example`,
    },
    STRING: {
        TYPE_EXAMPLE: `string-${TYPE_METHOD.TYPE}-example`,
        MIN_LEN_EXAMPLE: `string-${TYPE_METHOD.MIN_LEN}-example`,
        MAX_LEN_EXAMPLE: `string-${TYPE_METHOD.MAX_LEN}-example`,
        LEN_EXAMPLE: `string-${TYPE_METHOD.LEN}-example`,
        REGEX_EXAMPLE: `string-${TYPE_METHOD.REGEX}-example`,
        ONE_OF_EXAMPLE: `string-${TYPE_METHOD.ONE_OF}-example`,
    },
    NUMBER: {
        TYPE_EXAMPLE: `number-${TYPE_METHOD.TYPE}-example`,
        MIN_EXAMPLE: `number-${TYPE_METHOD.MIN}-example`,
        MAX_EXAMPLE: `number-${TYPE_METHOD.MAX}-example`,
        MULTIPLE_OF_EXAMPLE: `number-${TYPE_METHOD.MULTIPLE_OF}-example`,
        ONE_OF_EXAMPLE: `number-${TYPE_METHOD.ONE_OF}-example`,
    },
    OBJECT: {
        TYPE_EXAMPLE: `object-${TYPE_METHOD.TYPE}-example`,
        CONSTRUCTOR_NAME_EXAMPLE: `object-${TYPE_METHOD.CONSTRUCTOR_NAME}-example`,
        INSTANCE_OF_EXAMPLE: `object-${TYPE_METHOD.INSTANCE_OF}-example`,
        MIN_PROP_COUNT_EXAMPLE: `object-${TYPE_METHOD.MIN_PROP_COUNT}-example`,
        MIN_KEY_COUNT_EXAMPLE: `object-${TYPE_METHOD.MIN_KEY_COUNT}-example`,
        MAX_PROP_COUNT_EXAMPLE: `object-${TYPE_METHOD.MAX_PROP_COUNT}-example`,
        MAX_KEY_COUNT_EXAMPLE: `object-${TYPE_METHOD.MAX_KEY_COUNT}-example`,
    },
    ARRAY: {
        TYPE_EXAMPLE: `array-${TYPE_METHOD.TYPE}-example`,
        MIN_LEN_EXAMPLE: `array-${TYPE_METHOD.MIN_LEN}-example`,
        MAX_LEN_EXAMPLE: `array-${TYPE_METHOD.MAX_LEN}-example`,
        LEN_EXAMPLE: `array-${TYPE_METHOD.lEN}-example`,
        EVERY_EXAMPLE: `array-${TYPE_METHOD.EVERY}-example`,
        SOME_EXAMPLE: `array-${TYPE_METHOD.SOME}-example`,
        INCLUDES_EXAMPLE: `array-${TYPE_METHOD.INCLUDES}-example`,
    },
    ANY: {
        TYPE_EXAMPLE: `any-${TYPE_METHOD.TYPE}-example`,
        REQUIRED_EXAMPLE: `any-${TYPE_METHOD.TYPE}-example`,
    },
};
const PATH = {
    BOOL: {
        SRC: '../blob/master/src/types/Boolean.ts',
        EXAMPLE: {
            TYPE: `${WIKI.TYPE_EXAMPLE}#${ANCHOR.BOOL.TYPE_EXAMPLE}`,
            VALE: `${WIKI.TYPE_EXAMPLE}#${ANCHOR.BOOL.VALUE_EXAMPLE}`,
        },
    },
    STRING: {
        SRC: '../blob/master/src/types/Boolean.ts',
        EXAMPLE: {
            TYPE: `${WIKI.TYPE_EXAMPLE}#${ANCHOR.STRING.TYPE_EXAMPLE}`,
            MIN_LEN: `${WIKI.TYPE_EXAMPLE}#${ANCHOR.STRING.MIN_LEN_EXAMPLE}`,
            MAX_LEN: `${WIKI.TYPE_EXAMPLE}#${ANCHOR.STRING.MAX_LEN_EXAMPLE}`,
            LEN: `${WIKI.TYPE_EXAMPLE}#${ANCHOR.STRING.LEN_EXAMPLE}`,
            REGEX: `${WIKI.TYPE_EXAMPLE}#${ANCHOR.STRING.REGEX_EXAMPLE}`,
        },
    },
    NUMBER: {
        SRC: '../blob/master/src/types/Number.ts',
        EXAMPLE: {
            TYPE: `${WIKI.TYPE_EXAMPLE}#${ANCHOR.NUMBER.TYPE_EXAMPLE}`,
            MIN: `${WIKI.TYPE_EXAMPLE}#${ANCHOR.NUMBER.MIN_EXAMPLE}`,
            MAX: `${WIKI.TYPE_EXAMPLE}#${ANCHOR.NUMBER.MAX_EXAMPLE}`,
            MULTIPLE_OF: `${WIKI.TYPE_EXAMPLE}${ANCHOR.NUMBER.MULTIPLE_OF_EXAMPLE}`,
        },
    },
    OBJECT: {
        SRC: '../blob/master/src/types/Object.ts',
        EXAMPLE: {
            TYPE: `${WIKI.TYPE_EXAMPLE}#${ANCHOR.OBJECT.TYPE_EXAMPLE}`,
            CONSTRUCTOR_NAME: `${WIKI.TYPE_EXAMPLE}#${ANCHOR.OBJECT.CONSTRUCTOR_NAME_EXAMPLE}`,
            INSTANCE_OF: `${WIKI.TYPE_EXAMPLE}#${ANCHOR.OBJECT.INSTANCE_OF_EXAMPLE}`,
        },
    },
    ARRAY: {
        SRC: '../blob/master/src/types/Array.ts',
        EXAMPLE: {
            TYPE: `${WIKI.TYPE_EXAMPLE}#${ANCHOR.ARRAY.TYPE_EXAMPLE}`,
            MIN_LEN: `${WIKI.TYPE_EXAMPLE}#${ANCHOR.ARRAY.MIN_LEN_EXAMPLE}`,
            MAX_LEN: `${WIKI.TYPE_EXAMPLE}#${ANCHOR.ARRAY.MAX_LEN_EXAMPLE}`,
            LEN: `${WIKI.TYPE_EXAMPLE}#${ANCHOR.ARRAY.LEN_EXAMPLE}`,
            EVERY: `${WIKI.TYPE_EXAMPLE}#${ANCHOR.ARRAY.EVERY_EXAMPLE}`,
            SOME: `${WIKI.TYPE_EXAMPLE}#${ANCHOR.ARRAY.SOME_EXAMPLE}`,
            INCLUDES: `${WIKI.TYPE_EXAMPLE}#${ANCHOR.ARRAY.INCLUDES_EXAMPLE}`,
        },
    },
    ANY: {
        SRC: '../blob/master/src/types/Any.ts',
        EXAMPLE: {
            TYPE: `${WIKI.TYPE_EXAMPLE}`,
            REQUIRED: `${WIKI.TYPE_EXAMPLE}`,
        },
    },
    PARSER: {
        SRC: '../blob/master/src/core/Parser.ts',
    },
    TYPE_WRAPPER: {
        SRC: '../blob/master/src/types/Wrapper.ts',
    },
};

const files = [
    {
        in: path.resolve(__dirname, './templates/readme.md'),
        out: path.resolve(__dirname, '../README.md'),
    },
    {
        in: path.resolve(__dirname, './templates/wiki-home.md'),
        out: path.resolve(__dirname, `../vjs-validator.wiki/${WIKI.HOME}.md`),
    },
    {
        in: path.resolve(__dirname, './templates/wiki-sidebar.md'),
        out: path.resolve(__dirname, `../vjs-validator.wiki/${WIKI.SIDEBAR}.md`),
    },
    {
        in: path.resolve(__dirname, './templates/wiki-type-custom.md'),
        out: path.resolve(__dirname, `../vjs-validator.wiki/${WIKI.TYPE_CUSTOM}.md`),
    },
    {
        in: path.resolve(__dirname, './templates/wiki-type.md'),
        out: path.resolve(__dirname, `../vjs-validator.wiki/${WIKI.TYPE}.md`),
    },
    {
        in: path.resolve(__dirname, './templates/wiki-parser.md'),
        out: path.resolve(__dirname, `../vjs-validator.wiki/${WIKI.PARSER}.md`),
    },
    {
        in: path.resolve(__dirname, './templates/wiki-type-wrapper.md'),
        out: path.resolve(__dirname, `../vjs-validator.wiki/${WIKI.TYPE_WRAPPER}.md`),
    },
    {
        in: path.resolve(__dirname, './templates/wiki-type-example.md'),
        out: path.resolve(__dirname, `../vjs-validator.wiki/${WIKI.TYPE_EXAMPLE}.md`),
    },
];

for (const file of files) {
    const content = fs
        .readFileSync(file.in)
        .toString()
        .replace(/`/g, '\\`');
    fs.writeFileSync(file.out, eval(`\`${content}\``));
}
