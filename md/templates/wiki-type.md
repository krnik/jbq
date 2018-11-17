## Types
${NAME.LIB} provides set of built-in types. Those types are:
  - [boolean](#boolean)
  - [string](#string)
  - [number](#number)
  - [object](#object)
  - [array](#array)

In ${NAME.LIB} you can also create your own custom types ([example](${WIKI.TYPE_CUSTOM})).

## Built-in Types
Every built-in type other than `any` extends `any`.
### **`any`**
`any` type allows schema properties such as:
- **${TYPE_METHOD.TYPE}** - *checks type of passed value ([example](${PATH.ANY.EXAMPLE.TYPE}))*
- **${TYPE_METHOD.REQUIRED}** - *checks if value exists, if not then it breaks current block of code ([example](${PATH.ANY.EXAMPLE.REQUIRED}))*

[Source Code](${PATH.ANY.SRC})
***
### **`boolean`**
`boolean` type allows schema properties such as:
- **${TYPE_METHOD.TYPE}** - *checks type of passed value ([example](${PATH.BOOL.EXAMPLE.TYPE}))*
- **${TYPE_METHOD.VALUE}** - *check if passed value is equal to schema `${TYPE_METHOD.VALUE}` property ([example](${PATH.BOOL.EXAMPLE.VALUE}))*

[Source Code](${PATH.BOOL.SRC})
***
### **`string`**
`string` type allows validation properties such as:
- **${TYPE_METHOD.TYPE}** - *checks type of passed value ([example](${PATH.STRING.EXAMPLE.TYPE}))*
- **${TYPE_METHOD.MIN_LEN}** - *check if passed string has length greater or equal than value in schema `${TYPE_METHOD.MIN_LEN}` property ([example](${PATH.STRING.EXAMPLE.MIN_LEN}))*
- **${TYPE_METHOD.MAX_LEN}** - *check if passed string has length less or eaqual than value in schema `${TYPE_METHOD.MAX_LEN}` property ([example](${PATH.STRING.EXAMPLE.MAX_LEN}))*
- **${TYPE_METHOD.LEN}** - *check if passed string has length equal to value in schema `${TYPE_METHOD.LEN}` property ([example](${PATH.STRING.EXAMPLE.LEN}))*
- **${TYPE_METHOD.REGEX}** - *check if `test` method from schema `${TYPE_METHOD.REGEX}` property returns true when string is passed as an argument ([example](${PATH.STRING.EXAMPLE.REGEX}))*
- **${TYPE_METHOD.ONE_OF}** - *check if `data` is equal to one of array elements passed as argument ([example](${PATH.STRING.EXAMPLE.ONE_OF}))*

[Source Code](${PATH.STRING.SRC})
***
### **`number`**
`number` type allows schema properties such as:
- **${TYPE_METHOD.TYPE}** - *checks type of passed value ([example](${PATH.NUMBER.EXAMPLE.TYPE}))*
- **${TYPE_METHOD.MIN}** - *check if passed number is greater or equal than value in schema `${TYPE_METHOD.MIN}` property ([example](${PATH.NUMBER.EXAMPLE.MIN}))*
- **${TYPE_METHOD.MAX}** - *check if passed number is less or equal than value in schema `${TYPE_METHOD.MAX}` property ([example](${PATH.NUMBER.EXAMPLE.MAX}))*
- **${TYPE_METHOD.MULTIPLE_OF}** - *check if passed number is a multiply of schemaValue at schema `${TYPE_METHOD.MULTIPLE_OF}` proeprty ([example](${PATH.NUMBER.EXAMPLE.MULTIPLE_OF}))*
- **${TYPE_METHOD.ONE_OF}** - *check if `data` is equal to one of array elements passed as argument ([example](${PATH.STRING.EXAMPLE.ONE_OF}))*

[Source Code](${PATH.NUMBER.SRC})
***
### **`object`**
`object` type allows schema properties such as:
- **${TYPE_METHOD.TYPE}** - *checks type of passed value ([example](${PATH.OBJECT.EXAMPLE.TYPE}))*
- **${TYPE_METHOD.CONTRUCTOR_NAME}** - *check if Constructor function of passed object is equal to value in schema `${TYPE_METHOD.CONTRUCTOR_NAME}` property ([example](${PATH.OBJECT.EXAMPLE.CONSTRUCTOR_NAME}))*
- **${TYPE_METHOD.INSTANCE_OF}** - *check if passed object is a instance of Constructor in schema `${TYPE_METHOD.INSTANCE_OF}` property ([example](${PATH.OBJECT.EXAMPLE.INSTANCE_OF}))*
- **${TYPE_METHOD.PROPERTIES}** - *check if all elements of schemaValue array are properties of `data` ([example](${PATH.OBJECT.EXAMPLE.PROPERTIES}))*
- **${TYPE_METHOD.MIN_PROP_COUNT}** - *check if `data` has at least as many properties as specified in schema ([example](${PATH.OBJECT.EXAMPLE.MIN_PROP_COUNT}))*
- **${TYPE_METHOD.MAX_PROP_COUNT}** - *check if `data` has less properties than specified in schema ([example](${PATH.OBJECT.EXAMPLE.MAX_PROP_COUNT}))*
- **${TYPE_METHOD.MIN_KEY_COUNT}** - *check if `data` has at least as many enumerable string properties as specified in schema ([example](${PATH.OBJECT.EXAMPLE.MIN_KEY_COUNT}))*
- **${TYPE_METHOD.MAX_KEY_COUNT}** - *check if `data` has less enumerable string properties than specified in schema ([example](${PATH.OBJECT.EXAMPLE.MAX_KEY_COUNT}))*

[Source Code](${PATH.OBJECT.SRC})
### **`array`**
`array` type allows schema properties such as:
- **${TYPE_METHOD.TYPE}** - *checks type of passed value ([example](${PATH.ARRAY.EXAMPLE.TYPE}))*
- **${TYPE_METHOD.MIN_LEN}** - *check if passed array has length greater or equal than value in schema `${TYPE_METHOD.MIN_LEN}` property ([example](${PATH.ARRAY.EXAMPLE.MIN_LEN}))*
- **${TYPE_METHOD.MAX_LEN}** - *check if passed array has length less or equal than value in schema `${TYPE_METHOD.MAX_LEN}` property ([example](${PATH.ARRAY.EXAMPLE.MAX_LEN}))*
- **${TYPE_METHOD.LEN}** - *check if array length is equal to value in schema `${TYPE_METHOD.LEN}` property ([example](${PATH.ARRAY.EXAMPLE.LEN}))*
- **${TYPE_METHOD.EVERY}** - *check if `Array.prototype.every` method returns true when value in schema `${TYPE_METHOD.EVERY}` property is passed as a callback ([example](${PATH.ARRAY.EXAMPLE.EVERY}))*
- **${TYPE_METHOD.SOME}** - *check if `Array.prototype.some` method returns true when value in schema `${TYPE_METHOD.SOME}` property is passed as a callback ([example](${PATH.ARRAY.EXAMPLE.SOME}))*
- **${TYPE_METHOD.INCLUDES}** - *check if `Array.prototype.includes` method returns true when value in schema `${TYPE_METHOD.INCLUDES}` property is passed as an argument ([example](${PATH.ARRAY.EXAMPLE.INCLUDES}))*

[Source Code](${PATH.ARRAY.SRC})
