[JBQDocs](../README.md) > [SourceBuilderCounter](../interfaces/sourcebuildercounter.md)

# Interface: SourceBuilderCounter

Utility interface that represents internal state of SourceBuilder instance. It's used to track how many variables or parameters were created during compilation and to use the correct index of parameter when there is a need to extract parameter.

For example if `TypeMethod` is defined as closure via `Symbol.for('type_method_closure')` it will be pushed to `parameters` of the function to keep its scope values untouched.

## Hierarchy

**SourceBuilderCounter**

## Index

### Properties

* [ofDataVariables](sourcebuildercounter.md#ofdatavariables)
* [parameters](sourcebuildercounter.md#parameters)

---

## Properties

<a id="ofdatavariables"></a>

###  ofDataVariables

**● ofDataVariables**: *`number`*

*Defined in [core/compilation/source_builder/source_builder_typings.ts:44](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/compilation/source_builder/source_builder_typings.ts#L44)*

`ofDataVariables` represents number of variables created by accessing `$DATA` properties.

___
<a id="parameters"></a>

###  parameters

**● parameters**: *`number`*

*Defined in [core/compilation/source_builder/source_builder_typings.ts:50](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/compilation/source_builder/source_builder_typings.ts#L50)*

Represents numbers of parameters created for current validation function. It's used during compilation to track which index of parameter should be used when needed.

___

