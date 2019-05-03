[jbq](../README.md) > ["class_syntax"](../modules/_class_syntax_.md)

# External module: "class_syntax"

## Index

### Classes

* [Validator](../classes/_class_syntax_.validator.md)

### Type aliases

* [Shape](_class_syntax_.md#shape)

---

## Type aliases

<a id="shape"></a>

###  Shape

**Ƭ Shape**: *`Pick`<`S`, `{ [K in keyof S]: K extends M ? K : S[K] extends Function ? never : K; }[keyof S]`>*

*Defined in [class_syntax.ts:27](https://github.com/krnik/vjs-validator/blob/6a6427a/src/class_syntax.ts#L27)*

Mapped type used to extract properties of a class. Also just a hint for TypeScript.

___

