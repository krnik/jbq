[jbq](../README.md) > ["class_syntax/decorator/validation_decorator"](../modules/_class_syntax_decorator_validation_decorator_.md)

# External module: "class_syntax/decorator/validation_decorator"

## Index

### Type aliases

* [CallbackFactory](_class_syntax_decorator_validation_decorator_.md#callbackfactory)
* [ClassDecoratorParams](_class_syntax_decorator_validation_decorator_.md#classdecoratorparams)
* [ConstructorFactory](_class_syntax_decorator_validation_decorator_.md#constructorfactory)
* [Decorator](_class_syntax_decorator_validation_decorator_.md#decorator)
* [DecoratorFactoryB](_class_syntax_decorator_validation_decorator_.md#decoratorfactoryb)
* [DecoratorParams](_class_syntax_decorator_validation_decorator_.md#decoratorparams)
* [DecoratorTypes](_class_syntax_decorator_validation_decorator_.md#decoratortypes)
* [PropertyDecoratorParams](_class_syntax_decorator_validation_decorator_.md#propertydecoratorparams)
* [SchemaSymbol](_class_syntax_decorator_validation_decorator_.md#schemasymbol)
* [ValueFactory](_class_syntax_decorator_validation_decorator_.md#valuefactory)

### Variables

* [any](_class_syntax_decorator_validation_decorator_.md#any)
* [array](_class_syntax_decorator_validation_decorator_.md#array)
* [boolean](_class_syntax_decorator_validation_decorator_.md#boolean)
* [collection](_class_syntax_decorator_validation_decorator_.md#collection)
* [constructorName](_class_syntax_decorator_validation_decorator_.md#constructorname)
* [every](_class_syntax_decorator_validation_decorator_.md#every)
* [includes](_class_syntax_decorator_validation_decorator_.md#includes)
* [instanceOf](_class_syntax_decorator_validation_decorator_.md#instanceof)
* [keyCount](_class_syntax_decorator_validation_decorator_.md#keycount)
* [len](_class_syntax_decorator_validation_decorator_.md#len)
* [multipleOf](_class_syntax_decorator_validation_decorator_.md#multipleof)
* [number](_class_syntax_decorator_validation_decorator_.md#number)
* [object](_class_syntax_decorator_validation_decorator_.md#object)
* [oneOf](_class_syntax_decorator_validation_decorator_.md#oneof)
* [optional](_class_syntax_decorator_validation_decorator_.md#optional)
* [propCount](_class_syntax_decorator_validation_decorator_.md#propcount)
* [properties](_class_syntax_decorator_validation_decorator_.md#properties)
* [regex](_class_syntax_decorator_validation_decorator_.md#regex)
* [shape](_class_syntax_decorator_validation_decorator_.md#shape)
* [some](_class_syntax_decorator_validation_decorator_.md#some)
* [string](_class_syntax_decorator_validation_decorator_.md#string)
* [type](_class_syntax_decorator_validation_decorator_.md#type)
* [value](_class_syntax_decorator_validation_decorator_.md#value)

### Functions

* [decoratorFactory](_class_syntax_decorator_validation_decorator_.md#decoratorfactory)
* [decoratorSubSchemaFactory](_class_syntax_decorator_validation_decorator_.md#decoratorsubschemafactory)
* [isClassDecorator](_class_syntax_decorator_validation_decorator_.md#isclassdecorator)
* [schema](_class_syntax_decorator_validation_decorator_.md#schema)

---

## Type aliases

<a id="callbackfactory"></a>

###  CallbackFactory

**Ƭ CallbackFactory**: *`function`*

*Defined in [class_syntax/decorator/validation_decorator.ts:41](https://github.com/krnik/vjs-validator/blob/6a6427a/src/class_syntax/decorator/validation_decorator.ts#L41)*

Decorator factory that expects function that returns boolean as an argument.

#### Type declaration
▸<`T`>(callback: *[ArrIterCallback](_misc_typings_.md#arritercallback)<`boolean`, `T`>*): [Decorator](_class_syntax_decorator_validation_decorator_.md#decorator)

**Type parameters:**

#### T 
**Parameters:**

| Name | Type |
| ------ | ------ |
| callback | [ArrIterCallback](_misc_typings_.md#arritercallback)<`boolean`, `T`> |

**Returns:** [Decorator](_class_syntax_decorator_validation_decorator_.md#decorator)

___
<a id="classdecoratorparams"></a>

###  ClassDecoratorParams

**Ƭ ClassDecoratorParams**: *[`Function`]*

*Defined in [class_syntax/decorator/validation_decorator.ts:26](https://github.com/krnik/vjs-validator/blob/6a6427a/src/class_syntax/decorator/validation_decorator.ts#L26)*

___
<a id="constructorfactory"></a>

###  ConstructorFactory

**Ƭ ConstructorFactory**: *`function`*

*Defined in [class_syntax/decorator/validation_decorator.ts:39](https://github.com/krnik/vjs-validator/blob/6a6427a/src/class_syntax/decorator/validation_decorator.ts#L39)*

Decorator factory that expects Constructor as an argument.

#### Type declaration
▸<`T`>(schemaShape: *[Constructor](../interfaces/_misc_typings_.constructor.md)<`T`>*): [Decorator](_class_syntax_decorator_validation_decorator_.md#decorator)

**Type parameters:**

#### T 
**Parameters:**

| Name | Type |
| ------ | ------ |
| schemaShape | [Constructor](../interfaces/_misc_typings_.constructor.md)<`T`> |

**Returns:** [Decorator](_class_syntax_decorator_validation_decorator_.md#decorator)

___
<a id="decorator"></a>

###  Decorator

**Ƭ Decorator**: *`function`*

*Defined in [class_syntax/decorator/validation_decorator.ts:32](https://github.com/krnik/vjs-validator/blob/6a6427a/src/class_syntax/decorator/validation_decorator.ts#L32)*

#### Type declaration
▸(...args: *[DecoratorParams](_class_syntax_decorator_validation_decorator_.md#decoratorparams)*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Rest` args | [DecoratorParams](_class_syntax_decorator_validation_decorator_.md#decoratorparams) |

**Returns:** `void`

___
<a id="decoratorfactoryb"></a>

###  DecoratorFactoryB

**Ƭ DecoratorFactoryB**: *`DecoratorFactoryB<B, T>`*

*Defined in [class_syntax/decorator/validation_decorator.ts:43](https://github.com/krnik/vjs-validator/blob/6a6427a/src/class_syntax/decorator/validation_decorator.ts#L43)*

___
<a id="decoratorparams"></a>

###  DecoratorParams

**Ƭ DecoratorParams**: *[`Function`] \| [PropertyDecoratorParams](_class_syntax_decorator_validation_decorator_.md#propertydecoratorparams)*

*Defined in [class_syntax/decorator/validation_decorator.ts:30](https://github.com/krnik/vjs-validator/blob/6a6427a/src/class_syntax/decorator/validation_decorator.ts#L30)*

___
<a id="decoratortypes"></a>

###  DecoratorTypes

**Ƭ DecoratorTypes**: *"value" \| "constructor" \| "callback"*

*Defined in [class_syntax/decorator/validation_decorator.ts:34](https://github.com/krnik/vjs-validator/blob/6a6427a/src/class_syntax/decorator/validation_decorator.ts#L34)*

___
<a id="propertydecoratorparams"></a>

###  PropertyDecoratorParams

**Ƭ PropertyDecoratorParams**: *[`object`, `string` \| `symbol`, `unknown`]*

*Defined in [class_syntax/decorator/validation_decorator.ts:28](https://github.com/krnik/vjs-validator/blob/6a6427a/src/class_syntax/decorator/validation_decorator.ts#L28)*

___
<a id="schemasymbol"></a>

###  SchemaSymbol

**Ƭ SchemaSymbol**: *`unique symbol` \| `unique symbol`*

*Defined in [class_syntax/decorator/validation_decorator.ts:220](https://github.com/krnik/vjs-validator/blob/6a6427a/src/class_syntax/decorator/validation_decorator.ts#L220)*

___
<a id="valuefactory"></a>

###  ValueFactory

**Ƭ ValueFactory**: *`function`*

*Defined in [class_syntax/decorator/validation_decorator.ts:37](https://github.com/krnik/vjs-validator/blob/6a6427a/src/class_syntax/decorator/validation_decorator.ts#L37)*

Decorator factory that expects value of type T as an argument.

#### Type declaration
▸(schemaValue: *`T`*): [Decorator](_class_syntax_decorator_validation_decorator_.md#decorator)

**Parameters:**

| Name | Type |
| ------ | ------ |
| schemaValue | `T` |

**Returns:** [Decorator](_class_syntax_decorator_validation_decorator_.md#decorator)

___

## Variables

<a id="any"></a>

### `<Const>` any

**● any**: *`function`* =  decoratorFactory(TYPE)(TYPE_NAME.ANY)

*Defined in [class_syntax/decorator/validation_decorator.ts:107](https://github.com/krnik/vjs-validator/blob/6a6427a/src/class_syntax/decorator/validation_decorator.ts#L107)*

Shorthand `@type` decorator that assigns schema `type` property to `any`

#### Type declaration
▸(...args: *[DecoratorParams](_class_syntax_decorator_validation_decorator_.md#decoratorparams)*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Rest` args | [DecoratorParams](_class_syntax_decorator_validation_decorator_.md#decoratorparams) |

**Returns:** `void`

___
<a id="array"></a>

### `<Const>` array

**● array**: *`function`* =  decoratorFactory(TYPE)(TYPE_NAME.ARRAY)

*Defined in [class_syntax/decorator/validation_decorator.ts:110](https://github.com/krnik/vjs-validator/blob/6a6427a/src/class_syntax/decorator/validation_decorator.ts#L110)*

Shorthand `@type` decorator that assigns schema `type` property to `array`

#### Type declaration
▸(...args: *[DecoratorParams](_class_syntax_decorator_validation_decorator_.md#decoratorparams)*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Rest` args | [DecoratorParams](_class_syntax_decorator_validation_decorator_.md#decoratorparams) |

**Returns:** `void`

___
<a id="boolean"></a>

### `<Const>` boolean

**● boolean**: *`function`* =  decoratorFactory(TYPE)(TYPE_NAME.BOOLEAN)

*Defined in [class_syntax/decorator/validation_decorator.ts:113](https://github.com/krnik/vjs-validator/blob/6a6427a/src/class_syntax/decorator/validation_decorator.ts#L113)*

Shorthand `@type` decorator that assigns schema `type` property to `boolean`

#### Type declaration
▸(...args: *[DecoratorParams](_class_syntax_decorator_validation_decorator_.md#decoratorparams)*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Rest` args | [DecoratorParams](_class_syntax_decorator_validation_decorator_.md#decoratorparams) |

**Returns:** `void`

___
<a id="collection"></a>

### `<Const>` collection

**● collection**: *`function`* =  decoratorSubSchemaFactory(SYM_SCHEMA_COLLECTION)

*Defined in [class_syntax/decorator/validation_decorator.ts:295](https://github.com/krnik/vjs-validator/blob/6a6427a/src/class_syntax/decorator/validation_decorator.ts#L295)*

Appends `Symbol.for('schema_collection')` to the schema.

When used on a class the provided class' schema will be always used to extend base schema.

When used on a property and a provided class `C` is decorated with `@instantiate` then the base schema will not be extended. Instead, `C` class will be used to create instances in the iterable elements.

Currently only array-like (integer indexed with `length` property) objects support creating instances since they're easily mutated.

Examples
========

```
 \@number
 \@value({ min: 100 })
 class NumGte100 {}

 class Poll extends Validator {
     \@array
     \@collection(NumGte100)
     public votes!: number[];

     \@array
     \@shape(HighestVotes)
     public votes2!: number[];
 }

 compile(Poll);

 const poll = new Poll().build({ votes: [100, 112] });
 poll.votes; // [100, 112]
```

#### Type declaration
▸<`T`>(schemaShape: *[Constructor](../interfaces/_misc_typings_.constructor.md)<`T`>*): [Decorator](_class_syntax_decorator_validation_decorator_.md#decorator)

**Type parameters:**

#### T 
**Parameters:**

| Name | Type |
| ------ | ------ |
| schemaShape | [Constructor](../interfaces/_misc_typings_.constructor.md)<`T`> |

**Returns:** [Decorator](_class_syntax_decorator_validation_decorator_.md#decorator)

___
<a id="constructorname"></a>

### `<Const>` constructorName

**● constructorName**: *`function`* =  decoratorFactory<string>(CONSTRUCTOR_NAME)

*Defined in [class_syntax/decorator/validation_decorator.ts:164](https://github.com/krnik/vjs-validator/blob/6a6427a/src/class_syntax/decorator/validation_decorator.ts#L164)*

Assigns schema `constructorName` property to provided value

#### Type declaration
▸(schemaValue: *`T`*): [Decorator](_class_syntax_decorator_validation_decorator_.md#decorator)

**Parameters:**

| Name | Type |
| ------ | ------ |
| schemaValue | `T` |

**Returns:** [Decorator](_class_syntax_decorator_validation_decorator_.md#decorator)

___
<a id="every"></a>

### `<Const>` every

**● every**: *`function`* =  decoratorFactory<never, 'callback'>(EVERY)

*Defined in [class_syntax/decorator/validation_decorator.ts:128](https://github.com/krnik/vjs-validator/blob/6a6427a/src/class_syntax/decorator/validation_decorator.ts#L128)*

Assigns schema `every` property to provided callback

#### Type declaration
▸<`T`>(callback: *[ArrIterCallback](_misc_typings_.md#arritercallback)<`boolean`, `T`>*): [Decorator](_class_syntax_decorator_validation_decorator_.md#decorator)

**Type parameters:**

#### T 
**Parameters:**

| Name | Type |
| ------ | ------ |
| callback | [ArrIterCallback](_misc_typings_.md#arritercallback)<`boolean`, `T`> |

**Returns:** [Decorator](_class_syntax_decorator_validation_decorator_.md#decorator)

___
<a id="includes"></a>

### `<Const>` includes

**● includes**: *`function`* =  decoratorFactory(INCLUDES)

*Defined in [class_syntax/decorator/validation_decorator.ts:134](https://github.com/krnik/vjs-validator/blob/6a6427a/src/class_syntax/decorator/validation_decorator.ts#L134)*

Assigns schema `includes` property to provided value

#### Type declaration
▸(schemaValue: *`T`*): [Decorator](_class_syntax_decorator_validation_decorator_.md#decorator)

**Parameters:**

| Name | Type |
| ------ | ------ |
| schemaValue | `T` |

**Returns:** [Decorator](_class_syntax_decorator_validation_decorator_.md#decorator)

___
<a id="instanceof"></a>

### `<Const>` instanceOf

**● instanceOf**: *`function`* =  decoratorFactory<never, 'constructor'>(INSTANCE_OF)

*Defined in [class_syntax/decorator/validation_decorator.ts:161](https://github.com/krnik/vjs-validator/blob/6a6427a/src/class_syntax/decorator/validation_decorator.ts#L161)*

Assigns schema `instanceOf` property to provided value

#### Type declaration
▸<`T`>(schemaShape: *[Constructor](../interfaces/_misc_typings_.constructor.md)<`T`>*): [Decorator](_class_syntax_decorator_validation_decorator_.md#decorator)

**Type parameters:**

#### T 
**Parameters:**

| Name | Type |
| ------ | ------ |
| schemaShape | [Constructor](../interfaces/_misc_typings_.constructor.md)<`T`> |

**Returns:** [Decorator](_class_syntax_decorator_validation_decorator_.md#decorator)

___
<a id="keycount"></a>

### `<Const>` keyCount

**● keyCount**: *`function`* =  decoratorFactory<ParseValuesMinMax['schemaValue']>(KEY_COUNT)

*Defined in [class_syntax/decorator/validation_decorator.ts:152](https://github.com/krnik/vjs-validator/blob/6a6427a/src/class_syntax/decorator/validation_decorator.ts#L152)*

Assigns schema `keyCount` property to provided value

#### Type declaration
▸(schemaValue: *`T`*): [Decorator](_class_syntax_decorator_validation_decorator_.md#decorator)

**Parameters:**

| Name | Type |
| ------ | ------ |
| schemaValue | `T` |

**Returns:** [Decorator](_class_syntax_decorator_validation_decorator_.md#decorator)

___
<a id="len"></a>

### `<Const>` len

**● len**: *`function`* =  decoratorFactory<ParseValuesMinMax['schemaValue']>(LEN)

*Defined in [class_syntax/decorator/validation_decorator.ts:137](https://github.com/krnik/vjs-validator/blob/6a6427a/src/class_syntax/decorator/validation_decorator.ts#L137)*

Assigns schema `len` property to provided value

#### Type declaration
▸(schemaValue: *`T`*): [Decorator](_class_syntax_decorator_validation_decorator_.md#decorator)

**Parameters:**

| Name | Type |
| ------ | ------ |
| schemaValue | `T` |

**Returns:** [Decorator](_class_syntax_decorator_validation_decorator_.md#decorator)

___
<a id="multipleof"></a>

### `<Const>` multipleOf

**● multipleOf**: *`function`* =  decoratorFactory<number>(MULTIPLE_OF)

*Defined in [class_syntax/decorator/validation_decorator.ts:143](https://github.com/krnik/vjs-validator/blob/6a6427a/src/class_syntax/decorator/validation_decorator.ts#L143)*

Assigns schema `multipleOf` property to provided number

#### Type declaration
▸(schemaValue: *`T`*): [Decorator](_class_syntax_decorator_validation_decorator_.md#decorator)

**Parameters:**

| Name | Type |
| ------ | ------ |
| schemaValue | `T` |

**Returns:** [Decorator](_class_syntax_decorator_validation_decorator_.md#decorator)

___
<a id="number"></a>

### `<Const>` number

**● number**: *`function`* =  decoratorFactory(TYPE)(TYPE_NAME.NUMBER)

*Defined in [class_syntax/decorator/validation_decorator.ts:116](https://github.com/krnik/vjs-validator/blob/6a6427a/src/class_syntax/decorator/validation_decorator.ts#L116)*

Shorthand `@type` decorator that assigns schema `type` property to `number`

#### Type declaration
▸(...args: *[DecoratorParams](_class_syntax_decorator_validation_decorator_.md#decoratorparams)*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Rest` args | [DecoratorParams](_class_syntax_decorator_validation_decorator_.md#decoratorparams) |

**Returns:** `void`

___
<a id="object"></a>

### `<Const>` object

**● object**: *`function`* =  decoratorFactory(TYPE)(TYPE_NAME.OBJECT)

*Defined in [class_syntax/decorator/validation_decorator.ts:119](https://github.com/krnik/vjs-validator/blob/6a6427a/src/class_syntax/decorator/validation_decorator.ts#L119)*

Shorthand `@type` decorator that assigns schema `type` property to `object`

#### Type declaration
▸(...args: *[DecoratorParams](_class_syntax_decorator_validation_decorator_.md#decoratorparams)*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Rest` args | [DecoratorParams](_class_syntax_decorator_validation_decorator_.md#decoratorparams) |

**Returns:** `void`

___
<a id="oneof"></a>

### `<Const>` oneOf

**● oneOf**: *`function`* =  decoratorFactory<string[] | number[]>(ONE_OF)

*Defined in [class_syntax/decorator/validation_decorator.ts:149](https://github.com/krnik/vjs-validator/blob/6a6427a/src/class_syntax/decorator/validation_decorator.ts#L149)*

Assigns schema `oneOf` property to provided value

#### Type declaration
▸(schemaValue: *`T`*): [Decorator](_class_syntax_decorator_validation_decorator_.md#decorator)

**Parameters:**

| Name | Type |
| ------ | ------ |
| schemaValue | `T` |

**Returns:** [Decorator](_class_syntax_decorator_validation_decorator_.md#decorator)

___
<a id="optional"></a>

### `<Const>` optional

**● optional**: *`function`* =  decoratorFactory(REQUIRED)(false)

*Defined in [class_syntax/decorator/validation_decorator.ts:125](https://github.com/krnik/vjs-validator/blob/6a6427a/src/class_syntax/decorator/validation_decorator.ts#L125)*

Assigns schema `required` property to `false`

#### Type declaration
▸(...args: *[DecoratorParams](_class_syntax_decorator_validation_decorator_.md#decoratorparams)*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Rest` args | [DecoratorParams](_class_syntax_decorator_validation_decorator_.md#decoratorparams) |

**Returns:** `void`

___
<a id="propcount"></a>

### `<Const>` propCount

**● propCount**: *`function`* =  decoratorFactory<ParseValuesMinMax['schemaValue']>(PROP_COUNT)

*Defined in [class_syntax/decorator/validation_decorator.ts:155](https://github.com/krnik/vjs-validator/blob/6a6427a/src/class_syntax/decorator/validation_decorator.ts#L155)*

Assigns schema `propCount` property to provided value

#### Type declaration
▸(schemaValue: *`T`*): [Decorator](_class_syntax_decorator_validation_decorator_.md#decorator)

**Parameters:**

| Name | Type |
| ------ | ------ |
| schemaValue | `T` |

**Returns:** [Decorator](_class_syntax_decorator_validation_decorator_.md#decorator)

___
<a id="properties"></a>

### `<Const>` properties

**● properties**: *`function`* =  decoratorFactory<(string | symbol | number)[]>(PROPERTIES)

*Defined in [class_syntax/decorator/validation_decorator.ts:158](https://github.com/krnik/vjs-validator/blob/6a6427a/src/class_syntax/decorator/validation_decorator.ts#L158)*

Assigns schema `properties` property to provided value

#### Type declaration
▸(schemaValue: *`T`*): [Decorator](_class_syntax_decorator_validation_decorator_.md#decorator)

**Parameters:**

| Name | Type |
| ------ | ------ |
| schemaValue | `T` |

**Returns:** [Decorator](_class_syntax_decorator_validation_decorator_.md#decorator)

___
<a id="regex"></a>

### `<Const>` regex

**● regex**: *`function`* =  decoratorFactory<RegExp>(REGEX)

*Defined in [class_syntax/decorator/validation_decorator.ts:146](https://github.com/krnik/vjs-validator/blob/6a6427a/src/class_syntax/decorator/validation_decorator.ts#L146)*

Assigns schema `regex` property to provided RegExp instance

#### Type declaration
▸(schemaValue: *`T`*): [Decorator](_class_syntax_decorator_validation_decorator_.md#decorator)

**Parameters:**

| Name | Type |
| ------ | ------ |
| schemaValue | `T` |

**Returns:** [Decorator](_class_syntax_decorator_validation_decorator_.md#decorator)

___
<a id="shape"></a>

### `<Const>` shape

**● shape**: *`function`* =  decoratorSubSchemaFactory(SYM_SCHEMA_PROPERTIES)

*Defined in [class_syntax/decorator/validation_decorator.ts:259](https://github.com/krnik/vjs-validator/blob/6a6427a/src/class_syntax/decorator/validation_decorator.ts#L259)*

Extends schema with provided class' schema.

If provided class is decorated with `@instantiate` decorator then schema is not extended. Instead provided class instance will be created.

When `@shape` is used on a class it will always extend schema.

```
 \@instantiate
 class ID {
     \@number
     public no!: number;
 }

 \@shape(ID)
 class Resource {}
```

Schema of `Resource` class will inherit all sub properties of `ID` class' schema. This means that a valid class signature for `Resource` is the following.

```
 \@shape(ID)
 class Resource implements Shape<ID> {}
```

#### Type declaration
▸<`T`>(schemaShape: *[Constructor](../interfaces/_misc_typings_.constructor.md)<`T`>*): [Decorator](_class_syntax_decorator_validation_decorator_.md#decorator)

**Type parameters:**

#### T 
**Parameters:**

| Name | Type |
| ------ | ------ |
| schemaShape | [Constructor](../interfaces/_misc_typings_.constructor.md)<`T`> |

**Returns:** [Decorator](_class_syntax_decorator_validation_decorator_.md#decorator)

___
<a id="some"></a>

### `<Const>` some

**● some**: *`function`* =  decoratorFactory<never, 'callback'>(SOME)

*Defined in [class_syntax/decorator/validation_decorator.ts:131](https://github.com/krnik/vjs-validator/blob/6a6427a/src/class_syntax/decorator/validation_decorator.ts#L131)*

Assigns schema `some` property to provided callback

#### Type declaration
▸<`T`>(callback: *[ArrIterCallback](_misc_typings_.md#arritercallback)<`boolean`, `T`>*): [Decorator](_class_syntax_decorator_validation_decorator_.md#decorator)

**Type parameters:**

#### T 
**Parameters:**

| Name | Type |
| ------ | ------ |
| callback | [ArrIterCallback](_misc_typings_.md#arritercallback)<`boolean`, `T`> |

**Returns:** [Decorator](_class_syntax_decorator_validation_decorator_.md#decorator)

___
<a id="string"></a>

### `<Const>` string

**● string**: *`function`* =  decoratorFactory(TYPE)(TYPE_NAME.STRING)

*Defined in [class_syntax/decorator/validation_decorator.ts:122](https://github.com/krnik/vjs-validator/blob/6a6427a/src/class_syntax/decorator/validation_decorator.ts#L122)*

Shorthand `@type` decorator that assigns schema `type` property to `string`

#### Type declaration
▸(...args: *[DecoratorParams](_class_syntax_decorator_validation_decorator_.md#decoratorparams)*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Rest` args | [DecoratorParams](_class_syntax_decorator_validation_decorator_.md#decoratorparams) |

**Returns:** `void`

___
<a id="type"></a>

### `<Const>` type

**● type**: *`function`* =  decoratorFactory<string>(TYPE)

*Defined in [class_syntax/decorator/validation_decorator.ts:104](https://github.com/krnik/vjs-validator/blob/6a6427a/src/class_syntax/decorator/validation_decorator.ts#L104)*

_Constructor / Property Decorator_

Assigns `type` property to the root schema (if class is decorated) or to the decorated property of the subSchemas.

By default decorated classes have `type` property set to `object`.

Examples
========

```
 \@type('string')
 class FullName {}
 // schema of FullName
 { type: 'string' };

 class Names {
     \@type('array')
     \@collection(FullName)
     public names!: string[];
 }
 // schema of Names
 {
     type: 'object',
     [Symbol.for('schema_properties')]: {
         names: {
             type: 'array',
             [Symbol.for('schema_collection')]: {
                 type: 'string',
             },
         },
     },
 }
```

#### Type declaration
▸(schemaValue: *`T`*): [Decorator](_class_syntax_decorator_validation_decorator_.md#decorator)

**Parameters:**

| Name | Type |
| ------ | ------ |
| schemaValue | `T` |

**Returns:** [Decorator](_class_syntax_decorator_validation_decorator_.md#decorator)

___
<a id="value"></a>

### `<Const>` value

**● value**: *`function`* =  decoratorFactory<ParseValuesMinMax['schemaValue'] | boolean>(VALUE)

*Defined in [class_syntax/decorator/validation_decorator.ts:140](https://github.com/krnik/vjs-validator/blob/6a6427a/src/class_syntax/decorator/validation_decorator.ts#L140)*

Assigns schema `value` property to provided value

#### Type declaration
▸(schemaValue: *`T`*): [Decorator](_class_syntax_decorator_validation_decorator_.md#decorator)

**Parameters:**

| Name | Type |
| ------ | ------ |
| schemaValue | `T` |

**Returns:** [Decorator](_class_syntax_decorator_validation_decorator_.md#decorator)

___

## Functions

<a id="decoratorfactory"></a>

###  decoratorFactory

▸ **decoratorFactory**<`T`,`BASE`>(schemaProperty: *`string` \| `symbol`*): [DecoratorFactoryB](_class_syntax_decorator_validation_decorator_.md#decoratorfactoryb)<`BASE`, `T`>

*Defined in [class_syntax/decorator/validation_decorator.ts:55](https://github.com/krnik/vjs-validator/blob/6a6427a/src/class_syntax/decorator/validation_decorator.ts#L55)*

**Type parameters:**

#### T 
#### BASE :  [DecoratorTypes](_class_syntax_decorator_validation_decorator_.md#decoratortypes)
**Parameters:**

| Name | Type |
| ------ | ------ |
| schemaProperty | `string` \| `symbol` |

**Returns:** [DecoratorFactoryB](_class_syntax_decorator_validation_decorator_.md#decoratorfactoryb)<`BASE`, `T`>

___
<a id="decoratorsubschemafactory"></a>

### `<Const>` decoratorSubSchemaFactory

▸ **decoratorSubSchemaFactory**(schemaSymbol: *[SchemaSymbol](_class_syntax_decorator_validation_decorator_.md#schemasymbol)*): [ConstructorFactory](_class_syntax_decorator_validation_decorator_.md#constructorfactory)

*Defined in [class_syntax/decorator/validation_decorator.ts:222](https://github.com/krnik/vjs-validator/blob/6a6427a/src/class_syntax/decorator/validation_decorator.ts#L222)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| schemaSymbol | [SchemaSymbol](_class_syntax_decorator_validation_decorator_.md#schemasymbol) |

**Returns:** [ConstructorFactory](_class_syntax_decorator_validation_decorator_.md#constructorfactory)

___
<a id="isclassdecorator"></a>

###  isClassDecorator

▸ **isClassDecorator**(args: *[DecoratorParams](_class_syntax_decorator_validation_decorator_.md#decoratorparams)*): `boolean`

*Defined in [class_syntax/decorator/validation_decorator.ts:51](https://github.com/krnik/vjs-validator/blob/6a6427a/src/class_syntax/decorator/validation_decorator.ts#L51)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| args | [DecoratorParams](_class_syntax_decorator_validation_decorator_.md#decoratorparams) |

**Returns:** `boolean`

___
<a id="schema"></a>

### `<Const>` schema

▸ **schema**(schemaObject: *[Schema](../interfaces/_core_compilation_interface_schema_interface_.schema.md)*): [Decorator](_class_syntax_decorator_validation_decorator_.md#decorator)

*Defined in [class_syntax/decorator/validation_decorator.ts:195](https://github.com/krnik/vjs-validator/blob/6a6427a/src/class_syntax/decorator/validation_decorator.ts#L195)*

Assigns received schemaObject to the target schema. Always succeeds (does not check if properties exists or not).

Use with caution.

Examples
========

```
 class Name {
     \@string
     public firstName!: string;
 }

 class Person {

     \@schema({
         type: 'string',     // conflicts with `@object` decorator
         [Symbol.for('schema_properties')]: {
             firstName: { type: 'boolean' }, // conflicts with Name.firstName
         },
     })
     \@object
     \@shape(Name)
     public name!: Shape<Name>; // Not really `Shape<Name>` anymore.
 }
```

The outcome of using schema property depends purely on order of execution of decorators. If `@shape` is executed as last decorator then it will overwrite any common schema properties.

**Parameters:**

| Name | Type |
| ------ | ------ |
| schemaObject | [Schema](../interfaces/_core_compilation_interface_schema_interface_.schema.md) |

**Returns:** [Decorator](_class_syntax_decorator_validation_decorator_.md#decorator)

___

