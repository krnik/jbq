- [TYPE: `{{TYPE_NAME.NUMBER}}`](#type-typenamenumber)
  - [Available schema keywords](#available-schema-keywords)
    - [`{{REQUIRED}}`](#required)
    - [`{{TYPE}}`](#type)
    - [`{{VALUE}}`](#value)
    - [`{{MULTIPLE_OF}}`](#multipleof)
    - [`{{ONE_OF}}`](#oneof)

# TYPE: `{{TYPE_NAME.NUMBER}}`
> {{MD.ASRC(TYPE_NAME.NUMBER)}}.

## Available schema keywords
### `{{REQUIRED}}`
> Inherited from {{MD.A(TYPE_NAME.ANY, REQUIRED)}}.

### `{{TYPE}}`
{{example(TYPE)}}

### `{{VALUE}}`
> Accepts {{MD.AWIKI(MD.WIKI.MIN_MAX_OR_NUM)}} schema value.
{{example(VALUE)}}

### `{{MULTIPLE_OF}}`
{{example(MULTIPLE_OF)}}

### `{{ONE_OF}}`
> Accepts an array of numbers.
{{example(ONE_OF)}}
