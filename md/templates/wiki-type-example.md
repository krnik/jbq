# boolean
<a name="${ANCHOR.BOOL.TYPE_EXAMPLE}"></a>
### ${TYPE_METHOD.TYPE}
```javascript
const schemas = {
    Bool: {
        ${TYPE_METHOD.TYPE}: 'boolean',
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
### ${TYPE_METHOD.VALUE}
```javascript
const schemas = {
    Bool: {
        ${TYPE_METHOD.TYPE}: 'boolean',
        ${TYPE_METHOD.VALUE}: true,
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
### ${TYPE_METHOD.TYPE}
```javascript
const schemas = {
    String: {
        ${TYPE_METHOD.TYPE}: 'string',
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
### ${TYPE_METHOD.MIN_LEN}
```javascript
const schemas = {
    String: {
        ${TYPE_METHOD.TYPE}: 'string',
        ${TYPE_METHOD.MIN_LEN}: 10,
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
### ${TYPE_METHOD.MAX_LEN}
```javascript
const schemas = {
    String: {
        ${TYPE_METHOD.TYPE}: 'string',
        ${TYPE_METHOD.MAX_LEN}: 10,
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
### ${TYPE_METHOD.LEN}
```javascript
const schemas = {
    String: {
        ${TYPE_METHOD.TYPE}: 'string',
        ${TYPE_METHOD.LEN}: 6,
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
### ${TYPE_METHOD.REGEX}
```javascript
const schemas = {
    String: {
        ${TYPE_METHOD.TYPE}: 'string',
        ${TYPE_METHOD.REGEX}: /a string/,
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
### ${TYPE_METHOD.TYPE}
```javascript
const schemas = {
    Number: {
        ${TYPE_METHOD.TYPE}: 'number',
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
### ${TYPE_METHOD.MIN}
```javascript
const schemas = {
    Number: {
        ${TYPE_METHOD.TYPE}: 'number',
        ${TYPE_METHOD.MIN}: 10,
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
### ${TYPE_METHOD.MAX}
```javascript
const schemas = {
    Number: {
        ${TYPE_METHOD.TYPE}: 'number',
        ${TYPE_METHOD.MAX}: 10,
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
### ${TYPE_METHOD.TYPE}
```javascript
const schemas = {
    Object: {
        ${TYPE_METHOD.TYPE}: 'object',
    },
};
const validator = new ${NAME.CONSTRUCTOR}(schemas, {});
validator.Object.validSync({});
// => undefined
validator.Object.validSync(null);
// => error message
```
<a name="${ANCHOR.OBJECT.CONSTRUCTOR_NAME_EXAMPLE}"></a>
***
### ${TYPE_METHOD.CONSTRUCTOR_NAME}
```javascript
const schemas = {
    Object: {
        ${TYPE_METHOD.TYPE}: 'object',
        ${TYPE_METHOD.CONSTRUCTOR_NAME}: 'RegExp',
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
### ${TYPE_METHOD.INSTANCE_OF}
```javascript
const schemas = {
    Object: {
        ${TYPE_METHOD.TYPE}: 'object',
        ${TYPE_METHOD.INSTANCE_OF}: Object,
    },
};
const validator = new ${NAME.CONSTRUCTOR}(schemas, {});
validator.Object.validSync(new Number(0));
// => undefined
validator.Object.validSync(Number(null));
// => error message
```
***
### ${TYPE_METHOD.PROPERTIES}
```javascript
const schemas = {
    Object: {
        ${TYPE_METHOD.TYPE}: 'object',
        ${TYPE_METHOD.PROPERTIES}: [],
    },
};
const validator = new ${NAME.CONSTRUCTOR}(schemas, {});
validator.Object.validSync({});
// => undefined
validator.Object.validSync({ prop: 'value' });
// => error message
```
***
# array
<a name="${ANCHOR.ARRAY.TYPE_EXAMPLE}"></a>
### ${TYPE_METHOD.TYPE}
```javascript
const schemas = {
    Array: {
        ${TYPE_METHOD.TYPE}: 'array',
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
### ${TYPE_METHOD.MIN_LEN}
```javascript
const schemas = {
    Array: {
        ${TYPE_METHOD.TYPE}: 'array',
        ${TYPE_METHOD.MIN_LEN}: 1,
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
### ${TYPE_METHOD.MAX_LEN}
```javascript
const schemas = {
    Array: {
        ${TYPE_METHOD.TYPE}: 'array',
        ${TYPE_METHOD.MAX_LEN}: 0,
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
### ${TYPE_METHOD.LEN}
```javascript
const schemas = {
    Array: {
        ${TYPE_METHOD.TYPE}: 'array',
        ${TYPE_METHOD.LEN}: 0,
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
### ${TYPE_METHOD.EVERY}
```javascript
const schemas = {
    Array: {
        ${TYPE_METHOD.TYPE}: 'array',
        ${TYPE_METHOD.EVERY} (elem, index, array, this) => elem === 0,
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
### ${TYPE_METHOD.SOME}
```javascript
const schemas = {
    Array: {
        ${TYPE_METHOD.TYPE}: 'array',
        ${TYPE_METHOD.SOME} (elem, index, array, this) => (elem === 0),
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
### ${TYPE_METHOD.INCLUDES}
```javascript
const schemas = {
    Array: {
        ${TYPE_METHOD.TYPE}: 'array',
        ${TYPE_METHOD.INCLUDES}: 'a string value',
    },
};
const validator = new ${NAME.CONSTRUCTOR}(schemas, {});
validator.Array.validSync(['a string value', 0]);
// => undefined
validator.Array.validSync([]);
// => error message
```
