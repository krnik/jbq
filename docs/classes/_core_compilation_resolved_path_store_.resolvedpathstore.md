[jbq](../README.md) > ["core/compilation/resolved_path_store"](../modules/_core_compilation_resolved_path_store_.md) > [ResolvedPathStore](../classes/_core_compilation_resolved_path_store_.resolvedpathstore.md)

# Class: ResolvedPathStore

## Hierarchy

**ResolvedPathStore**

## Index

### Constructors

* [constructor](_core_compilation_resolved_path_store_.resolvedpathstore.md#constructor)

### Properties

* [resolvedVariables](_core_compilation_resolved_path_store_.resolvedpathstore.md#resolvedvariables)
* [state](_core_compilation_resolved_path_store_.resolvedpathstore.md#state)

### Methods

* [add](_core_compilation_resolved_path_store_.resolvedpathstore.md#add)
* [close](_core_compilation_resolved_path_store_.resolvedpathstore.md#close)
* [consume](_core_compilation_resolved_path_store_.resolvedpathstore.md#consume)
* [open](_core_compilation_resolved_path_store_.resolvedpathstore.md#open)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new ResolvedPathStore**(): [ResolvedPathStore](_core_compilation_resolved_path_store_.resolvedpathstore.md)

*Defined in [core/compilation/resolved_path_store.ts:10](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/compilation/resolved_path_store.ts#L10)*

**Returns:** [ResolvedPathStore](_core_compilation_resolved_path_store_.resolvedpathstore.md)

___

## Properties

<a id="resolvedvariables"></a>

### `<Private>` resolvedVariables

**● resolvedVariables**: *[ResolvedPathVariable](../interfaces/_core_compilation_resolved_path_store_.resolvedpathvariable.md)[]*

*Defined in [core/compilation/resolved_path_store.ts:9](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/compilation/resolved_path_store.ts#L9)*

___
<a id="state"></a>

### `<Private>` state

**● state**: *`boolean`*

*Defined in [core/compilation/resolved_path_store.ts:10](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/compilation/resolved_path_store.ts#L10)*

___

## Methods

<a id="add"></a>

###  add

▸ **add**(this: *[ResolvedPathStore](_core_compilation_resolved_path_store_.resolvedpathstore.md)*, variableName: *`string`*, schemaValue: *[DataPath](../interfaces/_misc_typings_.datapath.md)*): `void`

*Defined in [core/compilation/resolved_path_store.ts:26](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/compilation/resolved_path_store.ts#L26)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [ResolvedPathStore](_core_compilation_resolved_path_store_.resolvedpathstore.md) |
| variableName | `string` |
| schemaValue | [DataPath](../interfaces/_misc_typings_.datapath.md) |

**Returns:** `void`

___
<a id="close"></a>

###  close

▸ **close**(this: *[ResolvedPathStore](_core_compilation_resolved_path_store_.resolvedpathstore.md)*): `void`

*Defined in [core/compilation/resolved_path_store.ts:21](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/compilation/resolved_path_store.ts#L21)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [ResolvedPathStore](_core_compilation_resolved_path_store_.resolvedpathstore.md) |

**Returns:** `void`

___
<a id="consume"></a>

###  consume

▸ **consume**(this: *[ResolvedPathStore](_core_compilation_resolved_path_store_.resolvedpathstore.md)*): [ResolvedPathVariable](../interfaces/_core_compilation_resolved_path_store_.resolvedpathvariable.md)[]

*Defined in [core/compilation/resolved_path_store.ts:30](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/compilation/resolved_path_store.ts#L30)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [ResolvedPathStore](_core_compilation_resolved_path_store_.resolvedpathstore.md) |

**Returns:** [ResolvedPathVariable](../interfaces/_core_compilation_resolved_path_store_.resolvedpathvariable.md)[]

___
<a id="open"></a>

###  open

▸ **open**(this: *[ResolvedPathStore](_core_compilation_resolved_path_store_.resolvedpathstore.md)*): `void`

*Defined in [core/compilation/resolved_path_store.ts:17](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/compilation/resolved_path_store.ts#L17)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [ResolvedPathStore](_core_compilation_resolved_path_store_.resolvedpathstore.md) |

**Returns:** `void`

___

