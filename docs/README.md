
#  JBQDocs

## Index

### Enumerations

* [ComparisonOperator](enums/comparisonoperator.md)
* [Keyword](enums/keyword.md)
* [KeywordValidationFunctionKind](enums/keywordvalidationfunctionkind.md)
* [LogicalOperator](enums/logicaloperator.md)
* [Param](enums/param.md)
* [ParameterName](enums/parametername.md)
* [PathResolutionStrategy](enums/pathresolutionstrategy.md)
* [TYPE_NAME](enums/type_name.md)

### Classes

* [ClassValidatorBuilder](classes/classvalidatorbuilder.md)
* [CodeGenerator](classes/codegenerator.md)
* [CodeGeneratorError](classes/codegeneratorerror.md)
* [Compilation](classes/compilation.md)
* [CompilationError](classes/compilationerror.md)
* [LogService](classes/logservice.md)
* [Print](classes/print.md)
* [ResolvedPathStore](classes/resolvedpathstore.md)
* [SourceBuilder](classes/sourcebuilder.md)
* [TypeInstance](classes/typeinstance.md)
* [TypeInstanceError](classes/typeinstanceerror.md)
* [TypeReflect](classes/typereflect.md)
* [TypeStore](classes/typestore.md)
* [TypeStoreError](classes/typestoreerror.md)
* [Validator](classes/validator.md)

### Interfaces

* [CompileOptions](interfaces/compileoptions.md)
* [Constructor](interfaces/constructor.md)
* [DataPath](interfaces/datapath.md)
* [IfCondition](interfaces/ifcondition.md)
* [KeywordDescriptor](interfaces/keyworddescriptor.md)
* [Logger](interfaces/logger.md)
* [Options](interfaces/options.md)
* [ParseValues](interfaces/parsevalues.md)
* [ParseValuesMinMax](interfaces/parsevaluesminmax.md)
* [PropertyMeta](interfaces/propertymeta.md)
* [ResolvedPathVariable](interfaces/resolvedpathvariable.md)
* [Schema](interfaces/schema.md)
* [SchemaMax](interfaces/schemamax.md)
* [SchemaMin](interfaces/schemamin.md)
* [SourceBuilderContext](interfaces/sourcebuildercontext.md)
* [SourceBuilderCounter](interfaces/sourcebuildercounter.md)
* [SourceBuilderProduct](interfaces/sourcebuilderproduct.md)
* [SourceBuilderSnapshot](interfaces/sourcebuildersnapshot.md)
* [ValidationError](interfaces/validationerror.md)
* [ValidatorClass](interfaces/validatorclass.md)

### Type aliases

* [Any](#any)
* [AnyArray](#anyarray)
* [ArrIterCallback](#arritercallback)
* [AsyncValidationFunction](#asyncvalidationfunction)
* [CallbackFactory](#callbackfactory)
* [ClassDecoratorParams](#classdecoratorparams)
* [ConstructorFactory](#constructorfactory)
* [DataPathChecker](#datapathchecker)
* [DataPathResolver](#datapathresolver)
* [Decorator](#decorator)
* [DecoratorFactoryB](#decoratorfactoryb)
* [DecoratorParams](#decoratorparams)
* [DecoratorTypes](#decoratortypes)
* [DefaultCallback](#defaultcallback)
* [Empty](#empty)
* [Extract](#extract)
* [JBQValidators](#jbqvalidators)
* [KeywordValidationFunction](#keywordvalidationfunction)
* [Macro](#macro)
* [Methods](#methods)
* [NotIn](#notin)
* [ObjWithKeys](#objwithkeys)
* [OmitSymbols](#omitsymbols)
* [Option](#option)
* [PartialProps](#partialprops)
* [Property](#property)
* [PropertyDecoratorParams](#propertydecoratorparams)
* [ResolvedValidationFunction](#resolvedvalidationfunction)
* [RestParams](#restparams)
* [SchemaMinMax](#schemaminmax)
* [SchemaProps](#schemaprops)
* [SchemaSymbol](#schemasymbol)
* [SchemaValidator](#schemavalidator)
* [Shape](#shape)
* [SyncValidationFunction](#syncvalidationfunction)
* [TransformCallback](#transformcallback)
* [TypeSignature](#typesignature)
* [Types](#types)
* [ValidationResult](#validationresult)
* [ValueFactory](#valuefactory)

### Variables

* [AsyncFnConstructor](#asyncfnconstructor)
* [CONSTRUCTOR_NAME](#constructor_name)
* [CREATE_INSTANCE](#create_instance)
* [DEFAULT_ASYNC_INTERVAL](#default_async_interval)
* [EVERY](#every)
* [EXPRESSION_REGEX](#expression_regex)
* [INCLUDES](#includes)
* [INSTANCE_OF](#instance_of)
* [KEY_COUNT](#key_count)
* [LEN](#len)
* [MULTIPLE_OF](#multiple_of)
* [ONE_OF](#one_of)
* [PROPERTIES](#properties)
* [PROP_COUNT](#prop_count)
* [PROP_DATA_PATH](#prop_data_path)
* [REGEX](#regex)
* [REQUIRED](#required)
* [SCHEMA](#schema)
* [SCHEMA_PATH_SEPARATOR](#schema_path_separator)
* [SOME](#some)
* [SYM_SCHEMA_COLLECTION](#sym_schema_collection)
* [SYM_SCHEMA_PROPERTIES](#sym_schema_properties)
* [TOKEN_BREAK](#token_break)
* [TYPE](#type)
* [TYPES](#types)
* [TypeAny](#typeany)
* [TypeArray](#typearray)
* [TypeBoolean](#typeboolean)
* [TypeNumber](#typenumber)
* [TypeObject](#typeobject)
* [TypeString](#typestring)
* [VALUE](#value)
* [array](#array)
* [boolean](#boolean)
* [collection](#collection)
* [constructorName](#constructorname)
* [every](#every)
* [includes](#includes)
* [instanceOf](#instanceof)
* [keyCount](#keycount)
* [len](#len)
* [multipleOf](#multipleof)
* [number](#number)
* [object](#object)
* [oneOf](#oneof)
* [optional](#optional)
* [propCount](#propcount)
* [properties](#properties)
* [regex](#regex)
* [setLogger](#setlogger)
* [shape](#shape)
* [some](#some)
* [string](#string)
* [type](#type)
* [types](#types)
* [value](#value)

### Functions

* [AsyncFnFactory](#asyncfnfactory)
* [any](#any)
* [arrayOf](#arrayof)
* [arrayOfPropertyNames](#arrayofpropertynames)
* [compileClass](#compileclass)
* [createPropKeyCountMacro](#createpropkeycountmacro)
* [createTypes](#createtypes)
* [dataPath](#datapath)
* [decoratorFactory](#decoratorfactory)
* [decoratorSubSchemaFactory](#decoratorsubschemafactory)
* [instantiate](#instantiate)
* [isClassDecorator](#isclassdecorator)
* [isInstance](#isinstance)
* [jbq](#jbq)
* [minMaxOrNumber](#minmaxornumber)
* [primitive](#primitive)
* [schema](#schema)
* [setDefaultTypes](#setdefaulttypes)
* [transform](#transform)
* [withDefault](#withdefault)

### Object literals

* [LOGGER](#logger)
* [SchemaValidationError](#schemavalidationerror)
* [schemaValidate](#schemavalidate)

---

## Type aliases

<a id="any"></a>

###  Any

**Ƭ Any**: *`any`*

*Defined in [misc/typings.ts:8](https://github.com/krnik/vjs-validator/blob/4b489fe/src/misc/typings.ts#L8)*

___
<a id="anyarray"></a>

###  AnyArray

**Ƭ AnyArray**: *[Any](#any)[]*

*Defined in [misc/typings.ts:10](https://github.com/krnik/vjs-validator/blob/4b489fe/src/misc/typings.ts#L10)*

___
<a id="arritercallback"></a>

###  ArrIterCallback

**Ƭ ArrIterCallback**: *`function`*

*Defined in [misc/typings.ts:16](https://github.com/krnik/vjs-validator/blob/4b489fe/src/misc/typings.ts#L16)*

#### Type declaration
▸(elem: *`T`*, index: *`number`*, arr: *`T`[]*): `R`

**Parameters:**

| Name | Type |
| ------ | ------ |
| elem | `T` |
| index | `number` |
| arr | `T`[] |

**Returns:** `R`

___
<a id="asyncvalidationfunction"></a>

###  AsyncValidationFunction

**Ƭ AsyncValidationFunction**: *`function`*

*Defined in [core/jbq.ts:8](https://github.com/krnik/vjs-validator/blob/4b489fe/src/core/jbq.ts#L8)*

#### Type declaration
▸<`T`>(data: *`T`*): `Promise`<[ValidationResult](#validationresult)>

**Type parameters:**

#### T 
**Parameters:**

| Name | Type |
| ------ | ------ |
| data | `T` |

**Returns:** `Promise`<[ValidationResult](#validationresult)>

___
<a id="callbackfactory"></a>

###  CallbackFactory

**Ƭ CallbackFactory**: *`function`*

*Defined in [class_syntax/decorator/validation_decorator.ts:42](https://github.com/krnik/vjs-validator/blob/4b489fe/src/class_syntax/decorator/validation_decorator.ts#L42)*

Decorator factory that expects function that returns boolean as an argument.

#### Type declaration
▸<`T`>(callback: *[ArrIterCallback](#arritercallback)<`boolean`, `T`>*): [Decorator](#decorator)

**Type parameters:**

#### T 
**Parameters:**

| Name | Type |
| ------ | ------ |
| callback | [ArrIterCallback](#arritercallback)<`boolean`, `T`> |

**Returns:** [Decorator](#decorator)

___
<a id="classdecoratorparams"></a>

###  ClassDecoratorParams

**Ƭ ClassDecoratorParams**: *[`Function`]*

*Defined in [class_syntax/decorator/validation_decorator.ts:27](https://github.com/krnik/vjs-validator/blob/4b489fe/src/class_syntax/decorator/validation_decorator.ts#L27)*

___
<a id="constructorfactory"></a>

###  ConstructorFactory

**Ƭ ConstructorFactory**: *`function`*

*Defined in [class_syntax/decorator/validation_decorator.ts:40](https://github.com/krnik/vjs-validator/blob/4b489fe/src/class_syntax/decorator/validation_decorator.ts#L40)*

Decorator factory that expects Constructor as an argument.

#### Type declaration
▸<`T`>(schemaShape: *[Constructor](interfaces/constructor.md)<`T`>*): [Decorator](#decorator)

**Type parameters:**

#### T 
**Parameters:**

| Name | Type |
| ------ | ------ |
| schemaShape | [Constructor](interfaces/constructor.md)<`T`> |

**Returns:** [Decorator](#decorator)

___
<a id="datapathchecker"></a>

###  DataPathChecker

**Ƭ DataPathChecker**: *`function`*

*Defined in [core/compilation/compilation_typings.ts:28](https://github.com/krnik/vjs-validator/blob/4b489fe/src/core/compilation/compilation_typings.ts#L28)*

#### Type declaration
▸(schemaValue: *`unknown`*): `boolean`

**Parameters:**

| Name | Type |
| ------ | ------ |
| schemaValue | `unknown` |

**Returns:** `boolean`

___
<a id="datapathresolver"></a>

###  DataPathResolver

**Ƭ DataPathResolver**: *`function`*

*Defined in [core/compilation/compilation_typings.ts:26](https://github.com/krnik/vjs-validator/blob/4b489fe/src/core/compilation/compilation_typings.ts#L26)*

#### Type declaration
▸(schemaValue: *[DataPath](interfaces/datapath.md)*): `string`

**Parameters:**

| Name | Type |
| ------ | ------ |
| schemaValue | [DataPath](interfaces/datapath.md) |

**Returns:** `string`

___
<a id="decorator"></a>

###  Decorator

**Ƭ Decorator**: *`function`*

*Defined in [class_syntax/decorator/validation_decorator.ts:33](https://github.com/krnik/vjs-validator/blob/4b489fe/src/class_syntax/decorator/validation_decorator.ts#L33)*

#### Type declaration
▸(...args: *[DecoratorParams](#decoratorparams)*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Rest` args | [DecoratorParams](#decoratorparams) |

**Returns:** `void`

___
<a id="decoratorfactoryb"></a>

###  DecoratorFactoryB

**Ƭ DecoratorFactoryB**: *`DecoratorFactoryB<B, T>`*

*Defined in [class_syntax/decorator/validation_decorator.ts:44](https://github.com/krnik/vjs-validator/blob/4b489fe/src/class_syntax/decorator/validation_decorator.ts#L44)*

___
<a id="decoratorparams"></a>

###  DecoratorParams

**Ƭ DecoratorParams**: *[`Function`] \| [PropertyDecoratorParams](#propertydecoratorparams)*

*Defined in [class_syntax/decorator/validation_decorator.ts:31](https://github.com/krnik/vjs-validator/blob/4b489fe/src/class_syntax/decorator/validation_decorator.ts#L31)*

___
<a id="decoratortypes"></a>

###  DecoratorTypes

**Ƭ DecoratorTypes**: *"value" \| "constructor" \| "callback"*

*Defined in [class_syntax/decorator/validation_decorator.ts:35](https://github.com/krnik/vjs-validator/blob/4b489fe/src/class_syntax/decorator/validation_decorator.ts#L35)*

___
<a id="defaultcallback"></a>

###  DefaultCallback

**Ƭ DefaultCallback**: *`function`*

*Defined in [class_syntax/class_validator_builder.ts:18](https://github.com/krnik/vjs-validator/blob/4b489fe/src/class_syntax/class_validator_builder.ts#L18)*

#### Type declaration
▸(data: *`unknown`*): `unknown`

**Parameters:**

| Name | Type |
| ------ | ------ |
| data | `unknown` |

**Returns:** `unknown`

___
<a id="empty"></a>

###  Empty

**Ƭ Empty**: *["__empty__", "__empty__", `undefined`]*

*Defined in [core/type_store.ts:8](https://github.com/krnik/vjs-validator/blob/4b489fe/src/core/type_store.ts#L8)*

Used to represent the typestate of empty TypeStore instance.

___
<a id="extract"></a>

###  Extract

**Ƭ Extract**: *`Extract<T, P>`*

*Defined in [core/type_store.ts:29](https://github.com/krnik/vjs-validator/blob/4b489fe/src/core/type_store.ts#L29)*

Extracts single Type out of TypeStore.

___
<a id="jbqvalidators"></a>

###  JBQValidators

**Ƭ JBQValidators**: *`object`*

*Defined in [core/jbq.ts:18](https://github.com/krnik/vjs-validator/blob/4b489fe/src/core/jbq.ts#L18)*

#### Type declaration

___
<a id="keywordvalidationfunction"></a>

###  KeywordValidationFunction

**Ƭ KeywordValidationFunction**: *`function`*

*Defined in [core/type_store/type_instance/type_instance_typings.ts:4](https://github.com/krnik/vjs-validator/blob/4b489fe/src/core/type_store/type_instance/type_instance_typings.ts#L4)*

#### Type declaration
▸(...args: *[RestParams](#restparams)*): [ValidationResult](#validationresult) \| `string` \| `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Rest` args | [RestParams](#restparams) |

**Returns:** [ValidationResult](#validationresult) \| `string` \| `void`

___
<a id="macro"></a>

###  Macro

**Ƭ Macro**: *`function`*

*Defined in [type/object.ts:22](https://github.com/krnik/vjs-validator/blob/4b489fe/src/type/object.ts#L22)*

#### Type declaration
▸(p: *[ParseValuesMinMax](interfaces/parsevaluesminmax.md)*, c: *[DataPathChecker](#datapathchecker)*, r: *[DataPathResolver](#datapathresolver)*): `string` \| `undefined`

**Parameters:**

| Name | Type |
| ------ | ------ |
| p | [ParseValuesMinMax](interfaces/parsevaluesminmax.md) |
| c | [DataPathChecker](#datapathchecker) |
| r | [DataPathResolver](#datapathresolver) |

**Returns:** `string` \| `undefined`

___
<a id="methods"></a>

###  Methods

**Ƭ Methods**: *`Exclude`<`T`, `undefined`>*

*Defined in [core/type_store/type_instance.ts:8](https://github.com/krnik/vjs-validator/blob/4b489fe/src/core/type_store/type_instance.ts#L8)*

___
<a id="notin"></a>

###  NotIn

**Ƭ NotIn**: *`NotIn<T, P>`*

*Defined in [core/type_store.ts:24](https://github.com/krnik/vjs-validator/blob/4b489fe/src/core/type_store.ts#L24)*

Disallows use of T that is one of keys that already exist in TypeStore instances.

___
<a id="objwithkeys"></a>

###  ObjWithKeys

**Ƭ ObjWithKeys**: *`object`*

*Defined in [util/type_reflect.ts:3](https://github.com/krnik/vjs-validator/blob/4b489fe/src/util/type_reflect.ts#L3)*

#### Type declaration

___
<a id="omitsymbols"></a>

###  OmitSymbols

**Ƭ OmitSymbols**: *`Pick`<`T`, `{ [K in keyof T]: K extends symbol ? never : K; }[keyof T]`>*

*Defined in [misc/typings.ts:5](https://github.com/krnik/vjs-validator/blob/4b489fe/src/misc/typings.ts#L5)*

___
<a id="option"></a>

###  Option

**Ƭ Option**: *`T` \| `undefined`*

*Defined in [misc/typings.ts:1](https://github.com/krnik/vjs-validator/blob/4b489fe/src/misc/typings.ts#L1)*

___
<a id="partialprops"></a>

###  PartialProps

**Ƭ PartialProps**: *`Pick`<`T`, `Exclude`<`keyof T`, `K`>> & `Partial`<`Pick`<`T`, `K`>>*

*Defined in [misc/typings.ts:3](https://github.com/krnik/vjs-validator/blob/4b489fe/src/misc/typings.ts#L3)*

___
<a id="property"></a>

###  Property

**Ƭ Property**: *`string` \| `symbol`*

*Defined in [class_syntax/class_validator_builder.ts:16](https://github.com/krnik/vjs-validator/blob/4b489fe/src/class_syntax/class_validator_builder.ts#L16)*

___
<a id="propertydecoratorparams"></a>

###  PropertyDecoratorParams

**Ƭ PropertyDecoratorParams**: *[`object`, `string` \| `symbol`, `unknown`]*

*Defined in [class_syntax/decorator/validation_decorator.ts:29](https://github.com/krnik/vjs-validator/blob/4b489fe/src/class_syntax/decorator/validation_decorator.ts#L29)*

___
<a id="resolvedvalidationfunction"></a>

###  ResolvedValidationFunction

**Ƭ ResolvedValidationFunction**: *`ResolvedValidationFunction<Opt>`*

*Defined in [core/jbq.ts:10](https://github.com/krnik/vjs-validator/blob/4b489fe/src/core/jbq.ts#L10)*

___
<a id="restparams"></a>

###  RestParams

**Ƭ RestParams**: *[Any](#any)[]*

*Defined in [misc/typings.ts:9](https://github.com/krnik/vjs-validator/blob/4b489fe/src/misc/typings.ts#L9)*

___
<a id="schemaminmax"></a>

###  SchemaMinMax

**Ƭ SchemaMinMax**: *[SchemaMax](interfaces/schemamax.md) \| [SchemaMin](interfaces/schemamin.md) \| `number` \| [DataPath](interfaces/datapath.md)*

*Defined in [type/type_definition_typings.ts:11](https://github.com/krnik/vjs-validator/blob/4b489fe/src/type/type_definition_typings.ts#L11)*

___
<a id="schemaprops"></a>

###  SchemaProps

**Ƭ SchemaProps**: *`Exclude`<`undefined` \| `object`, `undefined`>*

*Defined in [class_syntax/class_validator_builder.ts:14](https://github.com/krnik/vjs-validator/blob/4b489fe/src/class_syntax/class_validator_builder.ts#L14)*

___
<a id="schemasymbol"></a>

###  SchemaSymbol

**Ƭ SchemaSymbol**: *`unique symbol` \| `unique symbol`*

*Defined in [class_syntax/decorator/validation_decorator.ts:173](https://github.com/krnik/vjs-validator/blob/4b489fe/src/class_syntax/decorator/validation_decorator.ts#L173)*

___
<a id="schemavalidator"></a>

###  SchemaValidator

**Ƭ SchemaValidator**: *`function`*

*Defined in [type/schema_validator.ts:41](https://github.com/krnik/vjs-validator/blob/4b489fe/src/type/schema_validator.ts#L41)*

#### Type declaration
▸(v: *`unknown`*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| v | `unknown` |

**Returns:** `void`

___
<a id="shape"></a>

###  Shape

**Ƭ Shape**: *`Pick`<`S`, `{ [K in keyof S]: K extends M ? K : S[K] extends Function ? never : K; }[keyof S]`>*

*Defined in [class_syntax.ts:27](https://github.com/krnik/vjs-validator/blob/4b489fe/src/class_syntax.ts#L27)*

Mapped type used to extract properties of a class. Also just a hint for TypeScript.

___
<a id="syncvalidationfunction"></a>

###  SyncValidationFunction

**Ƭ SyncValidationFunction**: *`function`*

*Defined in [core/jbq.ts:7](https://github.com/krnik/vjs-validator/blob/4b489fe/src/core/jbq.ts#L7)*

#### Type declaration
▸<`T`>(data: *`T`*): [ValidationResult](#validationresult)

**Type parameters:**

#### T 
**Parameters:**

| Name | Type |
| ------ | ------ |
| data | `T` |

**Returns:** [ValidationResult](#validationresult)

___
<a id="transformcallback"></a>

###  TransformCallback

**Ƭ TransformCallback**: *`function`*

*Defined in [class_syntax/class_validator_builder.ts:19](https://github.com/krnik/vjs-validator/blob/4b489fe/src/class_syntax/class_validator_builder.ts#L19)*

#### Type declaration
▸(propertyValue: *`unknown`*, data: *`unknown`*): `unknown`

**Parameters:**

| Name | Type |
| ------ | ------ |
| propertyValue | `unknown` |
| data | `unknown` |

**Returns:** `unknown`

___
<a id="typesignature"></a>

###  TypeSignature

**Ƭ TypeSignature**: *[`string`, [Option](#option)<`string`>, [Option](#option)<`string`>]*

*Defined in [core/type_store.ts:13](https://github.com/krnik/vjs-validator/blob/4b489fe/src/core/type_store.ts#L13)*

Represents single Type in the TypeStore instance.

___
<a id="types"></a>

###  Types

**Ƭ Types**: *`Exclude`<`T`, [Empty](#empty)>*

*Defined in [core/type_store.ts:18](https://github.com/krnik/vjs-validator/blob/4b489fe/src/core/type_store.ts#L18)*

Represents the typestate of TypeStore instance.

___
<a id="validationresult"></a>

###  ValidationResult

**Ƭ ValidationResult**: *[Option](#option)<[ValidationError](interfaces/validationerror.md)>*

*Defined in [core/jbq/jbq_typings.ts:66](https://github.com/krnik/vjs-validator/blob/4b489fe/src/core/jbq/jbq_typings.ts#L66)*

___
<a id="valuefactory"></a>

###  ValueFactory

**Ƭ ValueFactory**: *`function`*

*Defined in [class_syntax/decorator/validation_decorator.ts:38](https://github.com/krnik/vjs-validator/blob/4b489fe/src/class_syntax/decorator/validation_decorator.ts#L38)*

Decorator factory that expects value of type T as an argument.

#### Type declaration
▸(schemaValue: *`T`*): [Decorator](#decorator)

**Parameters:**

| Name | Type |
| ------ | ------ |
| schemaValue | `T` |

**Returns:** [Decorator](#decorator)

___

## Variables

<a id="asyncfnconstructor"></a>

### `<Const>` AsyncFnConstructor

**● AsyncFnConstructor**: *`any`* =  Object.getPrototypeOf(async function*(): unknown {}).constructor

*Defined in [core/jbq.ts:22](https://github.com/krnik/vjs-validator/blob/4b489fe/src/core/jbq.ts#L22)*

___
<a id="constructor_name"></a>

### `<Const>` CONSTRUCTOR_NAME

**● CONSTRUCTOR_NAME**: *"constructorName"* = "constructorName"

*Defined in [misc/constants.ts:1](https://github.com/krnik/vjs-validator/blob/4b489fe/src/misc/constants.ts#L1)*

___
<a id="create_instance"></a>

### `<Const>` CREATE_INSTANCE

**● CREATE_INSTANCE**: *`unique symbol`* =  Symbol('create_instance')

*Defined in [class_syntax/class_validator_builder.ts:7](https://github.com/krnik/vjs-validator/blob/4b489fe/src/class_syntax/class_validator_builder.ts#L7)*

___
<a id="default_async_interval"></a>

### `<Const>` DEFAULT_ASYNC_INTERVAL

**● DEFAULT_ASYNC_INTERVAL**: *`50`* = 50

*Defined in [misc/constants.ts:84](https://github.com/krnik/vjs-validator/blob/4b489fe/src/misc/constants.ts#L84)*

Default value for the `JBQOptions.asyncInterval` property.

___
<a id="every"></a>

### `<Const>` EVERY

**● EVERY**: *"every"* = "every"

*Defined in [misc/constants.ts:11](https://github.com/krnik/vjs-validator/blob/4b489fe/src/misc/constants.ts#L11)*

___
<a id="expression_regex"></a>

### `<Const>` EXPRESSION_REGEX

**● EXPRESSION_REGEX**: *`RegExp`* =  /{{(.*?)}}/g

*Defined in [misc/constants.ts:77](https://github.com/krnik/vjs-validator/blob/4b489fe/src/misc/constants.ts#L77)*

Regular expression used to find templte expressions during compilation. They're executed during compile time and should return values that are possible to represent as a literal.

Reason why we might want to have such expressions is that its much more efficient to execute expression once and save its result instead of executing it every time some value is validated.

___
<a id="includes"></a>

### `<Const>` INCLUDES

**● INCLUDES**: *"includes"* = "includes"

*Defined in [misc/constants.ts:8](https://github.com/krnik/vjs-validator/blob/4b489fe/src/misc/constants.ts#L8)*

___
<a id="instance_of"></a>

### `<Const>` INSTANCE_OF

**● INSTANCE_OF**: *"instanceOf"* = "instanceOf"

*Defined in [misc/constants.ts:2](https://github.com/krnik/vjs-validator/blob/4b489fe/src/misc/constants.ts#L2)*

___
<a id="key_count"></a>

### `<Const>` KEY_COUNT

**● KEY_COUNT**: *"keyCount"* = "keyCount"

*Defined in [misc/constants.ts:6](https://github.com/krnik/vjs-validator/blob/4b489fe/src/misc/constants.ts#L6)*

___
<a id="len"></a>

### `<Const>` LEN

**● LEN**: *"len"* = "len"

*Defined in [misc/constants.ts:15](https://github.com/krnik/vjs-validator/blob/4b489fe/src/misc/constants.ts#L15)*

___
<a id="multiple_of"></a>

### `<Const>` MULTIPLE_OF

**● MULTIPLE_OF**: *"multipleOf"* = "multipleOf"

*Defined in [misc/constants.ts:3](https://github.com/krnik/vjs-validator/blob/4b489fe/src/misc/constants.ts#L3)*

___
<a id="one_of"></a>

### `<Const>` ONE_OF

**● ONE_OF**: *"oneOf"* = "oneOf"

*Defined in [misc/constants.ts:9](https://github.com/krnik/vjs-validator/blob/4b489fe/src/misc/constants.ts#L9)*

___
<a id="properties"></a>

### `<Const>` PROPERTIES

**● PROPERTIES**: *"properties"* = "properties"

*Defined in [misc/constants.ts:4](https://github.com/krnik/vjs-validator/blob/4b489fe/src/misc/constants.ts#L4)*

___
<a id="prop_count"></a>

### `<Const>` PROP_COUNT

**● PROP_COUNT**: *"propCount"* = "propCount"

*Defined in [misc/constants.ts:5](https://github.com/krnik/vjs-validator/blob/4b489fe/src/misc/constants.ts#L5)*

___
<a id="prop_data_path"></a>

### `<Const>` PROP_DATA_PATH

**● PROP_DATA_PATH**: *"$dataPath"* = "$dataPath"

*Defined in [misc/constants.ts:81](https://github.com/krnik/vjs-validator/blob/4b489fe/src/misc/constants.ts#L81)*

___
<a id="regex"></a>

### `<Const>` REGEX

**● REGEX**: *"regex"* = "regex"

*Defined in [misc/constants.ts:10](https://github.com/krnik/vjs-validator/blob/4b489fe/src/misc/constants.ts#L10)*

___
<a id="required"></a>

### `<Const>` REQUIRED

**● REQUIRED**: *"required"* = "required"

*Defined in [misc/constants.ts:7](https://github.com/krnik/vjs-validator/blob/4b489fe/src/misc/constants.ts#L7)*

___
<a id="schema"></a>

### `<Const>` SCHEMA

**● SCHEMA**: *`unique symbol`* =  Symbol('schema')

*Defined in [class_syntax/class_validator_builder.ts:6](https://github.com/krnik/vjs-validator/blob/4b489fe/src/class_syntax/class_validator_builder.ts#L6)*

___
<a id="schema_path_separator"></a>

### `<Const>` SCHEMA_PATH_SEPARATOR

**● SCHEMA_PATH_SEPARATOR**: *"/"* = "/"

*Defined in [misc/constants.ts:79](https://github.com/krnik/vjs-validator/blob/4b489fe/src/misc/constants.ts#L79)*

___
<a id="some"></a>

### `<Const>` SOME

**● SOME**: *"some"* = "some"

*Defined in [misc/constants.ts:14](https://github.com/krnik/vjs-validator/blob/4b489fe/src/misc/constants.ts#L14)*

___
<a id="sym_schema_collection"></a>

### `<Const>` SYM_SCHEMA_COLLECTION

**● SYM_SCHEMA_COLLECTION**: *`unique symbol`* =  Symbol.for('schema_collection')

*Defined in [misc/constants.ts:61](https://github.com/krnik/vjs-validator/blob/4b489fe/src/misc/constants.ts#L61)*

Similar to _SYM\_SCHEMA\_PROPERTIES_. _SYM\_SCHEMA\_COLLECTION_ expects schema object as a value while _SYM\_SCHEMA\_PROPERTIES_ expects object which properties are different subschemas.

Schema from this property is applied to all elements of a collection.

Examples
========

Following schema defines an `array` type that have all its elements of `number` type.

```
 const schema = {
     type: "array",
     [SYM_SCHEMA_COLLECTION]: {
         type: "number",
     }
 };
```

___
<a id="sym_schema_properties"></a>

### `<Const>` SYM_SCHEMA_PROPERTIES

**● SYM_SCHEMA_PROPERTIES**: *`unique symbol`* =  Symbol.for('schema_properties')

*Defined in [misc/constants.ts:42](https://github.com/krnik/vjs-validator/blob/4b489fe/src/misc/constants.ts#L42)*

Schema property used to indicate that the follownig schema expects data to have some properties to validate. Used to describe nested schemas.

Examples
========

Following schema defines an `object` type with two properties `name` and `email` of type `string`

```
 const schema = {
     type: "object",
     [SYM_SCHEMA_PROPERTIES]: {
         name: { type: "string" },
         email: { type: "string" },
     }
 };
```

___
<a id="token_break"></a>

### `<Const>` TOKEN_BREAK

**● TOKEN_BREAK**: *"//{break}"* = "//{break}"

*Defined in [misc/constants.ts:66](https://github.com/krnik/vjs-validator/blob/4b489fe/src/misc/constants.ts#L66)*

Token that is replaced by labeled break statement during compilation.

___
<a id="type"></a>

### `<Const>` TYPE

**● TYPE**: *"type"* = "type"

*Defined in [misc/constants.ts:13](https://github.com/krnik/vjs-validator/blob/4b489fe/src/misc/constants.ts#L13)*

___
<a id="types"></a>

### `<Let>` TYPES

**● TYPES**: *[TypeStore](classes/typestore.md)<[Any](#any)>* =  types

*Defined in [class_syntax/build_method_compile.ts:10](https://github.com/krnik/vjs-validator/blob/4b489fe/src/class_syntax/build_method_compile.ts#L10)*

___
<a id="typeany"></a>

### `<Const>` TypeAny

**● TypeAny**: *[TypeInstance](classes/typeinstance.md)<[ANY](enums/type_name.md#any), "required" \| "type", `undefined`>* =  new TypeInstance(TYPE_NAME.ANY)
    .setKeyword(TYPE, {
        validator({ variableName }: ParseValues): string {
            return CodeGenerator.renderLabeledBreakStatement(variableName);
        },
        kind: KeywordValidationFunctionKind.Macro,
        schemaValidator: schemaValidate.primitive(TYPE_NAME.ANY, TYPE, 'string'),
    })
    .setKeyword(REQUIRED, {
        validator({ variableName, schemaValue, schemaPath }: ParseValues): string {
            return schemaValue
                ? `if (${variableName} === undefined)
                    return { message: "Data is required but got undefined.", path: "${schemaPath}" };`
                : `if (${variableName} === undefined)  break label_${variableName};`;
            // pass create break function into helpers
        },
        kind: KeywordValidationFunctionKind.Macro,
        schemaValidator: schemaValidate.primitive(TYPE_NAME.ANY, REQUIRED, 'boolean'),
    })
    .setKeywordOrder([REQUIRED, TYPE])

*Defined in [type/any.ts:8](https://github.com/krnik/vjs-validator/blob/4b489fe/src/type/any.ts#L8)*

___
<a id="typearray"></a>

### `<Const>` TypeArray

**● TypeArray**: *[TypeInstance](classes/typeinstance.md)<[ARRAY](enums/type_name.md#array), "includes" \| "every" \| "type" \| "some" \| "len", [ANY](enums/type_name.md#any)>* =  new TypeInstance(TYPE_NAME.ARRAY)
    .derive(TypeAny)
    .setKeyword(TYPE, {
        validator(_schemaValue: string, $DATA: unknown): ValidationResult {
            if (!Array.isArray($DATA))
                return {
                    message: 'Data should be a {{schemaValue}} type.',
                    path: '{{schemaPath}}',
                };
        },
        schemaValidator: schemaValidate.primitive(TYPE_NAME.ARRAY, TYPE, 'string'),
    })
    .setKeyword(EVERY, {
        validator<T>(schemaValue: ArrIterCallback<boolean, T>, $DATA: AnyArray): ValidationResult {
            const len = $DATA.length;
            if (len !== 0)
                for (let i = 0; i < len; i++)
                    if (!schemaValue($DATA[i], i, $DATA))
                        return {
                            message: 'Every element of data should satisfy test function.',
                            path: '{{schemaPath}}',
                        };
        },
        schemaValidator: schemaValidate.isInstance(TYPE_NAME.ARRAY, EVERY, Function),
    })
    .setKeyword(SOME, {
        validator<T>(schemaValue: ArrIterCallback<boolean, T>, $DATA: AnyArray): ValidationResult {
            const len = $DATA.length;
            if (len !== 0) {
                let pass = false;
                for (let i = 0; i < len; i++)
                    // @ts-ignore
                    if (schemaValue($DATA[i], i, $DATA)) {
                        pass = true;
                        break;
                    }
                if (!pass)
                    return {
                        message: 'At least one element of data should satisfy test function.',
                        path: '{{schemaPath}}',
                    };
            }
        },
        schemaValidator: schemaValidate.isInstance(TYPE_NAME.ARRAY, SOME, Function),
    })
    .setKeyword(INCLUDES, {
        validator(schemaValue: unknown, $DATA: unknown[]): ValidationResult {
            let found = false;
            for (let i = 0; i < $DATA.length; i++)
                if ($DATA[i] === schemaValue) {
                    found = true;
                    break;
                }
            if (!found)
                return { message: 'Data should include {{schemaValue}}.', path: '{{schemaPath}}' };
        },
        schemaValidator: schemaValidate.any(TYPE_NAME.ARRAY, INCLUDES),
    })
    .setKeyword(LEN, {
        validator(
            parseValues: ParseValuesMinMax,
            checkDataPath: DataPathChecker,
            resolveDataPath: DataPathResolver,
        ): string | undefined {
            const { schemaValue, variableName, schemaPath } = parseValues;
            const dataVariable = `${variableName}.length`;

            if (TypeReflect.number(schemaValue))
                return `${CodeGenerator.renderIfStatement([
                    {
                        variableName: dataVariable,
                        value: schemaValue.toString(),
                        operator: ComparisonOperator.NotEqualStrict,
                    },
                ])}\n${CodeGenerator.renderReturnObject(
                    `Data length should be equal to ${schemaValue}.`,
                    schemaPath,
                )}`;

            if (checkDataPath(schemaValue)) {
                const varName = resolveDataPath(schemaValue);
                return `${CodeGenerator.renderIfStatement([
                    {
                        operator: ComparisonOperator.NotEqualStrict,
                        value: varName,
                        variableName: dataVariable,
                    },
                ])}\n${CodeGenerator.renderReturnObject(
                    `Data length should be equal to \${${varName}} ${CodeGenerator.renderDataPath(
                        schemaValue[PROP_DATA_PATH],
                    )}.`,
                    schemaPath,
                )}`;
            }

            const schemaMinMax = schemaValue as Exclude<ParseValuesMinMax['schemaValue'], number>;
            const valOrResolve = (value: unknown): [string, string] => {
                if (!checkDataPath(value)) return [`${value}`, value as string];
                const varName = resolveDataPath(value);
                return [`\${${varName}}`, varName];
            };

            if ('min' in schemaMinMax && 'max' in schemaMinMax) {
                const [minVal, min] = valOrResolve(schemaMinMax.min);
                const [maxVal, max] = valOrResolve(schemaMinMax.max);

                return `${CodeGenerator.renderIfStatement([
                    {
                        variableName: dataVariable,
                        value: min,
                        operator: ComparisonOperator.LessThan,
                    },
                    {
                        variableName: dataVariable,
                        value: max,
                        operator: ComparisonOperator.GreaterThan,
                    },
                ])}\n${CodeGenerator.renderReturnObject(
                    `Data length should be in range ${minVal}..${maxVal}.`,
                    schemaPath,
                )}`;
            }

            if ('min' in schemaMinMax) {
                const [minVal, min] = valOrResolve(schemaMinMax.min);
                return `${CodeGenerator.renderIfStatement([
                    {
                        operator: ComparisonOperator.LessThan,
                        value: min,
                        variableName: dataVariable,
                    },
                ])}\n${CodeGenerator.renderReturnObject(
                    `Data length should be greater than ${minVal}.`,
                    schemaPath,
                )}`;
            }

            if ('max' in schemaMinMax) {
                const [maxVal, max] = valOrResolve(schemaMinMax.max);
                return `${CodeGenerator.renderIfStatement([
                    {
                        operator: ComparisonOperator.GreaterThan,
                        value: max,
                        variableName: dataVariable,
                    },
                ])}\n${CodeGenerator.renderReturnObject(
                    `Data length should be smaller than ${maxVal}.`,
                    schemaPath,
                )}`;
            }
        },
        kind: KeywordValidationFunctionKind.Macro,
        // TODO: Ensure LEN is u32
        schemaValidator: schemaValidate.minMaxOrNumber(TYPE_NAME.ARRAY, LEN, true),
    })
    .setUseForOfLoop(false)

*Defined in [type/array.ts:19](https://github.com/krnik/vjs-validator/blob/4b489fe/src/type/array.ts#L19)*

___
<a id="typeboolean"></a>

### `<Const>` TypeBoolean

**● TypeBoolean**: *[TypeInstance](classes/typeinstance.md)<[BOOLEAN](enums/type_name.md#boolean), "value" \| "type", [ANY](enums/type_name.md#any)>* =  new TypeInstance(TYPE_NAME.BOOLEAN)
    .derive(TypeAny)
    .setKeyword(TYPE, {
        validator(_schemaValue: string, $DATA: unknown): ValidationResult {
            if ($DATA !== true && $DATA !== false)
                return {
                    message: 'Data should be {{schemaValue}} type. Got ${typeof $DATA}.',
                    path: '{{schemaPath}}',
                };
        },
        schemaValidator: schemaValidate.primitive(TYPE_NAME.BOOLEAN, TYPE, 'string'),
    })
    .setKeyword(VALUE, {
        validator(schemaValue: boolean, $DATA: boolean): ValidationResult {
            if (schemaValue !== $DATA)
                return {
                    message: `Data should be equal to {{resolvedValue || schemaValue}}. Got ${$DATA}.`,
                    path: '{{schemaPath}}',
                };
        },
        schemaValidator: schemaValidate.primitive(TYPE_NAME.BOOLEAN, VALUE, 'boolean', true),
    })

*Defined in [type/boolean.ts:7](https://github.com/krnik/vjs-validator/blob/4b489fe/src/type/boolean.ts#L7)*

___
<a id="typenumber"></a>

### `<Const>` TypeNumber

**● TypeNumber**: *[TypeInstance](classes/typeinstance.md)<[NUMBER](enums/type_name.md#number), "multipleOf" \| "oneOf" \| "value" \| "type", [ANY](enums/type_name.md#any)>* =  new TypeInstance(TYPE_NAME.NUMBER)
    .derive(TypeAny)
    .setKeyword(TYPE, {
        validator(_schemaValue: string, $DATA: unknown): ValidationResult {
            if (typeof $DATA !== 'number' || $DATA !== $DATA)
                return {
                    message: `Data should be a number (NaN excluded) type. Got ${typeof $DATA}.`,
                    path: '{{schemaPath}}',
                };
        },
        schemaValidator: schemaValidate.primitive(TYPE_NAME.NUMBER, TYPE, 'string'),
    })
    .setKeyword(VALUE, {
        validator(
            parseValues: ParseValuesMinMax,
            checkDataPath: DataPathChecker,
            resolveDataPath: DataPathResolver,
        ): string | undefined {
            const { schemaValue, schemaPath, variableName } = parseValues;
            if (TypeReflect.number(schemaValue))
                return `${CodeGenerator.renderIfStatement([
                    {
                        variableName,
                        operator: ComparisonOperator.NotEqualStrict,
                        value: schemaValue.toString(),
                    },
                ])}\n${CodeGenerator.renderReturnObject(
                    `Data should be equal to ${schemaValue}.`,
                    schemaPath,
                )}`;

            if (checkDataPath(schemaValue)) {
                const varName = resolveDataPath(schemaValue);
                return `${CodeGenerator.renderIfStatement([
                    {
                        value: varName,
                        variableName,
                        operator: ComparisonOperator.NotEqualStrict,
                    },
                ])}\n${CodeGenerator.renderReturnObject(
                    `Data should be equal to \${${varName}} ${CodeGenerator.renderDataPath(
                        schemaValue[PROP_DATA_PATH],
                    )}.`,
                    schemaPath,
                )}`;
            }

            const schemaMinMax = schemaValue as Exclude<ParseValuesMinMax['schemaValue'], number>;
            const valOrResolve = (value: unknown): [string, string] => {
                if (!checkDataPath(value)) return [`${value}`, `${value}`];
                const varName = resolveDataPath(value);
                return [`\${${varName}}`, varName];
            };

            if ('min' in schemaMinMax && 'max' in schemaMinMax) {
                const [minVal, min] = valOrResolve(schemaMinMax.min);
                const [maxVal, max] = valOrResolve(schemaMinMax.max);
                return `${CodeGenerator.renderIfStatement([
                    {
                        variableName,
                        value: min,
                        operator: ComparisonOperator.LessThan,
                    },
                    {
                        variableName,
                        value: max,
                        operator: ComparisonOperator.GreaterThan,
                    },
                ])}\n${CodeGenerator.renderReturnObject(
                    `Data should be in range ${minVal}..${maxVal}.`,
                    schemaPath,
                )}`;
            }

            if ('min' in schemaMinMax) {
                const [minVal, min] = valOrResolve(schemaMinMax.min);
                return `${CodeGenerator.renderIfStatement([
                    {
                        variableName,
                        value: min,
                        operator: ComparisonOperator.LessThan,
                    },
                ])}\n${CodeGenerator.renderReturnObject(
                    `Data should be greater than ${minVal}.`,
                    schemaPath,
                )}`;
            }

            if ('max' in schemaMinMax) {
                const [maxVal, max] = valOrResolve(schemaMinMax.max);
                return `${CodeGenerator.renderIfStatement([
                    {
                        variableName,
                        value: max,
                        operator: ComparisonOperator.GreaterThan,
                    },
                ])}\n${CodeGenerator.renderReturnObject(
                    `Data should be smaller than ${maxVal}.`,
                    schemaPath,
                )}`;
            }
        },
        kind: KeywordValidationFunctionKind.Macro,
        schemaValidator: schemaValidate.minMaxOrNumber(TYPE_NAME.NUMBER, VALUE, true),
    })
    .setKeyword(ONE_OF, {
        validator(schemaValue: number[], $DATA: number): ValidationResult {
            if (!schemaValue.includes($DATA))
                return {
                    message: 'Data should be one of {{schemaValue.toString()}}.',
                    path: '{{schemaPath}}',
                };
        },
        schemaValidator: schemaValidate.arrayOf(TYPE_NAME.NUMBER, ONE_OF, 'number'),
    })
    .setKeyword(MULTIPLE_OF, {
        validator(schemaValue: number, $DATA: number): ValidationResult {
            if ($DATA % schemaValue)
                return {
                    message: 'Data expected to be multiply of {{schemaValue}}.',
                    path: '{{schemaPath}}',
                };
        },
        // Should not accept NaN, Infinity, 0, -Infinity
        schemaValidator: schemaValidate.primitive(TYPE_NAME.NUMBER, MULTIPLE_OF, 'number', true),
    })

*Defined in [type/number.ts:13](https://github.com/krnik/vjs-validator/blob/4b489fe/src/type/number.ts#L13)*

___
<a id="typeobject"></a>

### `<Const>` TypeObject

**● TypeObject**: *[TypeInstance](classes/typeinstance.md)<[OBJECT](enums/type_name.md#object), "constructorName" \| "instanceOf" \| "properties" \| "propCount" \| "keyCount" \| "type", [ANY](enums/type_name.md#any)>* =  new TypeInstance(TYPE_NAME.OBJECT)
    .derive(TypeAny)
    .setKeyword(TYPE, {
        validator(_schemaValue: string, $DATA: unknown): ValidationResult {
            if (!($DATA && typeof $DATA === 'object' && !Array.isArray($DATA)))
                return {
                    message: 'Data should be {{schemaValue}} type.',
                    path: '{{schemaPath}}',
                };
        },
        schemaValidator: schemaValidate.primitive(TYPE_NAME.OBJECT, TYPE, 'string'),
    })
    .setKeyword(CONSTRUCTOR_NAME, {
        validator(schemaValue: string, $DATA: object): ValidationResult {
            if (Object.getPrototypeOf($DATA).constructor.name !== schemaValue)
                return {
                    message: 'Data should be direct instance of {{schemaValue}}.',
                    path: '{{schemaPath}}',
                };
        },
        schemaValidator: schemaValidate.primitive(TYPE_NAME.OBJECT, CONSTRUCTOR_NAME, 'string'),
    })
    .setKeyword(INSTANCE_OF, {
        validator(schemaValue: () => void, $DATA: object): ValidationResult {
            if (!($DATA instanceof schemaValue))
                return {
                    message: 'Data should be instance of {{schemaValue.name}}.',
                    path: '{{schemaPath}}',
                };
        },
        schemaValidator: schemaValidate.isInstance(TYPE_NAME.OBJECT, INSTANCE_OF, Function),
    })
    .setKeyword(PROPERTIES, {
        validator(schemaValue: (string | number | symbol)[], $DATA: object): ValidationResult {
            for (const key of schemaValue)
                if (!$DATA.hasOwnProperty(key))
                    return {
                        message: `Data should have ${key.toString()} property.`,
                        path: '{{schemaPath}}',
                    };
        },
        schemaValidator: schemaValidate.arrayOfPropertyNames(TYPE_NAME.OBJECT, PROPERTIES),
    })
    .setKeyword(KEY_COUNT, {
        validator: createPropKeyCountMacro((d): string => `Object.keys(${d}).length`),
        kind: KeywordValidationFunctionKind.Macro,
        schemaValidator: schemaValidate.minMaxOrNumber(TYPE_NAME.OBJECT, KEY_COUNT, true),
    })
    .setKeyword(PROP_COUNT, {
        validator: createPropKeyCountMacro(
            (d): string =>
                `(Object.getOwnPropertyNames(${d}).length + Object.getOwnPropertySymbols(${d}).length)`,
        ),
        kind: KeywordValidationFunctionKind.Macro,
        schemaValidator: schemaValidate.minMaxOrNumber(TYPE_NAME.OBJECT, PROP_COUNT, true),
    })

*Defined in [type/object.ts:116](https://github.com/krnik/vjs-validator/blob/4b489fe/src/type/object.ts#L116)*

___
<a id="typestring"></a>

### `<Const>` TypeString

**● TypeString**: *[TypeInstance](classes/typeinstance.md)<[STRING](enums/type_name.md#string), "oneOf" \| "regex" \| "type" \| "len", [ANY](enums/type_name.md#any)>* =  new TypeInstance(TYPE_NAME.STRING)
    .derive(TypeAny)
    .setKeyword(TYPE, {
        validator(_schemaValue: string, $DATA: unknown): ValidationResult {
            if (typeof $DATA !== 'string')
                return {
                    message: `Data should be a {{schemaValue}} type. Got ${typeof $DATA}.`,
                    path: '{{schemaPath}}',
                };
        },
        schemaValidator: schemaValidate.isInstance(TYPE_NAME.STRING, TYPE, String),
    })
    .setKeyword(REGEX, {
        validator(schemaValue: RegExp, $DATA: string): ValidationResult {
            if (!schemaValue.test($DATA))
                return {
                    message: 'Data expected to pass {{schemaValue.toString()}} test.',
                    path: '{{schemaPath}}',
                };
        },
        schemaValidator: schemaValidate.isInstance(TYPE_NAME.STRING, REGEX, RegExp),
    })
    .setKeyword(LEN, {
        validator(
            parseValues: ParseValuesMinMax,
            checkDataPath: DataPathChecker,
            resolveDataPath: DataPathResolver,
        ): string | undefined {
            const { schemaValue, variableName, schemaPath } = parseValues;
            const dataVar = `${variableName}.length`;

            if (TypeReflect.number(schemaValue))
                return `${CodeGenerator.renderIfStatement([
                    {
                        operator: ComparisonOperator.NotEqualStrict,
                        value: schemaValue.toString(),
                        variableName: dataVar,
                    },
                ])}\n${CodeGenerator.renderReturnObject(
                    `Data length should be equal to ${schemaValue}.`,
                    schemaPath,
                )}`;

            if (checkDataPath(schemaValue)) {
                const varName = resolveDataPath(schemaValue);
                return `${CodeGenerator.renderIfStatement([
                    {
                        operator: ComparisonOperator.NotEqualStrict,
                        value: varName,
                        variableName: dataVar,
                    },
                ])}\n${CodeGenerator.renderReturnObject(
                    `Data length should be equal to \${${varName}} ${CodeGenerator.renderDataPath(
                        schemaValue[PROP_DATA_PATH],
                    )}.`,
                    schemaPath,
                )}`;
            }

            const schemaMinMax = schemaValue as Exclude<ParseValuesMinMax['schemaValue'], number>;
            const valOrResolve = (value: unknown): [string, string] => {
                if (!checkDataPath(value)) return [`${value}`, `${value}`];
                const varName = resolveDataPath(value);
                return [`\${${varName}}`, varName];
            };

            if ('min' in schemaMinMax && 'max' in schemaMinMax) {
                const [minVal, min] = valOrResolve(schemaMinMax.min);
                const [maxVal, max] = valOrResolve(schemaMinMax.max);
                return `${CodeGenerator.renderIfStatement([
                    {
                        operator: ComparisonOperator.LessThan,
                        value: min,
                        variableName: dataVar,
                    },
                    {
                        operator: ComparisonOperator.GreaterThan,
                        value: max,
                        variableName: dataVar,
                    },
                ])}\n${CodeGenerator.renderReturnObject(
                    `Data length should be in range ${minVal}..${maxVal}.`,
                    schemaPath,
                )}`;
            }

            if ('min' in schemaMinMax) {
                const [minVal, min] = valOrResolve(schemaMinMax.min);
                return `${CodeGenerator.renderIfStatement([
                    {
                        operator: ComparisonOperator.LessThan,
                        value: min,
                        variableName: dataVar,
                    },
                ])}\n${CodeGenerator.renderReturnObject(
                    `Data length should be greater than ${minVal}.`,
                    schemaPath,
                )}`;
            }

            if ('max' in schemaMinMax) {
                const [maxVal, max] = valOrResolve(schemaMinMax.max);
                return `${CodeGenerator.renderIfStatement([
                    {
                        operator: ComparisonOperator.GreaterThan,
                        value: max,
                        variableName: dataVar,
                    },
                ])}\n${CodeGenerator.renderReturnObject(
                    `Data length should be smaller than ${maxVal}.`,
                    schemaPath,
                )}`;
            }
        },
        schemaValidator: schemaValidate.minMaxOrNumber(TYPE_NAME.STRING, LEN, true),
        kind: KeywordValidationFunctionKind.Macro,
    })
    .setKeyword(ONE_OF, {
        validator(schemaValue: string[], $DATA: string): ValidationResult {
            if (!schemaValue.includes($DATA))
                return {
                    message: 'Data expected to be one of [{{schemaValue.toString()}}].',
                    path: '{{schemaPath}}',
                };
        },
        schemaValidator: schemaValidate.arrayOf(TYPE_NAME.STRING, ONE_OF, 'string'),
    })

*Defined in [type/string.ts:13](https://github.com/krnik/vjs-validator/blob/4b489fe/src/type/string.ts#L13)*

___
<a id="value"></a>

### `<Const>` VALUE

**● VALUE**: *"value"* = "value"

*Defined in [misc/constants.ts:12](https://github.com/krnik/vjs-validator/blob/4b489fe/src/misc/constants.ts#L12)*

___
<a id="array"></a>

### `<Const>` array

**● array**: *`function`* =  decoratorFactory(TYPE)(TYPE_NAME.ARRAY)

*Defined in [class_syntax/decorator/validation_decorator.ts:86](https://github.com/krnik/vjs-validator/blob/4b489fe/src/class_syntax/decorator/validation_decorator.ts#L86)*

Shorthand `@type` decorator that assigns schema `type` property to `array`

#### Type declaration
▸(...args: *[DecoratorParams](#decoratorparams)*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Rest` args | [DecoratorParams](#decoratorparams) |

**Returns:** `void`

___
<a id="boolean"></a>

### `<Const>` boolean

**● boolean**: *`function`* =  decoratorFactory(TYPE)(TYPE_NAME.BOOLEAN)

*Defined in [class_syntax/decorator/validation_decorator.ts:89](https://github.com/krnik/vjs-validator/blob/4b489fe/src/class_syntax/decorator/validation_decorator.ts#L89)*

Shorthand `@type` decorator that assigns schema `type` property to `boolean`

#### Type declaration
▸(...args: *[DecoratorParams](#decoratorparams)*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Rest` args | [DecoratorParams](#decoratorparams) |

**Returns:** `void`

___
<a id="collection"></a>

### `<Const>` collection

**● collection**: *`function`* =  decoratorSubSchemaFactory(SYM_SCHEMA_COLLECTION)

*Defined in [class_syntax/decorator/validation_decorator.ts:210](https://github.com/krnik/vjs-validator/blob/4b489fe/src/class_syntax/decorator/validation_decorator.ts#L210)*

Appends `Symbol.for('schema_collection')` to the schema.

When used on a class the provided class' schema will be always used to extend base schema.

When used on a property and a provided class `C` is decorated with `@instantiate` then the base schema will not be extended. Instead, `C` class will be used to create instances in the iterable elements.

Currently only array-like (integer indexed with `length` property) objects support creating instances since they're easily mutated.

#### Type declaration
▸<`T`>(schemaShape: *[Constructor](interfaces/constructor.md)<`T`>*): [Decorator](#decorator)

**Type parameters:**

#### T 
**Parameters:**

| Name | Type |
| ------ | ------ |
| schemaShape | [Constructor](interfaces/constructor.md)<`T`> |

**Returns:** [Decorator](#decorator)

___
<a id="constructorname"></a>

### `<Const>` constructorName

**● constructorName**: *`function`* =  decoratorFactory<string>(CONSTRUCTOR_NAME)

*Defined in [class_syntax/decorator/validation_decorator.ts:140](https://github.com/krnik/vjs-validator/blob/4b489fe/src/class_syntax/decorator/validation_decorator.ts#L140)*

Assigns schema `constructorName` property to provided value

#### Type declaration
▸(schemaValue: *`T`*): [Decorator](#decorator)

**Parameters:**

| Name | Type |
| ------ | ------ |
| schemaValue | `T` |

**Returns:** [Decorator](#decorator)

___
<a id="every"></a>

### `<Const>` every

**● every**: *`function`* =  decoratorFactory<never, 'callback'>(EVERY)

*Defined in [class_syntax/decorator/validation_decorator.ts:104](https://github.com/krnik/vjs-validator/blob/4b489fe/src/class_syntax/decorator/validation_decorator.ts#L104)*

Assigns schema `every` property to provided callback

#### Type declaration
▸<`T`>(callback: *[ArrIterCallback](#arritercallback)<`boolean`, `T`>*): [Decorator](#decorator)

**Type parameters:**

#### T 
**Parameters:**

| Name | Type |
| ------ | ------ |
| callback | [ArrIterCallback](#arritercallback)<`boolean`, `T`> |

**Returns:** [Decorator](#decorator)

___
<a id="includes"></a>

### `<Const>` includes

**● includes**: *`function`* =  decoratorFactory(INCLUDES)

*Defined in [class_syntax/decorator/validation_decorator.ts:110](https://github.com/krnik/vjs-validator/blob/4b489fe/src/class_syntax/decorator/validation_decorator.ts#L110)*

Assigns schema `includes` property to provided value

#### Type declaration
▸(schemaValue: *`T`*): [Decorator](#decorator)

**Parameters:**

| Name | Type |
| ------ | ------ |
| schemaValue | `T` |

**Returns:** [Decorator](#decorator)

___
<a id="instanceof"></a>

### `<Const>` instanceOf

**● instanceOf**: *`function`* =  decoratorFactory<never, 'constructor'>(INSTANCE_OF)

*Defined in [class_syntax/decorator/validation_decorator.ts:137](https://github.com/krnik/vjs-validator/blob/4b489fe/src/class_syntax/decorator/validation_decorator.ts#L137)*

Assigns schema `instanceOf` property to provided value

#### Type declaration
▸<`T`>(schemaShape: *[Constructor](interfaces/constructor.md)<`T`>*): [Decorator](#decorator)

**Type parameters:**

#### T 
**Parameters:**

| Name | Type |
| ------ | ------ |
| schemaShape | [Constructor](interfaces/constructor.md)<`T`> |

**Returns:** [Decorator](#decorator)

___
<a id="keycount"></a>

### `<Const>` keyCount

**● keyCount**: *`function`* =  decoratorFactory<ParseValuesMinMax['schemaValue']>(KEY_COUNT)

*Defined in [class_syntax/decorator/validation_decorator.ts:128](https://github.com/krnik/vjs-validator/blob/4b489fe/src/class_syntax/decorator/validation_decorator.ts#L128)*

Assigns schema `keyCount` property to provided value

#### Type declaration
▸(schemaValue: *`T`*): [Decorator](#decorator)

**Parameters:**

| Name | Type |
| ------ | ------ |
| schemaValue | `T` |

**Returns:** [Decorator](#decorator)

___
<a id="len"></a>

### `<Const>` len

**● len**: *`function`* =  decoratorFactory<ParseValuesMinMax['schemaValue']>(LEN)

*Defined in [class_syntax/decorator/validation_decorator.ts:113](https://github.com/krnik/vjs-validator/blob/4b489fe/src/class_syntax/decorator/validation_decorator.ts#L113)*

Assigns schema `len` property to provided value

#### Type declaration
▸(schemaValue: *`T`*): [Decorator](#decorator)

**Parameters:**

| Name | Type |
| ------ | ------ |
| schemaValue | `T` |

**Returns:** [Decorator](#decorator)

___
<a id="multipleof"></a>

### `<Const>` multipleOf

**● multipleOf**: *`function`* =  decoratorFactory<number>(MULTIPLE_OF)

*Defined in [class_syntax/decorator/validation_decorator.ts:119](https://github.com/krnik/vjs-validator/blob/4b489fe/src/class_syntax/decorator/validation_decorator.ts#L119)*

Assigns schema `multipleOf` property to provided number

#### Type declaration
▸(schemaValue: *`T`*): [Decorator](#decorator)

**Parameters:**

| Name | Type |
| ------ | ------ |
| schemaValue | `T` |

**Returns:** [Decorator](#decorator)

___
<a id="number"></a>

### `<Const>` number

**● number**: *`function`* =  decoratorFactory(TYPE)(TYPE_NAME.NUMBER)

*Defined in [class_syntax/decorator/validation_decorator.ts:92](https://github.com/krnik/vjs-validator/blob/4b489fe/src/class_syntax/decorator/validation_decorator.ts#L92)*

Shorthand `@type` decorator that assigns schema `type` property to `number`

#### Type declaration
▸(...args: *[DecoratorParams](#decoratorparams)*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Rest` args | [DecoratorParams](#decoratorparams) |

**Returns:** `void`

___
<a id="object"></a>

### `<Const>` object

**● object**: *`function`* =  decoratorFactory(TYPE)(TYPE_NAME.OBJECT)

*Defined in [class_syntax/decorator/validation_decorator.ts:95](https://github.com/krnik/vjs-validator/blob/4b489fe/src/class_syntax/decorator/validation_decorator.ts#L95)*

Shorthand `@type` decorator that assigns schema `type` property to `object`

#### Type declaration
▸(...args: *[DecoratorParams](#decoratorparams)*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Rest` args | [DecoratorParams](#decoratorparams) |

**Returns:** `void`

___
<a id="oneof"></a>

### `<Const>` oneOf

**● oneOf**: *`function`* =  decoratorFactory<string[] | number[]>(ONE_OF)

*Defined in [class_syntax/decorator/validation_decorator.ts:125](https://github.com/krnik/vjs-validator/blob/4b489fe/src/class_syntax/decorator/validation_decorator.ts#L125)*

Assigns schema `oneOf` property to provided value

#### Type declaration
▸(schemaValue: *`T`*): [Decorator](#decorator)

**Parameters:**

| Name | Type |
| ------ | ------ |
| schemaValue | `T` |

**Returns:** [Decorator](#decorator)

___
<a id="optional"></a>

### `<Const>` optional

**● optional**: *`function`* =  decoratorFactory(REQUIRED)(false)

*Defined in [class_syntax/decorator/validation_decorator.ts:101](https://github.com/krnik/vjs-validator/blob/4b489fe/src/class_syntax/decorator/validation_decorator.ts#L101)*

Assigns schema `required` property to `false`

#### Type declaration
▸(...args: *[DecoratorParams](#decoratorparams)*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Rest` args | [DecoratorParams](#decoratorparams) |

**Returns:** `void`

___
<a id="propcount"></a>

### `<Const>` propCount

**● propCount**: *`function`* =  decoratorFactory<ParseValuesMinMax['schemaValue']>(PROP_COUNT)

*Defined in [class_syntax/decorator/validation_decorator.ts:131](https://github.com/krnik/vjs-validator/blob/4b489fe/src/class_syntax/decorator/validation_decorator.ts#L131)*

Assigns schema `propCount` property to provided value

#### Type declaration
▸(schemaValue: *`T`*): [Decorator](#decorator)

**Parameters:**

| Name | Type |
| ------ | ------ |
| schemaValue | `T` |

**Returns:** [Decorator](#decorator)

___
<a id="properties"></a>

### `<Const>` properties

**● properties**: *`function`* =  decoratorFactory<(string | symbol | number)[]>(PROPERTIES)

*Defined in [class_syntax/decorator/validation_decorator.ts:134](https://github.com/krnik/vjs-validator/blob/4b489fe/src/class_syntax/decorator/validation_decorator.ts#L134)*

Assigns schema `properties` property to provided value

#### Type declaration
▸(schemaValue: *`T`*): [Decorator](#decorator)

**Parameters:**

| Name | Type |
| ------ | ------ |
| schemaValue | `T` |

**Returns:** [Decorator](#decorator)

___
<a id="regex"></a>

### `<Const>` regex

**● regex**: *`function`* =  decoratorFactory<RegExp>(REGEX)

*Defined in [class_syntax/decorator/validation_decorator.ts:122](https://github.com/krnik/vjs-validator/blob/4b489fe/src/class_syntax/decorator/validation_decorator.ts#L122)*

Assigns schema `regex` property to provided RegExp instance

#### Type declaration
▸(schemaValue: *`T`*): [Decorator](#decorator)

**Parameters:**

| Name | Type |
| ------ | ------ |
| schemaValue | `T` |

**Returns:** [Decorator](#decorator)

___
<a id="setlogger"></a>

###  setLogger

**● setLogger**: *[setLogger](classes/logservice.md#setlogger)*

*Defined in [lib.ts:5](https://github.com/krnik/vjs-validator/blob/4b489fe/src/lib.ts#L5)*

___
<a id="shape"></a>

### `<Const>` shape

**● shape**: *`function`* =  decoratorSubSchemaFactory(SYM_SCHEMA_PROPERTIES)

*Defined in [class_syntax/decorator/validation_decorator.ts:195](https://github.com/krnik/vjs-validator/blob/4b489fe/src/class_syntax/decorator/validation_decorator.ts#L195)*

Extends schema with provided class' schema.

If provided class is decorated with `@instantiate` decorator then schema is not extended. Instead provided class instance will be created.

#### Type declaration
▸<`T`>(schemaShape: *[Constructor](interfaces/constructor.md)<`T`>*): [Decorator](#decorator)

**Type parameters:**

#### T 
**Parameters:**

| Name | Type |
| ------ | ------ |
| schemaShape | [Constructor](interfaces/constructor.md)<`T`> |

**Returns:** [Decorator](#decorator)

___
<a id="some"></a>

### `<Const>` some

**● some**: *`function`* =  decoratorFactory<never, 'callback'>(SOME)

*Defined in [class_syntax/decorator/validation_decorator.ts:107](https://github.com/krnik/vjs-validator/blob/4b489fe/src/class_syntax/decorator/validation_decorator.ts#L107)*

Assigns schema `some` property to provided callback

#### Type declaration
▸<`T`>(callback: *[ArrIterCallback](#arritercallback)<`boolean`, `T`>*): [Decorator](#decorator)

**Type parameters:**

#### T 
**Parameters:**

| Name | Type |
| ------ | ------ |
| callback | [ArrIterCallback](#arritercallback)<`boolean`, `T`> |

**Returns:** [Decorator](#decorator)

___
<a id="string"></a>

### `<Const>` string

**● string**: *`function`* =  decoratorFactory(TYPE)(TYPE_NAME.STRING)

*Defined in [class_syntax/decorator/validation_decorator.ts:98](https://github.com/krnik/vjs-validator/blob/4b489fe/src/class_syntax/decorator/validation_decorator.ts#L98)*

Shorthand `@type` decorator that assigns schema `type` property to `string`

#### Type declaration
▸(...args: *[DecoratorParams](#decoratorparams)*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Rest` args | [DecoratorParams](#decoratorparams) |

**Returns:** `void`

___
<a id="type"></a>

### `<Const>` type

**● type**: *`function`* =  decoratorFactory<string>(TYPE)

*Defined in [class_syntax/decorator/validation_decorator.ts:80](https://github.com/krnik/vjs-validator/blob/4b489fe/src/class_syntax/decorator/validation_decorator.ts#L80)*

_Constructor / Property Decorator_

Assigns `type` property to the root schema (if class is decorated) or to the decorated property of the subSchemas.

By default decorated classes have `type` property set to `object`.

#### Type declaration
▸(schemaValue: *`T`*): [Decorator](#decorator)

**Parameters:**

| Name | Type |
| ------ | ------ |
| schemaValue | `T` |

**Returns:** [Decorator](#decorator)

___
<a id="types"></a>

### `<Const>` types

**● types**: *[TypeStore](classes/typestore.md)<[[ANY](enums/type_name.md#any), "required" \| "type", `undefined`] \| [[ARRAY](enums/type_name.md#array), "includes" \| "every" \| "type" \| "some" \| "len", [ANY](enums/type_name.md#any)] \| [[BOOLEAN](enums/type_name.md#boolean), "value" \| "type", [ANY](enums/type_name.md#any)] \| [[NUMBER](enums/type_name.md#number), "multipleOf" \| "oneOf" \| "value" \| "type", [ANY](enums/type_name.md#any)] \| [[OBJECT](enums/type_name.md#object), "constructorName" \| "instanceOf" \| "properties" \| "propCount" \| "keyCount" \| "type", [ANY](enums/type_name.md#any)] \| [[STRING](enums/type_name.md#string), "oneOf" \| "regex" \| "type" \| "len", [ANY](enums/type_name.md#any)]>* =  createTypes()

*Defined in [type/mod.ts:20](https://github.com/krnik/vjs-validator/blob/4b489fe/src/type/mod.ts#L20)*

___
<a id="value"></a>

### `<Const>` value

**● value**: *`function`* =  decoratorFactory<ParseValuesMinMax['schemaValue'] | boolean>(VALUE)

*Defined in [class_syntax/decorator/validation_decorator.ts:116](https://github.com/krnik/vjs-validator/blob/4b489fe/src/class_syntax/decorator/validation_decorator.ts#L116)*

Assigns schema `value` property to provided value

#### Type declaration
▸(schemaValue: *`T`*): [Decorator](#decorator)

**Parameters:**

| Name | Type |
| ------ | ------ |
| schemaValue | `T` |

**Returns:** [Decorator](#decorator)

___

## Functions

<a id="asyncfnfactory"></a>

###  AsyncFnFactory

▸ **AsyncFnFactory**(fn: *`GeneratorFunction`*): [AsyncValidationFunction](#asyncvalidationfunction)

*Defined in [core/jbq.ts:24](https://github.com/krnik/vjs-validator/blob/4b489fe/src/core/jbq.ts#L24)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| fn | `GeneratorFunction` |

**Returns:** [AsyncValidationFunction](#asyncvalidationfunction)

___
<a id="any"></a>

### `<Const>` any

▸ **any**(typeName: *`string`*, methodName: *`string`*): [SchemaValidator](#schemavalidator)

*Defined in [type/schema_validator.ts:197](https://github.com/krnik/vjs-validator/blob/4b489fe/src/type/schema_validator.ts#L197)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| typeName | `string` |
| methodName | `string` |

**Returns:** [SchemaValidator](#schemavalidator)

___
<a id="arrayof"></a>

###  arrayOf

▸ **arrayOf**<`T`>(typeName: *`string`*, methodName: *`string`*, elementType: *`T`*): [SchemaValidator](#schemavalidator)

*Defined in [type/schema_validator.ts:171](https://github.com/krnik/vjs-validator/blob/4b489fe/src/type/schema_validator.ts#L171)*

**Type parameters:**

#### T :  `keyof TypeReflect`
**Parameters:**

| Name | Type |
| ------ | ------ |
| typeName | `string` |
| methodName | `string` |
| elementType | `T` |

**Returns:** [SchemaValidator](#schemavalidator)

___
<a id="arrayofpropertynames"></a>

###  arrayOfPropertyNames

▸ **arrayOfPropertyNames**(typeName: *`string`*, methodName: *`string`*): [SchemaValidator](#schemavalidator)

*Defined in [type/schema_validator.ts:142](https://github.com/krnik/vjs-validator/blob/4b489fe/src/type/schema_validator.ts#L142)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| typeName | `string` |
| methodName | `string` |

**Returns:** [SchemaValidator](#schemavalidator)

___
<a id="compileclass"></a>

###  compileClass

▸ **compileClass**(constructor: *[Constructor](interfaces/constructor.md)*, options?: *[CompileOptions](interfaces/compileoptions.md)*): `void`

*Defined in [class_syntax/build_method_compile.ts:37](https://github.com/krnik/vjs-validator/blob/4b489fe/src/class_syntax/build_method_compile.ts#L37)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| constructor | [Constructor](interfaces/constructor.md) | - |
| `Default value` options | [CompileOptions](interfaces/compileoptions.md) |  {} |

**Returns:** `void`

___
<a id="createpropkeycountmacro"></a>

###  createPropKeyCountMacro

▸ **createPropKeyCountMacro**(resolveDataVarCmp: *`function`*): [Macro](enums/keywordvalidationfunctionkind.md#macro)

*Defined in [type/object.ts:24](https://github.com/krnik/vjs-validator/blob/4b489fe/src/type/object.ts#L24)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| resolveDataVarCmp | `function` |

**Returns:** [Macro](enums/keywordvalidationfunctionkind.md#macro)

___
<a id="createtypes"></a>

###  createTypes

▸ **createTypes**(): [TypeStore](classes/typestore.md)<[[ANY](enums/type_name.md#any), "required" \| "type", `undefined`] \| [[ARRAY](enums/type_name.md#array), "includes" \| "every" \| "type" \| "some" \| "len", [ANY](enums/type_name.md#any)] \| [[BOOLEAN](enums/type_name.md#boolean), "value" \| "type", [ANY](enums/type_name.md#any)] \| [[NUMBER](enums/type_name.md#number), "multipleOf" \| "oneOf" \| "value" \| "type", [ANY](enums/type_name.md#any)] \| [[OBJECT](enums/type_name.md#object), "constructorName" \| "instanceOf" \| "properties" \| "propCount" \| "keyCount" \| "type", [ANY](enums/type_name.md#any)] \| [[STRING](enums/type_name.md#string), "oneOf" \| "regex" \| "type" \| "len", [ANY](enums/type_name.md#any)]>

*Defined in [type/mod.ts:10](https://github.com/krnik/vjs-validator/blob/4b489fe/src/type/mod.ts#L10)*

**Returns:** [TypeStore](classes/typestore.md)<[[ANY](enums/type_name.md#any), "required" \| "type", `undefined`] \| [[ARRAY](enums/type_name.md#array), "includes" \| "every" \| "type" \| "some" \| "len", [ANY](enums/type_name.md#any)] \| [[BOOLEAN](enums/type_name.md#boolean), "value" \| "type", [ANY](enums/type_name.md#any)] \| [[NUMBER](enums/type_name.md#number), "multipleOf" \| "oneOf" \| "value" \| "type", [ANY](enums/type_name.md#any)] \| [[OBJECT](enums/type_name.md#object), "constructorName" \| "instanceOf" \| "properties" \| "propCount" \| "keyCount" \| "type", [ANY](enums/type_name.md#any)] \| [[STRING](enums/type_name.md#string), "oneOf" \| "regex" \| "type" \| "len", [ANY](enums/type_name.md#any)]>

___
<a id="datapath"></a>

###  dataPath

▸ **dataPath**(schemaValue: *`unknown`*): `boolean`

*Defined in [type/schema_validator.ts:32](https://github.com/krnik/vjs-validator/blob/4b489fe/src/type/schema_validator.ts#L32)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| schemaValue | `unknown` |

**Returns:** `boolean`

___
<a id="decoratorfactory"></a>

###  decoratorFactory

▸ **decoratorFactory**<`T`,`BASE`>(schemaProperty: *`string` \| `symbol`*): [DecoratorFactoryB](#decoratorfactoryb)<`BASE`, `T`>

*Defined in [class_syntax/decorator/validation_decorator.ts:56](https://github.com/krnik/vjs-validator/blob/4b489fe/src/class_syntax/decorator/validation_decorator.ts#L56)*

**Type parameters:**

#### T 
#### BASE :  [DecoratorTypes](#decoratortypes)
**Parameters:**

| Name | Type |
| ------ | ------ |
| schemaProperty | `string` \| `symbol` |

**Returns:** [DecoratorFactoryB](#decoratorfactoryb)<`BASE`, `T`>

___
<a id="decoratorsubschemafactory"></a>

### `<Const>` decoratorSubSchemaFactory

▸ **decoratorSubSchemaFactory**(schemaSymbol: *[SchemaSymbol](#schemasymbol)*): [ConstructorFactory](#constructorfactory)

*Defined in [class_syntax/decorator/validation_decorator.ts:175](https://github.com/krnik/vjs-validator/blob/4b489fe/src/class_syntax/decorator/validation_decorator.ts#L175)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| schemaSymbol | [SchemaSymbol](#schemasymbol) |

**Returns:** [ConstructorFactory](#constructorfactory)

___
<a id="instantiate"></a>

###  instantiate

▸ **instantiate**(constructor: *[Constructor](interfaces/constructor.md)*): `void`

*Defined in [class_syntax/decorator/class_decorator.ts:14](https://github.com/krnik/vjs-validator/blob/4b489fe/src/class_syntax/decorator/class_decorator.ts#L14)*

_Constructor decorator._

Hints compiler that this class should be used to create instance if nested inside another class.

Default behavior for a nested class is a `schema provider`. That means that if class is not decorated with `@instantiate` then it will provide schema when used with `@shape` or `@collection` decorators.

**Parameters:**

| Name | Type |
| ------ | ------ |
| constructor | [Constructor](interfaces/constructor.md) |

**Returns:** `void`

___
<a id="isclassdecorator"></a>

###  isClassDecorator

▸ **isClassDecorator**(args: *[DecoratorParams](#decoratorparams)*): `boolean`

*Defined in [class_syntax/decorator/validation_decorator.ts:52](https://github.com/krnik/vjs-validator/blob/4b489fe/src/class_syntax/decorator/validation_decorator.ts#L52)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| args | [DecoratorParams](#decoratorparams) |

**Returns:** `boolean`

___
<a id="isinstance"></a>

###  isInstance

▸ **isInstance**(typeName: *`string`*, methodName: *`string`*, constructor: *[Constructor](interfaces/constructor.md)*): [SchemaValidator](#schemavalidator)

*Defined in [type/schema_validator.ts:64](https://github.com/krnik/vjs-validator/blob/4b489fe/src/type/schema_validator.ts#L64)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| typeName | `string` |
| methodName | `string` |
| constructor | [Constructor](interfaces/constructor.md) |

**Returns:** [SchemaValidator](#schemavalidator)

___
<a id="jbq"></a>

###  jbq

▸ **jbq**<`Schemas`,`SchemaKeys`,`Opt`>(types: *[TypeStore](classes/typestore.md)<[Any](#any)>*, schemas: *`Schemas`*, options?: *[Opt]()*): [JBQValidators](#jbqvalidators)<`Schemas`, `Opt`>

*Defined in [core/jbq.ts:37](https://github.com/krnik/vjs-validator/blob/4b489fe/src/core/jbq.ts#L37)*

Compiles `schemas` using `types` instance as source of validation code.

**Type parameters:**

#### Schemas 
#### SchemaKeys :  `keyof OmitSymbols<Schemas>`
#### Opt :  [Options](interfaces/options.md)
**Parameters:**

| Name | Type |
| ------ | ------ |
| types | [TypeStore](classes/typestore.md)<[Any](#any)> |
| schemas | `Schemas` |
| `Optional` options | [Opt]() |

**Returns:** [JBQValidators](#jbqvalidators)<`Schemas`, `Opt`>

___
<a id="minmaxornumber"></a>

###  minMaxOrNumber

▸ **minMaxOrNumber**(typeName: *`string`*, methodName: *`string`*, acceptDataPath?: *`undefined` \| `false` \| `true`*): [SchemaValidator](#schemavalidator)

*Defined in [type/schema_validator.ts:82](https://github.com/krnik/vjs-validator/blob/4b489fe/src/type/schema_validator.ts#L82)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| typeName | `string` |
| methodName | `string` |
| `Optional` acceptDataPath | `undefined` \| `false` \| `true` |

**Returns:** [SchemaValidator](#schemavalidator)

___
<a id="primitive"></a>

###  primitive

▸ **primitive**<`T`>(typeName: *`string`*, methodName: *`string`*, type: *`T`*, acceptDataPath?: *`undefined` \| `false` \| `true`*): [SchemaValidator](#schemavalidator)

*Defined in [type/schema_validator.ts:43](https://github.com/krnik/vjs-validator/blob/4b489fe/src/type/schema_validator.ts#L43)*

**Type parameters:**

#### T :  `keyof TypeReflect`
**Parameters:**

| Name | Type |
| ------ | ------ |
| typeName | `string` |
| methodName | `string` |
| type | `T` |
| `Optional` acceptDataPath | `undefined` \| `false` \| `true` |

**Returns:** [SchemaValidator](#schemavalidator)

___
<a id="schema"></a>

### `<Const>` schema

▸ **schema**(schemaObject: *[Schema](interfaces/schema.md)*): [Decorator](#decorator)

*Defined in [class_syntax/decorator/validation_decorator.ts:148](https://github.com/krnik/vjs-validator/blob/4b489fe/src/class_syntax/decorator/validation_decorator.ts#L148)*

Assigns received schemaObject to the target schema. Always succeeds (does not check if properties exists or not).

Use with caution.

**Parameters:**

| Name | Type |
| ------ | ------ |
| schemaObject | [Schema](interfaces/schema.md) |

**Returns:** [Decorator](#decorator)

___
<a id="setdefaulttypes"></a>

###  setDefaultTypes

▸ **setDefaultTypes**(types: *[TypeStore](classes/typestore.md)*): `void`

*Defined in [class_syntax/build_method_compile.ts:21](https://github.com/krnik/vjs-validator/blob/4b489fe/src/class_syntax/build_method_compile.ts#L21)*

Permanently changes the types used provided to the JBQ compilation function by `@compile()` decorator.

By default the `types` `TypeStore` instance from `/core/type/mod` module is used.

Changing default value will not affect the `types`. But changing the `types` value affect this modules' default types.

**Parameters:**

| Name | Type |
| ------ | ------ |
| types | [TypeStore](classes/typestore.md) |

**Returns:** `void`

___
<a id="transform"></a>

### `<Const>` transform

▸ **transform**<`P`,`D`,`R`>(callback: *`function`*): `PropertyDecorator`

*Defined in [class_syntax/decorator/alteration_decorator.ts:40](https://github.com/krnik/vjs-validator/blob/4b489fe/src/class_syntax/decorator/alteration_decorator.ts#L40)*

**Property decorator.**

**Applies only to instances.**

Defines the transformation function for a property.

Transformations are evaluated at the end of building instance.

Transformation function will set property value to a return value of a callback provided to the decorator function.

If transformation function returns Promise then the `.build` method of a class will also return Promise that eventually will resolve to the class instance. Since TypeScript does not support changing the class signature via decorators this behaviour needs to be manually `hinted` by setting `true` value in a generic parameter of `Validator` class.

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

*Defined in [class_syntax/decorator/alteration_decorator.ts:16](https://github.com/krnik/vjs-validator/blob/4b489fe/src/class_syntax/decorator/alteration_decorator.ts#L16)*

**Property decorator.**

**Applies only to instances.**

Defines default value factory for a property.

Evaluated only if property instances' property resolves to undefined.

The return value of provided function will be assigned to a property. As a first argument default factory will receive data that is received during building instance.

**Type parameters:**

#### T 
#### R 
**Parameters:**

| Name | Type |
| ------ | ------ |
| buildDefault | `function` |

**Returns:** `PropertyDecorator`

___

## Object literals

<a id="logger"></a>

### `<Let>` LOGGER

**LOGGER**: *`object`*

*Defined in [util/log_service.ts:7](https://github.com/krnik/vjs-validator/blob/4b489fe/src/util/log_service.ts#L7)*

<a id="logger.debug"></a>

####  debug

▸ **debug**(): `void`

*Defined in [util/log_service.ts:7](https://github.com/krnik/vjs-validator/blob/4b489fe/src/util/log_service.ts#L7)*

**Returns:** `void`

___

___
<a id="schemavalidationerror"></a>

### `<Const>` SchemaValidationError

**SchemaValidationError**: *`object`*

*Defined in [type/schema_validator.ts:8](https://github.com/krnik/vjs-validator/blob/4b489fe/src/type/schema_validator.ts#L8)*

<a id="schemavalidationerror.invalidschematype"></a>

####  invalidSchemaType

▸ **invalidSchemaType**(typeName: *`string`*, methodName: *`string`*, expectedType: *`string`*, type: *`string`*): `Error`

*Defined in [type/schema_validator.ts:17](https://github.com/krnik/vjs-validator/blob/4b489fe/src/type/schema_validator.ts#L17)*

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

*Defined in [type/schema_validator.ts:9](https://github.com/krnik/vjs-validator/blob/4b489fe/src/type/schema_validator.ts#L9)*

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

*Defined in [type/schema_validator.ts:205](https://github.com/krnik/vjs-validator/blob/4b489fe/src/type/schema_validator.ts#L205)*

<a id="schemavalidate.any"></a>

####  any

**● any**: *[any](#any)*

*Defined in [type/schema_validator.ts:206](https://github.com/krnik/vjs-validator/blob/4b489fe/src/type/schema_validator.ts#L206)*

___
<a id="schemavalidate.arrayof"></a>

####  arrayOf

**● arrayOf**: *[arrayOf](#arrayof)*

*Defined in [type/schema_validator.ts:207](https://github.com/krnik/vjs-validator/blob/4b489fe/src/type/schema_validator.ts#L207)*

___
<a id="schemavalidate.arrayofpropertynames"></a>

####  arrayOfPropertyNames

**● arrayOfPropertyNames**: *[arrayOfPropertyNames](#arrayofpropertynames)*

*Defined in [type/schema_validator.ts:212](https://github.com/krnik/vjs-validator/blob/4b489fe/src/type/schema_validator.ts#L212)*

___
<a id="schemavalidate.datapath"></a>

####  dataPath

**● dataPath**: *[dataPath](#datapath)*

*Defined in [type/schema_validator.ts:208](https://github.com/krnik/vjs-validator/blob/4b489fe/src/type/schema_validator.ts#L208)*

___
<a id="schemavalidate.isinstance"></a>

####  isInstance

**● isInstance**: *[isInstance](#isinstance)*

*Defined in [type/schema_validator.ts:210](https://github.com/krnik/vjs-validator/blob/4b489fe/src/type/schema_validator.ts#L210)*

___
<a id="schemavalidate.minmaxornumber"></a>

####  minMaxOrNumber

**● minMaxOrNumber**: *[minMaxOrNumber](#minmaxornumber)*

*Defined in [type/schema_validator.ts:211](https://github.com/krnik/vjs-validator/blob/4b489fe/src/type/schema_validator.ts#L211)*

___
<a id="schemavalidate.primitive"></a>

####  primitive

**● primitive**: *[primitive](#primitive)*

*Defined in [type/schema_validator.ts:209](https://github.com/krnik/vjs-validator/blob/4b489fe/src/type/schema_validator.ts#L209)*

___

___

