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
- [ ] *custom error messages / revisit error type*
- [ ] *support Joi/Yup schema translation*
- [ ] *support JSONSchema translation*
- [ ] *asynchronous validator function compliation*

***
## Table of Contents
***

- [Introduction](#introduction)
- [Table of Contents](#table-of-contents)
- [Library structure](#library-structure)
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
- [Type Wrapper](#type-wrapper)
- [Class Syntax](#class-syntax)
- [Logging](#logging)


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
- jbq
    - /class_syntax/
    - /core/
    - /misc/
    - /type/
    - /util/
    - /cjs/ - CommonJS equivalent of root
    - /class_syntax.js
    - /lib.js

**lib.js exports:**
- [jbq](https://github.com/krnik/jbq/tree/master/docs#jbq): a function that will create validation functions.
- [jbqTypes](https://github.com/krnik/jbq/tree/master/docs#jbqtypes): [Type Wrapper](#type-wrapper) instance, a set of defined types used during schema parsing.
- `createTypes`: creates new instance of [Type Wrapper](#type-wrapper)
- `setLogger`: sets the logger used for debug

**class_syntax.js exports:**
- `compileClass`: appends a class-specific `build` method to the `constructor` prototype
- `decoratorFactory`: used to create decorators that set custom schema properties (useful when creating new type)
- schema/class decorators (more about them in [Class Syntax](#class-syntax))

**Schemas**
Every schema has only one required keywords which is `{{TYPE}}`. This keyword allows to resolve all other keywords of the schema.

**Types and Keywords:**
- *[{{TYPE_NAME.ANY}}](#any)*: `{{REQUIRED}}`, `{{TYPE}}`
- *[{{TYPE_NAME.ARRAY}}](#array)* `{{REQUIRED}}`, `{{TYPE}}`, `{{EVERY}}`, `{{SOME}}`, `{{INCLUDES}}`, `{{LEN}}`
- *[{{TYPE_NAME.NUMBER}}](#number)* `{{REQUIRED}}`, `{{TYPE}}`, `{{VALUE}}`, `{{MULTIPLE_OF}}`, `{{ONE_OF}}`
- *[{{TYPE_NAME.OBJECT}}](#object)* `{{REQUIRED}}`, `{{TYPE}}`, `{{CONSTRUCTOR_NAME}}`, `{{INSTANCE_OF}}`, `{{PROPERTIES}}`, `{{KEY_COUNT}}`, `{{PROP_COUNT}}`
- *[{{TYPE_NAME.STRING}}](#string)*: `{{REQUIRED}}`, `{{TYPE}}`, `{{REGEX}}`, `{{LEN}}`, `{{ONE_OF}}`

**Schema Symbol Keywords:**
- *`Symbol.for('schema_properties')`*: defines the shape of current schema
- *`Symbol.for('schema_collection')`*: makes validator iterate over every element of a collection and compare it against schema

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
## Type Wrapper
***
{{include('type_wrapper')}}

***
## Class Syntax
***
{{include('class_syntax')}}

***
## Logging
***
{{include('logging')}}
