- [TYPE: `{{TYPE_NAME.STRING}}`](#type-typenamestring)
  - [Available schema keywords](#available-schema-keywords)
    - [`{{REQUIRED}}`](#required)
    - [`{{TYPE}}`](#type)
    - [`{{REGEX}}`](#regex)
    - [`{{ONE_OF}}`](#oneof)
    - [`{{LEN}}`](#len)

# TYPE: `{{TYPE_NAME.STRING}}`
> {{sourceLink(TYPE_NAME.STRING)}}

## Available schema keywords
### `{{REQUIRED}}`
> Inherited from {{wikiType(TYPE_NAME.ANY, REQUIRED)}}.

### `{{TYPE}}`
{{example(TYPE)}}

### `{{REGEX}}`
> Accepts RegExp schema value.
{{example(REGEX)}}

### `{{ONE_OF}}`
> Accepts array of strings schema value.
{{example(ONE_OF)}}

### `{{LEN}}`
> Accepts {{wikiLink('MinMaxSchema')}} schema value.
{{example(LEN)}}
