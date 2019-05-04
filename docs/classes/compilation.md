[jbq](../README.md) > [Compilation](../classes/compilation.md)

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
* [options](compilation.md#options)
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

⊕ **new Compilation**(types: *[TypeWrapper](typewrapper.md)*, schema: *[Schema](../interfaces/schema.md)*, schemaName: *`string`*, options?: *[CompilationOptions](../interfaces/compilationoptions.md)*): [Compilation](compilation.md)

*Defined in [core/compilation.ts:45](https://github.com/krnik/vjs-validator/blob/15e769b/src/core/compilation.ts#L45)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| types | [TypeWrapper](typewrapper.md) | - |
| schema | [Schema](../interfaces/schema.md) | - |
| schemaName | `string` | - |
| `Default value` options | [CompilationOptions](../interfaces/compilationoptions.md) |  {} |

**Returns:** [Compilation](compilation.md)

___

## Properties

<a id="log"></a>

### `<Private>` log

**● log**: *[LogService](logservice.md)*

*Defined in [core/compilation.ts:36](https://github.com/krnik/vjs-validator/blob/15e769b/src/core/compilation.ts#L36)*

___
<a id="macrohelpers"></a>

### `<Private>` macroHelpers

**● macroHelpers**: *(`(Anonymous function)` \| `(Anonymous function)`)[]* =  [
        (value: unknown): value is DataPath => schemaValidate.dataPath(value),
        (value: DataPath): string => this.sourceBuilder.resolveDataPath(value),
    ]

*Defined in [core/compilation.ts:42](https://github.com/krnik/vjs-validator/blob/15e769b/src/core/compilation.ts#L42)*

___
<a id="options"></a>

### `<Private>` options

**● options**: *[CompilationOptions](../interfaces/compilationoptions.md)*

*Defined in [core/compilation.ts:41](https://github.com/krnik/vjs-validator/blob/15e769b/src/core/compilation.ts#L41)*

___
<a id="resolvedpaths"></a>

### `<Private>` resolvedPaths

**● resolvedPaths**: *[ResolvedPathStore](resolvedpathstore.md)*

*Defined in [core/compilation.ts:40](https://github.com/krnik/vjs-validator/blob/15e769b/src/core/compilation.ts#L40)*

___
<a id="schema"></a>

### `<Private>` schema

**● schema**: *[Schema](../interfaces/schema.md)*

*Defined in [core/compilation.ts:38](https://github.com/krnik/vjs-validator/blob/15e769b/src/core/compilation.ts#L38)*

___
<a id="sourcebuilder"></a>

### `<Private>` sourceBuilder

**● sourceBuilder**: *[SourceBuilder](sourcebuilder.md)*

*Defined in [core/compilation.ts:39](https://github.com/krnik/vjs-validator/blob/15e769b/src/core/compilation.ts#L39)*

___
<a id="types"></a>

### `<Private>` types

**● types**: *[TypeWrapper](typewrapper.md)*

*Defined in [core/compilation.ts:37](https://github.com/krnik/vjs-validator/blob/15e769b/src/core/compilation.ts#L37)*

___
<a id="error"></a>

### `<Static>``<Private>` Error

**● Error**: *[CompilationError](compilationerror.md)* =  CompilationError

*Defined in [core/compilation.ts:35](https://github.com/krnik/vjs-validator/blob/15e769b/src/core/compilation.ts#L35)*

___

## Methods

<a id="evaluateexpressions"></a>

### `<Private>` evaluateExpressions

▸ **evaluateExpressions**(this: *[Compilation](compilation.md)*, sourceString: *`string`*, values: *[ParseValues](../interfaces/parsevalues.md)*): `string`

*Defined in [core/compilation.ts:250](https://github.com/krnik/vjs-validator/blob/15e769b/src/core/compilation.ts#L250)*

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

*Defined in [core/compilation.ts:66](https://github.com/krnik/vjs-validator/blob/15e769b/src/core/compilation.ts#L66)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [Compilation](compilation.md) |

**Returns:** [SourceBuilderProduct](../interfaces/sourcebuilderproduct.md)

___
<a id="gettype"></a>

### `<Private>` getType

▸ **getType**(this: *[Compilation](compilation.md)*, typeName: *`string`*): [TypeDefinition](../interfaces/typedefinition.md) \| `never`

*Defined in [core/compilation.ts:161](https://github.com/krnik/vjs-validator/blob/15e769b/src/core/compilation.ts#L161)*

Attempt to retry a `typeName` from `TypeWrapper`. If type does not exists this function will throw.

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [Compilation](compilation.md) |
| typeName | `string` |

**Returns:** [TypeDefinition](../interfaces/typedefinition.md) \| `never`

___
<a id="parsemethodclosure"></a>

### `<Private>` parseMethodClosure

▸ **parseMethodClosure**(this: *[Compilation](compilation.md)*, method: *[TypeMethod](../interfaces/typemethod.md)*, values: *[ParseValues](../interfaces/parsevalues.md)*): `void`

*Defined in [core/compilation.ts:288](https://github.com/krnik/vjs-validator/blob/15e769b/src/core/compilation.ts#L288)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [Compilation](compilation.md) |
| method | [TypeMethod](../interfaces/typemethod.md) |
| values | [ParseValues](../interfaces/parsevalues.md) |

**Returns:** `void`

___
<a id="parsemethodextractbody"></a>

### `<Private>` parseMethodExtractBody

▸ **parseMethodExtractBody**(this: *[Compilation](compilation.md)*, method: *[TypeMethod](../interfaces/typemethod.md)*, values: *[ParseValues](../interfaces/parsevalues.md)*): `void`

*Defined in [core/compilation.ts:213](https://github.com/krnik/vjs-validator/blob/15e769b/src/core/compilation.ts#L213)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [Compilation](compilation.md) |
| method | [TypeMethod](../interfaces/typemethod.md) |
| values | [ParseValues](../interfaces/parsevalues.md) |

**Returns:** `void`

___
<a id="parsemethodmacro"></a>

### `<Private>` parseMethodMacro

▸ **parseMethodMacro**(this: *[Compilation](compilation.md)*, method: *[TypeMethod](../interfaces/typemethod.md)*, values: *[ParseValues](../interfaces/parsevalues.md)*): `void`

*Defined in [core/compilation.ts:312](https://github.com/krnik/vjs-validator/blob/15e769b/src/core/compilation.ts#L312)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [Compilation](compilation.md) |
| method | [TypeMethod](../interfaces/typemethod.md) |
| values | [ParseValues](../interfaces/parsevalues.md) |

**Returns:** `void`

___
<a id="parseproperty"></a>

### `<Private>` parseProperty

▸ **parseProperty**(this: *[Compilation](compilation.md)*, method: *[TypeMethod](../interfaces/typemethod.md)*, schemaValue: *`unknown`*): `void`

*Defined in [core/compilation.ts:194](https://github.com/krnik/vjs-validator/blob/15e769b/src/core/compilation.ts#L194)*

Attempt to parse schema property and respective `TypeMethod` into a validation function block.

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [Compilation](compilation.md) |
| method | [TypeMethod](../interfaces/typemethod.md) |
| schemaValue | `unknown` |

**Returns:** `void`

___
<a id="parseschemasync"></a>

###  parseSchemaSync

▸ **parseSchemaSync**(this: *[Compilation](compilation.md)*, schema: *[Schema](../interfaces/schema.md)*): `void`

*Defined in [core/compilation.ts:71](https://github.com/krnik/vjs-validator/blob/15e769b/src/core/compilation.ts#L71)*

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

*Defined in [core/compilation.ts:272](https://github.com/krnik/vjs-validator/blob/15e769b/src/core/compilation.ts#L272)*

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

▸ **sortSchemaEntries**(this: *[Compilation](compilation.md)*, schema: *[Schema](../interfaces/schema.md)*, type: *[TypeDefinition](../interfaces/typedefinition.md)*): [`string`, `unknown`][]

*Defined in [core/compilation.ts:170](https://github.com/krnik/vjs-validator/blob/15e769b/src/core/compilation.ts#L170)*

Rearranges the order of object entries to match the order defined in the TypeDefinition `Symbol.for('type_key_order')` property.

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [Compilation](compilation.md) |
| schema | [Schema](../interfaces/schema.md) |
| type | [TypeDefinition](../interfaces/typedefinition.md) |

**Returns:** [`string`, `unknown`][]

___
<a id="toliteral"></a>

### `<Private>` toLiteral

▸ **toLiteral**(this: *[Compilation](compilation.md)*, schemaValue: *`unknown`*): `string`

*Defined in [core/compilation.ts:283](https://github.com/krnik/vjs-validator/blob/15e769b/src/core/compilation.ts#L283)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [Compilation](compilation.md) |
| schemaValue | `unknown` |

**Returns:** `string`

___

