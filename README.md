[![Build Status](https://travis-ci.org/krnik/jbq.svg?branch=master)](https://travis-ci.org/krnik/jbq)
[![](https://img.shields.io/npm/v/jbq.svg)](https://www.npmjs.com/package/jbq)
![](https://img.shields.io/npm/types/jbq.svg)

![LOGO](https://raw.githubusercontent.com/krnik/jbq/master/jbq.png)
*Logo created with [Picas](https://github.com/djyde/Picas).*

- [Introduction](#introduction)
- [Usage Example](#usage-example)
- [Type Keywords](#type-keywords)
  - [Any](#any)
    - [*type*](#type)
    - [*required*](#required)
  - [Array](#array)
    - [*required*](#required-1)
    - [*type*](#type-1)
    - [*every*](#every)
    - [*some*](#some)
    - [*includes*](#includes)
    - [*len*](#len)
  - [Boolean](#boolean)
    - [*required*](#required-2)
    - [*type*](#type-2)
    - [*value*](#value)
  - [Number](#number)
    - [*required*](#required-3)
    - [*type*](#type-3)
    - [*value*](#value-1)
    - [*multipleOf*](#multipleof)
    - [*oneOf*](#oneof)
  - [Object](#object)
    - [*required*](#required-4)
    - [*type*](#type-4)
    - [*constructorName*](#constructorname)
    - [*instanceOf*](#instanceof)
    - [*properties*](#properties)
    - [*keyCount*](#keycount)
    - [*propCount*](#propcount)
  - [String](#string)
    - [*required*](#required-5)
    - [*type*](#type-5)
    - [*regex*](#regex)
    - [*oneOf*](#oneof-1)
    - [*len*](#len-1)
  - [DataPath](#datapath)
    - [SchemaMinMax](#schemaminmax)
- [Class Syntax](#class-syntax)
- [Logging](#logging)

***
## Introduction
***
Hi! Welcome to JBQ validation library repository.

**Core Features:**
- *fast data validation* - validator returns error message on first error
- *based on schemas*

Every schema has only one required keywords which is `type`. This keyword allows to resolve all other keywords of the schema.

**Types and Keywords:**
- *any*: `required`, `type`
- *array*: `required`, `type`, `every`, `some`, `includes`, `len`
- *number*: `required`, `type`, `value`, `multipleOf`, `oneOf`
- *object*: `required`, `type`, `constructorName`, `instanceOf`, `properties`, `keyCount`, `propCount`
- *string*: `required`, `type`, `regex`, `len`, `oneOf`


**Schema Symbol Keywords:**
- *`Symbol.for('schema_properties')`*: defines the shape of current schema
- *`Symbol.for('schema_collection')`*: makes validator iterate over every element of a collection and compare it against schema


**Other Features:**
- *possibility to define own types*
- *possibility to extend types with new keywords*
- *prototypal inheritance of types*

**ROADMAP:**
- [ ] *custom error messages*
- [ ] *validator function execution async iterable check*
- [ ] *support Joi/Yup schema translation*
- [ ] *support JSONSchema translation*
- [ ] *asynchronous validator function compliation*


JBQ lib exports:
- `jbq`: a function that will create validation functions
- `jbqTypes`: [TypeWrapper](#typewrapper) instance, a set of defined types used during schema parsing.
- `createTypes`: creates new instance of [TypeWrapper](#typewrapper)
- `setLogger`: sets the logger used for debug

***
## Usage Example
***
First we want to define a schema.

```typescript
const PROPS = Symbol.for('schema_properties');
const ITEMS = Symbol.for('schema_collection');

const userSchema = {                //  Define `userSchema`
    type: 'object',                 //  ▶ that is an object
    properties: ['names', 'email'], //  ▶ that can have only two properies 'names' and 'email'
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
```

Next, we need to compile created schemas.

```typescript
const { TwoChars, User } = jbq(jbqTypes, schemas);

equal(TwoChars('AA'), undefined);
equal(TwoChars('  '), undefined);

const error = TwoChars('') as string;
const errorJSON = JSON.parse(error);

equal(typeof error, 'string');
equal(errorJSON.path, 'TwoChars/len');
equal(errorJSON.message, 'Data length should be equal to 2.');

equal(User({ email: 'STRING', names: ['Git', 'Hub'] }), undefined);
equal(typeof User({ email: false, names: ['A', 'B'] }), 'string');
equal(typeof User({ email: 'email', names: [] }), 'string');
equal(typeof User({ email: 'email', names: {} }), 'string');
equal(typeof User({ email: 'email', names: [true] }), 'string');
```



***
## Type Keywords
***
### Any
> Base type, it's used as a prototype for all other built-in types.

#### *type*
> Any value will pass the test.

```typescript
const schemaType = { type: 'any' };
const { AnyType } = jbq(jbqTypes, { AnyType: schemaType });

equal(AnyType({}), undefined);
equal(AnyType([]), undefined);
equal(AnyType(undefined), undefined);
equal(AnyType('string'), undefined);
```


#### *required*
> If required is false and data is undefined then break current block.

```typescript
const schemaRequired = { type: 'any', required: true };
const { AnyRequired } = jbq(jbqTypes, { AnyRequired: schemaRequired });

equal(AnyRequired(true), undefined);
equal(AnyRequired({}), undefined);
equal(typeof AnyRequired(undefined), 'string');
```


### Array
#### *required*
> Inherited from [any](#any).

#### *type*

```typescript
const schemaType = { type: 'array' };
const { ArrayType } = jbq(jbqTypes, { ArrayType: schemaType });

equal(ArrayType([]), undefined);
equal(typeof ArrayType({}), 'string');
equal(typeof ArrayType(true), 'string');
```


#### *every*
> Check if every of array element will satisfy test function.

> Accepts function as schema value - `function (element: unknown): boolean`.

```typescript
const schemaEvery = {
    type: 'array',
    every: (element: unknown): boolean => typeof element === 'number' && element === element,
};
const { ArrayEvery } = jbq(jbqTypes, { ArrayEvery: schemaEvery });

equal(ArrayEvery([]), undefined);
equal(typeof ArrayEvery([1, 2, 3, NaN]), 'string');
equal(typeof ArrayEvery([1, 2, 3, false]), 'string');
equal(typeof ArrayEvery({}), 'string');
```


#### *some*
> Check if any of array elements will satisfy test function.

> Accepts function as schema value - `function (element: unknown): boolean`.

```typescript
const schemaSome = {
    type: 'array',
    some: (element: unknown): boolean => element === 100,
};
const { ArraySome } = jbq(jbqTypes, { ArraySome: schemaSome });

equal(ArraySome([1, 10, 100]), undefined);
equal(ArraySome([]), undefined);
equal(typeof ArraySome([true, false]), 'string');
```


#### *includes*
> Check if array includes given element.

```typescript
const schemaIncludes = { type: 'array', includes: true };
const { ArrayIncludes } = jbq(jbqTypes, { ArrayIncludes: schemaIncludes });

equal(ArrayIncludes([false, false, true]), undefined);
equal(typeof ArrayIncludes([false, 1, {}]), 'string');
```


#### *len*
> Checks the length of an array.

> Accepts [SchemaMinMax](#schemaminmax) schema value.

```typescript
const schemasLen = {
    SimpleLen: {
        type: 'array',
        len: 2,
    },
    MinLen: {
        type: 'array',
        len: { min: 1 },
    },
    MaxLen: {
        type: 'array',
        len: { max: 2 },
    },
    MinMaxLen: {
        type: 'array',
        len: { min: 1, max: 5 },
    },
};
const { SimpleLen, MinLen, MaxLen, MinMaxLen } = jbq(jbqTypes, schemasLen);

equal(SimpleLen([true, false]), undefined);
equal(typeof SimpleLen([]), 'string');

equal(MinLen([true]), undefined);
equal(typeof MinLen([]), 'string');

equal(MaxLen([true, false]), undefined);
equal(typeof MaxLen([1, 1, 1]), 'string');

equal(MinMaxLen([1, 2, 3, 4, 5]), undefined);
equal(typeof MinMaxLen([]), 'string');
equal(typeof MinMaxLen([1, 2, 3, 4, 5, 6]), 'string');
```


### Boolean
#### *required*
> Inherited from [any](#any).

#### *type*

```typescript
const schemaType = { type: 'boolean' };
const { BooleanType } = jbq(jbqTypes, { BooleanType: schemaType });

equal(BooleanType(true), undefined);
equal(typeof BooleanType(0), 'string');
```


#### *value*

```typescript
const schemaValue = { type: 'boolean', value: true };
const { BooleanValue } = jbq(jbqTypes, { BooleanValue: schemaValue });

equal(BooleanValue(true), undefined);
equal(typeof BooleanValue(false), 'string');
```


### Number
#### *required*
> Inherited from [any](#any).

#### *type*

```typescript
const schemaType = { type: 'number' };
const { NumberType } = jbq(jbqTypes, { NumberType: schemaType });

equal(NumberType(100), undefined);
equal(typeof NumberType(NaN), 'string');
equal(typeof NumberType('10'), 'string');
```


#### *value*
> Accepts [SchemaMinMax](#schemaminmax) schema value.

```typescript
const schemas = {
    SimpleValue: {
        type: 'number',
        value: 10,
    },
    MinValue: {
        type: 'number',
        value: { min: 0 },
    },
    MaxValue: {
        type: 'number',
        value: { max: 100 },
    },
    MinMaxValue: {
        type: 'number',
        value: { min: 0, max: 100 },
    },
};
const { SimpleValue, MinValue, MaxValue, MinMaxValue } = jbq(jbqTypes, schemas);

equal(SimpleValue(10), undefined);
equal(typeof SimpleValue(9), 'string');

equal(MinValue(0), undefined);
equal(typeof MinValue(-10), 'string');

equal(MaxValue(100), undefined);
equal(typeof MaxValue(110), 'string');

equal(MinMaxValue(0), undefined);
equal(MinMaxValue(100), undefined);
equal(typeof MinMaxValue(101), 'string');
```


#### *multipleOf*

```typescript
const schemaMultipleOf = { type: 'number', multipleOf: 1 };
const { NumberMultipleOf } = jbq(jbqTypes, { NumberMultipleOf: schemaMultipleOf });

equal(NumberMultipleOf(10), undefined);
equal(NumberMultipleOf(0), undefined);
equal(typeof NumberMultipleOf(1.1), 'string');
equal(typeof NumberMultipleOf(Math.PI), 'string');
```


#### *oneOf*
> Accepts an array of numbers.

```typescript
const schemaOneOf = { type: 'number', oneOf: [2, 4, 8, 16] };
const { NumberOneOf } = jbq(jbqTypes, { NumberOneOf: schemaOneOf });

equal(NumberOneOf(2), undefined);
equal(typeof NumberOneOf(1), 'string');
```


### Object
#### *required*
> Inherited from [any](#any).

#### *type*

```typescript
const schemaType = { type: 'object' };
const { ObjectType } = jbq(jbqTypes, { ObjectType: schemaType });

equal(ObjectType({}), undefined);
equal(ObjectType(new Map()), undefined);
equal(typeof ObjectType(null), 'string');
equal(typeof ObjectType([]), 'string');
```


#### *constructorName*
> Accepts string schema value.

```typescript
const schema = { type: 'object', constructorName: 'Set' };
const { ObjectConstrName } = jbq(jbqTypes, { ObjectConstrName: schema });

equal(ObjectConstrName(new Set()), undefined);
equal(typeof ObjectConstrName({}), 'string');
```


#### *instanceOf*
> Accepts function schema value.

```typescript
const schemaInstanceOf = { type: 'object', instanceOf: Map };
const { ObjectInstance } = jbq(jbqTypes, { ObjectInstance: schemaInstanceOf });

equal(ObjectInstance(new Map()), undefined);
equal(typeof ObjectInstance(new Set()), 'string');
```


#### *properties*
> Accepts array of strings schema value.

> Checks if every property specified in schema value is a property of data.

```typescript
const schemaProps = { type: 'object', properties: ['hello'] };
const { ObjectProperties } = jbq(jbqTypes, { ObjectProperties: schemaProps });

equal(ObjectProperties({ hello: 'World' }), undefined);
equal(typeof ObjectProperties({ world: 'hello' }), 'string');
```


#### *keyCount*
> Accepts [SchemaMinMax](#schemaminmax) schema value.

> Checks count of all enumerable properties of data.

```typescript
const schemasKeyCount = {
    SimpleKey: {
        type: 'object',
        keyCount: 0,
    },
    MinKey: {
        type: 'object',
        keyCount: { min: 1 },
    },
    MaxKey: {
        type: 'object',
        keyCount: { max: 1 },
    },
    MinMaxKey: {
        type: 'object',
        keyCount: { min: 1, max: 2 },
    },
};
const { SimpleKey, MinKey, MaxKey, MinMaxKey } = jbq(jbqTypes, schemasKeyCount);

equal(SimpleKey({}), undefined);
equal(typeof SimpleKey({ key: 'value' }), 'string');

equal(MinKey({ 1: 1 }), undefined);
equal(typeof MinKey({}), 'string');

equal(MaxKey({ hello: 'world' }), undefined);
equal(typeof MaxKey({ a: 0, b: 0 }), 'string');

equal(MinMaxKey({ hello: 'world' }), undefined);
equal(typeof MinMaxKey({ hello: 'there', general: 'Kenobi', bo: true }), 'string');
```


#### *propCount*
> Accepts [SchemaMinMax](#schemaminmax) schema value.

> Checks count of all properties of data.

```typescript
const schemasPropCount = {
    SimpleProp: {
        type: 'object',
        propCount: 1,
    },
    MinProp: {
        type: 'object',
        propCount: { min: 1 },
    },
    // and so on...
};
const { SimpleProp, MinProp } = jbq(jbqTypes, schemasPropCount);

equal(SimpleProp({ [Symbol()]: true }), undefined);
equal(
    typeof SimpleProp({
        [Symbol('meta_1')]: true,
        [Symbol('meta_2')]: false,
    }),
    'string',
);

equal(MinProp({ key: 'value' }), undefined);
equal(typeof MinProp({}), 'string');
```


### String
#### *required*
> Inherited from [any](#any).

#### *type*

```typescript
const schemaType = { type: 'string' };
const { StringType } = jbq(jbqTypes, { StringType: schemaType });

equal(StringType(''), undefined);
equal(typeof StringType(new String('Hello!')), 'string');
```


#### *regex*
> Accepts RegExp schema value.

```typescript
const schemaRegex = { type: 'string', regex: /@/ };
const { StringRegex } = jbq(jbqTypes, { StringRegex: schemaRegex });

equal(StringRegex('my@mail'), undefined);
equal(typeof StringRegex(''), 'string');
```


#### *oneOf*
> Accepts array of strings schema value.

```typescript
const schemaOneOf = { type: 'string', oneOf: ['user', 'guest'] };
const { StringOneOf } = jbq(jbqTypes, { StringOneOf: schemaOneOf });

equal(StringOneOf('user'), undefined);
equal(typeof StringOneOf('admin'), 'string');
```


#### *len*
> Accepts [SchemaMinMax](#schemaminmax) schema value.

```typescript
const schemasLen = {
    SimpleLen: {
        type: 'string',
        len: 8,
    },
    MinMaxLen: {
        type: 'string',
        len: { min: 1, max: 16 },
    },
    // and so on...
};
const { SimpleLen, MinMaxLen } = jbq(jbqTypes, schemasLen);

equal(SimpleLen('12345678'), undefined);
equal(typeof SimpleLen('1234567890'), 'string');

equal(MinMaxLen('1 to 16'), undefined);
equal(typeof MinMaxLen(''), 'string');
```



***
### DataPath
***
Data path accepts a string or array of strings which will be used to resolve value from data root.
It can be used when you don't know exact schema values.

**Keywords that support $dataPath:**
- *array*: `includes`, `len`
- *number*: `value`, `multipleOf`
- *object*: `keyCount`, `propCount`
- *string*: `len`

Lets consider following object:

```typescript
const settings = {
    globals: {
        requestRateLimit: 100,
    },
    premiumRequestRateLimit: 100,
    regularRequestRateLimit: 80,
};
```


We can use `$dataPath` to try to reach one of its properties as in example below.

```typescript
const getOverallLimit = {
    // During validation this path will resolve
    // to settings.globals.requestRateLimit
    $dataPath: 'globals/requestRateLimit',
};
const getPremiumLimit = {
    // During validation this path will resolve
    // to settings.premiumRequestRateLimit
    $dataPath: 'premiumRequestRateLimit',
};
const settingsSchema = {
    type: 'object',
    [Symbol.for('schema_properties')]: {
        globals: {
            type: 'object',
            properties: ['requestRateLimit'],
            [Symbol.for('schema_properties')]: {
                requestRateLimit: {
                    type: 'number',
                    value: { min: 0 },
                    multipleOf: 1,
                },
            },
        },
        premiumRequestRateLimit: {
            type: 'number',
            multipleOf: 1,
            value: { min: 0, max: getOverallLimit },
        },
        regularRequestRateLimit: {
            type: 'number',
            multipleOf: 1,
            value: { min: 0, max: getPremiumLimit },
        },
    },
};

const { Settings } = jbq(jbqTypes, { Settings: settingsSchema });

equal(Settings(settings), undefined);
equal(
    Settings({
        globals: { requestRateLimit: 100 },
        premiumRequestRateLimit: 80,
        regularRequestRateLimit: 40,
    }),
    undefined,
);

// Regular rate limit cannot be greater than premium rate limit.
equal(
    typeof Settings({
        globals: { requestRateLimit: 100 },
        premiumRequestRateLimit: 60,
        regularRequestRateLimit: 70,
    }),
    'string',
);
```



#### SchemaMinMax

Definition:
```typescript
interface DataPath {
    $dataPath: string | string[];
    [key: string]: unknown;
}

interface SchemaMin {
    min: number | DataPath;
}

interface SchemaMax {
    max: number | DataPath;
}

type SchemaMinMax = SchemaMax | SchemaMin | number | DataPath;
```

DataPath part is valid only if keywords supports `$dataPath`.
```typescript
// Valid values:
const path: DataPath = { $dataPath: 'path/to/property' };
const v1: SchemaMinMax = 1;
const v2: SchemaMinMax = path;
const v3: SchemaMinMax = { min: 10, max: path };
const v4: SchemaMinMax = { max: 15 };
```

***
## Class Syntax
***
You can also use class decorators to create classes with schemas attached to them.
Every keyword has its decorator. You can read more in the docs.

Of course you need to use `compileClass` function to build the custom `build` method due to performance reasons. The `build` method could be compiled on first evaluation of the `build` method but that's one of the possibilities for the future.

The reason behind using `build` method is that it's more flexible to change a method than change a constructor of a class.


```typescript
class Address {
    @string
    @regex(/^\d{2}-\d{2}$/)
    public zip!: string;

    @string
    @optional
    public street?: string;

    @string
    @optional
    public city?: string;
}

class User extends Validator {
    @string
    public name!: string;

    @number
    public id!: number;

    @object
    @shape(Address)
    public address!: Shape<Address>;
}

compileClass(User);

const user = new User().build({ name: 'J', id: 100, address: { zip: '22-99' } });

equal(user.name, 'J');
equal(user.id, 100);
equal(user.address.zip, '22-99');

throws((): User => new User().build({ name: 'j', id: 0, address: { zip: '22-872' } }));
```



***
## Logging
***
You can set the logging function/library using `setLogger` function.
Currently the logging functionality of JBQ is lacking but will be expanded in the future so it gives more diagnostic information.

Provided argument should match the following interface.
```typescript
interface Logger {
    debug(message: string, ...args: unknown[]): void;
}
```


```typescript
const logger = pino({ name: 'CrazyLogs' });
logger.level = 'trace';

setLogger(logger);

let called = false;
const logFn = (msg: string, ...args: unknown[]): void => {
    called = true;
    return logger.debug(msg, ...args);
};

setLogger({ debug: logFn });
const logService = new LogService(true);
logService['log']('Example log');

equal(called, true);
```
