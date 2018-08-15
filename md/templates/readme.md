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
// This symbol is tells ${NAME.LIB} that properties
// of passed value will be validated as well
const PROPS = Symbol.for('schema_properties');
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
- **${TYPE_METHOD.TYPE}** - *checks type of passed value ([example](${PATH.BOOL.EXAMPLE.TYPE}))*
- **${TYPE_METHOD.VALUE}** - *check if passed value is equal to schema `${TYPE_METHOD.VALUE}` property ([example](${PATH.BOOL.EXAMPLE.VALUE}))*

[Source Code](${PATH.BOOL.SRC})
***
### **`string`**
`string` type allows validation properties such as:
- **${TYPE_METHOD.TYPE}** - *checks type of passed value ([example](${PATH.STRING.EXAMPLE.TYPE}))*
- **${TYPE_METHOD.MIN_LEN}** - *check if passed string has length greater or equal than value in schema `${TYPE_METHOD.MIN_LEN}` property ([example](${PATH.STRING.EXAMPLE.MIN_LEN}))*
- **${TYPE_METHOD.MAX_LEN}** - *check if passed string has length less or eaqual than value in schema `${TYPE_METHOD.MAX_LEN}` property ([example](${PATH.STRING.EXAMPLE.MAX_LEN}))*
- **${TYPE_METHOD.LEN}** - *check if passed string has length equal to value in schema `${TYPE_METHOD.LEN}` property ([example](${PATH.STRING.EXAMPLE.LEN}))*
- **${TYPE_METHOD.REGEX}** - *check if `base.test` method from schema `${TYPE_METHOD.REGEX}` property returns true when string is passed as an argument ([example](${PATH.STRING.EXAMPLE.REGEX}))*

[Source Code](${PATH.STRING.SRC})
***
### **`number`**
`number` type allows schema properties such as:
- **${TYPE_METHOD.TYPE}** - *checks type of passed value ([example](${PATH.NUMBER.EXAMPLE.TYPE}))*
- **${TYPE_METHOD.MIN}** - *check if passed number is greater or equal than value in schema `${TYPE_METHOD.MIN}` property ([example](${PATH.NUMBER.EXAMPLE.MIN}))*
- **${TYPE_METHOD.MAX}** - *check if passd number is less or equal than value in schema `${TYPE_METHOD.MAX}` property ([example](${PATH.NUMBER.EXAMPLE.MAX}))*

[Source Code](${PATH.NUMBER.SRC})
***
### **`object`**
`object` type allows schema properties such as:
- **${TYPE_METHOD.TYPE}** - *checks type of passed value ([example](${PATH.OBJECT.EXAMPLE.TYPE}))*
- **${TYPE_METHOD.CONTRUCTOR_NAME}** - *check if Constructor function of passed object is equal to value in schema `${TYPE_METHOD.CONTRUCTOR_NAME}` property ([example](${PATH.OBJECT.EXAMPLE.CONSTRUCTOR_NAME}))*
- **${TYPE_METHOD.INSTANCE_OF}** - *check if passed object is a instance of Constructor in schema `${TYPE_METHOD.INSTANCE_OF}` property ([example](${PATH.OBJECT.EXAMPLE.INSTANCE_OF}))*

[Source Code](${PATH.OBJECT.SRC})
### **`array`**
`array` type allows schema properties such as:
- **${TYPE_METHOD.TYPE}** - *checks type of passed value ([example](${PATH.ARRAY.EXAMPLE.TYPE}))*
- **${TYPE_METHOD.MIN_LEN}** - *check if passed array has length greater or equal than value in schema `${TYPE_METHOD.MIN_LEN}` property ([example](${PATH.ARRAY.EXAMPLE.MIN_LEN}))*
- **${TYPE_METHOD.MAX_LEN}** - *check if passed array has length less or equal than value in schema `${TYPE_METHOD.MAX_LEN}` property ([example](${PATH.ARRAY.EXAMPLE.MAX_LEN}))*
- **${TYPE_METHOD.LEN}** - *check if array length is equal to value in schema `${TYPE_METHOD.LEN}` property ([example](${PATH.ARRAY.EXAMPLE.LEN}))*
- **${TYPE_METHOD.EVERY}** - *check if `Array.prototype.every` method returns true when value in schema `${TYPE_METHOD.EVERY}` property is passed as a callback ([example](${PATH.ARRAY.EXAMPLE.EVERY}))*
- **${TYPE_METHOD.SOME}** - *check if `Array.prototype.some` method returns true when value in schema `${TYPE_METHOD.SOME}` property is passed as a callback ([example](${PATH.ARRAY.EXAMPLE.SOME}))*
- **${TYPE_METHOD.INCLUDES}** - *check if `Array.prototype.includes` method returns true when value in schema `${TYPE_METHOD.INCLUDES}` property is passed as an argument ([example](${PATH.ARRAY.EXAMPLE.INCLUDES}))*

[Source Code](src/types/Array.ts)
***
## Roadmap
This library aims to provide set of useful and performant tools for data validation and access control (mainly for REST API projects).
Currently only validation part of library is under development. Access controll features will use the same pattern as validation features.

Features that probably will be added:
- required schema property (it will skip further checks if value will be undefined)
- access control (it will filter specific properties based on role)
- deafult schema property (it will assign default value to a data property if needed)

If you would like to contribute - feel free to do so :)
