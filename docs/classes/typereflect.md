[JBQDocs](../README.md) > [TypeReflect](../classes/typereflect.md)

# Class: TypeReflect

Utility class that reduces the boilerplate code. It enables easy `if` statement assessments.

## Hierarchy

**TypeReflect**

## Index

### Methods

* [array](typereflect.md#array)
* [arrayOf](typereflect.md#arrayof)
* [bigInt](typereflect.md#bigint)
* [boolean](typereflect.md#boolean)
* [instance](typereflect.md#instance)
* [number](typereflect.md#number)
* [object](typereflect.md#object)
* [objectProps](typereflect.md#objectprops)
* [primitiveLiteral](typereflect.md#primitiveliteral)
* [string](typereflect.md#string)
* [symbol](typereflect.md#symbol)

---

## Methods

<a id="array"></a>

### `<Static>` array

▸ **array**<`T`>(value: *`unknown`*, allowEmpty?: *`undefined` \| `false` \| `true`*): `boolean`

*Defined in [util/type_reflect.ts:43](https://github.com/krnik/vjs-validator/blob/c79d80e/src/util/type_reflect.ts#L43)*

**Type parameters:**

#### T 
**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `unknown` |
| `Optional` allowEmpty | `undefined` \| `false` \| `true` |

**Returns:** `boolean`

___
<a id="arrayof"></a>

### `<Static>` arrayOf

▸ **arrayOf**<`T`>(value: *`unknown`*, elemCheck: *`function`*, allowEmpty?: *`undefined` \| `false` \| `true`*): `boolean`

*Defined in [util/type_reflect.ts:47](https://github.com/krnik/vjs-validator/blob/c79d80e/src/util/type_reflect.ts#L47)*

**Type parameters:**

#### T 
**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `unknown` |
| elemCheck | `function` |
| `Optional` allowEmpty | `undefined` \| `false` \| `true` |

**Returns:** `boolean`

___
<a id="bigint"></a>

### `<Static>` bigInt

▸ **bigInt**(value: *`unknown`*): `boolean`

*Defined in [util/type_reflect.ts:18](https://github.com/krnik/vjs-validator/blob/c79d80e/src/util/type_reflect.ts#L18)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `unknown` |

**Returns:** `boolean`

___
<a id="boolean"></a>

### `<Static>` boolean

▸ **boolean**(value: *`unknown`*): `boolean`

*Defined in [util/type_reflect.ts:10](https://github.com/krnik/vjs-validator/blob/c79d80e/src/util/type_reflect.ts#L10)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `unknown` |

**Returns:** `boolean`

___
<a id="instance"></a>

### `<Static>` instance

▸ **instance**<`T`>(value: *`unknown`*, constructor: *`T`*): `boolean`

*Defined in [util/type_reflect.ts:57](https://github.com/krnik/vjs-validator/blob/c79d80e/src/util/type_reflect.ts#L57)*

**Type parameters:**

#### T :  [Constructor](../interfaces/constructor.md)
**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `unknown` |
| constructor | `T` |

**Returns:** `boolean`

___
<a id="number"></a>

### `<Static>` number

▸ **number**(value: *`unknown`*): `boolean`

*Defined in [util/type_reflect.ts:14](https://github.com/krnik/vjs-validator/blob/c79d80e/src/util/type_reflect.ts#L14)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `unknown` |

**Returns:** `boolean`

___
<a id="object"></a>

### `<Static>` object

▸ **object**<`T`>(value: *`unknown`*): `boolean`

*Defined in [util/type_reflect.ts:30](https://github.com/krnik/vjs-validator/blob/c79d80e/src/util/type_reflect.ts#L30)*

**Type parameters:**

#### T :  `object`
**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `unknown` |

**Returns:** `boolean`

___
<a id="objectprops"></a>

### `<Static>` objectProps

▸ **objectProps**<`P`,`V`>(value: *`unknown`*, keys: *`P`[]*): `boolean`

*Defined in [util/type_reflect.ts:34](https://github.com/krnik/vjs-validator/blob/c79d80e/src/util/type_reflect.ts#L34)*

**Type parameters:**

#### P :  `string`
#### V 
**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `unknown` |
| keys | `P`[] |

**Returns:** `boolean`

___
<a id="primitiveliteral"></a>

### `<Static>` primitiveLiteral

▸ **primitiveLiteral**(value: *`unknown`*): `boolean`

*Defined in [util/type_reflect.ts:70](https://github.com/krnik/vjs-validator/blob/c79d80e/src/util/type_reflect.ts#L70)*

This function will return true if it's possible to represent `value` argument as a literal.

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `unknown` |

**Returns:** `boolean`

___
<a id="string"></a>

### `<Static>` string

▸ **string**(value: *`unknown`*): `boolean`

*Defined in [util/type_reflect.ts:22](https://github.com/krnik/vjs-validator/blob/c79d80e/src/util/type_reflect.ts#L22)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `unknown` |

**Returns:** `boolean`

___
<a id="symbol"></a>

### `<Static>` symbol

▸ **symbol**(value: *`unknown`*): `boolean`

*Defined in [util/type_reflect.ts:26](https://github.com/krnik/vjs-validator/blob/c79d80e/src/util/type_reflect.ts#L26)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `unknown` |

**Returns:** `boolean`

___

