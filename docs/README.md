
#  JBQDocs

## Index

### Enumerations

* [ComparisonOperator](enums/comparisonoperator.md)
* [Keyword](enums/keyword.md)
* [KeywordValidationFunctionKind](enums/keywordvalidationfunctionkind.md)
* [LogicalOperator](enums/logicaloperator.md)
* [ParameterName](enums/parametername.md)
* [PathResolutionStrategy](enums/pathresolutionstrategy.md)

### Classes

* [CodeGenerator](classes/codegenerator.md)
* [CodeGeneratorError](classes/codegeneratorerror.md)
* [Compilation](classes/compilation.md)
* [CompilationError](classes/compilationerror.md)
* [LogService](classes/logservice.md)
* [Print](classes/print.md)
* [PropertyMetadata](classes/propertymetadata.md)
* [ResolvedPathStore](classes/resolvedpathstore.md)
* [SourceBuilder](classes/sourcebuilder.md)
* [TypeInstance](classes/typeinstance.md)
* [TypeInstanceError](classes/typeinstanceerror.md)
* [TypeReflect](classes/typereflect.md)
* [TypeStore](classes/typestore.md)
* [TypeStoreError](classes/typestoreerror.md)
* [Validator](classes/validator.md)
* [ValidatorBuilder](classes/validatorbuilder.md)

### Interfaces

* [ClassMetadata](interfaces/classmetadata.md)
* [CompileDecoratorOptions](interfaces/compiledecoratoroptions.md)
* [Constructor](interfaces/constructor.md)
* [DataPath](interfaces/datapath.md)
* [IfCondition](interfaces/ifcondition.md)
* [KeywordDescriptor](interfaces/keyworddescriptor.md)
* [Logger](interfaces/logger.md)
* [Options](interfaces/options.md)
* [ParseValues](interfaces/parsevalues.md)
* [ParseValuesMinMax](interfaces/parsevaluesminmax.md)
* [ResolvedPathVariable](interfaces/resolvedpathvariable.md)
* [Schema](interfaces/schema.md)
* [SchemaMax](interfaces/schemamax.md)
* [SchemaMin](interfaces/schemamin.md)
* [SourceBuilderContext](interfaces/sourcebuildercontext.md)
* [SourceBuilderCounter](interfaces/sourcebuildercounter.md)
* [SourceBuilderProduct](interfaces/sourcebuilderproduct.md)
* [SourceBuilderSnapshot](interfaces/sourcebuildersnapshot.md)
* [ValidationError](interfaces/validationerror.md)

### Type aliases

* [Any](#any)
* [AnyArray](#anyarray)
* [ArrIterCallback](#arritercallback)
* [AsyncValidationFunction](#asyncvalidationfunction)
* [ClassWithBuilder](#classwithbuilder)
* [DataPathChecker](#datapathchecker)
* [DataPathResolver](#datapathresolver)
* [DecoratorFactory](#decoratorfactory)
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
* [ResolvedValidationFunction](#resolvedvalidationfunction)
* [RestParams](#restparams)
* [ReturnsDecorator](#returnsdecorator)
* [SchemaMinMax](#schemaminmax)
* [SchemaValidator](#schemavalidator)
* [Some](#some)
* [SyncValidationFunction](#syncvalidationfunction)
* [TransformCallback](#transformcallback)
* [TypeSignature](#typesignature)
* [Types](#types)
* [ValidationResult](#validationresult)

### Variables

* [AsyncFnConstructor](#asyncfnconstructor)
* [CONSTRUCTOR_NAME](#constructor_name)
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
* [SCHEMA_PATH_SEPARATOR](#schema_path_separator)
* [SOME](#some)
* [SYM_BUILDER](#sym_builder)
* [SYM_SCHEMA_COLLECTION](#sym_schema_collection)
* [SYM_SCHEMA_PROPERTIES](#sym_schema_properties)
* [TOKEN_BREAK](#token_break)
* [TYPE](#type)
* [TYPE_ANY](#type_any)
* [TYPE_ARRAY](#type_array)
* [TYPE_BOOLEAN](#type_boolean)
* [TYPE_NUMBER](#type_number)
* [TYPE_OBJECT](#type_object)
* [TYPE_STORE](#type_store)
* [TYPE_STRING](#type_string)
* [TypeAny](#typeany)
* [TypeArray](#typearray)
* [TypeBoolean](#typeboolean)
* [TypeNumber](#typenumber)
* [TypeObject](#typeobject)
* [TypeString](#typestring)
* [VALUE](#value)
* [array](#array)
* [boolean](#boolean)
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
* [path](#path)
* [propCount](#propcount)
* [properties](#properties)
* [regex](#regex)
* [some](#some)
* [string](#string)
* [transform](#transform)
* [type](#type)
* [types](#types)
* [value](#value)
* [withDefault](#withdefault)

### Functions

* [AsyncFnFactory](#asyncfnfactory)
* [any](#any)
* [arrayOf](#arrayof)
* [arrayOfPropertyNames](#arrayofpropertynames)
* [buildFromMethod](#buildfrommethod)
* [collectionOf](#collectionof)
* [compile](#compile)
* [compileValidator](#compilevalidator)
* [createPropKeyCountMacro](#createpropkeycountmacro)
* [createTypes](#createtypes)
* [dataPath](#datapath)
* [isInstance](#isinstance)
* [jbq](#jbq)
* [minMaxOrNumber](#minmaxornumber)
* [primitive](#primitive)
* [propMetaDecoratorFactory](#propmetadecoratorfactory)
* [schemaDecoratorFactory](#schemadecoratorfactory)
* [setDefaultTypes](#setdefaulttypes)
* [shape](#shape)

### Object literals

* [LOGGER](#logger)
* [SchemaValidationError](#schemavalidationerror)
* [schemaValidate](#schemavalidate)

---

## Type aliases

<a id="any"></a>

###  Any

**Ƭ Any**: *`any`*

*Defined in [misc/typings.ts:9](https://github.com/krnik/vjs-validator/blob/c79d80e/src/misc/typings.ts#L9)*

___
<a id="anyarray"></a>

###  AnyArray

**Ƭ AnyArray**: *[Any](#any)[]*

*Defined in [misc/typings.ts:11](https://github.com/krnik/vjs-validator/blob/c79d80e/src/misc/typings.ts#L11)*

___
<a id="arritercallback"></a>

###  ArrIterCallback

**Ƭ ArrIterCallback**: *`function`*

*Defined in [misc/typings.ts:17](https://github.com/krnik/vjs-validator/blob/c79d80e/src/misc/typings.ts#L17)*

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

*Defined in [core/jbq.ts:8](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/jbq.ts#L8)*

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
<a id="classwithbuilder"></a>

###  ClassWithBuilder

**Ƭ ClassWithBuilder**: *[Constructor](interfaces/constructor.md) & `object`*

*Defined in [class_syntax/validator_builder.ts:9](https://github.com/krnik/vjs-validator/blob/c79d80e/src/class_syntax/validator_builder.ts#L9)*

___
<a id="datapathchecker"></a>

###  DataPathChecker

**Ƭ DataPathChecker**: *`function`*

*Defined in [core/compilation/compilation_typings.ts:28](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/compilation/compilation_typings.ts#L28)*

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

*Defined in [core/compilation/compilation_typings.ts:26](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/compilation/compilation_typings.ts#L26)*

#### Type declaration
▸(schemaValue: *[DataPath](interfaces/datapath.md)*): `string`

**Parameters:**

| Name | Type |
| ------ | ------ |
| schemaValue | [DataPath](interfaces/datapath.md) |

**Returns:** `string`

___
<a id="decoratorfactory"></a>

###  DecoratorFactory

**Ƭ DecoratorFactory**: *`function`*

*Defined in [class_syntax/decorator/property_metadata_decorator.ts:5](https://github.com/krnik/vjs-validator/blob/c79d80e/src/class_syntax/decorator/property_metadata_decorator.ts#L5)*

#### Type declaration
▸(value: *`V`*): `PropertyDecorator`

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `V` |

**Returns:** `PropertyDecorator`

___
<a id="defaultcallback"></a>

###  DefaultCallback

**Ƭ DefaultCallback**: *`function`*

*Defined in [class_syntax/property_metadata.ts:4](https://github.com/krnik/vjs-validator/blob/c79d80e/src/class_syntax/property_metadata.ts#L4)*

#### Type declaration
▸(data: *`D`*): `R`

**Parameters:**

| Name | Type |
| ------ | ------ |
| data | `D` |

**Returns:** `R`

___
<a id="empty"></a>

###  Empty

**Ƭ Empty**: *["__empty__", "__empty__", `undefined`]*

*Defined in [core/type_store.ts:8](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/type_store.ts#L8)*

Used to represent the typestate of empty TypeStore instance.

___
<a id="extract"></a>

###  Extract

**Ƭ Extract**: *`Extract<T, P>`*

*Defined in [core/type_store.ts:36](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/type_store.ts#L36)*

Extracts single Type out of TypeStore.

___
<a id="jbqvalidators"></a>

###  JBQValidators

**Ƭ JBQValidators**: *`object`*

*Defined in [core/jbq.ts:18](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/jbq.ts#L18)*

#### Type declaration

___
<a id="keywordvalidationfunction"></a>

###  KeywordValidationFunction

**Ƭ KeywordValidationFunction**: *`function`*

*Defined in [core/type_store/type_instance/type_instance_typings.ts:4](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/type_store/type_instance/type_instance_typings.ts#L4)*

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

*Defined in [type/object.ts:22](https://github.com/krnik/vjs-validator/blob/c79d80e/src/type/object.ts#L22)*

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

**Ƭ Methods**: *[Some](#some)<`T`>*

*Defined in [core/type_store/type_instance.ts:8](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/type_store/type_instance.ts#L8)*

___
<a id="notin"></a>

###  NotIn

**Ƭ NotIn**: *`NotIn<T, P>`*

*Defined in [core/type_store.ts:30](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/type_store.ts#L30)*

Disallows use of T that is one of keys that already exist in TypeStore instances.

___
<a id="objwithkeys"></a>

###  ObjWithKeys

**Ƭ ObjWithKeys**: *`object`*

*Defined in [util/type_reflect.ts:3](https://github.com/krnik/vjs-validator/blob/c79d80e/src/util/type_reflect.ts#L3)*

#### Type declaration

___
<a id="omitsymbols"></a>

###  OmitSymbols

**Ƭ OmitSymbols**: *`Pick`<`T`, `{ [K in keyof T]: K extends symbol ? never : K; }[keyof T]`>*

*Defined in [misc/typings.ts:6](https://github.com/krnik/vjs-validator/blob/c79d80e/src/misc/typings.ts#L6)*

___
<a id="option"></a>

###  Option

**Ƭ Option**: *`T` \| `undefined`*

*Defined in [misc/typings.ts:1](https://github.com/krnik/vjs-validator/blob/c79d80e/src/misc/typings.ts#L1)*

___
<a id="partialprops"></a>

###  PartialProps

**Ƭ PartialProps**: *`Pick`<`T`, `Exclude`<`keyof T`, `K`>> & `Partial`<`Pick`<`T`, `K`>>*

*Defined in [misc/typings.ts:4](https://github.com/krnik/vjs-validator/blob/c79d80e/src/misc/typings.ts#L4)*

___
<a id="resolvedvalidationfunction"></a>

###  ResolvedValidationFunction

**Ƭ ResolvedValidationFunction**: *`ResolvedValidationFunction<Opt>`*

*Defined in [core/jbq.ts:10](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/jbq.ts#L10)*

___
<a id="restparams"></a>

###  RestParams

**Ƭ RestParams**: *[Any](#any)[]*

*Defined in [misc/typings.ts:10](https://github.com/krnik/vjs-validator/blob/c79d80e/src/misc/typings.ts#L10)*

___
<a id="returnsdecorator"></a>

###  ReturnsDecorator

**Ƭ ReturnsDecorator**: *`function`*

*Defined in [class_syntax/decorator/schema_decorator.ts:28](https://github.com/krnik/vjs-validator/blob/c79d80e/src/class_syntax/decorator/schema_decorator.ts#L28)*

#### Type declaration
▸(value: *`V`*): `PropertyDecorator`

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `V` |

**Returns:** `PropertyDecorator`

___
<a id="schemaminmax"></a>

###  SchemaMinMax

**Ƭ SchemaMinMax**: *[SchemaMax](interfaces/schemamax.md) \| [SchemaMin](interfaces/schemamin.md) \| `number` \| [DataPath](interfaces/datapath.md)*

*Defined in [type/type_definition_typings.ts:11](https://github.com/krnik/vjs-validator/blob/c79d80e/src/type/type_definition_typings.ts#L11)*

___
<a id="schemavalidator"></a>

###  SchemaValidator

**Ƭ SchemaValidator**: *`function`*

*Defined in [type/schema_validator.ts:41](https://github.com/krnik/vjs-validator/blob/c79d80e/src/type/schema_validator.ts#L41)*

#### Type declaration
▸(v: *`unknown`*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| v | `unknown` |

**Returns:** `void`

___
<a id="some"></a>

###  Some

**Ƭ Some**: *`Exclude`<`T`, `undefined`>*

*Defined in [misc/typings.ts:2](https://github.com/krnik/vjs-validator/blob/c79d80e/src/misc/typings.ts#L2)*

___
<a id="syncvalidationfunction"></a>

###  SyncValidationFunction

**Ƭ SyncValidationFunction**: *`function`*

*Defined in [core/jbq.ts:7](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/jbq.ts#L7)*

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

*Defined in [class_syntax/property_metadata.ts:5](https://github.com/krnik/vjs-validator/blob/c79d80e/src/class_syntax/property_metadata.ts#L5)*

#### Type declaration
▸(propertyValue: *`P`*, data: *`D`*): `R`

**Parameters:**

| Name | Type |
| ------ | ------ |
| propertyValue | `P` |
| data | `D` |

**Returns:** `R`

___
<a id="typesignature"></a>

###  TypeSignature

**Ƭ TypeSignature**: *[`string`, [Option](#option)<`string`>, [Option](#option)<`string`>]*

*Defined in [core/type_store.ts:19](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/type_store.ts#L19)*

Represents single Type in the TypeStore instance.

`T[0]` - Equivalent of `TypeInstance`s' `N` generic argument - name of a type.

`T[1]` - Equivalent of `TypeInstance`s' `M` generic argument - names of keywords.

`T[2]` - Equivalent of `TypeInstance`s' `D` generic argument - name of derived type.

___
<a id="types"></a>

###  Types

**Ƭ Types**: *`Exclude`<`T`, [Empty](#empty)>*

*Defined in [core/type_store.ts:24](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/type_store.ts#L24)*

Represents the typestate of TypeStore instance.

___
<a id="validationresult"></a>

###  ValidationResult

**Ƭ ValidationResult**: *[Option](#option)<[ValidationError](interfaces/validationerror.md)>*

*Defined in [core/jbq/jbq_typings.ts:66](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/jbq/jbq_typings.ts#L66)*

___

## Variables

<a id="asyncfnconstructor"></a>

### `<Const>` AsyncFnConstructor

**● AsyncFnConstructor**: *`any`* =  Object.getPrototypeOf(async function*(): unknown {}).constructor

*Defined in [core/jbq.ts:22](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/jbq.ts#L22)*

___
<a id="constructor_name"></a>

### `<Const>` CONSTRUCTOR_NAME

**● CONSTRUCTOR_NAME**: *"constructorName"* = "constructorName"

*Defined in [misc/constants.ts:1](https://github.com/krnik/vjs-validator/blob/c79d80e/src/misc/constants.ts#L1)*

___
<a id="default_async_interval"></a>

### `<Const>` DEFAULT_ASYNC_INTERVAL

**● DEFAULT_ASYNC_INTERVAL**: *`50`* = 50

*Defined in [misc/constants.ts:82](https://github.com/krnik/vjs-validator/blob/c79d80e/src/misc/constants.ts#L82)*

Default value for the `JBQOptions.asyncInterval` property.

___
<a id="every"></a>

### `<Const>` EVERY

**● EVERY**: *"every"* = "every"

*Defined in [misc/constants.ts:11](https://github.com/krnik/vjs-validator/blob/c79d80e/src/misc/constants.ts#L11)*

___
<a id="expression_regex"></a>

### `<Const>` EXPRESSION_REGEX

**● EXPRESSION_REGEX**: *`RegExp`* =  /{{(.*?)}}/g

*Defined in [misc/constants.ts:75](https://github.com/krnik/vjs-validator/blob/c79d80e/src/misc/constants.ts#L75)*

Regular expression used to find templte expressions during compilation. They're executed during compile time and should return values that are possible to represent as a literal.

Reason why we might want to have such expressions is that its much more efficient to execute expression once and save its result instead of executing it every time some value is validated.

___
<a id="includes"></a>

### `<Const>` INCLUDES

**● INCLUDES**: *"includes"* = "includes"

*Defined in [misc/constants.ts:8](https://github.com/krnik/vjs-validator/blob/c79d80e/src/misc/constants.ts#L8)*

___
<a id="instance_of"></a>

### `<Const>` INSTANCE_OF

**● INSTANCE_OF**: *"instanceOf"* = "instanceOf"

*Defined in [misc/constants.ts:2](https://github.com/krnik/vjs-validator/blob/c79d80e/src/misc/constants.ts#L2)*

___
<a id="key_count"></a>

### `<Const>` KEY_COUNT

**● KEY_COUNT**: *"keyCount"* = "keyCount"

*Defined in [misc/constants.ts:6](https://github.com/krnik/vjs-validator/blob/c79d80e/src/misc/constants.ts#L6)*

___
<a id="len"></a>

### `<Const>` LEN

**● LEN**: *"len"* = "len"

*Defined in [misc/constants.ts:15](https://github.com/krnik/vjs-validator/blob/c79d80e/src/misc/constants.ts#L15)*

___
<a id="multiple_of"></a>

### `<Const>` MULTIPLE_OF

**● MULTIPLE_OF**: *"multipleOf"* = "multipleOf"

*Defined in [misc/constants.ts:3](https://github.com/krnik/vjs-validator/blob/c79d80e/src/misc/constants.ts#L3)*

___
<a id="one_of"></a>

### `<Const>` ONE_OF

**● ONE_OF**: *"oneOf"* = "oneOf"

*Defined in [misc/constants.ts:9](https://github.com/krnik/vjs-validator/blob/c79d80e/src/misc/constants.ts#L9)*

___
<a id="properties"></a>

### `<Const>` PROPERTIES

**● PROPERTIES**: *"properties"* = "properties"

*Defined in [misc/constants.ts:4](https://github.com/krnik/vjs-validator/blob/c79d80e/src/misc/constants.ts#L4)*

___
<a id="prop_count"></a>

### `<Const>` PROP_COUNT

**● PROP_COUNT**: *"propCount"* = "propCount"

*Defined in [misc/constants.ts:5](https://github.com/krnik/vjs-validator/blob/c79d80e/src/misc/constants.ts#L5)*

___
<a id="prop_data_path"></a>

### `<Const>` PROP_DATA_PATH

**● PROP_DATA_PATH**: *"$dataPath"* = "$dataPath"

*Defined in [misc/constants.ts:79](https://github.com/krnik/vjs-validator/blob/c79d80e/src/misc/constants.ts#L79)*

___
<a id="regex"></a>

### `<Const>` REGEX

**● REGEX**: *"regex"* = "regex"

*Defined in [misc/constants.ts:10](https://github.com/krnik/vjs-validator/blob/c79d80e/src/misc/constants.ts#L10)*

___
<a id="required"></a>

### `<Const>` REQUIRED

**● REQUIRED**: *"required"* = "required"

*Defined in [misc/constants.ts:7](https://github.com/krnik/vjs-validator/blob/c79d80e/src/misc/constants.ts#L7)*

___
<a id="schema_path_separator"></a>

### `<Const>` SCHEMA_PATH_SEPARATOR

**● SCHEMA_PATH_SEPARATOR**: *"/"* = "/"

*Defined in [misc/constants.ts:77](https://github.com/krnik/vjs-validator/blob/c79d80e/src/misc/constants.ts#L77)*

___
<a id="some"></a>

### `<Const>` SOME

**● SOME**: *"some"* = "some"

*Defined in [misc/constants.ts:14](https://github.com/krnik/vjs-validator/blob/c79d80e/src/misc/constants.ts#L14)*

___
<a id="sym_builder"></a>

### `<Const>` SYM_BUILDER

**● SYM_BUILDER**: *`unique symbol`* =  Symbol('validator_builder')

*Defined in [class_syntax/validator_builder.ts:7](https://github.com/krnik/vjs-validator/blob/c79d80e/src/class_syntax/validator_builder.ts#L7)*

___
<a id="sym_schema_collection"></a>

### `<Const>` SYM_SCHEMA_COLLECTION

**● SYM_SCHEMA_COLLECTION**: *`unique symbol`* =  Symbol.for('schema_collection')

*Defined in [misc/constants.ts:59](https://github.com/krnik/vjs-validator/blob/c79d80e/src/misc/constants.ts#L59)*

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

*Defined in [misc/constants.ts:40](https://github.com/krnik/vjs-validator/blob/c79d80e/src/misc/constants.ts#L40)*

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

*Defined in [misc/constants.ts:64](https://github.com/krnik/vjs-validator/blob/c79d80e/src/misc/constants.ts#L64)*

Token that is replaced by labeled break statement during compilation.

___
<a id="type"></a>

### `<Const>` TYPE

**● TYPE**: *"type"* = "type"

*Defined in [misc/constants.ts:13](https://github.com/krnik/vjs-validator/blob/c79d80e/src/misc/constants.ts#L13)*

___
<a id="type_any"></a>

### `<Const>` TYPE_ANY

**● TYPE_ANY**: *"any"* = "any"

*Defined in [misc/constants.ts:22](https://github.com/krnik/vjs-validator/blob/c79d80e/src/misc/constants.ts#L22)*

___
<a id="type_array"></a>

### `<Const>` TYPE_ARRAY

**● TYPE_ARRAY**: *"array"* = "array"

*Defined in [misc/constants.ts:21](https://github.com/krnik/vjs-validator/blob/c79d80e/src/misc/constants.ts#L21)*

___
<a id="type_boolean"></a>

### `<Const>` TYPE_BOOLEAN

**● TYPE_BOOLEAN**: *"boolean"* = "boolean"

*Defined in [misc/constants.ts:17](https://github.com/krnik/vjs-validator/blob/c79d80e/src/misc/constants.ts#L17)*

___
<a id="type_number"></a>

### `<Const>` TYPE_NUMBER

**● TYPE_NUMBER**: *"number"* = "number"

*Defined in [misc/constants.ts:19](https://github.com/krnik/vjs-validator/blob/c79d80e/src/misc/constants.ts#L19)*

___
<a id="type_object"></a>

### `<Const>` TYPE_OBJECT

**● TYPE_OBJECT**: *"object"* = "object"

*Defined in [misc/constants.ts:20](https://github.com/krnik/vjs-validator/blob/c79d80e/src/misc/constants.ts#L20)*

___
<a id="type_store"></a>

### `<Let>` TYPE_STORE

**● TYPE_STORE**: *[TypeStore](classes/typestore.md)<[Any](#any)>* =  types

*Defined in [class_syntax/decorator/class_decorator.ts:11](https://github.com/krnik/vjs-validator/blob/c79d80e/src/class_syntax/decorator/class_decorator.ts#L11)*

___
<a id="type_string"></a>

### `<Const>` TYPE_STRING

**● TYPE_STRING**: *"string"* = "string"

*Defined in [misc/constants.ts:18](https://github.com/krnik/vjs-validator/blob/c79d80e/src/misc/constants.ts#L18)*

___
<a id="typeany"></a>

### `<Const>` TypeAny

**● TypeAny**: *[TypeInstance](classes/typeinstance.md)<"any", "required" \| "type", `undefined`>* =  new TypeInstance(TYPE_ANY)
    .setKeyword(TYPE, {
        validator({ variableName }: ParseValues): string {
            return CodeGenerator.renderLabeledBreakStatement(variableName);
        },
        kind: KeywordValidationFunctionKind.Macro,
        schemaValidator: schemaValidate.primitive(TYPE_ANY, TYPE, 'string'),
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
        schemaValidator: schemaValidate.primitive(TYPE_ANY, REQUIRED, 'boolean'),
    })
    .setKeywordOrder([REQUIRED, TYPE])

*Defined in [type/any.ts:8](https://github.com/krnik/vjs-validator/blob/c79d80e/src/type/any.ts#L8)*

___
<a id="typearray"></a>

### `<Const>` TypeArray

**● TypeArray**: *[TypeInstance](classes/typeinstance.md)<"array", "includes" \| "every" \| "type" \| "some" \| "len", "any">* =  new TypeInstance(TYPE_ARRAY)
    .derive(TypeAny)
    .setKeyword(TYPE, {
        validator(_schemaValue: string, $DATA: unknown): ValidationResult {
            if (!Array.isArray($DATA))
                return {
                    message: 'Data should be a {{schemaValue}} type.',
                    path: '{{schemaPath}}',
                };
        },
        schemaValidator: schemaValidate.primitive(TYPE_ARRAY, TYPE, 'string'),
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
        schemaValidator: schemaValidate.isInstance(TYPE_ARRAY, EVERY, Function),
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
        schemaValidator: schemaValidate.isInstance(TYPE_ARRAY, SOME, Function),
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
        schemaValidator: schemaValidate.any(TYPE_ARRAY, INCLUDES),
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
        schemaValidator: schemaValidate.minMaxOrNumber(TYPE_ARRAY, LEN, true),
    })
    .setUseForOfLoop(false)

*Defined in [type/array.ts:19](https://github.com/krnik/vjs-validator/blob/c79d80e/src/type/array.ts#L19)*

___
<a id="typeboolean"></a>

### `<Const>` TypeBoolean

**● TypeBoolean**: *[TypeInstance](classes/typeinstance.md)<"boolean", "value" \| "type", "any">* =  new TypeInstance(TYPE_BOOLEAN)
    .derive(TypeAny)
    .setKeyword(TYPE, {
        validator(_schemaValue: string, $DATA: unknown): ValidationResult {
            if ($DATA !== true && $DATA !== false)
                return {
                    message: 'Data should be {{schemaValue}} type. Got ${typeof $DATA}.',
                    path: '{{schemaPath}}',
                };
        },
        schemaValidator: schemaValidate.primitive(TYPE_BOOLEAN, TYPE, 'string'),
    })
    .setKeyword(VALUE, {
        validator(schemaValue: boolean, $DATA: boolean): ValidationResult {
            if (schemaValue !== $DATA)
                return {
                    message: `Data should be equal to {{resolvedValue || schemaValue}}. Got ${$DATA}.`,
                    path: '{{schemaPath}}',
                };
        },
        schemaValidator: schemaValidate.primitive(TYPE_BOOLEAN, VALUE, 'boolean', true),
    })

*Defined in [type/boolean.ts:7](https://github.com/krnik/vjs-validator/blob/c79d80e/src/type/boolean.ts#L7)*

___
<a id="typenumber"></a>

### `<Const>` TypeNumber

**● TypeNumber**: *[TypeInstance](classes/typeinstance.md)<"number", "multipleOf" \| "oneOf" \| "value" \| "type", "any">* =  new TypeInstance(TYPE_NUMBER)
    .derive(TypeAny)
    .setKeyword(TYPE, {
        validator(_schemaValue: string, $DATA: unknown): ValidationResult {
            if (typeof $DATA !== 'number' || $DATA !== $DATA)
                return {
                    message: `Data should be a number (NaN excluded) type. Got ${typeof $DATA}.`,
                    path: '{{schemaPath}}',
                };
        },
        schemaValidator: schemaValidate.primitive(TYPE_NUMBER, TYPE, 'string'),
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
        schemaValidator: schemaValidate.minMaxOrNumber(TYPE_NUMBER, VALUE, true),
    })
    .setKeyword(ONE_OF, {
        validator(schemaValue: number[], $DATA: number): ValidationResult {
            if (!schemaValue.includes($DATA))
                return {
                    message: 'Data should be one of {{schemaValue.toString()}}.',
                    path: '{{schemaPath}}',
                };
        },
        schemaValidator: schemaValidate.arrayOf(TYPE_NUMBER, ONE_OF, 'number'),
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
        schemaValidator: schemaValidate.primitive(TYPE_NUMBER, MULTIPLE_OF, 'number', true),
    })

*Defined in [type/number.ts:13](https://github.com/krnik/vjs-validator/blob/c79d80e/src/type/number.ts#L13)*

___
<a id="typeobject"></a>

### `<Const>` TypeObject

**● TypeObject**: *[TypeInstance](classes/typeinstance.md)<"object", "constructorName" \| "instanceOf" \| "properties" \| "propCount" \| "keyCount" \| "type", "any">* =  new TypeInstance(TYPE_OBJECT)
    .derive(TypeAny)
    .setKeyword(TYPE, {
        validator(_schemaValue: string, $DATA: unknown): ValidationResult {
            if (!($DATA && typeof $DATA === 'object' && !Array.isArray($DATA)))
                return {
                    message: 'Data should be {{schemaValue}} type.',
                    path: '{{schemaPath}}',
                };
        },
        schemaValidator: schemaValidate.primitive(TYPE_OBJECT, TYPE, 'string'),
    })
    .setKeyword(CONSTRUCTOR_NAME, {
        validator(schemaValue: string, $DATA: object): ValidationResult {
            if (Object.getPrototypeOf($DATA).constructor.name !== schemaValue)
                return {
                    message: 'Data should be direct instance of {{schemaValue}}.',
                    path: '{{schemaPath}}',
                };
        },
        schemaValidator: schemaValidate.primitive(TYPE_OBJECT, CONSTRUCTOR_NAME, 'string'),
    })
    .setKeyword(INSTANCE_OF, {
        validator(schemaValue: () => void, $DATA: object): ValidationResult {
            if (!($DATA instanceof schemaValue))
                return {
                    message: 'Data should be instance of {{schemaValue.name}}.',
                    path: '{{schemaPath}}',
                };
        },
        schemaValidator: schemaValidate.isInstance(TYPE_OBJECT, INSTANCE_OF, Function),
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
        schemaValidator: schemaValidate.arrayOfPropertyNames(TYPE_OBJECT, PROPERTIES),
    })
    .setKeyword(KEY_COUNT, {
        validator: createPropKeyCountMacro((d): string => `Object.keys(${d}).length`),
        kind: KeywordValidationFunctionKind.Macro,
        schemaValidator: schemaValidate.minMaxOrNumber(TYPE_OBJECT, KEY_COUNT, true),
    })
    .setKeyword(PROP_COUNT, {
        validator: createPropKeyCountMacro(
            (d): string =>
                `(Object.getOwnPropertyNames(${d}).length + Object.getOwnPropertySymbols(${d}).length)`,
        ),
        kind: KeywordValidationFunctionKind.Macro,
        schemaValidator: schemaValidate.minMaxOrNumber(TYPE_OBJECT, PROP_COUNT, true),
    })

*Defined in [type/object.ts:116](https://github.com/krnik/vjs-validator/blob/c79d80e/src/type/object.ts#L116)*

___
<a id="typestring"></a>

### `<Const>` TypeString

**● TypeString**: *[TypeInstance](classes/typeinstance.md)<"string", "oneOf" \| "regex" \| "type" \| "len", "any">* =  new TypeInstance(TYPE_STRING)
    .derive(TypeAny)
    .setKeyword(TYPE, {
        validator(_schemaValue: string, $DATA: unknown): ValidationResult {
            if (typeof $DATA !== 'string')
                return {
                    message: `Data should be a {{schemaValue}} type. Got ${typeof $DATA}.`,
                    path: '{{schemaPath}}',
                };
        },
        schemaValidator: schemaValidate.isInstance(TYPE_STRING, TYPE, String),
    })
    .setKeyword(REGEX, {
        validator(schemaValue: RegExp, $DATA: string): ValidationResult {
            if (!schemaValue.test($DATA))
                return {
                    message: 'Data expected to pass {{schemaValue.toString()}} test.',
                    path: '{{schemaPath}}',
                };
        },
        schemaValidator: schemaValidate.isInstance(TYPE_STRING, REGEX, RegExp),
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
        schemaValidator: schemaValidate.minMaxOrNumber(TYPE_STRING, LEN, true),
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
        schemaValidator: schemaValidate.arrayOf(TYPE_STRING, ONE_OF, 'string'),
    })

*Defined in [type/string.ts:13](https://github.com/krnik/vjs-validator/blob/c79d80e/src/type/string.ts#L13)*

___
<a id="value"></a>

### `<Const>` VALUE

**● VALUE**: *"value"* = "value"

*Defined in [misc/constants.ts:12](https://github.com/krnik/vjs-validator/blob/c79d80e/src/misc/constants.ts#L12)*

___
<a id="array"></a>

### `<Const>` array

**● array**: *`function`* =  type(TYPE_ARRAY)

*Defined in [class_syntax/decorator/schema_decorator.ts:63](https://github.com/krnik/vjs-validator/blob/c79d80e/src/class_syntax/decorator/schema_decorator.ts#L63)*

Shorthand `@type` decorator that assigns schema `type` keyword to `array`

#### Type declaration
▸(target: *`Object`*, propertyKey: *`string` \| `symbol`*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| target | `Object` |
| propertyKey | `string` \| `symbol` |

**Returns:** `void`

___
<a id="boolean"></a>

### `<Const>` boolean

**● boolean**: *`function`* =  type(TYPE_BOOLEAN)

*Defined in [class_syntax/decorator/schema_decorator.ts:66](https://github.com/krnik/vjs-validator/blob/c79d80e/src/class_syntax/decorator/schema_decorator.ts#L66)*

Shorthand `@type` decorator that assigns schema `type` keyword to `boolean`

#### Type declaration
▸(target: *`Object`*, propertyKey: *`string` \| `symbol`*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| target | `Object` |
| propertyKey | `string` \| `symbol` |

**Returns:** `void`

___
<a id="constructorname"></a>

### `<Const>` constructorName

**● constructorName**: *`function`* =  schemaDecoratorFactory<string>(CONSTRUCTOR_NAME)

*Defined in [class_syntax/decorator/schema_decorator.ts:117](https://github.com/krnik/vjs-validator/blob/c79d80e/src/class_syntax/decorator/schema_decorator.ts#L117)*

Assigns schema `constructorName` keyword to provided value

#### Type declaration
▸(value: *`V`*): `PropertyDecorator`

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `V` |

**Returns:** `PropertyDecorator`

___
<a id="every"></a>

### `<Const>` every

**● every**: *`function`* =  schemaDecoratorFactory<ArrIterCallback<boolean, unknown>>(EVERY)

*Defined in [class_syntax/decorator/schema_decorator.ts:81](https://github.com/krnik/vjs-validator/blob/c79d80e/src/class_syntax/decorator/schema_decorator.ts#L81)*

Assigns schema `every` keyword to provided callback

#### Type declaration
▸(value: *`V`*): `PropertyDecorator`

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `V` |

**Returns:** `PropertyDecorator`

___
<a id="includes"></a>

### `<Const>` includes

**● includes**: *`function`* =  schemaDecoratorFactory<unknown>(INCLUDES)

*Defined in [class_syntax/decorator/schema_decorator.ts:87](https://github.com/krnik/vjs-validator/blob/c79d80e/src/class_syntax/decorator/schema_decorator.ts#L87)*

Assigns schema `includes` keyword to provided value

#### Type declaration
▸(value: *`V`*): `PropertyDecorator`

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `V` |

**Returns:** `PropertyDecorator`

___
<a id="instanceof"></a>

### `<Const>` instanceOf

**● instanceOf**: *`function`* =  schemaDecoratorFactory<Function>(INSTANCE_OF)

*Defined in [class_syntax/decorator/schema_decorator.ts:114](https://github.com/krnik/vjs-validator/blob/c79d80e/src/class_syntax/decorator/schema_decorator.ts#L114)*

Assigns schema `instanceOf` keyword to provided value

#### Type declaration
▸(value: *`V`*): `PropertyDecorator`

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `V` |

**Returns:** `PropertyDecorator`

___
<a id="keycount"></a>

### `<Const>` keyCount

**● keyCount**: *`function`* =  schemaDecoratorFactory<ParseValuesMinMax['schemaValue']>(KEY_COUNT)

*Defined in [class_syntax/decorator/schema_decorator.ts:105](https://github.com/krnik/vjs-validator/blob/c79d80e/src/class_syntax/decorator/schema_decorator.ts#L105)*

Assigns schema `keyCount` keyword to provided value

#### Type declaration
▸(value: *`V`*): `PropertyDecorator`

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `V` |

**Returns:** `PropertyDecorator`

___
<a id="len"></a>

### `<Const>` len

**● len**: *`function`* =  schemaDecoratorFactory<ParseValuesMinMax['schemaValue']>(LEN)

*Defined in [class_syntax/decorator/schema_decorator.ts:90](https://github.com/krnik/vjs-validator/blob/c79d80e/src/class_syntax/decorator/schema_decorator.ts#L90)*

Assigns schema `len` keyword to provided value

#### Type declaration
▸(value: *`V`*): `PropertyDecorator`

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `V` |

**Returns:** `PropertyDecorator`

___
<a id="multipleof"></a>

### `<Const>` multipleOf

**● multipleOf**: *`function`* =  schemaDecoratorFactory<number>(MULTIPLE_OF)

*Defined in [class_syntax/decorator/schema_decorator.ts:96](https://github.com/krnik/vjs-validator/blob/c79d80e/src/class_syntax/decorator/schema_decorator.ts#L96)*

Assigns schema `multipleOf` keyword to provided number

#### Type declaration
▸(value: *`V`*): `PropertyDecorator`

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `V` |

**Returns:** `PropertyDecorator`

___
<a id="number"></a>

### `<Const>` number

**● number**: *`function`* =  type(TYPE_NUMBER)

*Defined in [class_syntax/decorator/schema_decorator.ts:69](https://github.com/krnik/vjs-validator/blob/c79d80e/src/class_syntax/decorator/schema_decorator.ts#L69)*

Shorthand `@type` decorator that assigns schema `type` keyword to `number`

#### Type declaration
▸(target: *`Object`*, propertyKey: *`string` \| `symbol`*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| target | `Object` |
| propertyKey | `string` \| `symbol` |

**Returns:** `void`

___
<a id="object"></a>

### `<Const>` object

**● object**: *`function`* =  type(TYPE_OBJECT)

*Defined in [class_syntax/decorator/schema_decorator.ts:72](https://github.com/krnik/vjs-validator/blob/c79d80e/src/class_syntax/decorator/schema_decorator.ts#L72)*

Shorthand `@type` decorator that assigns schema `type` keyword to `object`

#### Type declaration
▸(target: *`Object`*, propertyKey: *`string` \| `symbol`*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| target | `Object` |
| propertyKey | `string` \| `symbol` |

**Returns:** `void`

___
<a id="oneof"></a>

### `<Const>` oneOf

**● oneOf**: *`function`* =  schemaDecoratorFactory<string[] | number[]>(ONE_OF)

*Defined in [class_syntax/decorator/schema_decorator.ts:102](https://github.com/krnik/vjs-validator/blob/c79d80e/src/class_syntax/decorator/schema_decorator.ts#L102)*

Assigns schema `oneOf` keyword to provided value

#### Type declaration
▸(value: *`V`*): `PropertyDecorator`

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `V` |

**Returns:** `PropertyDecorator`

___
<a id="optional"></a>

### `<Const>` optional

**● optional**: *`function`* =  schemaDecoratorFactory(REQUIRED)(false)

*Defined in [class_syntax/decorator/schema_decorator.ts:78](https://github.com/krnik/vjs-validator/blob/c79d80e/src/class_syntax/decorator/schema_decorator.ts#L78)*

Assigns schema `required` keyword to `false`

#### Type declaration
▸(target: *`Object`*, propertyKey: *`string` \| `symbol`*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| target | `Object` |
| propertyKey | `string` \| `symbol` |

**Returns:** `void`

___
<a id="path"></a>

### `<Const>` path

**● path**: *`function`* =  propMetaDecoratorFactory('dataPropertyPath')

*Defined in [class_syntax/decorator/property_metadata_decorator.ts:66](https://github.com/krnik/vjs-validator/blob/c79d80e/src/class_syntax/decorator/property_metadata_decorator.ts#L66)*

Changes the property name of which data should be used for validation.

Example
=======

#example:class\_syntax\_path

#### Type declaration
▸(value: *`V`*): `PropertyDecorator`

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `V` |

**Returns:** `PropertyDecorator`

___
<a id="propcount"></a>

### `<Const>` propCount

**● propCount**: *`function`* =  schemaDecoratorFactory<ParseValuesMinMax['schemaValue']>(PROP_COUNT)

*Defined in [class_syntax/decorator/schema_decorator.ts:108](https://github.com/krnik/vjs-validator/blob/c79d80e/src/class_syntax/decorator/schema_decorator.ts#L108)*

Assigns schema `propCount` keyword to provided value

#### Type declaration
▸(value: *`V`*): `PropertyDecorator`

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `V` |

**Returns:** `PropertyDecorator`

___
<a id="properties"></a>

### `<Const>` properties

**● properties**: *`function`* =  schemaDecoratorFactory<(string | symbol | number)[]>(PROPERTIES)

*Defined in [class_syntax/decorator/schema_decorator.ts:111](https://github.com/krnik/vjs-validator/blob/c79d80e/src/class_syntax/decorator/schema_decorator.ts#L111)*

Assigns schema `properties` keyword to provided value

#### Type declaration
▸(value: *`V`*): `PropertyDecorator`

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `V` |

**Returns:** `PropertyDecorator`

___
<a id="regex"></a>

### `<Const>` regex

**● regex**: *`function`* =  schemaDecoratorFactory<RegExp>(REGEX)

*Defined in [class_syntax/decorator/schema_decorator.ts:99](https://github.com/krnik/vjs-validator/blob/c79d80e/src/class_syntax/decorator/schema_decorator.ts#L99)*

Assigns schema `regex` keyword to provided RegExp instance

#### Type declaration
▸(value: *`V`*): `PropertyDecorator`

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `V` |

**Returns:** `PropertyDecorator`

___
<a id="some"></a>

### `<Const>` some

**● some**: *`function`* =  schemaDecoratorFactory<ArrIterCallback<boolean, unknown>>(SOME)

*Defined in [class_syntax/decorator/schema_decorator.ts:84](https://github.com/krnik/vjs-validator/blob/c79d80e/src/class_syntax/decorator/schema_decorator.ts#L84)*

Assigns schema `some` keyword to provided callback

#### Type declaration
▸(value: *`V`*): `PropertyDecorator`

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `V` |

**Returns:** `PropertyDecorator`

___
<a id="string"></a>

### `<Const>` string

**● string**: *`function`* =  type(TYPE_STRING)

*Defined in [class_syntax/decorator/schema_decorator.ts:75](https://github.com/krnik/vjs-validator/blob/c79d80e/src/class_syntax/decorator/schema_decorator.ts#L75)*

Shorthand `@type` decorator that assigns schema `type` keyword to `string`

#### Type declaration
▸(target: *`Object`*, propertyKey: *`string` \| `symbol`*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| target | `Object` |
| propertyKey | `string` \| `symbol` |

**Returns:** `void`

___
<a id="transform"></a>

### `<Const>` transform

**● transform**: *`function`* =  propMetaDecoratorFactory('transformFn')

*Defined in [class_syntax/decorator/property_metadata_decorator.ts:58](https://github.com/krnik/vjs-validator/blob/c79d80e/src/class_syntax/decorator/property_metadata_decorator.ts#L58)*

**Property decorator.**

**Applies only to instances.**

Defines the transformation function for a property.

Transformations are evaluated at the end of building instance.

Transformation function will set property value to a return value of a callback provided to the decorator function.

If transformation function returns Promise then the `.build` method of a class will also return Promise that eventually will resolve to the class instance. Since TypeScript does not support changing the class signature via decorators this behaviour needs to be manually `hinted` by setting `true` value in a generic parameter of `Validator` class.

Example
=======

#example:class\_syntax\_transform

#### Type declaration
▸(value: *`V`*): `PropertyDecorator`

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `V` |

**Returns:** `PropertyDecorator`

___
<a id="type"></a>

### `<Const>` type

**● type**: *`function`* =  schemaDecoratorFactory<string>(TYPE)

*Defined in [class_syntax/decorator/schema_decorator.ts:57](https://github.com/krnik/vjs-validator/blob/c79d80e/src/class_syntax/decorator/schema_decorator.ts#L57)*

_Property Decorator_

Assigns `type` keyword to the schema.

#### Type declaration
▸(value: *`V`*): `PropertyDecorator`

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `V` |

**Returns:** `PropertyDecorator`

___
<a id="types"></a>

### `<Const>` types

**● types**: *[TypeStore](classes/typestore.md)<["any", "required" \| "type", `undefined`] \| ["array", "includes" \| "every" \| "type" \| "some" \| "len", "any"] \| ["boolean", "value" \| "type", "any"] \| ["number", "multipleOf" \| "oneOf" \| "value" \| "type", "any"] \| ["object", "constructorName" \| "instanceOf" \| "properties" \| "propCount" \| "keyCount" \| "type", "any"] \| ["string", "oneOf" \| "regex" \| "type" \| "len", "any"]>* =  createTypes()

*Defined in [type/mod.ts:20](https://github.com/krnik/vjs-validator/blob/c79d80e/src/type/mod.ts#L20)*

___
<a id="value"></a>

### `<Const>` value

**● value**: *`function`* =  schemaDecoratorFactory<ParseValuesMinMax['schemaValue'] | boolean>(VALUE)

*Defined in [class_syntax/decorator/schema_decorator.ts:93](https://github.com/krnik/vjs-validator/blob/c79d80e/src/class_syntax/decorator/schema_decorator.ts#L93)*

Assigns schema `value` keyword to provided value

#### Type declaration
▸(value: *`V`*): `PropertyDecorator`

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `V` |

**Returns:** `PropertyDecorator`

___
<a id="withdefault"></a>

### `<Const>` withDefault

**● withDefault**: *`function`* =  propMetaDecoratorFactory('defaultFn')

*Defined in [class_syntax/decorator/property_metadata_decorator.ts:35](https://github.com/krnik/vjs-validator/blob/c79d80e/src/class_syntax/decorator/property_metadata_decorator.ts#L35)*

**Property decorator.**

**Applies only to instances.**

Defines default value factory for a property.

Evaluated only if property instances' property resolves to undefined.

The return value of provided function will be assigned to a property. As a first argument default factory will receive data that is received during building instance.

Example
=======

#example:class\_syntax\_with\_default

#### Type declaration
▸(value: *`V`*): `PropertyDecorator`

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `V` |

**Returns:** `PropertyDecorator`

___

## Functions

<a id="asyncfnfactory"></a>

###  AsyncFnFactory

▸ **AsyncFnFactory**(fn: *`GeneratorFunction`*): [AsyncValidationFunction](#asyncvalidationfunction)

*Defined in [core/jbq.ts:24](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/jbq.ts#L24)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| fn | `GeneratorFunction` |

**Returns:** [AsyncValidationFunction](#asyncvalidationfunction)

___
<a id="any"></a>

### `<Const>` any

▸ **any**(typeName: *`string`*, methodName: *`string`*): [SchemaValidator](#schemavalidator)

*Defined in [type/schema_validator.ts:197](https://github.com/krnik/vjs-validator/blob/c79d80e/src/type/schema_validator.ts#L197)*

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

*Defined in [type/schema_validator.ts:171](https://github.com/krnik/vjs-validator/blob/c79d80e/src/type/schema_validator.ts#L171)*

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

*Defined in [type/schema_validator.ts:142](https://github.com/krnik/vjs-validator/blob/c79d80e/src/type/schema_validator.ts#L142)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| typeName | `string` |
| methodName | `string` |

**Returns:** [SchemaValidator](#schemavalidator)

___
<a id="buildfrommethod"></a>

###  buildFromMethod

▸ **buildFromMethod**(constructor: *`Function`*, options: *[CompileDecoratorOptions](interfaces/compiledecoratoroptions.md)*): `Function`

*Defined in [class_syntax/decorator/class_decorator.ts:42](https://github.com/krnik/vjs-validator/blob/c79d80e/src/class_syntax/decorator/class_decorator.ts#L42)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| constructor | `Function` |
| options | [CompileDecoratorOptions](interfaces/compiledecoratoroptions.md) |

**Returns:** `Function`

___
<a id="collectionof"></a>

### `<Const>` collectionOf

▸ **collectionOf**(value: *`Function`*): `PropertyDecorator`

*Defined in [class_syntax/decorator/property_metadata_decorator.ts:74](https://github.com/krnik/vjs-validator/blob/c79d80e/src/class_syntax/decorator/property_metadata_decorator.ts#L74)*

Creates class instances out of each array member of the property.

Example
=======

#example:class\_syntax\_collection\_of

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `Function` |

**Returns:** `PropertyDecorator`

___
<a id="compile"></a>

### `<Const>` compile

▸ **compile**(options?: *[CompileDecoratorOptions](interfaces/compiledecoratoroptions.md)*): `ClassDecorator`

*Defined in [class_syntax/decorator/class_decorator.ts:198](https://github.com/krnik/vjs-validator/blob/c79d80e/src/class_syntax/decorator/class_decorator.ts#L198)*

Compiles the schema of class and creates propert `[from]` method for class.

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` options | [CompileDecoratorOptions](interfaces/compiledecoratoroptions.md) |

**Returns:** `ClassDecorator`

___
<a id="compilevalidator"></a>

###  compileValidator

▸ **compileValidator**(schema: *[Schema](interfaces/schema.md)*, schemaName: *`string`*, types: *[TypeStore](classes/typestore.md)*, options?: *[Options](interfaces/options.md)*): [`boolean`, `Function`]

*Defined in [class_syntax/decorator/class_decorator.ts:31](https://github.com/krnik/vjs-validator/blob/c79d80e/src/class_syntax/decorator/class_decorator.ts#L31)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| schema | [Schema](interfaces/schema.md) |
| schemaName | `string` |
| types | [TypeStore](classes/typestore.md) |
| `Optional` options | [Options](interfaces/options.md) |

**Returns:** [`boolean`, `Function`]

___
<a id="createpropkeycountmacro"></a>

###  createPropKeyCountMacro

▸ **createPropKeyCountMacro**(resolveDataVarCmp: *`function`*): [Macro](enums/keywordvalidationfunctionkind.md#macro)

*Defined in [type/object.ts:24](https://github.com/krnik/vjs-validator/blob/c79d80e/src/type/object.ts#L24)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| resolveDataVarCmp | `function` |

**Returns:** [Macro](enums/keywordvalidationfunctionkind.md#macro)

___
<a id="createtypes"></a>

###  createTypes

▸ **createTypes**(): [TypeStore](classes/typestore.md)<["any", "required" \| "type", `undefined`] \| ["array", "includes" \| "every" \| "type" \| "some" \| "len", "any"] \| ["boolean", "value" \| "type", "any"] \| ["number", "multipleOf" \| "oneOf" \| "value" \| "type", "any"] \| ["object", "constructorName" \| "instanceOf" \| "properties" \| "propCount" \| "keyCount" \| "type", "any"] \| ["string", "oneOf" \| "regex" \| "type" \| "len", "any"]>

*Defined in [type/mod.ts:10](https://github.com/krnik/vjs-validator/blob/c79d80e/src/type/mod.ts#L10)*

**Returns:** [TypeStore](classes/typestore.md)<["any", "required" \| "type", `undefined`] \| ["array", "includes" \| "every" \| "type" \| "some" \| "len", "any"] \| ["boolean", "value" \| "type", "any"] \| ["number", "multipleOf" \| "oneOf" \| "value" \| "type", "any"] \| ["object", "constructorName" \| "instanceOf" \| "properties" \| "propCount" \| "keyCount" \| "type", "any"] \| ["string", "oneOf" \| "regex" \| "type" \| "len", "any"]>

___
<a id="datapath"></a>

###  dataPath

▸ **dataPath**(schemaValue: *`unknown`*): `boolean`

*Defined in [type/schema_validator.ts:32](https://github.com/krnik/vjs-validator/blob/c79d80e/src/type/schema_validator.ts#L32)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| schemaValue | `unknown` |

**Returns:** `boolean`

___
<a id="isinstance"></a>

###  isInstance

▸ **isInstance**(typeName: *`string`*, methodName: *`string`*, constructor: *[Constructor](interfaces/constructor.md)*): [SchemaValidator](#schemavalidator)

*Defined in [type/schema_validator.ts:64](https://github.com/krnik/vjs-validator/blob/c79d80e/src/type/schema_validator.ts#L64)*

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

*Defined in [core/jbq.ts:42](https://github.com/krnik/vjs-validator/blob/c79d80e/src/core/jbq.ts#L42)*

Compiles `schemas` using `types` instance as source of validation code.

Examples
========

#example:usage

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

*Defined in [type/schema_validator.ts:82](https://github.com/krnik/vjs-validator/blob/c79d80e/src/type/schema_validator.ts#L82)*

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

*Defined in [type/schema_validator.ts:43](https://github.com/krnik/vjs-validator/blob/c79d80e/src/type/schema_validator.ts#L43)*

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
<a id="propmetadecoratorfactory"></a>

### `<Const>` propMetaDecoratorFactory

▸ **propMetaDecoratorFactory**<`K`,`V`>(keyword: *`K`*): [DecoratorFactory](#decoratorfactory)<`V`>

*Defined in [class_syntax/decorator/property_metadata_decorator.ts:6](https://github.com/krnik/vjs-validator/blob/c79d80e/src/class_syntax/decorator/property_metadata_decorator.ts#L6)*

**Type parameters:**

#### K :  `keyof PropertyMetadata`
#### V :  [Some](#some)<`PropertyMetadata[K]`>
**Parameters:**

| Name | Type |
| ------ | ------ |
| keyword | `K` |

**Returns:** [DecoratorFactory](#decoratorfactory)<`V`>

___
<a id="schemadecoratorfactory"></a>

### `<Const>` schemaDecoratorFactory

▸ **schemaDecoratorFactory**<`V`>(keyword: *`string`*): [ReturnsDecorator](#returnsdecorator)<`V`>

*Defined in [class_syntax/decorator/schema_decorator.ts:30](https://github.com/krnik/vjs-validator/blob/c79d80e/src/class_syntax/decorator/schema_decorator.ts#L30)*

**Type parameters:**

#### V 
**Parameters:**

| Name | Type |
| ------ | ------ |
| keyword | `string` |

**Returns:** [ReturnsDecorator](#returnsdecorator)<`V`>

___
<a id="setdefaulttypes"></a>

###  setDefaultTypes

▸ **setDefaultTypes**(types: *[TypeStore](classes/typestore.md)*): `void`

*Defined in [class_syntax/decorator/class_decorator.ts:22](https://github.com/krnik/vjs-validator/blob/c79d80e/src/class_syntax/decorator/class_decorator.ts#L22)*

Permanently changes the types used provided to the JBQ compilation function by `@compile()` decorator.

By default the `types` `TypeStore` instance from `/core/type/mod` module is used.

Changing default value will not affect the `types`. But changing the `types` value affect this modules' default types.

**Parameters:**

| Name | Type |
| ------ | ------ |
| types | [TypeStore](classes/typestore.md) |

**Returns:** `void`

___
<a id="shape"></a>

### `<Const>` shape

▸ **shape**(value: *`Function`*): `PropertyDecorator`

*Defined in [class_syntax/decorator/property_metadata_decorator.ts:89](https://github.com/krnik/vjs-validator/blob/c79d80e/src/class_syntax/decorator/property_metadata_decorator.ts#L89)*

Creates class instance out of decorated property.

Example
=======

#example:class\_syntax\_shape

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `Function` |

**Returns:** `PropertyDecorator`

___

## Object literals

<a id="logger"></a>

### `<Let>` LOGGER

**LOGGER**: *`object`*

*Defined in [util/log_service.ts:7](https://github.com/krnik/vjs-validator/blob/c79d80e/src/util/log_service.ts#L7)*

<a id="logger.debug"></a>

####  debug

▸ **debug**(): `void`

*Defined in [util/log_service.ts:7](https://github.com/krnik/vjs-validator/blob/c79d80e/src/util/log_service.ts#L7)*

**Returns:** `void`

___

___
<a id="schemavalidationerror"></a>

### `<Const>` SchemaValidationError

**SchemaValidationError**: *`object`*

*Defined in [type/schema_validator.ts:8](https://github.com/krnik/vjs-validator/blob/c79d80e/src/type/schema_validator.ts#L8)*

<a id="schemavalidationerror.invalidschematype"></a>

####  invalidSchemaType

▸ **invalidSchemaType**(typeName: *`string`*, methodName: *`string`*, expectedType: *`string`*, type: *`string`*): `Error`

*Defined in [type/schema_validator.ts:17](https://github.com/krnik/vjs-validator/blob/c79d80e/src/type/schema_validator.ts#L17)*

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

*Defined in [type/schema_validator.ts:9](https://github.com/krnik/vjs-validator/blob/c79d80e/src/type/schema_validator.ts#L9)*

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

*Defined in [type/schema_validator.ts:205](https://github.com/krnik/vjs-validator/blob/c79d80e/src/type/schema_validator.ts#L205)*

<a id="schemavalidate.any"></a>

####  any

**● any**: *[any](#any)*

*Defined in [type/schema_validator.ts:206](https://github.com/krnik/vjs-validator/blob/c79d80e/src/type/schema_validator.ts#L206)*

___
<a id="schemavalidate.arrayof"></a>

####  arrayOf

**● arrayOf**: *[arrayOf](#arrayof)*

*Defined in [type/schema_validator.ts:207](https://github.com/krnik/vjs-validator/blob/c79d80e/src/type/schema_validator.ts#L207)*

___
<a id="schemavalidate.arrayofpropertynames"></a>

####  arrayOfPropertyNames

**● arrayOfPropertyNames**: *[arrayOfPropertyNames](#arrayofpropertynames)*

*Defined in [type/schema_validator.ts:212](https://github.com/krnik/vjs-validator/blob/c79d80e/src/type/schema_validator.ts#L212)*

___
<a id="schemavalidate.datapath"></a>

####  dataPath

**● dataPath**: *[dataPath](#datapath)*

*Defined in [type/schema_validator.ts:208](https://github.com/krnik/vjs-validator/blob/c79d80e/src/type/schema_validator.ts#L208)*

___
<a id="schemavalidate.isinstance"></a>

####  isInstance

**● isInstance**: *[isInstance](#isinstance)*

*Defined in [type/schema_validator.ts:210](https://github.com/krnik/vjs-validator/blob/c79d80e/src/type/schema_validator.ts#L210)*

___
<a id="schemavalidate.minmaxornumber"></a>

####  minMaxOrNumber

**● minMaxOrNumber**: *[minMaxOrNumber](#minmaxornumber)*

*Defined in [type/schema_validator.ts:211](https://github.com/krnik/vjs-validator/blob/c79d80e/src/type/schema_validator.ts#L211)*

___
<a id="schemavalidate.primitive"></a>

####  primitive

**● primitive**: *[primitive](#primitive)*

*Defined in [type/schema_validator.ts:209](https://github.com/krnik/vjs-validator/blob/c79d80e/src/type/schema_validator.ts#L209)*

___

___

