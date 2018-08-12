[![Build Status](https://travis-ci.org/krnik/valid-js.svg?branch=master)](https://travis-ci.org/krnik/valid-js)
# Table Of Content
- [Introduction](#introduction)
- [Usage Example](#usage-example)
- [Built-in Types](#built-in-types)
- [Roadmap](#roadmap)
***
## Introduction
***
Hi! Welcome to Valid-JS multi-purpose ECMAScript Language library designed to allow flexible validation.

Features:
- data validation
- customisable types
- based on schemas
<!-- - access controll -->
***
## Usage Example
***
> Import Valid-JS
```javascript
const VJS = require('valid-js');
```
> Define your schemas
```javascript
// This symbol is used to tell Valid-JS that properties
// of passed value will be validated as well
const PROPS = Symbol.for('schema_properties');
const schemas = {
    // User schema expects value to be an object
    // with properties ['names', 'email']
    User: {
        // type tells Valid-JS which type
        // should be used to validate this property
        type: 'object',
        [PROPS]: {
            names: {
                type: 'array',
                length: 4,
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
> Create Valid-JS instance
```javascript
const config = {};
const validator = new VJS(schemas, config);
```
> Validate
```javascript
const data = {
    names: ['Jean', 'Claude'],
    email: 'front@kick.com',
};
validator.User.validSync(data);
// => undefined
validator.String.validSync('122');
// => error message
```
***
## Built-in Types
### **`boolean`**
`boolean` type allows schema properties such as:
- **type** - *checks type of passed value ([example](../../wiki/type-example#boolean-type-example))*
- **value** - *check if passed value is equal to value in schema `value` property ([example](undefined))*

[Source Code](src/types/Boolean.ts)
***
### **`string`**
`string` type allows validation properties such as:
- **type** - *checks type of passed value ([example](../../wiki/type-example#string-type-example))*
- **minLen** - *check if passed string has length greater or equal than value in schema `minLen` property ([example](../../wiki/type-example#string-minLen-example))*
- **maxLen** - *check if passed string has length less or eaqual than value in schema `maxLen` property ([example](../../wiki/type-example#string-maxLen-example))*
- **len** - *check if passed string has length equal to value in schema `len` property ([example](../../wiki/type-example#string-len-example))*
- **regex** - *check if `base.test` method from schema `regex` property returns true when string is passed as an argument ([example](../../wiki/type-example#string-regex-example))*

[Source Code](src/types/Boolean.ts)
***
### **`number`**
`number` type allows schema properties such as:
- **type** - *checks type of passed value ([example](../../wiki/type-example#number-type-example))*
- **min** - *check if passed number is greater or equal than value in schema `min` property ([example](../../wiki/type-example#number-min-example))*
- **max** - *check if passd number is less or equal than value in schema `max` property ([example](../../wiki/type-example#number-max-example))*

[Source Code](src/types/Number.ts)
***
### **`object`**
`object` type allows schema properties such as:
- **type** - *checks type of passed value ([example](../../wiki/type-example#object-type-example))*
- **constructorName** - *check if Constructor function of passed object is equal to value in schema `constructorName` property ([example](../../wiki/type-example#object-constructorName-example))*
- **instanceOf** - *check if passed object is a instance of Constructor in schema `instanceOf` property ([example](../../wiki/type-example#object-instanceOf-example))*

[Source Code](src/types/Object.ts)
### **`array`**
`array` type allows schema properties such as:
- **type** - *checks type of passed value ([example](../../wiki/type-example#array-type-example))*
- **minLen** - *check if passed array has length greater or equal than value in schema `minLen` property ([example](../../wiki/type-example#array-minLen-example))*
- **maxLen** - *check if passed array has length less or equal than value in schema `maxLen` property ([example](../../wiki/type-example#array-maxLen-example))*
- **len** - *check if array length is equal to value in schema `len` property ([example](../../wiki/type-example#array-len-example))*
- **every** - *check if `value.every` method returns true when value in schema `every` property is passed as a callback ([example](../../wiki/type-example#array-every-example))*
- **some** - *check if `value.some` method returns true when value in schema `some` property is passed as a callback ([example](../../wiki/type-example#array-some-example))*
- **includes** - *check if `value.includes` method returns true when value in schema `includes` property is passed as an argument ([example](../../wiki/type-example#array-includes-example))*

[Source Code](src/types/Array.ts)
***
## Roadmap
This library aims to provide set of useful and performant tools for data validation and access control (mainly for REST API projects).
Currently only validation part of library is under development. Access controll features will use the same pattern as validation features.

If you would like to contribute - feel free to do so :)
