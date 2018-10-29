# any
<a name="${ANCHOR.ANY.TYPE_EXAMPLE}"></a>
### ${TYPE_METHOD.TYPE}
```javascript
const schemas = {
    Any: {
        ${TYPE_METHOD.TYPE}: 'any',
    },
};
const validator = ${NAME.CONSTRUCTOR}(${NAME.TYPES}, schemas);
validator.Any(undefined);
// => undefined
// never returns error message
// any type breaks code block execution for current schema
```
<a name="${ANCHOR.ANY.REQUIRED_EXAMPLE}"></a>
***
### ${TYPE_METHOD.REQUIRED}
```javscript
const schemas = {
    BoolOpt: {
        ${TYPE_METHOD.TYPE}: 'boolean',
        ${TYPE_METHOD.REQUIRED}: false,
    },
};
const validator = ${NAME.CONTSRUCTOR}(schemas);
validator.BoolOpt(undefined);
// => undefined
validator.BoolOpt(null);
// => error message
```
***
# boolean
<a name="${ANCHOR.BOOL.TYPE_EXAMPLE}"></a>
### ${TYPE_METHOD.TYPE}
```javascript
const schemas = {
    Bool: {
        ${TYPE_METHOD.TYPE}: 'boolean',
    },
};
const validator = ${NAME.CONSTRUCTOR}(${NAME.TYPES}, schemas);
validator.Bool(true);
// => undefined
validator.Bool(0);
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
const validator = ${NAME.CONSTRUCTOR}(${NAME.TYPES}, schemas);
validator.Bool(true);
// => undefined
validator.Bool(false);
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
const validator = ${NAME.CONSTRUCTOR}(${NAME.TYPES}, schemas);
validator.String('This is a strig');
// => undefined
validator.String(0);
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
const validator = ${NAME.CONSTRUCTOR}(${NAME.TYPES}, schemas);
validator.String('This is a string');
// => undefined
validator.String('short');
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
const validator = ${NAME.CONSTRUCTOR}(${NAME.TYPES}, schemas);
validator.String('string');
// => undefined
validator.String('This is a string');
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
const validator = ${NAME.CONSTRUCTOR}(${NAME.TYPES}, schemas);
validator.String('string');
// => undefined
validator.String('This is a string');
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
const validator = ${NAME.CONSTRUCTOR}(${NAME.TYPES}, schemas);
validator.String('This is a string');
// => undefined
validator.String('string');
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
const validator = ${NAME.CONSTRUCTOR}(${NAME.TYPES}, schemas);
validator.Number(1000);
// => undefined
validator.Number(NaN);
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
const validator = ${NAME.CONSTRUCTOR}(${NAME.TYPES}, schemas);
validator.Number(10);
// => undefined
validator.Number(0);
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
const validator = ${NAME.CONSTRUCTOR}(${NAME.TYPES}, schemas);
validator.Number(0);
// => undefined
validator.Number(11);
// => error message
```
<a name="${ANCHOR.NUMBER.MULTIPLY_OF_EXAMPLE}"></a>
***
### ${TYPE_METHOD.MULTIPLY_OF}
```javascript
const schemas = {
    Number: {
        ${TYPE_METHOD.TYPE}: 'number',
        ${TYPE_METHOD.MULTIPLY_OF}: 1,
    },
};
const validator ${NAME.CONSTRUCTOR}(${NAME.TYPES}, schemas);
validator.Number(10);
// => undefined
validator.Number(1.2);
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
const validator = ${NAME.CONSTRUCTOR}(${NAME.TYPES}, schemas);
validator.Object({});
// => undefined
validator.Object(null);
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
const validator = ${NAME.CONSTRUCTOR}(${NAME.TYPES}, schemas);
validator.Object(new RegExp('\\d'));
// => undefined
validator.Object(new Array(0));
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
const validator = ${NAME.CONSTRUCTOR}(${NAME.TYPES}, schemas);
validator.Object(new Number(0));
// => undefined
validator.Object(Number(null));
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
const validator = ${NAME.CONSTRUCTOR}(${NAME.TYPES}, schemas);
validator.Object({});
// => undefined
validator.Object({ prop: 'value' });
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
const validator = ${NAME.CONSTRUCTOR}(${NAME.TYPES}, schemas);
validator.Array([]);
// => undefined
validator.Array(false);
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
const validator = ${NAME.CONSTRUCTOR}(${NAME.TYPES}, schemas);
validator.Array([,]);
// => undefined
validator.Array([]);
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
const validator = ${NAME.CONSTRUCTOR}(${NAME.TYPES}, schemas);
validator.Array([]);
// => undefined
validator.Array([,,]);
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
const validator = ${NAME.CONSTRUCTOR}(${NAME.TYPES}, schemas);
validator.Array([]);
// => undefined
validator.Array([true]);
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
const validator = ${NAME.CONSTRUCTOR}(${NAME.TYPES}, schemas);
validator.Array([0, 0, 0, 0]);
// => undefined
validator.Array([0, 0, 0, 1]);
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
const validator = ${NAME.CONSTRUCTOR}(${NAME.TYPES}, schemas);
validator.Array([1, 1, 1, 0]);
// => undefined
validator.Array([1, 1, 1, 1]);
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
const validator = ${NAME.CONSTRUCTOR}(${NAME.TYPES}, schemas);
validator.Array(['a string value', 0]);
// => undefined
validator.Array([]);
// => error message
```
