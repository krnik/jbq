[JBQDocs](../README.md) > [TypeInstanceError](../classes/typeinstanceerror.md)

# Class: TypeInstanceError

## Hierarchy

**TypeInstanceError**

## Index

### Methods

* [keywordNotFound](typeinstanceerror.md#keywordnotfound)
* [typeAlreadyDerives](typeinstanceerror.md#typealreadyderives)
* [unrecognizedKeywordInKeywordOrder](typeinstanceerror.md#unrecognizedkeywordinkeywordorder)

---

## Methods

<a id="keywordnotfound"></a>

### `<Static>` keywordNotFound

▸ **keywordNotFound**(keyword: *`string`*, typeName: *`string`*): `Error`

*Defined in [core/type_store/type_instance/type_instance_error.ts:4](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/type_store/type_instance/type_instance_error.ts#L4)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| keyword | `string` |
| typeName | `string` |

**Returns:** `Error`

___
<a id="typealreadyderives"></a>

### `<Static>` typeAlreadyDerives

▸ **typeAlreadyDerives**(typeName: *`string`*, currentDerivedTypeName: *`string`*, derivedTypeName: *`string`*): `Error`

*Defined in [core/type_store/type_instance/type_instance_error.ts:25](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/type_store/type_instance/type_instance_error.ts#L25)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| typeName | `string` |
| currentDerivedTypeName | `string` |
| derivedTypeName | `string` |

**Returns:** `Error`

___
<a id="unrecognizedkeywordinkeywordorder"></a>

### `<Static>` unrecognizedKeywordInKeywordOrder

▸ **unrecognizedKeywordInKeywordOrder**(keywordOrder: *`string`[]*, keyword: *`string`*, typeName: *`string`*, existingKeywords: *`string`[]*): `Error`

*Defined in [core/type_store/type_instance/type_instance_error.ts:11](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/type_store/type_instance/type_instance_error.ts#L11)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| keywordOrder | `string`[] |
| keyword | `string` |
| typeName | `string` |
| existingKeywords | `string`[] |

**Returns:** `Error`

___

