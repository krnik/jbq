[JBQDocs](../README.md) > [TypeInstance](../classes/typeinstance.md)

# Class: TypeInstance

`TypeInstance<N, M, D>`. Generic class over validation type definition.

Generic parameters parameters:

*   `N`: string - type name
*   `M`: Option - union of strings methods
*   `D`: Option - name of type to derive from

Examples
========

#example:type\_instance\_class

## Type parameters
#### N :  `string`
#### M :  [Option](../#option)<`string`>
#### D :  [Option](../#option)<`string`>
## Hierarchy

**TypeInstance**

## Index

### Constructors

* [constructor](typeinstance.md#constructor)

### Properties

* [deriveType](typeinstance.md#derivetype)
* [keywordOrder](typeinstance.md#keywordorder)
* [methods](typeinstance.md#methods)
* [name](typeinstance.md#name)
* [useForOfLoop](typeinstance.md#useforofloop)
* [Error](typeinstance.md#error)

### Methods

* [derive](typeinstance.md#derive)
* [getKeyword](typeinstance.md#getkeyword)
* [getKeywordOrder](typeinstance.md#getkeywordorder)
* [getKeywords](typeinstance.md#getkeywords)
* [getUseForOfLoop](typeinstance.md#getuseforofloop)
* [hasKeyword](typeinstance.md#haskeyword)
* [setKeyword](typeinstance.md#setkeyword)
* [setKeywordOrder](typeinstance.md#setkeywordorder)
* [setUseForOfLoop](typeinstance.md#setuseforofloop)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new TypeInstance**(name: *`N`*): [TypeInstance](typeinstance.md)

*Defined in [core/type_store/type_instance.ts:30](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/type_store/type_instance.ts#L30)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `N` |

**Returns:** [TypeInstance](typeinstance.md)

___

## Properties

<a id="derivetype"></a>

### `<Private>``<Optional>` deriveType

**● deriveType**: *[TypeInstance](typeinstance.md)<`string`, [Option](../#option)<`string`>, [Option](../#option)<`string`>>*

*Defined in [core/type_store/type_instance.ts:28](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/type_store/type_instance.ts#L28)*

___
<a id="keywordorder"></a>

### `<Private>``<Optional>` keywordOrder

**● keywordOrder**: *`string`[]*

*Defined in [core/type_store/type_instance.ts:29](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/type_store/type_instance.ts#L29)*

___
<a id="methods"></a>

### `<Private>` methods

**● methods**: *`Map`<`string`, [KeywordDescriptor](../interfaces/keyworddescriptor.md)>* =  new Map()

*Defined in [core/type_store/type_instance.ts:27](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/type_store/type_instance.ts#L27)*

___
<a id="name"></a>

###  name

**● name**: *`N`*

*Defined in [core/type_store/type_instance.ts:26](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/type_store/type_instance.ts#L26)*

___
<a id="useforofloop"></a>

### `<Private>` useForOfLoop

**● useForOfLoop**: *`boolean`* = true

*Defined in [core/type_store/type_instance.ts:30](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/type_store/type_instance.ts#L30)*

___
<a id="error"></a>

### `<Static>``<Private>` Error

**● Error**: *[TypeInstanceError](typeinstanceerror.md)* =  TypeInstanceError

*Defined in [core/type_store/type_instance.ts:172](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/type_store/type_instance.ts#L172)*

___

## Methods

<a id="derive"></a>

###  derive

▸ **derive**<`Derived`>(this: *[TypeInstance](typeinstance.md)<`N`, `M`, `undefined`>*, proto: *[TypeInstance](typeinstance.md)<`Derived`, [Option](../#option)<`string`>, [Option](../#option)<`string`>>*): [TypeInstance](typeinstance.md)<`N`, `M`, `Derived`>

*Defined in [core/type_store/type_instance.ts:46](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/type_store/type_instance.ts#L46)*

Sets the derived type of the instance. Derived type acts as a 'backup' when compilator is looking for keywords.

For example if `TypeA` derives from `Type0` then if `TypeA` does not have keyword `Key0` defined then `Type0` will be checked in order to find this keyword.

Example
=======

#example:type\_instance\_derive

**Type parameters:**

#### Derived :  `string`
**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [TypeInstance](typeinstance.md)<`N`, `M`, `undefined`> |
| proto | [TypeInstance](typeinstance.md)<`Derived`, [Option](../#option)<`string`>, [Option](../#option)<`string`>> |

**Returns:** [TypeInstance](typeinstance.md)<`N`, `M`, `Derived`>

___
<a id="getkeyword"></a>

###  getKeyword

▸ **getKeyword**(keyword: *`string`*): [KeywordDescriptor](../interfaces/keyworddescriptor.md)

*Defined in [core/type_store/type_instance.ts:81](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/type_store/type_instance.ts#L81)*

Returns `KeywordDescriptor` for `keyword` if exists. Otherwise throws an error.

**Parameters:**

| Name | Type |
| ------ | ------ |
| keyword | `string` |

**Returns:** [KeywordDescriptor](../interfaces/keyworddescriptor.md)

___
<a id="getkeywordorder"></a>

###  getKeywordOrder

▸ **getKeywordOrder**(): [Option](../#option)<`string`[]>

*Defined in [core/type_store/type_instance.ts:145](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/type_store/type_instance.ts#L145)*

Returns the desired order of keywords.

**Returns:** [Option](../#option)<`string`[]>

___
<a id="getkeywords"></a>

###  getKeywords

▸ **getKeywords**(): `string`[]

*Defined in [core/type_store/type_instance.ts:111](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/type_store/type_instance.ts#L111)*

Returns list of all keywords instance has access to. Includes also keywords from derived types.

**Returns:** `string`[]

___
<a id="getuseforofloop"></a>

###  getUseForOfLoop

▸ **getUseForOfLoop**(): `boolean`

*Defined in [core/type_store/type_instance.ts:168](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/type_store/type_instance.ts#L168)*

Returns current use `for..of` loop flag value setting.

**Returns:** `boolean`

___
<a id="haskeyword"></a>

###  hasKeyword

▸ **hasKeyword**(keyword: *`string`*): `boolean`

*Defined in [core/type_store/type_instance.ts:99](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/type_store/type_instance.ts#L99)*

Returns true if instance has `keyword` keyword defined.

**Parameters:**

| Name | Type |
| ------ | ------ |
| keyword | `string` |

**Returns:** `boolean`

___
<a id="setkeyword"></a>

###  setKeyword

▸ **setKeyword**<`V`>(this: *[TypeInstance](typeinstance.md)<`N`, `M`, `D`>*, methodName: *`V`*, descriptor: *[PartialProps](../#partialprops)<[KeywordDescriptor](../interfaces/keyworddescriptor.md), "kind" \| "acceptDataPath">*): [TypeInstance](typeinstance.md)<`N`, [Methods](../#methods)<`V` \| `M`>, `D`>

*Defined in [core/type_store/type_instance.ts:65](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/type_store/type_instance.ts#L65)*

Adds a keyword to the instance.

**Type parameters:**

#### V :  `string`
**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [TypeInstance](typeinstance.md)<`N`, `M`, `D`> |
| methodName | `V` |
| descriptor | [PartialProps](../#partialprops)<[KeywordDescriptor](../interfaces/keyworddescriptor.md), "kind" \| "acceptDataPath"> |

**Returns:** [TypeInstance](typeinstance.md)<`N`, [Methods](../#methods)<`V` \| `M`>, `D`>

___
<a id="setkeywordorder"></a>

###  setKeywordOrder

▸ **setKeywordOrder**(keywords: *`string`[]*): `this`

*Defined in [core/type_store/type_instance.ts:124](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/type_store/type_instance.ts#L124)*

Defines an order in which keywords should be validated during validation function execution.

Example
=======

#example:type\_instance\_set\_keyword\_order

**Parameters:**

| Name | Type |
| ------ | ------ |
| keywords | `string`[] |

**Returns:** `this`

___
<a id="setuseforofloop"></a>

###  setUseForOfLoop

▸ **setUseForOfLoop**(useForOfLoop: *`boolean`*): `this`

*Defined in [core/type_store/type_instance.ts:160](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/type_store/type_instance.ts#L160)*

Boolean flag that defines whether instance types should use `for..of` loop when validating the elements of this type. Default value: `true`.

In other words: validator will assume that this type implements `Iterable Protocol`.

If this flag is set to true then all elements of this type is `integer` indexable.

Example
=======

#example:type\_instance\_set\_use\_for\_of\_loop

**Parameters:**

| Name | Type |
| ------ | ------ |
| useForOfLoop | `boolean` |

**Returns:** `this`

___

