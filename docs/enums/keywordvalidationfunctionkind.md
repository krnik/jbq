[JBQDocs](../README.md) > [KeywordValidationFunctionKind](../enums/keywordvalidationfunctionkind.md)

# Enumeration: KeywordValidationFunctionKind

Enum defines three possible types of functions passed as a `KeywordDescriptor.validator` value.

Possible Values:

*   `Function`
*   `Closure`
*   `Macro`

## Index

### Enumeration members

* [Closure](keywordvalidationfunctionkind.md#closure)
* [Function](keywordvalidationfunctionkind.md#function)
* [Macro](keywordvalidationfunctionkind.md#macro)

---

## Enumeration members

<a id="closure"></a>

###  Closure

**Closure**:  = "Closure"

*Defined in [core/type_store/type_instance/type_instance_typings.ts:48](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/type_store/type_instance/type_instance_typings.ts#L48)*

Defines a function that cannot be safelly stringified in order to create keyword validation block. Those functions will be referenced in validation functions. Closure functions should have the following signature.

`schemaValue` - value defined in schema object as `keyword` property value

`schemaPath` - string - path to the currently processed keyword

`$DATA` - value that should be validated

```
 function validator (
     schemaValue: any,
     schemaPath: any,
     $DATA: any
 ): ValidationResult;
```

___
<a id="function"></a>

###  Function

**Function**:  = "Function"

*Defined in [core/type_store/type_instance/type_instance_typings.ts:30](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/type_store/type_instance/type_instance_typings.ts#L30)*

Defines a function that is not a closure and can be safelly stringified in order to create keyword validation block. Those function should have the following signature.

`schemaValue` - value defined in schema object as `keyword` property value

`$DATA` - value that should be validated

```
 function validator (
     schemaValue: any,
     $DATA: any
 ): ValidationResult;
```

___
<a id="macro"></a>

###  Macro

**Macro**:  = "Macro"

*Defined in [core/type_store/type_instance/type_instance_typings.ts:66](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/type_store/type_instance/type_instance_typings.ts#L66)*

Defines a function that creates a source code of validation block itself. Those functions should have the following signature.

`parseValues` - see `ParseValues` in docs

`checkDataPath` - function that checks if passed argument is a `$dataPath` object

`resolveDataPath` - function that will return a string - variable name that stores value resolved from the path passed as an argument

```
 function validator (
     parseValues: ParseValues,
     checkDataPath: DataPathChecker,
     resolveDataPath: DataPathResolver,
 ): string;
```

___

