[JBQDocs](../README.md) > [PropertyMetadata](../classes/propertymetadata.md)

# Class: PropertyMetadata

## Hierarchy

**PropertyMetadata**

## Index

### Properties

* [Constructor](propertymetadata.md#constructor)
* [dataPropertyPath](propertymetadata.md#datapropertypath)
* [defaultFn](propertymetadata.md#defaultfn)
* [frozen](propertymetadata.md#frozen)
* [isConstructorForItems](propertymetadata.md#isconstructorforitems)
* [schema](propertymetadata.md#schema)
* [transformFn](propertymetadata.md#transformfn)

### Methods

* [addKeyword](propertymetadata.md#addkeyword)
* [freeze](propertymetadata.md#freeze)
* [setValue](propertymetadata.md#setvalue)

---

## Properties

<a id="constructor"></a>

###  Constructor

**● Constructor**: *[Option](../#option)<`Function`>*

*Defined in [class_syntax/property_metadata.ts:12](https://github.com/krnik/vjs-validator/blob/c79d80e/src/class_syntax/property_metadata.ts#L12)*

___
<a id="datapropertypath"></a>

###  dataPropertyPath

**● dataPropertyPath**: *[Option](../#option)<`string`>*

*Defined in [class_syntax/property_metadata.ts:13](https://github.com/krnik/vjs-validator/blob/c79d80e/src/class_syntax/property_metadata.ts#L13)*

___
<a id="defaultfn"></a>

###  defaultFn

**● defaultFn**: *[Option](../#option)<[DefaultCallback](../#defaultcallback)<[Any](../#any), [Any](../#any)>>*

*Defined in [class_syntax/property_metadata.ts:10](https://github.com/krnik/vjs-validator/blob/c79d80e/src/class_syntax/property_metadata.ts#L10)*

___
<a id="frozen"></a>

###  frozen

**● frozen**: *`boolean`* = false

*Defined in [class_syntax/property_metadata.ts:8](https://github.com/krnik/vjs-validator/blob/c79d80e/src/class_syntax/property_metadata.ts#L8)*

___
<a id="isconstructorforitems"></a>

###  isConstructorForItems

**● isConstructorForItems**: *`boolean`* = false

*Defined in [class_syntax/property_metadata.ts:14](https://github.com/krnik/vjs-validator/blob/c79d80e/src/class_syntax/property_metadata.ts#L14)*

___
<a id="schema"></a>

###  schema

**● schema**: *[Schema](../interfaces/schema.md)*

*Defined in [class_syntax/property_metadata.ts:9](https://github.com/krnik/vjs-validator/blob/c79d80e/src/class_syntax/property_metadata.ts#L9)*

___
<a id="transformfn"></a>

###  transformFn

**● transformFn**: *[Option](../#option)<[TransformCallback](../#transformcallback)<[Any](../#any), [Any](../#any), [Any](../#any)>>*

*Defined in [class_syntax/property_metadata.ts:11](https://github.com/krnik/vjs-validator/blob/c79d80e/src/class_syntax/property_metadata.ts#L11)*

___

## Methods

<a id="addkeyword"></a>

###  addKeyword

▸ **addKeyword**(keyword: *`string`*, value: *`unknown`*): `this`

*Defined in [class_syntax/property_metadata.ts:24](https://github.com/krnik/vjs-validator/blob/c79d80e/src/class_syntax/property_metadata.ts#L24)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| keyword | `string` |
| value | `unknown` |

**Returns:** `this`

___
<a id="freeze"></a>

###  freeze

▸ **freeze**(): `this`

*Defined in [class_syntax/property_metadata.ts:32](https://github.com/krnik/vjs-validator/blob/c79d80e/src/class_syntax/property_metadata.ts#L32)*

**Returns:** `this`

___
<a id="setvalue"></a>

###  setValue

▸ **setValue**<`K`>(property: *`K`*, value: *`this[K]`*): `this`

*Defined in [class_syntax/property_metadata.ts:16](https://github.com/krnik/vjs-validator/blob/c79d80e/src/class_syntax/property_metadata.ts#L16)*

**Type parameters:**

#### K :  `keyof this`
**Parameters:**

| Name | Type |
| ------ | ------ |
| property | `K` |
| value | `this[K]` |

**Returns:** `this`

___

