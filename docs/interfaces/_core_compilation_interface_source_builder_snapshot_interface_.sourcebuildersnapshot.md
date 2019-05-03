[jbq](../README.md) > ["core/compilation/interface/source_builder_snapshot.interface"](../modules/_core_compilation_interface_source_builder_snapshot_interface_.md) > [SourceBuilderSnapshot](../interfaces/_core_compilation_interface_source_builder_snapshot_interface_.sourcebuildersnapshot.md)

# Interface: SourceBuilderSnapshot

## Hierarchy

 [SourceBuilderContext](_core_compilation_interface_source_builder_context_interface_.sourcebuildercontext.md)

**↳ SourceBuilderSnapshot**

## Index

### Properties

* [currentProperty](_core_compilation_interface_source_builder_snapshot_interface_.sourcebuildersnapshot.md#currentproperty)
* [schemaPath](_core_compilation_interface_source_builder_snapshot_interface_.sourcebuildersnapshot.md#schemapath)
* [variableName](_core_compilation_interface_source_builder_snapshot_interface_.sourcebuildersnapshot.md#variablename)

### Methods

* [restore](_core_compilation_interface_source_builder_snapshot_interface_.sourcebuildersnapshot.md#restore)

---

## Properties

<a id="currentproperty"></a>

###  currentProperty

**● currentProperty**: *`string`*

*Inherited from [SourceBuilderContext](_core_compilation_interface_source_builder_context_interface_.sourcebuildercontext.md).[currentProperty](_core_compilation_interface_source_builder_context_interface_.sourcebuildercontext.md#currentproperty)*

*Defined in [core/compilation/interface/source_builder_context.interface.ts:20](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/compilation/interface/source_builder_context.interface.ts#L20)*

Represents `Schema` property that is currently processed. It's used to create `schemaPath` by adding the property name after `#` at the end of the `schemaPath`

___
<a id="schemapath"></a>

###  schemaPath

**● schemaPath**: *`string`*

*Inherited from [SourceBuilderContext](_core_compilation_interface_source_builder_context_interface_.sourcebuildercontext.md).[schemaPath](_core_compilation_interface_source_builder_context_interface_.sourcebuildercontext.md#schemapath)*

*Defined in [core/compilation/interface/source_builder_context.interface.ts:24](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/compilation/interface/source_builder_context.interface.ts#L24)*

Represents path from `Schema` root to currently processed part of it.

___
<a id="variablename"></a>

###  variableName

**● variableName**: *`string`*

*Inherited from [SourceBuilderContext](_core_compilation_interface_source_builder_context_interface_.sourcebuildercontext.md).[variableName](_core_compilation_interface_source_builder_context_interface_.sourcebuildercontext.md#variablename)*

*Defined in [core/compilation/interface/source_builder_context.interface.ts:14](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/compilation/interface/source_builder_context.interface.ts#L14)*

Represents variable name that is a source of data for currently processed part of the schema.

For root schema the variableName would be the `$DATA` parameter of the validation function.

___

## Methods

<a id="restore"></a>

###  restore

▸ **restore**(): `void`

*Defined in [core/compilation/interface/source_builder_snapshot.interface.ts:4](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/compilation/interface/source_builder_snapshot.interface.ts#L4)*

**Returns:** `void`

___

