[jbq](../README.md) > ["core/type_wrapper"](../modules/_core_type_wrapper_.md) > [TypeWrapper](../classes/_core_type_wrapper_.typewrapper.md)

# Class: TypeWrapper

Class responsible for storing all TypeDefinitions and supply them to the code generator during schema parsing.

## Hierarchy

**TypeWrapper**

## Index

### Properties

* [types](_core_type_wrapper_.typewrapper.md#types)
* [Error](_core_type_wrapper_.typewrapper.md#error)

### Methods

* [addMethod](_core_type_wrapper_.typewrapper.md#addmethod)
* [ensureTypeNameIsAvailable](_core_type_wrapper_.typewrapper.md#ensuretypenameisavailable)
* [ensureTypePrototypeIsValid](_core_type_wrapper_.typewrapper.md#ensuretypeprototypeisvalid)
* [get](_core_type_wrapper_.typewrapper.md#get)
* [has](_core_type_wrapper_.typewrapper.md#has)
* [mergeTypeKeyOrder](_core_type_wrapper_.typewrapper.md#mergetypekeyorder)
* [set](_core_type_wrapper_.typewrapper.md#set)

---

## Properties

<a id="types"></a>

### `<Private>` types

**● types**: *`Map`<`string`, [TypeDefinition](../interfaces/_core_type_wrapper_interface_type_definition_interface_.typedefinition.md)>* =  new Map()

*Defined in [core/type_wrapper.ts:21](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/type_wrapper.ts#L21)*

___
<a id="error"></a>

### `<Static>``<Private>` Error

**● Error**: *[TypeWrapperErorr](_core_type_wrapper_type_wrapper_error_.typewrappererorr.md)* =  TypeWrapperErorr

*Defined in [core/type_wrapper.ts:19](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/type_wrapper.ts#L19)*

___

## Methods

<a id="addmethod"></a>

###  addMethod

▸ **addMethod**(this: *[TypeWrapper](_core_type_wrapper_.typewrapper.md)*, typeName: *`string`*, methodName: *`string`*, method: *[TypeMethod](../interfaces/_core_type_wrapper_interface_type_method_interface_.typemethod.md)*, schemaValidationMethod: *[TypeValidationMethod](../modules/_core_type_wrapper_interface_type_method_interface_.md#typevalidationmethod)*): [TypeWrapper](_core_type_wrapper_.typewrapper.md)

*Defined in [core/type_wrapper.ts:82](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/type_wrapper.ts#L82)*

Adds method to the TypeDefinition.

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [TypeWrapper](_core_type_wrapper_.typewrapper.md) |
| typeName | `string` |
| methodName | `string` |
| method | [TypeMethod](../interfaces/_core_type_wrapper_interface_type_method_interface_.typemethod.md) |
| schemaValidationMethod | [TypeValidationMethod](../modules/_core_type_wrapper_interface_type_method_interface_.md#typevalidationmethod) |

**Returns:** [TypeWrapper](_core_type_wrapper_.typewrapper.md)

___
<a id="ensuretypenameisavailable"></a>

### `<Private>` ensureTypeNameIsAvailable

▸ **ensureTypeNameIsAvailable**(this: *[TypeWrapper](_core_type_wrapper_.typewrapper.md)*, typeName: *`string`*, typeToExtendWith?: *`undefined` \| `string`*): `void`

*Defined in [core/type_wrapper.ts:102](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/type_wrapper.ts#L102)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [TypeWrapper](_core_type_wrapper_.typewrapper.md) |
| typeName | `string` |
| `Optional` typeToExtendWith | `undefined` \| `string` |

**Returns:** `void`

___
<a id="ensuretypeprototypeisvalid"></a>

### `<Private>` ensureTypePrototypeIsValid

▸ **ensureTypePrototypeIsValid**<`T`,`K`>(this: *[TypeWrapper](_core_type_wrapper_.typewrapper.md)*, typeName: *`string`*, typePrototype: *`T`*): `void`

*Defined in [core/type_wrapper.ts:113](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/type_wrapper.ts#L113)*

**Type parameters:**

#### T :  [TypePrototype](../modules/_core_type_wrapper_interface_type_prototype_interface_.md#typeprototype)<`T`>
#### K :  `keyof OmitSymbols<T>`
**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [TypeWrapper](_core_type_wrapper_.typewrapper.md) |
| typeName | `string` |
| typePrototype | `T` |

**Returns:** `void`

___
<a id="get"></a>

###  get

▸ **get**(this: *[TypeWrapper](_core_type_wrapper_.typewrapper.md)*, typeName: *`string`*): [TypeDefinition](../interfaces/_core_type_wrapper_interface_type_definition_interface_.typedefinition.md) \| `undefined`

*Defined in [core/type_wrapper.ts:34](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/type_wrapper.ts#L34)*

Returns a TypeDefinition if exists. Otherwise returns undefined.

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [TypeWrapper](_core_type_wrapper_.typewrapper.md) |
| typeName | `string` |

**Returns:** [TypeDefinition](../interfaces/_core_type_wrapper_interface_type_definition_interface_.typedefinition.md) \| `undefined`

___
<a id="has"></a>

###  has

▸ **has**(this: *[TypeWrapper](_core_type_wrapper_.typewrapper.md)*, typeName: *`string`*): `boolean`

*Defined in [core/type_wrapper.ts:26](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/type_wrapper.ts#L26)*

Returns `true` if type exists.

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [TypeWrapper](_core_type_wrapper_.typewrapper.md) |
| typeName | `string` |

**Returns:** `boolean`

___
<a id="mergetypekeyorder"></a>

### `<Private>` mergeTypeKeyOrder

▸ **mergeTypeKeyOrder**(this: *[TypeWrapper](_core_type_wrapper_.typewrapper.md)*, primaryKeys: *`string`[]*, secondaryKeys: *`string`[]*): `string`[]

*Defined in [core/type_wrapper.ts:142](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/type_wrapper.ts#L142)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [TypeWrapper](_core_type_wrapper_.typewrapper.md) |
| primaryKeys | `string`[] |
| secondaryKeys | `string`[] |

**Returns:** `string`[]

___
<a id="set"></a>

###  set

▸ **set**<`T`>(this: *[TypeWrapper](_core_type_wrapper_.typewrapper.md)*, typeName: *`string`*, typePrototype: *`T`*, extendTypeWith?: *`object`*): [TypeWrapper](_core_type_wrapper_.typewrapper.md)

*Defined in [core/type_wrapper.ts:42](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/type_wrapper.ts#L42)*

Add new TypePrototype to the set of TypeDefinitions. TypeDefinition is a name for a valid TypePrototype.

**Type parameters:**

#### T :  [TypePrototype](../modules/_core_type_wrapper_interface_type_prototype_interface_.md#typeprototype)<`T`>
**Parameters:**

**this: [TypeWrapper](_core_type_wrapper_.typewrapper.md)**

**typeName: `string`**

**typePrototype: `T`**

**`Default value` extendTypeWith: `object`**

| Name | Type |
| ------ | ------ |
| `Optional` overwriteKeyOrder | `undefined` \| `false` \| `true` |
| `Optional` type | `undefined` \| `string` |

**Returns:** [TypeWrapper](_core_type_wrapper_.typewrapper.md)

___

