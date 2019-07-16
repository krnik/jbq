[JBQDocs](../README.md) > [KeywordDescriptor](../interfaces/keyworddescriptor.md)

# Interface: KeywordDescriptor

Defines the shape of an object passed as a second argument to the `TypeInstance.prototype.setKeyword` function.

## Hierarchy

**KeywordDescriptor**

## Index

### Properties

* [acceptDataPath](keyworddescriptor.md#acceptdatapath)
* [kind](keyworddescriptor.md#kind)
* [schemaValidator](keyworddescriptor.md#schemavalidator)
* [validator](keyworddescriptor.md#validator)

---

## Properties

<a id="acceptdatapath"></a>

###  acceptDataPath

**● acceptDataPath**: *`boolean`*

*Defined in [core/type_store/type_instance/type_instance_typings.ts:77](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/type_store/type_instance/type_instance_typings.ts#L77)*

___
<a id="kind"></a>

###  kind

**● kind**: *[KeywordValidationFunctionKind](../enums/keywordvalidationfunctionkind.md)*

*Defined in [core/type_store/type_instance/type_instance_typings.ts:75](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/type_store/type_instance/type_instance_typings.ts#L75)*

___
<a id="schemavalidator"></a>

###  schemaValidator

**● schemaValidator**: *`function`*

*Defined in [core/type_store/type_instance/type_instance_typings.ts:76](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/type_store/type_instance/type_instance_typings.ts#L76)*

#### Type declaration
▸(schemaValue: *`unknown`*): `unknown`

**Parameters:**

| Name | Type |
| ------ | ------ |
| schemaValue | `unknown` |

**Returns:** `unknown`

___
<a id="validator"></a>

###  validator

**● validator**: *[KeywordValidationFunction](../#keywordvalidationfunction)*

*Defined in [core/type_store/type_instance/type_instance_typings.ts:74](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/type_store/type_instance/type_instance_typings.ts#L74)*

___

