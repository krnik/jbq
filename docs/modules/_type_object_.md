[jbq](../README.md) > ["type/object"](../modules/_type_object_.md)

# External module: "type/object"

## Index

### Type aliases

* [Macro](_type_object_.md#macro)

### Functions

* [createPropKeyCountMacro](_type_object_.md#createpropkeycountmacro)

### Object literals

* [TypeObject](_type_object_.md#typeobject)

---

## Type aliases

<a id="macro"></a>

###  Macro

**Ƭ Macro**: *`function`*

*Defined in [type/object.ts:19](https://github.com/krnik/vjs-validator/blob/6a6427a/src/type/object.ts#L19)*

#### Type declaration
▸(p: *[ParseValuesMinMax](../interfaces/_misc_typings_.parsevaluesminmax.md)*, c: *[DataPathChecker](_misc_typings_.md#datapathchecker)*, r: *[DataPathResolver](_misc_typings_.md#datapathresolver)*): `string` \| `undefined`

**Parameters:**

| Name | Type |
| ------ | ------ |
| p | [ParseValuesMinMax](../interfaces/_misc_typings_.parsevaluesminmax.md) |
| c | [DataPathChecker](_misc_typings_.md#datapathchecker) |
| r | [DataPathResolver](_misc_typings_.md#datapathresolver) |

**Returns:** `string` \| `undefined`

___

## Functions

<a id="createpropkeycountmacro"></a>

###  createPropKeyCountMacro

▸ **createPropKeyCountMacro**(resolveDataVarCmp: *`function`*): [Macro](_type_object_.md#macro)

*Defined in [type/object.ts:21](https://github.com/krnik/vjs-validator/blob/6a6427a/src/type/object.ts#L21)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| resolveDataVarCmp | `function` |

**Returns:** [Macro](_type_object_.md#macro)

___

## Object literals

<a id="typeobject"></a>

### `<Const>` TypeObject

**TypeObject**: *`object`*

*Defined in [type/object.ts:113](https://github.com/krnik/vjs-validator/blob/6a6427a/src/type/object.ts#L113)*

<a id="typeobject.__computed"></a>

####  __computed

▸ **__computed**(_schemaValue: *`string`*, $DATA: *`unknown`*): `string` \| `void`

*Defined in [type/object.ts:114](https://github.com/krnik/vjs-validator/blob/6a6427a/src/type/object.ts#L114)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| _schemaValue | `string` |
| $DATA | `unknown` |

**Returns:** `string` \| `void`

<a id="typeobject.__computed.__computed-1"></a>

####  __computed

**● __computed**: *`function`* =  schemaValidate.minMaxOrNumber(TYPE_NAME.OBJECT, PROP_COUNT, true)

*Defined in [type/object.ts:137](https://github.com/krnik/vjs-validator/blob/6a6427a/src/type/object.ts#L137)*
*Defined in [type/object.ts:138](https://github.com/krnik/vjs-validator/blob/6a6427a/src/type/object.ts#L138)*
*Defined in [type/object.ts:139](https://github.com/krnik/vjs-validator/blob/6a6427a/src/type/object.ts#L139)*
*Defined in [type/object.ts:140](https://github.com/krnik/vjs-validator/blob/6a6427a/src/type/object.ts#L140)*
*Defined in [type/object.ts:141](https://github.com/krnik/vjs-validator/blob/6a6427a/src/type/object.ts#L141)*
*Defined in [type/object.ts:142](https://github.com/krnik/vjs-validator/blob/6a6427a/src/type/object.ts#L142)*

#### Type declaration
▸(v: *`unknown`*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| v | `unknown` |

**Returns:** `void`

___

___

___

