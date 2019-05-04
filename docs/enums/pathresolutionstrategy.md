[jbq](../README.md) > [PathResolutionStrategy](../enums/pathresolutionstrategy.md)

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

*Defined in [misc/constants.ts:179](https://github.com/krnik/vjs-validator/blob/15e769b/src/misc/constants.ts#L179)*

Ignores the fact that the `$dataPath` resolved to undefined.

___
<a id="return"></a>

###  Return

**Return**:  = "return"

*Defined in [misc/constants.ts:175](https://github.com/krnik/vjs-validator/blob/15e769b/src/misc/constants.ts#L175)*

Returns an error from validation function.

___
<a id="schema"></a>

###  Schema

**Schema**:  = "schema"

*Defined in [misc/constants.ts:171](https://github.com/krnik/vjs-validator/blob/15e769b/src/misc/constants.ts#L171)*

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

*Defined in [misc/constants.ts:154](https://github.com/krnik/vjs-validator/blob/15e769b/src/misc/constants.ts#L154)*

If `$dataPath` resolves to `undefined` - skip the check of a property that expected value.

___

