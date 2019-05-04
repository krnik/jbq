[JBQDocs](../README.md) > [SourceBuilderContext](../interfaces/sourcebuildercontext.md)

# Interface: SourceBuilderContext

Interface representing internal context of `SourceBuider` instance. It's used to keep track of variable names, currently processed schema property and schema path from root to the property.

## Hierarchy

**SourceBuilderContext**

↳  [SourceBuilderSnapshot](sourcebuildersnapshot.md)

## Index

### Properties

* [currentProperty](sourcebuildercontext.md#currentproperty)
* [schemaPath](sourcebuildercontext.md#schemapath)
* [variableName](sourcebuildercontext.md#variablename)

---

## Properties

<a id="currentproperty"></a>

###  currentProperty

**● currentProperty**: *`string`*

*Defined in [core/compilation/interface/source_builder_context.interface.ts:20](https://github.com/krnik/vjs-validator/blob/6195eeb/src/core/compilation/interface/source_builder_context.interface.ts#L20)*

Represents `Schema` property that is currently processed. It's used to create `schemaPath` by adding the property name after `#` at the end of the `schemaPath`

___
<a id="schemapath"></a>

###  schemaPath

**● schemaPath**: *`string`*

*Defined in [core/compilation/interface/source_builder_context.interface.ts:24](https://github.com/krnik/vjs-validator/blob/6195eeb/src/core/compilation/interface/source_builder_context.interface.ts#L24)*

Represents path from `Schema` root to currently processed part of it.

___
<a id="variablename"></a>

###  variableName

**● variableName**: *`string`*

*Defined in [core/compilation/interface/source_builder_context.interface.ts:14](https://github.com/krnik/vjs-validator/blob/6195eeb/src/core/compilation/interface/source_builder_context.interface.ts#L14)*

Represents variable name that is a source of data for currently processed part of the schema.

For root schema the variableName would be the `$DATA` parameter of the validation function.

___

