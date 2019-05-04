[jbq](../README.md) > [SourceBuilderProduct](../interfaces/sourcebuilderproduct.md)

# Interface: SourceBuilderProduct

An interface that is used to create end-product of the `SourceBuilder` that is a validation functions. It cointains all necessary elements needed to create one.

## Hierarchy

**SourceBuilderProduct**

## Index

### Properties

* [argsParameter](sourcebuilderproduct.md#argsparameter)
* [arguments](sourcebuilderproduct.md#arguments)
* [code](sourcebuilderproduct.md#code)
* [dataParameter](sourcebuilderproduct.md#dataparameter)

---

## Properties

<a id="argsparameter"></a>

###  argsParameter

**● argsParameter**: *`string`*

*Defined in [core/compilation/interface/source_builder_product.interface.ts:27](https://github.com/krnik/vjs-validator/blob/15e769b/src/core/compilation/interface/source_builder_product.interface.ts#L27)*

Name of the parameter that represents an array of arguments that validation function expects.

___
<a id="arguments"></a>

###  arguments

**● arguments**: *`unknown`[]*

*Defined in [core/compilation/interface/source_builder_product.interface.ts:18](https://github.com/krnik/vjs-validator/blob/15e769b/src/core/compilation/interface/source_builder_product.interface.ts#L18)*

An array that contains all the values that will be passed as an `argumentsParameter` to the validation function.

Array is used instead of naming every argument separately because functions length is `u8` type while arrays length is `u32` type.

___
<a id="code"></a>

###  code

**● code**: *`string`*

*Defined in [core/compilation/interface/source_builder_product.interface.ts:10](https://github.com/krnik/vjs-validator/blob/15e769b/src/core/compilation/interface/source_builder_product.interface.ts#L10)*

Property that contains string content of validation function.

___
<a id="dataparameter"></a>

###  dataParameter

**● dataParameter**: *`string`*

*Defined in [core/compilation/interface/source_builder_product.interface.ts:22](https://github.com/krnik/vjs-validator/blob/15e769b/src/core/compilation/interface/source_builder_product.interface.ts#L22)*

Name of the parameter that represents input value.

___

