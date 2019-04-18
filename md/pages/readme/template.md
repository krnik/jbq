{{BADGES}}

![LOGO](https://raw.githubusercontent.com/krnik/jbq/master/md/images/jbq.png)
*Logo created with [Picas](https://github.com/djyde/Picas).*

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
{{include('type_list')}}

**Schema Symbol Keywords:**
{{include('symbol_list')}}

**Other Features:**
- *ability to define own types*
- *ability to extend types with new keywords*
- *prototypal inheritance of types*

**ROADMAP:**
- [x] *asynchronous validator function execution*
- [ ] *support Class Validator translation*
- [ ] *support Joi/Yup schema translation*
- [ ] *support JSONSchema translation*
- [ ] *asynchronous validator function compliation*

***
## Usage Example
***
JBQ exports two entities, `jbq` and `jbqTypes`.
- `jbq`: a function that will create validation functions
- `jbqTypes`: {{wikiLink('typewrapper', 'TypesWrapper')}} instance, a set of defined types used during schema parsing.

{{example('use')}}
{{example('schema')}}

### DataPath
{{wikiLink('datapath', 'Data Path')}}
Data path accepts a string or array of strings which will be used to resolve value from data root.
It can be used when you don't know exact schema values.

**Keywords that support {{PROP_DATA_PATH}}:**
{{include('type_datapath_list')}}

Lets consider following object:
{{example('datapathObject')}}

We can use `{{PROP_DATA_PATH}}` to try to reach one of its properties as in example below.
{{example('datapathUse')}}

Here is the working example.
{{example('datapath')}}

<!-- TODO: Add links to `handleResolvedPaths` enum -->
In case the `{{PROP_DATA_PATH}}` resolves to `undefined`, validator will handle the situation depending on `handleResolvedPaths` settings value.

## [Wiki]({{WIKI_URL}})
***
