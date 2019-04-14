## MinMaxSchema
Definition:
```typescript
interface IMin { min: number }
interface IMax { max: number }
type minMaxOrNumber = number | IMin | IMax;

// Valid keyword values are:
10;
{ min: 10 };
{ max: 10 };
{ min: 5, max: 10 };
```
If keywords supports `{{PROP_DATA_PATH}}` then the definition changes to:
```typescript
interface IDataPathSchemaValue {
    {{PROP_DATA_PATH}}: string | string[];
    [key: string]: any;
}
type base = number | IDataPathSchemaValue;
interface IMin { min: base };
interface IMax { max: base };
type minMaxOrNumber = base | IMin | IMax;

// Valid keywor values are:
const path = { $dataPath: 'path.to.property' };
10;
path;
{ min: 10 };
{ max: path };
{ min: 10, max: path };
{ min: path, max: path};
// and so on...
```
