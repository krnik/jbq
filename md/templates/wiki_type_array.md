- [TYPE: `{{TYPE_NAME.ARRAY}}`](#type-typenamearray)
  - [Available schema keywords](#available-schema-keywords)
    - [`{{REQUIRED}}`](#required)
    - [`{{TYPE}}`](#type)
    - [`{{EVERY}}`](#every)
    - [`{{SOME}}`](#some)
    - [`{{INCLUDES}}`](#includes)
    - [`{{LEN}}`](#len)

# TYPE: `{{TYPE_NAME.ARRAY}}`
> {{MD.ASRC(TYPE_NAME.ARRAY)}}.

## Available schema keywords
### `{{REQUIRED}}`
> Inherited from {{MD.A(TYPE_NAME.ANY, REQUIRED)}}.

### `{{TYPE}}`
{{MD.example(_, TYPE)}}

### `{{EVERY}}`
> Check if every of array element will satisfy test function.

> Accepts function as schema value - `function (element: any): boolean`.
{{MD.example(_, EVERY)}}

### `{{SOME}}`
> Check if any of array elements will satisfy test function.

> Accepts function as schema value - `function (element: any): boolean`.
{{MD.example(_, SOME)}}

### `{{INCLUDES}}`
> Check if array includes given element.
{{MD.example(_, INCLUDES)}}

### `{{LEN}}`
> Checks the length of an array.

> Accepts {{MD.AWIKI(MD.WIKI.MIN_MAX_OR_NUM)}} schema value.
{{MD.example(_, LEN)}}
