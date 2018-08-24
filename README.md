[![Build Status](https://travis-ci.org/krnik/vjs-validator.svg?branch=master)](https://travis-ci.org/krnik/vjs-validator)
# Table Of Content
- [Introduction](#introduction)
- [Usage Example](#usage-example)
- [Wiki](#wiki)
***
## Introduction
***
Hi! Welcome to VJS-Validator library designed to allow flexible validation.

Features:
- data validation
- customisable types
- based on schemas
***
## Usage Example
***
> Define your schemas
```javascript
// This symbol is tells VJS-Validator that properties
// of passed value will be validated as well
// You can read more about it in parser wiki page
const PROPS = Symbol.for('schema_properties');
const ITEMS = Symbol.for('schema_collection');
const schemas = {
    // User schema expects value to be an object
    // with properties ['names', 'email']
    User: {
        // type tells VJS-Validator which type
        // should be used to validate this property
        // it is the only required property for schema
        type: 'object',
        [PROPS]: {
            names: {
                type: 'array',
                len: 2,
                [ITEMS]: {
                    type: 'string',
                },
            },
            email: {
                type: 'string',
            },
        }
    },
    String: {
        type: 'string',
        len: 2,
    },
};
```
> Import and create VJS-Validator instance
```javascript
// VJSTypes allows you to add your custom types
const { VJS, VJSTypes } = require('vjs-validator');
const validator = VJS(VJSTypes, schemas);
```
For more info about VJSTypes see [WIKI](../../wiki/type-wrapper).
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
- [Types](../../wiki/type)
- [Type Wrapper](../../wiki/type-wrapper)
- [Schema Parser](../../wiki/parser)
***
