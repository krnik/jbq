[JBQDocs](../README.md) > [CodeGenerator](../classes/codegenerator.md)

# Class: CodeGenerator

Utility class that provides functionality to help building validation function code.

## Hierarchy

**CodeGenerator**

## Index

### Properties

* [Error](codegenerator.md#error)

### Methods

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
* [renderReturnJSONMessage](codegenerator.md#renderreturnjsonmessage)
* [renderVariableInitialization](codegenerator.md#rendervariableinitialization)

---

## Properties

<a id="error"></a>

### `<Static>``<Private>` Error

**● Error**: *[CodeGeneratorError](codegeneratorerror.md)* =  CodeGeneratorError

*Defined in [core/code_gen.ts:279](https://github.com/krnik/vjs-validator/blob/08b1300/src/core/code_gen.ts#L279)*

___

## Methods

<a id="rendercloseblock"></a>

### `<Static>` renderCloseBlock

▸ **renderCloseBlock**(): `string`

*Defined in [core/code_gen.ts:61](https://github.com/krnik/vjs-validator/blob/08b1300/src/core/code_gen.ts#L61)*

Returns single `}` character.

**Returns:** `string`

___
<a id="renderdatapath"></a>

### `<Static>` renderDataPath

▸ **renderDataPath**(dataPath: *`string` \| `string`[]*): `string`

*Defined in [core/code_gen.ts:275](https://github.com/krnik/vjs-validator/blob/08b1300/src/core/code_gen.ts#L275)*

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

*Defined in [core/code_gen.ts:243](https://github.com/krnik/vjs-validator/blob/08b1300/src/core/code_gen.ts#L243)*

Renders $dataPath resolution.

Examples
========

```
 .renderDataPathResolution('/user/name', 'userName');
 // renders stringified version of
 const userName = $DATA && $DATA.user && $DATA.user.name;
```

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

*Defined in [core/code_gen.ts:185](https://github.com/krnik/vjs-validator/blob/08b1300/src/core/code_gen.ts#L185)*

Renders for loop.

Examples
========

```
 .renderForLoop('myVar', 'arrayOfNumbers', 'a_index');
 // renders stringified version of
 const myVar_len = arrayOfNumbers.length;
 for (
     let a_index = 0;
     a_index < myVar_len;
     a_inex++
 ) {
     const myVar = arrayOfNumbers[a_index];
```

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

*Defined in [core/code_gen.ts:155](https://github.com/krnik/vjs-validator/blob/08b1300/src/core/code_gen.ts#L155)*

Renders for..of loop.

Examples
========

```
 .renderForOfLoop('item', 'arrayOfNumbers', 'Numbers');
 // renders stringified version of
 if (!(Symbol.iterator in arrayOfNumbers))
     return `{"message": "Data requires...", "path": "Numbers"}`;
 for (const item of arrayOfNumbers) {
```

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

*Defined in [core/code_gen.ts:219](https://github.com/krnik/vjs-validator/blob/08b1300/src/core/code_gen.ts#L219)*

Renders function call, checks if it returned truthy value, if so then return from validation function.

Examples
========

```
 .renderFunctionCall('isValidUser', '{}', 'User', '$data');
 // returns stringified version of
 const isValidUser_res = isValidUser({}, 'User', $data);
 if (isValidUser_res) return isValidUser_res;
```

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

*Defined in [core/code_gen.ts:97](https://github.com/krnik/vjs-validator/blob/08b1300/src/core/code_gen.ts#L97)*

Renders "if statement".

Examples
========

```
 const conditions = [
     {
         operator: ComparisonOperator.EqualStrict,
         value: '100',
         variableName: 'resolved_0', // some variable from the scope
     },
 ];

 .renderIfStatement(conditions);
 'if (resolved_0 === 100)';

 const conds = [
     {
         operator: ComparisonOperator.GreaterThan,
         value: 0,
         variableName: 'a'
     },
     {
         operator: ComparisonOperator.GreaterThan,
         value: 0,
         variableName: 'b'
     },
 ];

 .renderIfStatement(conditions, LogicalOperator.Or);
 'if (a > 0 \|\| b > 0)';
```

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

*Defined in [core/code_gen.ts:42](https://github.com/krnik/vjs-validator/blob/08b1300/src/core/code_gen.ts#L42)*

Renders labeled break statement, expects current block label name as an argument.

Examples
========

```
 .renderLabeledBreakStatement('data_0');
 'break label_data_0;'
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| blockLabel | `string` |

**Returns:** `string`

___
<a id="renderopenlabeledblock"></a>

### `<Static>` renderOpenLabeledBlock

▸ **renderOpenLabeledBlock**(blockLabel: *`string`*): `string`

*Defined in [core/code_gen.ts:54](https://github.com/krnik/vjs-validator/blob/08b1300/src/core/code_gen.ts#L54)*

Renders labeled block opening.

Examples
========

```
 .renderOpenLabeledBlock('myBlock');
 'label_myBlock: {';
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| blockLabel | `string` |

**Returns:** `string`

___
<a id="renderpropertyaccessor"></a>

### `<Static>` renderPropertyAccessor

▸ **renderPropertyAccessor**(accessor: *`string`*): `string`

*Defined in [core/code_gen.ts:27](https://github.com/krnik/vjs-validator/blob/08b1300/src/core/code_gen.ts#L27)*

Renders provided `accessor` string as a object property accessor.

Examples
========

```
 .renderPropertyAccessor('0');
 '[0]'

 .renderPropertyAccessor('_prop_name');
 '._prop_name'

 .renderPropertyAccessor('??_not_so_valid_variable_name');
 '["??_not_so_valid_variable_name"]'
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| accessor | `string` |

**Returns:** `string`

___
<a id="renderreturnjsonmessage"></a>

### `<Static>` renderReturnJSONMessage

▸ **renderReturnJSONMessage**(message: *`string`*, path: *`string`*): `string`

*Defined in [core/code_gen.ts:120](https://github.com/krnik/vjs-validator/blob/08b1300/src/core/code_gen.ts#L120)*

Renders return statement that returns with JSON value.

Examples
========

```
 .renderReturnJSONMessage('Oopsie', 'User#type');
 'return `{ "message": "Oopsie", "path": "User#type" }`;';
```

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

*Defined in [core/code_gen.ts:135](https://github.com/krnik/vjs-validator/blob/08b1300/src/core/code_gen.ts#L135)*

Renders `const` variable initialization.

Examples
========

```
 .renderVariableInitialization('myVar', 'window', '.fetch');
 'const myVar = window.fetch;';

 .renderVariableInitialization('myVar', '100');
 'const myVar = 100;';
```

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| variableName | `string` | - |
| value | `string` | - |
| `Default value` accessor | `string` | &quot;&quot; |
| `Default value` keyword | [Const](../enums/keyword.md#const) \| [Let](../enums/keyword.md#let) \| [Var](../enums/keyword.md#var) |  Keyword.Const |

**Returns:** `string`

___

