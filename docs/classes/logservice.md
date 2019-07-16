[JBQDocs](../README.md) > [LogService](../classes/logservice.md)

# Class: LogService

## Hierarchy

**LogService**

## Index

### Constructors

* [constructor](logservice.md#constructor)

### Properties

* [active](logservice.md#active)
* [indent](logservice.md#indent)

### Methods

* [incIndent](logservice.md#incindent)
* [log](logservice.md#log)
* [property](logservice.md#property)
* [schema](logservice.md#schema)
* [setLogger](logservice.md#setlogger)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new LogService**(active: *`boolean`*): [LogService](logservice.md)

*Defined in [util/log_service.ts:15](https://github.com/krnik/vjs-validator/blob/c79d80e/src/util/log_service.ts#L15)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| active | `boolean` |

**Returns:** [LogService](logservice.md)

___

## Properties

<a id="active"></a>

### `<Private>` active

**● active**: *`boolean`* = false

*Defined in [util/log_service.ts:14](https://github.com/krnik/vjs-validator/blob/c79d80e/src/util/log_service.ts#L14)*

___
<a id="indent"></a>

### `<Private>` indent

**● indent**: *`number`* = 0

*Defined in [util/log_service.ts:15](https://github.com/krnik/vjs-validator/blob/c79d80e/src/util/log_service.ts#L15)*

___

## Methods

<a id="incindent"></a>

###  incIndent

▸ **incIndent**(v: *`number`*): `void`

*Defined in [util/log_service.ts:21](https://github.com/krnik/vjs-validator/blob/c79d80e/src/util/log_service.ts#L21)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| v | `number` |

**Returns:** `void`

___
<a id="log"></a>

### `<Private>` log

▸ **log**(message: *`string`*): `void`

*Defined in [util/log_service.ts:34](https://github.com/krnik/vjs-validator/blob/c79d80e/src/util/log_service.ts#L34)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| message | `string` |

**Returns:** `void`

___
<a id="property"></a>

###  property

▸ **property**(propertyName: *`string`*): `void`

*Defined in [util/log_service.ts:30](https://github.com/krnik/vjs-validator/blob/c79d80e/src/util/log_service.ts#L30)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| propertyName | `string` |

**Returns:** `void`

___
<a id="schema"></a>

###  schema

▸ **schema**(schemaName: *`string`*): `void`

*Defined in [util/log_service.ts:25](https://github.com/krnik/vjs-validator/blob/c79d80e/src/util/log_service.ts#L25)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| schemaName | `string` |

**Returns:** `void`

___
<a id="setlogger"></a>

### `<Static>` setLogger

▸ **setLogger**(logger: *[Logger](../interfaces/logger.md)*): `void`

*Defined in [util/log_service.ts:10](https://github.com/krnik/vjs-validator/blob/c79d80e/src/util/log_service.ts#L10)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| logger | [Logger](../interfaces/logger.md) |

**Returns:** `void`

___

