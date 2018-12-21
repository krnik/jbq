- [TYPE: `{{TYPE_NAME.STRING}}`](#type-typenamestring)
  - [Available schema keywords](#available-schema-keywords)
    - [`{{REQUIRED}}`](#required)
    - [`{{TYPE}}`](#type)
    - [`{{REGEX}}`](#regex)
    - [`{{ONE_OF}}`](#oneof)
    - [`{{LEN}}`](#len)

# TYPE: `{{TYPE_NAME.STRING}}`
> {{MD.ASRC(TYPE_NAME.STRING)}}

## Available schema keywords
### `{{REQUIRED}}`
> Inherited from {{MD.A(TYPE_NAME.ANY, REQUIRED)}}.

### `{{TYPE}}`
{{MD.example(_, TYPE)}}

### `{{REGEX}}`
> Accepts RegExp schema value.
{{MD.example(_, REGEX)}}

### `{{ONE_OF}}`
> Accepts array of strings schema value.
{{MD.example(_, ONE_OF)}}

### `{{LEN}}`
> Accepts {{MD.AWIKI(MD.WIKI.MIN_MAX_OR_NUM)}} schema value.
{{MD.example(_, LEN)}}
