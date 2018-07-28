<!-- ## Table Of Content
- [Intro](#-intro)
- [Definitions](#-definitions)
- [Usage](#-usage)
- [Available Types](#-available-types)
- [minLen](#-type-string-min-len)
- [Symbols](#-symbols)
- [Defining a Type](#-defining-a-type)
- [Roadmap](#-roadmap) -->
# Valid-JS
***
## Intro
***
Hi! Welcome to `Valid-JS` multi-purpose ~~JavaScript~~ (*winks at Oracle* :) ECMAScript Language  validation library.

It is being designed to allow flexible and convenient value validation.
<!-- ***
## Definitions
***
### Symbols
This validator makes use of various `Symbol` values. Their purpose is explained in [Symbols](#-symbol) section.
### Type
Type is an object with various set of methods that are used in validation process.
Methods of a type are supposed to throw an `Error` whether validation is not succesful.

Example
```javascript
const MyArrayType = {
    length (base, value) {
        if (base !== value.length) {
            throw Error('Lenght differs');
        }
    },
    // This property is responsible for validating Schema input values
    // More info in [Defining a Type] section
    [Symbol.for('type_validate')]: {
        length (value) {
            if (typeof(value) !== 'number') {
                throw Error('Number required');
            }
        },
    },
};
```
### Schemas
Schemas is an `object` that contains [Schema](#-schema) definitions.
```javascript
const schemas = {
    User: {
        // Properties and rules
        // used to validate this Schema
    },
};
```
### Schema
Schema is an object that contains properties that will be used during validation.

Each Schema requires `type` property which defines which types' methods should be used during validation.
```javascript
const userSchema = {
    names: {
        type: 'MyArrayType',    // MyArrayTypes' methods will be used during validation process
        length: 4,              // 4 will be passed as `base` parameter to MyArrayType.length function.
        // other properties available in MyArrayType
    },
    email: {
        type: 'string'
    },
};
``` -->
***
## Usage
***
> Import Valid-JS
```javascript
const VJS = require('valid-js');
```
> Define your schemas
```javascript
const schemas = {
    // User schema expects an object value
    // with `names` and `email` properties
    User: {
        names: {
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
        [Symbol.for('schema_flat')]: true,
        // Above property alters validator behavior. For details see [Symbols] section.
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
// => [error, data];
```
> Primitives validation
```javascript
const data = 'This is a string value!';
validator.StringSync(data);
// => [error, data];
```
## Available Types
### root
It's a internal/private type that is a prototype of all other built-in types. It contains all common methods for all other types. Currently it's only `type` method.

root type is not available in schema definitions.
Example below will throw an `Error`.
```javascript
const schemas = {
    User: {
        name: {
            type: 'root', // In order to use root type you have to define your own
        },
    },
};
new VJS(schemas, {});
// => Type root is undefined
```
[Source Code]()
#### type
### string
`string` type allows [Schema](#-schema) properties such as:
- minLen
- maxLen
- len
- regex

[Source Code]()
#### minLen
#### maxLen
#### len
#### regex
### Number Type
#### min
#### max
### Boolean Type
#### boolean
### Array Type
#### minLen
#### maxLen
#### every
#### some
#### includes
#### len
### Object Type
#### constructorName
#### instanceOf
<!-- ## Defining a Type
## Symbols
## Roadmap -->
