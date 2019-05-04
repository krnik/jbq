Class responsible for holding a collection of types using during validation function compilation.

This class enables an extension of existing types or even definin custom types.

A type object is valid when all of its keys have corresponding schema value validation function defined in `Symbol.for('type_validate')` property.

> Read more in docs: `SYM_TYPE_VALIDATE`, `SYM_TYPE_KEY_ORDER`, `SYM_METHOD_MACRO`, `SYM_METHOD_CLOSURE`, `SYM_TYPE_FOR_LOOP`.

Example custom type definition.
{{example('type_wrapper')}}

Curious about the  `{{` *expression* `}}` syntax? Check out the `Compilation.prototype.evaluateExpressions` method in the docs.
