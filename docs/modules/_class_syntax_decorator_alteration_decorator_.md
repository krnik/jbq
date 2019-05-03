[jbq](../README.md) > ["class_syntax/decorator/alteration_decorator"](../modules/_class_syntax_decorator_alteration_decorator_.md)

# External module: "class_syntax/decorator/alteration_decorator"

## Index

### Functions

* [transform](_class_syntax_decorator_alteration_decorator_.md#transform)
* [withDefault](_class_syntax_decorator_alteration_decorator_.md#withdefault)

---

## Functions

<a id="transform"></a>

### `<Const>` transform

▸ **transform**<`P`,`D`,`R`>(callback: *`function`*): `PropertyDecorator`

*Defined in [class_syntax/decorator/alteration_decorator.ts:103](https://github.com/krnik/vjs-validator/blob/6a6427a/src/class_syntax/decorator/alteration_decorator.ts#L103)*

**Property decorator.**

**Applies only to instances.**

Defines the transformation function for a property.

Transformations are evaluated at the end of building instance.

Transformation function will set property value to a return value of a callback provided to the decorator function.

If transformation function returns Promise then the `.build` method of a class will also return Promise that eventually will resolve to the class instance. Since TypeScript does not support changing the class signature via decorators this behaviour needs to be manually `hinted` by setting `true` value in a generic parameter of `Validator` class.

Examples
========

```
 class IAmLate extends Validator<true> {
     \@transform(async () => true)
     veryLate!: boolean;
 }

 compile(IAmLate);

 const latePerson = new IAmLate().build();
 latePerson;         // Promise<IAmLate>
 await latePerson;   // IAmLate

 class TotallySync extends Validator<true> {
     \@transform(() => true)
     isSync!: boolean;
 }
 compile(TotallySync);

 const syncInstance = new TotallySync().build();
 syncInstance; // TotallySync
 // TypeScript will hint that this method returns Promise
 // because of `Validator<HasAsyncTransforms = true>`
```

`Validator<true>` is a hint for TypeScript that `.build` method will return Promise. Unfortunately, if class extends `Validator<true>` and none of transform functions will return Promise then `.bulid` method will not resolve to a Promise.

**Type parameters:**

#### P 
#### D 
#### R 
**Parameters:**

| Name | Type |
| ------ | ------ |
| callback | `function` |

**Returns:** `PropertyDecorator`

___
<a id="withdefault"></a>

### `<Const>` withDefault

▸ **withDefault**<`T`,`R`>(buildDefault: *`function`*): `PropertyDecorator`

*Defined in [class_syntax/decorator/alteration_decorator.ts:50](https://github.com/krnik/vjs-validator/blob/6a6427a/src/class_syntax/decorator/alteration_decorator.ts#L50)*

**Property decorator.**

**Applies only to instances.**

Defines default value factory for a property.

Evaluated only if property instances' property resolves to undefined.

The return value of provided function will be assigned to a property. As a first argument default factory will receive data that is received during building instance.

Examples
========

```
 class Person extends Validator {
     \@string
     \@optional
     \@withDefault(() => 'John Snow')
     name!: string;

     \@withDefault((data: { name?: string }) => {
         return data.name === undefined;
     })
     usesDefaultName!: boolean;

     \@withDefault(async () => true)
     holdsPromise!: Promise<true>;
 }

 compile(Person);

 const data = {};
 const person = new Person().build(data);

 person.name;            // 'John Snow'
 person.usesDefaultUname;// true
 person.holdsPromise;    // Promise<true>
```

Since `usesDefaultName` was not decorated by decorators that extend schema it does not exists in schema thus it will not be validated but if data contains `usesDefaultName` property then this value will be used to assign to this property.

If a default factory returns the promise then the promise will not be awaited during building Person instance.

**Type parameters:**

#### T 
#### R 
**Parameters:**

| Name | Type |
| ------ | ------ |
| buildDefault | `function` |

**Returns:** `PropertyDecorator`

___

