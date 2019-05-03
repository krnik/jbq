[jbq](../README.md) > ["misc/typings"](../modules/_misc_typings_.md)

# External module: "misc/typings"

## Index

### Interfaces

* [Constructor](../interfaces/_misc_typings_.constructor.md)
* [DataPath](../interfaces/_misc_typings_.datapath.md)
* [JBQOptions](../interfaces/_misc_typings_.jbqoptions.md)
* [ParseValues](../interfaces/_misc_typings_.parsevalues.md)
* [ParseValuesMinMax](../interfaces/_misc_typings_.parsevaluesminmax.md)
* [SchemaMax](../interfaces/_misc_typings_.schemamax.md)
* [SchemaMin](../interfaces/_misc_typings_.schemamin.md)

### Type aliases

* [ArrIterCallback](_misc_typings_.md#arritercallback)
* [Callback](_misc_typings_.md#callback)
* [DataPathChecker](_misc_typings_.md#datapathchecker)
* [DataPathResolver](_misc_typings_.md#datapathresolver)
* [OmitSymbols](_misc_typings_.md#omitsymbols)
* [Option](_misc_typings_.md#option)
* [SchemaMinMax](_misc_typings_.md#schemaminmax)

---

## Type aliases

<a id="arritercallback"></a>

###  ArrIterCallback

**Ƭ ArrIterCallback**: *`function`*

*Defined in [misc/typings.ts:49](https://github.com/krnik/vjs-validator/blob/6a6427a/src/misc/typings.ts#L49)*

#### Type declaration
▸(elem: *`T`*, index: *`number`*, arr: *`T`[]*): `R`

**Parameters:**

| Name | Type |
| ------ | ------ |
| elem | `T` |
| index | `number` |
| arr | `T`[] |

**Returns:** `R`

___
<a id="callback"></a>

###  Callback

**Ƭ Callback**: *`function`*

*Defined in [misc/typings.ts:47](https://github.com/krnik/vjs-validator/blob/6a6427a/src/misc/typings.ts#L47)*

#### Type declaration
▸(...args: *`any`[]*): `T`

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Rest` args | `any`[] |

**Returns:** `T`

___
<a id="datapathchecker"></a>

###  DataPathChecker

**Ƭ DataPathChecker**: *`function`*

*Defined in [misc/typings.ts:33](https://github.com/krnik/vjs-validator/blob/6a6427a/src/misc/typings.ts#L33)*

#### Type declaration
▸(schemaValue: *`unknown`*): `boolean`

**Parameters:**

| Name | Type |
| ------ | ------ |
| schemaValue | `unknown` |

**Returns:** `boolean`

___
<a id="datapathresolver"></a>

###  DataPathResolver

**Ƭ DataPathResolver**: *`function`*

*Defined in [misc/typings.ts:31](https://github.com/krnik/vjs-validator/blob/6a6427a/src/misc/typings.ts#L31)*

#### Type declaration
▸(schemaValue: *[DataPath](../interfaces/_misc_typings_.datapath.md)*): `string`

**Parameters:**

| Name | Type |
| ------ | ------ |
| schemaValue | [DataPath](../interfaces/_misc_typings_.datapath.md) |

**Returns:** `string`

___
<a id="omitsymbols"></a>

###  OmitSymbols

**Ƭ OmitSymbols**: *`Pick`<`T`, `{ [K in keyof T]: K extends symbol ? never : K; }[keyof T]`>*

*Defined in [misc/typings.ts:5](https://github.com/krnik/vjs-validator/blob/6a6427a/src/misc/typings.ts#L5)*

___
<a id="option"></a>

###  Option

**Ƭ Option**: *`T` \| `undefined`*

*Defined in [misc/typings.ts:3](https://github.com/krnik/vjs-validator/blob/6a6427a/src/misc/typings.ts#L3)*

___
<a id="schemaminmax"></a>

###  SchemaMinMax

**Ƭ SchemaMinMax**: *[SchemaMax](../interfaces/_misc_typings_.schemamax.md) \| [SchemaMin](../interfaces/_misc_typings_.schemamin.md) \| `number` \| [DataPath](../interfaces/_misc_typings_.datapath.md)*

*Defined in [misc/typings.ts:13](https://github.com/krnik/vjs-validator/blob/6a6427a/src/misc/typings.ts#L13)*

___

