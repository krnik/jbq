[![Build Status](https://travis-ci.org/krnik/vjs-validator.svg?branch=master)](https://travis-ci.org/krnik/vjs-validator)
# Table Of Content
- [Introduction](#introduction)
- [Usage Example](#usage-example)
- [Wiki](#wiki)
***
## Introduction
***
Hi! Welcome to VJS-Validator flexible validation library.

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
        // should be used to validate data
        // it is the only required property for schema
        type: 'object',
        properties: ['name', 'email'],
        [PROPS]: {
            names: {
                type: 'array',
                maxLen: 2,
                [ITEMS]: {
                    type: 'string',
                },
            },
            email: {
                type: 'string',
            },
        }
    },
    TwoChars: {
        type: 'string',
        len: 2,
    },
    Numbers: {
        type: 'object',
        [Symbol.for('schema_config')]: {
            type: 'number',
        },
        [PROPS]: {
            smallest: {
                min: 0,
                max: 100,
            },
            medium: {
                min: { $dataPath: 'smallest' },
                max: { $dataPath: 'biggest' },
            },
        },
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
> Pass data to validator
```javascript
const data = {
    names: ['Jean', 'Claude'],
    email: 'front@kick.com',
};
validator.User(data);
// => undefined
validator.TwoChars('122');
// => error message
validator.Numbers({ smallest: 5, medium: 10, biggest: 20 });
// => undefined
validator.Numbers({ smallest: 1, medium: 2, biggest: 0 });
// => error message
```

### `$dataPath`
Data path accepts a string or array of strings which will be used to resolve value from data root.
It can be used when you don't know exact schema values.
Lets consider following object:
```javascript
const object = {
        breakfast: {
            egg: 10.25,
        },
        'fruit/vegetable': {
            apple: 'green',
            carrot: 'red',
        },
    },
};
```

```javascript
// this path will match object.breakfast.egg ==> 10.25
{ $dataPath: 'breakfast/egg' }
// this path uses array syntax since one of properties includes '/'
// it will match object['fruit/vegetable'].carrot ==> 'red'
{ $dataPath: ['fruit/vegetable', 'carrot'] }

const schemas = {
    Menu: {
        type: 'object',
        [Symbol.for('schema_properties')]: {
            colors: {
                type: 'array',
                includes: {
                    $dataPath: ['fruit/vegetable', 'apple'],
                },
            },
        },
    },
};
const validator = VJS(VJSTypes, schemas);
const data = {
    colors: ['red', 'green', 'blue'],
    'fruit/vegetable': {
        apple: 'red',
    },
};
validator.Menu(data);
// => undefined
```
In case the path resolves to `undefined` the property using `$dataPath` resolution will be skipped.
***

### Types
Besides 6 built-in types this library offers you a possiblity to create your own type with own keywords and extend them with existing types.

## Wiki
- [Types](../../wiki/type)
- [Type Wrapper](../../wiki/type-wrapper)
- [Schema](../../wiki/parser)
***
