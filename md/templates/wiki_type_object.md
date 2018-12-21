- [TYPE: `{{TYPE_NAME.OBJECT}}`](#type-typenameobject)
  - [Available schema keywords](#available-schema-keywords)
    - [`{{REQUIRED}}`](#required)
    - [`{{TYPE}}`](#type)
    - [`{{CONSTRUCTOR_NAME}}`](#constructorname)
    - [`{{INSTANCE_OF}}`](#instanceof)
    - [`{{PROPERTIES}}`](#properties)
    - [`{{KEY_COUNT}}`](#keycount)
    - [`{{PROP_COUNT}}`](#propcount)

# TYPE: `{{TYPE_NAME.OBJECT}}`
> {{MD.ASRC(TYPE_NAME.OBJECT)}}.

## Available schema keywords
### `{{REQUIRED}}`
> Inherited from {{MD.A(TYPE_NAME.ANY, REQUIRED)}}.

### `{{TYPE}}`
{{MD.example(_, TYPE)}}

### `{{CONSTRUCTOR_NAME}}`
> Accepts string schema value.
{{MD.example(_, CONSTRUCTOR_NAME)}}

### `{{INSTANCE_OF}}`
> Accepts function schema value.
{{MD.example(_, INSTANCE_OF)}}

### `{{PROPERTIES}}`
> Accepts array of strings schema value.

> Checks if every property specified in schema value is a property of data.
{{MD.example(_, PROPERTIES)}}

### `{{KEY_COUNT}}`
> Accepts {{MD.AWIKI(MD.WIKI.MIN_MAX_OR_NUM)}} schema value.

> Checks count of all enumerable properties of data.
{{MD.example(_, KEY_COUNT)}}

### `{{PROP_COUNT}}`
> Accepts {{MD.AWIKI(MD.WIKI.MIN_MAX_OR_NUM)}} schema value.

> Checks count of all properties of data.
{{MD.example(_, PROP_COUNT)}}
