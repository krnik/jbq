[jbq](../README.md) > ["core/type_wrapper/type_wrapper_error"](../modules/_core_type_wrapper_type_wrapper_error_.md) > [TypeWrapperErorr](../classes/_core_type_wrapper_type_wrapper_error_.typewrappererorr.md)

# Class: TypeWrapperErorr

## Hierarchy

**TypeWrapperErorr**

## Index

### Methods

* [invalidMethodSymbols](_core_type_wrapper_type_wrapper_error_.typewrappererorr.md#invalidmethodsymbols)
* [invalidProperty](_core_type_wrapper_type_wrapper_error_.typewrappererorr.md#invalidproperty)
* [missingSchemaValueValidaor](_core_type_wrapper_type_wrapper_error_.typewrappererorr.md#missingschemavaluevalidaor)
* [missingTypeToAddMethod](_core_type_wrapper_type_wrapper_error_.typewrappererorr.md#missingtypetoaddmethod)
* [typeAddMethodAlreadyExists](_core_type_wrapper_type_wrapper_error_.typewrappererorr.md#typeaddmethodalreadyexists)
* [typeAlreadyExists](_core_type_wrapper_type_wrapper_error_.typewrappererorr.md#typealreadyexists)
* [typeToExtendWithDoesntExists](_core_type_wrapper_type_wrapper_error_.typewrappererorr.md#typetoextendwithdoesntexists)

---

## Methods

<a id="invalidmethodsymbols"></a>

### `<Static>` invalidMethodSymbols

▸ **invalidMethodSymbols**(typeName: *`string`*, methodName: *`string`*): `Error`

*Defined in [core/type_wrapper/type_wrapper_error.ts:28](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/type_wrapper/type_wrapper_error.ts#L28)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| typeName | `string` |
| methodName | `string` |

**Returns:** `Error`

___
<a id="invalidproperty"></a>

### `<Static>` invalidProperty

▸ **invalidProperty**(typeName: *`string`*, propertyName: *`string`*, desired: *`string`*): `Error`

*Defined in [core/type_wrapper/type_wrapper_error.ts:19](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/type_wrapper/type_wrapper_error.ts#L19)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| typeName | `string` |
| propertyName | `string` |
| desired | `string` |

**Returns:** `Error`

___
<a id="missingschemavaluevalidaor"></a>

### `<Static>` missingSchemaValueValidaor

▸ **missingSchemaValueValidaor**(typeName: *`string`*, property: *`string`*): `Error`

*Defined in [core/type_wrapper/type_wrapper_error.ts:37](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/type_wrapper/type_wrapper_error.ts#L37)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| typeName | `string` |
| property | `string` |

**Returns:** `Error`

___
<a id="missingtypetoaddmethod"></a>

### `<Static>` missingTypeToAddMethod

▸ **missingTypeToAddMethod**(typeName: *`string`*, methodName: *`string`*): `Error`

*Defined in [core/type_wrapper/type_wrapper_error.ts:46](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/type_wrapper/type_wrapper_error.ts#L46)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| typeName | `string` |
| methodName | `string` |

**Returns:** `Error`

___
<a id="typeaddmethodalreadyexists"></a>

### `<Static>` typeAddMethodAlreadyExists

▸ **typeAddMethodAlreadyExists**(typeName: *`string`*, methodName: *`string`*): `Error`

*Defined in [core/type_wrapper/type_wrapper_error.ts:53](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/type_wrapper/type_wrapper_error.ts#L53)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| typeName | `string` |
| methodName | `string` |

**Returns:** `Error`

___
<a id="typealreadyexists"></a>

### `<Static>` typeAlreadyExists

▸ **typeAlreadyExists**(typeName: *`string`*): `Error`

*Defined in [core/type_wrapper/type_wrapper_error.ts:5](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/type_wrapper/type_wrapper_error.ts#L5)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| typeName | `string` |

**Returns:** `Error`

___
<a id="typetoextendwithdoesntexists"></a>

### `<Static>` typeToExtendWithDoesntExists

▸ **typeToExtendWithDoesntExists**(typeName: *`string`*, protoName: *`string`*): `Error`

*Defined in [core/type_wrapper/type_wrapper_error.ts:12](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/type_wrapper/type_wrapper_error.ts#L12)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| typeName | `string` |
| protoName | `string` |

**Returns:** `Error`

___

