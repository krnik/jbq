#### *{{REQUIRED}}*
> Inherited from [{{TYPE_NAME.ANY}}](#{{TYPE_NAME.ANY.toLowerCase()}}).

#### *{{TYPE}}*
{{example('type_array_type')}}

#### *{{EVERY}}*
> Check if every of array element will satisfy test function.

> Accepts function as schema value - `function (element: unknown): boolean`.
{{example('type_array_every')}}

#### *{{SOME}}*
> Check if any of array elements will satisfy test function.

> Accepts function as schema value - `function (element: unknown): boolean`.
{{example('type_array_some')}}

#### *{{INCLUDES}}*
> Check if array includes given element.
{{example('type_array_includes')}}

#### *{{LEN}}*
> Checks the length of an array.

> Accepts [SchemaMinMax](#schemaminmax) schema value.
{{example('type_array_len')}}
