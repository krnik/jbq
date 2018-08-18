[![Build Status](https://travis-ci.org/krnik/valid-js.svg?branch=master)](https://travis-ci.org/krnik/valid-js)
# Table Of Content
- [Introduction](#introduction)
- [Usage Example](#usage-example)
- [Built-in Types](#built-in-types)
- [Wiki](#wiki)
- [Roadmap](#roadmap)
***
## Introduction
***
Hi! Welcome to Valid-JS library designed to allow flexible validation.

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
// This symbol is tells Valid-JS that properties
// of passed value will be validated as well
// You can read more about it in parser wiki page
const PROPS = Symbol.for('schema_properties');
const schemas = {
    // User schema expects value to be an object
    // with properties ['names', 'email']
    User: {
        // type tells Valid-JS which type
        // should be used to validate this property
        // it is the only required property for schema
        type: 'object',
        [PROPS]: {
            names: {
                type: 'array',
                len: 4,
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
> Import and create Valid-JS instance
```javascript
// VJSTypes allows you to add your custom types
const { VJS, VJSTypes } = require('valid-js');
const validator = new VJS(VJSTypes, schemas);
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
- [Schema Parser](../../wiki/parser)
***
## Roadmap
This library aims to provide set of useful and performant tool for data validation. There is still a lot work left to do :)

Features that probably would be useful:
- required schema property (it would checks if value would be undefined). This would require either some kind of callbacks to break checks for current block, or it would require use of `break` statements and labeled code blocks.
- access control

If you would like to contribute - feel free to do so :)
