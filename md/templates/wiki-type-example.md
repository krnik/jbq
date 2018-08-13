# boolean
<a name="${ANCHOR.BOOL.TYPE_EXAMPLE}"></a>
### type
```javascript
const schemas = {
    Bool: {
        type: 'boolean',
    },
};
const validator = new ${NAME.CONSTRUCTOR}(schemas, {});
validator.Bool.validSync(true);
// => undefined
validator.Bool.validSync(0);
// => error message
```
<a name="${ANCHOR.BOOL.VALUE_EXAMPLE}"></a>
***
### value
```javascript
const schemas = {
    Bool: {
        type: 'boolean',
        value: true,
    },
};
const validator = new ${NAME.CONSTRUCTOR}(schemas, {});
validator.Bool.validSync(true);
// => undefined
validator.Bool.validSync(false);
// => error message
```
***
# string
<a name="${ANCHOR.STRING.TYPE_EXAMPLE}"></a>
### type
```javascript
const schemas = {
    String: {
        type: 'string',
    },
};
const validator = new ${NAME.CONSTRUCTOR}(schemas, {});
validator.String.validSync('This is a strig');
// => undefined
validator.String.validSync(0);
// => error message
```
<a name="${ANCHOR.STRING.MIN_LEN_EXAMPLE}"></a>
***
### minLen
```javascript
const schemas = {
    String: {
        type: 'string',
        minLen: 10,
    },
};
const validator = new ${NAME.CONSTRUCTOR}(schemas, {});
validator.String.validSync('This is a string');
// => undefined
validator.String.validSync('short');
// => error message
```
<a name="${ANCHOR.STRING.MAX_LEN_EXAMPLE}"></a>
***
### maxLen
```javascript
const schemas = {
    String: {
        type: 'string',
        maxLen: 10,
    },
};
const validator = new ${NAME.CONSTRUCTOR}(schemas, {});
validator.String.validSync('string');
// => undefined
validator.String.validSync('This is a string');
// => error message
```
<a name="${ANCHOR.STRING.LEN_EXAMPLE}"></a>
***
### len
```javascript
const schemas = {
    String: {
        type: 'string',
        len: 6,
    },
};
const validator = new ${NAME.CONSTRUCTOR}(schemas, {});
validator.String.validSync('string');
// => undefined
validator.String.validSync('This is a string');
// => error message
```
<a name="${ANCHOR.STRING.REGEX_EXAMPLE}"></a>
***
### regex
```javascript
const schemas = {
    String: {
        type: 'string',
        regex: /a string/,
    },
};
const validator = new ${NAME.CONSTRUCTOR}(schemas, {});
validator.String.validSync('This is a string');
// => undefined
validator.String.validSync('string');
// => error message
```
***
# number
<a name="${ANCHOR.NUMBER.TYPE_EXAMPLE}"></a>
### type
```javascript
const schemas = {
    Number: {
        type: 'number',
    },
};
const validator = new ${NAME.CONSTRUCTOR}(schemas, {});
validator.Number.validSync(1000);
// => undefined
validator.Number.validSync(NaN);
// => error message
```
<a name="${ANCHOR.NUMBER.MIN_EXAMPLE}"></a>
***
### min
```javascript
const schemas = {
    Number: {
        type: 'number',
        min: 10,
    },
};
const validator = new ${NAME.CONSTRUCTOR}(schemas, {});
validator.Number.validSync(10);
// => undefined
validator.Number.validSync(0);
// => error message
```
<a name="${ANCHOR.NUMBER.MAX_EXAMPLE}"></a>
***
### max
```javascript
const schemas = {
    Number: {
        type: 'number',
        max: 10,
    },
};
const validator = new ${NAME.CONSTRUCTOR}(schemas, {});
validator.Number.validSync(0);
// => undefined
validator.Number.validSync(11);
// => error message
```
***
# object
<a name="${ANCHOR.OBJECT.TYPE_EXAMPLE}"></a>
### type
```javascript
const schemas = {
    Object: {
        type: 'object',
    },
};
const validator = new ${NAME.CONSTRUCTOR}(schemas, {});
validator.Object.validSync({});
// => undefined
validator.Object.validSync(null);
// => error message
```
<a name="${ANCHOR.OBJECT.CONSTR_NAME_EXAMPLE}"></a>
***
### constructorName
```javascript
const schemas = {
    Object: {
        type: 'object',
        constructorName: 'RegExp',
    },
};
const validator = new ${NAME.CONSTRUCTOR}(schemas, {});
validator.Object.validSync(new RegExp('\\d'));
// => undefined
validator.Object.validSync(new Array(0));
// => error message
```
<a name="${ANCHOR.OBJECT.INSTANCE_OF_EXAMPLE}"></a>
***
### instanceOf
```javascript
const schemas = {
    Object: {
        type: 'object',
        instanceOf: Object,
    },
};
const validator = new ${NAME.CONSTRUCTOR}(schemas, {});
validator.Object.validSync(new Number(0));
// => undefined
validator.Object.validSync(Number(null));
// => error message
```
***
# array
<a name="${ANCHOR.ARRAY.TYPE_EXAMPLE}"></a>
### type
```javascript
const schemas = {
    Array: {
        type: 'array',
    },
};
const validator = new ${NAME.CONSTRUCTOR}(schemas, {});
validator.Array.validSync([]);
// => undefined
validator.Array.validSync(false);
// => error message
```
<a name="${ANCHOR.ARRAY.MIN_LEN_EXAMPLE}"></a>
***
### minLen
```javascript
const schemas = {
    Array: {
        type: 'array',
        minLen: 1,
    },
};
const validator = new ${NAME.CONSTRUCTOR}(schemas, {});
validator.Array.validSync([,]);
// => undefined
validator.Array.validSync([]);
// => error message
```
<a name="${ANCHOR.ARRAY.MAX_LEN_EXAMPLE}"></a>
***
### maxLen
```javascript
const schemas = {
    Array: {
        type: 'array',
        maxLen: 0,
    },
};
const validator = new ${NAME.CONSTRUCTOR}(schemas, {});
validator.Array.validSync([]);
// => undefined
validator.Array.validSync([,,]);
// => error message
```
<a name="${ANCHOR.ARRAY.LEN_EXAMPLE}"></a>
***
### len
```javascript
const schemas = {
    Array: {
        type: 'array',
        len: 0,
    },
};
const validator = new ${NAME.CONSTRUCTOR}(schemas, {});
validator.Array.validSync([]);
// => undefined
validator.Array.validSync([true]);
// => error message
```
<a name="${ANCHOR.ARRAY.EVERY_EXAMPLE}"></a>
***
### every
```javascript
const schemas = {
    Array: {
        type: 'array',
        every (elem, index, array, this) => elem === 0,
    },
};
const validator = new ${NAME.CONSTRUCTOR}(schemas, {});
validator.Array.validSync([0, 0, 0, 0]);
// => undefined
validator.Array.validSync([0, 0, 0, 1]);
// => error message
```
<a name="${ANCHOR.ARRAY.SOME_EXAMPLE}"></a>
***
### some
```javascript
const schemas = {
    Array: {
        type: 'array',
        some (elem, index, array, this) => (elem === 0),
    },
};
const validator = new ${NAME.CONSTRUCTOR}(schemas, {});
validator.Array.validSync([1, 1, 1, 0]);
// => undefined
validator.Array.validSync([1, 1, 1, 1]);
// => error message
```
<a name="${ANCHOR.ARRAY.INCLUDES_EXAMPLE}"></a>
***
### includes
```javascript
const schemas = {
    Array: {
        type: 'array',
        includes: 'a string value',
    },
};
const validator = new ${NAME.CONSTRUCTOR}(schemas, {});
validator.Array.validSync(['a string value', 0]);
// => undefined
validator.Array.validSync([]);
// => error message
```
