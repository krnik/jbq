/* eslint-disable */
const fs = require('fs');
const path = require('path');

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
    TYPE_EXAMPLE: 'boolean-type-example',
    VALUE_EXAMPLE: 'boolean-value-example',
  },
  STRING: {
    TYPE_EXAMPLE: 'string-type-example',
    MIN_LEN_EXAMPLE: 'string-minLen-example',
    MAX_LEN_EXAMPLE: 'string-maxLen-example',
    LEN_EXAMPLE: 'string-len-example',
    REGEX_EXAMPLE: 'string-regex-example',
  },
  NUMBER: {
    TYPE_EXAMPLE: 'number-type-example',
    MIN_EXAMPLE: 'number-min-example',
    MAX_EXAMPLE: 'number-max-example',
  },
  OBJECT: {
    TYPE_EXAMPLE: 'object-type-example',
    CONSTR_NAME_EXAMPLE: 'object-constructorName-example',
    INSTANCE_OF_EXAMPLE: 'object-instanceOf-example',
  },
  ARRAY: {
    TYPE_EXAMPLE: 'array-type-example',
    MIN_LEN_EXAMPLE: 'array-minLen-example',
    MAX_LEN_EXAMPLE: 'array-maxLen-example',
    LEN_EXAMPLE: 'array-len-example',
    EVERY_EXAMPLE: 'array-every-example',
    SOME_EXAMPLE: 'array-some-example',
    INCLUDES_EXAMPLE: 'array-includes-example',
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
      CONSTR_NAME: `../../wiki/${WIKI.TYPE_EXAMPLE}#${ANCHOR.OBJECT.CONSTR_NAME_EXAMPLE}`,
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
    const content = fs.readFileSync(file.path).toString().replace(/`/g, '\\`');
    const parsed = eval(`\`${content}\``);
    fs.writeFileSync(file.out, parsed);
}
