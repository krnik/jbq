[JBQDocs](../README.md) > [JBQOptions](../interfaces/jbqoptions.md)

# Interface: JBQOptions

## Hierarchy

**JBQOptions**

## Index

### Properties

* [async](jbqoptions.md#async)
* [asyncInterval](jbqoptions.md#asyncinterval)
* [debug](jbqoptions.md#debug)
* [handleResolvedPaths](jbqoptions.md#handleresolvedpaths)

---

## Properties

<a id="async"></a>

### `<Optional>` async

**● async**: *`undefined` \| `false` \| `true`*

*Defined in [misc/typings.ts:47](https://github.com/krnik/vjs-validator/blob/6195eeb/src/misc/typings.ts#L47)*

Defines if validation function should be asyncronous.

___
<a id="asyncinterval"></a>

### `<Optional>` asyncInterval

**● asyncInterval**: *`undefined` \| `number`*

*Defined in [misc/typings.ts:52](https://github.com/krnik/vjs-validator/blob/6195eeb/src/misc/typings.ts#L52)*

Defines how often the validation of collection should be suspended in asyncronous validation functions.

___
<a id="debug"></a>

### `<Optional>` debug

**● debug**: *`undefined` \| `false` \| `true`*

*Defined in [misc/typings.ts:39](https://github.com/krnik/vjs-validator/blob/6195eeb/src/misc/typings.ts#L39)*

Defines if schema compilation progress should be logged.

___
<a id="handleresolvedpaths"></a>

### `<Optional>` handleResolvedPaths

**● handleResolvedPaths**: *[PathResolutionStrategy](../enums/pathresolutionstrategy.md)*

*Defined in [misc/typings.ts:43](https://github.com/krnik/vjs-validator/blob/6195eeb/src/misc/typings.ts#L43)*

Defines what to do in case when $dataPath resolves to undefined.

___

