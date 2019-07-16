[![Build Status](https://travis-ci.org/krnik/jbq.svg?branch=master)](https://travis-ci.org/krnik/jbq)
[![](https://img.shields.io/npm/v/jbq.svg)](https://www.npmjs.com/package/jbq)
![](https://img.shields.io/npm/types/jbq.svg)

![LOGO](https://raw.githubusercontent.com/krnik/jbq/master/jbq.png)
*Logo created with [Picas](https://github.com/djyde/Picas).*

***
## Introduction
***
Hi! Welcome to JBQ validation library repository.

**Core Features:**
- *fast data validation* - validator returns error message on first error
- *based on schemas*

**Other Features:**
- *ability to define own types*
- *ability to extend types with new keywords*
- *prototypal inheritance of types*
- *class validation*
- *async validation function execution*

**ROADMAP:**
- [ ] *custom error messages*
- [ ] *support JSONSchema eventually*
- [ ] *asynchronous validator function compliation*

***
## Table of Contents
***

- [Introduction](#Introduction)
- [Table of Contents](#Table-of-Contents)
- [Library structure](#Library-structure)
- [Usage Example](#Usage-Example)
- [Type Keywords](#Type-Keywords)
  - [Any](#Any)
  - [Array](#Array)
  - [Boolean](#Boolean)
  - [Number](#Number)
  - [Object](#Object)
  - [String](#String)
  - [DataPath](#DataPath)
- [Type Store](#Type-Store)
- [Class Syntax](#Class-Syntax)


***
## Library structure
***
By default importing `jbq` will import ECMAScript module. So you can import it like:
```javascript
import { jbq } from 'jbq'; // Node
import { jbq } from '<path_to_jbq>/lib.js'; // Browser etc...
```

To import `CommonJS` modules use `jbq/cjs/lib.js` path instead.
```javascript
const { jbq } = require('jbq/cjs/lib.js');
```

> Folder structure:
  - /cjs/ - CommonJS module
    - /lib.js
    - /class_syntax.js
  - /class_syntax.js
  - /lib.js

**lib.js exports:**
- [jbq](https://github.com/krnik/jbq/tree/master/docs#jbq): a function that will create validation functions.
- [types](https://github.com/krnik/jbq/tree/master/docs#types): [Type Store](#Type-Store) instance, a set of predefined types used during schema parsing.
- SYM_PROPERTIES - `Symbol.for('schema_properties')` defines shape of current schema properties
- SYM_COLLECTION - `Symbol.for('schema_collection')` defines shape of current schema elements

**Schemas**
Every schema has only one required keywords which is `type`. This keyword allows to resolve all other keywords of the schema.

**Types and Keywords:**
- *[any](#any)*: `required`, `type`
- *[array](#array)* `required`, `type`, `every`, `some`, `includes`, `len`
- *[number](#number)* `required`, `type`, `value`, `multipleOf`, `oneOf`
- *[object](#object)* `required`, `type`, `constructorName`, `instanceOf`, `properties`, `keyCount`, `propCount`
- *[string](#string)*: `required`, `type`, `regex`, `len`, `oneOf`

***
## Usage Example
***
First we want to define a schema. And then we need to compile schemas into validation function.
<details><summary>Example</summary>

```typescript
const userSchema = {                //  Define `userSchema`
    type: 'object',                 //  ▶ that is an object
    properties: ['names', 'email'], //  ▶ that can have only two properies 'names' and 'email'
    [SYM_PROPERTIES]: {             //  ▶ properties of this object have following schemas
        names: {                    //  ⯁ `names` property:
            type: 'array',          //      ▷ is an array
            len: 2,                 //      ▷ that have length equal 2
            [SYM_COLLECTION]: {     //      ▷ all items in this array
                type: 'string',     //      ▷ are strings
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


const { TwoChars, User } = jbq(types, schemas);

equal(TwoChars('AA'), undefined);
equal(TwoChars('  '), undefined);
equal(typeof TwoChars('Kenobi'), 'object');

const validUsers = [
    { email: 'some_string', names: ['Git', 'Hub'] },
    { email: '', names: ['John', 'Doe'] },
];
validUsers.forEach(
    (userData): void => {
        equal(User(userData), undefined);
    },
);

const invalidUsers = [
    { names: ['A', 'B'] },
    { email: 'test@test.com', names: [] },
    { email: 'test@test.com', names: ['Boolean', true] },
];
invalidUsers.forEach(
    (userData): void => {
        equal(typeof User(userData), 'object');
    },
);
```

</details>


***
## Type Keywords
***
### Any
> Base type, it's used as a prototype for all other built-in types.

#### *type*
> Any value will pass the test.
<details><summary>Example</summary>

```typescript
const schemaType = { type: 'any' };
const { AnyType } = jbq(types, { AnyType: schemaType });

equal(AnyType({}), undefined);
equal(AnyType([]), undefined);
equal(AnyType(undefined), undefined);
equal(AnyType('string'), undefined);
```

</details>

#### *required*
> If required is equal to false and data is undefined then break current block.
> Otherwise proceed with checks.
<details><summary>Example</summary>

```typescript
const schema = { type: 'any', required: true };
const { Required } = jbq(types, { Required: schema });

const validData = [true, {}, null, NaN, 0, -Infinity, 'Sumo!'];
validData.forEach(
    (data): void => {
        equal(Required(data), undefined);
    },
);

equal(typeof Required(undefined), 'object');
```

</details>

### Array
#### *required*
> Inherited from [any](#any).

#### *type*
<details><summary>Example</summary>

```typescript
const schemaType = { type: 'array' };
const { Type } = jbq(types, { Type: schemaType });

equal(Type([]), undefined);
equal(typeof Type({}), 'object');
equal(typeof Type(true), 'object');
```

</details>

#### *every*
> Check if every of array element will satisfy test function.

> Accepts function as schema value - `function (element: unknown): boolean`.
<details><summary>Example</summary>

```typescript
const schema = {
    type: 'array',
    every: (element: unknown): boolean => typeof element === 'number' && element === element,
};

const { Every } = jbq(types, { Every: schema });

equal(Every([]), undefined);
equal(typeof Every([1, 2, 3, NaN]), 'object');
equal(typeof Every([1, 2, 3, false]), 'object');
equal(typeof Every({}), 'object');
```

</details>

#### *some*
> Check if any of array elements will satisfy test function.

> Accepts function as schema value - `function (element: unknown): boolean`.
<details><summary>Example</summary>

```typescript
const schema = {
    type: 'array',
    some: (element: unknown): boolean => element === 100,
};
const { Some } = jbq(types, { Some: schema });

equal(Some([1, 10, 100]), undefined);
equal(Some([]), undefined);
equal(typeof Some([true, false]), 'object');
```

</details>

#### *includes*
> Check if array includes given element.
<details><summary>Example</summary>

```typescript
const schema = { type: 'array', includes: true };
const { Includes } = jbq(types, { Includes: schema });

equal(Includes([false, false, true]), undefined);
equal(typeof Includes([false, 1, {}]), 'object');
```

</details>

#### *len*
> Checks the length of an array.

> Accepts [SchemaMinMax](#schemaminmax) schema value.
<details><summary>Example</summary>

```typescript
const schemasLen = {
    ExactLen: {
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

const { ExactLen, MinLen, MaxLen, MinMaxLen } = jbq(types, schemasLen);

equal(ExactLen([true, false]), undefined);
equal(typeof ExactLen([]), 'object');

equal(MinLen([true]), undefined);
equal(typeof MinLen([]), 'object');

equal(MaxLen([true, false]), undefined);
equal(typeof MaxLen([1, 1, 1]), 'object');

equal(MinMaxLen([1, 2, 3, 4, 5]), undefined);
equal(typeof MinMaxLen([]), 'object');
equal(typeof MinMaxLen([1, 2, 3, 4, 5, 6]), 'object');
```

</details>

### Boolean
#### *required*
> Inherited from [any](#any).

#### *type*
<details><summary>Example</summary>

```typescript
const schema = { type: 'boolean' };
const { Type } = jbq(types, { Type: schema });

equal(Type(true), undefined);
equal(typeof Type(0), 'object');
```

</details>

#### *value*
<details><summary>Example</summary>

```typescript
const schema = { type: 'boolean', value: true };
const { Value } = jbq(types, { Value: schema });

equal(Value(true), undefined);
equal(typeof Value(false), 'object');
```

</details>

### Number
#### *required*
> Inherited from [any](#any).

#### *type*
<details><summary>Example</summary>

```typescript
const schema = { type: 'number' };
const { Type } = jbq(types, { Type: schema });

equal(Type(100), undefined);
equal(typeof Type(NaN), 'object');
equal(typeof Type('10'), 'object');
```

</details>

#### *value*
> Accepts [SchemaMinMax](#schemaminmax) schema value.
<details><summary>Example</summary>

```typescript
const schemas = {
    ExactValue: {
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
const { ExactValue, MinValue, MaxValue, MinMaxValue } = jbq(types, schemas);

equal(ExactValue(10), undefined);
equal(typeof ExactValue(9), 'object');

equal(MinValue(0), undefined);
equal(typeof MinValue(-10), 'object');

equal(MaxValue(100), undefined);
equal(typeof MaxValue(110), 'object');

equal(MinMaxValue(0), undefined);
equal(MinMaxValue(100), undefined);
equal(typeof MinMaxValue(101), 'object');
```

</details>

#### *multipleOf*
<details><summary>Example</summary>

```typescript
const schema = { type: 'number', multipleOf: 1 };
const { MultipleOf } = jbq(types, { MultipleOf: schema });

equal(MultipleOf(10), undefined);
equal(MultipleOf(0), undefined);
equal(typeof MultipleOf(1.1), 'object');
equal(typeof MultipleOf(Math.PI), 'object');
```

</details>

#### *oneOf*
> Accepts an array of numbers.
<details><summary>Example</summary>

```typescript
const schema = { type: 'number', oneOf: [2, 4, 8, 16] };
const { OneOf } = jbq(types, { OneOf: schema });

equal(OneOf(2), undefined);
equal(typeof OneOf(1), 'object');
```

</details>

### Object
#### *required*
> Inherited from [any](#any).

#### *type*
<details><summary>Example</summary>

```typescript
const schema = { type: 'object' };
const { Type } = jbq(types, { Type: schema });

equal(Type({}), undefined);
equal(Type(new Map()), undefined);
equal(typeof Type(null), 'object');
equal(typeof Type([]), 'object');
```

</details>

#### *constructorName*
> Accepts string schema value.
<details><summary>Example</summary>

```typescript
const schema = { type: 'object', constructorName: 'Set' };
const { CtrName } = jbq(types, { CtrName: schema });

equal(CtrName(new Set()), undefined);
equal(typeof CtrName({}), 'object');
```

</details>

#### *instanceOf*
> Accepts function schema value.
<details><summary>Example</summary>

```typescript
const schema = { type: 'object', instanceOf: Map };
const { InstanceOf } = jbq(types, { InstanceOf: schema });

equal(InstanceOf(new Map()), undefined);
equal(typeof InstanceOf(new Set()), 'object');
```

</details>

#### *properties*
> Accepts array of strings schema value.

> Checks if every property specified in schema value is a property of data.
<details><summary>Example</summary>

```typescript
const schema = { type: 'object', properties: ['hello'] };
const { Properties } = jbq(types, { Properties: schema });

equal(Properties({ hello: 'World' }), undefined);
equal(typeof Properties({ world: 'hello' }), 'object');
```

</details>

#### *keyCount*
> Accepts [SchemaMinMax](#schemaminmax) schema value.

> Checks count of all enumerable properties of data.
<details><summary>Example</summary>

```typescript
const schemas = {
    ExactKey: {
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
const { ExactKey, MinKey, MaxKey, MinMaxKey } = jbq(types, schemas);

equal(ExactKey({}), undefined);
equal(typeof ExactKey({ key: 'value' }), 'object');

equal(MinKey({ 1: 1 }), undefined);
equal(typeof MinKey({}), 'object');

equal(MaxKey({ hello: 'world' }), undefined);
equal(typeof MaxKey({ a: 0, b: 0 }), 'object');

equal(MinMaxKey({ hello: 'world' }), undefined);
equal(typeof MinMaxKey({ hello: 'there', general: 'Kenobi', bo: true }), 'object');
```

</details>

#### *propCount*
> Accepts [SchemaMinMax](#schemaminmax) schema value.

> Checks count of all properties of data.
<details><summary>Example</summary>

```typescript
const schemas = {
    ExactProp: {
        type: 'object',
        propCount: 1,
    },
    MinProp: {
        type: 'object',
        propCount: { min: 1 },
    },
    // and so on...
};
const { ExactProp, MinProp } = jbq(types, schemas);

equal(ExactProp({ [Symbol()]: true }), undefined);
equal(
    typeof ExactProp({
        [Symbol('meta_1')]: true,
        [Symbol('meta_2')]: false,
    }),
    'object',
);

equal(MinProp({ key: 'value' }), undefined);
equal(typeof MinProp({}), 'object');
```

</details>

### String
#### *required*
> Inherited from [any](#any).

#### *type*
<details><summary>Example</summary>

```typescript
const schema = { type: 'string' };
const { Type } = jbq(types, { Type: schema });

equal(Type(''), undefined);
equal(typeof Type(new String('Hello!')), 'object');
```

</details>

#### *regex*
> Accepts RegExp schema value.
<details><summary>Example</summary>

```typescript
const schema = { type: 'string', regex: /@/ };
const { Regex } = jbq(types, { Regex: schema });

equal(Regex('my@mail'), undefined);
equal(typeof Regex(''), 'object');
```

</details>

#### *oneOf*
> Accepts array of strings schema value.
<details><summary>Example</summary>

```typescript
const schema = { type: 'string', oneOf: ['user', 'guest'] };
const { OneOf } = jbq(types, { OneOf: schema });

equal(OneOf('user'), undefined);
equal(typeof OneOf('admin'), 'object');
```

</details>

#### *len*
> Accepts [SchemaMinMax](#schemaminmax) schema value.
<details><summary>Example</summary>

```typescript
const schemas = {
    ExactLen: {
        type: 'string',
        len: 8,
    },
    MinMaxLen: {
        type: 'string',
        len: { min: 1, max: 16 },
    },
    // and so on...
};
const { ExactLen, MinMaxLen } = jbq(types, schemas);

equal(ExactLen('12345678'), undefined);
equal(typeof ExactLen('1234567890'), 'object');

equal(MinMaxLen('1 to 16'), undefined);
equal(typeof MinMaxLen(''), 'object');
```

</details>


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
<details><summary>Example</summary>

```typescript
const settings = {
    globals: {
        requestRateLimit: 100,
    },
    premiumRequestRateLimit: 100,
    regularRequestRateLimit: 80,
};

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

const schema = {
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

const { Settings } = jbq(types, { Settings: schema });

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
    'object',
);
```

</details>


<!-- #### SchemaMinMax -->
<!--
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
``` -->
***
## Type Store
***
Class responsible for holding a collection of types using during validation function compilation.

This class enables an extension of existing types or even definin custom types.

Example custom type definition.
<details><summary>Example</summary>

```typescript
const HexColor = new TypeInstance('hex-color').setKeyword('type', {
    validator(_schemaValue: string, $DATA: unknown): ValidationResult {
        if (typeof $DATA !== 'string') {
            return {
                message: 'Only string values can be hex colors;].',
                path: '{{schemaPath}}',
            };
        }
        if (!/^#?([0-9A-F]{3}|[0-9A-F]{6})$/i.test($DATA)) {
            return {
                message: 'Received string is not a hex color value.',
                path: '{{schemaPath}}',
            };
        }
    },
    schemaValidator(schemaValue: unknown): void {
        if (schemaValue !== 'string') throw new Error('Type can be a string only!');
    },
});

const types = new TypeStore().addType(HexColor);

equal(types.getType('hex-color'), HexColor);
equal(types.hasType('hexcolor'), false);
```

</details>

Curious about the  &#123;&#123; *expression* &#125;&#125; syntax? Check out the `Compilation.prototype.evaluateExpressions` method in the docs.


***
## Class Syntax
***
You can also use class decorators to create classes with schemas attached to them.
Every keyword has its decorator. You can read more in the docs.

Of course you need to use `compileClass` function to build the custom `build` method due to performance reasons. The `build` method could be compiled on first evaluation of the `build` method but that's one of the possibilities for the future.

<details><summary>Example</summary>

```typescript
@compile()
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

@compile()
class User extends Validator {
    @string
    public name!: string;

    @number
    public id!: number;

    @shape(Address)
    public address!: Address;
}

const user = new User().from({ name: 'J', id: 100, address: { zip: '22-99' } });

equal(user.name, 'J');
equal(user.id, 100);
equal(user.address.zip, '22-99');

throws((): User => new User().from({ name: 'j', id: 0, address: { zip: '22-872' } }));
```

</details>

**Alteration Decorators:**
- `withDefault`
- `transform`

**Class Decorators:**
- `instantiate`

**Validation Decorators:** each one of them corresponds to the all defined type keywords.
- `type`
- `any`
- `array`
- `boolean`
- `number`
- `object`
- `string`
- `optional`
- `every`
- `some`
- `includes`
- `len`
- `value`
- `multipleOf`
- `regex`
- `oneOf`
- `keyCount`
- `propCount`
- `properties`
- `instanceOf`
- `constructorName`
- `schema`
- `shape`
- `collection`

