# Custom types in ${NAME.LIB}
One of ${NAME.LIB} goals was to allow users to create own type definitions with ease. Of course in order to work properly you have to follow some rules.

## Adding type to ${NAME.LIB}
For starters let's assume that we already have declared our custom type, let's call it `tuple`.

```javascript
const tuple = {
  // validation methods
};

${NAME.TYPES}.add('tuple', tuple);
// from now on it is possible to use
// type: 'tuple' in schema
```

## Defining Type
First of all we want to make sure that the value passed to validator is a tuple (string, number).
So we have to add `${TYPE_METHOD.TYPE}` method to the type object.
Every validation method in type definition should have two parameters.
  - **schemaValue** - *it is a value specified in schema used to compare against value*
  - **data** - *it is a value that is currently validated*


If validation method is marked with `${SYM.TYPE_EXTERNAL}` symbol then the function should have following parameters:


  - **schemaValue** - *it is a value specified in schema used to compare against value*
  - **path** - *it is a schema path, useful when returning more specific error messages*
  - **data** - *it is a value that is currently validated*
If any check fails, the function should return error message as string (basically any truthy value will cause validator to return this value). If check succeeds then do not return from function to not interrupt validation process.
```javascript
const tuple = {
  ${TYPE_METHOD.TYPE} (schemaValue, data) {
    const keys = Object.getOwnPropertyKeys(data);
    const hasOnlyTwoKeys = keys.length === 2 && keys.every((e) => ['0', '1'].includes(e));
    const elemsTypeMatch = hasOnlyTwoKeys && typeof data['0'] === 'string' && typeof data['1'] === 'number';
    if (!(hasOnlyTwoKeys && elemsTypeMatch))
      // #{schemaValue} in below string is not an error, see TOKENS section below
      return `Data expected to be a #{schemaValue} (string, number). Got \${JSON.stringify(data)}.`;
    // no check failed, function does not return and continues its job
  }
};
```
***
#### NOTES
> Schema Parser uses `new Function` constructor to create one function to validate schema, so please make sure you name parameters `schemaValue` and `data` (currently it is hardcoded to use those names).

> If your type validation method uses external code - add `Symbol.for('type_external')` property to the type object. It should be an array with list of methods that contain external code. See example below.
```javascript
const tuple = {
  ${TYPE_METHOD.TYPE} (schemaValue, data) {
    const keys = Object.keys(data);
    const hasOnlyTwoKeys = keys.length === 2 && keys.every((e) => ['0', '1'].includes(e));
    // isString and isNumber are exteranal functions
    // thus it is impossible to use tuple.type method code during parsing phase
    const elemsTypeMatch = hasOnlyTwoKeys && isString(data['0']) && isNumber(data['1']);
    if (!(hasOnlyTwoKeys && elemsTypeMatch))
      // #{schemaValue} in below string is not an error, see TOKENS section below
      return `Data expected to be a #{schemaValue} (string, number). Got \${JSON.stringify(data)}.`
  },
  // this property will let parser know that it should not extract type method code,
  // instead it will invoke reference to this method in check function
  [Symbol.for('type_external')]: ['type'],
};
```
***
After we defined method we have to add `Symbol.for('type_validate')` property. It is required to check if values in schema are correct. In our case we will accept only a `string` values.
> `${TYPE_METHOD.TYPE}` property is the only required property and it requires it's value to be a `string` - this property is used to extract type object (see [Type Wrapper](${WIKI.TYPE_WRAPPER})).

Every method in type definition must have its validation function defined in `type[Symbol.for('type_validate')]`.
If the checks are not succesfull this ${NAME.CONSTRUCTOR} will throw an error during compilation.
```javascript
const tuple = {
  ${TYPE_METHOD.TYPE} (schemaValue, data) {
    // checks here
  },
  [Symbol.for('type_validate')]: {
    ${TYPE_METHOD.TYPE} (schemaValue) {
      if (typeof value !== 'string')
        throw Error('tuple ["type"] property requires schema value to be a string');
    },
  },
};
```

Example:
```javascript
const { ${NAME.CONSTRUCTOR}, ${NAME.TYPES} } = require(${NAME.REPO});
const tuple = require('path/to/tuple');
// tuple type will extend any type and will gain required method from its prototype
${NAME.TYPES}.set('tuple', tuple, 'any');

const schemas = {
    Tuple: {
        type: 'tuple',
    },
};

const validator = ${NAME.CONSTRUCTOR}(${NAME.TYPES}, schemas);
validator.Tuple({ 0: 'value', 1: 'value' });
// => undefined
validator.Tuple(['value', 'value']);
// => error message
// array has additional `length` property
```

### `TOKENS`

#### `#{<<expression>>}`
There is also special syntax available to squeeze out performance to the limit while returning an error.

> Syntax: `#{<<expression>>}`. For example `#{schemaValue.toString()}` or `#{path}`.

The expression is evaluaded in newly created funcion (via `new Function`) by returning the evaluated code from between curly braces. Only expressions that pass following RegExp will be replaced `/#{((schemaValue|path).*?)}/`.

Let's see an example based on 'string' type.
```javascript
const slowErrorString = {
    ${TYPE_METHOD.TYPE} (schemaValue, data) {
        if (typeof data !== 'string')
            return `Data should be \${schemaValue} type. Got ${typeof data}.`;
    }
    ${TYPE_METHOD.REGEX} (schemaValue, data) {
        if (!schemaValue.test(data))
            return `Data expected to pass \${schemaValue.toString()} test.`;
    }
};
```
Note that whenever `data` will not satisfy `schemaValue` regexp the return message will be interpolated. That is `schemaValue` will be stringified. Which will slow down error reporting!
```javascript
const fastErrorString = {
    ${TYPE_METHOD.TYPE} (schemaValue, data) {
        if (typeof data !== 'string')
            return `Data should be #{schemaValue} type. Got ${typeof data}.`;
    }
    ${TYPE_METHOD.REGEX} (schemaValue, data) {
        if (!schemaValue.test(data))
            return `Data expected to pass #{schemaValue.toString()} test.`;
    }
};
```
With `#{<<expression>>}` expression syntax `#{schemaValue.toString()}` will be executed during schema compilation which should speed up error reporting around 10 times.

Let's compare compiled codes for those methods. First method error will be compiled to:
```javascript
    if (!regex.test(data))
        return `Data expected to pass \${regex.toStrig()} test.`;
```
While second one will be compiled to:
```javascript
    if (!regex.test(data))
        return `Data expected to pass /parsed\.regex/g test.`;
```

#### `//{break}`

In ${NAME.LIB} all schema-scoped checks are grouped in one labeled code block.
Let's visualize it.
```javascript
// parsed function structure
function (data) {
    _d_label: {
        { // required check
        }
        { // type check
        }
        // other checks ...
    }
}
```
If you want to break currently executed code block you have to add `//{break}` comment to the types' method.
Here is how `${TYPE_METHOD.REQUIRED}` method of 'any' type looks like.
```javascript
    if (data === undefined && !base) {
        //{break}
    }
```
During compilation process `//{break}` token will be replaced with regular `break <label>` statement.
If passed value will be undefined then code execution in labeled block will be stopped.
```javascript
// parsed function structure with break statement
function (data) {
    label_data: {
        { // required check
            if (data === undefined && !base) {
                break label_data;
            }
        }
        { // some custom function that breaks on fail
            if (data !== 'ON')
                break label_data;
        }
    }
}
```

> If type method is included in [`${SYM.TYPE_EXTERNAL}`] type property then it will not be able to break code block.
