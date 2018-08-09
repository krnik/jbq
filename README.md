<!-- ## Table Of Content
- [Introduction](#-introduction)
- [Definitions](#-definitions)
- [Usage](#-usage)
- [Available Types](#-available-types)
- [minLen](#-type-string-min-len)
- [Symbols](#-symbols)
- [Defining a Type](#-defining-a-type)
- [Roadmap](#-roadmap) -->
<!-- # Valid-JS -->
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
***
## `string`
***
`string` type allows validation properties such as:
- type
- minLen
- maxLen
- len
- regex

[Source Code](src/types/String.ts)
***
### type
> Validates type of passed value.
```javascript
const schemas = {
    String: {
        type: 'string',
        [Symbol.for('schema_flat')]: true,
    },
};
const validator = new VJS(schemas, {});
validator.StringSync('This is a strig');
// => undefined
validator.StringSync(0);
// => error message
```
***
### minLen
> Check if passed string has length greater or equal than value in schema `minLen` property.
```javascript
const schemas = {
    String: {
        type: 'string',
        minLen: 10,
        [Symbol.for('schema_flat')]: true,
    },
};
const validator = new VJS(schemas, {});
validator.StringSync('This is a string');
// => undefined
validator.StringSync('short');
// => error message
```
***
### maxLen
> Check if passed string has length less or eaqual than value in schema `maxLen` property.
```javascript
const schemas = {
    String: {
        type: 'string',
        maxLen: 10,
        [Symbol.for('schema_flat')]: true,
    },
};
const validator = new VJS(schemas, {});
validator.StringSync('string');
// => undefined
validator.StringSync('This is a string');
// => error message
```
***
### len
> Check if passed string has length equal to value in schema `len` property.
```javascript
const schemas = {
    String: {
        type: 'string',
        len: 6,
        [Symbol.for('schema_flat')]: true,
    },
};
const validator = new VJS(schemas, {});
validator.StringSync('string');
// => undefined
validator.StringSync('This is a string');
// => error message
```
***
### regex
> Check if `RegExp.prototype.test` method from schema `regex` property returns true when string is passed as an argument.
```javascript
const schemas = {
    String: {
        type: 'string',
        regex: /a string/,
        [Symbol.for('schema_flat')]: true,
    },
};
const validator = new VJS(schemas, {});
validator.StringSync('This is a string');
// => undefined
validator.StringSync('string');
// => error message
```
***
## `number`
***
`number` type allows schema properties such as:
- type
- min
- max

[Source Code](src/types/Number.ts)
***
### type
> Validates type of passed value.
```javascript
const schemas = {
    Number: {
        type: 'number',
        [Symbol.for('schema_flat')]: true,
    },
};
const validator = new VJS(schemas, {});
validator.NumberSync(1000);
// => undefined
validator.NumberSync(NaN);
// => error message
```
***
### min
> Check if passed number is greater or equal than value in schema `min` property.
```javascript
const schemas = {
    Number: {
        type: 'number',
        min: 10,
        [Symbol.for('schema_flat')]: true,
    },
};
const validator = new VJS(schemas, {});
validator.NumberSync(10);
// => undefined
validator.NumberSync(0);
// => error message
```
***
### max
> Check if passd number is less or equal than value in schema `max` property.
```javascript
const schemas = {
    Number: {
        type: 'number',
        max: 10,
    },
};
const validator = new VJS(schemas, {});
validator.NumberSync(0);
// => undefined
validator.NumberSync(11);
// => error message
```
***
## `boolean`
***
`boolean` type allows schema properties such as:
- type
- value

[Source Code](src/types/Boolean.ts)
***
### type
> Validates type of passed value.
```javascript
const schemas = {
    Bool: {
        type: 'boolean',
        [Symbol.for('schema_flat')]: true,
    },
};
const validator = new VJS(schemas, {});
validator.BoolSync(true);
// => undefined
validator.BoolSync(0);
// => error message
```
***
### value
> Check if value is equal to value in schema `value` property.
```javascript
const schemas = {
    Boolean: {
        type: 'boolean',
        value: true,
        [Symbol.for('schema_flat')]: true,
    },
};
const validator = new VJS(schemas, {});
validator.BooleanSync(true);
// => undefined
validator.BooleanSync(false);
// => error message
```
***
## `array`
***
`array` type allows schema properties such as:
- type
- minLen
- maxLen
- len
- every
- some
- includes

[Source Code](src/types/Array.ts)
***
### type
> Validates type of passed value.
```javascript
const schemas = {
    Array: {
        type: 'array',
        [Symbol.for('schema_flat')]: true,
    },
};
const validator = new VJS(schemas, {});
validator.ArraySync([]);
// => undefined
validator.ArraySync(false);
// => error message
```
***
### minLen
> Check if passed array has length greater or equal than value in schema `minLen` property.
```javascript
const schemas = {
    Array: {
        type: 'array',
        minLen: 1,
        [Symbol.for('schema_flat')]: true,
    },
};
const validator = new VJS(schemas, {});
validator.ArraySync([,]);
// => undefined
validator.ArraySync([]);
// => error message
```
***
### maxLen
> Check if passed array has length less or equal than value in schema `maxLen` property.
```javascript
const schemas = {
    Array: {
        type: 'array',
        maxLen: 0,
        [Symbol.for('schema_flat')]: true,
    },
};
const validator = new VJS(schemas, {});
validator.ArraySync([]);
// => undefined
validator.ArraySync([,,]);
// => error message
```
***
### len
> Check if array length is equal to value in schema `len` property.
```javascript
const schemas = {
    Array: {
        type: 'array',
        len: 0,
        [Symbol.for('schema_flat')]: true,
    },
};
const validator = new VJS(schemas, {});
validator.ArraySync([]);
// => undefined
validator.ArraySync([true]);
// => error message
```
***
### every
> Check if `array.every` method returns true when value in schema `every` property is passed as a callback.
```javascript
const schemas = {
    Array: {
        type: 'array',
        every (elem, index, array, this) => elem === 0,
        [Symbol.for('schema_flat')]: true,
    },
};
const validator = new VJS(schemas, {});
validator.ArraySync([0, 0, 0, 0]);
// => undefined
validator.ArraySync([0, 0, 0, 1]);
// => error message
```
***
### some
> Check if `array.some` method returns true when value in schema `some` property is passed as a callback.
```javascript
const schemas = {
    Array: {
        type: 'array',
        some (elem, index, array, this) => (elem === 0),
        [Symbol.for('schema_flat')]: true,
    },
};
const validator = new VJS(schemas, {});
validator.ArraySync([1, 1, 1, 0]);
// => undefined
validator.ArraySync([1, 1, 1, 1]);
// => error message
```
***
### includes
> Check if `array.includes` method returns true when value in schema `includes` property is passed as an argument.
```javascript
const schemas = {
    Array: {
        type: 'array',
        includes: 'a string value',
        [Symbol.for('schema_flat')]: true,
    },
};
const validator = new VJS(schemas, {});
validator.ArraySync(['a string value', 0]);
// => undefined
validator.ArraySync([]);
// => error message
```
***
## `object`
***
`object` type allows schema properties such as:
- type
- constructorName
- instanceOf

[Source Code](src/types/Object.ts)
***
### type
> Validates type of passed value.
```javascript
const schemas = {
    Object: {
        type: 'object',
        [Symbol.for('schema_flat')]: true,
    },
};
const validator = new VJS(schemas, {});
validator.ObjectSync({});
// => undefined
validator.ObjectSync(null);
// => error message
```
***
### constructorName
> Check if Constructor function of passed object is equal to value in schema `constructorName` property.
```javascript
const schemas = {
    Object: {
        type: 'object',
        constructorName: 'RegExp',
        [Symbol.for('schema_flat')]: true,
    },
};
const validator = new VJS(schemas, {});
validator.ObjectSync(new RegExp('\\d'));
// => undefined
validator.ObjectSync(new Array(0));
// => error message
```
***
### instanceOf
> Check if passed object is a instance of Constructor in schema `instanceOf` property.
```javascript
const schemas = {
    Object: {
        type: 'object',
        instanceOf: Object,
        [Symbol.for('schema_flat')]: true,
    },
};
const validator = new VJS(schemas, {});
validator.ObjectSync(new Number(0));
// => undefined
validator.ObjectSync(Number(null));
// => error message
```
