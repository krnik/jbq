[JBQDocs](../README.md) > [TypeStore](../classes/typestore.md)

# Class: TypeStore

`TypeStore<TypeSignature>`. A class that stores all types that should be used during schema compilation.

## Type parameters
#### T :  [TypeSignature](../#typesignature)
## Hierarchy

**TypeStore**

## Index

### Properties

* [types](typestore.md#types)
* [Error](typestore.md#error)

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

*Defined in [core/type_store.ts:48](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/type_store.ts#L48)*

___
<a id="error"></a>

### `<Static>``<Private>` Error

**● Error**: *[TypeStoreError](typestoreerror.md)* =  TypeStoreError

*Defined in [core/type_store.ts:99](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/type_store.ts#L99)*

___

## Methods

<a id="addtype"></a>

###  addType

▸ **addType**<`N`,`M`,`D`>(type: *[TypeInstance](typeinstance.md)<[NotIn](../#notin)<`N`, `T`>, `M`, `D`>*): [TypeStore](typestore.md)<[Types](../#types)<`T` \| [`N`, `M`, `D`]>>

*Defined in [core/type_store.ts:57](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/type_store.ts#L57)*

Adds a type to the store. Cannot add a type with name that already exists in the store.

Example
=======

#example:type\_store\_add\_type

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

*Defined in [core/type_store.ts:81](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/type_store.ts#L81)*

Returns `TypeInstance` instance if it was previously added to the store.

Example
=======

#example:type\_store\_get\_type

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

▸ **getTypeNames**(): `T[0]`[]

*Defined in [core/type_store.ts:95](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/type_store.ts#L95)*

Returns an array of names of all types that has been added to the store.

Example
=======

#example:type\_store\_get\_type\_names

**Returns:** `T[0]`[]

___
<a id="hastype"></a>

###  hasType

▸ **hasType**<`N`>(typeName: *`N`*): `boolean`

*Defined in [core/type_store.ts:71](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/type_store.ts#L71)*

Returns `true` if type with provided name has been added to the store.

**Type parameters:**

#### N :  `string`
**Parameters:**

| Name | Type |
| ------ | ------ |
| typeName | `N` |

**Returns:** `boolean`

___

