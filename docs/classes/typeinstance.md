[JBQDocs](../README.md) > [TypeInstance](../classes/typeinstance.md)

# Class: TypeInstance

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

*Defined in [core/type_store/type_instance.ts:19](https://github.com/krnik/vjs-validator/blob/4b489fe/src/core/type_store/type_instance.ts#L19)*

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

*Defined in [core/type_store/type_instance.ts:17](https://github.com/krnik/vjs-validator/blob/4b489fe/src/core/type_store/type_instance.ts#L17)*

___
<a id="keywordorder"></a>

### `<Private>``<Optional>` keywordOrder

**● keywordOrder**: *`string`[]*

*Defined in [core/type_store/type_instance.ts:18](https://github.com/krnik/vjs-validator/blob/4b489fe/src/core/type_store/type_instance.ts#L18)*

___
<a id="methods"></a>

### `<Private>` methods

**● methods**: *`Map`<`string`, [KeywordDescriptor](../interfaces/keyworddescriptor.md)>* =  new Map()

*Defined in [core/type_store/type_instance.ts:16](https://github.com/krnik/vjs-validator/blob/4b489fe/src/core/type_store/type_instance.ts#L16)*

___
<a id="name"></a>

###  name

**● name**: *`N`*

*Defined in [core/type_store/type_instance.ts:15](https://github.com/krnik/vjs-validator/blob/4b489fe/src/core/type_store/type_instance.ts#L15)*

___
<a id="useforofloop"></a>

### `<Private>` useForOfLoop

**● useForOfLoop**: *`boolean`* = true

*Defined in [core/type_store/type_instance.ts:19](https://github.com/krnik/vjs-validator/blob/4b489fe/src/core/type_store/type_instance.ts#L19)*

___

## Methods

<a id="derive"></a>

###  derive

▸ **derive**<`Derived`>(this: *[TypeInstance](typeinstance.md)<`N`, `M`, `undefined`>*, proto: *[TypeInstance](typeinstance.md)<`Derived`, [Option](../#option)<`string`>, [Option](../#option)<`string`>>*): [TypeInstance](typeinstance.md)<`N`, `M`, `Derived`>

*Defined in [core/type_store/type_instance.ts:25](https://github.com/krnik/vjs-validator/blob/4b489fe/src/core/type_store/type_instance.ts#L25)*

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

*Defined in [core/type_store/type_instance.ts:45](https://github.com/krnik/vjs-validator/blob/4b489fe/src/core/type_store/type_instance.ts#L45)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| keyword | `string` |

**Returns:** [KeywordDescriptor](../interfaces/keyworddescriptor.md)

___
<a id="getkeywordorder"></a>

###  getKeywordOrder

▸ **getKeywordOrder**(): [Option](../#option)<`string`[]>

*Defined in [core/type_store/type_instance.ts:92](https://github.com/krnik/vjs-validator/blob/4b489fe/src/core/type_store/type_instance.ts#L92)*

**Returns:** [Option](../#option)<`string`[]>

___
<a id="getkeywords"></a>

###  getKeywords

▸ **getKeywords**(): `string`[]

*Defined in [core/type_store/type_instance.ts:68](https://github.com/krnik/vjs-validator/blob/4b489fe/src/core/type_store/type_instance.ts#L68)*

**Returns:** `string`[]

___
<a id="getuseforofloop"></a>

###  getUseForOfLoop

▸ **getUseForOfLoop**(): `boolean`

*Defined in [core/type_store/type_instance.ts:101](https://github.com/krnik/vjs-validator/blob/4b489fe/src/core/type_store/type_instance.ts#L101)*

**Returns:** `boolean`

___
<a id="haskeyword"></a>

###  hasKeyword

▸ **hasKeyword**(keyword: *`string`*): `boolean`

*Defined in [core/type_store/type_instance.ts:60](https://github.com/krnik/vjs-validator/blob/4b489fe/src/core/type_store/type_instance.ts#L60)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| keyword | `string` |

**Returns:** `boolean`

___
<a id="setkeyword"></a>

###  setKeyword

▸ **setKeyword**<`V`>(this: *[TypeInstance](typeinstance.md)<`N`, `M`, `D`>*, methodName: *`V`*, descriptor: *[PartialProps](../#partialprops)<[KeywordDescriptor](../interfaces/keyworddescriptor.md), "kind" \| "acceptDataPath">*): [TypeInstance](typeinstance.md)<`N`, [Methods](../#methods)<`V` \| `M`>, `D`>

*Defined in [core/type_store/type_instance.ts:33](https://github.com/krnik/vjs-validator/blob/4b489fe/src/core/type_store/type_instance.ts#L33)*

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

*Defined in [core/type_store/type_instance.ts:74](https://github.com/krnik/vjs-validator/blob/4b489fe/src/core/type_store/type_instance.ts#L74)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| keywords | `string`[] |

**Returns:** `this`

___
<a id="setuseforofloop"></a>

###  setUseForOfLoop

▸ **setUseForOfLoop**(useForOfLoop: *`boolean`*): `this`

*Defined in [core/type_store/type_instance.ts:96](https://github.com/krnik/vjs-validator/blob/4b489fe/src/core/type_store/type_instance.ts#L96)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| useForOfLoop | `boolean` |

**Returns:** `this`

___

