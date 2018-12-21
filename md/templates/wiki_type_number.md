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
{{MD.example(_, TYPE)}}

### `{{VALUE}}`
> Accepts {{MD.AWIKI(MD.WIKI.MIN_MAX_OR_NUM)}} schema value.
{{MD.example(_, VALUE)}}

### `{{MULTIPLE_OF}}`
{{MD.example(_, MULTIPLE_OF)}}

### `{{ONE_OF}}`
> Accepts an array of numbers.
{{MD.example(_, ONE_OF)}}
