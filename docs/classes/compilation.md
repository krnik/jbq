[JBQDocs](../README.md) > [Compilation](../classes/compilation.md)

# Class: Compilation

Compilation class responsible for coordination of other subclasses in an effort to create validation function.

New instance is created for every schema.

## Hierarchy

**Compilation**

## Index

### Constructors

* [constructor](compilation.md#constructor)

### Properties

* [log](compilation.md#log)
* [macroHelpers](compilation.md#macrohelpers)
* [resolvedPaths](compilation.md#resolvedpaths)
* [schema](compilation.md#schema)
* [sourceBuilder](compilation.md#sourcebuilder)
* [types](compilation.md#types)
* [Error](compilation.md#error)

### Methods

* [evaluateExpressions](compilation.md#evaluateexpressions)
* [execSync](compilation.md#execsync)
* [getType](compilation.md#gettype)
* [parseMethodClosure](compilation.md#parsemethodclosure)
* [parseMethodExtractBody](compilation.md#parsemethodextractbody)
* [parseMethodMacro](compilation.md#parsemethodmacro)
* [parseProperty](compilation.md#parseproperty)
* [parseSchemaSync](compilation.md#parseschemasync)
* [replaceToken](compilation.md#replacetoken)
* [sortSchemaEntries](compilation.md#sortschemaentries)
* [toLiteral](compilation.md#toliteral)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Compilation**(types: *[TypeStore](typestore.md)<[Any](../#any)>*, schema: *[Schema](../interfaces/schema.md)*, schemaName: *`string`*, options?: *[Options](../interfaces/options.md)*): [Compilation](compilation.md)

*Defined in [core/compilation.ts:41](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/compilation.ts#L41)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| types | [TypeStore](typestore.md)<[Any](../#any)> | - |
| schema | [Schema](../interfaces/schema.md) | - |
| schemaName | `string` | - |
| `Default value` options | [Options](../interfaces/options.md) |  {} |

**Returns:** [Compilation](compilation.md)

___

## Properties

<a id="log"></a>

### `<Private>` log

**● log**: *[LogService](logservice.md)*

*Defined in [core/compilation.ts:33](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/compilation.ts#L33)*

___
<a id="macrohelpers"></a>

### `<Private>` macroHelpers

**● macroHelpers**: *(`(Anonymous function)` \| `(Anonymous function)`)[]* =  [
        (value: unknown): value is DataPath => schemaValidate.dataPath(value),
        (value: DataPath): string => this.sourceBuilder.resolveDataPath(value),
    ]

*Defined in [core/compilation.ts:38](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/compilation.ts#L38)*

___
<a id="resolvedpaths"></a>

### `<Private>` resolvedPaths

**● resolvedPaths**: *[ResolvedPathStore](resolvedpathstore.md)*

*Defined in [core/compilation.ts:37](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/compilation.ts#L37)*

___
<a id="schema"></a>

### `<Private>` schema

**● schema**: *[Schema](../interfaces/schema.md)*

*Defined in [core/compilation.ts:35](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/compilation.ts#L35)*

___
<a id="sourcebuilder"></a>

### `<Private>` sourceBuilder

**● sourceBuilder**: *[SourceBuilder](sourcebuilder.md)*

*Defined in [core/compilation.ts:36](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/compilation.ts#L36)*

___
<a id="types"></a>

### `<Private>` types

**● types**: *[TypeStore](typestore.md)*

*Defined in [core/compilation.ts:34](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/compilation.ts#L34)*

___
<a id="error"></a>

### `<Static>``<Private>` Error

**● Error**: *[CompilationError](compilationerror.md)* =  CompilationError

*Defined in [core/compilation.ts:32](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/compilation.ts#L32)*

___

## Methods

<a id="evaluateexpressions"></a>

### `<Private>` evaluateExpressions

▸ **evaluateExpressions**(this: *[Compilation](compilation.md)*, sourceString: *`string`*, values: *[ParseValues](../interfaces/parsevalues.md)*): `string`

*Defined in [core/compilation.ts:252](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/compilation.ts#L252)*

Evaluate `{{}}` expressions.

Currently provided values are `schemaValue`, `schemaPath` and `resolvedValue`.

`schemaValue` - is a value from schema

`schemaPath` - is a path from schema root to currently processed part of schema

`resolvedValue` - is a variable name assigned to a resolved `$dataPath` value

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [Compilation](compilation.md) |
| sourceString | `string` |
| values | [ParseValues](../interfaces/parsevalues.md) |

**Returns:** `string`

___
<a id="execsync"></a>

###  execSync

▸ **execSync**(this: *[Compilation](compilation.md)*): [SourceBuilderProduct](../interfaces/sourcebuilderproduct.md)

*Defined in [core/compilation.ts:56](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/compilation.ts#L56)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [Compilation](compilation.md) |

**Returns:** [SourceBuilderProduct](../interfaces/sourcebuilderproduct.md)

___
<a id="gettype"></a>

### `<Private>` getType

▸ **getType**(this: *[Compilation](compilation.md)*, typeName: *`string`*): [TypeInstance](typeinstance.md)<[Any](../#any), [Any](../#any), [Any](../#any)> \| `never`

*Defined in [core/compilation.ts:143](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/compilation.ts#L143)*

Attempt to retry a `typeName` from `TypeWrapper`. If type does not exists this function will throw.

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [Compilation](compilation.md) |
| typeName | `string` |

**Returns:** [TypeInstance](typeinstance.md)<[Any](../#any), [Any](../#any), [Any](../#any)> \| `never`

___
<a id="parsemethodclosure"></a>

### `<Private>` parseMethodClosure

▸ **parseMethodClosure**(this: *[Compilation](compilation.md)*, keywordDescriptor: *[KeywordDescriptor](../interfaces/keyworddescriptor.md)*, values: *[ParseValues](../interfaces/parsevalues.md)*): `void`

*Defined in [core/compilation.ts:292](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/compilation.ts#L292)*

Calls type method marked as closure.

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [Compilation](compilation.md) |
| keywordDescriptor | [KeywordDescriptor](../interfaces/keyworddescriptor.md) |
| values | [ParseValues](../interfaces/parsevalues.md) |

**Returns:** `void`

___
<a id="parsemethodextractbody"></a>

### `<Private>` parseMethodExtractBody

▸ **parseMethodExtractBody**(this: *[Compilation](compilation.md)*, keywordDescriptor: *[KeywordDescriptor](../interfaces/keyworddescriptor.md)*, values: *[ParseValues](../interfaces/parsevalues.md)*): `void`

*Defined in [core/compilation.ts:203](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/compilation.ts#L203)*

Stringify function, evaluate expressions, add break token if needed and also replace `schemaValue` and `$DATA` parameters with current context variables.

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [Compilation](compilation.md) |
| keywordDescriptor | [KeywordDescriptor](../interfaces/keyworddescriptor.md) |
| values | [ParseValues](../interfaces/parsevalues.md) |

**Returns:** `void`

___
<a id="parsemethodmacro"></a>

### `<Private>` parseMethodMacro

▸ **parseMethodMacro**(this: *[Compilation](compilation.md)*, keywordDescriptor: *[KeywordDescriptor](../interfaces/keyworddescriptor.md)*, values: *[ParseValues](../interfaces/parsevalues.md)*): `void`

*Defined in [core/compilation.ts:321](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/compilation.ts#L321)*

Calls type method marked as macro and appends its result to the validation function source code.

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [Compilation](compilation.md) |
| keywordDescriptor | [KeywordDescriptor](../interfaces/keyworddescriptor.md) |
| values | [ParseValues](../interfaces/parsevalues.md) |

**Returns:** `void`

___
<a id="parseproperty"></a>

### `<Private>` parseProperty

▸ **parseProperty**(this: *[Compilation](compilation.md)*, keywordDescriptor: *[KeywordDescriptor](../interfaces/keyworddescriptor.md)*, schemaValue: *`unknown`*): `void`

*Defined in [core/compilation.ts:176](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/compilation.ts#L176)*

Attempt to parse schema property and respective `TypeMethod` into a validation function block.

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [Compilation](compilation.md) |
| keywordDescriptor | [KeywordDescriptor](../interfaces/keyworddescriptor.md) |
| schemaValue | `unknown` |

**Returns:** `void`

___
<a id="parseschemasync"></a>

###  parseSchemaSync

▸ **parseSchemaSync**(this: *[Compilation](compilation.md)*, schema: *[Schema](../interfaces/schema.md)*): `void`

*Defined in [core/compilation.ts:61](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/compilation.ts#L61)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [Compilation](compilation.md) |
| schema | [Schema](../interfaces/schema.md) |

**Returns:** `void`

___
<a id="replacetoken"></a>

### `<Private>` replaceToken

▸ **replaceToken**(this: *[Compilation](compilation.md)*, sourceString: *`string`*, token: *`string`*, replaceTo: *`string`*): `string`

*Defined in [core/compilation.ts:275](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/compilation.ts#L275)*

Replaces every `token` in the `sourceString` with `replaceTo`.

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [Compilation](compilation.md) |
| sourceString | `string` |
| token | `string` |
| replaceTo | `string` |

**Returns:** `string`

___
<a id="sortschemaentries"></a>

### `<Private>` sortSchemaEntries

▸ **sortSchemaEntries**(this: *[Compilation](compilation.md)*, schema: *[Schema](../interfaces/schema.md)*, type: *[TypeInstance](typeinstance.md)<[Any](../#any), [Any](../#any)>*): [`string`, `unknown`][]

*Defined in [core/compilation.ts:152](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/compilation.ts#L152)*

Rearranges the order of object entries to match the order defined in the TypeDefinition `Symbol.for('type_key_order')` property.

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [Compilation](compilation.md) |
| schema | [Schema](../interfaces/schema.md) |
| type | [TypeInstance](typeinstance.md)<[Any](../#any), [Any](../#any)> |

**Returns:** [`string`, `unknown`][]

___
<a id="toliteral"></a>

### `<Private>` toLiteral

▸ **toLiteral**(this: *[Compilation](compilation.md)*, schemaValue: *`unknown`*): `string`

*Defined in [core/compilation.ts:286](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/compilation.ts#L286)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [Compilation](compilation.md) |
| schemaValue | `unknown` |

**Returns:** `string`

___

