[jbq](../README.md) > ["class_syntax/class_validator_builder"](../modules/_class_syntax_class_validator_builder_.md) > [ClassValidatorBuilder](../classes/_class_syntax_class_validator_builder_.classvalidatorbuilder.md)

# Class: ClassValidatorBuilder

Utility class used to build schema for a class.

## Hierarchy

**ClassValidatorBuilder**

## Index

### Constructors

* [constructor](_class_syntax_class_validator_builder_.classvalidatorbuilder.md#constructor)

### Properties

* [constr](_class_syntax_class_validator_builder_.classvalidatorbuilder.md#constr)
* [propertyMeta](_class_syntax_class_validator_builder_.classvalidatorbuilder.md#propertymeta)
* [schema](_class_syntax_class_validator_builder_.classvalidatorbuilder.md#schema)

### Methods

* [addDefault](_class_syntax_class_validator_builder_.classvalidatorbuilder.md#adddefault)
* [addTransform](_class_syntax_class_validator_builder_.classvalidatorbuilder.md#addtransform)
* [append](_class_syntax_class_validator_builder_.classvalidatorbuilder.md#append)
* [appendToSubSchema](_class_syntax_class_validator_builder_.classvalidatorbuilder.md#appendtosubschema)
* [ensureProperty](_class_syntax_class_validator_builder_.classvalidatorbuilder.md#ensureproperty)
* [getMeta](_class_syntax_class_validator_builder_.classvalidatorbuilder.md#getmeta)
* [getSchema](_class_syntax_class_validator_builder_.classvalidatorbuilder.md#getschema)
* [getSubSchemas](_class_syntax_class_validator_builder_.classvalidatorbuilder.md#getsubschemas)
* [mergeSchema](_class_syntax_class_validator_builder_.classvalidatorbuilder.md#mergeschema)
* [setSymbolSchemaProperty](_class_syntax_class_validator_builder_.classvalidatorbuilder.md#setsymbolschemaproperty)
* [shouldCreateInstance](_class_syntax_class_validator_builder_.classvalidatorbuilder.md#shouldcreateinstance)
* [updateMeta](_class_syntax_class_validator_builder_.classvalidatorbuilder.md#updatemeta)
* [extract](_class_syntax_class_validator_builder_.classvalidatorbuilder.md#extract)
* [shouldInstantiate](_class_syntax_class_validator_builder_.classvalidatorbuilder.md#shouldinstantiate)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new ClassValidatorBuilder**(constructor: *[Constructor](../interfaces/_misc_typings_.constructor.md)*): [ClassValidatorBuilder](_class_syntax_class_validator_builder_.classvalidatorbuilder.md)

*Defined in [class_syntax/class_validator_builder.ts:56](https://github.com/krnik/vjs-validator/blob/6a6427a/src/class_syntax/class_validator_builder.ts#L56)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| constructor | [Constructor](../interfaces/_misc_typings_.constructor.md) |

**Returns:** [ClassValidatorBuilder](_class_syntax_class_validator_builder_.classvalidatorbuilder.md)

___

## Properties

<a id="constr"></a>

### `<Private>` constr

**● constr**: *[Constructor](../interfaces/_misc_typings_.constructor.md)*

*Defined in [class_syntax/class_validator_builder.ts:56](https://github.com/krnik/vjs-validator/blob/6a6427a/src/class_syntax/class_validator_builder.ts#L56)*

Reference to the Constructor function

___
<a id="propertymeta"></a>

### `<Private>` propertyMeta

**● propertyMeta**: *`Map`<[Property](../modules/_class_syntax_class_validator_builder_.md#property), [PropertyMeta](../interfaces/_class_syntax_class_validator_builder_.propertymeta.md)>* =  new Map()

*Defined in [class_syntax/class_validator_builder.ts:53](https://github.com/krnik/vjs-validator/blob/6a6427a/src/class_syntax/class_validator_builder.ts#L53)*

Set of all decorated properties.

___
<a id="schema"></a>

### `<Private>` schema

**● schema**: *[Schema](../interfaces/_core_compilation_interface_schema_interface_.schema.md)*

*Defined in [class_syntax/class_validator_builder.ts:48](https://github.com/krnik/vjs-validator/blob/6a6427a/src/class_syntax/class_validator_builder.ts#L48)*

Object storing schema definition.

___

## Methods

<a id="adddefault"></a>

###  addDefault

▸ **addDefault**(this: *[ClassValidatorBuilder](_class_syntax_class_validator_builder_.classvalidatorbuilder.md)*, property: *[Property](../modules/_class_syntax_class_validator_builder_.md#property)*, fn: *`CallableFunction`*): `void`

*Defined in [class_syntax/class_validator_builder.ts:264](https://github.com/krnik/vjs-validator/blob/6a6427a/src/class_syntax/class_validator_builder.ts#L264)*

Add function that will produce default value for a `property`.

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [ClassValidatorBuilder](_class_syntax_class_validator_builder_.classvalidatorbuilder.md) |
| property | [Property](../modules/_class_syntax_class_validator_builder_.md#property) |
| fn | `CallableFunction` |

**Returns:** `void`

___
<a id="addtransform"></a>

###  addTransform

▸ **addTransform**(this: *[ClassValidatorBuilder](_class_syntax_class_validator_builder_.classvalidatorbuilder.md)*, property: *[Property](../modules/_class_syntax_class_validator_builder_.md#property)*, fn: *`CallableFunction`*): `void`

*Defined in [class_syntax/class_validator_builder.ts:269](https://github.com/krnik/vjs-validator/blob/6a6427a/src/class_syntax/class_validator_builder.ts#L269)*

Add function that will transform value of a `property`.

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [ClassValidatorBuilder](_class_syntax_class_validator_builder_.classvalidatorbuilder.md) |
| property | [Property](../modules/_class_syntax_class_validator_builder_.md#property) |
| fn | `CallableFunction` |

**Returns:** `void`

___
<a id="append"></a>

###  append

▸ **append**(this: *[ClassValidatorBuilder](_class_syntax_class_validator_builder_.classvalidatorbuilder.md)*, schemaProperty: *[Property](../modules/_class_syntax_class_validator_builder_.md#property)*, schemaValue: *`unknown`*): [ClassValidatorBuilder](_class_syntax_class_validator_builder_.classvalidatorbuilder.md)

*Defined in [class_syntax/class_validator_builder.ts:127](https://github.com/krnik/vjs-validator/blob/6a6427a/src/class_syntax/class_validator_builder.ts#L127)*

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
| this | [ClassValidatorBuilder](_class_syntax_class_validator_builder_.classvalidatorbuilder.md) |
| schemaProperty | [Property](../modules/_class_syntax_class_validator_builder_.md#property) |
| schemaValue | `unknown` |

**Returns:** [ClassValidatorBuilder](_class_syntax_class_validator_builder_.classvalidatorbuilder.md)

___
<a id="appendtosubschema"></a>

###  appendToSubSchema

▸ **appendToSubSchema**(this: *[ClassValidatorBuilder](_class_syntax_class_validator_builder_.classvalidatorbuilder.md)*, schemaProperty: *[Property](../modules/_class_syntax_class_validator_builder_.md#property)*, schemaValue: *`unknown`*, property: *[Property](../modules/_class_syntax_class_validator_builder_.md#property)*): [ClassValidatorBuilder](_class_syntax_class_validator_builder_.classvalidatorbuilder.md)

*Defined in [class_syntax/class_validator_builder.ts:155](https://github.com/krnik/vjs-validator/blob/6a6427a/src/class_syntax/class_validator_builder.ts#L155)*

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
| this | [ClassValidatorBuilder](_class_syntax_class_validator_builder_.classvalidatorbuilder.md) |
| schemaProperty | [Property](../modules/_class_syntax_class_validator_builder_.md#property) |
| schemaValue | `unknown` |
| property | [Property](../modules/_class_syntax_class_validator_builder_.md#property) |

**Returns:** [ClassValidatorBuilder](_class_syntax_class_validator_builder_.classvalidatorbuilder.md)

___
<a id="ensureproperty"></a>

### `<Private>` ensureProperty

▸ **ensureProperty**(this: *[ClassValidatorBuilder](_class_syntax_class_validator_builder_.classvalidatorbuilder.md)*, schema: *[SchemaProps](../modules/_class_syntax_class_validator_builder_.md#schemaprops) \| [Schema](../interfaces/_core_compilation_interface_schema_interface_.schema.md)*, property: *[Property](../modules/_class_syntax_class_validator_builder_.md#property)*): `void`

*Defined in [class_syntax/class_validator_builder.ts:170](https://github.com/krnik/vjs-validator/blob/6a6427a/src/class_syntax/class_validator_builder.ts#L170)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [ClassValidatorBuilder](_class_syntax_class_validator_builder_.classvalidatorbuilder.md) |
| schema | [SchemaProps](../modules/_class_syntax_class_validator_builder_.md#schemaprops) \| [Schema](../interfaces/_core_compilation_interface_schema_interface_.schema.md) |
| property | [Property](../modules/_class_syntax_class_validator_builder_.md#property) |

**Returns:** `void`

___
<a id="getmeta"></a>

###  getMeta

▸ **getMeta**(this: *[ClassValidatorBuilder](_class_syntax_class_validator_builder_.classvalidatorbuilder.md)*): `Map`<[Property](../modules/_class_syntax_class_validator_builder_.md#property), [PropertyMeta](../interfaces/_class_syntax_class_validator_builder_.propertymeta.md)>

*Defined in [class_syntax/class_validator_builder.ts:75](https://github.com/krnik/vjs-validator/blob/6a6427a/src/class_syntax/class_validator_builder.ts#L75)*

Returns properties property of builder instance.

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [ClassValidatorBuilder](_class_syntax_class_validator_builder_.classvalidatorbuilder.md) |

**Returns:** `Map`<[Property](../modules/_class_syntax_class_validator_builder_.md#property), [PropertyMeta](../interfaces/_class_syntax_class_validator_builder_.propertymeta.md)>

___
<a id="getschema"></a>

###  getSchema

▸ **getSchema**(this: *[ClassValidatorBuilder](_class_syntax_class_validator_builder_.classvalidatorbuilder.md)*): [Schema](../interfaces/_core_compilation_interface_schema_interface_.schema.md)

*Defined in [class_syntax/class_validator_builder.ts:70](https://github.com/krnik/vjs-validator/blob/6a6427a/src/class_syntax/class_validator_builder.ts#L70)*

Returns schema property of builder instance.

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [ClassValidatorBuilder](_class_syntax_class_validator_builder_.classvalidatorbuilder.md) |

**Returns:** [Schema](../interfaces/_core_compilation_interface_schema_interface_.schema.md)

___
<a id="getsubschemas"></a>

### `<Private>` getSubSchemas

▸ **getSubSchemas**(this: *[ClassValidatorBuilder](_class_syntax_class_validator_builder_.classvalidatorbuilder.md)*, property?: *[Property](../modules/_class_syntax_class_validator_builder_.md#property)*): [SchemaProps](../modules/_class_syntax_class_validator_builder_.md#schemaprops)

*Defined in [class_syntax/class_validator_builder.ts:283](https://github.com/krnik/vjs-validator/blob/6a6427a/src/class_syntax/class_validator_builder.ts#L283)*

Ensures that root schema has `Symbol.for('schema_properties')` property and returns it.

If `property` parameter is supplied then this function ensures that root schemas schema\_properties symbol also has `property` property.

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [ClassValidatorBuilder](_class_syntax_class_validator_builder_.classvalidatorbuilder.md) |
| `Optional` property | [Property](../modules/_class_syntax_class_validator_builder_.md#property) |

**Returns:** [SchemaProps](../modules/_class_syntax_class_validator_builder_.md#schemaprops)

___
<a id="mergeschema"></a>

### `<Private>` mergeSchema

▸ **mergeSchema**(this: *[ClassValidatorBuilder](_class_syntax_class_validator_builder_.classvalidatorbuilder.md)*, target: *[SchemaProps](../modules/_class_syntax_class_validator_builder_.md#schemaprops)*, source: *[SchemaProps](../modules/_class_syntax_class_validator_builder_.md#schemaprops)*): [ClassValidatorBuilder](_class_syntax_class_validator_builder_.classvalidatorbuilder.md)

*Defined in [class_syntax/class_validator_builder.ts:295](https://github.com/krnik/vjs-validator/blob/6a6427a/src/class_syntax/class_validator_builder.ts#L295)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [ClassValidatorBuilder](_class_syntax_class_validator_builder_.classvalidatorbuilder.md) |
| target | [SchemaProps](../modules/_class_syntax_class_validator_builder_.md#schemaprops) |
| source | [SchemaProps](../modules/_class_syntax_class_validator_builder_.md#schemaprops) |

**Returns:** [ClassValidatorBuilder](_class_syntax_class_validator_builder_.classvalidatorbuilder.md)

___
<a id="setsymbolschemaproperty"></a>

###  setSymbolSchemaProperty

▸ **setSymbolSchemaProperty**(this: *[ClassValidatorBuilder](_class_syntax_class_validator_builder_.classvalidatorbuilder.md)*, symbol: *`unique symbol` \| `unique symbol`*, sourceConstructor: *[Constructor](../interfaces/_misc_typings_.constructor.md)*, property?: *[Property](../modules/_class_syntax_class_validator_builder_.md#property)*): [ClassValidatorBuilder](_class_syntax_class_validator_builder_.classvalidatorbuilder.md)

*Defined in [class_syntax/class_validator_builder.ts:186](https://github.com/krnik/vjs-validator/blob/6a6427a/src/class_syntax/class_validator_builder.ts#L186)*

This method is used to set either `Symbol.for('schema_properties')` or `Symbol.for('schema_collection')` properties of the builder' schema.

If `property` argument is provided then `Symbol.for('schema_properties')` property will be extended. Otherwise `schema_collection` property will be extended.

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [ClassValidatorBuilder](_class_syntax_class_validator_builder_.classvalidatorbuilder.md) |
| symbol | `unique symbol` \| `unique symbol` |
| sourceConstructor | [Constructor](../interfaces/_misc_typings_.constructor.md) |
| `Optional` property | [Property](../modules/_class_syntax_class_validator_builder_.md#property) |

**Returns:** [ClassValidatorBuilder](_class_syntax_class_validator_builder_.classvalidatorbuilder.md)

___
<a id="shouldcreateinstance"></a>

###  shouldCreateInstance

▸ **shouldCreateInstance**(this: *[ClassValidatorBuilder](_class_syntax_class_validator_builder_.classvalidatorbuilder.md)*): `boolean`

*Defined in [class_syntax/class_validator_builder.ts:65](https://github.com/krnik/vjs-validator/blob/6a6427a/src/class_syntax/class_validator_builder.ts#L65)*

Returns true if Class is supposed to return instance instead of supplying schema.

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [ClassValidatorBuilder](_class_syntax_class_validator_builder_.classvalidatorbuilder.md) |

**Returns:** `boolean`

___
<a id="updatemeta"></a>

### `<Private>` updateMeta

▸ **updateMeta**<`K`,`V`>(this: *[ClassValidatorBuilder](_class_syntax_class_validator_builder_.classvalidatorbuilder.md)*, property: *[Property](../modules/_class_syntax_class_validator_builder_.md#property)*, kind?: *[K]()*, value?: *[V]()*): `void`

*Defined in [class_syntax/class_validator_builder.ts:79](https://github.com/krnik/vjs-validator/blob/6a6427a/src/class_syntax/class_validator_builder.ts#L79)*

**Type parameters:**

#### K :  `keyof PropertyMeta`
#### V :  [Option](../modules/_misc_typings_.md#option)<`PropertyMeta[K]`>
**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [ClassValidatorBuilder](_class_syntax_class_validator_builder_.classvalidatorbuilder.md) |
| property | [Property](../modules/_class_syntax_class_validator_builder_.md#property) |
| `Optional` kind | [K]() |
| `Optional` value | [V]() |

**Returns:** `void`

___
<a id="extract"></a>

### `<Static>` extract

▸ **extract**(constructor: *`Function`*): [ClassValidatorBuilder](_class_syntax_class_validator_builder_.classvalidatorbuilder.md)

*Defined in [class_syntax/class_validator_builder.ts:34](https://github.com/krnik/vjs-validator/blob/6a6427a/src/class_syntax/class_validator_builder.ts#L34)*

Ensures that constructor has a property which is an instance of ClassValidatorBuilder.

**Parameters:**

| Name | Type |
| ------ | ------ |
| constructor | `Function` |

**Returns:** [ClassValidatorBuilder](_class_syntax_class_validator_builder_.classvalidatorbuilder.md)

___
<a id="shouldinstantiate"></a>

### `<Static>` shouldInstantiate

▸ **shouldInstantiate**(constructor: *`Function`*): `void`

*Defined in [class_syntax/class_validator_builder.ts:43](https://github.com/krnik/vjs-validator/blob/6a6427a/src/class_syntax/class_validator_builder.ts#L43)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| constructor | `Function` |

**Returns:** `void`

___

