[![Build Status](https://travis-ci.org/krnik/${NAME.REPO}.svg?branch=master)](https://travis-ci.org/krnik/${NAME.REPO})
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
        // should be used to validate this property
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
};
```
> Import and create ${NAME.LIB} instance
```javascript
// ${NAME.TYPES} allows you to add your custom types
const { ${NAME.CONSTRUCTOR}, ${NAME.TYPES} } = require('${NAME.REPO}');
const validator = ${NAME.CONSTRUCTOR}(${NAME.TYPES}, schemas);
```
For more info about ${NAME.TYPES} see [WIKI](../../wiki/${WIKI.TYPE_WRAPPER}).
> Validate
```javascript
const data = {
    names: ['Jean', 'Claude'],
    email: 'front@kick.com',
};
validator.User(data);
// => undefined
validator.TwoChars('122');
// => error message
```
***
## Wiki
- [Types](../../wiki/${WIKI.TYPE})
- [Type Wrapper](../../wiki/${WIKI.TYPE_WRAPPER})
- [Schema Parser](../../wiki/${WIKI.PARSER})
***
