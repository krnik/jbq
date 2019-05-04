[jbq](../README.md) > [TypeReflect](../classes/typereflect.md)

# Class: TypeReflect

Utility class that reduces the boilerplate code. It enables easy `if` statement assessments.

Examples
========

```
const array: unkown = [10, 20, 30];
if (TypeReflect.arrayOf(array, TypeReflect.string)) {
    // inside this block TypeScript will infer
    // that the array is of type string[]
}

const checkIfUser = (v: unknown): v is User => {
    // if v is a User object return true
}
const responseBody: unknown = {};
if (TypeReflect.objectShape(responseBody, checkIfUser)) {
    // inside this block TypeScript will infer
    // that the responseBody is User object
}
```

## Hierarchy

**TypeReflect**

## Index

### Methods

* [array](typereflect.md#array)
* [arrayOf](typereflect.md#arrayof)
* [asString](typereflect.md#asstring)
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

*Defined in [util/type_reflect.ts:60](https://github.com/krnik/vjs-validator/blob/15e769b/src/util/type_reflect.ts#L60)*

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

*Defined in [util/type_reflect.ts:64](https://github.com/krnik/vjs-validator/blob/15e769b/src/util/type_reflect.ts#L64)*

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
<a id="asstring"></a>

### `<Static>` asString

▸ **asString**(str: *`string`*): `string`

*Defined in [util/type_reflect.ts:100](https://github.com/krnik/vjs-validator/blob/15e769b/src/util/type_reflect.ts#L100)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| str | `string` |

**Returns:** `string`

___
<a id="bigint"></a>

### `<Static>` bigInt

▸ **bigInt**(value: *`unknown`*): `boolean`

*Defined in [util/type_reflect.ts:35](https://github.com/krnik/vjs-validator/blob/15e769b/src/util/type_reflect.ts#L35)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `unknown` |

**Returns:** `boolean`

___
<a id="boolean"></a>

### `<Static>` boolean

▸ **boolean**(value: *`unknown`*): `boolean`

*Defined in [util/type_reflect.ts:27](https://github.com/krnik/vjs-validator/blob/15e769b/src/util/type_reflect.ts#L27)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `unknown` |

**Returns:** `boolean`

___
<a id="instance"></a>

### `<Static>` instance

▸ **instance**<`T`>(value: *`unknown`*, constructor: *`T`*): `boolean`

*Defined in [util/type_reflect.ts:74](https://github.com/krnik/vjs-validator/blob/15e769b/src/util/type_reflect.ts#L74)*

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

*Defined in [util/type_reflect.ts:31](https://github.com/krnik/vjs-validator/blob/15e769b/src/util/type_reflect.ts#L31)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `unknown` |

**Returns:** `boolean`

___
<a id="object"></a>

### `<Static>` object

▸ **object**<`T`>(value: *`unknown`*): `boolean`

*Defined in [util/type_reflect.ts:47](https://github.com/krnik/vjs-validator/blob/15e769b/src/util/type_reflect.ts#L47)*

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

*Defined in [util/type_reflect.ts:51](https://github.com/krnik/vjs-validator/blob/15e769b/src/util/type_reflect.ts#L51)*

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

*Defined in [util/type_reflect.ts:87](https://github.com/krnik/vjs-validator/blob/15e769b/src/util/type_reflect.ts#L87)*

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

*Defined in [util/type_reflect.ts:39](https://github.com/krnik/vjs-validator/blob/15e769b/src/util/type_reflect.ts#L39)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `unknown` |

**Returns:** `boolean`

___
<a id="symbol"></a>

### `<Static>` symbol

▸ **symbol**(value: *`unknown`*): `boolean`

*Defined in [util/type_reflect.ts:43](https://github.com/krnik/vjs-validator/blob/15e769b/src/util/type_reflect.ts#L43)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `unknown` |

**Returns:** `boolean`

___

