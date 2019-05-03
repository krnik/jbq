[jbq](../README.md) > ["type/schema_validator"](../modules/_type_schema_validator_.md)

# External module: "type/schema_validator"

## Index

### Type aliases

* [SchemaValidator](_type_schema_validator_.md#schemavalidator)

### Functions

* [any](_type_schema_validator_.md#any)
* [arrayOf](_type_schema_validator_.md#arrayof)
* [arrayOfPropertyNames](_type_schema_validator_.md#arrayofpropertynames)
* [dataPath](_type_schema_validator_.md#datapath)
* [isInstance](_type_schema_validator_.md#isinstance)
* [minMaxOrNumber](_type_schema_validator_.md#minmaxornumber)
* [primitive](_type_schema_validator_.md#primitive)

### Object literals

* [SchemaValidationError](_type_schema_validator_.md#schemavalidationerror)
* [schemaValidate](_type_schema_validator_.md#schemavalidate)

---

## Type aliases

<a id="schemavalidator"></a>

###  SchemaValidator

**Ƭ SchemaValidator**: *`function`*

*Defined in [type/schema_validator.ts:41](https://github.com/krnik/vjs-validator/blob/6a6427a/src/type/schema_validator.ts#L41)*

#### Type declaration
▸(v: *`unknown`*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| v | `unknown` |

**Returns:** `void`

___

## Functions

<a id="any"></a>

###  any

▸ **any**(typeName: *`string`*, methodName: *`string`*): [SchemaValidator](_type_schema_validator_.md#schemavalidator)

*Defined in [type/schema_validator.ts:197](https://github.com/krnik/vjs-validator/blob/6a6427a/src/type/schema_validator.ts#L197)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| typeName | `string` |
| methodName | `string` |

**Returns:** [SchemaValidator](_type_schema_validator_.md#schemavalidator)

___
<a id="arrayof"></a>

###  arrayOf

▸ **arrayOf**<`T`>(typeName: *`string`*, methodName: *`string`*, elementType: *`T`*): [SchemaValidator](_type_schema_validator_.md#schemavalidator)

*Defined in [type/schema_validator.ts:171](https://github.com/krnik/vjs-validator/blob/6a6427a/src/type/schema_validator.ts#L171)*

**Type parameters:**

#### T :  `keyof TypeReflect`
**Parameters:**

| Name | Type |
| ------ | ------ |
| typeName | `string` |
| methodName | `string` |
| elementType | `T` |

**Returns:** [SchemaValidator](_type_schema_validator_.md#schemavalidator)

___
<a id="arrayofpropertynames"></a>

###  arrayOfPropertyNames

▸ **arrayOfPropertyNames**(typeName: *`string`*, methodName: *`string`*): [SchemaValidator](_type_schema_validator_.md#schemavalidator)

*Defined in [type/schema_validator.ts:142](https://github.com/krnik/vjs-validator/blob/6a6427a/src/type/schema_validator.ts#L142)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| typeName | `string` |
| methodName | `string` |

**Returns:** [SchemaValidator](_type_schema_validator_.md#schemavalidator)

___
<a id="datapath"></a>

###  dataPath

▸ **dataPath**(schemaValue: *`unknown`*): `boolean`

*Defined in [type/schema_validator.ts:32](https://github.com/krnik/vjs-validator/blob/6a6427a/src/type/schema_validator.ts#L32)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| schemaValue | `unknown` |

**Returns:** `boolean`

___
<a id="isinstance"></a>

###  isInstance

▸ **isInstance**(typeName: *`string`*, methodName: *`string`*, constructor: *[Constructor](../interfaces/_misc_typings_.constructor.md)*): [SchemaValidator](_type_schema_validator_.md#schemavalidator)

*Defined in [type/schema_validator.ts:64](https://github.com/krnik/vjs-validator/blob/6a6427a/src/type/schema_validator.ts#L64)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| typeName | `string` |
| methodName | `string` |
| constructor | [Constructor](../interfaces/_misc_typings_.constructor.md) |

**Returns:** [SchemaValidator](_type_schema_validator_.md#schemavalidator)

___
<a id="minmaxornumber"></a>

###  minMaxOrNumber

▸ **minMaxOrNumber**(typeName: *`string`*, methodName: *`string`*, acceptDataPath?: *`undefined` \| `false` \| `true`*): [SchemaValidator](_type_schema_validator_.md#schemavalidator)

*Defined in [type/schema_validator.ts:82](https://github.com/krnik/vjs-validator/blob/6a6427a/src/type/schema_validator.ts#L82)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| typeName | `string` |
| methodName | `string` |
| `Optional` acceptDataPath | `undefined` \| `false` \| `true` |

**Returns:** [SchemaValidator](_type_schema_validator_.md#schemavalidator)

___
<a id="primitive"></a>

###  primitive

▸ **primitive**<`T`>(typeName: *`string`*, methodName: *`string`*, type: *`T`*, acceptDataPath?: *`undefined` \| `false` \| `true`*): [SchemaValidator](_type_schema_validator_.md#schemavalidator)

*Defined in [type/schema_validator.ts:43](https://github.com/krnik/vjs-validator/blob/6a6427a/src/type/schema_validator.ts#L43)*

**Type parameters:**

#### T :  `keyof TypeReflect`
**Parameters:**

| Name | Type |
| ------ | ------ |
| typeName | `string` |
| methodName | `string` |
| type | `T` |
| `Optional` acceptDataPath | `undefined` \| `false` \| `true` |

**Returns:** [SchemaValidator](_type_schema_validator_.md#schemavalidator)

___

## Object literals

<a id="schemavalidationerror"></a>

### `<Const>` SchemaValidationError

**SchemaValidationError**: *`object`*

*Defined in [type/schema_validator.ts:6](https://github.com/krnik/vjs-validator/blob/6a6427a/src/type/schema_validator.ts#L6)*

<a id="schemavalidationerror.invalidschematype"></a>

####  invalidSchemaType

▸ **invalidSchemaType**(typeName: *`string`*, methodName: *`string`*, expectedType: *`string`*, type: *`string`*): `Error`

*Defined in [type/schema_validator.ts:15](https://github.com/krnik/vjs-validator/blob/6a6427a/src/type/schema_validator.ts#L15)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| typeName | `string` |
| methodName | `string` |
| expectedType | `string` |
| type | `string` |

**Returns:** `Error`

___
<a id="schemavalidationerror.missingargument"></a>

####  missingArgument

▸ **missingArgument**(typeName: *`string`*, methodName: *`string`*): `Error`

*Defined in [type/schema_validator.ts:7](https://github.com/krnik/vjs-validator/blob/6a6427a/src/type/schema_validator.ts#L7)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| typeName | `string` |
| methodName | `string` |

**Returns:** `Error`

___

___
<a id="schemavalidate"></a>

### `<Const>` schemaValidate

**schemaValidate**: *`object`*

*Defined in [type/schema_validator.ts:205](https://github.com/krnik/vjs-validator/blob/6a6427a/src/type/schema_validator.ts#L205)*

<a id="schemavalidate.any-1"></a>

####  any

**● any**: *[any](_type_schema_validator_.md#any)*

*Defined in [type/schema_validator.ts:206](https://github.com/krnik/vjs-validator/blob/6a6427a/src/type/schema_validator.ts#L206)*

___
<a id="schemavalidate.arrayof-1"></a>

####  arrayOf

**● arrayOf**: *[arrayOf](_type_schema_validator_.md#arrayof)*

*Defined in [type/schema_validator.ts:207](https://github.com/krnik/vjs-validator/blob/6a6427a/src/type/schema_validator.ts#L207)*

___
<a id="schemavalidate.arrayofpropertynames-1"></a>

####  arrayOfPropertyNames

**● arrayOfPropertyNames**: *[arrayOfPropertyNames](_type_schema_validator_.md#arrayofpropertynames)*

*Defined in [type/schema_validator.ts:212](https://github.com/krnik/vjs-validator/blob/6a6427a/src/type/schema_validator.ts#L212)*

___
<a id="schemavalidate.datapath-1"></a>

####  dataPath

**● dataPath**: *[dataPath](_type_schema_validator_.md#datapath)*

*Defined in [type/schema_validator.ts:208](https://github.com/krnik/vjs-validator/blob/6a6427a/src/type/schema_validator.ts#L208)*

___
<a id="schemavalidate.isinstance-1"></a>

####  isInstance

**● isInstance**: *[isInstance](_type_schema_validator_.md#isinstance)*

*Defined in [type/schema_validator.ts:210](https://github.com/krnik/vjs-validator/blob/6a6427a/src/type/schema_validator.ts#L210)*

___
<a id="schemavalidate.minmaxornumber-1"></a>

####  minMaxOrNumber

**● minMaxOrNumber**: *[minMaxOrNumber](_type_schema_validator_.md#minmaxornumber)*

*Defined in [type/schema_validator.ts:211](https://github.com/krnik/vjs-validator/blob/6a6427a/src/type/schema_validator.ts#L211)*

___
<a id="schemavalidate.primitive-1"></a>

####  primitive

**● primitive**: *[primitive](_type_schema_validator_.md#primitive)*

*Defined in [type/schema_validator.ts:209](https://github.com/krnik/vjs-validator/blob/6a6427a/src/type/schema_validator.ts#L209)*

___

___

