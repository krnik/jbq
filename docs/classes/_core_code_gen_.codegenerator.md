[jbq](../README.md) > ["core/code_gen"](../modules/_core_code_gen_.md) > [CodeGenerator](../classes/_core_code_gen_.codegenerator.md)

# Class: CodeGenerator

Utility class that provides functionality to help building validation function code.

## Hierarchy

**CodeGenerator**

## Index

### Properties

* [Error](_core_code_gen_.codegenerator.md#error)

### Methods

* [renderCloseBlock](_core_code_gen_.codegenerator.md#rendercloseblock)
* [renderDataPath](_core_code_gen_.codegenerator.md#renderdatapath)
* [renderDataPathResolution](_core_code_gen_.codegenerator.md#renderdatapathresolution)
* [renderForLoop](_core_code_gen_.codegenerator.md#renderforloop)
* [renderForOfLoop](_core_code_gen_.codegenerator.md#renderforofloop)
* [renderFunctionCall](_core_code_gen_.codegenerator.md#renderfunctioncall)
* [renderIfStatement](_core_code_gen_.codegenerator.md#renderifstatement)
* [renderLabeledBreakStatement](_core_code_gen_.codegenerator.md#renderlabeledbreakstatement)
* [renderOpenLabeledBlock](_core_code_gen_.codegenerator.md#renderopenlabeledblock)
* [renderPropertyAccessor](_core_code_gen_.codegenerator.md#renderpropertyaccessor)
* [renderReturnJSONMessage](_core_code_gen_.codegenerator.md#renderreturnjsonmessage)
* [renderVariableInitialization](_core_code_gen_.codegenerator.md#rendervariableinitialization)

---

## Properties

<a id="error"></a>

### `<Static>``<Private>` Error

**● Error**: *[CodeGeneratorError](_core_code_gen_code_gen_error_.codegeneratorerror.md)* =  CodeGeneratorError

*Defined in [core/code_gen.ts:278](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/code_gen.ts#L278)*

___

## Methods

<a id="rendercloseblock"></a>

### `<Static>` renderCloseBlock

▸ **renderCloseBlock**(): `string`

*Defined in [core/code_gen.ts:61](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/code_gen.ts#L61)*

Returns single `}` character.

**Returns:** `string`

___
<a id="renderdatapath"></a>

### `<Static>` renderDataPath

▸ **renderDataPath**(dataPath: *`string` \| `string`[]*): `string`

*Defined in [core/code_gen.ts:275](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/code_gen.ts#L275)*

Renders `$dataPath` as string for debugging purposes.

**Parameters:**

| Name | Type |
| ------ | ------ |
| dataPath | `string` \| `string`[] |

**Returns:** `string`

___
<a id="renderdatapathresolution"></a>

### `<Static>` renderDataPathResolution

▸ **renderDataPathResolution**(dataPath: *`string` \| `string`[]*, variableName: *`string`*, baseVariable?: *`string`*): `string`

*Defined in [core/code_gen.ts:243](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/code_gen.ts#L243)*

Renders $dataPath resolution.

Example
=======

.renderDataPathResolution('/user/name', 'userName'); // renders stringified version of const userName = $DATA && $DATA.user && $DATA.user.name;

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

*Defined in [core/code_gen.ts:185](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/code_gen.ts#L185)*

Renders for loop.

Examples
========

.renderForLoop('myVar', 'arrayOfNumbers', 'a\_index'); // renders stringified version of const myVar\_len = arrayOfNumbers.length; for ( let a\_index = 0; a\_index < myVar\_len; a\_inex++ ) { const myVar = arrayOfNumbers\[a\_index\];

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

*Defined in [core/code_gen.ts:155](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/code_gen.ts#L155)*

Renders for..of loop.

Examples
========

.renderForOfLoop('item', 'arrayOfNumbers', 'Numbers'); // renders stringified version of if (!(Symbol.iterator in arrayOfNumbers)) return `{"message": "Data requires...", "path": "Numbers"}`; for (const item of arrayOfNumbers)

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

*Defined in [core/code_gen.ts:219](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/code_gen.ts#L219)*

Renders function call, checks if it returned truthy value, if so then return from validation function.

Example
=======

.renderFunctionCall('isValidUser', '{}', 'User', '$data'); // returns stringified version of const isValidUser\_res = isValidUser({}, 'User', $data); if (isValidUser\_res) return isValidUser\_res;

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

▸ **renderIfStatement**(conditions: *[IfCondition](../interfaces/_core_code_gen_interface_if_condition_interface_.ifcondition.md)[]*, condLogicOperator?: *[LogicalOperator](../enums/_core_code_gen_token_operator_.logicaloperator.md)*): `string`

*Defined in [core/code_gen.ts:97](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/code_gen.ts#L97)*

Renders "if statement".

Examples
========

const conditions = \[ { operator: ComparisonOperator.EqualStrict, value: '100', variableName: 'resolved\_0', // some variable from the scope }, \];

.renderIfStatement(conditions); 'if (resolved\_0 === 100)';

const conds = \[ { operator: ComparisonOperator.GreaterThan, value: 0, variableName: 'a' }, { operator: ComparisonOperator.GreaterThan, value: 0, variableName: 'b' }, \];

.renderIfStatement(conditions, LogicalOperator.Or); 'if (a > 0 \|\| b > 0)';

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| conditions | [IfCondition](../interfaces/_core_code_gen_interface_if_condition_interface_.ifcondition.md)[] | - |
| `Default value` condLogicOperator | [LogicalOperator](../enums/_core_code_gen_token_operator_.logicaloperator.md) |  LogicalOperator.Or |

**Returns:** `string`

___
<a id="renderlabeledbreakstatement"></a>

### `<Static>` renderLabeledBreakStatement

▸ **renderLabeledBreakStatement**(blockLabel: *`string`*): `string`

*Defined in [core/code_gen.ts:42](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/code_gen.ts#L42)*

Renders labeled break statement, expects current block label name as an argument.

Examples
========

.renderLabeledBreakStatement('data\_0'); 'break label\_data\_0;'

**Parameters:**

| Name | Type |
| ------ | ------ |
| blockLabel | `string` |

**Returns:** `string`

___
<a id="renderopenlabeledblock"></a>

### `<Static>` renderOpenLabeledBlock

▸ **renderOpenLabeledBlock**(blockLabel: *`string`*): `string`

*Defined in [core/code_gen.ts:54](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/code_gen.ts#L54)*

Renders labeled block opening.

Examples
========

.renderOpenLabeledBlock('myBlock'); 'label\_myBlock: {';

**Parameters:**

| Name | Type |
| ------ | ------ |
| blockLabel | `string` |

**Returns:** `string`

___
<a id="renderpropertyaccessor"></a>

### `<Static>` renderPropertyAccessor

▸ **renderPropertyAccessor**(accessor: *`string`*): `string`

*Defined in [core/code_gen.ts:27](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/code_gen.ts#L27)*

Renders provided `accessor` string as a object property accessor.

Examples
========

.renderPropertyAccessor('0'); '\[0\]'

.renderPropertyAccessor('_prop_name'); '._prop_name'

.renderPropertyAccessor('??_not_so\_valid\_variable\_name'); '\["??_not_so\_valid\_variable\_name"\]'

**Parameters:**

| Name | Type |
| ------ | ------ |
| accessor | `string` |

**Returns:** `string`

___
<a id="renderreturnjsonmessage"></a>

### `<Static>` renderReturnJSONMessage

▸ **renderReturnJSONMessage**(message: *`string`*, path: *`string`*): `string`

*Defined in [core/code_gen.ts:120](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/code_gen.ts#L120)*

Renders return statement that returns with JSON value.

Examples
========

.renderReturnJSONMessage('Oopsie', 'User#type'); 'return `{ "message": "Oopsie", "path": "User#type" }`;';

**Parameters:**

| Name | Type |
| ------ | ------ |
| message | `string` |
| path | `string` |

**Returns:** `string`

___
<a id="rendervariableinitialization"></a>

### `<Static>` renderVariableInitialization

▸ **renderVariableInitialization**(variableName: *`string`*, value: *`string`*, accessor?: *`string`*, keyword?: *[Const](../enums/_core_code_gen_token_keyword_.keyword.md#const) \| [Let](../enums/_core_code_gen_token_keyword_.keyword.md#let) \| [Var](../enums/_core_code_gen_token_keyword_.keyword.md#var)*): `string`

*Defined in [core/code_gen.ts:135](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/code_gen.ts#L135)*

Renders `const` variable initialization.

Examples
========

.renderVariableInitialization('myVar', 'window', '.fetch'); 'const myVar = window.fetch;';

.renderVariableInitialization('myVar', '100'); 'const myVar = 100;';

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| variableName | `string` | - |
| value | `string` | - |
| `Default value` accessor | `string` | &quot;&quot; |
| `Default value` keyword | [Const](../enums/_core_code_gen_token_keyword_.keyword.md#const) \| [Let](../enums/_core_code_gen_token_keyword_.keyword.md#let) \| [Var](../enums/_core_code_gen_token_keyword_.keyword.md#var) |  Keyword.Const |

**Returns:** `string`

___

