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

*Defined in [core/compilation/interface/source_builder_counter.interface.ts:14](https://github.com/krnik/vjs-validator/blob/08b1300/src/core/compilation/interface/source_builder_counter.interface.ts#L14)*

`ofDataVariables` represents number of variables created by accessing `$DATA` properties.

___
<a id="parameters"></a>

###  parameters

**● parameters**: *`number`*

*Defined in [core/compilation/interface/source_builder_counter.interface.ts:20](https://github.com/krnik/vjs-validator/blob/08b1300/src/core/compilation/interface/source_builder_counter.interface.ts#L20)*

Represents numbers of parameters created for current validation function. It's used during compilation to track which index of parameter should be used when needed.

___

