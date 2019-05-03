[jbq](../README.md) > ["class_syntax/class_validator_builder"](../modules/_class_syntax_class_validator_builder_.md)

# External module: "class_syntax/class_validator_builder"

## Index

### Classes

* [ClassValidatorBuilder](../classes/_class_syntax_class_validator_builder_.classvalidatorbuilder.md)

### Interfaces

* [PropertyMeta](../interfaces/_class_syntax_class_validator_builder_.propertymeta.md)
* [ValidatorClass](../interfaces/_class_syntax_class_validator_builder_.validatorclass.md)

### Type aliases

* [DefaultCallback](_class_syntax_class_validator_builder_.md#defaultcallback)
* [Property](_class_syntax_class_validator_builder_.md#property)
* [SchemaProps](_class_syntax_class_validator_builder_.md#schemaprops)
* [TransformCallback](_class_syntax_class_validator_builder_.md#transformcallback)

### Variables

* [CREATE_INSTANCE](_class_syntax_class_validator_builder_.md#create_instance)
* [SCHEMA](_class_syntax_class_validator_builder_.md#schema)

---

## Type aliases

<a id="defaultcallback"></a>

###  DefaultCallback

**Ƭ DefaultCallback**: *`function`*

*Defined in [class_syntax/class_validator_builder.ts:18](https://github.com/krnik/vjs-validator/blob/6a6427a/src/class_syntax/class_validator_builder.ts#L18)*

#### Type declaration
▸(data: *`unknown`*): `unknown`

**Parameters:**

| Name | Type |
| ------ | ------ |
| data | `unknown` |

**Returns:** `unknown`

___
<a id="property"></a>

###  Property

**Ƭ Property**: *`string` \| `symbol`*

*Defined in [class_syntax/class_validator_builder.ts:16](https://github.com/krnik/vjs-validator/blob/6a6427a/src/class_syntax/class_validator_builder.ts#L16)*

___
<a id="schemaprops"></a>

###  SchemaProps

**Ƭ SchemaProps**: *`Exclude`<`undefined` \| `object`, `undefined`>*

*Defined in [class_syntax/class_validator_builder.ts:14](https://github.com/krnik/vjs-validator/blob/6a6427a/src/class_syntax/class_validator_builder.ts#L14)*

___
<a id="transformcallback"></a>

###  TransformCallback

**Ƭ TransformCallback**: *`function`*

*Defined in [class_syntax/class_validator_builder.ts:19](https://github.com/krnik/vjs-validator/blob/6a6427a/src/class_syntax/class_validator_builder.ts#L19)*

#### Type declaration
▸(propertyValue: *`unknown`*, data: *`unknown`*): `unknown`

**Parameters:**

| Name | Type |
| ------ | ------ |
| propertyValue | `unknown` |
| data | `unknown` |

**Returns:** `unknown`

___

## Variables

<a id="create_instance"></a>

### `<Const>` CREATE_INSTANCE

**● CREATE_INSTANCE**: *`unique symbol`* =  Symbol('create_instance')

*Defined in [class_syntax/class_validator_builder.ts:7](https://github.com/krnik/vjs-validator/blob/6a6427a/src/class_syntax/class_validator_builder.ts#L7)*

___
<a id="schema"></a>

### `<Const>` SCHEMA

**● SCHEMA**: *`unique symbol`* =  Symbol('schema')

*Defined in [class_syntax/class_validator_builder.ts:6](https://github.com/krnik/vjs-validator/blob/6a6427a/src/class_syntax/class_validator_builder.ts#L6)*

___

