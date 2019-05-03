Data path accepts a string or array of strings which will be used to resolve value from data root.
It can be used when you don't know exact schema values.

**Keywords that support {{PROP_DATA_PATH}}:**
- *{{TYPE_NAME.ARRAY}}*: `{{INCLUDES}}`, `{{LEN}}`
- *{{TYPE_NAME.NUMBER}}*: `{{VALUE}}`, `{{MULTIPLE_OF}}`
- *{{TYPE_NAME.OBJECT}}*: `{{KEY_COUNT}}`, `{{PROP_COUNT}}`
- *{{TYPE_NAME.STRING}}*: `{{LEN}}`

Lets consider following object:
{{example('data_path', 1)}}

We can use `{{PROP_DATA_PATH}}` to try to reach one of its properties as in example below.
{{example('data_path', 2)}}
