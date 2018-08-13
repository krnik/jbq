/* eslint-disable */
const fs = require('fs');
const path = require('path');

const TYPE_METHOD = {
    CONSTRUCTOR_NAME: 'constructorName',
    INSTANCE_OF: 'instanceOf',
    PERMISSION: 'permission',
    PROPERTIES: 'properties',
    REQUIRED: 'required',
    INCLUDES: 'includes',
    MIN_LEN: 'minLen',
    MAX_LEN: 'maxLen',
    REGEX: 'regex',
    EVERY: 'every',
    VALUE: 'value',
    TYPE: 'type',
    SOME: 'some',
    LEN: 'len',
    MIN: 'min',
    MAX: 'max',
};

const NAME = {
    LIB: 'Valid-JS',
    REPO: 'valid-js',
    CONSTRUCTOR: 'VJS',
};
const WIKI = {
    HOME: 'Home',
    SIDEBAR: '_Sidebar',
    TYPE: 'type',
    TYPE_CUSTOM: 'type-custom',
    TYPE_EXAMPLE: 'type-example',
    TYPE_WRAPPER: 'type-wrapper',
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
    },
    NUMBER: {
        TYPE_EXAMPLE: `number-${TYPE_METHOD.TYPE}-example`,
        MIN_EXAMPLE: `number-${TYPE_METHOD.MIN}-example`,
        MAX_EXAMPLE: `number-${TYPE_METHOD.MAX}-example`,
    },
    OBJECT: {
        TYPE_EXAMPLE: `object-${TYPE_METHOD.TYPE}-example`,
        CONSTRUCTOR_NAME_EXAMPLE: `object-${TYPE_METHOD.CONSTRUCTOR_NAME}-example`,
        INSTANCE_OF_EXAMPLE: `object-${TYPE_METHOD.INSTANCE_OF}-example`,
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
};
const PATH = {
    BOOL: {
        SRC: 'src/types/Boolean.ts',
        EXAMPLE: {
            TYPE: `../../wiki/${WIKI.TYPE_EXAMPLE}#${ANCHOR.BOOL.TYPE_EXAMPLE}`,
            VALE: `../../wiki/${WIKI.TYPE_EXAMPLE}#${ANCHOR.BOOL.VALUE_EXAMPLE}`,
        },
    },
    STRING: {
        SRC: 'src/types/Boolean.ts',
        EXAMPLE: {
            TYPE: `../../wiki/${WIKI.TYPE_EXAMPLE}#${ANCHOR.STRING.TYPE_EXAMPLE}`,
            MIN_LEN: `../../wiki/${WIKI.TYPE_EXAMPLE}#${ANCHOR.STRING.MIN_LEN_EXAMPLE}`,
            MAX_LEN: `../../wiki/${WIKI.TYPE_EXAMPLE}#${ANCHOR.STRING.MAX_LEN_EXAMPLE}`,
            LEN: `../../wiki/${WIKI.TYPE_EXAMPLE}#${ANCHOR.STRING.LEN_EXAMPLE}`,
            REGEX: `../../wiki/${WIKI.TYPE_EXAMPLE}#${ANCHOR.STRING.REGEX_EXAMPLE}`,
        },
    },
    NUMBER: {
        SRC: 'src/types/Number.ts',
        EXAMPLE: {
            TYPE: `../../wiki/${WIKI.TYPE_EXAMPLE}#${ANCHOR.NUMBER.TYPE_EXAMPLE}`,
            MIN: `../../wiki/${WIKI.TYPE_EXAMPLE}#${ANCHOR.NUMBER.MIN_EXAMPLE}`,
            MAX: `../../wiki/${WIKI.TYPE_EXAMPLE}#${ANCHOR.NUMBER.MAX_EXAMPLE}`,
        },
    },
    OBJECT: {
        SRC: 'src/types/Object.ts',
        EXAMPLE: {
            TYPE: `../../wiki/${WIKI.TYPE_EXAMPLE}#${ANCHOR.OBJECT.TYPE_EXAMPLE}`,
            CONSTRUCTOR_NAME: `../../wiki/${WIKI.TYPE_EXAMPLE}#${ANCHOR.OBJECT.CONSTRUCTOR_NAME_EXAMPLE}`,
            INSTANCE_OF: `../../wiki/${WIKI.TYPE_EXAMPLE}#${ANCHOR.OBJECT.INSTANCE_OF_EXAMPLE}`,
        },
    },
    ARRAY: {
        SRC: 'src/types/Array.ts',
        EXAMPLE: {
            TYPE: `../../wiki/${WIKI.TYPE_EXAMPLE}#${ANCHOR.ARRAY.TYPE_EXAMPLE}`,
            MIN_LEN: `../../wiki/${WIKI.TYPE_EXAMPLE}#${ANCHOR.ARRAY.MIN_LEN_EXAMPLE}`,
            MAX_LEN: `../../wiki/${WIKI.TYPE_EXAMPLE}#${ANCHOR.ARRAY.MAX_LEN_EXAMPLE}`,
            LEN: `../../wiki/${WIKI.TYPE_EXAMPLE}#${ANCHOR.ARRAY.LEN_EXAMPLE}`,
            EVERY: `../../wiki/${WIKI.TYPE_EXAMPLE}#${ANCHOR.ARRAY.EVERY_EXAMPLE}`,
            SOME: `../../wiki/${WIKI.TYPE_EXAMPLE}#${ANCHOR.ARRAY.SOME_EXAMPLE}`,
            INCLUDES: `../../wiki/${WIKI.TYPE_EXAMPLE}#${ANCHOR.ARRAY.INCLUDES_EXAMPLE}`,
        },
    },
};

const files = [
    {
        path: path.resolve(__dirname, './templates/readme.md'),
        out: path.resolve(__dirname, '../README.md'),
    },
    {
        path: path.resolve(__dirname, './templates/wiki-home.md'),
        out: path.resolve(__dirname, `../valid-js.wiki/${WIKI.HOME}.md`),
    },
    {
        path: path.resolve(__dirname, './templates/wiki-sidebar.md'),
        out: path.resolve(__dirname, `../valid-js.wiki/${WIKI.SIDEBAR}.md`),
    },
    {
        path: path.resolve(__dirname, './templates/wiki-type-custom.md'),
        out: path.resolve(__dirname, `../valid-js.wiki/${WIKI.TYPE_CUSTOM}.md`),
    },
    {
        path: path.resolve(__dirname, './templates/wiki-type-example.md'),
        out: path.resolve(__dirname, `../valid-js.wiki/${WIKI.TYPE_EXAMPLE}.md`),
    },
    {
        path: path.resolve(__dirname, './templates/wiki-type.md'),
        out: path.resolve(__dirname, `../valid-js.wiki/${WIKI.TYPE}.md`),
    },
];

for (const file of files) {
    const content = fs
        .readFileSync(file.path)
        .toString()
        .replace(/`/g, '\\`');
    fs.writeFileSync(file.out, eval(`\`${content}\``));
}
