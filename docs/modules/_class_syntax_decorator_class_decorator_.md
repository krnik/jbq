[jbq](../README.md) > ["class_syntax/decorator/class_decorator"](../modules/_class_syntax_decorator_class_decorator_.md)

# External module: "class_syntax/decorator/class_decorator"

## Index

### Functions

* [instantiate](_class_syntax_decorator_class_decorator_.md#instantiate)

---

## Functions

<a id="instantiate"></a>

###  instantiate

▸ **instantiate**(constructor: *[Constructor](../interfaces/_misc_typings_.constructor.md)*): `void`

*Defined in [class_syntax/decorator/class_decorator.ts:44](https://github.com/krnik/vjs-validator/blob/6a6427a/src/class_syntax/decorator/class_decorator.ts#L44)*

_Constructor decorator._

Hints compiler that this class should be used to create instance if nested inside another class.

Default behavior for a nested class is a `schema provider`. That means that if class is not decorated with `@instantiate` then it will provide schema when used with `@shape` or `@collection` decorators.

Examples
========

```
 \@instntiate
 class ID {}

 class Name {
     \@string
     public firstName!: string;
 }

 class User extends Validator {
     \@shape(ID)
     public id!: ID;

     \@object
     \@shape(Name)
     public name!: Shape<Name>;
 }

 new User().build({});   // throws -> no `name` is not an object
 new User().build()      // throws -> data is not an object

 const user = new User().build({ name: 'Bon' });

 user.id;                    // ID
 user.id instanceof ID;      // true

 user.name;                  // { firstName: 'Bon' }
 user.name instanceof Name;  // false
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| constructor | [Constructor](../interfaces/_misc_typings_.constructor.md) |

**Returns:** `void`

___

