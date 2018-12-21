![](https://img.shields.io/travis/krnik/jbq.svg)
[![](https://img.shields.io/npm/v/jbq.svg)](https://www.npmjs.com/package/jbq)
![](https://img.shields.io/npm/types/jbq.svg)

![LOGO](https://raw.githubusercontent.com/krnik/jbq/master/md/images/jbq.png)

- [Introduction](#introduction)
- [Usage Example](#usage-example)
  - [[[object Object]](/wiki/DataPath)](#mdareadmemdwikidatapath)
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
- *[any](/wiki/Type_Any)*: `required`, `type`
- *[array](/wiki/Type_Array)*: `required`, `type`, `every`, `some`, `includes`, `len`
- *[number](/wiki/Type_Number)*: `required`, `type`, `value`, `multipleOf`, `oneOf`
- *[object](/wiki/Type_Object)*: `required`, `type`, `constructorName`, `instanceOf`, `properties`, `keyCount`, `propCount`
- *[string](/wiki/Type_String)*: `required`, `type`, `regex`, `len`, `oneOf`

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
- `jbqTypes`: [[object Object]](/wiki/TypeWrapper) instance, a set of defined types used during schema parsing.

```typescript
    const { jbq, jbqTypes } = require('jbq');
    const validators = jbq(types, schemas[, options]);
```
```typescript
    const PROPS = Symbol.for('schema_properties');
    const ITEMS = Symbol.for('schema_collection');
    const schemas = {
        // User schema expects value to be an object
        // with properties ['names', 'email']
        // 'name' property will be an array of string with 2 elements
        User: {
            type: 'object',
            properties: ['name', 'email'],
            [PROPS]: {
                names: {
                    type: 'array',
                    len: 2,
                    [ITEMS]: {
                        type: 'string',
                    },
                },
                email: {
                    type: 'string',
                },
            },
        },
        // TwoChars will be an string that will contain only 2 characters
        TwoChars: {
            type: 'string',
            len: 2,
        },
    };

    const { User, TwoChars } = jbq(jbqTypes, schemas);

    TwoChars('22');
    // -> undefined: no error occured, data is valid
    TwoChars('');
    // -> error message as JSON string format

    const userDataValid = {
        email: 'just a string, no more requirements specified in schema',
        names: ['Git', 'Hub'],
    };
    User(userDataValid);
    // -> undefined: no error occured, data is valid

    const userDataInvalid = {
        email: 'a string',
        names: ['Git', new String('Hub')],
    };
    User(userDataInvalid);
    // -> error message saying that not all of `names` elements are string primitives
```


### [[object Object]](/wiki/DataPath)
Data path accepts a string or array of strings which will be used to resolve value from data root.
It can be used when you don't know exact schema values.

**Keywords that support {{PROP_DATA_PATH}:**
- *[array](/wiki/Type_Array)*: `includes`, `len`
- *[number](/wiki/Type_Number)*: `value`, `multipleOf`
- *[object](/wiki/Type_Object)*: `keyCount`, `propCount`
- *[string](/wiki/Type_String)*: `len`

Lets consider following object:
```javascript
const object = {
        breakfast: {
            egg: 10.25,
            tea: 5.0,
        },
    },
};

{ $dataPath: 'breakfast/egg' }; // will match object.breakfast.egg -> 10.25
{ $dataPath: 'breakfast/tea' }; // will match object.breakfast.tea -> 5.0
```
```typescript
    const PROPS = Symbol.for('schema_properties');
    const schemas = {
        Menu: {
            type: 'object',
            [PROPS]: {
                colors: {
                    type: 'array',
                    includes: {
                        $dataPath: 'mainColor',
                    },
                },
            },
        },
    };
    const validator = jbq(jbqTypes, schemas);
    const dataValid = {
        colors: ['red', 'green', 'blue'],
        mailColor: 'red',
    };
    validator.Menu(dataValid);
    // -> undefined

    const dataInvalid = {
        colors: ['yellow', 'blue'],
        mainColor: 'red',
    };
    validator.Menu(dataInvalid);
    // -> error message
```


In case the `$dataPath` resolves to `undefined`, validator will handle the situation depending on `handleResolvedPaths` settings value.

***
## [Wiki](/wiki)
***
