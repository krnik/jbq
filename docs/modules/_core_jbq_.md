[jbq](../README.md) > ["core/jbq"](../modules/_core_jbq_.md)

# External module: "core/jbq"

## Index

### Type aliases

* [AsyncValidationFunction](_core_jbq_.md#asyncvalidationfunction)
* [SyncValidationFunction](_core_jbq_.md#syncvalidationfunction)
* [ValidationFn](_core_jbq_.md#validationfn)
* [Validators](_core_jbq_.md#validators)

### Variables

* [AsyncFnConstructor](_core_jbq_.md#asyncfnconstructor)

### Functions

* [jbq](_core_jbq_.md#jbq)

---

## Type aliases

<a id="asyncvalidationfunction"></a>

###  AsyncValidationFunction

**Ƭ AsyncValidationFunction**: *`function`*

*Defined in [core/jbq.ts:10](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/jbq.ts#L10)*

#### Type declaration
▸(data: *`unknown`*): `Promise`<`string` \| `undefined`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| data | `unknown` |

**Returns:** `Promise`<`string` \| `undefined`>

___
<a id="syncvalidationfunction"></a>

###  SyncValidationFunction

**Ƭ SyncValidationFunction**: *`function`*

*Defined in [core/jbq.ts:9](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/jbq.ts#L9)*

#### Type declaration
▸(data: *`unknown`*): `string` \| `undefined`

**Parameters:**

| Name | Type |
| ------ | ------ |
| data | `unknown` |

**Returns:** `string` \| `undefined`

___
<a id="validationfn"></a>

###  ValidationFn

**Ƭ ValidationFn**: *`ValidationFn<T>`*

*Defined in [core/jbq.ts:12](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/jbq.ts#L12)*

___
<a id="validators"></a>

###  Validators

**Ƭ Validators**: *`object`*

*Defined in [core/jbq.ts:18](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/jbq.ts#L18)*

#### Type declaration

___

## Variables

<a id="asyncfnconstructor"></a>

### `<Const>` AsyncFnConstructor

**● AsyncFnConstructor**: *`any`* =  Object.getPrototypeOf(async function*(): unknown {}).constructor

*Defined in [core/jbq.ts:7](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/jbq.ts#L7)*

___

## Functions

<a id="jbq"></a>

###  jbq

▸ **jbq**<`T`,`K`,`O`>(types: *[TypeWrapper](../classes/_core_type_wrapper_.typewrapper.md)*, schemas: *`T`*, options?: *[O]()*): [Validators](_core_jbq_.md#validators)<`T`, `O`>

*Defined in [core/jbq.ts:20](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/jbq.ts#L20)*

**Type parameters:**

#### T 
#### K :  `keyof OmitSymbols<T>`
#### O :  [JBQOptions](../interfaces/_misc_typings_.jbqoptions.md)
**Parameters:**

| Name | Type |
| ------ | ------ |
| types | [TypeWrapper](../classes/_core_type_wrapper_.typewrapper.md) |
| schemas | `T` |
| `Optional` options | [O]() |

**Returns:** [Validators](_core_jbq_.md#validators)<`T`, `O`>

___

