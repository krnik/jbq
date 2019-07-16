[JBQDocs](../README.md) > [CompilationError](../classes/compilationerror.md)

# Class: CompilationError

## Hierarchy

**CompilationError**

## Index

### Methods

* [missingSchemaTypeProperty](compilationerror.md#missingschematypeproperty)
* [missingType](compilationerror.md#missingtype)
* [missingTypeMethod](compilationerror.md#missingtypemethod)

---

## Methods

<a id="missingschematypeproperty"></a>

### `<Static>` missingSchemaTypeProperty

▸ **missingSchemaTypeProperty**(schema: *`object`*, path: *`string`*): `Error`

*Defined in [core/compilation/compilation_error.ts:10](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/compilation/compilation_error.ts#L10)*

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

*Defined in [core/compilation/compilation_error.ts:5](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/compilation/compilation_error.ts#L5)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| typeName | `string` |

**Returns:** `Error`

___
<a id="missingtypemethod"></a>

### `<Static>` missingTypeMethod

▸ **missingTypeMethod**(typeName: *`string`*, methodName: *`string`*): `Error`

*Defined in [core/compilation/compilation_error.ts:25](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/compilation/compilation_error.ts#L25)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| typeName | `string` |
| methodName | `string` |

**Returns:** `Error`

___

