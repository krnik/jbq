[![Build Status](https://travis-ci.org/krnik/${NAME.REPO}.svg?branch=master)](https://travis-ci.org/krnik/${NAME.REPO})
# Table Of Content
- [Introduction](#introduction)
- [Usage Example](#usage-example)
- [Built-in Types](#built-in-types)
- [Roadmap](#roadmap)
***
## Introduction
***
Hi! Welcome to ${NAME.LIB} multi-purpose ECMAScript Language library designed to allow flexible validation.

Features:
- data validation
- customisable types
- based on schemas
<!-- - access controll -->
***
## Usage Example
***
> Import ${NAME.LIB}
```javascript
const ${NAME.CONSTRUCTOR} = require('${NAME.REPO}');
```
> Define your schemas
```javascript
// This symbol is used to tell ${NAME.LIB} that properties
// of passed value will be validated as well
const PROPS = Symbol.for('schema_properties');
const schemas = {
    // User schema expects value to be an object
    // with properties ['names', 'email']
    User: {
        // type tells ${NAME.LIB} which type
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
> Create ${NAME.LIB} instance
```javascript
const config = {};
const validator = new ${NAME.CONSTRUCTOR}(schemas, config);
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
- **type** - *checks type of passed value ([example](${PATH.BOOL.EXAMPLE.TYPE}))*
- **value** - *check if passed value is equal to value in schema `value` property ([example](${PATH.BOOL.EXAMPLE.VALUE}))*

[Source Code](${PATH.BOOL.SRC})
***
### **`string`**
`string` type allows validation properties such as:
- **type** - *checks type of passed value ([example](${PATH.STRING.EXAMPLE.TYPE}))*
- **minLen** - *check if passed string has length greater or equal than value in schema `minLen` property ([example](${PATH.STRING.EXAMPLE.MIN_LEN}))*
- **maxLen** - *check if passed string has length less or eaqual than value in schema `maxLen` property ([example](${PATH.STRING.EXAMPLE.MAX_LEN}))*
- **len** - *check if passed string has length equal to value in schema `len` property ([example](${PATH.STRING.EXAMPLE.LEN}))*
- **regex** - *check if `base.test` method from schema `regex` property returns true when string is passed as an argument ([example](${PATH.STRING.EXAMPLE.REGEX}))*

[Source Code](${PATH.STRING.SRC})
***
### **`number`**
`number` type allows schema properties such as:
- **type** - *checks type of passed value ([example](${PATH.NUMBER.EXAMPLE.TYPE}))*
- **min** - *check if passed number is greater or equal than value in schema `min` property ([example](${PATH.NUMBER.EXAMPLE.MIN}))*
- **max** - *check if passd number is less or equal than value in schema `max` property ([example](${PATH.NUMBER.EXAMPLE.MAX}))*

[Source Code](${PATH.NUMBER.SRC})
***
### **`object`**
`object` type allows schema properties such as:
- **type** - *checks type of passed value ([example](${PATH.OBJECT.EXAMPLE.TYPE}))*
- **constructorName** - *check if Constructor function of passed object is equal to value in schema `constructorName` property ([example](${PATH.OBJECT.EXAMPLE.CONSTR_NAME}))*
- **instanceOf** - *check if passed object is a instance of Constructor in schema `instanceOf` property ([example](${PATH.OBJECT.EXAMPLE.INSTANCE_OF}))*

[Source Code](${PATH.OBJECT.SRC})
### **`array`**
`array` type allows schema properties such as:
- **type** - *checks type of passed value ([example](${PATH.ARRAY.EXAMPLE.TYPE}))*
- **minLen** - *check if passed array has length greater or equal than value in schema `minLen` property ([example](${PATH.ARRAY.EXAMPLE.MIN_LEN}))*
- **maxLen** - *check if passed array has length less or equal than value in schema `maxLen` property ([example](${PATH.ARRAY.EXAMPLE.MAX_LEN}))*
- **len** - *check if array length is equal to value in schema `len` property ([example](${PATH.ARRAY.EXAMPLE.LEN}))*
- **every** - *check if `value.every` method returns true when value in schema `every` property is passed as a callback ([example](${PATH.ARRAY.EXAMPLE.EVERY}))*
- **some** - *check if `value.some` method returns true when value in schema `some` property is passed as a callback ([example](${PATH.ARRAY.EXAMPLE.SOME}))*
- **includes** - *check if `value.includes` method returns true when value in schema `includes` property is passed as an argument ([example](${PATH.ARRAY.EXAMPLE.INCLUDES}))*

[Source Code](src/types/Array.ts)
***
## Roadmap
This library aims to provide set of useful and performant tools for data validation and access control (mainly for REST API projects).
Currently only validation part of library is under development. Access controll features will use the same pattern as validation features.

If you would like to contribute - feel free to do so :)
