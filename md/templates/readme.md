[![Build Status](https://travis-ci.org/krnik/${NAME.REPO}.svg?branch=master)](https://travis-ci.org/krnik/${NAME.REPO})
# Table Of Content
- [Introduction](#introduction)
- [Usage Example](#usage-example)
- [Wiki](#wiki)
- [Roadmap](#roadmap)
***
## Introduction
***
Hi! Welcome to ${NAME.LIB} library designed to allow flexible validation.

Features:
- data validation
- customisable types
- based on schemas
<!-- - access controll -->
***
## Usage Example
***
> Define your schemas
```javascript
// This symbol is tells ${NAME.LIB} that properties
// of passed value will be validated as well
// You can read more about it in ${WIKI.PARSER} wiki page
const PROPS = ${SYM.SCHEMA_PROPERTIES};
const schemas = {
    // User schema expects value to be an object
    // with properties ['names', 'email']
    User: {
        // ${TYPE_METHOD.TYPE} tells ${NAME.LIB} which type
        // should be used to validate this property
        // it is the only required property for schema
        ${TYPE_METHOD.TYPE}: 'object',
        [PROPS]: {
            names: {
                ${TYPE_METHOD.TYPE}: 'array',
                ${TYPE_METHOD.LEN}: 4,
            },
            email: {
                ${TYPE_METHOD.TYPE}: 'string',
            },
        }
    },
    String: {
        ${TYPE_METHOD.TYPE}: 'string',
        ${TYPE_METHOD.LEN}: 2,
    },
};
```
> Import and create ${NAME.LIB} instance
```javascript
// ${NAME.TYPES} allows you to add your custom types
const { ${NAME.CONSTRUCTOR}, ${NAME.TYPES} } = require('${NAME.REPO}');
const validator = new ${NAME.CONSTRUCTOR}(${NAME.TYPES}, schemas);
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
validator.String('122');
// => error message
```
***
## Wiki
- [Types](../../wiki/${WIKI.TYPE})
- [Type Wrapper](../../wiki/${WIKI.TYPE_WRAPPER})
- [Schema Parser](../../wiki/${WIKI.PARSER})
***
## Roadmap
This library aims to provide set of useful and performant tool for data validation. There is still a lot work left to do :)

Features that would be useful imo and I'm considering adding:
- required schema property (it would checks if value would be undefined). This would require either some kind of callbacks to break checks for current block, or it would require use of `break` statements and labeled code blocks.
- access control

If you would like to contribute - feel free to do so :)
