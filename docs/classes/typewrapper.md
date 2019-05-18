[JBQDocs](../README.md) > [TypeWrapper](../classes/typewrapper.md)

# Class: TypeWrapper

Class responsible for storing all TypeDefinitions and supply them to the code generator during schema parsing.

## Hierarchy

**TypeWrapper**

## Index

### Properties

* [types](typewrapper.md#types)
* [Error](typewrapper.md#error)

### Methods

* [addMethod](typewrapper.md#addmethod)
* [ensureTypeNameIsAvailable](typewrapper.md#ensuretypenameisavailable)
* [ensureTypePrototypeIsValid](typewrapper.md#ensuretypeprototypeisvalid)
* [get](typewrapper.md#get)
* [has](typewrapper.md#has)
* [mergeTypeKeyOrder](typewrapper.md#mergetypekeyorder)
* [set](typewrapper.md#set)

---

## Properties

<a id="types"></a>

### `<Private>` types

**● types**: *`Map`<`string`, [TypeDefinition](../interfaces/typedefinition.md)>* =  new Map()

*Defined in [core/type_wrapper.ts:21](https://github.com/krnik/vjs-validator/blob/08b1300/src/core/type_wrapper.ts#L21)*

___
<a id="error"></a>

### `<Static>``<Private>` Error

**● Error**: *[TypeWrapperErorr](typewrappererorr.md)* =  TypeWrapperErorr

*Defined in [core/type_wrapper.ts:19](https://github.com/krnik/vjs-validator/blob/08b1300/src/core/type_wrapper.ts#L19)*

___

## Methods

<a id="addmethod"></a>

###  addMethod

▸ **addMethod**(this: *[TypeWrapper](typewrapper.md)*, typeName: *`string`*, methodName: *`string`*, method: *[TypeMethod](../interfaces/typemethod.md)*, schemaValidationMethod: *[TypeValidationMethod](../#typevalidationmethod)*): [TypeWrapper](typewrapper.md)

*Defined in [core/type_wrapper.ts:82](https://github.com/krnik/vjs-validator/blob/08b1300/src/core/type_wrapper.ts#L82)*

Adds method to the TypeDefinition.

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [TypeWrapper](typewrapper.md) |
| typeName | `string` |
| methodName | `string` |
| method | [TypeMethod](../interfaces/typemethod.md) |
| schemaValidationMethod | [TypeValidationMethod](../#typevalidationmethod) |

**Returns:** [TypeWrapper](typewrapper.md)

___
<a id="ensuretypenameisavailable"></a>

### `<Private>` ensureTypeNameIsAvailable

▸ **ensureTypeNameIsAvailable**(this: *[TypeWrapper](typewrapper.md)*, typeName: *`string`*, typeToExtendWith?: *`undefined` \| `string`*): `void`

*Defined in [core/type_wrapper.ts:102](https://github.com/krnik/vjs-validator/blob/08b1300/src/core/type_wrapper.ts#L102)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [TypeWrapper](typewrapper.md) |
| typeName | `string` |
| `Optional` typeToExtendWith | `undefined` \| `string` |

**Returns:** `void`

___
<a id="ensuretypeprototypeisvalid"></a>

### `<Private>` ensureTypePrototypeIsValid

▸ **ensureTypePrototypeIsValid**<`T`,`K`>(this: *[TypeWrapper](typewrapper.md)*, typeName: *`string`*, typePrototype: *`T`*): `void`

*Defined in [core/type_wrapper.ts:113](https://github.com/krnik/vjs-validator/blob/08b1300/src/core/type_wrapper.ts#L113)*

**Type parameters:**

#### T :  [TypePrototype](../#typeprototype)<`T`>
#### K :  `keyof OmitSymbols<T>`
**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [TypeWrapper](typewrapper.md) |
| typeName | `string` |
| typePrototype | `T` |

**Returns:** `void`

___
<a id="get"></a>

###  get

▸ **get**(this: *[TypeWrapper](typewrapper.md)*, typeName: *`string`*): [TypeDefinition](../interfaces/typedefinition.md) \| `undefined`

*Defined in [core/type_wrapper.ts:34](https://github.com/krnik/vjs-validator/blob/08b1300/src/core/type_wrapper.ts#L34)*

Returns a TypeDefinition if exists. Otherwise returns undefined.

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [TypeWrapper](typewrapper.md) |
| typeName | `string` |

**Returns:** [TypeDefinition](../interfaces/typedefinition.md) \| `undefined`

___
<a id="has"></a>

###  has

▸ **has**(this: *[TypeWrapper](typewrapper.md)*, typeName: *`string`*): `boolean`

*Defined in [core/type_wrapper.ts:26](https://github.com/krnik/vjs-validator/blob/08b1300/src/core/type_wrapper.ts#L26)*

Returns `true` if type exists.

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [TypeWrapper](typewrapper.md) |
| typeName | `string` |

**Returns:** `boolean`

___
<a id="mergetypekeyorder"></a>

### `<Private>` mergeTypeKeyOrder

▸ **mergeTypeKeyOrder**(this: *[TypeWrapper](typewrapper.md)*, primaryKeys: *`string`[]*, secondaryKeys: *`string`[]*): `string`[]

*Defined in [core/type_wrapper.ts:142](https://github.com/krnik/vjs-validator/blob/08b1300/src/core/type_wrapper.ts#L142)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [TypeWrapper](typewrapper.md) |
| primaryKeys | `string`[] |
| secondaryKeys | `string`[] |

**Returns:** `string`[]

___
<a id="set"></a>

###  set

▸ **set**<`T`>(this: *[TypeWrapper](typewrapper.md)*, typeName: *`string`*, typePrototype: *`T`*, extendTypeWith?: *`object`*): [TypeWrapper](typewrapper.md)

*Defined in [core/type_wrapper.ts:42](https://github.com/krnik/vjs-validator/blob/08b1300/src/core/type_wrapper.ts#L42)*

Add new TypePrototype to the set of TypeDefinitions. TypeDefinition is a name for a valid TypePrototype.

**Type parameters:**

#### T :  [TypePrototype](../#typeprototype)<`T`>
**Parameters:**

**this: [TypeWrapper](typewrapper.md)**

**typeName: `string`**

**typePrototype: `T`**

**`Default value` extendTypeWith: `object`**

| Name | Type |
| ------ | ------ |
| `Optional` overwriteKeyOrder | `undefined` \| `false` \| `true` |
| `Optional` type | `undefined` \| `string` |

**Returns:** [TypeWrapper](typewrapper.md)

___

