[jbq](../README.md) > ["core/compilation/compilation_error"](../modules/_core_compilation_compilation_error_.md) > [CompilationError](../classes/_core_compilation_compilation_error_.compilationerror.md)

# Class: CompilationError

## Hierarchy

**CompilationError**

## Index

### Methods

* [missingSchemaTypeProperty](_core_compilation_compilation_error_.compilationerror.md#missingschematypeproperty)
* [missingType](_core_compilation_compilation_error_.compilationerror.md#missingtype)
* [missingTypeMethod](_core_compilation_compilation_error_.compilationerror.md#missingtypemethod)

---

## Methods

<a id="missingschematypeproperty"></a>

### `<Static>` missingSchemaTypeProperty

▸ **missingSchemaTypeProperty**(schema: *`object`*, path: *`string`*): `Error`

*Defined in [core/compilation/compilation_error.ts:12](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/compilation/compilation_error.ts#L12)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| schema | `object` |
| path | `string` |

**Returns:** `Error`

___
<a id="missingtype"></a>

### `<Static>` missingType

▸ **missingType**(typeName: *`string`*): `Error`

*Defined in [core/compilation/compilation_error.ts:5](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/compilation/compilation_error.ts#L5)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| typeName | `string` |

**Returns:** `Error`

___
<a id="missingtypemethod"></a>

### `<Static>` missingTypeMethod

▸ **missingTypeMethod**(typeName: *`string`*, methodName: *`string`*): `Error`

*Defined in [core/compilation/compilation_error.ts:27](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/compilation/compilation_error.ts#L27)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| typeName | `string` |
| methodName | `string` |

**Returns:** `Error`

___

