#### *{{REQUIRED}}*
> Inherited from [{{TYPE_NAME.ANY}}](#{{TYPE_NAME.ANY.toLowerCase()}}).

#### *{{TYPE}}*
{{example('type_array', 0)}}

#### *{{EVERY}}*
> Check if every of array element will satisfy test function.

> Accepts function as schema value - `function (element: unknown): boolean`.
{{example('type_array', 1)}}

#### *{{SOME}}*
> Check if any of array elements will satisfy test function.

> Accepts function as schema value - `function (element: unknown): boolean`.
{{example('type_array', 2)}}

#### *{{INCLUDES}}*
> Check if array includes given element.
{{example('type_array', 3)}}

#### *{{LEN}}*
> Checks the length of an array.

> Accepts [MinMaxSchema](#minmaxschema) schema value.
{{example('type_array', 4)}}
