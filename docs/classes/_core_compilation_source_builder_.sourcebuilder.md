[jbq](../README.md) > ["core/compilation/source_builder"](../modules/_core_compilation_source_builder_.md) > [SourceBuilder](../classes/_core_compilation_source_builder_.sourcebuilder.md)

# Class: SourceBuilder

Class responsible for main validation function composition logic. It keeps track of currently used variables, arguments and schemaPath. It is also responsible for creating and updating its context and product.

## Hierarchy

**SourceBuilder**

## Index

### Constructors

* [constructor](_core_compilation_source_builder_.sourcebuilder.md#constructor)

### Properties

* [Compilation](_core_compilation_source_builder_.sourcebuilder.md#compilation)
* [context](_core_compilation_source_builder_.sourcebuilder.md#context)
* [counter](_core_compilation_source_builder_.sourcebuilder.md#counter)
* [pathResolutionStrategy](_core_compilation_source_builder_.sourcebuilder.md#pathresolutionstrategy)
* [product](_core_compilation_source_builder_.sourcebuilder.md#product)
* [resolvedPaths](_core_compilation_source_builder_.sourcebuilder.md#resolvedpaths)

### Methods

* [append](_core_compilation_source_builder_.sourcebuilder.md#append)
* [breakStatement](_core_compilation_source_builder_.sourcebuilder.md#breakstatement)
* [callClosure](_core_compilation_source_builder_.sourcebuilder.md#callclosure)
* [closeBlock](_core_compilation_source_builder_.sourcebuilder.md#closeblock)
* [createInitialContext](_core_compilation_source_builder_.sourcebuilder.md#createinitialcontext)
* [createInitialCounter](_core_compilation_source_builder_.sourcebuilder.md#createinitialcounter)
* [createInitialProduct](_core_compilation_source_builder_.sourcebuilder.md#createinitialproduct)
* [createParameter](_core_compilation_source_builder_.sourcebuilder.md#createparameter)
* [defineVariable](_core_compilation_source_builder_.sourcebuilder.md#definevariable)
* [forLoop](_core_compilation_source_builder_.sourcebuilder.md#forloop)
* [getContextSnapshot](_core_compilation_source_builder_.sourcebuilder.md#getcontextsnapshot)
* [getProduct](_core_compilation_source_builder_.sourcebuilder.md#getproduct)
* [getSchemaPath](_core_compilation_source_builder_.sourcebuilder.md#getschemapath)
* [getVariableName](_core_compilation_source_builder_.sourcebuilder.md#getvariablename)
* [openLabeledBlock](_core_compilation_source_builder_.sourcebuilder.md#openlabeledblock)
* [propertyAccessor](_core_compilation_source_builder_.sourcebuilder.md#propertyaccessor)
* [resolveDataPath](_core_compilation_source_builder_.sourcebuilder.md#resolvedatapath)
* [updateBuilderContext](_core_compilation_source_builder_.sourcebuilder.md#updatebuildercontext)
* [updateVariableName](_core_compilation_source_builder_.sourcebuilder.md#updatevariablename)
* [validateResolvedVariables](_core_compilation_source_builder_.sourcebuilder.md#validateresolvedvariables)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new SourceBuilder**(compilation: *[Compilation](_core_compilation_.compilation.md)*, schemaName: *`string`*, resolvedPaths: *[ResolvedPathStore](_core_compilation_resolved_path_store_.resolvedpathstore.md)*, pathResolutionStrategy?: *[PathResolutionStrategy](../enums/_misc_constants_.pathresolutionstrategy.md)*): [SourceBuilder](_core_compilation_source_builder_.sourcebuilder.md)

*Defined in [core/compilation/source_builder.ts:32](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/compilation/source_builder.ts#L32)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| compilation | [Compilation](_core_compilation_.compilation.md) | - |
| schemaName | `string` | - |
| resolvedPaths | [ResolvedPathStore](_core_compilation_resolved_path_store_.resolvedpathstore.md) | - |
| `Default value` pathResolutionStrategy | [PathResolutionStrategy](../enums/_misc_constants_.pathresolutionstrategy.md) |  PathResolutionStrategy.Ignore |

**Returns:** [SourceBuilder](_core_compilation_source_builder_.sourcebuilder.md)

___

## Properties

<a id="compilation"></a>

### `<Private>` Compilation

**● Compilation**: *[Compilation](_core_compilation_.compilation.md)*

*Defined in [core/compilation/source_builder.ts:32](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/compilation/source_builder.ts#L32)*

___
<a id="context"></a>

### `<Private>` context

**● context**: *[SourceBuilderContext](../interfaces/_core_compilation_interface_source_builder_context_interface_.sourcebuildercontext.md)*

*Defined in [core/compilation/source_builder.ts:29](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/compilation/source_builder.ts#L29)*

___
<a id="counter"></a>

### `<Private>` counter

**● counter**: *[SourceBuilderCounter](../interfaces/_core_compilation_interface_source_builder_counter_interface_.sourcebuildercounter.md)*

*Defined in [core/compilation/source_builder.ts:28](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/compilation/source_builder.ts#L28)*

___
<a id="pathresolutionstrategy"></a>

### `<Private>` pathResolutionStrategy

**● pathResolutionStrategy**: *[PathResolutionStrategy](../enums/_misc_constants_.pathresolutionstrategy.md)*

*Defined in [core/compilation/source_builder.ts:30](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/compilation/source_builder.ts#L30)*

___
<a id="product"></a>

### `<Private>` product

**● product**: *[SourceBuilderProduct](../interfaces/_core_compilation_interface_source_builder_product_interface_.sourcebuilderproduct.md)*

*Defined in [core/compilation/source_builder.ts:27](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/compilation/source_builder.ts#L27)*

___
<a id="resolvedpaths"></a>

### `<Private>` resolvedPaths

**● resolvedPaths**: *[ResolvedPathStore](_core_compilation_resolved_path_store_.resolvedpathstore.md)*

*Defined in [core/compilation/source_builder.ts:31](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/compilation/source_builder.ts#L31)*

___

## Methods

<a id="append"></a>

###  append

▸ **append**(this: *[SourceBuilder](_core_compilation_source_builder_.sourcebuilder.md)*, code: *`string`*): `void`

*Defined in [core/compilation/source_builder.ts:238](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/compilation/source_builder.ts#L238)*

Appends a string to the end of the product source code.

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [SourceBuilder](_core_compilation_source_builder_.sourcebuilder.md) |
| code | `string` |

**Returns:** `void`

___
<a id="breakstatement"></a>

###  breakStatement

▸ **breakStatement**(this: *[SourceBuilder](_core_compilation_source_builder_.sourcebuilder.md)*): `string`

*Defined in [core/compilation/source_builder.ts:245](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/compilation/source_builder.ts#L245)*

Returns a break statement chunk for currently processed block.

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [SourceBuilder](_core_compilation_source_builder_.sourcebuilder.md) |

**Returns:** `string`

___
<a id="callclosure"></a>

###  callClosure

▸ **callClosure**(this: *[SourceBuilder](_core_compilation_source_builder_.sourcebuilder.md)*, functionParam: *`string`*, schemaParam: *`string`*): `void`

*Defined in [core/compilation/source_builder.ts:249](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/compilation/source_builder.ts#L249)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [SourceBuilder](_core_compilation_source_builder_.sourcebuilder.md) |
| functionParam | `string` |
| schemaParam | `string` |

**Returns:** `void`

___
<a id="closeblock"></a>

###  closeBlock

▸ **closeBlock**(this: *[SourceBuilder](_core_compilation_source_builder_.sourcebuilder.md)*): `void`

*Defined in [core/compilation/source_builder.ts:132](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/compilation/source_builder.ts#L132)*

Appends `}` to the product source code.

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [SourceBuilder](_core_compilation_source_builder_.sourcebuilder.md) |

**Returns:** `void`

___
<a id="createinitialcontext"></a>

### `<Private>` createInitialContext

▸ **createInitialContext**(this: *[SourceBuilder](_core_compilation_source_builder_.sourcebuilder.md)*, schemaName: *`string`*): [SourceBuilderContext](../interfaces/_core_compilation_interface_source_builder_context_interface_.sourcebuildercontext.md)

*Defined in [core/compilation/source_builder.ts:293](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/compilation/source_builder.ts#L293)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [SourceBuilder](_core_compilation_source_builder_.sourcebuilder.md) |
| schemaName | `string` |

**Returns:** [SourceBuilderContext](../interfaces/_core_compilation_interface_source_builder_context_interface_.sourcebuildercontext.md)

___
<a id="createinitialcounter"></a>

### `<Private>` createInitialCounter

▸ **createInitialCounter**(this: *[SourceBuilder](_core_compilation_source_builder_.sourcebuilder.md)*): [SourceBuilderCounter](../interfaces/_core_compilation_interface_source_builder_counter_interface_.sourcebuildercounter.md)

*Defined in [core/compilation/source_builder.ts:301](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/compilation/source_builder.ts#L301)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [SourceBuilder](_core_compilation_source_builder_.sourcebuilder.md) |

**Returns:** [SourceBuilderCounter](../interfaces/_core_compilation_interface_source_builder_counter_interface_.sourcebuildercounter.md)

___
<a id="createinitialproduct"></a>

### `<Private>` createInitialProduct

▸ **createInitialProduct**(this: *[SourceBuilder](_core_compilation_source_builder_.sourcebuilder.md)*): [SourceBuilderProduct](../interfaces/_core_compilation_interface_source_builder_product_interface_.sourcebuilderproduct.md)

*Defined in [core/compilation/source_builder.ts:284](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/compilation/source_builder.ts#L284)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [SourceBuilder](_core_compilation_source_builder_.sourcebuilder.md) |

**Returns:** [SourceBuilderProduct](../interfaces/_core_compilation_interface_source_builder_product_interface_.sourcebuilderproduct.md)

___
<a id="createparameter"></a>

###  createParameter

▸ **createParameter**(this: *[SourceBuilder](_core_compilation_source_builder_.sourcebuilder.md)*, value: *`unknown`*): `string`

*Defined in [core/compilation/source_builder.ts:116](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/compilation/source_builder.ts#L116)*

Increases the created parameter counter, pushes new argument value to the argument array and returns a string that will resolve to pushed value.

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [SourceBuilder](_core_compilation_source_builder_.sourcebuilder.md) |
| value | `unknown` |

**Returns:** `string`

___
<a id="definevariable"></a>

###  defineVariable

▸ **defineVariable**(this: *[SourceBuilder](_core_compilation_source_builder_.sourcebuilder.md)*, variableName: *`string`*, accessor: *`string`*): `void`

*Defined in [core/compilation/source_builder.ts:258](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/compilation/source_builder.ts#L258)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [SourceBuilder](_core_compilation_source_builder_.sourcebuilder.md) |
| variableName | `string` |
| accessor | `string` |

**Returns:** `void`

___
<a id="forloop"></a>

###  forLoop

▸ **forLoop**(this: *[SourceBuilder](_core_compilation_source_builder_.sourcebuilder.md)*, variableName: *`string`*, useForOfLoop: *`boolean`*): `void`

*Defined in [core/compilation/source_builder.ts:266](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/compilation/source_builder.ts#L266)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [SourceBuilder](_core_compilation_source_builder_.sourcebuilder.md) |
| variableName | `string` |
| useForOfLoop | `boolean` |

**Returns:** `void`

___
<a id="getcontextsnapshot"></a>

###  getContextSnapshot

▸ **getContextSnapshot**(this: *[SourceBuilder](_core_compilation_source_builder_.sourcebuilder.md)*): [SourceBuilderSnapshot](../interfaces/_core_compilation_interface_source_builder_snapshot_interface_.sourcebuildersnapshot.md)

*Defined in [core/compilation/source_builder.ts:70](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/compilation/source_builder.ts#L70)*

Returns a Snapshot of `SourceBuilder` context so it can be restored later as if the compilation wouldn't went deeper into the schema tree.

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [SourceBuilder](_core_compilation_source_builder_.sourcebuilder.md) |

**Returns:** [SourceBuilderSnapshot](../interfaces/_core_compilation_interface_source_builder_snapshot_interface_.sourcebuildersnapshot.md)

___
<a id="getproduct"></a>

###  getProduct

▸ **getProduct**(this: *[SourceBuilder](_core_compilation_source_builder_.sourcebuilder.md)*): [SourceBuilderProduct](../interfaces/_core_compilation_interface_source_builder_product_interface_.sourcebuilderproduct.md)

*Defined in [core/compilation/source_builder.ts:48](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/compilation/source_builder.ts#L48)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [SourceBuilder](_core_compilation_source_builder_.sourcebuilder.md) |

**Returns:** [SourceBuilderProduct](../interfaces/_core_compilation_interface_source_builder_product_interface_.sourcebuilderproduct.md)

___
<a id="getschemapath"></a>

###  getSchemaPath

▸ **getSchemaPath**(this: *[SourceBuilder](_core_compilation_source_builder_.sourcebuilder.md)*): `string`

*Defined in [core/compilation/source_builder.ts:55](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/compilation/source_builder.ts#L55)*

Returns path from root of the `Schema` to currently processed part of it.

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [SourceBuilder](_core_compilation_source_builder_.sourcebuilder.md) |

**Returns:** `string`

___
<a id="getvariablename"></a>

###  getVariableName

▸ **getVariableName**(this: *[SourceBuilder](_core_compilation_source_builder_.sourcebuilder.md)*): `string`

*Defined in [core/compilation/source_builder.ts:62](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/compilation/source_builder.ts#L62)*

Returns name of currently used data variable.

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [SourceBuilder](_core_compilation_source_builder_.sourcebuilder.md) |

**Returns:** `string`

___
<a id="openlabeledblock"></a>

###  openLabeledBlock

▸ **openLabeledBlock**(this: *[SourceBuilder](_core_compilation_source_builder_.sourcebuilder.md)*): `void`

*Defined in [core/compilation/source_builder.ts:125](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/compilation/source_builder.ts#L125)*

Appends labeled block opening to the product source code.

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [SourceBuilder](_core_compilation_source_builder_.sourcebuilder.md) |

**Returns:** `void`

___
<a id="propertyaccessor"></a>

###  propertyAccessor

▸ **propertyAccessor**(this: *[SourceBuilder](_core_compilation_source_builder_.sourcebuilder.md)*, property: *`string`*): `string`

*Defined in [core/compilation/source_builder.ts:280](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/compilation/source_builder.ts#L280)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [SourceBuilder](_core_compilation_source_builder_.sourcebuilder.md) |
| property | `string` |

**Returns:** `string`

___
<a id="resolvedatapath"></a>

###  resolveDataPath

▸ **resolveDataPath**(schemaValue: *[DataPath](../interfaces/_misc_typings_.datapath.md)*): `string`

*Defined in [core/compilation/source_builder.ts:140](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/compilation/source_builder.ts#L140)*

Appends `$dataPath` resolution to the product source code. Then, returns the variable name to which resolved value is assigned to.

**Parameters:**

| Name | Type |
| ------ | ------ |
| schemaValue | [DataPath](../interfaces/_misc_typings_.datapath.md) |

**Returns:** `string`

___
<a id="updatebuildercontext"></a>

###  updateBuilderContext

▸ **updateBuilderContext**(this: *[SourceBuilder](_core_compilation_source_builder_.sourcebuilder.md)*, currentProperty: *`string`*, updateVariableName?: *`boolean`*): `void`

*Defined in [core/compilation/source_builder.ts:89](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/compilation/source_builder.ts#L89)*

Update the context of `SourceBuilder` so it's context is up to date to currently processed property of schema and the path to currently processed part of schema is also up to date.

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| this | [SourceBuilder](_core_compilation_source_builder_.sourcebuilder.md) | - |
| currentProperty | `string` | - |
| `Default value` updateVariableName | `boolean` | false |

**Returns:** `void`

___
<a id="updatevariablename"></a>

###  updateVariableName

▸ **updateVariableName**(this: *[SourceBuilder](_core_compilation_source_builder_.sourcebuilder.md)*): `string`

*Defined in [core/compilation/source_builder.ts:104](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/compilation/source_builder.ts#L104)*

Increases the counter of `$DATA` related variables. Updates the context of `SourceBuilder` and then return newly updated variable name of soon to be currently processed data value.

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [SourceBuilder](_core_compilation_source_builder_.sourcebuilder.md) |

**Returns:** `string`

___
<a id="validateresolvedvariables"></a>

###  validateResolvedVariables

▸ **validateResolvedVariables**(this: *[SourceBuilder](_core_compilation_source_builder_.sourcebuilder.md)*): `string`

*Defined in [core/compilation/source_builder.ts:153](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/compilation/source_builder.ts#L153)*

Perform handling of `$dataPath` resolution results.

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [SourceBuilder](_core_compilation_source_builder_.sourcebuilder.md) |

**Returns:** `string`

___

