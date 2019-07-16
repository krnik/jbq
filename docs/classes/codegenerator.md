[JBQDocs](../README.md) > [CodeGenerator](../classes/codegenerator.md)

# Class: CodeGenerator

Utility class that provides functionality to help building validation function code.

## Hierarchy

**CodeGenerator**

## Index

### Properties

* [Error](codegenerator.md#error)

### Methods

* [asString](codegenerator.md#asstring)
* [renderCloseBlock](codegenerator.md#rendercloseblock)
* [renderDataPath](codegenerator.md#renderdatapath)
* [renderDataPathResolution](codegenerator.md#renderdatapathresolution)
* [renderForLoop](codegenerator.md#renderforloop)
* [renderForOfLoop](codegenerator.md#renderforofloop)
* [renderFunctionCall](codegenerator.md#renderfunctioncall)
* [renderIfStatement](codegenerator.md#renderifstatement)
* [renderLabeledBreakStatement](codegenerator.md#renderlabeledbreakstatement)
* [renderOpenLabeledBlock](codegenerator.md#renderopenlabeledblock)
* [renderPropertyAccessor](codegenerator.md#renderpropertyaccessor)
* [renderReturnObject](codegenerator.md#renderreturnobject)
* [renderVariableInitialization](codegenerator.md#rendervariableinitialization)

---

## Properties

<a id="error"></a>

### `<Static>``<Private>` Error

**● Error**: *[CodeGeneratorError](codegeneratorerror.md)* =  CodeGeneratorError

*Defined in [core/code_gen.ts:239](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/code_gen.ts#L239)*

___

## Methods

<a id="asstring"></a>

### `<Static>` asString

▸ **asString**(str: *`string`*): `string`

*Defined in [core/code_gen.ts:235](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/code_gen.ts#L235)*

Renders `str` as string.

Example
=======

#example:code\_generator\_as\_string

**Parameters:**

| Name | Type |
| ------ | ------ |
| str | `string` |

**Returns:** `string`

___
<a id="rendercloseblock"></a>

### `<Static>` renderCloseBlock

▸ **renderCloseBlock**(): `string`

*Defined in [core/code_gen.ts:49](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/code_gen.ts#L49)*

Returns single `}` character.

**Returns:** `string`

___
<a id="renderdatapath"></a>

### `<Static>` renderDataPath

▸ **renderDataPath**(dataPath: *`string` \| `string`[]*): `string`

*Defined in [core/code_gen.ts:225](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/code_gen.ts#L225)*

Renders `$dataPath` as string.

Example
=======

#example:code\_generator\_render\_data\_path

**Parameters:**

| Name | Type |
| ------ | ------ |
| dataPath | `string` \| `string`[] |

**Returns:** `string`

___
<a id="renderdatapathresolution"></a>

### `<Static>` renderDataPathResolution

▸ **renderDataPathResolution**(dataPath: *`string` \| `string`[]*, variableName: *`string`*, baseVariable?: *`string`*): `string`

*Defined in [core/code_gen.ts:190](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/code_gen.ts#L190)*

Renders $dataPath resolution.

Example
=======

#example:code\_generator\_render\_data\_path\_resolution

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| dataPath | `string` \| `string`[] | - |
| variableName | `string` | - |
| `Default value` baseVariable | `string` |  ParameterName.Data |

**Returns:** `string`

___
<a id="renderforloop"></a>

### `<Static>` renderForLoop

▸ **renderForLoop**(variableName: *`string`*, collection: *`string`*, accessor: *`string`*, schemaPath: *`string`*): `string`

*Defined in [core/code_gen.ts:132](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/code_gen.ts#L132)*

Renders for loop.

Example
=======

#example:code\_generator\_render\_for\_loop

**Parameters:**

| Name | Type |
| ------ | ------ |
| variableName | `string` |
| collection | `string` |
| accessor | `string` |
| schemaPath | `string` |

**Returns:** `string`

___
<a id="renderforofloop"></a>

### `<Static>` renderForOfLoop

▸ **renderForOfLoop**(variableName: *`string`*, iterable: *`string`*, schemaPath: *`string`*): `string`

*Defined in [core/code_gen.ts:107](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/code_gen.ts#L107)*

Renders for..of loop.

Example
=======

#example:code\_generator\_render\_for\_of\_loop

**Parameters:**

| Name | Type |
| ------ | ------ |
| variableName | `string` |
| iterable | `string` |
| schemaPath | `string` |

**Returns:** `string`

___
<a id="renderfunctioncall"></a>

### `<Static>` renderFunctionCall

▸ **renderFunctionCall**(fnParam: *`string`*, schemaValue: *`string`*, schemaPath: *`string`*, variableName: *`string`*): `string`

*Defined in [core/code_gen.ts:169](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/code_gen.ts#L169)*

Renders function call, checks if it returned truthy value, if so then return from validation function.

Example
=======

#example:code\_generator\_render\_function\_call

**Parameters:**

| Name | Type |
| ------ | ------ |
| fnParam | `string` |
| schemaValue | `string` |
| schemaPath | `string` |
| variableName | `string` |

**Returns:** `string`

___
<a id="renderifstatement"></a>

### `<Static>` renderIfStatement

▸ **renderIfStatement**(conditions: *[IfCondition](../interfaces/ifcondition.md)[]*, condLogicOperator?: *[LogicalOperator](../enums/logicaloperator.md)*): `string`

*Defined in [core/code_gen.ts:59](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/code_gen.ts#L59)*

Renders "if statement".

Example
=======

#example:code\_generator\_render\_if\_statement

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| conditions | [IfCondition](../interfaces/ifcondition.md)[] | - |
| `Default value` condLogicOperator | [LogicalOperator](../enums/logicaloperator.md) |  LogicalOperator.Or |

**Returns:** `string`

___
<a id="renderlabeledbreakstatement"></a>

### `<Static>` renderLabeledBreakStatement

▸ **renderLabeledBreakStatement**(blockLabel: *`string`*): `string`

*Defined in [core/code_gen.ts:32](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/code_gen.ts#L32)*

Renders labeled break statement, expects current block label name as an argument.

Example
=======

#example:code\_generator\_render\_labeled\_break\_statement

**Parameters:**

| Name | Type |
| ------ | ------ |
| blockLabel | `string` |

**Returns:** `string`

___
<a id="renderopenlabeledblock"></a>

### `<Static>` renderOpenLabeledBlock

▸ **renderOpenLabeledBlock**(blockLabel: *`string`*): `string`

*Defined in [core/code_gen.ts:42](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/code_gen.ts#L42)*

Renders labeled block opening.

Example
=======

#example:code\_generator\_render\_open\_labeled\_block

**Parameters:**

| Name | Type |
| ------ | ------ |
| blockLabel | `string` |

**Returns:** `string`

___
<a id="renderpropertyaccessor"></a>

### `<Static>` renderPropertyAccessor

▸ **renderPropertyAccessor**(accessor: *`string`*): `string`

*Defined in [core/code_gen.ts:19](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/code_gen.ts#L19)*

Renders provided `accessor` string as a object property accessor.

Example
=======

#example:code\_generator\_render\_property\_accessor

**Parameters:**

| Name | Type |
| ------ | ------ |
| accessor | `string` |

**Returns:** `string`

___
<a id="renderreturnobject"></a>

### `<Static>` renderReturnObject

▸ **renderReturnObject**(message: *`string`*, path: *`string`*): `string`

*Defined in [core/code_gen.ts:80](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/code_gen.ts#L80)*

Renders return statement that returns basic `ValidationError` object.

Example
=======

#example:code\_generator\_render\_return\_object

**Parameters:**

| Name | Type |
| ------ | ------ |
| message | `string` |
| path | `string` |

**Returns:** `string`

___
<a id="rendervariableinitialization"></a>

### `<Static>` renderVariableInitialization

▸ **renderVariableInitialization**(variableName: *`string`*, value: *`string`*, accessor?: *`string`*, keyword?: *[Const](../enums/keyword.md#const) \| [Let](../enums/keyword.md#let) \| [Var](../enums/keyword.md#var)*): `string`

*Defined in [core/code_gen.ts:92](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/code_gen.ts#L92)*

Renders variable initialization.

Example
=======

#example:code\_generator\_render\_variable\_initialization

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| variableName | `string` | - |
| value | `string` | - |
| `Default value` accessor | `string` | &quot;&quot; |
| `Default value` keyword | [Const](../enums/keyword.md#const) \| [Let](../enums/keyword.md#let) \| [Var](../enums/keyword.md#var) |  Keyword.Const |

**Returns:** `string`

___

