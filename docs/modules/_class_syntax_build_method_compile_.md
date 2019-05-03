[jbq](../README.md) > ["class_syntax/build_method_compile"](../modules/_class_syntax_build_method_compile_.md)

# External module: "class_syntax/build_method_compile"

## Index

### Enumerations

* [Param](../enums/_class_syntax_build_method_compile_.param.md)

### Interfaces

* [CompileOptions](../interfaces/_class_syntax_build_method_compile_.compileoptions.md)

### Variables

* [TYPES](_class_syntax_build_method_compile_.md#types)

### Functions

* [compileClass](_class_syntax_build_method_compile_.md#compileclass)
* [setDefaultTypes](_class_syntax_build_method_compile_.md#setdefaulttypes)

---

## Variables

<a id="types"></a>

### `<Let>` TYPES

**● TYPES**: *[TypeWrapper](../classes/_core_type_wrapper_.typewrapper.md)* =  jbqTypes

*Defined in [class_syntax/build_method_compile.ts:9](https://github.com/krnik/vjs-validator/blob/6a6427a/src/class_syntax/build_method_compile.ts#L9)*

___

## Functions

<a id="compileclass"></a>

###  compileClass

▸ **compileClass**(constructor: *[Constructor](../interfaces/_misc_typings_.constructor.md)*, options?: *[CompileOptions](../interfaces/_class_syntax_build_method_compile_.compileoptions.md)*): `void`

*Defined in [class_syntax/build_method_compile.ts:36](https://github.com/krnik/vjs-validator/blob/6a6427a/src/class_syntax/build_method_compile.ts#L36)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| constructor | [Constructor](../interfaces/_misc_typings_.constructor.md) | - |
| `Default value` options | [CompileOptions](../interfaces/_class_syntax_build_method_compile_.compileoptions.md) |  {} |

**Returns:** `void`

___
<a id="setdefaulttypes"></a>

###  setDefaultTypes

▸ **setDefaultTypes**(types: *[TypeWrapper](../classes/_core_type_wrapper_.typewrapper.md)*): `void`

*Defined in [class_syntax/build_method_compile.ts:20](https://github.com/krnik/vjs-validator/blob/6a6427a/src/class_syntax/build_method_compile.ts#L20)*

Permanently changes the types used provided to the JBQ compilation function by `@compile()` decorator.

By default the `jbqTypes` `TypeWrapper` instance from `/core/type/mod` module is used.

Changing default value will not affect the `jbqTypes`. But changing the `jbqTypes` value affect this modules' default types.

**Parameters:**

| Name | Type |
| ------ | ------ |
| types | [TypeWrapper](../classes/_core_type_wrapper_.typewrapper.md) |

**Returns:** `void`

___

