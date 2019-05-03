[![Build Status](https://travis-ci.org/krnik/jbq.svg?branch=master)](https://travis-ci.org/krnik/jbq)
[![](https://img.shields.io/npm/v/jbq.svg)](https://www.npmjs.com/package/jbq)
![](https://img.shields.io/npm/types/jbq.svg)

![LOGO](https://raw.githubusercontent.com/krnik/jbq/master/jbq.png)
*Logo created with [Picas](https://github.com/djyde/Picas).*

- [Introduction](#introduction)
- [Usage Example](#usage-example)
- [Type Keywords](#type-keywords)
  - [Any](#any)
  - [Array](#array)
  - [Boolean](#boolean)
  - [Number](#number)
  - [Object](#object)
  - [String](#string)
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

Every schema has only one required keywords which is `{{TYPE}}`. This keyword allows to resolve all other keywords of the schema.

**Types and Keywords:**
- *{{TYPE_NAME.ANY}}*: `{{REQUIRED}}`, `{{TYPE}}`
- *{{TYPE_NAME.ARRAY}}*: `{{REQUIRED}}`, `{{TYPE}}`, `{{EVERY}}`, `{{SOME}}`, `{{INCLUDES}}`, `{{LEN}}`
- *{{TYPE_NAME.NUMBER}}*: `{{REQUIRED}}`, `{{TYPE}}`, `{{VALUE}}`, `{{MULTIPLE_OF}}`, `{{ONE_OF}}`
- *{{TYPE_NAME.OBJECT}}*: `{{REQUIRED}}`, `{{TYPE}}`, `{{CONSTRUCTOR_NAME}}`, `{{INSTANCE_OF}}`, `{{PROPERTIES}}`, `{{KEY_COUNT}}`, `{{PROP_COUNT}}`
- *{{TYPE_NAME.STRING}}*: `{{REQUIRED}}`, `{{TYPE}}`, `{{REGEX}}`, `{{LEN}}`, `{{ONE_OF}}`


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
{{include('simple_usage')}}

***
## Type Keywords
***
### Any
{{include('type_any')}}
### Array
{{include('type_array')}}
### Boolean
{{include('type_boolean')}}
### Number
{{include('type_number')}}
### Object
{{include('type_object')}}
### String
{{include('type_string')}}

***
### DataPath
***
{{include('data_path')}}

#### SchemaMinMax

Definition:
```typescript
interface DataPath {
    {{PROP_DATA_PATH}}: string | string[];
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

DataPath part is valid only if keywords supports `{{PROP_DATA_PATH}}`.
```typescript
// Valid values:
const path: DataPath = { {{PROP_DATA_PATH}}: 'path/to/property' };
const v1: SchemaMinMax = 1;
const v2: SchemaMinMax = path;
const v3: SchemaMinMax = { min: 10, max: path };
const v4: SchemaMinMax = { max: 15 };
```

***
## Class Syntax
***
{{include('class_syntax')}}

***
## Logging
***
{{include('logging')}}
