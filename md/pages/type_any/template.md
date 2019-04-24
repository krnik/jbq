- [TYPE: `{{TYPE_NAME.ANY}}`](#type-typenameany)
  - [Available schema keywords](#available-schema-keywords)
    - [`{{TYPE}}`](#type)
    - [`{{REQUIRED}}`](#required)

# TYPE: `{{TYPE_NAME.ANY}}`
Base type, it's used as a prototype for all other built-in types.
> {{sourceLink(TYPE_NAME.ANY)}}.

## Available schema keywords

### `{{TYPE}}`
> Any value will pass the test.
{{example(TYPE)}}

### `{{REQUIRED}}`
> If required is true, and data is undefined then returns erorr. If required is false and data is undefined then break current schema check.
{{example(REQUIRED)}}
