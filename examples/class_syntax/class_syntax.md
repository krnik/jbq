You can also use class decorators to create classes with schemas attached to them.
Every keyword has its decorator. You can read more in the docs.

Of course you need to use `compileClass` function to build the custom `build` method due to performance reasons. The `build` method could be compiled on first evaluation of the `build` method but that's one of the possibilities for the future.

{{example('class_syntax')}}

**Alteration Decorators:**
- `withDefault`
- `transform`

**Class Decorators:**
- `instantiate`

**Validation Decorators:** each one of them corresponds to the all defined type keywords.
- `type`
- `any`
- `array`
- `boolean`
- `number`
- `object`
- `string`
- `optional`
- `every`
- `some`
- `includes`
- `len`
- `value`
- `multipleOf`
- `regex`
- `oneOf`
- `keyCount`
- `propCount`
- `properties`
- `instanceOf`
- `constructorName`
- `schema`
- `shape`
- `collection`
