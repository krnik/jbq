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
// => [undefined, data];
```
> Primitives validation
```javascript
const data = 'This is a string value!';
validator.StringSync(data);
// => [undefined, data];
```
## Available Types
### `root`
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
// => Error type root is not defined
```
[Source Code]()
#### type
### `string` type
`string` type allows [Schema](#-schema) properties such as:
- minLen
- maxLen
- len
- regex

[Source Code](src/types/String.ts)
#### minLen
Check if passed string has length greater or equal than value in schema `minLen` property.
```javascript
const schemas = { String: { type: 'string', minLen: 10, } };
const validator = new VJS(schemas, {});
validator.StringSync('This is a string');
// => [undefined, 'This is a string'];
validator.StringSync('string');
// => [error, 'string'];
```
#### maxLen
Check if passed string has length less or eaqual than value in schema `maxLen` property.
```javascript
const schemas = { String: { type: 'string', maxLen: 10, } };
const validator = new VJS(schemas, {});
validator.StringSync('This is a string');
// => [error, 'This is a string'];
validator.StringSync('string');
// => [undefined, 'string']
```
#### len
Check if passed string has length equal to value in schema `len` property.
```javascript
const schemas = { String: { type: 'string', len: 6, } };
const validator = new VJS(schemas, {});
validator.StringSync('This is a string');
// => [error, 'This is a string'];
validator.StringSync('string');
// => [undefined, 'string']
```
#### regex
Check if `RegExp.test` instance method from schema `regex` property returns true when string is passed as an argument.
```javascript
const schemas = { String: { type: 'string', regex: /a string/, } };
const validator = new VJS(schemas, {});
validator.StringSync('This is a string');
// => [undefined, 'This is a string'];
validator.StringSync('string');
// => [error, 'string']
```
### `Number` Type
`number` type allows [Schema](#-schema) properties such as:
- min
- max

#### min
Check if passed number is greater or equal than value in schema `min` property.
```javascript
const schemas = { Number: { type: 'number', min: 10, } };
const validator = new VJS(schemas, {});
validator.NumberSync(0);
// => [error, 0];
validator.NumberSync(10);
// => [undefined, 10]
```
#### max
Check if passd number is less or equal than value in schema `max` property.
```javascript
const schemas = { Number: { type: 'number', max: 10, } };
const validator = new VJS(schemas, {});
validator.NumberSync(100);
// => [error, 100];
validator.NumberSync(0);
// => [undefined, 0]
```
### `boolean` type
`boolean` type allows [Schema](#-schema) properties such as:
- value

#### value
```javascript
const schemas = { Boolean: { type: 'boolean', value: true, } };
const validator = new VJS(schemas, {});
validator.BooleanSync(false);
// => [error, false];
validator.BooleanSync(true);
// => [undefined, true]
```
Check if passed boolean is equal to value in schema `value` property.
### Array Type
`array` type allows [Schema](#-schema) properties such as:
- minLen
- maxLen
- len
- every
- some
- includes

#### minLen
Check if passed array has length greater or equal than value in schema `minLen` property.
```javascript
const schemas = { Array: { type: 'array', minLen: 0, } };
const validator = new VJS(schemas, {});
validator.ArraySync([]);
// => [error, []];
validator.ArraySync([,,]);
// => [undefined, [,,]]
```
#### maxLen
Check if passed array has length less or equal than value in schema `maxLen` property.
```javascript
const schemas = { Array: { type: 'array', maxLen: 0, } };
const validator = new VJS(schemas, {});
validator.ArraySync([,,]);
// => [error, [,,]];
validator.ArraySync([]);
// => [undefined, []]
```
#### len
Check if array length is equal to value in schema `len` property.
```javascript
const schemas = { Array: { type: 'array', len: 0, } };
const validator = new VJS(schemas, {});
validator.ArraySync([true]);
// => [error, [true]];
validator.ArraySync([]);
// => [undefined, []]
```
#### every
Check if `array.every` method returns true when value in schema `every` property is passed as a callback.
```javascript
const schemas = {
    Array: {
        type: 'array',
        every (elem, index, array, this) => (elem === 0),
    },
};
const validator = new VJS(schemas, {});
validator.ArraySync([0, 0, 0, 1]);
// => [error, [0, 0, 0, 1]];
validator.ArraySync([0, 0, 0, 0]);
// => [undefined, [0, 0, 0, 0]]
```
#### some
Check if `array.some` method returns true when value in schema `some` property is passed as a callback.
```javascript
const schemas = {
    Array: {
        type: 'array',
        some (elem, index, array, this) => (elem === 0),
    },
};
const validator = new VJS(schemas, {});
validator.ArraySync([1, 1, 1, 1]);
// => [error, [1, 1, 1, 1]];
validator.ArraySync([1, 1, 1, 0]);
// => [undefined, [1, 1, 1, 0]]
```
#### includes
Check if `array.includes` method returns true when value in schema `includes` property is passed as an argument.
```javascript
const schemas = {
    Array: {
        type: 'array',
        includes: 'a string value',
    },
};
const validator = new VJS(schemas, {});
validator.ArraySync([]);
// => [error, []];
validator.ArraySync(['a string value', 0]);
// => [undefined, ['a string value', 0]]
```
### `object` type
`object` type allows [Schema](#-schema) properties such as:
- constructorName
- instanceOf

#### constructorName
Check if Constructor function of passed object is equal to value in schema `constructorName` property.
```javascript
const schemas = {
    Object: {
        type: 'objecyt',
        constructorName: 'RegExp',
    },
};
const validator = new VJS(schemas, {});
validator.ObjectSync(new Array(0));
// => [error, []];
validator.ObjectSync(new RegExp('\\d'));
// => [undefined, /\d/]
```
#### instanceOf
Chec if passed object is a instance of Constructor in schema `instanceOf` property.
```javascript
const schemas = {
    Object: {
        type: 'objecyt',
        instanceOf: Object',
    },
};
const validator = new VJS(schemas, {});
validator.ObjectSync(Number(null));
// => [error, 0];
validator.ObjectSync(new Number(0));
// => [undefined, Number: 0]
```
<!-- ## Defining a Type
## Symbols
## Roadmap -->
