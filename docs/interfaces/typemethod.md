[JBQDocs](../README.md) > [TypeMethod](../interfaces/typemethod.md)

# Interface: TypeMethod

Interface representing a function that is a TypeDefinition validation method. This function is used to build final validation function.

Usually, during building of validation function, TypeMethod function is stringified and its body is used to build a validation block in validation function.

There are two exceptions. Symbols defined below determine behavior of code generator when parsing TypeMethod with respective property.

`[Symbol.for('type_method_closure')]` - If TypeMethod function have this property set to true then code generator will use a reference to this function in validation function instead of extracting its body. This allows to use external variables during validation what would not be possible in some cases if the function body would be stringified.

`[Symbol.for('type_method_macro')]` - Type of TypeMethod function that will return a chunk of validation function. So instead of being parsed this function is simply invoked with some Code Generator helper functions passed as arguments. See [VALUE](https://github.com/krnik/jbq/blob/master/src/types/Number.ts) method example.

## Hierarchy

**TypeMethod**

## Callable
▸ **__call**(...args: *`any`[]*): `string` \| `undefined` \| `void`

*Defined in [core/type_wrapper/interface/type_method.interface.ts:24](https://github.com/krnik/vjs-validator/blob/08b1300/src/core/type_wrapper/interface/type_method.interface.ts#L24)*

Interface representing a function that is a TypeDefinition validation method. This function is used to build final validation function.

Usually, during building of validation function, TypeMethod function is stringified and its body is used to build a validation block in validation function.

There are two exceptions. Symbols defined below determine behavior of code generator when parsing TypeMethod with respective property.

`[Symbol.for('type_method_closure')]` - If TypeMethod function have this property set to true then code generator will use a reference to this function in validation function instead of extracting its body. This allows to use external variables during validation what would not be possible in some cases if the function body would be stringified.

`[Symbol.for('type_method_macro')]` - Type of TypeMethod function that will return a chunk of validation function. So instead of being parsed this function is simply invoked with some Code Generator helper functions passed as arguments. See [VALUE](https://github.com/krnik/jbq/blob/master/src/types/Number.ts) method example.

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Rest` args | `any`[] |

**Returns:** `string` \| `undefined` \| `void`

## Index

### Properties

* [__computed](typemethod.md#__computed)

---

## Properties

<a id="__computed"></a>

### `<Optional>` __computed

**● __computed**: *`undefined` \| `false` \| `true`*

*Defined in [core/type_wrapper/interface/type_method.interface.ts:27](https://github.com/krnik/vjs-validator/blob/08b1300/src/core/type_wrapper/interface/type_method.interface.ts#L27)*
*Defined in [core/type_wrapper/interface/type_method.interface.ts:28](https://github.com/krnik/vjs-validator/blob/08b1300/src/core/type_wrapper/interface/type_method.interface.ts#L28)*

___

