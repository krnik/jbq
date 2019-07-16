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
Every schema has only one required keywords which is `{{TYPE}}`. This keyword allows to resolve all other keywords of the schema.

**Types and Keywords:**
- *[{{TYPE_ANY}}](#any)*: `{{REQUIRED}}`, `{{TYPE}}`
- *[{{TYPE_ARRAY}}](#array)* `{{REQUIRED}}`, `{{TYPE}}`, `{{EVERY}}`, `{{SOME}}`, `{{INCLUDES}}`, `{{LEN}}`
- *[{{TYPE_NUMBER}}](#number)* `{{REQUIRED}}`, `{{TYPE}}`, `{{VALUE}}`, `{{MULTIPLE_OF}}`, `{{ONE_OF}}`
- *[{{TYPE_OBJECT}}](#object)* `{{REQUIRED}}`, `{{TYPE}}`, `{{CONSTRUCTOR_NAME}}`, `{{INSTANCE_OF}}`, `{{PROPERTIES}}`, `{{KEY_COUNT}}`, `{{PROP_COUNT}}`
- *[{{TYPE_STRING}}](#string)*: `{{REQUIRED}}`, `{{TYPE}}`, `{{REGEX}}`, `{{LEN}}`, `{{ONE_OF}}`

***
## Usage Example
***
{{include('usage')}}

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

<!-- #### SchemaMinMax -->
<!--
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
``` -->
***
## Type Store
***
{{include('type_store')}}

***
## Class Syntax
***
{{include('class_syntax')}}
