[JBQDocs](../README.md) > [ResolvedPathStore](../classes/resolvedpathstore.md)

# Class: ResolvedPathStore

Stores collection of variables resolved from `$dataPath`. Instance of this class is shared between `Compilation` and `SourceBuilder` instances.

## Hierarchy

**ResolvedPathStore**

## Index

### Constructors

* [constructor](resolvedpathstore.md#constructor)

### Properties

* [isOpen](resolvedpathstore.md#isopen)
* [resolvedVariables](resolvedpathstore.md#resolvedvariables)

### Methods

* [add](resolvedpathstore.md#add)
* [close](resolvedpathstore.md#close)
* [consume](resolvedpathstore.md#consume)
* [open](resolvedpathstore.md#open)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new ResolvedPathStore**(): [ResolvedPathStore](resolvedpathstore.md)

*Defined in [core/compilation/resolved_path_store.ts:15](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/compilation/resolved_path_store.ts#L15)*

**Returns:** [ResolvedPathStore](resolvedpathstore.md)

___

## Properties

<a id="isopen"></a>

### `<Private>` isOpen

**● isOpen**: *`boolean`*

*Defined in [core/compilation/resolved_path_store.ts:15](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/compilation/resolved_path_store.ts#L15)*

___
<a id="resolvedvariables"></a>

### `<Private>` resolvedVariables

**● resolvedVariables**: *[ResolvedPathVariable](../interfaces/resolvedpathvariable.md)[]*

*Defined in [core/compilation/resolved_path_store.ts:14](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/compilation/resolved_path_store.ts#L14)*

___

## Methods

<a id="add"></a>

###  add

▸ **add**(this: *[ResolvedPathStore](resolvedpathstore.md)*, variableName: *`string`*, schemaValue: *[DataPath](../interfaces/datapath.md)*): `void`

*Defined in [core/compilation/resolved_path_store.ts:31](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/compilation/resolved_path_store.ts#L31)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [ResolvedPathStore](resolvedpathstore.md) |
| variableName | `string` |
| schemaValue | [DataPath](../interfaces/datapath.md) |

**Returns:** `void`

___
<a id="close"></a>

###  close

▸ **close**(this: *[ResolvedPathStore](resolvedpathstore.md)*): `void`

*Defined in [core/compilation/resolved_path_store.ts:26](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/compilation/resolved_path_store.ts#L26)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [ResolvedPathStore](resolvedpathstore.md) |

**Returns:** `void`

___
<a id="consume"></a>

###  consume

▸ **consume**(this: *[ResolvedPathStore](resolvedpathstore.md)*): [ResolvedPathVariable](../interfaces/resolvedpathvariable.md)[]

*Defined in [core/compilation/resolved_path_store.ts:35](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/compilation/resolved_path_store.ts#L35)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [ResolvedPathStore](resolvedpathstore.md) |

**Returns:** [ResolvedPathVariable](../interfaces/resolvedpathvariable.md)[]

___
<a id="open"></a>

###  open

▸ **open**(this: *[ResolvedPathStore](resolvedpathstore.md)*): `void`

*Defined in [core/compilation/resolved_path_store.ts:22](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/compilation/resolved_path_store.ts#L22)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [ResolvedPathStore](resolvedpathstore.md) |

**Returns:** `void`

___

