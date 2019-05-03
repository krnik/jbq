[jbq](../README.md) > ["core/compilation"](../modules/_core_compilation_.md) > [Compilation](../classes/_core_compilation_.compilation.md)

# Class: Compilation

Compilation class responsible for coordination of other subclasses in an effort to create validation function.

New instance is created for every schema.

## Hierarchy

**Compilation**

## Index

### Constructors

* [constructor](_core_compilation_.compilation.md#constructor)

### Properties

* [log](_core_compilation_.compilation.md#log)
* [macroHelpers](_core_compilation_.compilation.md#macrohelpers)
* [options](_core_compilation_.compilation.md#options)
* [resolvedPaths](_core_compilation_.compilation.md#resolvedpaths)
* [schema](_core_compilation_.compilation.md#schema)
* [sourceBuilder](_core_compilation_.compilation.md#sourcebuilder)
* [types](_core_compilation_.compilation.md#types)
* [Error](_core_compilation_.compilation.md#error)

### Methods

* [evaluateExpressions](_core_compilation_.compilation.md#evaluateexpressions)
* [execSync](_core_compilation_.compilation.md#execsync)
* [getType](_core_compilation_.compilation.md#gettype)
* [parseMethodClosure](_core_compilation_.compilation.md#parsemethodclosure)
* [parseMethodExtractBody](_core_compilation_.compilation.md#parsemethodextractbody)
* [parseMethodMacro](_core_compilation_.compilation.md#parsemethodmacro)
* [parseProperty](_core_compilation_.compilation.md#parseproperty)
* [parseSchemaSync](_core_compilation_.compilation.md#parseschemasync)
* [replaceToken](_core_compilation_.compilation.md#replacetoken)
* [sortSchemaEntries](_core_compilation_.compilation.md#sortschemaentries)
* [toLiteral](_core_compilation_.compilation.md#toliteral)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Compilation**(types: *[TypeWrapper](_core_type_wrapper_.typewrapper.md)*, schema: *[Schema](../interfaces/_core_compilation_interface_schema_interface_.schema.md)*, schemaName: *`string`*, options?: *[CompilationOptions](../interfaces/_core_compilation_interface_compilation_options_interface_.compilationoptions.md)*): [Compilation](_core_compilation_.compilation.md)

*Defined in [core/compilation.ts:45](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/compilation.ts#L45)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| types | [TypeWrapper](_core_type_wrapper_.typewrapper.md) | - |
| schema | [Schema](../interfaces/_core_compilation_interface_schema_interface_.schema.md) | - |
| schemaName | `string` | - |
| `Default value` options | [CompilationOptions](../interfaces/_core_compilation_interface_compilation_options_interface_.compilationoptions.md) |  {} |

**Returns:** [Compilation](_core_compilation_.compilation.md)

___

## Properties

<a id="log"></a>

### `<Private>` log

**● log**: *[LogService](_util_log_service_.logservice.md)*

*Defined in [core/compilation.ts:36](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/compilation.ts#L36)*

___
<a id="macrohelpers"></a>

### `<Private>` macroHelpers

**● macroHelpers**: *(`(Anonymous function)` \| `(Anonymous function)`)[]* =  [
        (value: unknown): value is DataPath => schemaValidate.dataPath(value),
        (value: DataPath): string => this.sourceBuilder.resolveDataPath(value),
    ]

*Defined in [core/compilation.ts:42](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/compilation.ts#L42)*

___
<a id="options"></a>

### `<Private>` options

**● options**: *[CompilationOptions](../interfaces/_core_compilation_interface_compilation_options_interface_.compilationoptions.md)*

*Defined in [core/compilation.ts:41](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/compilation.ts#L41)*

___
<a id="resolvedpaths"></a>

### `<Private>` resolvedPaths

**● resolvedPaths**: *[ResolvedPathStore](_core_compilation_resolved_path_store_.resolvedpathstore.md)*

*Defined in [core/compilation.ts:40](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/compilation.ts#L40)*

___
<a id="schema"></a>

### `<Private>` schema

**● schema**: *[Schema](../interfaces/_core_compilation_interface_schema_interface_.schema.md)*

*Defined in [core/compilation.ts:38](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/compilation.ts#L38)*

___
<a id="sourcebuilder"></a>

### `<Private>` sourceBuilder

**● sourceBuilder**: *[SourceBuilder](_core_compilation_source_builder_.sourcebuilder.md)*

*Defined in [core/compilation.ts:39](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/compilation.ts#L39)*

___
<a id="types"></a>

### `<Private>` types

**● types**: *[TypeWrapper](_core_type_wrapper_.typewrapper.md)*

*Defined in [core/compilation.ts:37](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/compilation.ts#L37)*

___
<a id="error"></a>

### `<Static>``<Private>` Error

**● Error**: *[CompilationError](_core_compilation_compilation_error_.compilationerror.md)* =  CompilationError

*Defined in [core/compilation.ts:35](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/compilation.ts#L35)*

___

## Methods

<a id="evaluateexpressions"></a>

### `<Private>` evaluateExpressions

▸ **evaluateExpressions**(this: *[Compilation](_core_compilation_.compilation.md)*, sourceString: *`string`*, values: *[ParseValues](../interfaces/_misc_typings_.parsevalues.md)*): `string`

*Defined in [core/compilation.ts:250](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/compilation.ts#L250)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [Compilation](_core_compilation_.compilation.md) |
| sourceString | `string` |
| values | [ParseValues](../interfaces/_misc_typings_.parsevalues.md) |

**Returns:** `string`

___
<a id="execsync"></a>

###  execSync

▸ **execSync**(this: *[Compilation](_core_compilation_.compilation.md)*): [SourceBuilderProduct](../interfaces/_core_compilation_interface_source_builder_product_interface_.sourcebuilderproduct.md)

*Defined in [core/compilation.ts:66](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/compilation.ts#L66)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [Compilation](_core_compilation_.compilation.md) |

**Returns:** [SourceBuilderProduct](../interfaces/_core_compilation_interface_source_builder_product_interface_.sourcebuilderproduct.md)

___
<a id="gettype"></a>

### `<Private>` getType

▸ **getType**(this: *[Compilation](_core_compilation_.compilation.md)*, typeName: *`string`*): [TypeDefinition](../interfaces/_core_type_wrapper_interface_type_definition_interface_.typedefinition.md) \| `never`

*Defined in [core/compilation.ts:161](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/compilation.ts#L161)*

Attempt to retry a `typeName` from `TypeWrapper`. If type does not exists this function will throw.

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [Compilation](_core_compilation_.compilation.md) |
| typeName | `string` |

**Returns:** [TypeDefinition](../interfaces/_core_type_wrapper_interface_type_definition_interface_.typedefinition.md) \| `never`

___
<a id="parsemethodclosure"></a>

### `<Private>` parseMethodClosure

▸ **parseMethodClosure**(this: *[Compilation](_core_compilation_.compilation.md)*, method: *[TypeMethod](../interfaces/_core_type_wrapper_interface_type_method_interface_.typemethod.md)*, values: *[ParseValues](../interfaces/_misc_typings_.parsevalues.md)*): `void`

*Defined in [core/compilation.ts:288](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/compilation.ts#L288)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [Compilation](_core_compilation_.compilation.md) |
| method | [TypeMethod](../interfaces/_core_type_wrapper_interface_type_method_interface_.typemethod.md) |
| values | [ParseValues](../interfaces/_misc_typings_.parsevalues.md) |

**Returns:** `void`

___
<a id="parsemethodextractbody"></a>

### `<Private>` parseMethodExtractBody

▸ **parseMethodExtractBody**(this: *[Compilation](_core_compilation_.compilation.md)*, method: *[TypeMethod](../interfaces/_core_type_wrapper_interface_type_method_interface_.typemethod.md)*, values: *[ParseValues](../interfaces/_misc_typings_.parsevalues.md)*): `void`

*Defined in [core/compilation.ts:213](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/compilation.ts#L213)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [Compilation](_core_compilation_.compilation.md) |
| method | [TypeMethod](../interfaces/_core_type_wrapper_interface_type_method_interface_.typemethod.md) |
| values | [ParseValues](../interfaces/_misc_typings_.parsevalues.md) |

**Returns:** `void`

___
<a id="parsemethodmacro"></a>

### `<Private>` parseMethodMacro

▸ **parseMethodMacro**(this: *[Compilation](_core_compilation_.compilation.md)*, method: *[TypeMethod](../interfaces/_core_type_wrapper_interface_type_method_interface_.typemethod.md)*, values: *[ParseValues](../interfaces/_misc_typings_.parsevalues.md)*): `void`

*Defined in [core/compilation.ts:312](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/compilation.ts#L312)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [Compilation](_core_compilation_.compilation.md) |
| method | [TypeMethod](../interfaces/_core_type_wrapper_interface_type_method_interface_.typemethod.md) |
| values | [ParseValues](../interfaces/_misc_typings_.parsevalues.md) |

**Returns:** `void`

___
<a id="parseproperty"></a>

### `<Private>` parseProperty

▸ **parseProperty**(this: *[Compilation](_core_compilation_.compilation.md)*, method: *[TypeMethod](../interfaces/_core_type_wrapper_interface_type_method_interface_.typemethod.md)*, schemaValue: *`unknown`*): `void`

*Defined in [core/compilation.ts:194](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/compilation.ts#L194)*

Attempt to parse schema property and respective `TypeMethod` into a validation function block.

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [Compilation](_core_compilation_.compilation.md) |
| method | [TypeMethod](../interfaces/_core_type_wrapper_interface_type_method_interface_.typemethod.md) |
| schemaValue | `unknown` |

**Returns:** `void`

___
<a id="parseschemasync"></a>

###  parseSchemaSync

▸ **parseSchemaSync**(this: *[Compilation](_core_compilation_.compilation.md)*, schema: *[Schema](../interfaces/_core_compilation_interface_schema_interface_.schema.md)*): `void`

*Defined in [core/compilation.ts:71](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/compilation.ts#L71)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [Compilation](_core_compilation_.compilation.md) |
| schema | [Schema](../interfaces/_core_compilation_interface_schema_interface_.schema.md) |

**Returns:** `void`

___
<a id="replacetoken"></a>

### `<Private>` replaceToken

▸ **replaceToken**(this: *[Compilation](_core_compilation_.compilation.md)*, sourceString: *`string`*, token: *`string`*, replaceTo: *`string`*): `string`

*Defined in [core/compilation.ts:272](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/compilation.ts#L272)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [Compilation](_core_compilation_.compilation.md) |
| sourceString | `string` |
| token | `string` |
| replaceTo | `string` |

**Returns:** `string`

___
<a id="sortschemaentries"></a>

### `<Private>` sortSchemaEntries

▸ **sortSchemaEntries**(this: *[Compilation](_core_compilation_.compilation.md)*, schema: *[Schema](../interfaces/_core_compilation_interface_schema_interface_.schema.md)*, type: *[TypeDefinition](../interfaces/_core_type_wrapper_interface_type_definition_interface_.typedefinition.md)*): [`string`, `unknown`][]

*Defined in [core/compilation.ts:170](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/compilation.ts#L170)*

Rearranges the order of object entries to match the order defined in the TypeDefinition `Symbol.for('type_key_order')` property.

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [Compilation](_core_compilation_.compilation.md) |
| schema | [Schema](../interfaces/_core_compilation_interface_schema_interface_.schema.md) |
| type | [TypeDefinition](../interfaces/_core_type_wrapper_interface_type_definition_interface_.typedefinition.md) |

**Returns:** [`string`, `unknown`][]

___
<a id="toliteral"></a>

### `<Private>` toLiteral

▸ **toLiteral**(this: *[Compilation](_core_compilation_.compilation.md)*, schemaValue: *`unknown`*): `string`

*Defined in [core/compilation.ts:283](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/compilation.ts#L283)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [Compilation](_core_compilation_.compilation.md) |
| schemaValue | `unknown` |

**Returns:** `string`

___

