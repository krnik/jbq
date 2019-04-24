- [TYPE: `{{TYPE_NAME.ARRAY}}`](#type-typenamearray)
  - [Available schema keywords](#available-schema-keywords)
    - [`{{REQUIRED}}`](#required)
    - [`{{TYPE}}`](#type)
    - [`{{EVERY}}`](#every)
    - [`{{SOME}}`](#some)
    - [`{{INCLUDES}}`](#includes)
    - [`{{LEN}}`](#len)

# TYPE: `{{TYPE_NAME.ARRAY}}`
> {{sourceLink(TYPE_NAME.ARRAY)}}.

## Available schema keywords
### `{{REQUIRED}}`
> Inherited from {{wikiType(TYPE_NAME.ANY, REQUIRED)}}.

### `{{TYPE}}`
{{example(TYPE)}}

### `{{EVERY}}`
> Check if every of array element will satisfy test function.

> Accepts function as schema value - `function (element: any): boolean`.
{{example(EVERY)}}

### `{{SOME}}`
> Check if any of array elements will satisfy test function.

> Accepts function as schema value - `function (element: any): boolean`.
{{example(SOME)}}

### `{{INCLUDES}}`
> Check if array includes given element.
{{example(INCLUDES)}}

### `{{LEN}}`
> Checks the length of an array.

> Accepts {{wikiLink('MinMaxSchema')}} schema value.
{{example(LEN)}}
