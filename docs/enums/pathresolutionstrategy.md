[JBQDocs](../README.md) > [PathResolutionStrategy](../enums/pathresolutionstrategy.md)

# Enumeration: PathResolutionStrategy

Enum representing a ways of dealing with `$dataPath` resolution. Each of the variants defines what to do if `$dataPath` resolves to `undefined`.

## Index

### Enumeration members

* [Ignore](pathresolutionstrategy.md#ignore)
* [Return](pathresolutionstrategy.md#return)
* [Schema](pathresolutionstrategy.md#schema)
* [Skip](pathresolutionstrategy.md#skip)

---

## Enumeration members

<a id="ignore"></a>

###  Ignore

**Ignore**:  = "ignore"

*Defined in [misc/constants.ts:180](https://github.com/krnik/vjs-validator/blob/6195eeb/src/misc/constants.ts#L180)*

Ignores the fact that the `$dataPath` resolved to undefined.

___
<a id="return"></a>

###  Return

**Return**:  = "return"

*Defined in [misc/constants.ts:176](https://github.com/krnik/vjs-validator/blob/6195eeb/src/misc/constants.ts#L176)*

Returns an error from validation function.

___
<a id="schema"></a>

###  Schema

**Schema**:  = "schema"

*Defined in [misc/constants.ts:172](https://github.com/krnik/vjs-validator/blob/6195eeb/src/misc/constants.ts#L172)*

Validate resolved `$dataPath` is validated by schema.

Examples
========

If the value from path `/age` resolves to a value that is not a `number` the validation function will return an error.

```
 const schema = {
     type: "number",
     min: {
         $dataPath: "/age",
         type: "number",
     }
 };
```

___
<a id="skip"></a>

###  Skip

**Skip**:  = "skip"

*Defined in [misc/constants.ts:155](https://github.com/krnik/vjs-validator/blob/6195eeb/src/misc/constants.ts#L155)*

If `$dataPath` resolves to `undefined` - skip the check of a property that expected value.

___

