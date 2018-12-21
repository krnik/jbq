{{BADGE.STATUS}}
{{BADGE.NPM}}
{{BADGE.TYPES}}

![LOGO](https://raw.githubusercontent.com/krnik/jbq/master/md/images/jbq.png)

- [Introduction](#introduction)
- [Usage Example](#usage-example)
  - [DataPath](#datapath)
- [Wiki](#wiki)

***
## Introduction
***
Hi! Welcome to JBQ validation library.

**Core Features:**
- *fast data validation* - validator returns error message on first error
- *based on schemas*

Every schema has only one required keywords which is `{{TYPE}}`. This keyword allows to resolve all other keywords of the schema.

**Types and Keywords:**
- *{{MD.AREADME(TYPE_NAME.ANY)}}*: `{{REQUIRED}}`, `{{TYPE}}`
- *{{MD.AREADME(TYPE_NAME.ARRAY)}}*: `{{REQUIRED}}`, `{{TYPE}}`, `{{EVERY}}`, `{{SOME}}`, `{{INCLUDES}}`, `{{LEN}}`
- *{{MD.AREADME(TYPE_NAME.NUMBER)}}*: `{{REQUIRED}}`, `{{TYPE}}`, `{{VALUE}}`, `{{MULTIPLE_OF}}`, `{{ONE_OF}}`
- *{{MD.AREADME(TYPE_NAME.OBJECT)}}*: `{{REQUIRED}}`, `{{TYPE}}`, `{{CONSTRUCTOR_NAME}}`, `{{INSTANCE_OF}}`, `{{PROPERTIES}}`, `{{KEY_COUNT}}`, `{{PROP_COUNT}}`
- *{{MD.AREADME(TYPE_NAME.STRING)}}*: `{{REQUIRED}}`, `{{TYPE}}`, `{{REGEX}}`, `{{LEN}}`, `{{ONE_OF}}`

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
- `jbqTypes`: {{MD.AREADME(MD.WIKI.TYPE_WRAPPER)}} instance, a set of defined types used during schema parsing.

```typescript
    const { jbq, jbqTypes } = require('jbq');
    const validators = jbq(types, schemas[, options]);
```
{{MD.example(_, 'use')}}

### DataPath
{{MD.AREADME(MD.WIKI.DATA_PATH)}}
Data path accepts a string or array of strings which will be used to resolve value from data root.
It can be used when you don't know exact schema values.

**Keywords that support {{PROP_DATA_PATH}}:**
- *{{MD.AREADME(TYPE_NAME.ARRAY)}}*: `{{INCLUDES}}`, `{{LEN}}`
- *{{MD.AREADME(TYPE_NAME.NUMBER)}}*: `{{VALUE}}`, `{{MULTIPLE_OF}}`
- *{{MD.AREADME(TYPE_NAME.OBJECT)}}*: `{{KEY_COUNT}}`, `{{PROP_COUNT}}`
- *{{MD.AREADME(TYPE_NAME.STRING)}}*: `{{LEN}}`

Lets consider following object:
```javascript
const object = {
        breakfast: {
            egg: 10.25,
            tea: 5.0,
        },
    },
};

{ {{PROP_DATA_PATH}}: 'breakfast/egg' }; // will match object.breakfast.egg -> 10.25
{ {{PROP_DATA_PATH}}: 'breakfast/tea' }; // will match object.breakfast.tea -> 5.0
```
{{MD.example(_, 'path')}}

In case the `{{PROP_DATA_PATH}}` resolves to `undefined`, validator will handle the situation depending on `handleResolvedPaths` settings value.

***
## [Wiki](/wiki)
***
