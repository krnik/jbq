## Parser
- [How it works?](#how-it-works?)
- [Symbols](#symbols)
- [Schema config](#schema-config)

[Source Code](${PATH.PARSER.SRC})
***
> Parser analyses schema and creates single function that checks all schema properties against passed data.
***
### How it works?
***
Let's start with an example. Consider following schema:
```javascript
const NameSchema = {
    ${TYPE_METHOD.TYPE}: 'string',
    ${TYPE_METHOD.MIN_LEN}: 1,
    ${TYPE_METHOD.MAX_LEN}: 64,
};
```
The steps that parser takes are:
 - get value of `${TYPE_METHOD.TYPE}` property from `NameSchema` schema and get type object with that name (`string`)
- if type method `${TYPE_METHOD.TYPE}` does not use external variables then take it's string content and create a block with this function. If method uses external variables (it has to be marked with `${SYM.TYPE_EXTERNAL}` symbol) then pass type method as an argument and invoke it.
```javascript
// This is how string.type method looks like after parsing.
// _d is a data variable
{
    if (typeof _d !== 'string')
        return `Data should be string type. Got \${typeof _d}.`;
}
// This is how function would look like if string.type method would use resources from outside it's scope.
function (check_data_type) {
    check_data_type(_d);
}
```
- take rest of schema properties validate their values and parse coresponding type methods
***
### Symbols
***
#### `${SYM.TYPE_KEY_ORDER}`
> Sets the order in which schema properties checks appear in parsed function for given type. It must be an array of strings. Default value - `[${TYPE_METHOD.REQUIRED}, ${TYPE_METHOD.TYPE}]`.

Let's assume that our `${SYM.TYPE_KEY_ORDER}` has default value of `[${TYPE_METHOD.REQUIRED}, ${TYPE_METHOD.TYPE}]`.
Then parsed function checks will be sorted in order:
1. `${TYPE_METHOD.REQUIRED}`
2. `${TYPE_METHOD.TYPE}`
3. Other type methods
#### `${SYM.TYPE_FOR_LOOP}`
> By default collections are iterated using for..of loop. This Symbol tells parser to use standard `for loop` for numeric indexed collections (Arrays) - which is 2-4 times faster than `for of loop` that uses iterators.
```javascript
const customTypeThatUsesForLoop = {
    ${TYPE_METHOD.TYPE} (base, data) {},
    size (base, data) {},
    [${SYM.TYPE_VALIDATE}]: {
        ${TYPE_METHOD.TYPE} (value) {},
        size (value) {
            // check if property `size` in schema is an array with two numbers
            if (!Array.isArray(value) || value.length !== 2 || value.some((e) => isNaN(e)))
                throw Error();
        },
    },
    [${SYM.TYPE_FOR_LOOP}]: true,
};
// parser will generate
const len = data.length;
for (let accessor = 0; accessor < len; accessor++) {
    const scopedData = data[accessor];
    // checks
}
// instead of
for (const scopedData of data) {
    // checks
}
```
#### `${SYM.TYPE_EXTERNAL}`
> This symbol should be always an array with names of type methods that use resources from outside their scope. It tells parser when to pass this method as an argument and when it's ok to extract source of type method.
```javascript
const customType = {
    ${TYPE_METHOD.TYPE} (base, data) {},
    area (base, path, data) {
        if (!externalFunction(data))
            return `There was an error in validation \${data} at \${path}.`;
    },
    // Now area method will be passed as an argument
    // otherwise `externalFunction` call would throw an error
    [${SYM.TYPE_EXTERNAL}]: ['area'],
    [${SYM.TYPE_VALIDATE}]: {
        ${TYPE_METHOD.TYPE} (value) {},
        area (value) {},
    },
};
```
#### `${SYM.TYPE_VALIDATE}`
> This symbol contains validator methods to check if value in schema property is valid.
```javascript
const customType = {
    ${TYPE_METHOD.TYPE} (base, data) {},
    size (base, data) {},
    [${SYM.TYPE_VALIDATE}]: {
        ${TYPE_METHOD.TYPE} (value) {},
        size (value) {
            // check if property `size` in schema is an array with two numbers
            if (!Array.isArray(value) || value.length !== 2 || value.some((e) => isNaN(e)))
                throw Error();
        },
    },
};
```
#### `${SYM.SCHEMA_PROPERTIES}`
> This symbol tells validator that additional cheks are needed for keys of data defined as keys of `${SYM.SCHEMA_PROPERTIES}` object. Please note that in this object `${SYM.SCHEMA_CONFIG}` will be read as another property of data. This is to allow validation of symbol properties of data.
```javascript
const schema = {
    ${TYPE_METHOD.TYPE}: 'object',
    [${SYM.SCHEMA_PROPERTIES}]: {
        [Symbol('custom_symbol')]: {
            ${TYPE_METHOD.TYPE}: 'object',
            // ...
        },
        dependencies: {
            ${TYPE_METHOD.TYPE}: 'object',
            // ...
        },
        // This symbol will be read as a property of passed data
        [${SYM.SCHEMA_CONFIG}]: {
            ${TYPE_METHOD.TYPE}: 'boolean',
        },
    },
};
```
#### `${SYM.SCHEMA_COLLECTION}`
> This symbol tells parser that schema in `${SYM.SCHEMA_COLLECTION}` property will be applied to every element of data. Validation function will use `for of` loop to iterate over elements of data.
```javascript
const schema = {
    ${TYPE_METHOD.TYPE}: 'map',
    [${SYM.SCHEMA_COLLECTION}]: {
        ${TYPE_METHOD}: 'array',
    },
};
// After parsing this schema, validation function will accept
// objects with `Symbol.iterator` property
```
#### `${SYM.SCHEMA_CONFIG}`
> This symbol enables passing down ${TYPE_METHOD.TYPE} property down the schema tree. Let's look at example.
```javascript
const schema = {
    ${TYPE_METHOD.TYPE}: 'some-object',
    // All schemas down the tree will inherit properties
    // of ${SYM.SCHEMA_CONFIG} object
    [${SYM.SCHEMA_CONFIG}]: {
        ${TYPE_METHOD.TYPE}: 'string',
    },
    [${SYM.SCHEMA_PROPERTIES}]: {
        // Here ${SYM.SCHEMA_CONFIG} would be interpreted as prpoerty of passed data
        firstName: {
            // you can use string properties here
            // implicit ${TYPE_METHOD.TYPE}: 'string',
            ${TYPE_METHOD.MIN_LEN}: 1,
            ${TYPE_METHOD.MAX_LEN}: 32,
        },
        midName: {
            // implicit ${TYPE_METHOD.TYPE}: 'string',
            ${TYPE_METHOD.MIN_LEN}: 1,
            ${TYPE_METHOD.MAX_LEN}: 32,
        },
        lastName: {
            // implicit ${TYPE_METHOD.TYPE}: 'string',
            ${TYPE_METHOD.MIN_LEN}: 1,
            ${TYPE_METHOD.MAX_LEN}: 64,
        },
        street: {
            // implicit ${TYPE_METHOD.TYPE}: 'string',
            ${TYPE_METHOD.MIN_LEN}: 4,
            ${TYPE_METHOD.REGEX}: /St\.$/,
        },
    },
};
```
