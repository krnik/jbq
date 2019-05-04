[jbq](../README.md) > [ResolvedPathStore](../classes/resolvedpathstore.md)

# Class: ResolvedPathStore

## Hierarchy

**ResolvedPathStore**

## Index

### Constructors

* [constructor](resolvedpathstore.md#constructor)

### Properties

* [resolvedVariables](resolvedpathstore.md#resolvedvariables)
* [state](resolvedpathstore.md#state)

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

*Defined in [core/compilation/resolved_path_store.ts:10](https://github.com/krnik/vjs-validator/blob/15e769b/src/core/compilation/resolved_path_store.ts#L10)*

**Returns:** [ResolvedPathStore](resolvedpathstore.md)

___

## Properties

<a id="resolvedvariables"></a>

### `<Private>` resolvedVariables

**● resolvedVariables**: *[ResolvedPathVariable](../interfaces/resolvedpathvariable.md)[]*

*Defined in [core/compilation/resolved_path_store.ts:9](https://github.com/krnik/vjs-validator/blob/15e769b/src/core/compilation/resolved_path_store.ts#L9)*

___
<a id="state"></a>

### `<Private>` state

**● state**: *`boolean`*

*Defined in [core/compilation/resolved_path_store.ts:10](https://github.com/krnik/vjs-validator/blob/15e769b/src/core/compilation/resolved_path_store.ts#L10)*

___

## Methods

<a id="add"></a>

###  add

▸ **add**(this: *[ResolvedPathStore](resolvedpathstore.md)*, variableName: *`string`*, schemaValue: *[DataPath](../interfaces/datapath.md)*): `void`

*Defined in [core/compilation/resolved_path_store.ts:26](https://github.com/krnik/vjs-validator/blob/15e769b/src/core/compilation/resolved_path_store.ts#L26)*

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

*Defined in [core/compilation/resolved_path_store.ts:21](https://github.com/krnik/vjs-validator/blob/15e769b/src/core/compilation/resolved_path_store.ts#L21)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [ResolvedPathStore](resolvedpathstore.md) |

**Returns:** `void`

___
<a id="consume"></a>

###  consume

▸ **consume**(this: *[ResolvedPathStore](resolvedpathstore.md)*): [ResolvedPathVariable](../interfaces/resolvedpathvariable.md)[]

*Defined in [core/compilation/resolved_path_store.ts:30](https://github.com/krnik/vjs-validator/blob/15e769b/src/core/compilation/resolved_path_store.ts#L30)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [ResolvedPathStore](resolvedpathstore.md) |

**Returns:** [ResolvedPathVariable](../interfaces/resolvedpathvariable.md)[]

___
<a id="open"></a>

###  open

▸ **open**(this: *[ResolvedPathStore](resolvedpathstore.md)*): `void`

*Defined in [core/compilation/resolved_path_store.ts:17](https://github.com/krnik/vjs-validator/blob/15e769b/src/core/compilation/resolved_path_store.ts#L17)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [ResolvedPathStore](resolvedpathstore.md) |

**Returns:** `void`

___

