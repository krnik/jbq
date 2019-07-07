[JBQDocs](../README.md) > [TypeInstanceError](../classes/typeinstanceerror.md)

# Class: TypeInstanceError

## Hierarchy

**TypeInstanceError**

## Index

### Methods

* [keywordNotFound](typeinstanceerror.md#keywordnotfound)
* [unrecognizedKeywordInKeywordOrder](typeinstanceerror.md#unrecognizedkeywordinkeywordorder)

---

## Methods

<a id="keywordnotfound"></a>

### `<Static>` keywordNotFound

▸ **keywordNotFound**(keyword: *`string`*, typeName: *`string`*): `Error`

*Defined in [core/type_store/type_instance/type_instance_error.ts:4](https://github.com/krnik/vjs-validator/blob/4b489fe/src/core/type_store/type_instance/type_instance_error.ts#L4)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| keyword | `string` |
| typeName | `string` |

**Returns:** `Error`

___
<a id="unrecognizedkeywordinkeywordorder"></a>

### `<Static>` unrecognizedKeywordInKeywordOrder

▸ **unrecognizedKeywordInKeywordOrder**(keywordOrder: *`string`[]*, keyword: *`string`*, typeName: *`string`*, existingKeywords: *`string`[]*): `Error`

*Defined in [core/type_store/type_instance/type_instance_error.ts:11](https://github.com/krnik/vjs-validator/blob/4b489fe/src/core/type_store/type_instance/type_instance_error.ts#L11)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| keywordOrder | `string`[] |
| keyword | `string` |
| typeName | `string` |
| existingKeywords | `string`[] |

**Returns:** `Error`

___

