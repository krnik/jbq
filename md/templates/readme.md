[![Build Status](https://travis-ci.org/krnik/${NAME.REPO}.svg?branch=master)]
[![npm](https://img.shields.io/npm/v/${NAME.REPO}.svg)](vjs-validator)
(https://travis-ci.org/krnik/${NAME.REPO})
# Table Of Content
- [Introduction](#introduction)
- [Usage Example](#usage-example)
- [Wiki](#wiki)
***
## Introduction
***
Hi! Welcome to ${NAME.LIB} flexible validation library.

Features:
- data validation
- customisable types
- based on schemas
***
## Usage Example
***
> Define your schemas
```javascript
// This symbol is tells ${NAME.LIB} that properties
// of passed value will be validated as well
// You can read more about it in ${WIKI.PARSER} wiki page
const PROPS = ${SYM.SCHEMA_PROPERTIES};
const ITEMS = ${SYM.SCHEMA_COLLECTION};
const schemas = {
    // User schema expects value to be an object
    // with properties ['names', 'email']
    User: {
        // ${TYPE_METHOD.TYPE} tells ${NAME.LIB} which type
        // should be used to validate data
        // it is the only required property for schema
        ${TYPE_METHOD.TYPE}: 'object',
        ${TYPE_METHOD.PROPERTIES}: ['name', 'email'],
        [PROPS]: {
            names: {
                ${TYPE_METHOD.TYPE}: 'array',
                ${TYPE_METHOD.MAX_LEN}: 2,
                [ITEMS]: {
                    ${TYPE_METHOD.TYPE}: 'string',
                },
            },
            email: {
                ${TYPE_METHOD.TYPE}: 'string',
            },
        }
    },
    TwoChars: {
        ${TYPE_METHOD.TYPE}: 'string',
        ${TYPE_METHOD.LEN}: 2,
    },
    Numbers: {
        ${TYPE_METHOD.TYPE}: 'object',
        [${SYM.SCHEMA_CONFIG}]: {
            ${TYPE_METHOD.TYPE}: 'number',
        },
        [PROPS]: {
            smallest: {
                ${TYPE_METHOD.MIN}: 0,
                ${TYPE_METHOD.MAX}: 100,
            },
            medium: {
                ${TYPE_METHOD.MIN}: { $dataPath: 'smallest' },
                ${TYPE_METHOD.MAX}: { $dataPath: 'biggest' },
            },
        },
    },
};
```
> Import and create ${NAME.LIB} instance
```javascript
// ${NAME.TYPES} allows you to add your custom types
const { ${NAME.CONSTRUCTOR}, ${NAME.TYPES} } = require('${NAME.REPO}');
const validator = ${NAME.CONSTRUCTOR}(${NAME.TYPES}, schemas);
```
For more info about `${NAME.TYPES}` see [WIKI](../../wiki/${WIKI.TYPE_WRAPPER}).
> Pass data to validator
```javascript
const data = {
    names: ['Jean', 'Claude'],
    email: 'front@kick.com',
};
validator.User(data);
// => undefined
validator.TwoChars('122');
// => error message
validator.Numbers({ smallest: 5, medium: 10, biggest: 20 });
// => undefined
validator.Numbers({ smallest: 1, medium: 2, biggest: 0 });
// => error message
```

### `$dataPath`
Data path accepts a string or array of strings which will be used to resolve value from data root.
It can be used when you don't know exact schema values.
Lets consider following object:
```javascript
const object = {
        breakfast: {
            egg: 10.25,
        },
        'fruit/vegetable': {
            apple: 'green',
            carrot: 'red',
        },
    },
};
```

```javascript
// this path will match object.breakfast.egg ==> 10.25
{ $dataPath: 'breakfast/egg' }
// this path uses array syntax since one of properties includes '/'
// it will match object['fruit/vegetable'].carrot ==> 'red'
{ $dataPath: ['fruit/vegetable', 'carrot'] }

const schemas = {
    Menu: {
        ${TYPE_METHOD.TYPE}: 'object',
        [${SYM.SCHEMA_PROPERTIES}]: {
            colors: {
                ${TYPE_METHOD.TYPE}: 'array',
                ${TYPE_METHOD.INCLUDES}: {
                    $dataPath: ['fruit/vegetable', 'apple'],
                },
            },
        },
    },
};
const validator = ${NAME.CONSTRUCTOR}(${NAME.TYPES}, schemas);
const data = {
    colors: ['red', 'green', 'blue'],
    'fruit/vegetable': {
        apple: 'red',
    },
};
validator.Menu(data);
// => undefined
```
In case the path resolves to `undefined` the property using `$dataPath` resolution will be skipped.
***

### Types
Besides 6 built-in types this library offers you a possiblity to create your own type with own keywords and extend them with existing types.

## Wiki
- [Types](../../wiki/${WIKI.TYPE})
- [Type Wrapper](../../wiki/${WIKI.TYPE_WRAPPER})
- [Schema](../../wiki/${WIKI.PARSER})
***
