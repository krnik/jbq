[JBQDocs](../README.md) > [ValidatorBuilder](../classes/validatorbuilder.md)

# Class: ValidatorBuilder

## Hierarchy

**ValidatorBuilder**

## Index

### Constructors

* [constructor](validatorbuilder.md#constructor)

### Properties

* [metadata](validatorbuilder.md#metadata)
* [propertiesMetadata](validatorbuilder.md#propertiesmetadata)

### Methods

* [addKeyword](validatorbuilder.md#addkeyword)
* [buildSchema](validatorbuilder.md#buildschema)
* [freeze](validatorbuilder.md#freeze)
* [getMeta](validatorbuilder.md#getmeta)
* [getPropertyMetadata](validatorbuilder.md#getpropertymetadata)
* [extract](validatorbuilder.md#extract)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new ValidatorBuilder**(): [ValidatorBuilder](validatorbuilder.md)

*Defined in [class_syntax/validator_builder.ts:33](https://github.com/krnik/vjs-validator/blob/c79d80e/src/class_syntax/validator_builder.ts#L33)*

**Returns:** [ValidatorBuilder](validatorbuilder.md)

___

## Properties

<a id="metadata"></a>

### `<Private>` metadata

**● metadata**: *[ClassMetadata](../interfaces/classmetadata.md)*

*Defined in [class_syntax/validator_builder.ts:32](https://github.com/krnik/vjs-validator/blob/c79d80e/src/class_syntax/validator_builder.ts#L32)*

___
<a id="propertiesmetadata"></a>

### `<Private>` propertiesMetadata

**● propertiesMetadata**: *`Map`<`string` \| `symbol`, [PropertyMetadata](propertymetadata.md)>* =  new Map()

*Defined in [class_syntax/validator_builder.ts:33](https://github.com/krnik/vjs-validator/blob/c79d80e/src/class_syntax/validator_builder.ts#L33)*

___

## Methods

<a id="addkeyword"></a>

###  addKeyword

▸ **addKeyword**(keyword: *`string`*, value: *`unknown`*): `this`

*Defined in [class_syntax/validator_builder.ts:58](https://github.com/krnik/vjs-validator/blob/c79d80e/src/class_syntax/validator_builder.ts#L58)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| keyword | `string` |
| value | `unknown` |

**Returns:** `this`

___
<a id="buildschema"></a>

###  buildSchema

▸ **buildSchema**(): `this`

*Defined in [class_syntax/validator_builder.ts:66](https://github.com/krnik/vjs-validator/blob/c79d80e/src/class_syntax/validator_builder.ts#L66)*

**Returns:** `this`

___
<a id="freeze"></a>

### `<Private>` freeze

▸ **freeze**(): `void`

*Defined in [class_syntax/validator_builder.ts:96](https://github.com/krnik/vjs-validator/blob/c79d80e/src/class_syntax/validator_builder.ts#L96)*

**Returns:** `void`

___
<a id="getmeta"></a>

###  getMeta

▸ **getMeta**(): [[ClassMetadata](../interfaces/classmetadata.md), `Map`<`string` \| `symbol`, [PropertyMetadata](propertymetadata.md)>]

*Defined in [class_syntax/validator_builder.ts:54](https://github.com/krnik/vjs-validator/blob/c79d80e/src/class_syntax/validator_builder.ts#L54)*

**Returns:** [[ClassMetadata](../interfaces/classmetadata.md), `Map`<`string` \| `symbol`, [PropertyMetadata](propertymetadata.md)>]

___
<a id="getpropertymetadata"></a>

###  getPropertyMetadata

▸ **getPropertyMetadata**(property: *`string` \| `symbol`*): [PropertyMetadata](propertymetadata.md)

*Defined in [class_syntax/validator_builder.ts:45](https://github.com/krnik/vjs-validator/blob/c79d80e/src/class_syntax/validator_builder.ts#L45)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| property | `string` \| `symbol` |

**Returns:** [PropertyMetadata](propertymetadata.md)

___
<a id="extract"></a>

### `<Static>` extract

▸ **extract**(ctr: *`Function`*): [ValidatorBuilder](validatorbuilder.md)

*Defined in [class_syntax/validator_builder.ts:23](https://github.com/krnik/vjs-validator/blob/c79d80e/src/class_syntax/validator_builder.ts#L23)*

Appends ValidatorBuilder instance to the constructor if does not exists. Returns ValidatorBuilder instance assigned to the provided class.

**Parameters:**

| Name | Type |
| ------ | ------ |
| ctr | `Function` |

**Returns:** [ValidatorBuilder](validatorbuilder.md)

___

