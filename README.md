[![Build Status](https://travis-ci.org/krnik/valid-js.svg?branch=master)](https://travis-ci.org/krnik/valid-js)
# Table Of Content
- [Introduction](#introduction)
- [Usage Example](#usage-example)
- [Built-in Types](#types)
- [Roadmap](#roadmap)
***
## Introduction
***
Hi! Welcome to Valid-JS multi-purpose ECMAScript Language library designed to allow flexible validation.
***
## Usage Example
***
> Import Valid-JS
```javascript
const VJS = require('valid-js');
```
> Define your schemas
```javascript
const schemas = {
    // User schema expects value to be an object
    // with properties ['names', 'email']
    User: {
        names: {
            // line below tells Valid-JS which type
            // should be used to validate this property
            type: 'MyArrayType',
            length: 4,
        },
        email: {
            type: 'string',
        },
    },
    // String schema expects a string primitive
    String: {
        type: 'string',
        len: 2,
        // More about symbols in schemas in Types#Symbols
        [Symbol.for('schema_flat')]: true,
    },
};
```
> Create Valid-JS instance
```javascript
const config = {};
const validator = new VJS(schemas, config);
```
> Validate Object
```javascript
const data = {
    names: ['Jean', 'Claude'],
    email: 'front@kick.com',
};
validator.UserSync(data);
// => undefined
```
> Primitives validation
```javascript
const data = 'This is a string value!';
validator.StringSync(data);
// => undefined
```
***
## Types
### **`boolean`**
`boolean` type allows schema properties such as:
- type - *checks type of passed value ([example](../../wiki/Types-examples#boolean-type-example))*
- value - *check if passed value is equal to value in schema `value` property ([example](../../wiki/Types-examples#boolean-value-example))*

[Source Code](src/types/Boolean.ts)
***
### **`string`**
`string` type allows validation properties such as:
- **type** - *checks type of passed value ([example](../../wiki/Types-examples#string-type-example))*
- **minLen** - *check if passed string has length greater or equal than value in schema `minLen` property ([example](../../wiki/Types-examples#string-minLen-example))*
- **maxLen** - *check if passed string has length less or eaqual than value in schema `maxLen` property ([example](../../wiki/Types-examples#string-maxLen-example))*
- **len** - *check if passed string has length equal to value in schema `len` property ([example](../../wiki/Types-examples#string-len-example))*
- **regex** - *check if `RegExp.prototype.test` method from schema `regex` property returns true when string is passed as an argument ([example](../../wiki/Types-examples#string-regex-example))*

[Source Code](src/types/String.ts)
***
### **`number`**
`number` type allows schema properties such as:
- **type** - *checks type of passed value ([example](../../wiki/Types-examples#number-type-example))*
- **min** - *check if passed number is greater or equal than value in schema `min` property ([example](../../wiki/Types-examples#number-min-example))*
- **max** - *check if passd number is less or equal than value in schema `max` property ([example](../../wiki/Types-examples#number-max-example))*

[Source Code](src/types/Number.ts)
***
### **`object`**
`object` type allows schema properties such as:
- **type** - *checks type of passed value ([example](../../wiki/Types-examples#object-type-example))*
- **constructorName** - *check if Constructor function of passed object is equal to value in schema `constructorName` property ([example](../../wiki/Types-examples#object-constructorName-example))*
- **instanceOf** - *check if passed object is a instance of Constructor in schema `instanceOf` property ([example](../../wiki/Types-examples#object-instanceOf-example))*

[Source Code](src/types/Object.ts)
### **`array`**
`array` type allows schema properties such as:
- **type** - *checks type of passed value ([example](../../wiki/Types-examples#array-type-example))*
- **minLen** - *check if passed array has length greater or equal than value in schema `minLen` property ([example](../../wiki/Types-examples#array-minLen-example))*
- **maxLen** - *check if passed array has length less or equal than value in schema `maxLen` property ([example](../../wiki/Types-examples#array-maxLen-example))*
- **len** - *check if array length is equal to value in schema `len` property ([example](../../wiki/Types-examples#array-len-example))*
- **every** - *check if `array.every` method returns true when value in schema `every` property is passed as a callback ([example](../../wiki/Types-examples#array-every-example))*
- **some** - *check if `array.some` method returns true when value in schema `some` property is passed as a callback ([example](../../wiki/Types-examples#array-some-example))*
- **includes** - *check if `array.includes` method returns true when value in schema `includes` property is passed as an argument ([example](../../wiki/Types-examples#array-includes-example))*

[Source Code](src/types/Array.ts)
***
## Roadmap
This library aims to provide set of useful and performant tools for data validation and access control (mainly for REST API projects).
Currently only validation part of library is under development. Access controll features will use the same pattern as validation features.

If you would like to contribute - feel free to do so :)
