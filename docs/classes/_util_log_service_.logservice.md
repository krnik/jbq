[jbq](../README.md) > ["util/log_service"](../modules/_util_log_service_.md) > [LogService](../classes/_util_log_service_.logservice.md)

# Class: LogService

## Hierarchy

**LogService**

## Index

### Constructors

* [constructor](_util_log_service_.logservice.md#constructor)

### Properties

* [active](_util_log_service_.logservice.md#active)
* [indent](_util_log_service_.logservice.md#indent)

### Methods

* [code](_util_log_service_.logservice.md#code)
* [incIndent](_util_log_service_.logservice.md#incindent)
* [log](_util_log_service_.logservice.md#log)
* [property](_util_log_service_.logservice.md#property)
* [schema](_util_log_service_.logservice.md#schema)
* [setLogger](_util_log_service_.logservice.md#setlogger)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new LogService**(active: *`boolean`*): [LogService](_util_log_service_.logservice.md)

*Defined in [util/log_service.ts:15](https://github.com/krnik/vjs-validator/blob/6a6427a/src/util/log_service.ts#L15)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| active | `boolean` |

**Returns:** [LogService](_util_log_service_.logservice.md)

___

## Properties

<a id="active"></a>

### `<Private>` active

**● active**: *`boolean`* = false

*Defined in [util/log_service.ts:14](https://github.com/krnik/vjs-validator/blob/6a6427a/src/util/log_service.ts#L14)*

___
<a id="indent"></a>

### `<Private>` indent

**● indent**: *`number`* = 0

*Defined in [util/log_service.ts:15](https://github.com/krnik/vjs-validator/blob/6a6427a/src/util/log_service.ts#L15)*

___

## Methods

<a id="code"></a>

###  code

▸ **code**(this: *[LogService](_util_log_service_.logservice.md)*, code: *`string`*): `void`

*Defined in [util/log_service.ts:34](https://github.com/krnik/vjs-validator/blob/6a6427a/src/util/log_service.ts#L34)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [LogService](_util_log_service_.logservice.md) |
| code | `string` |

**Returns:** `void`

___
<a id="incindent"></a>

###  incIndent

▸ **incIndent**(this: *[LogService](_util_log_service_.logservice.md)*, v: *`number`*): `void`

*Defined in [util/log_service.ts:21](https://github.com/krnik/vjs-validator/blob/6a6427a/src/util/log_service.ts#L21)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [LogService](_util_log_service_.logservice.md) |
| v | `number` |

**Returns:** `void`

___
<a id="log"></a>

### `<Private>` log

▸ **log**(this: *[LogService](_util_log_service_.logservice.md)*, message: *`string`*): `void`

*Defined in [util/log_service.ts:38](https://github.com/krnik/vjs-validator/blob/6a6427a/src/util/log_service.ts#L38)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [LogService](_util_log_service_.logservice.md) |
| message | `string` |

**Returns:** `void`

___
<a id="property"></a>

###  property

▸ **property**(this: *[LogService](_util_log_service_.logservice.md)*, propertyName: *`string`*): `void`

*Defined in [util/log_service.ts:30](https://github.com/krnik/vjs-validator/blob/6a6427a/src/util/log_service.ts#L30)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [LogService](_util_log_service_.logservice.md) |
| propertyName | `string` |

**Returns:** `void`

___
<a id="schema"></a>

###  schema

▸ **schema**(this: *[LogService](_util_log_service_.logservice.md)*, schemaName: *`string`*): `void`

*Defined in [util/log_service.ts:25](https://github.com/krnik/vjs-validator/blob/6a6427a/src/util/log_service.ts#L25)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| this | [LogService](_util_log_service_.logservice.md) |
| schemaName | `string` |

**Returns:** `void`

___
<a id="setlogger"></a>

### `<Static>` setLogger

▸ **setLogger**(logger: *[Logger](../interfaces/_util_log_service_.logger.md)*): `void`

*Defined in [util/log_service.ts:10](https://github.com/krnik/vjs-validator/blob/6a6427a/src/util/log_service.ts#L10)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| logger | [Logger](../interfaces/_util_log_service_.logger.md) |

**Returns:** `void`

___

