
#  JBQDocs

## Index

### Enumerations

* [ComparisonOperator](enums/comparisonoperator.md)
* [Keyword](enums/keyword.md)
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
* [PrintToken](classes/printtoken.md)
* [ResolvedPathStore](classes/resolvedpathstore.md)
* [SourceBuilder](classes/sourcebuilder.md)
* [TypeReflect](classes/typereflect.md)
* [TypeWrapper](classes/typewrapper.md)
* [TypeWrapperErorr](classes/typewrappererorr.md)
* [Validator](classes/validator.md)

### Interfaces

* [CompileOptions](interfaces/compileoptions.md)
* [Constructor](interfaces/constructor.md)
* [DataPath](interfaces/datapath.md)
* [IfCondition](interfaces/ifcondition.md)
* [JBQOptions](interfaces/jbqoptions.md)
* [Logger](interfaces/logger.md)
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
* [TypeDefinition](interfaces/typedefinition.md)
* [TypeMethod](interfaces/typemethod.md)
* [TypePrototypeSymbols](interfaces/typeprototypesymbols.md)
* [ValidatorClass](interfaces/validatorclass.md)

### Type aliases

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
* [Macro](#macro)
* [ObjWithKeys](#objwithkeys)
* [OmitSymbols](#omitsymbols)
* [Option](#option)
* [Property](#property)
* [PropertyDecoratorParams](#propertydecoratorparams)
* [SchemaMinMax](#schemaminmax)
* [SchemaProps](#schemaprops)
* [SchemaSymbol](#schemasymbol)
* [SchemaValidator](#schemavalidator)
* [Shape](#shape)
* [SyncValidationFunction](#syncvalidationfunction)
* [TransformCallback](#transformcallback)
* [TypePrototype](#typeprototype)
* [TypePrototypeMethods](#typeprototypemethods)
* [TypeValidationMethod](#typevalidationmethod)
* [ValidationFn](#validationfn)
* [Validators](#validators)
* [ValueFactory](#valuefactory)

### Variables

* [AsyncFnConstructor](#asyncfnconstructor)
* [CONSTRUCTOR_NAME](#constructor_name)
* [CREATE_INSTANCE](#create_instance)
* [DEFAULT_ASYNC_INTERVAL](#default_async_interval)
* [EVERY](#every)
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
* [SYM_METHOD_CLOSURE](#sym_method_closure)
* [SYM_METHOD_MACRO](#sym_method_macro)
* [SYM_SCHEMA_COLLECTION](#sym_schema_collection)
* [SYM_SCHEMA_PROPERTIES](#sym_schema_properties)
* [SYM_TYPE_FOR_LOOP](#sym_type_for_loop)
* [SYM_TYPE_KEY_ORDER](#sym_type_key_order)
* [SYM_TYPE_VALIDATE](#sym_type_validate)
* [TOKEN_BREAK](#token_break)
* [TOKEN_EXPR_REGEX](#token_expr_regex)
* [TYPE](#type)
* [TYPES](#types)
* [VALUE](#value)
* [array](#array)
* [boolean](#boolean)
* [collection](#collection)
* [constructorName](#constructorname)
* [every](#every)
* [includes](#includes)
* [instanceOf](#instanceof)
* [jbqTypes](#jbqtypes)
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
* [value](#value)

### Functions

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
* [TypeAny](#typeany)
* [TypeArray](#typearray)
* [TypeBoolean](#typeboolean)
* [TypeNumber](#typenumber)
* [TypeObject](#typeobject)
* [TypeString](#typestring)
* [schemaValidate](#schemavalidate)

---

## Type aliases

<a id="arritercallback"></a>

###  ArrIterCallback

**Ƭ ArrIterCallback**: *`function`*

*Defined in [misc/typings.ts:60](https://github.com/krnik/vjs-validator/blob/08b1300/src/misc/typings.ts#L60)*

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

*Defined in [core/jbq.ts:11](https://github.com/krnik/vjs-validator/blob/08b1300/src/core/jbq.ts#L11)*

#### Type declaration
▸<`T`>(data: *`T`*): `Promise`<`string` \| `undefined`>

**Type parameters:**

#### T 
**Parameters:**

| Name | Type |
| ------ | ------ |
| data | `T` |

**Returns:** `Promise`<`string` \| `undefined`>

___
<a id="callbackfactory"></a>

###  CallbackFactory

**Ƭ CallbackFactory**: *`function`*

*Defined in [class_syntax/decorator/validation_decorator.ts:41](https://github.com/krnik/vjs-validator/blob/08b1300/src/class_syntax/decorator/validation_decorator.ts#L41)*

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

*Defined in [class_syntax/decorator/validation_decorator.ts:26](https://github.com/krnik/vjs-validator/blob/08b1300/src/class_syntax/decorator/validation_decorator.ts#L26)*

___
<a id="constructorfactory"></a>

###  ConstructorFactory

**Ƭ ConstructorFactory**: *`function`*

*Defined in [class_syntax/decorator/validation_decorator.ts:39](https://github.com/krnik/vjs-validator/blob/08b1300/src/class_syntax/decorator/validation_decorator.ts#L39)*

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

*Defined in [misc/typings.ts:33](https://github.com/krnik/vjs-validator/blob/08b1300/src/misc/typings.ts#L33)*

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

*Defined in [misc/typings.ts:31](https://github.com/krnik/vjs-validator/blob/08b1300/src/misc/typings.ts#L31)*

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

*Defined in [class_syntax/decorator/validation_decorator.ts:32](https://github.com/krnik/vjs-validator/blob/08b1300/src/class_syntax/decorator/validation_decorator.ts#L32)*

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

*Defined in [class_syntax/decorator/validation_decorator.ts:43](https://github.com/krnik/vjs-validator/blob/08b1300/src/class_syntax/decorator/validation_decorator.ts#L43)*

___
<a id="decoratorparams"></a>

###  DecoratorParams

**Ƭ DecoratorParams**: *[`Function`] \| [PropertyDecoratorParams](#propertydecoratorparams)*

*Defined in [class_syntax/decorator/validation_decorator.ts:30](https://github.com/krnik/vjs-validator/blob/08b1300/src/class_syntax/decorator/validation_decorator.ts#L30)*

___
<a id="decoratortypes"></a>

###  DecoratorTypes

**Ƭ DecoratorTypes**: *"value" \| "constructor" \| "callback"*

*Defined in [class_syntax/decorator/validation_decorator.ts:34](https://github.com/krnik/vjs-validator/blob/08b1300/src/class_syntax/decorator/validation_decorator.ts#L34)*

___
<a id="defaultcallback"></a>

###  DefaultCallback

**Ƭ DefaultCallback**: *`function`*

*Defined in [class_syntax/class_validator_builder.ts:18](https://github.com/krnik/vjs-validator/blob/08b1300/src/class_syntax/class_validator_builder.ts#L18)*

#### Type declaration
▸(data: *`unknown`*): `unknown`

**Parameters:**

| Name | Type |
| ------ | ------ |
| data | `unknown` |

**Returns:** `unknown`

___
<a id="macro"></a>

###  Macro

**Ƭ Macro**: *`function`*

*Defined in [type/object.ts:19](https://github.com/krnik/vjs-validator/blob/08b1300/src/type/object.ts#L19)*

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
<a id="objwithkeys"></a>

###  ObjWithKeys

**Ƭ ObjWithKeys**: *`object`*

*Defined in [util/type_reflect.ts:3](https://github.com/krnik/vjs-validator/blob/08b1300/src/util/type_reflect.ts#L3)*

#### Type declaration

___
<a id="omitsymbols"></a>

###  OmitSymbols

**Ƭ OmitSymbols**: *`Pick`<`T`, `{ [K in keyof T]: K extends symbol ? never : K; }[keyof T]`>*

*Defined in [misc/typings.ts:5](https://github.com/krnik/vjs-validator/blob/08b1300/src/misc/typings.ts#L5)*

___
<a id="option"></a>

###  Option

**Ƭ Option**: *`T` \| `undefined`*

*Defined in [misc/typings.ts:3](https://github.com/krnik/vjs-validator/blob/08b1300/src/misc/typings.ts#L3)*

___
<a id="property"></a>

###  Property

**Ƭ Property**: *`string` \| `symbol`*

*Defined in [class_syntax/class_validator_builder.ts:16](https://github.com/krnik/vjs-validator/blob/08b1300/src/class_syntax/class_validator_builder.ts#L16)*

___
<a id="propertydecoratorparams"></a>

###  PropertyDecoratorParams

**Ƭ PropertyDecoratorParams**: *[`object`, `string` \| `symbol`, `unknown`]*

*Defined in [class_syntax/decorator/validation_decorator.ts:28](https://github.com/krnik/vjs-validator/blob/08b1300/src/class_syntax/decorator/validation_decorator.ts#L28)*

___
<a id="schemaminmax"></a>

###  SchemaMinMax

**Ƭ SchemaMinMax**: *[SchemaMax](interfaces/schemamax.md) \| [SchemaMin](interfaces/schemamin.md) \| `number` \| [DataPath](interfaces/datapath.md)*

*Defined in [misc/typings.ts:13](https://github.com/krnik/vjs-validator/blob/08b1300/src/misc/typings.ts#L13)*

___
<a id="schemaprops"></a>

###  SchemaProps

**Ƭ SchemaProps**: *`Exclude`<`undefined` \| `object`, `undefined`>*

*Defined in [class_syntax/class_validator_builder.ts:14](https://github.com/krnik/vjs-validator/blob/08b1300/src/class_syntax/class_validator_builder.ts#L14)*

___
<a id="schemasymbol"></a>

###  SchemaSymbol

**Ƭ SchemaSymbol**: *`unique symbol` \| `unique symbol`*

*Defined in [class_syntax/decorator/validation_decorator.ts:220](https://github.com/krnik/vjs-validator/blob/08b1300/src/class_syntax/decorator/validation_decorator.ts#L220)*

___
<a id="schemavalidator"></a>

###  SchemaValidator

**Ƭ SchemaValidator**: *`function`*

*Defined in [type/schema_validator.ts:41](https://github.com/krnik/vjs-validator/blob/08b1300/src/type/schema_validator.ts#L41)*

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

*Defined in [class_syntax.ts:27](https://github.com/krnik/vjs-validator/blob/08b1300/src/class_syntax.ts#L27)*

Mapped type used to extract properties of a class. Also just a hint for TypeScript.

___
<a id="syncvalidationfunction"></a>

###  SyncValidationFunction

**Ƭ SyncValidationFunction**: *`function`*

*Defined in [core/jbq.ts:9](https://github.com/krnik/vjs-validator/blob/08b1300/src/core/jbq.ts#L9)*

#### Type declaration
▸<`T`>(data: *`T`*): `string` \| `undefined`

**Type parameters:**

#### T 
**Parameters:**

| Name | Type |
| ------ | ------ |
| data | `T` |

**Returns:** `string` \| `undefined`

___
<a id="transformcallback"></a>

###  TransformCallback

**Ƭ TransformCallback**: *`function`*

*Defined in [class_syntax/class_validator_builder.ts:19](https://github.com/krnik/vjs-validator/blob/08b1300/src/class_syntax/class_validator_builder.ts#L19)*

#### Type declaration
▸(propertyValue: *`unknown`*, data: *`unknown`*): `unknown`

**Parameters:**

| Name | Type |
| ------ | ------ |
| propertyValue | `unknown` |
| data | `unknown` |

**Returns:** `unknown`

___
<a id="typeprototype"></a>

###  TypePrototype

**Ƭ TypePrototype**: *[TypePrototypeMethods](#typeprototypemethods)<[OmitSymbols](#omitsymbols)<`T`>> & [TypePrototypeSymbols](interfaces/typeprototypesymbols.md)<[OmitSymbols](#omitsymbols)<`T`>>*

*Defined in [core/type_wrapper/interface/type_prototype.interface.ts:24](https://github.com/krnik/vjs-validator/blob/08b1300/src/core/type_wrapper/interface/type_prototype.interface.ts#L24)*

___
<a id="typeprototypemethods"></a>

###  TypePrototypeMethods

**Ƭ TypePrototypeMethods**: *`object`*

*Defined in [core/type_wrapper/interface/type_prototype.interface.ts:9](https://github.com/krnik/vjs-validator/blob/08b1300/src/core/type_wrapper/interface/type_prototype.interface.ts#L9)*

Type that represents all regular methods of TypePrototype that are used during creation of validation function.

#### Type declaration

___
<a id="typevalidationmethod"></a>

###  TypeValidationMethod

**Ƭ TypeValidationMethod**: *`function`*

*Defined in [core/type_wrapper/interface/type_method.interface.ts:34](https://github.com/krnik/vjs-validator/blob/08b1300/src/core/type_wrapper/interface/type_method.interface.ts#L34)*

Alias to any function that is used to validate schema input.

#### Type declaration
▸(v: *`unknown`*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| v | `unknown` |

**Returns:** `void`

___
<a id="validationfn"></a>

###  ValidationFn

**Ƭ ValidationFn**: *`ValidationFn<T>`*

*Defined in [core/jbq.ts:13](https://github.com/krnik/vjs-validator/blob/08b1300/src/core/jbq.ts#L13)*

___
<a id="validators"></a>

###  Validators

**Ƭ Validators**: *`object`*

*Defined in [core/jbq.ts:19](https://github.com/krnik/vjs-validator/blob/08b1300/src/core/jbq.ts#L19)*

#### Type declaration

___
<a id="valuefactory"></a>

###  ValueFactory

**Ƭ ValueFactory**: *`function`*

*Defined in [class_syntax/decorator/validation_decorator.ts:37](https://github.com/krnik/vjs-validator/blob/08b1300/src/class_syntax/decorator/validation_decorator.ts#L37)*

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

*Defined in [core/jbq.ts:7](https://github.com/krnik/vjs-validator/blob/08b1300/src/core/jbq.ts#L7)*

___
<a id="constructor_name"></a>

### `<Const>` CONSTRUCTOR_NAME

**● CONSTRUCTOR_NAME**: *"constructorName"* = "constructorName"

*Defined in [misc/constants.ts:56](https://github.com/krnik/vjs-validator/blob/08b1300/src/misc/constants.ts#L56)*

___
<a id="create_instance"></a>

### `<Const>` CREATE_INSTANCE

**● CREATE_INSTANCE**: *`unique symbol`* =  Symbol('create_instance')

*Defined in [class_syntax/class_validator_builder.ts:7](https://github.com/krnik/vjs-validator/blob/08b1300/src/class_syntax/class_validator_builder.ts#L7)*

___
<a id="default_async_interval"></a>

### `<Const>` DEFAULT_ASYNC_INTERVAL

**● DEFAULT_ASYNC_INTERVAL**: *`50`* = 50

*Defined in [misc/constants.ts:188](https://github.com/krnik/vjs-validator/blob/08b1300/src/misc/constants.ts#L188)*

Default value for the `JBQOptions.asyncInterval` property.

___
<a id="every"></a>

### `<Const>` EVERY

**● EVERY**: *"every"* = "every"

*Defined in [misc/constants.ts:66](https://github.com/krnik/vjs-validator/blob/08b1300/src/misc/constants.ts#L66)*

___
<a id="includes"></a>

### `<Const>` INCLUDES

**● INCLUDES**: *"includes"* = "includes"

*Defined in [misc/constants.ts:63](https://github.com/krnik/vjs-validator/blob/08b1300/src/misc/constants.ts#L63)*

___
<a id="instance_of"></a>

### `<Const>` INSTANCE_OF

**● INSTANCE_OF**: *"instanceOf"* = "instanceOf"

*Defined in [misc/constants.ts:57](https://github.com/krnik/vjs-validator/blob/08b1300/src/misc/constants.ts#L57)*

___
<a id="key_count"></a>

### `<Const>` KEY_COUNT

**● KEY_COUNT**: *"keyCount"* = "keyCount"

*Defined in [misc/constants.ts:61](https://github.com/krnik/vjs-validator/blob/08b1300/src/misc/constants.ts#L61)*

___
<a id="len"></a>

### `<Const>` LEN

**● LEN**: *"len"* = "len"

*Defined in [misc/constants.ts:70](https://github.com/krnik/vjs-validator/blob/08b1300/src/misc/constants.ts#L70)*

___
<a id="multiple_of"></a>

### `<Const>` MULTIPLE_OF

**● MULTIPLE_OF**: *"multipleOf"* = "multipleOf"

*Defined in [misc/constants.ts:58](https://github.com/krnik/vjs-validator/blob/08b1300/src/misc/constants.ts#L58)*

___
<a id="one_of"></a>

### `<Const>` ONE_OF

**● ONE_OF**: *"oneOf"* = "oneOf"

*Defined in [misc/constants.ts:64](https://github.com/krnik/vjs-validator/blob/08b1300/src/misc/constants.ts#L64)*

___
<a id="properties"></a>

### `<Const>` PROPERTIES

**● PROPERTIES**: *"properties"* = "properties"

*Defined in [misc/constants.ts:59](https://github.com/krnik/vjs-validator/blob/08b1300/src/misc/constants.ts#L59)*

___
<a id="prop_count"></a>

### `<Const>` PROP_COUNT

**● PROP_COUNT**: *"propCount"* = "propCount"

*Defined in [misc/constants.ts:60](https://github.com/krnik/vjs-validator/blob/08b1300/src/misc/constants.ts#L60)*

___
<a id="prop_data_path"></a>

### `<Const>` PROP_DATA_PATH

**● PROP_DATA_PATH**: *"$dataPath"* = "$dataPath"

*Defined in [misc/constants.ts:185](https://github.com/krnik/vjs-validator/blob/08b1300/src/misc/constants.ts#L185)*

___
<a id="regex"></a>

### `<Const>` REGEX

**● REGEX**: *"regex"* = "regex"

*Defined in [misc/constants.ts:65](https://github.com/krnik/vjs-validator/blob/08b1300/src/misc/constants.ts#L65)*

___
<a id="required"></a>

### `<Const>` REQUIRED

**● REQUIRED**: *"required"* = "required"

*Defined in [misc/constants.ts:62](https://github.com/krnik/vjs-validator/blob/08b1300/src/misc/constants.ts#L62)*

___
<a id="schema"></a>

### `<Const>` SCHEMA

**● SCHEMA**: *`unique symbol`* =  Symbol('schema')

*Defined in [class_syntax/class_validator_builder.ts:6](https://github.com/krnik/vjs-validator/blob/08b1300/src/class_syntax/class_validator_builder.ts#L6)*

___
<a id="schema_path_separator"></a>

### `<Const>` SCHEMA_PATH_SEPARATOR

**● SCHEMA_PATH_SEPARATOR**: *"/"* = "/"

*Defined in [misc/constants.ts:183](https://github.com/krnik/vjs-validator/blob/08b1300/src/misc/constants.ts#L183)*

___
<a id="some"></a>

### `<Const>` SOME

**● SOME**: *"some"* = "some"

*Defined in [misc/constants.ts:69](https://github.com/krnik/vjs-validator/blob/08b1300/src/misc/constants.ts#L69)*

___
<a id="sym_method_closure"></a>

### `<Const>` SYM_METHOD_CLOSURE

**● SYM_METHOD_CLOSURE**: *`unique symbol`* =  Symbol.for('type_method_closure')

*Defined in [misc/constants.ts:10](https://github.com/krnik/vjs-validator/blob/08b1300/src/misc/constants.ts#L10)*

If TypeMethod function have this property set to true then code generator will use a reference to this function in validation function instead of extracting its body. This allows to use external variables during validation what would not be possible in some cases if the function body would be stringified.

_Used in TypePrototype/TypeDefinition_

___
<a id="sym_method_macro"></a>

### `<Const>` SYM_METHOD_MACRO

**● SYM_METHOD_MACRO**: *`unique symbol`* =  Symbol.for('type_method_macro')

*Defined in [misc/constants.ts:20](https://github.com/krnik/vjs-validator/blob/08b1300/src/misc/constants.ts#L20)*

If set to true defines type of TypeMethod function that will return a chunk of validation function. So instead of being parsed this function is simply invoked with some Code Generator helper functions passed as arguments. See [VALUE](https://github.com/krnik/jbq/blob/master/src/types/Number.ts) method example.

_Used in TypePrototype/TypeDefinition_

___
<a id="sym_schema_collection"></a>

### `<Const>` SYM_SCHEMA_COLLECTION

**● SYM_SCHEMA_COLLECTION**: *`unique symbol`* =  Symbol.for('schema_collection')

*Defined in [misc/constants.ts:116](https://github.com/krnik/vjs-validator/blob/08b1300/src/misc/constants.ts#L116)*

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

*Defined in [misc/constants.ts:97](https://github.com/krnik/vjs-validator/blob/08b1300/src/misc/constants.ts#L97)*

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
<a id="sym_type_for_loop"></a>

### `<Const>` SYM_TYPE_FOR_LOOP

**● SYM_TYPE_FOR_LOOP**: *`unique symbol`* =  Symbol.for('type_for_loop')

*Defined in [misc/constants.ts:54](https://github.com/krnik/vjs-validator/blob/08b1300/src/misc/constants.ts#L54)*

Used to indicate if collection can be indexed by number indices.

`Array` type has this value set to `true` in its TypePrototype. This results in using `for(let i=0;i<len;i++)` loop instead of using [Iterable Protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols) for performance reasons.

_Used in TypePrototype/TypeDefinition_

___
<a id="sym_type_key_order"></a>

### `<Const>` SYM_TYPE_KEY_ORDER

**● SYM_TYPE_KEY_ORDER**: *`unique symbol`* =  Symbol.for('type_key_order')

*Defined in [misc/constants.ts:33](https://github.com/krnik/vjs-validator/blob/08b1300/src/misc/constants.ts#L33)*

Determines order in which the type methods are used during creation of validation function. If not defined, the order will depend on ECMASCript implementation.

If this property value is `['required']` then before all other method the method `required` will be parsed and appended to the validation function code.

_Used in TypePrototype/TypeDefinition_

___
<a id="sym_type_validate"></a>

### `<Const>` SYM_TYPE_VALIDATE

**● SYM_TYPE_VALIDATE**: *`unique symbol`* =  Symbol.for('type_validate')

*Defined in [misc/constants.ts:42](https://github.com/krnik/vjs-validator/blob/08b1300/src/misc/constants.ts#L42)*

Part of the TypePrototype/TypeDefinition. Contains methods that are used to validate schema input. Should throw on incorrect schema input value.

_Used in TypePrototype/TypeDefinition_

___
<a id="token_break"></a>

### `<Const>` TOKEN_BREAK

**● TOKEN_BREAK**: *"//{break}"* = "//{break}"

*Defined in [misc/constants.ts:121](https://github.com/krnik/vjs-validator/blob/08b1300/src/misc/constants.ts#L121)*

Token that is replaced by labeled break statement during compilation.

___
<a id="token_expr_regex"></a>

### `<Const>` TOKEN_EXPR_REGEX

**● TOKEN_EXPR_REGEX**: *`RegExp`* =  /{{(.*?)}}/g

*Defined in [misc/constants.ts:132](https://github.com/krnik/vjs-validator/blob/08b1300/src/misc/constants.ts#L132)*

Regular expression used to find templte expressions during compilation. They're executed during compile time and should return values that are possible to represent as a literal.

Reason why we might want to have such expressions is that its much more efficient to execute expression once and save its result instead of executing it every time some value is validated.

___
<a id="type"></a>

### `<Const>` TYPE

**● TYPE**: *"type"* = "type"

*Defined in [misc/constants.ts:68](https://github.com/krnik/vjs-validator/blob/08b1300/src/misc/constants.ts#L68)*

___
<a id="types"></a>

### `<Let>` TYPES

**● TYPES**: *[TypeWrapper](classes/typewrapper.md)* =  jbqTypes

*Defined in [class_syntax/build_method_compile.ts:9](https://github.com/krnik/vjs-validator/blob/08b1300/src/class_syntax/build_method_compile.ts#L9)*

___
<a id="value"></a>

### `<Const>` VALUE

**● VALUE**: *"value"* = "value"

*Defined in [misc/constants.ts:67](https://github.com/krnik/vjs-validator/blob/08b1300/src/misc/constants.ts#L67)*

___
<a id="array"></a>

### `<Const>` array

**● array**: *`function`* =  decoratorFactory(TYPE)(TYPE_NAME.ARRAY)

*Defined in [class_syntax/decorator/validation_decorator.ts:110](https://github.com/krnik/vjs-validator/blob/08b1300/src/class_syntax/decorator/validation_decorator.ts#L110)*

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

*Defined in [class_syntax/decorator/validation_decorator.ts:113](https://github.com/krnik/vjs-validator/blob/08b1300/src/class_syntax/decorator/validation_decorator.ts#L113)*

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

*Defined in [class_syntax/decorator/validation_decorator.ts:295](https://github.com/krnik/vjs-validator/blob/08b1300/src/class_syntax/decorator/validation_decorator.ts#L295)*

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

 compileClass(Poll);

 const poll = new Poll().build({ votes: [100, 112] });
 poll.votes; // [100, 112]
```

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

*Defined in [class_syntax/decorator/validation_decorator.ts:164](https://github.com/krnik/vjs-validator/blob/08b1300/src/class_syntax/decorator/validation_decorator.ts#L164)*

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

*Defined in [class_syntax/decorator/validation_decorator.ts:128](https://github.com/krnik/vjs-validator/blob/08b1300/src/class_syntax/decorator/validation_decorator.ts#L128)*

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

*Defined in [class_syntax/decorator/validation_decorator.ts:134](https://github.com/krnik/vjs-validator/blob/08b1300/src/class_syntax/decorator/validation_decorator.ts#L134)*

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

*Defined in [class_syntax/decorator/validation_decorator.ts:161](https://github.com/krnik/vjs-validator/blob/08b1300/src/class_syntax/decorator/validation_decorator.ts#L161)*

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
<a id="jbqtypes"></a>

### `<Const>` jbqTypes

**● jbqTypes**: *[TypeWrapper](classes/typewrapper.md)* =  createTypes()

*Defined in [type/mod.ts:20](https://github.com/krnik/vjs-validator/blob/08b1300/src/type/mod.ts#L20)*

___
<a id="keycount"></a>

### `<Const>` keyCount

**● keyCount**: *`function`* =  decoratorFactory<ParseValuesMinMax['schemaValue']>(KEY_COUNT)

*Defined in [class_syntax/decorator/validation_decorator.ts:152](https://github.com/krnik/vjs-validator/blob/08b1300/src/class_syntax/decorator/validation_decorator.ts#L152)*

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

*Defined in [class_syntax/decorator/validation_decorator.ts:137](https://github.com/krnik/vjs-validator/blob/08b1300/src/class_syntax/decorator/validation_decorator.ts#L137)*

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

*Defined in [class_syntax/decorator/validation_decorator.ts:143](https://github.com/krnik/vjs-validator/blob/08b1300/src/class_syntax/decorator/validation_decorator.ts#L143)*

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

*Defined in [class_syntax/decorator/validation_decorator.ts:116](https://github.com/krnik/vjs-validator/blob/08b1300/src/class_syntax/decorator/validation_decorator.ts#L116)*

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

*Defined in [class_syntax/decorator/validation_decorator.ts:119](https://github.com/krnik/vjs-validator/blob/08b1300/src/class_syntax/decorator/validation_decorator.ts#L119)*

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

*Defined in [class_syntax/decorator/validation_decorator.ts:149](https://github.com/krnik/vjs-validator/blob/08b1300/src/class_syntax/decorator/validation_decorator.ts#L149)*

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

*Defined in [class_syntax/decorator/validation_decorator.ts:125](https://github.com/krnik/vjs-validator/blob/08b1300/src/class_syntax/decorator/validation_decorator.ts#L125)*

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

*Defined in [class_syntax/decorator/validation_decorator.ts:155](https://github.com/krnik/vjs-validator/blob/08b1300/src/class_syntax/decorator/validation_decorator.ts#L155)*

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

*Defined in [class_syntax/decorator/validation_decorator.ts:158](https://github.com/krnik/vjs-validator/blob/08b1300/src/class_syntax/decorator/validation_decorator.ts#L158)*

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

*Defined in [class_syntax/decorator/validation_decorator.ts:146](https://github.com/krnik/vjs-validator/blob/08b1300/src/class_syntax/decorator/validation_decorator.ts#L146)*

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

### `<Const>` setLogger

**● setLogger**: *[setLogger](classes/logservice.md#setlogger)* =  LogService.setLogger

*Defined in [lib.ts:5](https://github.com/krnik/vjs-validator/blob/08b1300/src/lib.ts#L5)*

___
<a id="shape"></a>

### `<Const>` shape

**● shape**: *`function`* =  decoratorSubSchemaFactory(SYM_SCHEMA_PROPERTIES)

*Defined in [class_syntax/decorator/validation_decorator.ts:259](https://github.com/krnik/vjs-validator/blob/08b1300/src/class_syntax/decorator/validation_decorator.ts#L259)*

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

*Defined in [class_syntax/decorator/validation_decorator.ts:131](https://github.com/krnik/vjs-validator/blob/08b1300/src/class_syntax/decorator/validation_decorator.ts#L131)*

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

*Defined in [class_syntax/decorator/validation_decorator.ts:122](https://github.com/krnik/vjs-validator/blob/08b1300/src/class_syntax/decorator/validation_decorator.ts#L122)*

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

*Defined in [class_syntax/decorator/validation_decorator.ts:104](https://github.com/krnik/vjs-validator/blob/08b1300/src/class_syntax/decorator/validation_decorator.ts#L104)*

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
▸(schemaValue: *`T`*): [Decorator](#decorator)

**Parameters:**

| Name | Type |
| ------ | ------ |
| schemaValue | `T` |

**Returns:** [Decorator](#decorator)

___
<a id="value"></a>

### `<Const>` value

**● value**: *`function`* =  decoratorFactory<ParseValuesMinMax['schemaValue'] | boolean>(VALUE)

*Defined in [class_syntax/decorator/validation_decorator.ts:140](https://github.com/krnik/vjs-validator/blob/08b1300/src/class_syntax/decorator/validation_decorator.ts#L140)*

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

<a id="any"></a>

### `<Const>` any

▸ **any**(typeName: *`string`*, methodName: *`string`*): [SchemaValidator](#schemavalidator)

*Defined in [type/schema_validator.ts:197](https://github.com/krnik/vjs-validator/blob/08b1300/src/type/schema_validator.ts#L197)*

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

*Defined in [type/schema_validator.ts:171](https://github.com/krnik/vjs-validator/blob/08b1300/src/type/schema_validator.ts#L171)*

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

*Defined in [type/schema_validator.ts:142](https://github.com/krnik/vjs-validator/blob/08b1300/src/type/schema_validator.ts#L142)*

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

*Defined in [class_syntax/build_method_compile.ts:36](https://github.com/krnik/vjs-validator/blob/08b1300/src/class_syntax/build_method_compile.ts#L36)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| constructor | [Constructor](interfaces/constructor.md) | - |
| `Default value` options | [CompileOptions](interfaces/compileoptions.md) |  {} |

**Returns:** `void`

___
<a id="createpropkeycountmacro"></a>

###  createPropKeyCountMacro

▸ **createPropKeyCountMacro**(resolveDataVarCmp: *`function`*): [Macro](#macro)

*Defined in [type/object.ts:21](https://github.com/krnik/vjs-validator/blob/08b1300/src/type/object.ts#L21)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| resolveDataVarCmp | `function` |

**Returns:** [Macro](#macro)

___
<a id="createtypes"></a>

###  createTypes

▸ **createTypes**(): [TypeWrapper](classes/typewrapper.md)

*Defined in [type/mod.ts:10](https://github.com/krnik/vjs-validator/blob/08b1300/src/type/mod.ts#L10)*

**Returns:** [TypeWrapper](classes/typewrapper.md)

___
<a id="datapath"></a>

###  dataPath

▸ **dataPath**(schemaValue: *`unknown`*): `boolean`

*Defined in [type/schema_validator.ts:32](https://github.com/krnik/vjs-validator/blob/08b1300/src/type/schema_validator.ts#L32)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| schemaValue | `unknown` |

**Returns:** `boolean`

___
<a id="decoratorfactory"></a>

###  decoratorFactory

▸ **decoratorFactory**<`T`,`BASE`>(schemaProperty: *`string` \| `symbol`*): [DecoratorFactoryB](#decoratorfactoryb)<`BASE`, `T`>

*Defined in [class_syntax/decorator/validation_decorator.ts:55](https://github.com/krnik/vjs-validator/blob/08b1300/src/class_syntax/decorator/validation_decorator.ts#L55)*

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

*Defined in [class_syntax/decorator/validation_decorator.ts:222](https://github.com/krnik/vjs-validator/blob/08b1300/src/class_syntax/decorator/validation_decorator.ts#L222)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| schemaSymbol | [SchemaSymbol](#schemasymbol) |

**Returns:** [ConstructorFactory](#constructorfactory)

___
<a id="instantiate"></a>

###  instantiate

▸ **instantiate**(constructor: *[Constructor](interfaces/constructor.md)*): `void`

*Defined in [class_syntax/decorator/class_decorator.ts:46](https://github.com/krnik/vjs-validator/blob/08b1300/src/class_syntax/decorator/class_decorator.ts#L46)*

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

 compileClass(User);

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
| constructor | [Constructor](interfaces/constructor.md) |

**Returns:** `void`

___
<a id="isclassdecorator"></a>

###  isClassDecorator

▸ **isClassDecorator**(args: *[DecoratorParams](#decoratorparams)*): `boolean`

*Defined in [class_syntax/decorator/validation_decorator.ts:51](https://github.com/krnik/vjs-validator/blob/08b1300/src/class_syntax/decorator/validation_decorator.ts#L51)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| args | [DecoratorParams](#decoratorparams) |

**Returns:** `boolean`

___
<a id="isinstance"></a>

###  isInstance

▸ **isInstance**(typeName: *`string`*, methodName: *`string`*, constructor: *[Constructor](interfaces/constructor.md)*): [SchemaValidator](#schemavalidator)

*Defined in [type/schema_validator.ts:64](https://github.com/krnik/vjs-validator/blob/08b1300/src/type/schema_validator.ts#L64)*

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

▸ **jbq**<`T`,`K`,`O`>(types: *[TypeWrapper](classes/typewrapper.md)*, schemas: *`T`*, options?: *[O]()*): [Validators](#validators)<`T`, `O`>

*Defined in [core/jbq.ts:22](https://github.com/krnik/vjs-validator/blob/08b1300/src/core/jbq.ts#L22)*

Compiles `schemas` using `types` instance as source of validation code.

**Type parameters:**

#### T 
#### K :  `keyof OmitSymbols<T>`
#### O :  [JBQOptions](interfaces/jbqoptions.md)
**Parameters:**

| Name | Type |
| ------ | ------ |
| types | [TypeWrapper](classes/typewrapper.md) |
| schemas | `T` |
| `Optional` options | [O]() |

**Returns:** [Validators](#validators)<`T`, `O`>

___
<a id="minmaxornumber"></a>

###  minMaxOrNumber

▸ **minMaxOrNumber**(typeName: *`string`*, methodName: *`string`*, acceptDataPath?: *`undefined` \| `false` \| `true`*): [SchemaValidator](#schemavalidator)

*Defined in [type/schema_validator.ts:82](https://github.com/krnik/vjs-validator/blob/08b1300/src/type/schema_validator.ts#L82)*

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

*Defined in [type/schema_validator.ts:43](https://github.com/krnik/vjs-validator/blob/08b1300/src/type/schema_validator.ts#L43)*

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

*Defined in [class_syntax/decorator/validation_decorator.ts:195](https://github.com/krnik/vjs-validator/blob/08b1300/src/class_syntax/decorator/validation_decorator.ts#L195)*

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
| schemaObject | [Schema](interfaces/schema.md) |

**Returns:** [Decorator](#decorator)

___
<a id="setdefaulttypes"></a>

###  setDefaultTypes

▸ **setDefaultTypes**(types: *[TypeWrapper](classes/typewrapper.md)*): `void`

*Defined in [class_syntax/build_method_compile.ts:20](https://github.com/krnik/vjs-validator/blob/08b1300/src/class_syntax/build_method_compile.ts#L20)*

Permanently changes the types used provided to the JBQ compilation function by `@compile()` decorator.

By default the `jbqTypes` `TypeWrapper` instance from `/core/type/mod` module is used.

Changing default value will not affect the `jbqTypes`. But changing the `jbqTypes` value affect this modules' default types.

**Parameters:**

| Name | Type |
| ------ | ------ |
| types | [TypeWrapper](classes/typewrapper.md) |

**Returns:** `void`

___
<a id="transform"></a>

### `<Const>` transform

▸ **transform**<`P`,`D`,`R`>(callback: *`function`*): `PropertyDecorator`

*Defined in [class_syntax/decorator/alteration_decorator.ts:103](https://github.com/krnik/vjs-validator/blob/08b1300/src/class_syntax/decorator/alteration_decorator.ts#L103)*

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

 compileClass(IAmLate);

 const latePerson = new IAmLate().build();
 latePerson;         // Promise<IAmLate>
 await latePerson;   // IAmLate

 class TotallySync extends Validator<true> {
     \@transform(() => true)
     isSync!: boolean;
 }
 compileClass(TotallySync);

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

*Defined in [class_syntax/decorator/alteration_decorator.ts:50](https://github.com/krnik/vjs-validator/blob/08b1300/src/class_syntax/decorator/alteration_decorator.ts#L50)*

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

 compileClass(Person);

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

## Object literals

<a id="logger"></a>

### `<Let>` LOGGER

**LOGGER**: *`object`*

*Defined in [util/log_service.ts:7](https://github.com/krnik/vjs-validator/blob/08b1300/src/util/log_service.ts#L7)*

<a id="logger.debug"></a>

####  debug

▸ **debug**(): `void`

*Defined in [util/log_service.ts:7](https://github.com/krnik/vjs-validator/blob/08b1300/src/util/log_service.ts#L7)*

**Returns:** `void`

___

___
<a id="schemavalidationerror"></a>

### `<Const>` SchemaValidationError

**SchemaValidationError**: *`object`*

*Defined in [type/schema_validator.ts:6](https://github.com/krnik/vjs-validator/blob/08b1300/src/type/schema_validator.ts#L6)*

<a id="schemavalidationerror.invalidschematype"></a>

####  invalidSchemaType

▸ **invalidSchemaType**(typeName: *`string`*, methodName: *`string`*, expectedType: *`string`*, type: *`string`*): `Error`

*Defined in [type/schema_validator.ts:15](https://github.com/krnik/vjs-validator/blob/08b1300/src/type/schema_validator.ts#L15)*

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

*Defined in [type/schema_validator.ts:7](https://github.com/krnik/vjs-validator/blob/08b1300/src/type/schema_validator.ts#L7)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| typeName | `string` |
| methodName | `string` |

**Returns:** `Error`

___

___
<a id="typeany"></a>

### `<Const>` TypeAny

**TypeAny**: *`object`*

*Defined in [type/any.ts:12](https://github.com/krnik/vjs-validator/blob/08b1300/src/type/any.ts#L12)*

<a id="typeany.__computed"></a>

####  __computed

▸ **__computed**(_schemaValue: *`string`*, _$DATA: *`unknown`*): `void`

*Defined in [type/any.ts:14](https://github.com/krnik/vjs-validator/blob/08b1300/src/type/any.ts#L14)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| _schemaValue | `string` |
| _$DATA | `unknown` |

**Returns:** `void`

<a id="typeany.__computed.__computed-1"></a>

####  __computed

**● __computed**: *`function`* =  schemaValidate.primitive(TYPE_NAME.ANY, REQUIRED, 'boolean')

*Defined in [type/any.ts:26](https://github.com/krnik/vjs-validator/blob/08b1300/src/type/any.ts#L26)*
*Defined in [type/any.ts:27](https://github.com/krnik/vjs-validator/blob/08b1300/src/type/any.ts#L27)*

#### Type declaration
▸(v: *`unknown`*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| v | `unknown` |

**Returns:** `void`

___

___

___
<a id="typearray"></a>

### `<Const>` TypeArray

**TypeArray**: *`object`*

*Defined in [type/array.ts:26](https://github.com/krnik/vjs-validator/blob/08b1300/src/type/array.ts#L26)*

<a id="typearray.__computed"></a>

####  __computed

▸ **__computed**(_schemaValue: *`string`*, $DATA: *`unknown`*): `string` \| `void`

*Defined in [type/array.ts:27](https://github.com/krnik/vjs-validator/blob/08b1300/src/type/array.ts#L27)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| _schemaValue | `string` |
| $DATA | `unknown` |

**Returns:** `string` \| `void`

<a id="typearray.__computed.__computed-1"></a>

####  __computed

**● __computed**: *`function`* =  schemaValidate.any(TYPE_NAME.ARRAY, INCLUDES)

*Defined in [type/array.ts:156](https://github.com/krnik/vjs-validator/blob/08b1300/src/type/array.ts#L156)*
*Defined in [type/array.ts:157](https://github.com/krnik/vjs-validator/blob/08b1300/src/type/array.ts#L157)*
*Defined in [type/array.ts:158](https://github.com/krnik/vjs-validator/blob/08b1300/src/type/array.ts#L158)*
*Defined in [type/array.ts:159](https://github.com/krnik/vjs-validator/blob/08b1300/src/type/array.ts#L159)*
*Defined in [type/array.ts:160](https://github.com/krnik/vjs-validator/blob/08b1300/src/type/array.ts#L160)*

#### Type declaration
▸(v: *`unknown`*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| v | `unknown` |

**Returns:** `void`

___

___

___
<a id="typeboolean"></a>

### `<Const>` TypeBoolean

**TypeBoolean**: *`object`*

*Defined in [type/boolean.ts:4](https://github.com/krnik/vjs-validator/blob/08b1300/src/type/boolean.ts#L4)*

<a id="typeboolean.__computed"></a>

####  __computed

▸ **__computed**(_schemaValue: *`string`*, $DATA: *`unknown`*): `string` \| `void`

*Defined in [type/boolean.ts:5](https://github.com/krnik/vjs-validator/blob/08b1300/src/type/boolean.ts#L5)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| _schemaValue | `string` |
| $DATA | `unknown` |

**Returns:** `string` \| `void`

<a id="typeboolean.__computed.__computed-1"></a>

####  __computed

**● __computed**: *`function`* =  schemaValidate.primitive(TYPE_NAME.BOOLEAN, VALUE, 'boolean', true)

*Defined in [type/boolean.ts:14](https://github.com/krnik/vjs-validator/blob/08b1300/src/type/boolean.ts#L14)*
*Defined in [type/boolean.ts:15](https://github.com/krnik/vjs-validator/blob/08b1300/src/type/boolean.ts#L15)*

#### Type declaration
▸(v: *`unknown`*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| v | `unknown` |

**Returns:** `void`

___

___

___
<a id="typenumber"></a>

### `<Const>` TypeNumber

**TypeNumber**: *`object`*

*Defined in [type/number.ts:17](https://github.com/krnik/vjs-validator/blob/08b1300/src/type/number.ts#L17)*

<a id="typenumber.__computed"></a>

####  __computed

▸ **__computed**(_schemaValue: *`string`*, $DATA: *`unknown`*): `string` \| `void`

*Defined in [type/number.ts:18](https://github.com/krnik/vjs-validator/blob/08b1300/src/type/number.ts#L18)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| _schemaValue | `string` |
| $DATA | `unknown` |

**Returns:** `string` \| `void`

<a id="typenumber.__computed.__computed-1"></a>

####  __computed

**● __computed**: *`function`* =  schemaValidate.arrayOf(TYPE_NAME.NUMBER, ONE_OF, 'number')

*Defined in [type/number.ts:120](https://github.com/krnik/vjs-validator/blob/08b1300/src/type/number.ts#L120)*
*Defined in [type/number.ts:121](https://github.com/krnik/vjs-validator/blob/08b1300/src/type/number.ts#L121)*
*Defined in [type/number.ts:122](https://github.com/krnik/vjs-validator/blob/08b1300/src/type/number.ts#L122)*
*Defined in [type/number.ts:123](https://github.com/krnik/vjs-validator/blob/08b1300/src/type/number.ts#L123)*

#### Type declaration
▸(v: *`unknown`*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| v | `unknown` |

**Returns:** `void`

___

___

___
<a id="typeobject"></a>

### `<Const>` TypeObject

**TypeObject**: *`object`*

*Defined in [type/object.ts:113](https://github.com/krnik/vjs-validator/blob/08b1300/src/type/object.ts#L113)*

<a id="typeobject.__computed"></a>

####  __computed

▸ **__computed**(_schemaValue: *`string`*, $DATA: *`unknown`*): `string` \| `void`

*Defined in [type/object.ts:114](https://github.com/krnik/vjs-validator/blob/08b1300/src/type/object.ts#L114)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| _schemaValue | `string` |
| $DATA | `unknown` |

**Returns:** `string` \| `void`

<a id="typeobject.__computed.__computed-1"></a>

####  __computed

**● __computed**: *`function`* =  schemaValidate.minMaxOrNumber(TYPE_NAME.OBJECT, PROP_COUNT, true)

*Defined in [type/object.ts:137](https://github.com/krnik/vjs-validator/blob/08b1300/src/type/object.ts#L137)*
*Defined in [type/object.ts:138](https://github.com/krnik/vjs-validator/blob/08b1300/src/type/object.ts#L138)*
*Defined in [type/object.ts:139](https://github.com/krnik/vjs-validator/blob/08b1300/src/type/object.ts#L139)*
*Defined in [type/object.ts:140](https://github.com/krnik/vjs-validator/blob/08b1300/src/type/object.ts#L140)*
*Defined in [type/object.ts:141](https://github.com/krnik/vjs-validator/blob/08b1300/src/type/object.ts#L141)*
*Defined in [type/object.ts:142](https://github.com/krnik/vjs-validator/blob/08b1300/src/type/object.ts#L142)*

#### Type declaration
▸(v: *`unknown`*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| v | `unknown` |

**Returns:** `void`

___

___

___
<a id="typestring"></a>

### `<Const>` TypeString

**TypeString**: *`object`*

*Defined in [type/string.ts:17](https://github.com/krnik/vjs-validator/blob/08b1300/src/type/string.ts#L17)*

<a id="typestring.__computed"></a>

####  __computed

▸ **__computed**(_schemaValue: *`string`*, $DATA: *`unknown`*): `string` \| `void`

*Defined in [type/string.ts:18](https://github.com/krnik/vjs-validator/blob/08b1300/src/type/string.ts#L18)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| _schemaValue | `string` |
| $DATA | `unknown` |

**Returns:** `string` \| `void`

<a id="typestring.__computed.__computed-1"></a>

####  __computed

**● __computed**: *`function`* =  schemaValidate.arrayOf(TYPE_NAME.STRING, ONE_OF, 'string')

*Defined in [type/string.ts:123](https://github.com/krnik/vjs-validator/blob/08b1300/src/type/string.ts#L123)*
*Defined in [type/string.ts:124](https://github.com/krnik/vjs-validator/blob/08b1300/src/type/string.ts#L124)*
*Defined in [type/string.ts:125](https://github.com/krnik/vjs-validator/blob/08b1300/src/type/string.ts#L125)*
*Defined in [type/string.ts:126](https://github.com/krnik/vjs-validator/blob/08b1300/src/type/string.ts#L126)*

#### Type declaration
▸(v: *`unknown`*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| v | `unknown` |

**Returns:** `void`

___

___

___
<a id="schemavalidate"></a>

### `<Const>` schemaValidate

**schemaValidate**: *`object`*

*Defined in [type/schema_validator.ts:205](https://github.com/krnik/vjs-validator/blob/08b1300/src/type/schema_validator.ts#L205)*

<a id="schemavalidate.any"></a>

####  any

**● any**: *[any](#any)*

*Defined in [type/schema_validator.ts:206](https://github.com/krnik/vjs-validator/blob/08b1300/src/type/schema_validator.ts#L206)*

___
<a id="schemavalidate.arrayof"></a>

####  arrayOf

**● arrayOf**: *[arrayOf](#arrayof)*

*Defined in [type/schema_validator.ts:207](https://github.com/krnik/vjs-validator/blob/08b1300/src/type/schema_validator.ts#L207)*

___
<a id="schemavalidate.arrayofpropertynames"></a>

####  arrayOfPropertyNames

**● arrayOfPropertyNames**: *[arrayOfPropertyNames](#arrayofpropertynames)*

*Defined in [type/schema_validator.ts:212](https://github.com/krnik/vjs-validator/blob/08b1300/src/type/schema_validator.ts#L212)*

___
<a id="schemavalidate.datapath"></a>

####  dataPath

**● dataPath**: *[dataPath](#datapath)*

*Defined in [type/schema_validator.ts:208](https://github.com/krnik/vjs-validator/blob/08b1300/src/type/schema_validator.ts#L208)*

___
<a id="schemavalidate.isinstance"></a>

####  isInstance

**● isInstance**: *[isInstance](#isinstance)*

*Defined in [type/schema_validator.ts:210](https://github.com/krnik/vjs-validator/blob/08b1300/src/type/schema_validator.ts#L210)*

___
<a id="schemavalidate.minmaxornumber"></a>

####  minMaxOrNumber

**● minMaxOrNumber**: *[minMaxOrNumber](#minmaxornumber)*

*Defined in [type/schema_validator.ts:211](https://github.com/krnik/vjs-validator/blob/08b1300/src/type/schema_validator.ts#L211)*

___
<a id="schemavalidate.primitive"></a>

####  primitive

**● primitive**: *[primitive](#primitive)*

*Defined in [type/schema_validator.ts:209](https://github.com/krnik/vjs-validator/blob/08b1300/src/type/schema_validator.ts#L209)*

___

___

