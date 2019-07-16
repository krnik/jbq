#### *{{REQUIRED}}*
> Inherited from [{{TYPE_ANY}}](#{{TYPE_ANY.toLowerCase()}}).

#### *{{TYPE}}*
{{example('type_object_type')}}

#### *{{CONSTRUCTOR_NAME}}*
> Accepts string schema value.
{{example('type_object_constructor_name')}}

#### *{{INSTANCE_OF}}*
> Accepts function schema value.
{{example('type_object_instance_of')}}

#### *{{PROPERTIES}}*
> Accepts array of strings schema value.

> Checks if every property specified in schema value is a property of data.
{{example('type_object_properties')}}

#### *{{KEY_COUNT}}*
> Accepts [SchemaMinMax](#schemaminmax) schema value.

> Checks count of all enumerable properties of data.
{{example('type_object_key_count')}}

#### *{{PROP_COUNT}}*
> Accepts [SchemaMinMax](#schemaminmax) schema value.

> Checks count of all properties of data.
{{example('type_object_prop_count')}}
