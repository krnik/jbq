[JBQDocs](../README.md) > [ClassValidatorBuilder](../classes/classvalidatorbuilder.md)

# Class: ClassValidatorBuilder

Utility class used to build schema for a class.

## Hierarchy

**ClassValidatorBuilder**

## Index

### Constructors

* [constructor](classvalidatorbuilder.md#constructor)

### Properties

* [constr](classvalidatorbuilder.md#constr)
* [propertyMeta](classvalidatorbuilder.md#propertymeta)
* [schema](classvalidatorbuilder.md#schema)

### Methods

* [addDefault](classvalidatorbuilder.md#adddefault)
* [addTransform](classvalidatorbuilder.md#addtransform)
* [append](classvalidatorbuilder.md#append)
* [appendToSubSchema](classvalidatorbuilder.md#appendtosubschema)
* [ensureProperty](classvalidatorbuilder.md#ensureproperty)
* [getMeta](classvalidatorbuilder.md#getmeta)
* [getSchema](classvalidatorbuilder.md#getschema)
* [getSubSchemas](classvalidatorbuilder.md#getsubschemas)
* [mergeSchema](classvalidatorbuilder.md#mergeschema)
* [setSymbolSchemaProperty](classvalidatorbuilder.md#setsymbolschemaproperty)
* [shouldCreateInstance](classvalidatorbuilder.md#shouldcreateinstance)
* [updateMeta](classvalidatorbuilder.md#updatemeta)
* [extract](classvalidatorbuilder.md#extract)
* [shouldInstantiate](classvalidatorbuilder.md#shouldinstantiate)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new ClassValidatorBuilder**(constructor: *[Constructor](../interfaces/constructor.md)*): [ClassValidatorBuilder](classvalidatorbuilder.md)

*Defined in [class_syntax/class_validator_builder.ts:56](https://github.com/krnik/vjs-validator/blob/ac18222/src/class_syntax/class_validator_builder.ts#L56)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| constructor | [Constructor](../interfaces/constructor.md) |

**Returns:** [ClassValidatorBuilder](classvalidatorbuilder.md)

___

## Properties

<a id="constr"></a>

### `<Private>` constr

**● constr**: *[Constructor](../interfaces/constructor.md)*

*Defined in [class_syntax/class_validator_builder.ts:56](https://github.com/krnik/vjs-validator/blob/ac18222/src/class_syntax/class_validator_builder.ts#L56)*

Reference to the Constructor function

___
<a id="propertymeta"></a>

### `<Private>` propertyMeta

**● propertyMeta**: *`Map`<[Property](../#property), [PropertyMeta](../interfaces/propertymeta.md)>* =  new Map()

*Defined in [class_syntax/class_validator_builder.ts:53](https://github.com/krnik/vjs-validator/blob/ac18222/src/class_syntax/class_validator_builder.ts#L53)*

Set of all decorated properties.

___
<a id="schema"></a>

### `<Private>` schema

**● schema**: *[Schema](../interfaces/schema.md)*

*Defined in [class_syntax/class_validator_builder.ts:48](https://github.com/krnik/vjs-validator/blob/ac18222/src/class_syntax/class_validator_builder.ts#L48)*

Object storing schema definition.

___

## Methods

<a id="adddefault"></a>

###  addDefault

▸ **addDefault**(this: *[ClassValidatorBuilder](classvalidatorbuilder.md)*, property: *[Property](../#property)*, fn: *`CallableFunction`*): `void`

*Defined in [class_syntax/class_validator_builder.ts:264](https://github.com/krnik/vjs-validator/blob/ac18222/src/class_syntax/class_validator_builder.ts#L264)*

Add function that will produce default value for a `property`.

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [ClassValidatorBuilder](classvalidatorbuilder.md) |
| property | [Property](../#property) |
| fn | `CallableFunction` |

**Returns:** `void`

___
<a id="addtransform"></a>

###  addTransform

▸ **addTransform**(this: *[ClassValidatorBuilder](classvalidatorbuilder.md)*, property: *[Property](../#property)*, fn: *`CallableFunction`*): `void`

*Defined in [class_syntax/class_validator_builder.ts:269](https://github.com/krnik/vjs-validator/blob/ac18222/src/class_syntax/class_validator_builder.ts#L269)*

Add function that will transform value of a `property`.

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [ClassValidatorBuilder](classvalidatorbuilder.md) |
| property | [Property](../#property) |
| fn | `CallableFunction` |

**Returns:** `void`

___
<a id="append"></a>

###  append

▸ **append**(this: *[ClassValidatorBuilder](classvalidatorbuilder.md)*, schemaProperty: *[Property](../#property)*, schemaValue: *`unknown`*): [ClassValidatorBuilder](classvalidatorbuilder.md)

*Defined in [class_syntax/class_validator_builder.ts:127](https://github.com/krnik/vjs-validator/blob/ac18222/src/class_syntax/class_validator_builder.ts#L127)*

Adds a property to a schema at the root level.

Examples
========

```
 const builder = ClassValidatorBuilder.extract(SomeClass);
 Object.getOwnPropertyNames(builder.schema); // ['type']
 // schema
 { type: 'object' };

 builder.append('volume', '100m3');
 Object.getOwnPropertyNames(builder.schema); // ['type', 'volume']
 // schema
 {
     type: 'object',
     volume: '100m3',
 };
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [ClassValidatorBuilder](classvalidatorbuilder.md) |
| schemaProperty | [Property](../#property) |
| schemaValue | `unknown` |

**Returns:** [ClassValidatorBuilder](classvalidatorbuilder.md)

___
<a id="appendtosubschema"></a>

###  appendToSubSchema

▸ **appendToSubSchema**(this: *[ClassValidatorBuilder](classvalidatorbuilder.md)*, schemaProperty: *[Property](../#property)*, schemaValue: *`unknown`*, property: *[Property](../#property)*): [ClassValidatorBuilder](classvalidatorbuilder.md)

*Defined in [class_syntax/class_validator_builder.ts:155](https://github.com/krnik/vjs-validator/blob/ac18222/src/class_syntax/class_validator_builder.ts#L155)*

Works similarly to `.append` method but it will append the schema property to one of properties of `Symbol.for('schema_properties')` property builder' schema.

Examples
========

```
 const builder = ClassValidatorBuilder.extract(SomeClass);
 // schema
 { type: 'object' };

 builder.appendToSchema('type', 'string', 'name');
 // schema
 {
     type: 'object',
     [Symbol.for('schema_properties')]: {
         name: { type: 'string' },
     },
 };
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [ClassValidatorBuilder](classvalidatorbuilder.md) |
| schemaProperty | [Property](../#property) |
| schemaValue | `unknown` |
| property | [Property](../#property) |

**Returns:** [ClassValidatorBuilder](classvalidatorbuilder.md)

___
<a id="ensureproperty"></a>

### `<Private>` ensureProperty

▸ **ensureProperty**(this: *[ClassValidatorBuilder](classvalidatorbuilder.md)*, schema: *[SchemaProps](../#schemaprops) \| [Schema](../interfaces/schema.md)*, property: *[Property](../#property)*): `void`

*Defined in [class_syntax/class_validator_builder.ts:170](https://github.com/krnik/vjs-validator/blob/ac18222/src/class_syntax/class_validator_builder.ts#L170)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [ClassValidatorBuilder](classvalidatorbuilder.md) |
| schema | [SchemaProps](../#schemaprops) \| [Schema](../interfaces/schema.md) |
| property | [Property](../#property) |

**Returns:** `void`

___
<a id="getmeta"></a>

###  getMeta

▸ **getMeta**(this: *[ClassValidatorBuilder](classvalidatorbuilder.md)*): `Map`<[Property](../#property), [PropertyMeta](../interfaces/propertymeta.md)>

*Defined in [class_syntax/class_validator_builder.ts:75](https://github.com/krnik/vjs-validator/blob/ac18222/src/class_syntax/class_validator_builder.ts#L75)*

Returns properties property of builder instance.

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [ClassValidatorBuilder](classvalidatorbuilder.md) |

**Returns:** `Map`<[Property](../#property), [PropertyMeta](../interfaces/propertymeta.md)>

___
<a id="getschema"></a>

###  getSchema

▸ **getSchema**(this: *[ClassValidatorBuilder](classvalidatorbuilder.md)*): [Schema](../interfaces/schema.md)

*Defined in [class_syntax/class_validator_builder.ts:70](https://github.com/krnik/vjs-validator/blob/ac18222/src/class_syntax/class_validator_builder.ts#L70)*

Returns schema property of builder instance.

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [ClassValidatorBuilder](classvalidatorbuilder.md) |

**Returns:** [Schema](../interfaces/schema.md)

___
<a id="getsubschemas"></a>

### `<Private>` getSubSchemas

▸ **getSubSchemas**(this: *[ClassValidatorBuilder](classvalidatorbuilder.md)*, property?: *[Property](../#property)*): [SchemaProps](../#schemaprops)

*Defined in [class_syntax/class_validator_builder.ts:283](https://github.com/krnik/vjs-validator/blob/ac18222/src/class_syntax/class_validator_builder.ts#L283)*

Ensures that root schema has `Symbol.for('schema_properties')` property and returns it.

If `property` parameter is supplied then this function ensures that root schemas schema\_properties symbol also has `property` property.

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [ClassValidatorBuilder](classvalidatorbuilder.md) |
| `Optional` property | [Property](../#property) |

**Returns:** [SchemaProps](../#schemaprops)

___
<a id="mergeschema"></a>

### `<Private>` mergeSchema

▸ **mergeSchema**(this: *[ClassValidatorBuilder](classvalidatorbuilder.md)*, target: *[SchemaProps](../#schemaprops)*, source: *[SchemaProps](../#schemaprops)*): [ClassValidatorBuilder](classvalidatorbuilder.md)

*Defined in [class_syntax/class_validator_builder.ts:295](https://github.com/krnik/vjs-validator/blob/ac18222/src/class_syntax/class_validator_builder.ts#L295)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [ClassValidatorBuilder](classvalidatorbuilder.md) |
| target | [SchemaProps](../#schemaprops) |
| source | [SchemaProps](../#schemaprops) |

**Returns:** [ClassValidatorBuilder](classvalidatorbuilder.md)

___
<a id="setsymbolschemaproperty"></a>

###  setSymbolSchemaProperty

▸ **setSymbolSchemaProperty**(this: *[ClassValidatorBuilder](classvalidatorbuilder.md)*, symbol: *`unique symbol` \| `unique symbol`*, sourceConstructor: *[Constructor](../interfaces/constructor.md)*, property?: *[Property](../#property)*): [ClassValidatorBuilder](classvalidatorbuilder.md)

*Defined in [class_syntax/class_validator_builder.ts:186](https://github.com/krnik/vjs-validator/blob/ac18222/src/class_syntax/class_validator_builder.ts#L186)*

This method is used to set either `Symbol.for('schema_properties')` or `Symbol.for('schema_collection')` properties of the builder' schema.

If `property` argument is provided then `Symbol.for('schema_properties')` property will be extended. Otherwise `schema_collection` property will be extended.

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [ClassValidatorBuilder](classvalidatorbuilder.md) |
| symbol | `unique symbol` \| `unique symbol` |
| sourceConstructor | [Constructor](../interfaces/constructor.md) |
| `Optional` property | [Property](../#property) |

**Returns:** [ClassValidatorBuilder](classvalidatorbuilder.md)

___
<a id="shouldcreateinstance"></a>

###  shouldCreateInstance

▸ **shouldCreateInstance**(this: *[ClassValidatorBuilder](classvalidatorbuilder.md)*): `boolean`

*Defined in [class_syntax/class_validator_builder.ts:65](https://github.com/krnik/vjs-validator/blob/ac18222/src/class_syntax/class_validator_builder.ts#L65)*

Returns true if Class is supposed to return instance instead of supplying schema.

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [ClassValidatorBuilder](classvalidatorbuilder.md) |

**Returns:** `boolean`

___
<a id="updatemeta"></a>

### `<Private>` updateMeta

▸ **updateMeta**<`K`,`V`>(this: *[ClassValidatorBuilder](classvalidatorbuilder.md)*, property: *[Property](../#property)*, kind?: *[K]()*, value?: *[V]()*): `void`

*Defined in [class_syntax/class_validator_builder.ts:79](https://github.com/krnik/vjs-validator/blob/ac18222/src/class_syntax/class_validator_builder.ts#L79)*

**Type parameters:**

#### K :  `keyof PropertyMeta`
#### V :  [Option](../#option)<`PropertyMeta[K]`>
**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [ClassValidatorBuilder](classvalidatorbuilder.md) |
| property | [Property](../#property) |
| `Optional` kind | [K]() |
| `Optional` value | [V]() |

**Returns:** `void`

___
<a id="extract"></a>

### `<Static>` extract

▸ **extract**(constructor: *`Function`*): [ClassValidatorBuilder](classvalidatorbuilder.md)

*Defined in [class_syntax/class_validator_builder.ts:34](https://github.com/krnik/vjs-validator/blob/ac18222/src/class_syntax/class_validator_builder.ts#L34)*

Ensures that constructor has a property which is an instance of ClassValidatorBuilder.

**Parameters:**

| Name | Type |
| ------ | ------ |
| constructor | `Function` |

**Returns:** [ClassValidatorBuilder](classvalidatorbuilder.md)

___
<a id="shouldinstantiate"></a>

### `<Static>` shouldInstantiate

▸ **shouldInstantiate**(constructor: *`Function`*): `void`

*Defined in [class_syntax/class_validator_builder.ts:43](https://github.com/krnik/vjs-validator/blob/ac18222/src/class_syntax/class_validator_builder.ts#L43)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| constructor | `Function` |

**Returns:** `void`

___

