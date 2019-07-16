Data path accepts a string or array of strings which will be used to resolve value from data root.
It can be used when you don't know exact schema values.

**Keywords that support {{PROP_DATA_PATH}}:**
- *{{TYPE_ARRAY}}*: `{{INCLUDES}}`, `{{LEN}}`
- *{{TYPE_NUMBER}}*: `{{VALUE}}`, `{{MULTIPLE_OF}}`
- *{{TYPE_OBJECT}}*: `{{KEY_COUNT}}`, `{{PROP_COUNT}}`
- *{{TYPE_STRING}}*: `{{LEN}}`

Lets consider following object:
```typescript
const settings = {
    globals: {
        requestRateLimit: 100,
    },
    premiumRequestRateLimit: 100,
    regularRequestRateLimit: 80,
};
```

We can use `{{PROP_DATA_PATH}}` to try to reach one of its properties as in example below.
{{example('data_path')}}
