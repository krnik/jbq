[JBQDocs](../README.md) > [TypeStore](../classes/typestore.md)

# Class: TypeStore

## Type parameters
#### T :  [TypeSignature](../#typesignature)
## Hierarchy

**TypeStore**

## Index

### Properties

* [types](typestore.md#types)

### Methods

* [addType](typestore.md#addtype)
* [getType](typestore.md#gettype)
* [getTypeNames](typestore.md#gettypenames)
* [hasType](typestore.md#hastype)

---

## Properties

<a id="types"></a>

### `<Private>` types

**● types**: *`Map`<`T["0"]`, [TypeInstance](typeinstance.md)<`string`, [Option](../#option)<`string`>, [Option](../#option)<`string`>>>* =  new Map()

*Defined in [core/type_store.ts:40](https://github.com/krnik/vjs-validator/blob/4b489fe/src/core/type_store.ts#L40)*

___

## Methods

<a id="addtype"></a>

###  addType

▸ **addType**<`N`,`M`,`D`>(type: *[TypeInstance](typeinstance.md)<[NotIn](../#notin)<`N`, `T`>, `M`, `D`>*): [TypeStore](typestore.md)<[Types](../#types)<`T` \| [`N`, `M`, `D`]>>

*Defined in [core/type_store.ts:42](https://github.com/krnik/vjs-validator/blob/4b489fe/src/core/type_store.ts#L42)*

**Type parameters:**

#### N :  `string`
#### M :  [Option](../#option)<`string`>
#### D :  [Option](../#option)<`string`>
**Parameters:**

| Name | Type |
| ------ | ------ |
| type | [TypeInstance](typeinstance.md)<[NotIn](../#notin)<`N`, `T`>, `M`, `D`> |

**Returns:** [TypeStore](typestore.md)<[Types](../#types)<`T` \| [`N`, `M`, `D`]>>

___
<a id="gettype"></a>

###  getType

▸ **getType**<`N`>(typeName: *`N`*): [Extract](../#extract)<`T`, `N`>

*Defined in [core/type_store.ts:57](https://github.com/krnik/vjs-validator/blob/4b489fe/src/core/type_store.ts#L57)*

**Type parameters:**

#### N :  `T["0"]`
**Parameters:**

| Name | Type |
| ------ | ------ |
| typeName | `N` |

**Returns:** [Extract](../#extract)<`T`, `N`>

___
<a id="gettypenames"></a>

###  getTypeNames

▸ **getTypeNames**(): `string`[]

*Defined in [core/type_store.ts:65](https://github.com/krnik/vjs-validator/blob/4b489fe/src/core/type_store.ts#L65)*

**Returns:** `string`[]

___
<a id="hastype"></a>

###  hasType

▸ **hasType**<`N`>(typeName: *`N`*): `boolean`

*Defined in [core/type_store.ts:53](https://github.com/krnik/vjs-validator/blob/4b489fe/src/core/type_store.ts#L53)*

**Type parameters:**

#### N :  `string`
**Parameters:**

| Name | Type |
| ------ | ------ |
| typeName | `N` |

**Returns:** `boolean`

___

