#### *{{REQUIRED}}*
> Inherited from [{{TYPE_NAME.ANY}}](#{{TYPE_NAME.ANY.toLowerCase()}}).

#### *{{TYPE}}*
{{example('type_object', 0)}}

#### *{{CONSTRUCTOR_NAME}}*
> Accepts string schema value.
{{example('type_object', 1)}}

#### *{{INSTANCE_OF}}*
> Accepts function schema value.
{{example('type_object', 2)}}

#### *{{PROPERTIES}}*
> Accepts array of strings schema value.

> Checks if every property specified in schema value is a property of data.
{{example('type_object', 3)}}

#### *{{KEY_COUNT}}*
> Accepts [SchemaMinMax](#schemaminmax) schema value.

> Checks count of all enumerable properties of data.
{{example('type_object', 4)}}

#### *{{PROP_COUNT}}*
> Accepts [SchemaMinMax](#schemaminmax) schema value.

> Checks count of all properties of data.
{{example('type_object', 5)}}
