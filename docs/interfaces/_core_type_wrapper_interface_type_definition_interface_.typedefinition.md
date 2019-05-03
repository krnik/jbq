[jbq](../README.md) > ["core/type_wrapper/interface/type_definition.interface"](../modules/_core_type_wrapper_interface_type_definition_interface_.md) > [TypeDefinition](../interfaces/_core_type_wrapper_interface_type_definition_interface_.typedefinition.md)

# Interface: TypeDefinition

Interface representing a shape of added to the type map type prototype.

`[Symbol.for('type_key_order')]` - determines order in which the type methods are used during creation of validation function. If not defined, the order will depend on ECMASCript implementation.

`[Symbol.for('type_validate')]` - must have as many methods as many methods have TypeDefinition object. Methods in this object are used to validate if value from schema can be accepted as an argument in TypeDefinition respective method.

Example
=======

```
const certainType = jbqTypes.get('any');
// certain type shape
{
   type (schemaValue, $DATA) {
     // method body used to create final validation function
   },
   required (schemaValue, $DATA) {
     // method body used to create final validation function
   },
   [Symbol.for('type_validate')]: {
       // method responsible for validation schema input
       // must throw on incorrect input
       type (schemaValue) {},
       required (schemaValue) {},
   },
   [Symbol.for('type_key_order')]: ['required', 'type'],
}
```

## Hierarchy

**TypeDefinition**

## Indexable

\[method: `string`\]:&nbsp;[TypeMethod](_core_type_wrapper_interface_type_method_interface_.typemethod.md)
Interface representing a shape of added to the type map type prototype.

`[Symbol.for('type_key_order')]` - determines order in which the type methods are used during creation of validation function. If not defined, the order will depend on ECMASCript implementation.

`[Symbol.for('type_validate')]` - must have as many methods as many methods have TypeDefinition object. Methods in this object are used to validate if value from schema can be accepted as an argument in TypeDefinition respective method.

Example
=======

```
const certainType = jbqTypes.get('any');
// certain type shape
{
   type (schemaValue, $DATA) {
     // method body used to create final validation function
   },
   required (schemaValue, $DATA) {
     // method body used to create final validation function
   },
   [Symbol.for('type_validate')]: {
       // method responsible for validation schema input
       // must throw on incorrect input
       type (schemaValue) {},
       required (schemaValue) {},
   },
   [Symbol.for('type_key_order')]: ['required', 'type'],
}
```

## Index

### Properties

* [__computed](_core_type_wrapper_interface_type_definition_interface_.typedefinition.md#__computed)

---

## Properties

<a id="__computed"></a>

###  __computed

**● __computed**: *`undefined` \| `false` \| `true`*

*Defined in [core/type_wrapper/interface/type_definition.interface.ts:38](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/type_wrapper/interface/type_definition.interface.ts#L38)*
*Defined in [core/type_wrapper/interface/type_definition.interface.ts:41](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/type_wrapper/interface/type_definition.interface.ts#L41)*
*Defined in [core/type_wrapper/interface/type_definition.interface.ts:42](https://github.com/krnik/vjs-validator/blob/6a6427a/src/core/type_wrapper/interface/type_definition.interface.ts#L42)*

___
