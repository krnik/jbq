# Custom types in ${NAME.LIB}
One of ${NAME.LIB} goals was to allow users to create own type definitions with ease. Of course in order to work properly you have to follow some rules.

## Adding type to ${NAME.LIB}
For starters let's assume that we already have declared our custom type, let's call it `tuple`.

```javascript
const tuple = {
  // validation methods
};

${NAME.CONSTRUCTOR}.types.add('tuple', tuple);
// from now on it is possible to use
// type: 'tuple' in schema
```

## Defining Type
First of all we want to make sure that the value passed to validator is a tuple (string, number).
So we have to add `${TYPE_METHOD.TYPE}` method to the type object.
Every validation method in type definition has two parameters.
  - **base** - *it is a value specified in schema used to compare against value*
  - **data** - *it is a value that is currently validated*
If any check fails, the function should return error message as string (basically any truthy value will cause validator to return this value). Otherwise return `undefined` (explicitly or implicitly).
Value `undefined` will let validator know that no checks failed for current stage and it can continue its' job.
```javascript
const tuple = {
  ${TYPE_METHOD.TYPE} (base, data) {
    const keys = Object.keys(data);
    const hasOnlyTwoKeys = keys.length === 2 && keys.every((e) => ['0', '1'].includes(e));
    const elemsTypeMatch = hasOnlyTwoKeys && typeof data['0'] === 'string' && typeof data['1'] === 'number';
    if (!(hasOnlyTwoKeys && elemsTypeMatch))
      return `Data expected to be a \${base} (string, number). Got \${JSON.stringify(data)}.`
    // no check failed, function returns undefined and validator continues its' job
  }
};
```
***
#### NOTES
> Schema Parser uses `new Function` constructor to create one function to validate schema, so please make sure you name parameters `base` and `value` (currently it is hardcoded to use those names).

> If your type validation method uses external code - add `Symbol.for('type_external')` property to the type object. It should be an array with list of methods that contain external code. See example below.
```javascript
const tuple = {
  ${TYPE_METHOD.TYPE} (base, data) {
    const keys = Object.keys(data);
    const hasOnlyTwoKeys = keys.length === 2 && keys.every((e) => ['0', '1'].includes(e));
    // isString and isNumber are exteranal functions thus it is impossible to use tuple.type method code
    // during parsing phase.
    const elemsTypeMatch = hasOnlyTwoKeys && isString(data['0']) && isNumber(data['1']);
    if (!(hasOnlyTwoKeys && elemsTypeMatch))
      return `Data expected to be a \${base} (string, number). Got \${JSON.stringify(data)}.`
  },
  // this property will let parser know that it should not extract type method code, instead it will invoke reference to this method in check function
  [Symbol.for('type_external')]: ['type'],
};
```
***
After we defined method we have to add `Symbol.for('type_validate')` property. It is required to check if values in schema are correct. In our case we will accept only a `string` values.
> `${TYPE_METHOD.TYPE}` property is the only required property and it requires it's value to be a `string` - this property is used to extract type object TODO see [Type Wrapper](${WIKI.TYPE_WRAPPER})

Every method in type definition must have it's validation function defined in `type[Symbol.for('type_validate')]`.
If the checks are not succesfull this function should throw an error.
```javascript
const tuple = {
  ${TYPE_METHOD.TYPE} (base, data) {
    // checks here
  },
  [Symbol.for('type_validate')]: {
    ${TYPE_METHOD.TYPE} (value) {
      if (typeof value !== 'string')
        throw Error('tuple type property requires schema value to be a string');
    },
  },
};
```
