[JBQDocs](../README.md) > [SourceBuilderSnapshot](../interfaces/sourcebuildersnapshot.md)

# Interface: SourceBuilderSnapshot

## Hierarchy

 [SourceBuilderContext](sourcebuildercontext.md)

**↳ SourceBuilderSnapshot**

## Index

### Properties

* [currentProperty](sourcebuildersnapshot.md#currentproperty)
* [schemaPath](sourcebuildersnapshot.md#schemapath)
* [variableName](sourcebuildersnapshot.md#variablename)

### Methods

* [restore](sourcebuildersnapshot.md#restore)

---

## Properties

<a id="currentproperty"></a>

###  currentProperty

**● currentProperty**: *`string`*

*Inherited from [SourceBuilderContext](sourcebuildercontext.md).[currentProperty](sourcebuildercontext.md#currentproperty)*

*Defined in [core/compilation/source_builder/source_builder_typings.ts:20](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/compilation/source_builder/source_builder_typings.ts#L20)*

Represents `Schema` property that is currently processed. It's used to create `schemaPath` by adding the property name after `#` at the end of the `schemaPath`

___
<a id="schemapath"></a>

###  schemaPath

**● schemaPath**: *`string`*

*Inherited from [SourceBuilderContext](sourcebuildercontext.md).[schemaPath](sourcebuildercontext.md#schemapath)*

*Defined in [core/compilation/source_builder/source_builder_typings.ts:24](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/compilation/source_builder/source_builder_typings.ts#L24)*

Represents path from `Schema` root to currently processed part of it.

___
<a id="variablename"></a>

###  variableName

**● variableName**: *`string`*

*Inherited from [SourceBuilderContext](sourcebuildercontext.md).[variableName](sourcebuildercontext.md#variablename)*

*Defined in [core/compilation/source_builder/source_builder_typings.ts:14](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/compilation/source_builder/source_builder_typings.ts#L14)*

Represents variable name that is a source of data for currently processed part of the schema.

For root schema the variableName would be the `$DATA` parameter of the validation function.

___

## Methods

<a id="restore"></a>

###  restore

▸ **restore**(): `void`

*Defined in [core/compilation/source_builder/source_builder_typings.ts:28](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/compilation/source_builder/source_builder_typings.ts#L28)*

**Returns:** `void`

___

