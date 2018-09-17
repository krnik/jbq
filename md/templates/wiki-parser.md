## Parser
- [How it works?](#how-it-works?)
- [Symbols](#symbols)
- [Schema config](#schema-config)
- [Break](#break)

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
parser(types, { Name: NameSchema });
```
The steps that parser takes are:
 - get value of `${TYPE_METHOD.TYPE}` property from `Name` schema and get type object with that name (`string`)
- if type method `${TYPE_METHOD.TYPE}` does not use external variables then take it's string content and create a block with this function. If method uses external variables (it has to be marked with `${SYM.TYPE_EXTERNAL}` symbol) then pass type method as an argument and invoke it.
```javascript
// This is how string.type method looks like after parsing.
// _d is a data variable
{
    if (typeof _d !== 'string')
        return `Data should be \${'string'} type. Got \${typeof _d}.`;
}
// This is how function would look like if string.type method would use resources from outside it's scope.
_d_param_type(_d);
```
- take rest of schema properties validate their values and parse coresponding type methods
- replace type method argument names with current scope variable names
```javascript
// minLen
{
    if (_d.length < 1)
        return `Data expected to have length greater or equal than \${1}. Got \${_d.length}.`;
}
// maxLen
{
    if (_d.length > 64)
        return `Data expected to have length less or equal than \${64} chars. Got \${_d.length}.`;
}
```
- in the end combine all blocks into one function
***
### Symbols
***
#### `${SYM.TYPE_KEY_ORDER}`
> Sets the order in which schema properties checks appear in parsed function for given type. It must be an array of strings. Default value - `[${TYPE_METHOD.REQUIRED}, ${TYPE_METHOD.TYPE}]`.

Let's assume that our `${SYM.TYPE_KEY_ORDER}` is default value `[${TYPE_METHOD.REQUIRED}, ${TYPE_METHOD.TYPE}]`.
Then parsed function checks will be sorted in order:
1. `${TYPE_METHOD.REQUIRED}`
2. `${TYPE_METHOD.TYPE}`
3. Other type methods
#### `${SYM.TYPE_FOR_LOOP}`
> By default collections are iterated using for..of loop. This Symbol tells parser to use standard for loop for arrays - which is 2-4 times faster.
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
    [${SYM.TYPE_FOR_LOOP}]: true,
};
// parser will generate
for (let _d_i$ = 0; _d_i$ < _d.length; _d_i$++) {
    // checks
}
// instead of
for (const _d_i of _d) {
    // checks
}
```
#### `${SYM.TYPE_EXTERNAL}`
> This symbol should be always an array with names of type methods that use resources from outside their scope. It tells parser when to pass this method as an argument and when it's ok to extract source of type method.
```javascript
const customType = {
    ${TYPE_METHOD.TYPE} (base, data) {},
    area (base, data) {
        externalFunction(data);
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
### Break
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
If you want to break currently executed code block you have to add `//[[break]]` comment to the types' method.
Here is how `${TYPE_METHOD.REQUIRED}` function looks like.
```typescript
    if (data === undefined && !base) {
        //[[break]]
    }
```
If passed value will be undefined then code execution in labeled block will be stopped.
```javascript
// parsed function structure with break statement
function (data) {
    _d_label: {
        { // required check
            if (data === undefined && !base) {
                break _d_label;
            }
        }
        // other checks
    }
}
```

> If type method is included in [`${SYM.TYPE_EXTERNAL}`] type property then it will not be able to break code block.
