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

*Defined in [core/code_gen.ts:190](https://github.com/krnik/vjs-validator/blob/4b489fe/src/core/code_gen.ts#L190)*

___

## Methods

<a id="asstring"></a>

### `<Static>` asString

▸ **asString**(str: *`string`*): `string`

*Defined in [core/code_gen.ts:186](https://github.com/krnik/vjs-validator/blob/4b489fe/src/core/code_gen.ts#L186)*

Renders `str` as string.

**Parameters:**

| Name | Type |
| ------ | ------ |
| str | `string` |

**Returns:** `string`

___
<a id="rendercloseblock"></a>

### `<Static>` renderCloseBlock

▸ **renderCloseBlock**(): `string`

*Defined in [core/code_gen.ts:40](https://github.com/krnik/vjs-validator/blob/4b489fe/src/core/code_gen.ts#L40)*

Returns single `}` character.

**Returns:** `string`

___
<a id="renderdatapath"></a>

### `<Static>` renderDataPath

▸ **renderDataPath**(dataPath: *`string` \| `string`[]*): `string`

*Defined in [core/code_gen.ts:179](https://github.com/krnik/vjs-validator/blob/4b489fe/src/core/code_gen.ts#L179)*

Renders `$dataPath` as string.

**Parameters:**

| Name | Type |
| ------ | ------ |
| dataPath | `string` \| `string`[] |

**Returns:** `string`

___
<a id="renderdatapathresolution"></a>

### `<Static>` renderDataPathResolution

▸ **renderDataPathResolution**(dataPath: *`string` \| `string`[]*, variableName: *`string`*, baseVariable?: *`string`*): `string`

*Defined in [core/code_gen.ts:147](https://github.com/krnik/vjs-validator/blob/4b489fe/src/core/code_gen.ts#L147)*

Renders $dataPath resolution.

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

▸ **renderForLoop**(variableName: *`string`*, collection: *`string`*, accessor: *`string`*): `string`

*Defined in [core/code_gen.ts:102](https://github.com/krnik/vjs-validator/blob/4b489fe/src/core/code_gen.ts#L102)*

Renders for loop.

**Parameters:**

| Name | Type |
| ------ | ------ |
| variableName | `string` |
| collection | `string` |
| accessor | `string` |

**Returns:** `string`

___
<a id="renderforofloop"></a>

### `<Static>` renderForOfLoop

▸ **renderForOfLoop**(variableName: *`string`*, iterable: *`string`*, path: *`string`*): `string`

*Defined in [core/code_gen.ts:84](https://github.com/krnik/vjs-validator/blob/4b489fe/src/core/code_gen.ts#L84)*

Renders for..of loop.

**Parameters:**

| Name | Type |
| ------ | ------ |
| variableName | `string` |
| iterable | `string` |
| path | `string` |

**Returns:** `string`

___
<a id="renderfunctioncall"></a>

### `<Static>` renderFunctionCall

▸ **renderFunctionCall**(fnParam: *`string`*, schemaValue: *`string`*, schemaPath: *`string`*, variableName: *`string`*): `string`

*Defined in [core/code_gen.ts:129](https://github.com/krnik/vjs-validator/blob/4b489fe/src/core/code_gen.ts#L129)*

Renders function call, checks if it returned truthy value, if so then return from validation function.

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

*Defined in [core/code_gen.ts:47](https://github.com/krnik/vjs-validator/blob/4b489fe/src/core/code_gen.ts#L47)*

Renders "if statement".

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

*Defined in [core/code_gen.ts:26](https://github.com/krnik/vjs-validator/blob/4b489fe/src/core/code_gen.ts#L26)*

Renders labeled break statement, expects current block label name as an argument.

**Parameters:**

| Name | Type |
| ------ | ------ |
| blockLabel | `string` |

**Returns:** `string`

___
<a id="renderopenlabeledblock"></a>

### `<Static>` renderOpenLabeledBlock

▸ **renderOpenLabeledBlock**(blockLabel: *`string`*): `string`

*Defined in [core/code_gen.ts:33](https://github.com/krnik/vjs-validator/blob/4b489fe/src/core/code_gen.ts#L33)*

Renders labeled block opening.

**Parameters:**

| Name | Type |
| ------ | ------ |
| blockLabel | `string` |

**Returns:** `string`

___
<a id="renderpropertyaccessor"></a>

### `<Static>` renderPropertyAccessor

▸ **renderPropertyAccessor**(accessor: *`string`*): `string`

*Defined in [core/code_gen.ts:16](https://github.com/krnik/vjs-validator/blob/4b489fe/src/core/code_gen.ts#L16)*

Renders provided `accessor` string as a object property accessor.

**Parameters:**

| Name | Type |
| ------ | ------ |
| accessor | `string` |

**Returns:** `string`

___
<a id="renderreturnobject"></a>

### `<Static>` renderReturnObject

▸ **renderReturnObject**(message: *`string`*, path: *`string`*): `string`

*Defined in [core/code_gen.ts:65](https://github.com/krnik/vjs-validator/blob/4b489fe/src/core/code_gen.ts#L65)*

Renders return statement that returns object value.

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

*Defined in [core/code_gen.ts:72](https://github.com/krnik/vjs-validator/blob/4b489fe/src/core/code_gen.ts#L72)*

Renders `const` variable initialization.

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| variableName | `string` | - |
| value | `string` | - |
| `Default value` accessor | `string` | &quot;&quot; |
| `Default value` keyword | [Const](../enums/keyword.md#const) \| [Let](../enums/keyword.md#let) \| [Var](../enums/keyword.md#var) |  Keyword.Const |

**Returns:** `string`

___

