
[![Build Status](https://travis-ci.org/krnik/jbq.svg?branch=master)](https://travis-ci.org/krnik/jbq)
[![](https://img.shields.io/npm/v/jbq.svg)](https://www.npmjs.com/package/jbq)
![](https://img.shields.io/npm/types/jbq.svg)


![LOGO](https://raw.githubusercontent.com/krnik/jbq/master/md/images/jbq.png)
*Logo created with [Picas](https://github.com/djyde/Picas).*

- [Introduction](#introduction)
- [Usage Example](#usage-example)
  - [DataPath](#datapath)
- [Missing Features](#missing-features)
- [Wiki](#wiki)

***
## Introduction
***
Hi! Welcome to JBQ validation library.

**Core Features:**
- *fast data validation* - validator returns error message on first error
- *based on schemas*

Every schema has only one required keywords which is `type`. This keyword allows to resolve all other keywords of the schema.

**Types and Keywords:**
- *[any](https://github.com/krnik/jbq/wiki/TypeAny)*: `required`, `type`
- *[array](https://github.com/krnik/jbq/wiki/TypeArray)*: `required`, `type`, `every`, `some`, `includes`, `len`
- *[number](https://github.com/krnik/jbq/wiki/TypeNumber)*: `required`, `type`, `value`, `multipleOf`, `oneOf`
- *[object](https://github.com/krnik/jbq/wiki/TypeObject)*: `required`, `type`, `constructorName`, `instanceOf`, `properties`, `keyCount`, `propCount`
- *[string](https://github.com/krnik/jbq/wiki/TypeString)*: `required`, `type`, `regex`, `len`, `oneOf`


**Schema Symbol Keywords:**
- *`Symbol.for('schema_properties')`*: defines a shape of subschemas of current schema
- *`Symbol.for('schema_collection')`*: makes validator iterate over every element of a collection and compare it against schema


**Other Features:**
- *ability to define own types*
- *ability to extend types with new keywords*
- *prototypal inheritance of types*

**Future Features:**
- *asynchronous validator function execution*

***
## Usage Example
***
JBQ exports two entities, `jbq` and `jbqTypes`.
- `jbq`: a function that will create validation functions
- `jbqTypes`: [TypesWrapper](https://github.com/krnik/jbq/wiki/typewrapper) instance, a set of defined types used during schema parsing.

```typescript
const { jbq, jbqTypes } = require('jbq');
jbq(jbqTypes, schemas, options);
```

```typescript
const PROPS = Symbol.for('schema_properties');
const ITEMS = Symbol.for('schema_collection');
const userSchema = {                //  Define `userSchema`
    type: 'object',                 //  ▶ that is an object
    properties: ['names', 'email'], //  ▶ that have two properies 'names' and 'email'
    [PROPS]: {                      //  ▶ those properties have following schemas
        names: {                    //  ⯁ `names` property:
            type: 'array',          //      ▷ is an array
            len: 2,                 //      ▷ that have length equal 2
            [ITEMS]: {              //      ▷ all items in this array
                type: 'string',     //      ▷ are a strings
            },                      //
        },                          //
        email: {                    //  ⯁ `email` property
            type: 'string',         //      ▷ is a string
        },                          //
    },                              //
};                                  //

const schemas = {
    User: userSchema,
    TwoChars: {                     //  Define `TwoChars` schema
        type: 'string',             //  ▶ that is a string
        len: 2,                     //  ▶ that have length equal 2
    },
};

// Create validation functions with the names of schemas.
const { User, TwoChars } = jbq(jbqTypes, schemas);

TwoChars('22'); // -> undefined: no error occured, data is valid
TwoChars('');   // -> error message as JSON string format

User({ email: 'just a string', names: ['Git', 'Hub'] });
// -> undefined: no error occured, data is valid
User({
    email: 'a string',
    names: ['Git', new String('Hub')],
});
// -> error message saying that not all of `names` elements are string primitives
```


### DataPath
[Data Path](https://github.com/krnik/jbq/wiki/datapath)
Data path accepts a string or array of strings which will be used to resolve value from data root.
It can be used when you don't know exact schema values.

**Keywords that support $dataPath:**
- *[array](https://github.com/krnik/jbq/wiki/TypeArray)*: `includes`, `len`
- *[number](https://github.com/krnik/jbq/wiki/TypeNumber)*: `value`, `multipleOf`
- *[object](https://github.com/krnik/jbq/wiki/TypeObject)*: `keyCount`, `propCount`
- *[string](https://github.com/krnik/jbq/wiki/TypeString)*: `len`


Lets consider following object:
```typescript
const data = {
    breakfast: {
        egg: 10.25,
        tea: 5.0,
    },
};
```


We can use `$dataPath` to try to reach one of its properties as in example below.
```typescript
const egg = {   // data.breakfast.egg will be matched
    $dataPath: 'breakfast/egg',
};
const tea = {   // data.breakfast.tea will be matched
    $dataPath: 'breakfast/tea',
};
```


Here is the working example.
```typescript
const PROPS = Symbol.for('schema_properties');
const menuSchema = {
    type: 'object',
    [PROPS]: {
        colors: {
            type: 'array',
            includes: {
                $dataPath: 'mainColor',
            },
        },
    },
};

const validator = jbq(jbqTypes, { Menu: menuSchema });

validator.Menu({
    colors: ['red', 'green', 'blue'],
    mailColor: 'red',
});
// -> undefined

validator.Menu({
    colors: ['yellow', 'blue'],
    mainColor: 'red',
});
// -> error message
```


<!-- TODO: Add links to `handleResolvedPaths` enum -->
In case the `$dataPath` resolves to `undefined`, validator will handle the situation depending on `handleResolvedPaths` settings value.

***
## Missing Features
- Asynchronous validation for big datasets
- Create schemas Joi/Yup way
- Create schemas using Class Decorators
- JSONSchema support
***

## [Wiki](https://github.com/krnik/jbq/wiki/)
***
