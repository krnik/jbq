[jbq](../README.md) > [SourceBuilder](../classes/sourcebuilder.md)

# Class: SourceBuilder

Class responsible for main validation function composition logic. It keeps track of currently used variables, arguments and schemaPath. It is also responsible for creating and updating its context and product.

## Hierarchy

**SourceBuilder**

## Index

### Constructors

* [constructor](sourcebuilder.md#constructor)

### Properties

* [Compilation](sourcebuilder.md#compilation)
* [context](sourcebuilder.md#context)
* [counter](sourcebuilder.md#counter)
* [pathResolutionStrategy](sourcebuilder.md#pathresolutionstrategy)
* [product](sourcebuilder.md#product)
* [resolvedPaths](sourcebuilder.md#resolvedpaths)

### Methods

* [append](sourcebuilder.md#append)
* [breakStatement](sourcebuilder.md#breakstatement)
* [callClosure](sourcebuilder.md#callclosure)
* [closeBlock](sourcebuilder.md#closeblock)
* [createInitialContext](sourcebuilder.md#createinitialcontext)
* [createInitialCounter](sourcebuilder.md#createinitialcounter)
* [createInitialProduct](sourcebuilder.md#createinitialproduct)
* [createParameter](sourcebuilder.md#createparameter)
* [defineVariable](sourcebuilder.md#definevariable)
* [forLoop](sourcebuilder.md#forloop)
* [getContextSnapshot](sourcebuilder.md#getcontextsnapshot)
* [getProduct](sourcebuilder.md#getproduct)
* [getSchemaPath](sourcebuilder.md#getschemapath)
* [getVariableName](sourcebuilder.md#getvariablename)
* [openLabeledBlock](sourcebuilder.md#openlabeledblock)
* [propertyAccessor](sourcebuilder.md#propertyaccessor)
* [resolveDataPath](sourcebuilder.md#resolvedatapath)
* [updateBuilderContext](sourcebuilder.md#updatebuildercontext)
* [updateVariableName](sourcebuilder.md#updatevariablename)
* [validateResolvedVariables](sourcebuilder.md#validateresolvedvariables)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new SourceBuilder**(compilation: *[Compilation](compilation.md)*, schemaName: *`string`*, resolvedPaths: *[ResolvedPathStore](resolvedpathstore.md)*, pathResolutionStrategy?: *[PathResolutionStrategy](../enums/pathresolutionstrategy.md)*): [SourceBuilder](sourcebuilder.md)

*Defined in [core/compilation/source_builder.ts:32](https://github.com/krnik/vjs-validator/blob/15e769b/src/core/compilation/source_builder.ts#L32)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| compilation | [Compilation](compilation.md) | - |
| schemaName | `string` | - |
| resolvedPaths | [ResolvedPathStore](resolvedpathstore.md) | - |
| `Default value` pathResolutionStrategy | [PathResolutionStrategy](../enums/pathresolutionstrategy.md) |  PathResolutionStrategy.Ignore |

**Returns:** [SourceBuilder](sourcebuilder.md)

___

## Properties

<a id="compilation"></a>

### `<Private>` Compilation

**● Compilation**: *[Compilation](compilation.md)*

*Defined in [core/compilation/source_builder.ts:32](https://github.com/krnik/vjs-validator/blob/15e769b/src/core/compilation/source_builder.ts#L32)*

___
<a id="context"></a>

### `<Private>` context

**● context**: *[SourceBuilderContext](../interfaces/sourcebuildercontext.md)*

*Defined in [core/compilation/source_builder.ts:29](https://github.com/krnik/vjs-validator/blob/15e769b/src/core/compilation/source_builder.ts#L29)*

___
<a id="counter"></a>

### `<Private>` counter

**● counter**: *[SourceBuilderCounter](../interfaces/sourcebuildercounter.md)*

*Defined in [core/compilation/source_builder.ts:28](https://github.com/krnik/vjs-validator/blob/15e769b/src/core/compilation/source_builder.ts#L28)*

___
<a id="pathresolutionstrategy"></a>

### `<Private>` pathResolutionStrategy

**● pathResolutionStrategy**: *[PathResolutionStrategy](../enums/pathresolutionstrategy.md)*

*Defined in [core/compilation/source_builder.ts:30](https://github.com/krnik/vjs-validator/blob/15e769b/src/core/compilation/source_builder.ts#L30)*

___
<a id="product"></a>

### `<Private>` product

**● product**: *[SourceBuilderProduct](../interfaces/sourcebuilderproduct.md)*

*Defined in [core/compilation/source_builder.ts:27](https://github.com/krnik/vjs-validator/blob/15e769b/src/core/compilation/source_builder.ts#L27)*

___
<a id="resolvedpaths"></a>

### `<Private>` resolvedPaths

**● resolvedPaths**: *[ResolvedPathStore](resolvedpathstore.md)*

*Defined in [core/compilation/source_builder.ts:31](https://github.com/krnik/vjs-validator/blob/15e769b/src/core/compilation/source_builder.ts#L31)*

___

## Methods

<a id="append"></a>

###  append

▸ **append**(this: *[SourceBuilder](sourcebuilder.md)*, code: *`string`*): `void`

*Defined in [core/compilation/source_builder.ts:238](https://github.com/krnik/vjs-validator/blob/15e769b/src/core/compilation/source_builder.ts#L238)*

Appends a string to the end of the product source code.

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [SourceBuilder](sourcebuilder.md) |
| code | `string` |

**Returns:** `void`

___
<a id="breakstatement"></a>

###  breakStatement

▸ **breakStatement**(this: *[SourceBuilder](sourcebuilder.md)*): `string`

*Defined in [core/compilation/source_builder.ts:245](https://github.com/krnik/vjs-validator/blob/15e769b/src/core/compilation/source_builder.ts#L245)*

Returns a break statement chunk for currently processed block.

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [SourceBuilder](sourcebuilder.md) |

**Returns:** `string`

___
<a id="callclosure"></a>

###  callClosure

▸ **callClosure**(this: *[SourceBuilder](sourcebuilder.md)*, functionParam: *`string`*, schemaParam: *`string`*): `void`

*Defined in [core/compilation/source_builder.ts:249](https://github.com/krnik/vjs-validator/blob/15e769b/src/core/compilation/source_builder.ts#L249)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [SourceBuilder](sourcebuilder.md) |
| functionParam | `string` |
| schemaParam | `string` |

**Returns:** `void`

___
<a id="closeblock"></a>

###  closeBlock

▸ **closeBlock**(this: *[SourceBuilder](sourcebuilder.md)*): `void`

*Defined in [core/compilation/source_builder.ts:132](https://github.com/krnik/vjs-validator/blob/15e769b/src/core/compilation/source_builder.ts#L132)*

Appends `}` to the product source code.

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [SourceBuilder](sourcebuilder.md) |

**Returns:** `void`

___
<a id="createinitialcontext"></a>

### `<Private>` createInitialContext

▸ **createInitialContext**(this: *[SourceBuilder](sourcebuilder.md)*, schemaName: *`string`*): [SourceBuilderContext](../interfaces/sourcebuildercontext.md)

*Defined in [core/compilation/source_builder.ts:293](https://github.com/krnik/vjs-validator/blob/15e769b/src/core/compilation/source_builder.ts#L293)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [SourceBuilder](sourcebuilder.md) |
| schemaName | `string` |

**Returns:** [SourceBuilderContext](../interfaces/sourcebuildercontext.md)

___
<a id="createinitialcounter"></a>

### `<Private>` createInitialCounter

▸ **createInitialCounter**(this: *[SourceBuilder](sourcebuilder.md)*): [SourceBuilderCounter](../interfaces/sourcebuildercounter.md)

*Defined in [core/compilation/source_builder.ts:301](https://github.com/krnik/vjs-validator/blob/15e769b/src/core/compilation/source_builder.ts#L301)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [SourceBuilder](sourcebuilder.md) |

**Returns:** [SourceBuilderCounter](../interfaces/sourcebuildercounter.md)

___
<a id="createinitialproduct"></a>

### `<Private>` createInitialProduct

▸ **createInitialProduct**(this: *[SourceBuilder](sourcebuilder.md)*): [SourceBuilderProduct](../interfaces/sourcebuilderproduct.md)

*Defined in [core/compilation/source_builder.ts:284](https://github.com/krnik/vjs-validator/blob/15e769b/src/core/compilation/source_builder.ts#L284)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [SourceBuilder](sourcebuilder.md) |

**Returns:** [SourceBuilderProduct](../interfaces/sourcebuilderproduct.md)

___
<a id="createparameter"></a>

###  createParameter

▸ **createParameter**(this: *[SourceBuilder](sourcebuilder.md)*, value: *`unknown`*): `string`

*Defined in [core/compilation/source_builder.ts:116](https://github.com/krnik/vjs-validator/blob/15e769b/src/core/compilation/source_builder.ts#L116)*

Increases the created parameter counter, pushes new argument value to the argument array and returns a string that will resolve to pushed value.

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [SourceBuilder](sourcebuilder.md) |
| value | `unknown` |

**Returns:** `string`

___
<a id="definevariable"></a>

###  defineVariable

▸ **defineVariable**(this: *[SourceBuilder](sourcebuilder.md)*, variableName: *`string`*, accessor: *`string`*): `void`

*Defined in [core/compilation/source_builder.ts:258](https://github.com/krnik/vjs-validator/blob/15e769b/src/core/compilation/source_builder.ts#L258)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [SourceBuilder](sourcebuilder.md) |
| variableName | `string` |
| accessor | `string` |

**Returns:** `void`

___
<a id="forloop"></a>

###  forLoop

▸ **forLoop**(this: *[SourceBuilder](sourcebuilder.md)*, variableName: *`string`*, useForOfLoop: *`boolean`*): `void`

*Defined in [core/compilation/source_builder.ts:266](https://github.com/krnik/vjs-validator/blob/15e769b/src/core/compilation/source_builder.ts#L266)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [SourceBuilder](sourcebuilder.md) |
| variableName | `string` |
| useForOfLoop | `boolean` |

**Returns:** `void`

___
<a id="getcontextsnapshot"></a>

###  getContextSnapshot

▸ **getContextSnapshot**(this: *[SourceBuilder](sourcebuilder.md)*): [SourceBuilderSnapshot](../interfaces/sourcebuildersnapshot.md)

*Defined in [core/compilation/source_builder.ts:70](https://github.com/krnik/vjs-validator/blob/15e769b/src/core/compilation/source_builder.ts#L70)*

Returns a Snapshot of `SourceBuilder` context so it can be restored later as if the compilation wouldn't went deeper into the schema tree.

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [SourceBuilder](sourcebuilder.md) |

**Returns:** [SourceBuilderSnapshot](../interfaces/sourcebuildersnapshot.md)

___
<a id="getproduct"></a>

###  getProduct

▸ **getProduct**(this: *[SourceBuilder](sourcebuilder.md)*): [SourceBuilderProduct](../interfaces/sourcebuilderproduct.md)

*Defined in [core/compilation/source_builder.ts:48](https://github.com/krnik/vjs-validator/blob/15e769b/src/core/compilation/source_builder.ts#L48)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [SourceBuilder](sourcebuilder.md) |

**Returns:** [SourceBuilderProduct](../interfaces/sourcebuilderproduct.md)

___
<a id="getschemapath"></a>

###  getSchemaPath

▸ **getSchemaPath**(this: *[SourceBuilder](sourcebuilder.md)*): `string`

*Defined in [core/compilation/source_builder.ts:55](https://github.com/krnik/vjs-validator/blob/15e769b/src/core/compilation/source_builder.ts#L55)*

Returns path from root of the `Schema` to currently processed part of it.

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [SourceBuilder](sourcebuilder.md) |

**Returns:** `string`

___
<a id="getvariablename"></a>

###  getVariableName

▸ **getVariableName**(this: *[SourceBuilder](sourcebuilder.md)*): `string`

*Defined in [core/compilation/source_builder.ts:62](https://github.com/krnik/vjs-validator/blob/15e769b/src/core/compilation/source_builder.ts#L62)*

Returns name of currently used data variable.

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [SourceBuilder](sourcebuilder.md) |

**Returns:** `string`

___
<a id="openlabeledblock"></a>

###  openLabeledBlock

▸ **openLabeledBlock**(this: *[SourceBuilder](sourcebuilder.md)*): `void`

*Defined in [core/compilation/source_builder.ts:125](https://github.com/krnik/vjs-validator/blob/15e769b/src/core/compilation/source_builder.ts#L125)*

Appends labeled block opening to the product source code.

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [SourceBuilder](sourcebuilder.md) |

**Returns:** `void`

___
<a id="propertyaccessor"></a>

###  propertyAccessor

▸ **propertyAccessor**(this: *[SourceBuilder](sourcebuilder.md)*, property: *`string`*): `string`

*Defined in [core/compilation/source_builder.ts:280](https://github.com/krnik/vjs-validator/blob/15e769b/src/core/compilation/source_builder.ts#L280)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [SourceBuilder](sourcebuilder.md) |
| property | `string` |

**Returns:** `string`

___
<a id="resolvedatapath"></a>

###  resolveDataPath

▸ **resolveDataPath**(schemaValue: *[DataPath](../interfaces/datapath.md)*): `string`

*Defined in [core/compilation/source_builder.ts:140](https://github.com/krnik/vjs-validator/blob/15e769b/src/core/compilation/source_builder.ts#L140)*

Appends `$dataPath` resolution to the product source code. Then, returns the variable name to which resolved value is assigned to.

**Parameters:**

| Name | Type |
| ------ | ------ |
| schemaValue | [DataPath](../interfaces/datapath.md) |

**Returns:** `string`

___
<a id="updatebuildercontext"></a>

###  updateBuilderContext

▸ **updateBuilderContext**(this: *[SourceBuilder](sourcebuilder.md)*, currentProperty: *`string`*, updateVariableName?: *`boolean`*): `void`

*Defined in [core/compilation/source_builder.ts:89](https://github.com/krnik/vjs-validator/blob/15e769b/src/core/compilation/source_builder.ts#L89)*

Update the context of `SourceBuilder` so it's context is up to date to currently processed property of schema and the path to currently processed part of schema is also up to date.

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| this | [SourceBuilder](sourcebuilder.md) | - |
| currentProperty | `string` | - |
| `Default value` updateVariableName | `boolean` | false |

**Returns:** `void`

___
<a id="updatevariablename"></a>

###  updateVariableName

▸ **updateVariableName**(this: *[SourceBuilder](sourcebuilder.md)*): `string`

*Defined in [core/compilation/source_builder.ts:104](https://github.com/krnik/vjs-validator/blob/15e769b/src/core/compilation/source_builder.ts#L104)*

Increases the counter of `$DATA` related variables. Updates the context of `SourceBuilder` and then return newly updated variable name of soon to be currently processed data value.

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [SourceBuilder](sourcebuilder.md) |

**Returns:** `string`

___
<a id="validateresolvedvariables"></a>

###  validateResolvedVariables

▸ **validateResolvedVariables**(this: *[SourceBuilder](sourcebuilder.md)*): `string`

*Defined in [core/compilation/source_builder.ts:153](https://github.com/krnik/vjs-validator/blob/15e769b/src/core/compilation/source_builder.ts#L153)*

Perform handling of `$dataPath` resolution results.

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [SourceBuilder](sourcebuilder.md) |

**Returns:** `string`

___

